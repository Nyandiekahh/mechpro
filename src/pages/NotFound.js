import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";

/** Custom 404 — per the WRS, with helpful ways forward. */
export default function NotFound() {
  return (
    <>
      <PageHero
        kicker="Error 404"
        title="This page went off the drawing."
        lead="The page you're looking for doesn't exist or has moved. Here's where to go instead."
      />
      <section className="section">
        <div className="container">
          <div className="hero__actions">
            <Button to="/" icon="arrow">Return home</Button>
            <Button to="/services" variant="ghost">Browse services</Button>
            <Button to="/products" variant="ghost">Browse products</Button>
            <Button to="/contact" variant="ghost">Contact MECHPRO</Button>
          </div>
        </div>
      </section>
    </>
  );
}
