import cv2
import numpy as np
import os

def test_keying(frame_path, out_path):
    img = cv2.imread(frame_path)
    h, w, c = img.shape
    
    # Sample background color from borders/corners
    # Top-left, top-right, bottom-left, bottom-right patches
    tl = img[0:30, 0:30]
    tr = img[0:30, w-30:w]
    bl = img[h-30:h, 0:30]
    br = img[h-30:h, w-30:w]
    
    bg_samples = np.vstack([tl.reshape(-1, 3), tr.reshape(-1, 3), bl.reshape(-1, 3), br.reshape(-1, 3)])
    bg_mean = np.median(bg_samples, axis=0) # [B, G, R]
    bg_std = np.std(bg_samples, axis=0)
    print(f"{os.path.basename(frame_path)}: bg_mean BGR = {bg_mean}, bg_std = {bg_std}")
    
    # Calculate Euclidean distance in Lab or BGR color space
    # Lab is much more perceptually uniform
    img_lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    # create 1x1 image of bg_mean
    bg_img = np.uint8([[bg_mean]])
    bg_lab = cv2.cvtColor(bg_img, cv2.COLOR_BGR2LAB)[0, 0]
    
    diff = np.linalg.norm(img_lab.astype(np.float32) - bg_lab.astype(np.float32), axis=2)
    print(f"Diff min={diff.min():.1f}, max={diff.max():.1f}, 5th percentile={np.percentile(diff, 5):.1f}, 95th={np.percentile(diff, 95):.1f}")
    
    # Also check if background gradient exists (top to bottom or left to right)
    # Estimate background plane or local background
    # Let's inspect diff distribution
    return diff

diff = test_keying('public/frames/frame_0060.jpg', 'test_out.png')
diff2 = test_keying('public/frames/frame_0250.jpg', 'test_out2.png')

