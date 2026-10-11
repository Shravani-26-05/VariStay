# VariStay Image Assets & Customization Guide

All shelter listing photos in VariStay use realistic, high-resolution Maharashtrian temple, Bhakta Niwas, and community hall visuals.

## Image Storage Location
- External image URLs are configured in `src/data/shelters.js`.
- Local offline replacement assets can be placed right in this folder: `public/images/`.

## How to replace images with your own custom photos:
1. Copy your `.jpg` or `.png` shelter photos into this `public/images/` folder (e.g. `public/images/shelter1.jpg`).
2. Open `src/data/shelters.js`.
3. Update the `images` array of the target shelter record:
   ```javascript
   images: [
     "/images/shelter1.jpg",
     "/images/shelter1_hall.jpg"
   ]
   ```
4. Save the file. The application will instantly render your local shelter photos!
