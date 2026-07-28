import TickRule from "./TickRule";

/** Standard section opening: mono kicker, big title, optional lead. */
export default function SectionHeader({ kicker, title, lead, align = "left" }) {
  return (
    <header className={`section-header section-header--${align}`}>
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
      <TickRule className="section-header__rule" />
    </header>
  );
}
