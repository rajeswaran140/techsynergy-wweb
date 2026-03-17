/** Abstract SVG illustrations keyed by blog post slug */
export default function PostIllustration({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const illustrations: Record<string, React.ReactNode> = {
    "digital-transformation-canadian-businesses-2026": (
      <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Digital transformation visualization showing circuit grid, rising growth bars, and connected network nodes">
        <title>Digital transformation visualization</title>
        <rect width="800" height="400" fill="#0a1628" />
        {/* Circuit-like grid */}
        <line x1="100" y1="0" x2="100" y2="400" stroke="#1160f7" strokeOpacity="0.06" strokeWidth="1" />
        <line x1="200" y1="0" x2="200" y2="400" stroke="#1160f7" strokeOpacity="0.06" strokeWidth="1" />
        <line x1="300" y1="0" x2="300" y2="400" stroke="#1160f7" strokeOpacity="0.06" strokeWidth="1" />
        <line x1="400" y1="0" x2="400" y2="400" stroke="#1160f7" strokeOpacity="0.06" strokeWidth="1" />
        <line x1="500" y1="0" x2="500" y2="400" stroke="#1160f7" strokeOpacity="0.06" strokeWidth="1" />
        <line x1="600" y1="0" x2="600" y2="400" stroke="#1160f7" strokeOpacity="0.06" strokeWidth="1" />
        <line x1="700" y1="0" x2="700" y2="400" stroke="#1160f7" strokeOpacity="0.06" strokeWidth="1" />
        {/* Transformation arrow arc */}
        <path d="M150 320 Q400 80 650 320" stroke="#1160f7" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="8 6" fill="none" />
        <path d="M200 300 Q400 120 600 300" stroke="#1160f7" strokeOpacity="0.15" strokeWidth="1.5" fill="none" />
        {/* Nodes */}
        <circle cx="200" cy="300" r="8" fill="#1160f7" fillOpacity="0.3" />
        <circle cx="200" cy="300" r="3" fill="#1160f7" />
        <circle cx="400" cy="140" r="12" fill="#1160f7" fillOpacity="0.2" />
        <circle cx="400" cy="140" r="5" fill="#1160f7" />
        <circle cx="600" cy="300" r="8" fill="#1160f7" fillOpacity="0.3" />
        <circle cx="600" cy="300" r="3" fill="#1160f7" />
        {/* Rising bars */}
        <rect x="320" y="220" width="24" height="100" rx="4" fill="#1160f7" fillOpacity="0.08" />
        <rect x="360" y="180" width="24" height="140" rx="4" fill="#1160f7" fillOpacity="0.12" />
        <rect x="400" y="150" width="24" height="170" rx="4" fill="#1160f7" fillOpacity="0.16" />
        <rect x="440" y="120" width="24" height="200" rx="4" fill="#1160f7" fillOpacity="0.2" />
        {/* Glow */}
        <circle cx="400" cy="200" r="120" fill="#1160f7" fillOpacity="0.04" />
      </svg>
    ),

    "how-to-measure-roi-of-custom-software": (
      <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="ROI growth chart showing upward curve with data points and financial metrics">
        <title>ROI growth visualization</title>
        <rect width="800" height="400" fill="#0a1628" />
        {/* Chart axes */}
        <line x1="150" y1="50" x2="150" y2="330" stroke="#1160f7" strokeOpacity="0.2" strokeWidth="1.5" />
        <line x1="150" y1="330" x2="680" y2="330" stroke="#1160f7" strokeOpacity="0.2" strokeWidth="1.5" />
        {/* Grid lines */}
        <line x1="150" y1="230" x2="680" y2="230" stroke="#1160f7" strokeOpacity="0.05" strokeWidth="1" />
        <line x1="150" y1="130" x2="680" y2="130" stroke="#1160f7" strokeOpacity="0.05" strokeWidth="1" />
        {/* ROI curve going up */}
        <path d="M150 310 C250 300, 300 280, 350 240 S450 140, 550 100 S650 70, 680 60" stroke="#1160f7" strokeWidth="2.5" strokeOpacity="0.6" fill="none" strokeLinecap="round" />
        {/* Area fill */}
        <path d="M150 310 C250 300, 300 280, 350 240 S450 140, 550 100 S650 70, 680 60 L680 330 L150 330 Z" fill="#1160f7" fillOpacity="0.06" />
        {/* Data points */}
        <circle cx="250" cy="296" r="5" fill="#0a1628" stroke="#1160f7" strokeWidth="2" />
        <circle cx="350" cy="240" r="5" fill="#0a1628" stroke="#1160f7" strokeWidth="2" />
        <circle cx="450" cy="165" r="5" fill="#0a1628" stroke="#1160f7" strokeWidth="2" />
        <circle cx="550" cy="100" r="5" fill="#0a1628" stroke="#1160f7" strokeWidth="2" />
        <circle cx="650" cy="65" r="6" fill="#1160f7" fillOpacity="0.3" />
        <circle cx="650" cy="65" r="3" fill="#1160f7" />
        {/* Dollar sign */}
        <text x="110" y="80" fontFamily="monospace" fontSize="28" fill="#1160f7" fillOpacity="0.15">$</text>
        {/* Breakeven line */}
        <line x1="320" y1="50" x2="320" y2="330" stroke="#1160f7" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 4" />
        <text x="305" y="360" fontFamily="monospace" fontSize="10" fill="#1160f7" fillOpacity="0.3">ROI</text>
      </svg>
    ),

    "choosing-the-right-technology-partner": (
      <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Partnership network diagram with connected nodes representing collaboration and alignment">
        <title>Technology partnership visualization</title>
        <rect width="800" height="400" fill="#0a1628" />
        {/* Handshake / partnership network */}
        <circle cx="280" cy="200" r="60" stroke="#1160f7" strokeOpacity="0.15" strokeWidth="1.5" fill="#1160f7" fillOpacity="0.03" />
        <circle cx="520" cy="200" r="60" stroke="#1160f7" strokeOpacity="0.15" strokeWidth="1.5" fill="#1160f7" fillOpacity="0.03" />
        {/* Connection lines */}
        <line x1="340" y1="200" x2="460" y2="200" stroke="#1160f7" strokeOpacity="0.4" strokeWidth="2" />
        <line x1="345" y1="190" x2="455" y2="190" stroke="#1160f7" strokeOpacity="0.15" strokeWidth="1" />
        <line x1="345" y1="210" x2="455" y2="210" stroke="#1160f7" strokeOpacity="0.15" strokeWidth="1" />
        {/* Center merge point */}
        <circle cx="400" cy="200" r="10" fill="#1160f7" fillOpacity="0.25" />
        <circle cx="400" cy="200" r="4" fill="#1160f7" />
        {/* Orbiting nodes — left */}
        <circle cx="230" cy="150" r="5" fill="#1160f7" fillOpacity="0.3" />
        <line x1="230" y1="150" x2="265" y2="175" stroke="#1160f7" strokeOpacity="0.15" strokeWidth="1" />
        <circle cx="240" cy="260" r="4" fill="#1160f7" fillOpacity="0.2" />
        <line x1="240" y1="260" x2="268" y2="235" stroke="#1160f7" strokeOpacity="0.1" strokeWidth="1" />
        <circle cx="200" cy="195" r="3" fill="#1160f7" fillOpacity="0.2" />
        {/* Orbiting nodes — right */}
        <circle cx="570" cy="145" r="5" fill="#1160f7" fillOpacity="0.3" />
        <line x1="570" y1="145" x2="540" y2="170" stroke="#1160f7" strokeOpacity="0.15" strokeWidth="1" />
        <circle cx="580" cy="255" r="4" fill="#1160f7" fillOpacity="0.2" />
        <line x1="580" y1="255" x2="545" y2="230" stroke="#1160f7" strokeOpacity="0.1" strokeWidth="1" />
        <circle cx="600" cy="200" r="3" fill="#1160f7" fillOpacity="0.2" />
        {/* Checkmark in left */}
        <path d="M265 200 L275 212 L295 188" stroke="#1160f7" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Star in right */}
        <path d="M520 185 L523 195 L533 195 L525 201 L528 211 L520 205 L512 211 L515 201 L507 195 L517 195 Z" fill="#1160f7" fillOpacity="0.3" />
        {/* Outer glow */}
        <circle cx="400" cy="200" r="160" stroke="#1160f7" strokeOpacity="0.04" strokeWidth="1" fill="none" />
      </svg>
    ),

    "data-privacy-competitive-advantage-canada": (
      <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Security shield with lock icon and data streams representing Canadian data privacy protection">
        <title>Data privacy and security visualization</title>
        <rect width="800" height="400" fill="#0a1628" />
        {/* Shield outline */}
        <path d="M400 80 L500 120 L500 240 Q500 320 400 350 Q300 320 300 240 L300 120 Z" stroke="#1160f7" strokeOpacity="0.25" strokeWidth="2" fill="#1160f7" fillOpacity="0.04" />
        <path d="M400 100 L480 132 L480 235 Q480 300 400 325 Q320 300 320 235 L320 132 Z" stroke="#1160f7" strokeOpacity="0.1" strokeWidth="1" fill="none" />
        {/* Lock icon inside shield */}
        <rect x="378" y="190" width="44" height="35" rx="4" stroke="#1160f7" strokeOpacity="0.5" strokeWidth="1.5" fill="#1160f7" fillOpacity="0.08" />
        <path d="M388 190 L388 175 Q388 158 400 158 Q412 158 412 175 L412 190" stroke="#1160f7" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
        <circle cx="400" cy="207" r="3" fill="#1160f7" fillOpacity="0.6" />
        <line x1="400" y1="210" x2="400" y2="217" stroke="#1160f7" strokeOpacity="0.5" strokeWidth="1.5" />
        {/* Data streams */}
        <line x1="120" y1="160" x2="290" y2="180" stroke="#1160f7" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="3 5" />
        <line x1="140" y1="220" x2="295" y2="210" stroke="#1160f7" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="3 5" />
        <line x1="130" y1="280" x2="305" y2="250" stroke="#1160f7" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="3 5" />
        <line x1="510" y1="180" x2="680" y2="160" stroke="#1160f7" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="3 5" />
        <line x1="505" y1="210" x2="660" y2="220" stroke="#1160f7" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="3 5" />
        <line x1="500" y1="250" x2="670" y2="280" stroke="#1160f7" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="3 5" />
        {/* Maple leaf hint — simple */}
        <path d="M400 110 L406 125 L415 120 L410 132 L420 135 L408 140 L410 150 L400 144 L390 150 L392 140 L380 135 L390 132 L385 120 L394 125 Z" fill="#1160f7" fillOpacity="0.12" />
      </svg>
    ),

    "building-a-product-roadmap-that-drives-growth": (
      <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Product roadmap timeline with milestones showing Now, Next, and Later phases with growth trajectory">
        <title>Product roadmap visualization</title>
        <rect width="800" height="400" fill="#0a1628" />
        {/* Roadmap timeline */}
        <line x1="100" y1="200" x2="700" y2="200" stroke="#1160f7" strokeOpacity="0.15" strokeWidth="1.5" />
        {/* Milestone nodes */}
        <circle cx="180" cy="200" r="12" fill="#1160f7" fillOpacity="0.15" stroke="#1160f7" strokeOpacity="0.3" strokeWidth="1.5" />
        <circle cx="180" cy="200" r="4" fill="#1160f7" />
        <circle cx="340" cy="200" r="12" fill="#1160f7" fillOpacity="0.15" stroke="#1160f7" strokeOpacity="0.3" strokeWidth="1.5" />
        <circle cx="340" cy="200" r="4" fill="#1160f7" />
        <circle cx="500" cy="200" r="14" fill="#1160f7" fillOpacity="0.2" stroke="#1160f7" strokeOpacity="0.4" strokeWidth="1.5" />
        <circle cx="500" cy="200" r="5" fill="#1160f7" />
        <circle cx="640" cy="200" r="10" fill="#1160f7" fillOpacity="0.1" stroke="#1160f7" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3" />
        {/* Branch paths upward */}
        <path d="M180 188 L180 130 L240 130" stroke="#1160f7" strokeOpacity="0.12" strokeWidth="1" />
        <rect x="240" y="115" width="70" height="30" rx="6" stroke="#1160f7" strokeOpacity="0.15" strokeWidth="1" fill="#1160f7" fillOpacity="0.03" />
        <path d="M340 188 L340 100 L400 100" stroke="#1160f7" strokeOpacity="0.15" strokeWidth="1" />
        <rect x="400" y="85" width="80" height="30" rx="6" stroke="#1160f7" strokeOpacity="0.2" strokeWidth="1" fill="#1160f7" fillOpacity="0.04" />
        {/* Branch paths downward */}
        <path d="M340 212 L340 280 L400 280" stroke="#1160f7" strokeOpacity="0.1" strokeWidth="1" />
        <rect x="400" y="265" width="65" height="30" rx="6" stroke="#1160f7" strokeOpacity="0.12" strokeWidth="1" fill="#1160f7" fillOpacity="0.02" />
        <path d="M500 214 L500 300 L560 300" stroke="#1160f7" strokeOpacity="0.12" strokeWidth="1" />
        <rect x="560" y="285" width="75" height="30" rx="6" stroke="#1160f7" strokeOpacity="0.15" strokeWidth="1" fill="#1160f7" fillOpacity="0.03" />
        {/* Growth arrow */}
        <path d="M620 150 L680 90" stroke="#1160f7" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M670 88 L682 88 L682 100" stroke="#1160f7" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Labels */}
        <text x="160" y="240" fontFamily="monospace" fontSize="9" fill="#1160f7" fillOpacity="0.25">NOW</text>
        <text x="320" y="240" fontFamily="monospace" fontSize="9" fill="#1160f7" fillOpacity="0.25">NEXT</text>
        <text x="478" y="240" fontFamily="monospace" fontSize="9" fill="#1160f7" fillOpacity="0.25">LATER</text>
      </svg>
    ),

    "why-startups-fail-and-how-to-avoid-it": (
      <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Rocket launch illustration with stars representing startup growth and trajectory">
        <title>Startup success visualization</title>
        <rect width="800" height="400" fill="#0a1628" />
        {/* Rocket outline */}
        <path d="M400 80 Q420 80 430 120 L435 200 L455 250 L440 245 L440 290 L420 270 L400 290 L380 270 L360 290 L360 245 L345 250 L365 200 L370 120 Q380 80 400 80 Z" stroke="#1160f7" strokeOpacity="0.3" strokeWidth="1.5" fill="#1160f7" fillOpacity="0.04" />
        {/* Window */}
        <circle cx="400" cy="155" r="15" stroke="#1160f7" strokeOpacity="0.25" strokeWidth="1.5" fill="#1160f7" fillOpacity="0.06" />
        <circle cx="400" cy="155" r="6" fill="#1160f7" fillOpacity="0.15" />
        {/* Flame */}
        <path d="M385 290 Q400 340 415 290" stroke="#1160f7" strokeOpacity="0.2" strokeWidth="1" fill="#1160f7" fillOpacity="0.06" />
        <path d="M392 290 Q400 325 408 290" stroke="#1160f7" strokeOpacity="0.3" strokeWidth="1" fill="#1160f7" fillOpacity="0.1" />
        {/* Stars / sparkles */}
        <circle cx="250" cy="120" r="2" fill="#1160f7" fillOpacity="0.4" />
        <circle cx="550" cy="100" r="1.5" fill="#1160f7" fillOpacity="0.3" />
        <circle cx="180" cy="200" r="1" fill="#1160f7" fillOpacity="0.2" />
        <circle cx="620" cy="180" r="1.5" fill="#1160f7" fillOpacity="0.25" />
        <circle cx="300" cy="300" r="1" fill="#1160f7" fillOpacity="0.15" />
        <circle cx="530" cy="280" r="2" fill="#1160f7" fillOpacity="0.2" />
        <circle cx="160" cy="310" r="1" fill="#1160f7" fillOpacity="0.1" />
        <circle cx="650" cy="300" r="1.5" fill="#1160f7" fillOpacity="0.15" />
        {/* Trajectory dotted arc */}
        <path d="M400 350 Q300 250 250 120" stroke="#1160f7" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 6" fill="none" />
        <path d="M400 350 Q500 250 550 100" stroke="#1160f7" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 6" fill="none" />
        {/* % label */}
        <text x="580" y="340" fontFamily="monospace" fontSize="40" fill="#1160f7" fillOpacity="0.06">90%</text>
        {/* Upward trend arrow */}
        <path d="M550 320 L620 260" stroke="#1160f7" strokeOpacity="0.15" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M610 258 L622 258 L622 270" stroke="#1160f7" strokeOpacity="0.15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  };

  return illustrations[slug] || (
    <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Abstract geometric pattern">
      <title>Blog post illustration</title>
      <rect width="800" height="400" fill="#0a1628" />
      <circle cx="400" cy="200" r="80" stroke="#1160f7" strokeOpacity="0.15" strokeWidth="1.5" fill="#1160f7" fillOpacity="0.03" />
      <circle cx="400" cy="200" r="40" stroke="#1160f7" strokeOpacity="0.1" strokeWidth="1" fill="#1160f7" fillOpacity="0.02" />
      <circle cx="400" cy="200" r="5" fill="#1160f7" fillOpacity="0.4" />
    </svg>
  );
}
