import TickRule from "./TickRule";
import useReveal from "../../hooks/useReveal";

/** Standard section opening: mono kicker, big title, optional lead — rises in. */
export default function SectionHeader({ kicker, title, lead, align = "left" }) {
  const r = useReveal();
  return (
    <header
      ref={r.ref}
      className={`section-header section-header--${align} ${r.className}`}
    >
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
      <TickRule className="section-header__rule" />
    </header>
  );
}
