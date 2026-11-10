# AGSAR ELECTROMECHANICAL ENGINEERING LLP – Landing Website

A premium, modern corporate landing website for **AGSAR ELECTROMECHANICAL ENGINEERING LLP**, built with React, Vite, TypeScript, Framer Motion, Lucide React, and pure Vanilla CSS.

---

## ⚡ Highlights & Key Features

- **Cinematic Full-Screen Hero**: Features background video integration (`/videos/agsar-hero.mp4`), poster fallback, dark blue gradient overlays, animated entrance typography, and an interactive **CSS 3D Energy Gyroscope** with orbital rings.
- **Strict Brand Design System**: Follows corporate engineering guidelines:
  - **Primary Corporate Blue**: `#0B3B60`
  - **Tech Blue**: `#0062B8`
  - **Dynamic Accent Red**: `#D92534`
  - **Clean White Background**: `#FFFFFF`
  - **Dark Text**: `#0E2033`
- **Interactive Solutions Portfolio**: 5 dedicated service modules with realistic high-resolution imagery, Lucide icons, 3D tilt hover effects, and an interactive **Technical Specifications Modal**:
  1. Solar Energy Solutions
  2. Battery Energy Storage Systems (BESS)
  3. Wind Power Solutions
  4. HT & EHT Electrical Solutions
  5. Pumps & Motors
- **Engineering Expertise Lifecycle**: Interactive 5-stage timeline from *Consultation & Feasibility* through *Design*, *Procurement*, *Installation*, to *Testing & Life-Cycle Maintenance*.
- **Why Choose AGSAR**: 6 core value propositions highlighting engineering expertise, quality execution, safety protocols, innovation, delivery reliability, and sustainable engineering.
- **Enterprise Contact & Inquiry Section**: Interactive inquiry form with live field validation, service interest selection, clear feedback banners, and company contact details/Google Maps integration placeholder.
- **Zero-Tailwind Vanilla CSS**: Built with modular custom CSS properties, smooth animations, glassmorphism, responsive grid layouts, and `prefers-reduced-motion` compliance.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS with CSS Custom Properties (`src/styles/variables.css`, `global.css`, `components.css`)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & Pure CSS 3D transforms
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
AGSAR/
├── public/
│   ├── images/
│   │   ├── hero-poster.jpg
│   │   ├── solar.jpg
│   │   ├── bess.jpg
│   │   ├── wind.jpg
│   │   ├── ht-eht.jpg
│   │   ├── pumps-motors.jpg
│   │   ├── about-engineering.jpg
│   │   └── og-preview.jpg
│   ├── videos/
│   │   └── agsar-hero.mp4
│   ├── logo.svg
│   └── logo-dark.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Expertise.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── styles/
│   │   ├── variables.css
│   │   ├── global.css
│   │   └── components.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended, tested on Node.js v22)
- npm (v9 or higher)

### 1. Installation

```bash
npm install
```

### 2. Development Server

Start the local development server with hot-reload:

```bash
npm run dev
```

Open `http://localhost:3000` (or the URL displayed in the terminal) in your browser.

### 3. Production Build

To type-check and generate an optimized static production bundle:

```bash
npm run build
```

The output will be placed in the `dist/` directory.

### 4. Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment to Vercel

The project is pre-configured for instant zero-configuration deployment to [Vercel](https://vercel.com):

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In the Vercel dashboard, click **"Add New Project"** and import the repository.
3. Vercel automatically detects the Vite configuration:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

Alternatively, deploy using the Vercel CLI:

```bash
npx vercel
```

---

## 📄 License & Attribution

Designed and developed for **AGSAR ELECTROMECHANICAL ENGINEERING LLP**. All rights reserved.

