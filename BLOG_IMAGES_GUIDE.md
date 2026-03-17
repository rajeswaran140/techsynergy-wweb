# Blog Images Guide

This guide shows you exactly which images to download for your blog posts.

## Directory Structure

All images should be saved to: `public/images/blog/`

The directory has been created and is ready for your images.

## Image Requirements

- **Format**: WebP (for optimal performance)
- **Dimensions**: 1200×600px (2:1 aspect ratio)
- **Size**: Keep under 200KB for fast loading
- **Naming**: Use exact filenames listed below

## How to Download & Convert from Unsplash

1. Go to the Unsplash URL provided
2. Click the download button (creates a JPG)
3. Convert to WebP using one of these methods:
   - **Online**: https://cloudconvert.com/jpg-to-webp
   - **Command line** (if you have ImageMagick):
     ```bash
     convert input.jpg -resize 1200x600^ -gravity center -extent 1200x600 output.webp
     ```
   - **Photoshop/GIMP**: Export as WebP format

## Images Needed

### 1. Digital Transformation
- **Filename**: `digital-transformation.webp`
- **Unsplash URL**: https://unsplash.com/photos/KE0nC8-58MQ
- **Search terms**: "business team technology collaboration office"
- **Description**: Professional team working together with laptops and technology in modern office setting

### 2. ROI Software
- **Filename**: `roi-software.webp`
- **Unsplash URL**: https://unsplash.com/photos/5fNmWej4tAA
- **Search terms**: "business analytics dashboard charts data"
- **Description**: Person analyzing data on computer screen with charts and graphs visible

### 3. Technology Partner
- **Filename**: `technology-partner.webp`
- **Unsplash URL**: https://unsplash.com/photos/UD-rSIm2WaY
- **Search terms**: "business handshake partnership professional"
- **Description**: Professional business handshake or partnership meeting scene

### 4. Data Privacy
- **Filename**: `data-privacy.webp`
- **Unsplash URL**: https://unsplash.com/photos/iar-afB0QQw
- **Search terms**: "cybersecurity data protection lock technology"
- **Description**: Digital security concept - laptop with padlock or cybersecurity visualization

### 5. Product Roadmap
- **Filename**: `product-roadmap.webp`
- **Unsplash URL**: https://unsplash.com/photos/CpkOjOcXdUY
- **Search terms**: "business strategy planning meeting whiteboard"
- **Description**: Team planning session with whiteboard, sticky notes, or strategy discussion

### 6. Startups Success
- **Filename**: `startups-success.webp`
- **Unsplash URL**: https://unsplash.com/photos/QckxruozjRg
- **Search terms**: "startup team working entrepreneur collaboration"
- **Description**: Young startup team collaborating in modern office environment

### 7. Default/Fallback (Optional)
- **Filename**: `default.webp`
- **Unsplash URL**: https://unsplash.com/photos/npxXWgQ33ZQ
- **Search terms**: "abstract technology blue background"
- **Description**: Clean abstract background as fallback for any future posts

## Alternative: AI-Generated Images

If you prefer AI-generated images instead of stock photos:

1. **DALL-E / Midjourney** prompts:
   - "Professional business team collaborating with technology, modern office, photorealistic, bright lighting"
   - "Business analytics dashboard with charts and graphs on computer screen, professional setting"
   - "Business partnership handshake, professional corporate meeting, photorealistic"
   - "Cybersecurity concept, digital padlock protecting data, technology visualization"
   - "Business strategy planning meeting, team with whiteboard and sticky notes"
   - "Startup founders working together in modern office, collaborative atmosphere"

2. Export at 1200×600px in WebP format

## Verification

After adding images, verify they work:

```bash
npm run dev
```

Then visit:
- http://localhost:3000/blog (check all card thumbnails)
- http://localhost:3000/blog/digital-transformation-canadian-businesses-2026 (check hero image)

All images should load quickly and look professional.

## Next Steps

Once images are in place, the blog will automatically use them instead of the abstract SVG illustrations.

## Quick Summary

```bash
# Images needed in public/images/blog/:
digital-transformation.webp  (1200×600px, <200KB)
roi-software.webp           (1200×600px, <200KB)
technology-partner.webp     (1200×600px, <200KB)
data-privacy.webp           (1200×600px, <200KB)
product-roadmap.webp        (1200×600px, <200KB)
startups-success.webp       (1200×600px, <200KB)
default.webp                (1200×600px, <200KB) [optional]
```

---

**Tip**: You can batch convert multiple JPGs to WebP with this bash command:
```bash
cd public/images/blog
for img in *.jpg; do convert "$img" -resize 1200x600^ -gravity center -extent 1200x600 "${img%.jpg}.webp"; done
```
