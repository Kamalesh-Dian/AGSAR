# AGSAR Electromechanical Engineering LLP: website

React + Vite, Tailwind CSS, GSAP (ScrollTrigger) and Framer Motion.

## Run

```bash
npm install
npm run dev      # local preview
npm run build    # production build into dist/
```

## Edit

- **All copy and contact details:** `src/content.js` (sectors, voltage classes, process steps, contact info). Text marked DRAFT was written from your sector list, so check it against AGSAR's real scope.
- **Images and video:** see `MEDIA_PROMPTS.md`. Put files in `public/media/`. Missing files fall back to illustrated gradients.
- **Colours and fonts:** `tailwind.config.js`.
- **Contact form:** currently opens the visitor's email app (`mailto:`). Replace the `onSubmit` in `src/components/Contact.jsx` with a form service or API when you have one.

## Animation map

| Section | What moves | Tool |
|---|---|---|
| Hero | Sun sets and sky darkens as you scroll, layered parallax, turbines spin, panels glint | GSAP ScrollTrigger + CSS |
| Hero text | Headline words rise in | Framer Motion |
| Sectors | Cards widen with a spring and the picture re-crops | Framer Motion |
| Grid | Voltage bars grow in sequence | Framer Motion |
| About | Video frame opens with a clip-path reveal | Framer Motion |
| Process | Line fills as you scroll, dots light up | GSAP ScrollTrigger |
| Navbar | Hides on scroll down, returns on scroll up | Framer Motion |

Animations respect the visitor's reduced-motion setting.
