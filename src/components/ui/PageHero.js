import TickRule from "./TickRule";

/**
 * Inner-page hero. When the CMS provides an image, it becomes the banner
 * background under a charcoal overlay; otherwise the logo watermark shows.
 */
export default function PageHero({ kicker, title, lead, image, children }) {
  return (
    <section
      className={`page-hero ${image ? "page-hero--img" : "wash"}`}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="container">
        {kicker && <p className="kicker kicker--light rise rise-1">{kicker}</p>}
        <h1 className="rise rise-2">{title}</h1>
        {lead && <p className="page-hero__lead rise rise-3">{lead}</p>}
        {children && <div className="rise rise-4">{children}</div>}
        <TickRule className="page-hero__rule" />
      </div>
    </section>
  );
}
