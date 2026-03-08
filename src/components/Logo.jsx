/**
 * Logo component — uses the real NGE BTP ms logo image.
 * light=true  → adds a subtle white background pill (for dark hero/footer areas)
 * light=false → plain image (for white/light backgrounds)
 */
export default function Logo({ light = false, size = 44 }) {
  return (
    <img
      src="/images/logo-clean.png"
      alt="New Generation Engineering BTP MS"
      width={size}
      height={size}
      className={`shrink-0 object-contain ${light ? 'rounded-lg bg-white p-0.5' : ''}`}
      style={{ width: size, height: size }}
    />
  );
}
