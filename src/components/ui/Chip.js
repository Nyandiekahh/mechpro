/** Mono spec-chip — the design's own label vocabulary, replacing icon tiles. */
export default function Chip({ children, tone = "green" }) {
  return <span className={`chip chip--${tone}`}>{children}</span>;
}
