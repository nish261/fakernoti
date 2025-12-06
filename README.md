# Pixel-Perfect iOS Lock Screen Notification Generator

A web app that generates **pixel-perfect** iOS lock screen notifications based on the exact Figma design specifications.

## ✨ Features

- **Pixel-perfect iOS notifications** - Built using exact Figma specs (not approximations)
- **Multiple notifications** - Add/remove as many as you need
- **Profile photos** - Circular contact photos with iMessage badge support
- **Custom icons** - Upload any app icon
- **Custom wallpaper** - Upload your own background image
- **Screenshot export** - Download high-res screenshots (3x scale = iPhone resolution)
- **Real-time preview** - See changes instantly

## 🎯 What Makes This Pixel-Perfect?

All values are extracted directly from the Figma design system:

- **Border-radius**: 22px (not the common 13px mistake)
- **Icon size**: 38px × 38px (not 40px)
- **Font sizes**:
  - App name: 16px / 600 weight
  - Time: 12px / 400 weight
  - Message: 14px / 400 weight
- **Line-height**: 18px consistently
- **Letter-spacing**: -0.408px (iOS standard)
- **Colors**:
  - Light mode: `rgba(234, 234, 234, 0.7)`
  - Dark mode: `rgba(49, 49, 49, 0.6)`
  - Text primary: `#111111`
  - Text tertiary: `#565656`
- **Backdrop blur**: 40px
- **Spacing**: 12px padding, 9px gap between icon/content

## 🚀 Quick Start

### Option 1: Open Directly
```bash
cd ~/iphone-lock-screen-generator
open index.html
```

### Option 2: Local Server (Recommended)
```bash
cd ~/iphone-lock-screen-generator
python3 -m http.server 8080
# Open http://localhost:8080 in your browser
```

## 📝 How to Use

1. **Set Lock Screen Details**
   - Date (e.g., "Thursday, November 27")
   - Time (e.g., "13:22")
   - Upload custom wallpaper (optional)

2. **Customize Notifications**
   - Each notification has:
     - App name/Contact name
     - Time ("now", "5m ago", etc.)
     - Message text
     - Icon/profile photo upload
     - Toggle for circular profile photo
     - Toggle for iMessage badge

3. **Add/Remove Notifications**
   - Click "+ Add Notification" to add more
   - Click "Remove" to delete notifications

4. **Download**
   - Click "📸 Download Screenshot"
   - Gets saved as high-res PNG (1179px wide - iPhone 13 Pro resolution)

## 🎨 Design Specifications Source

All specifications are from the official iOS Lock Screen Figma Community file:
https://www.figma.com/design/X09YvsXCErmcYWJU4fmAfs/iPhone-Lock-Screen--Community-

## 📂 Project Structure

```
iphone-lock-screen-generator/
├── index.html          # Main HTML structure
├── style.css          # Pixel-perfect iOS styling (based on Figma)
├── script.js          # Notification management & download
├── README.md          # This file
├── reference/         # Angular reference implementation
└── swift-assets/      # Original Swift app (for comparison)
```

## 💡 Key Differences from Swift Version

The Swift app had slightly different values. This web version uses **exact Figma specs**:

| Property | Swift Version | Figma Version (This App) |
|----------|--------------|-------------------------|
| Border-radius | 13px | **22px** |
| Icon size | 40×40px | **38×38px** |
| App name font | 14px | **16px** |
| Time font | 13px | **12px** |
| Icon border-radius | 9px | **8px** |

## 🛠️ Tech Stack

- **HTML5** - Structure
- **CSS3** - Pixel-perfect styling with backdrop-filter
- **Vanilla JavaScript** - No frameworks, pure JS
- **html2canvas** - Screenshot generation
- **SF Pro Text** - Official Apple font (via CDN)

## 📱 Browser Support

Works best in:
- Safari (native backdrop-filter support)
- Chrome/Edge (with backdrop-filter)
- Firefox (with backdrop-filter enabled)

## 🎯 Use Cases

- **Social media content** - Create realistic iOS notification screenshots
- **Marketing materials** - Show app notifications in promotional content
- **UI/UX presentations** - Demo notification designs
- **Pranks** - Create fake messages (harmless fun!)

## ⚙️ Customization

Edit `style.css` to:
- Change notification width (default: 357px)
- Adjust blur intensity (default: 40px)
- Modify colors for different iOS versions
- Add new notification types

## 📄 License

Free to use. Based on iOS design guidelines and Figma community resources.

## 🙏 Credits

- Figma Community for the iOS Lock Screen design specs
- Apple for SF Pro font and iOS design language
- html2canvas for screenshot functionality
