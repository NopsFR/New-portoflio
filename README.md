# Modern Portfolio - Oscar

A premium, futuristic portfolio built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion. Featuring glassmorphism, animated backgrounds, and smooth interactions inspired by e-z.bio.

🔗 **Live Demo**: [portfolio-nopsfrs-projects.vercel.app](https://portfolio-nopsfrs-projects.vercel.app/)

## ✨ Features

### Design
- **Futuristic Aesthetic** - Dark theme with purple/blue glow accents
- **Glassmorphism** - Frosted glass cards and elements
- **Animated Background** - Dynamic gradient orbs and grid patterns
- **Premium Typography** - Large, clean visual hierarchy
- **Responsive Design** - Flawless on mobile, tablet, and desktop

### Sections
- **Hero** - Immersive introduction with animated elements
- **About** - Personal story and background
- **Skills** - Technical abilities with visual tags
- **Work** - Project showcase with hover effects
- **TryHackMe Progress** - Cybersecurity learning journey
- **Contact** - Functional contact form with social links

### Interactions
- Smooth scrolling navigation
- Animated page reveals on scroll
- Hover animations on all interactive elements
- Floating navbar with mobile menu
- Loading animations
- Scroll progress indicator

## 🏗️ Project Structure

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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: latest LTS)
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

## 🌐 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy this portfolio is using [Vercel](https://vercel.com):

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

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📝 Customization

### Update Personal Information

1. **Basic Info** - Edit `sections/Hero.tsx`, `sections/About.tsx`
2. **Skills** - Modify the skills array in `sections/Skills.tsx`
3. **Projects** - Update the projects array in `sections/Work.tsx`
4. **Contact** - Change email and social links in `sections/Contact.tsx`
5. **TryHackMe** - Update stats in `sections/THMProgress.tsx`

### Styling

- **Colors** - Modify the color palette in `tailwind.config.ts`
- **Global Styles** - Edit `app/globals.css`
- **Component Styles** - Update individual component files

### Adding New Sections

1. Create a new component in `sections/YourSection.tsx`
2. Import it in `app/page.tsx`
3. Add it to the page layout

## 🎯 Features in Detail

### Glassmorphism Effect
Used throughout the design with `backdrop-blur` and semi-transparent backgrounds.

### Animated Background
- Gradient orbs that pulse and move
- Grid pattern overlay
- Smooth transitions between states

### Responsive Design
- Mobile-first approach
- Breakpoints at 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch-friendly interactions

### Performance
- Static generation for fast load times
- Optimized images and assets
- Minimal dependencies
- Efficient animations

## 📄 License

This project is open source and available for personal use.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements.

## 📧 Contact

- **Email**: hello@portfolio.com
- **GitHub**: [github.com/bigst](https://github.com/bigst)
- **LinkedIn**: [linkedin.com/in/bigst](https://linkedin.com/in/bigst)
- **Twitter**: [twitter.com/bigst](https://twitter.com/bigst)

---

Built with ❤️ by Oscar using Next.js, Tailwind CSS, and Framer Motion.