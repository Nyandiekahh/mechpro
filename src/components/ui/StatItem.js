import useCountUp from "../../hooks/useCountUp";
import useReveal from "../../hooks/useReveal";

/** Hero statistic — counts up from zero as it enters view. */
export default function StatItem({ value, label, i = 0 }) {
  const r = useReveal(i * 90);
  const display = useCountUp(value, r.className.includes("is-in"));
  return (
    <li ref={r.ref} className={r.className} style={r.style}>
      <strong>{display}</strong>
      <span>{label}</span>
    </li>
  );
}
