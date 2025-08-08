# PWA Icon Generation Instructions

## Required Icons for PWA:

1. **pwa-192x192.png** (192x192 pixels)
2. **pwa-512x512.png** (512x512 pixels)  
3. **apple-touch-icon.png** (180x180 pixels)
4. **favicon-32x32.png** (32x32 pixels)
5. **favicon-16x16.png** (16x16 pixels)
6. **masked-icon.svg** (SVG format)

## How to Create Icons:

### Option 1: Use Online Generator
1. Go to https://realfavicongenerator.net/
2. Upload your logo (at least 512x512 pixels)
3. Configure settings for each platform
4. Download and place in `/public` folder

### Option 2: Manual Creation
1. Create a square logo design (512x512 recommended)
2. Use image editing software to resize:
   - 512x512 for large icon
   - 192x192 for standard icon
   - 180x180 for Apple touch icon
   - 32x32 and 16x16 for favicons

### Design Guidelines:
- **Simple and recognizable** at small sizes
- **High contrast** for visibility
- **No text** (may not be readable at small sizes)
- **Square format** with rounded corners handled by system
- **Consistent branding** with your website

## Current Placeholder:
The current configuration uses placeholder paths. Replace with actual icons once created.

## Testing Icons:
1. Build the project: `npm run build`
2. Serve the built files: `npm run preview`  
3. Open in mobile browser
4. Look for "Add to Home Screen" option
5. Test app icon appearance
