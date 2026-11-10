import os
import zipfile
import shutil

zips_info = [
    ("peeking_from_right_edge", r"C:\Users\kamal\.gemini\antigravity\brain\0614264e-fe09-4af0-a073-ce4908368731\.user_uploaded\media_1794307107640_f05de941.zip"),
    ("looking_down", r"C:\Users\kamal\.gemini\antigravity\brain\0614264e-fe09-4af0-a073-ce4908368731\.user_uploaded\media_1794307107515_af0d6daa.zip"),
    ("looking_right_left", r"C:\Users\kamal\.gemini\antigravity\brain\0614264e-fe09-4af0-a073-ce4908368731\.user_uploaded\media_1794307107493_4807ce27.zip"),
    ("look_left_and_waving_hello", r"C:\Users\kamal\.gemini\antigravity\brain\0614264e-fe09-4af0-a073-ce4908368731\.user_uploaded\media_1794307107465_a705027a.zip")
]

dest_dir = r"public\frames"
os.makedirs(dest_dir, exist_ok=True)

global_index = 1
mapping = {}

for name, zip_path in zips_info:
    print(f"Extracting {name}...")
    start_idx = global_index
    with zipfile.ZipFile(zip_path, 'r') as zf:
        file_list = sorted([f for f in zf.namelist() if f.lower().endswith(('.jpg', '.jpeg', '.png')) and not f.startswith('__')])
        for fname in file_list:
            out_name = f"frame_{global_index:04d}.jpg"
            out_path = os.path.join(dest_dir, out_name)
            with zf.open(fname) as source, open(out_path, "wb") as target:
                shutil.copyfileobj(source, target)
            global_index += 1
    end_idx = global_index - 1
    mapping[name] = (start_idx, end_idx, end_idx - start_idx + 1)
    print(f"  -> Extracted {mapping[name][2]} frames (frame_{start_idx:04d}.jpg to frame_{end_idx:04d}.jpg)")

print(f"Total extracted frames: {global_index - 1}")
print("Mapping:", mapping)

