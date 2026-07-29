import Chip from "../ui/Chip";
import useReveal from "../../hooks/useReveal";

// The backend stores an icon keyword per item; the design renders it as a
// spec-chip word instead of a generic icon tile.
const TAGS = {
  engineer: "Engineering", leaf: "Efficiency", shield: "Warranty",
  wrench: "Workmanship", clock: "Response", map: "Coverage",
  bolt: "Power", check: "Standard",
};

export default function WhyItem({ item, i = 0 }) {
  const r = useReveal((i % 3) * 90);
  return (
    <div ref={r.ref} className={`why-item ${r.className}`} style={r.style}>
      <Chip>{TAGS[item.icon] || "MECHPRO"}</Chip>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </div>
  );
}
