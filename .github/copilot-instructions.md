# Cipher Protocol — Custom Instructions

This workspace contains the Cipher Protocol portfolio website for Oscar Senior.

## Quick Start

```bash
npm run dev    # Start development server (http://localhost:5173)
npm run build  # Build for production
npm run preview # Preview production build
```

## Single Source of Truth

All profile content lives in **`src/lib/profileData.js`**. Edit this file to update:
- Personal info, bio, location
- TryHackMe stats and profile link
- Completed pathways
- Technical skills
- Achievement badges
- Navigation sections

Changes to this file automatically reflect across all components.

## Project Structure

- `src/components/cipher/` — All UI components
- `src/lib/profileData.js` — Data file (edit this)
- `tailwind.config.js` — Theme colors and animations
- `index.html` — Entry point

## Design System

- **Colors**: Obsidian (#050505), Cyber Lime (#CCFF00)
- **Typography**: JetBrains Mono (code), Inter (prose)
- **Accessibility**: WCAG AAA (18:1+ contrast), prefers-reduced-motion support

## Components

1. **HeroSection** — Identity header with live GMT clock
2. **TryHackMeTracker** — Real-time TryHackMe stats
3. **TechArsenal** — Skills grouped by category
4. **AchievementGallery** — Digital badges with hover tooltips
5. **SideNav** — Sticky right-rail HUD navigation
6. **Overlays** — Scan-line and grid background effects
7. **Footer** — System status bar

## Customization

- Update colors in `tailwind.config.js` theme section
- Modify animations in `tailwind.config.js` keyframes
- Edit component styling in individual `.jsx` files
- All data flows from `src/lib/profileData.js`

## Notes

- No external API calls — fully static data
- Built with React 18 + Vite for fast dev experience
- Uses Tailwind CSS for responsive design
- Lucide React for icons
