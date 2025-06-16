import os
import json

FOLDER_PATH = "./"  # <- Change this to your actual folder path
OUTPUT_JSON = "guitarImprov.json"

left_ear_files = []
right_ear_files = []

for filename in sorted(os.listdir(FOLDER_PATH)):
    if filename.endswith(".wav"):
        full_path = os.path.join(FOLDER_PATH, filename)
        if filename.lower().startswith("leftear"):
            left_ear_files.append(full_path)
        elif filename.lower().startswith("rightear"):
            right_ear_files.append(full_path)

output = {
    "left": left_ear_files,
    "right": right_ear_files
}

with open(OUTPUT_JSON, "w") as f:
    json.dump(output, f, indent=4)

print(f"JSON file saved to {OUTPUT_JSON}")

