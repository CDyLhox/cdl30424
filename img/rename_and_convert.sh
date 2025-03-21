#!/bin/bash

# Ensure the directory exists
if [ ! -d "processed" ]; then
  mkdir processed
fi

# Initialize counter
counter=1

# Loop through all image files in the directory
for file in *.{jpg,jpeg,png,heic}; do
  # Skip if no matching files are found
  [ -e "$file" ] || continue

  # Extract the file extension
  extension="${file##*.}"
  
  # Construct the new filename with the counter
  new_filename="${counter}.${extension}"

  # Convert the image format if needed and rename it
  magick convert "$file" "processed/$new_filename"

  echo "Renamed and converted $file to $new_filename"

  # Increment the counter
  ((counter++))
done
``