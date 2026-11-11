// Simple line icons, 64x64 grid, drawn with currentColor.
export default function SectorIcon({ id, className = '' }) {
  const common = {
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }

  switch (id) {
    case 'solar':
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="10" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4
            const x1 = 32 + Math.cos(a) * 16
            const y1 = 32 + Math.sin(a) * 16
            const x2 = 32 + Math.cos(a) * 24
            const y2 = 32 + Math.sin(a) * 24
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          })}
        </svg>
      )
    case 'bess':
      return (
        <svg {...common}>
          <rect x="10" y="20" width="40" height="24" rx="4" />
          <rect x="50" y="28" width="5" height="8" rx="1.5" />
          <path d="M31 24 L25 34 H32 L29 44 L39 31 H32 L35 24 Z" />
        </svg>
      )
    case 'wind':
      return (
        <svg {...common}>
          <path d="M32 30 V58" />
          <circle cx="32" cy="28" r="2.5" />
          <path d="M32 28 V8 M32 28 L49 38 M32 28 L15 38" />
          <path d="M22 58 H42" />
        </svg>
      )
    case 'ht':
      return (
        <svg {...common}>
          <path d="M32 8 L21 58 M32 8 L43 58" />
          <path d="M16 20 H48 M23 34 H41 M20 46 H44" />
          <path d="M21 58 H43" />
        </svg>
      )
    case 'eht':
      return (
        <svg {...common}>
          <path d="M32 6 V58" />
          <path d="M12 16 H52 M17 28 H47 M22 40 H42" />
          <path d="M12 16 V22 M52 16 V22 M17 28 V34 M47 28 V34" />
          <path d="M32 6 L12 16 M32 6 L52 16" />
          <path d="M24 58 H40" />
        </svg>
      )
    case 'pumps':
    default:
      return (
        <svg {...common}>
          <circle cx="28" cy="34" r="15" />
          <circle cx="28" cy="34" r="4" />
          <path d="M43 28 H58 M58 22 V34" />
          <path d="M14 54 H42" />
        </svg>
      )
  }
}
