import os
import json

# Set the folder path and output file
folder_path = "img/gallery/taiwan2"
output_file = "galleryImagesTaiwan2.json"

# List to hold image metadata
images = []

# Iterate through files in the folder
for file in sorted(os.listdir(folder_path)):
    if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
        # Use relative URL
        images.append({"name": file, "url": f"{folder_path}/{file}"})

# Write the JSON to the output file
with open(output_file, "w") as f:
    json.dump(images, f, indent=2)

print(f"JSON file created: {output_file}")
