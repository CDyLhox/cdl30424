import os
import json

# Set the folder path and output file
folder_path = "music/demos"
output_file = "demoSongs.json"

# List to hold image metadata
songs = []

# Iterate through files in the folder
for file in sorted(os.listdir(folder_path)):
    if file.lower().endswith(('.mp3', '.wav', '.aiff', '.flac')):
        # Use relative URL
        songs.append({"name": file, "url": f"{folder_path}/{file}"})

# Write the JSON to the output file
with open(output_file, "w") as f:
    json.dump(songs, f, indent=2)

print(f"JSON file created: {output_file}")
