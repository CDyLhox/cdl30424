#!/bin/bash

# Change to the directory containing the images
cd reset || exit

# Loop through all images in the directory
for file in *.{jpg,png,heic,JPG,PNG,HEIC}; do
    # Check if the file exists
    if [ -f "$file" ]; then
        # Get the creation date in YYYYMMDD_HHMMSS format
        creation_date=$(exiftool -d "%Y%m%d_%H%M%S" -CreateDate -S -s "$file" | awk '{print $1}')

        # If the creation date was found, rename the file
        if [ -n "$creation_date" ]; then
            # Construct the new filename
            new_filename="${creation_date}.jpg"

            # Convert the file to JPG if it's not already a JPG
            if [[ "$file" != *.jpg ]]; then
                convert "$file" "$new_filename"
                rm "$file"  # Remove the original file after conversion
            else
                mv "$file" "$new_filename"
            fi

            echo "Renamed and converted $file to $new_filename"
        else
            echo "Could not find creation date for $file"
        fi
    fi
done
