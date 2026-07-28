import PageHero from "../components/ui/PageHero";
import CTASection from "../components/ui/CTASection";
import ServiceCard from "../components/cards/ServiceCard";
import services from "../data/services";

export default function Services() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="Everything between the drawing and the cold air."
        lead="Design, installation, ventilation, maintenance, repairs and contracts — each service on its own page, with the process and the FAQs written out."
      />
      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
