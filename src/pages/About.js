import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import CTASection from "../components/ui/CTASection";
import WhyItem from "../components/cards/WhyItem";
import { useSite } from "../context/SiteContext";

const values = [
  { icon: "shield", title: "Quality without asterisks", text: "Genuine equipment, spec-compliant installation, documented commissioning. The boring fundamentals, done every single time." },
  { icon: "engineer", title: "Engineering honesty", text: "If the cheaper option is the right option, we say so. Our reputation outlives any single invoice." },
  { icon: "clock", title: "Respect for your time", text: "We quote when we said we would, arrive when we said we would, and finish when we said we would — or we call before you have to." },
  { icon: "leaf", title: "Efficiency as a duty", text: "Every kilowatt we save a client is a bill that stays lower for a decade. Energy-efficient design is our default, not an upgrade." },
];

const milestones = [
  { year: "Founding", text: "MECHPRO SOLUTIONS LTD is established in Nairobi to bring engineering discipline to a market full of equipment resellers." },
  { year: "Growth", text: "First multi-floor commercial VRF projects delivered; maintenance portfolio expands to institutional and healthcare clients." },
  { year: "Today", text: "Serving residential, commercial, institutional and industrial clients across eleven counties, with long-term maintenance contracts at the core of the business." },
  { year: "Ahead", text: "Regional expansion across East Africa, deeper manufacturer partnerships, and a growing knowledge platform for the Kenyan HVAC industry." },
];

export default function About() {
  const { config } = useSite();
  return (
    <>
      <PageHero
        kicker="About us"
        title="An engineering company. Not an equipment shop."
        lead={config.descriptor}
      />

      <section className="section">
        <div className="container about-grid">
          <div>
            <SectionHeader kicker="Our story" title="Built on callbacks." />
            <div className="prose">
              <p>
                MECHPRO SOLUTIONS LTD was founded on a simple observation: most cooling
                problems in Kenya aren't equipment problems — they're engineering
                problems. Units sized by guesswork, installations that void warranties,
                ventilation that was never calculated. The equipment gets blamed; the
                method was the fault.
              </p>
              <p>
                So we built the company around method. Site surveys before quotations.
                Heat-load calculations before equipment selection. Commissioning reports
                before final invoices. It's slower on day one and faster every day after,
                because systems designed properly don't generate emergencies.
              </p>
              <p>
                Today we serve homeowners, facility managers, developers and consultant
                engineers across {config.serviceAreas.length} counties — and most of
                our new work arrives the way engineering work should: referred by someone
                whose building we already look after.
              </p>
            </div>
          </div>
          <aside className="about-vm">
            <div className="about-vm__card">
              <p className="kicker">Vision</p>
              <p>To become Kenya's most trusted and innovative provider of HVAC and mechanical engineering solutions.</p>
            </div>
            <div className="about-vm__card">
              <p className="kicker">Mission</p>
              <p>Reliable, energy-efficient, professionally engineered HVAC and ventilation solutions that exceed expectations and build long-term relationships.</p>
            </div>
            <div className="about-vm__card about-vm__card--green">
              <p className="kicker kicker--light">Safety &amp; sustainability</p>
              <p>Safe working at height and with refrigerants; responsible refrigerant handling and recovery; efficiency-first specification on every project.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHeader kicker="Core values" title="The rules we don't break." />
          <div className="grid grid--2">
            {values.map((v, i) => <WhyItem key={v.title} item={v} i={i} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader kicker="Milestones" title="Where we've been, where we're going." />
          <ol className="timeline">
            {milestones.map((m) => (
              <li key={m.year}>
                <span className="timeline__year">{m.year}</span>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection />
    </>
  );
}
