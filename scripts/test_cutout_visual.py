import cv2
import numpy as np
import os

def create_cutout(img_bgr):
    h, w, _ = img_bgr.shape
    
    # 1. Flood fill from borders to identify outer background
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
    
    # Close small speckles / morphology on background mask
    kernel_3 = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    bg_clean = cv2.morphologyEx(is_bg.astype(np.uint8), cv2.MORPH_CLOSE, kernel_3)
    
    # Foreground mask (0 = bg, 255 = fg)
    fg_mask = ((1 - bg_clean) * 255).astype(np.uint8)
    
    # Fill any internal holes enclosed by foreground just in case
    contours, _ = cv2.findContours(fg_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(fg_mask, contours, -1, 255, thickness=-1)
    
    # Feather edges: compute distance transform near edge
    # or GaussianBlur with radius ~0.8px
    alpha = cv2.GaussianBlur(fg_mask.astype(np.float32), (5, 5), 0.8) / 255.0
    
    # Edge despill:
    # Estimate local background color near edges
    # For grey studio backdrop, average bg color is ~ (222, 222, 215)
    # Background field from borders:
    tl = np.median(img_bgr[0:20, 0:20], axis=(0, 1))
    tr = np.median(img_bgr[0:20, w-20:w], axis=(0, 1))
    bl = np.median(img_bgr[h-20:h, 0:20], axis=(0, 1))
    br = np.median(img_bgr[h-20:h, w-20:w], axis=(0, 1))
    u = np.linspace(0, 1, w, dtype=np.float32)[None, :, None]
    v = np.linspace(0, 1, h, dtype=np.float32)[:, None, None]
    bg_field = (1 - u)*(1 - v)*tl + u*(1 - v)*tr + (1 - u)*v*bl + u*v*br
    
    # Despill formula:
    # C_fg = (C_obs - (1 - alpha) * C_bg) / max(alpha, 0.1)
    alpha_3d = alpha[:, :, None]
    safe_alpha = np.maximum(alpha_3d, 0.1)
    despilled = np.clip((img_bgr.astype(np.float32) - (1.0 - alpha_3d) * bg_field) / safe_alpha, 0, 255).astype(np.uint8)
    
    # Wherever alpha is 1, keep exact original image
    solid_mask = (alpha >= 0.99)
    despilled[solid_mask] = img_bgr[solid_mask]
    
    # RGBA image
    alpha_uint8 = (alpha * 255).astype(np.uint8)
    rgba = np.dstack([despilled, alpha_uint8])
    return rgba, fg_mask

# Test on frame 60 (peeking), 150 (down), 280 (thinking), 380 (waving)
test_frames = [60, 150, 280, 380]
for f in test_frames:
    raw = cv2.imread(f'public/frames/frame_{f:04d}.jpg')
    rgba, fg_mask = create_cutout(raw)
    
    # Composite on Navy #092B45 (BGR: [0x45, 0x2B, 0x09])
    navy = np.zeros_like(raw)
    navy[:, :] = [0x45, 0x2B, 0x09]
    a = (rgba[:, :, 3].astype(np.float32) / 255.0)[:, :, None]
    comp_navy = (rgba[:, :, :3].astype(np.float32) * a + navy.astype(np.float32) * (1.0 - a)).astype(np.uint8)
    
    # Save before / after comparison side by side
    # Left: original frame, Right: composited on dark navy
    comparison = np.hstack([raw, comp_navy])
    # Resize to 50% for quick inspection
    h, w, _ = comparison.shape
    comp_small = cv2.resize(comparison, (w // 2, h // 2), interpolation=cv2.INTER_AREA)
    cv2.imwrite(f'public/compare_frame_{f}.jpg', comp_small)
    cv2.imwrite(f'public/test_cutout_{f}.png', rgba)

print("Saved side-by-side comparison images to public/compare_frame_*.jpg!")

