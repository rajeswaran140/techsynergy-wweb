# Open Graph Image Guide

All metadata has been updated to reference Open Graph images. You now need to create the actual image file.

## Required Image

**File**: `public/og-default.png`
**Dimensions**: 1200 × 630 pixels
**Format**: PNG or JPG
**Size**: Keep under 1MB (recommended <300KB)

## What to Include in the Image

Your OG image should include:
1. **TechSynergy logo** - prominently displayed
2. **Tagline** - e.g., "Canadian Software Development"
3. **Brand colors** - Use your primary blue (#1160f7) and dark navy (#071237)
4. **Clean, professional design** - avoid clutter

## Design Options

### Option 1: Use a Design Tool
- **Canva** (easiest): https://www.canva.com/create/open-graph/
  - Search for "Open Graph" templates
  - Customize with your logo and colors
  - Export as 1200×630 PNG

- **Figma** (professional):
  - Create artboard: 1200×630px
  - Add gradient background (navy to blue)
  - Add logo and text
  - Export as PNG

### Option 2: AI Generation
Use an AI image generator with this prompt:

```
Professional social media banner, 1200x630 pixels, modern tech company design,
dark blue gradient background (#071237 to #1160f7), "TechSynergy" logo
centered, tagline "Canadian Software Development", clean minimalist style,
no people, geometric shapes, professional business aesthetic
```

Try:
- **Midjourney**: Best quality
- **DALL-E 3**: Good for text
- **Leonardo.ai**: Free option

### Option 3: Simple Template

If you need something quick, here's a simple layout:

```
┌──────────────────────────────────────┐
│                                      │
│         [TechSynergy Logo]           │
│                                      │
│    Canadian Software Development     │
│                                      │
│  Building Privacy-First SaaS Products│
│                                      │
└──────────────────────────────────────┘
```

Background: Gradient from #071237 (top) to #1160f7 (bottom)
Text: White, centered
Logo: White version of your logo

## Verification

After creating the image:

1. Save as: `c:\Users\rajes\Techsynergy-web\public\og-default.png`
2. Test on social platforms:
   - **Facebook Debugger**: https://developers.facebook.com/tools/debug/
   - **Twitter Card Validator**: https://cards-dev.twitter.com/validator
   - **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

## Current References

All pages now reference `/og-default.png` in their metadata:
- Homepage (/)
- About (/about)
- Services (/services + all service detail pages)
- Products (/products)
- Portfolio (/portfolio)
- Pricing (/pricing)
- Blog (/blog + all blog posts)
- Contact (/contact)

## Quick Checklist

- [ ] Create og-default.png (1200×630px)
- [ ] Save to public/og-default.png
- [ ] Verify file size (<1MB)
- [ ] Test on Facebook Debugger
- [ ] Test on Twitter Card Validator
- [ ] (Optional) Create page-specific images later

## Page-Specific Images (Optional Enhancement)

For better social engagement, consider creating custom OG images for:
- Homepage: Feature your products (Mobily.ca, SeoSync.ca)
- Services: Show relevant service icons
- Blog posts: Custom image for each post

These can be added later as enhancements.

---

**Important**: Without an OG image, social shares will look broken. This is the #1 priority after deploying the SEO fixes.
