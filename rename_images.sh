#!/bin/bash

# Find all .JPG files and rename them to .jpg
find ./public/images -name "*.JPG" -type f | while read file; do
    mv "$file" "${file%.JPG}.jpg"
done

echo "All .JPG files have been renamed to .jpg" 