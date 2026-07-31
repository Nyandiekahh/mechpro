import PageHero from "../components/ui/PageHero";
import CTASection from "../components/ui/CTASection";
import ServiceCard from "../components/cards/ServiceCard";
import { useApi } from "../api/hooks";
import fallbackServices from "../data/services";

export default function Services() {
  const { data: services } = useApi("/api/services/", fallbackServices);
  return (
    <>
      <PageHero
        kicker="Services"
        title="Everything between the drawing and the cold air."
        lead="Design, installation, ventilation, maintenance, repairs and contracts. Each service has its own page, with the process and the FAQs written out."
      />
      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {services.map((s, i) => <ServiceCard key={s.slug} service={s} i={i} />)}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
