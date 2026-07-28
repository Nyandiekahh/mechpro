import TickRule from "./TickRule";

/** Inner-page hero: dark charcoal band with oversized title. */
export default function PageHero({ kicker, title, lead, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        {kicker && <p className="kicker kicker--light">{kicker}</p>}
        <h1>{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        {children}
        <TickRule className="page-hero__rule" />
      </div>
    </section>
  );
}
