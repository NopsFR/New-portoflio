# Cipher Protocol — Oscar Senior's Portfolio

A cybersecurity-themed portfolio website built with React, Vite, and Tailwind CSS. Features a dark obsidian theme with Cyber Lime accents, HUD-style navigation, and real TryHackMe profile integration.

## Visual Identity

- **Theme**: Deep obsidian (#050505) with Cyber Lime (#CCFF00) accent signals
- **Typography**: JetBrains Mono for technical data, Inter for prose
- **Effects**: Animated scan-lines, blueprint-grid aesthetic, outlined display text
- **Accessibility**: WCAG AAA contrast (18:1+), prefers-reduced-motion respected

## Features

- **Identity Header**: Massive outlined display name with live GMT clock and STATUS indicator
- **HUD Navigation**: Sticky right-side rail with vertical numbered section links
- **TryHackMe Tracker**: Live stats including rank, tier, rooms completed, and pathway badges
- **Technical Arsenal**: Skills grouped by category with terminal-style kbd tags
- **Achievement Gallery**: Digital badges displayed as grid of icons with hover tooltips
- **Responsive Design**: Optimized for desktop and mobile experiences
- **Single Source of Truth**: All content lives in `lib/profileData.js`

## Project Structure

```
CV1/
├── src/
│   ├── components/
│   │   └── cipher/
│   │       ├── HeroSection.jsx
│   │       ├── TryHackMeTracker.jsx
│   │       ├── TechArsenal.jsx
│   │       ├── AchievementGallery.jsx
│   │       ├── SideNav.jsx
│   │       ├── Overlays.jsx
│   │       ├── Footer.jsx
│   │       └── index.js
│   ├── lib/
│   │   └── profileData.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to view the site.

### Build for Production

```bash
npm run build
```

## Updating Profile Data

All content is pulled from `src/lib/profileData.js`. Edit this single file to update:

- Personal information (name, bio, location)
- TryHackMe stats and profile link
- Completed pathways
- Skills and technical expertise
- Achievement badges
- Navigation sections

## Accessibility

- Semantic HTML throughout
- 18:1+ contrast ratios (WCAG AAA)
- Focus rings in Cyber Lime (#CCFF00)
- Prefers-reduced-motion support for all animations
- Proper heading hierarchy and ARIA labels

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Technologies

- **React 18.2**: UI library
- **Vite 4.4**: Build tool
- **Tailwind CSS 3.3**: Utility-first CSS
- **Lucide React 0.344**: Icon library
- **Framer Motion 10.16**: Animation library (ready to extend)

## License

© 2024 Oscar Senior. All rights reserved.
