import os
import cv2
import numpy as np
from PIL import Image
from concurrent.futures import ProcessPoolExecutor
import time

INPUT_DIR = 'public/frames'
OUTPUT_DIR_DESKTOP = 'public/frames-webp'
OUTPUT_DIR_MOBILE = 'public/frames-webp-mobile'

def process_single_frame(frame_idx):
    in_file = os.path.join(INPUT_DIR, f'frame_{frame_idx:04d}.jpg')
    if not os.path.exists(in_file):
        return None
        
    img_bgr = cv2.imread(in_file)
    if img_bgr is None:
        return None
        
    h, w, _ = img_bgr.shape
    
    # 1. Outer background flood-fill
    mask = np.zeros((h + 2, w + 2), dtype=np.uint8)
    seeds = [
        (10, 10), (w-10, 10), (10, h-10), (w-10, h-10),
        (w//2, 10), (10, h//2), (w//4, 10), (3*w//4, 10)
    ]
    flags = 8 | (255 << 8) | cv2.FLOODFILL_MASK_ONLY
    for sx, sy in seeds:
        if mask[sy+1, sx+1] == 0:
            cv2.floodFill(img_bgr, mask, (sx, sy), 0, (6, 6, 6), (6, 6, 6), flags)
            
    is_bg = (mask[1:-1, 1:-1] == 255)
    
    # Morphological close to eliminate microscopic boundary speckles
    kernel_3 = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    bg_clean = cv2.morphologyEx(is_bg.astype(np.uint8), cv2.MORPH_CLOSE, kernel_3)
    fg_mask = ((1 - bg_clean) * 255).astype(np.uint8)
    
    # Enclose solid interior
    contours, _ = cv2.findContours(fg_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(fg_mask, contours, -1, 255, thickness=-1)
    
    # Subtle 0.5px edge feathering
    alpha = cv2.GaussianBlur(fg_mask.astype(np.float32), (5, 5), 0.7) / 255.0
    
    # Bilinear studio lighting estimate for clean edge despill
    tl = np.median(img_bgr[0:20, 0:20], axis=(0, 1))
    tr = np.median(img_bgr[0:20, w-20:w], axis=(0, 1))
    bl = np.median(img_bgr[h-20:h, 0:20], axis=(0, 1))
    br = np.median(img_bgr[h-20:h, w-20:w], axis=(0, 1))
    u = np.linspace(0, 1, w, dtype=np.float32)[None, :, None]
    v = np.linspace(0, 1, h, dtype=np.float32)[:, None, None]
    bg_field = (1 - u)*(1 - v)*tl + u*(1 - v)*tr + (1 - u)*v*bl + u*v*br
    
    # Despill edge reconstruction
    alpha_3d = alpha[:, :, None]
    safe_alpha = np.maximum(alpha_3d, 0.1)
    despilled = np.clip((img_bgr.astype(np.float32) - (1.0 - alpha_3d) * bg_field) / safe_alpha, 0, 255).astype(np.uint8)
    
    # Keep 100% original interior
    solid = (alpha >= 0.99)
    despilled[solid] = img_bgr[solid]
    
    # RGBA
    alpha_u8 = (alpha * 255).astype(np.uint8)
    rgba_bgr = np.dstack([despilled, alpha_u8])
    rgba_rgb = cv2.cvtColor(rgba_bgr, cv2.COLOR_BGRA2RGBA)
    pil_img = Image.fromarray(rgba_rgb)
    
    # Save Desktop (720p, Quality 80)
    out_desktop = os.path.join(OUTPUT_DIR_DESKTOP, f'frame_{frame_idx:04d}.webp')
    pil_img.save(out_desktop, 'WEBP', quality=80, method=4)
    
    # Save Mobile (every 2nd frame, 480p, Quality 75)
    if frame_idx % 2 == 1:
        w_mobile = int(w * 480 / h)
        pil_mobile = pil_img.resize((w_mobile, 480), Image.Resampling.LANCZOS)
        out_mobile = os.path.join(OUTPUT_DIR_MOBILE, f'frame_{frame_idx:04d}.webp')
        pil_mobile.save(out_mobile, 'WEBP', quality=75, method=4)
        
    return frame_idx

def main():
    os.makedirs(OUTPUT_DIR_DESKTOP, exist_ok=True)
    os.makedirs(OUTPUT_DIR_MOBILE, exist_ok=True)
    
    total_frames = 411
    print(f"Starting batch conversion of {total_frames} frames to WebP...")
    t0 = time.time()
    
    with ProcessPoolExecutor() as executor:
        results = list(executor.map(process_single_frame, range(1, total_frames + 1)))
        
    t1 = time.time()
    print(f"Finished processing {len(results)} frames in {t1 - t0:.1f} seconds!")
    
    # Calculate directory sizes
    d_size = sum(os.path.getsize(os.path.join(OUTPUT_DIR_DESKTOP, f)) for f in os.listdir(OUTPUT_DIR_DESKTOP)) / (1024 * 1024)
    m_size = sum(os.path.getsize(os.path.join(OUTPUT_DIR_MOBILE, f)) for f in os.listdir(OUTPUT_DIR_MOBILE)) / (1024 * 1024)
    print(f"Desktop frames ({len(os.listdir(OUTPUT_DIR_DESKTOP))} files): {d_size:.2f} MB")
    print(f"Mobile frames ({len(os.listdir(OUTPUT_DIR_MOBILE))} files): {m_size:.2f} MB")

if __name__ == '__main__':
    main()

