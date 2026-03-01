/**
 * Logo SVG component for New Generation Engineering BTP MS
 * light=true  → for dark backgrounds (home hero, dark navbar)
 * light=false → for white backgrounds (scrolled navbar, footer)
 */
export default function Logo({ light = false, size = 44 }) {
  const bg     = light ? 'rgba(255,255,255,0.15)' : '#14532d';
  const win    = light ? 'rgba(255,255,255,0.2)'  : '#052e16';
  const accent = '#4ade80'; // green-400

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-label="New Generation Engineering BTP MS"
    >
      {/* Background badge */}
      <rect width="44" height="44" rx="9" fill={bg} />

      {/* City skyline */}
      <rect x="3"  y="27" width="6"  height="9"  rx="1" fill="rgba(255,255,255,0.45)" />
      <rect x="10" y="21" width="7"  height="15" rx="1" fill="rgba(255,255,255,0.65)" />
      <rect x="18" y="12" width="11" height="24" rx="1" fill="white" />
      <rect x="30" y="20" width="7"  height="16" rx="1" fill="rgba(255,255,255,0.65)" />
      <rect x="38" y="26" width="3"  height="10" rx="1" fill="rgba(255,255,255,0.4)" />

      {/* Windows on centre building */}
      <rect x="19.5" y="15" width="3" height="2.5" rx="0.5" fill={win} />
      <rect x="24"   y="15" width="3" height="2.5" rx="0.5" fill={win} />
      <rect x="19.5" y="20" width="3" height="2.5" rx="0.5" fill={win} />
      <rect x="24"   y="20" width="3" height="2.5" rx="0.5" fill={win} />
      <rect x="19.5" y="25" width="3" height="2.5" rx="0.5" fill={win} />
      <rect x="24"   y="25" width="3" height="2.5" rx="0.5" fill={win} />

      {/* Green accent stripe at bottom */}
      <rect x="0" y="40" width="44" height="4" rx="2" fill={accent} />
    </svg>
  );
}
