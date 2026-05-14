# Modern Portfolio - Oscar

A portfolio site built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion. Dark theme with glassmorphism effects and animated backgrounds.

🔗 **Live Demo**: [portfolio-nopsfrs-projects.vercel.app](https://portfolio-nopsfrs-projects.vercel.app/)

## What This Is

This is my personal portfolio — part showcase, part learning project. I built it to practice modern frontend techniques (Framer Motion animations, glassmorphism, responsive design) while also documenting my cybersecurity learning journey through TryHackMe.

## Features

### Design
- **Dark theme** with purple/blue glow accents
- **Glassmorphism** — frosted glass cards and UI elements
- **Animated background** — gradient orbs that pulse and move, plus a subtle grid overlay
- **Large typography** with clear visual hierarchy
- **Fully responsive** — works on mobile, tablet, and desktop

### Sections
- **Hero** — Introduction with animated background elements
- **About** — My background and what I'm working on
- **Skills** — Technologies I use, grouped by category
- **Work** — Projects I've built (some polished, some experimental)
- **TryHackMe Progress** — My cybersecurity learning stats and progress
- **Security Knowledge** — Educational content about cybersecurity concepts
- **Contact** — Contact form and social links

### Interactions
- Smooth scrolling navigation
- Animated reveals as you scroll
- Hover effects on interactive elements
- Floating navbar with mobile hamburger menu
- Scroll progress indicator

## Project Structure

```
ModernPortfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page (assembles all sections)
│   └── globals.css         # Global styles & Tailwind
├── components/             # Reusable UI components
│   ├── ui/
│   │   └── Button.tsx      # Styled button component
│   ├── Navbar.tsx          # Floating navigation
│   ├── Footer.tsx          # Site footer
│   └── AnimatedBackground.tsx  # Background animation
├── sections/               # Page sections
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Skills.tsx          # Skills section
│   ├── Work.tsx            # Projects section
│   ├── Contact.tsx         # Contact section
│   └── THMProgress.tsx     # TryHackMe progress
├── public/                 # Static assets
├── package.json            # Dependencies
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript config
└── next.config.ts          # Next.js configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ (latest LTS recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bigst/ModernPortfolio.git
   cd ModernPortfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/bigst/ModernPortfolio.git
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure settings
   - Click "Deploy"

3. **Deploy via CLI**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `.next` folder and static files to your hosting provider**

3. **For static export (if needed)**
   ```bash
   npm run build
   # Output will be in the `out` folder
   ```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## Customization

### Update Personal Information

1. **Basic Info** — Edit `sections/Hero.tsx`, `sections/About.tsx`
2. **Skills** — Modify the skills array in `sections/Skills.tsx`
3. **Projects** — Update the projects array in `sections/Work.tsx`
4. **Contact** — Change email and social links in `sections/Contact.tsx`
5. **TryHackMe** — Update stats in `sections/THMProgress.tsx`

### Styling

- **Colors** — Modify the color palette in `tailwind.config.ts`
- **Global Styles** — Edit `app/globals.css`
- **Component Styles** — Update individual component files

### Adding New Sections

1. Create a new component in `sections/YourSection.tsx`
2. Import it in `app/page.tsx`
3. Add it to the page layout

## Design Details

### Glassmorphism Effect
Used throughout with `backdrop-blur` and semi-transparent backgrounds to create the frosted glass look.

### Animated Background
- Gradient orbs that pulse and move using Framer Motion
- Subtle grid pattern overlay
- Smooth transitions between animation states

### Responsive Design
- Mobile-first approach
- Breakpoints at 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch-friendly interactions with appropriate tap targets

### Performance
- Static generation for fast load times
- Optimized animations that don't block the main thread
- Minimal dependencies
- Efficient re-rendering with React memoization where needed

## License

Open source — feel free to use this for your own portfolio or learning.

## Contact

- **Email**: Oscar.s@Disc.ac.uk
- **GitHub**: [github.com/NopsFR](https://github.com/NopsFR)
- **LinkedIn**: [linkedin.com/in/OscarSenior](https://linkedin.com/in/OscarSenior)
- **TryHackMe**: [tryhackme.com/p/Oscar.Senior](https://tryhackme.com/p/Oscar.Senior)

---

Built with Next.js, Tailwind CSS, and Framer Motion.