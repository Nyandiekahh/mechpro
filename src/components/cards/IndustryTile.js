import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import useReveal from "../../hooks/useReveal";

export default function IndustryTile({ industry, i = 0 }) {
  const r = useReveal((i % 3) * 70);
  return (
    <Link
      to={`/solutions/${industry.slug}`}
      ref={r.ref}
      className={`industry-tile ${r.className}`}
      style={r.style}
    >
      <span className="industry-tile__num">{String(i + 1).padStart(2, "0")}</span>
      <span className="industry-tile__name">{industry.name}</span>
      <em>{industry.tag}</em>
      <Icon name="arrow" size={18} className="industry-tile__arrow" />
    </Link>
  );
}
