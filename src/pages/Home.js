import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import TickRule from "../components/ui/TickRule";
import SectionHeader from "../components/ui/SectionHeader";
import CTASection from "../components/ui/CTASection";
import StatItem from "../components/ui/StatItem";
import ServiceCard from "../components/cards/ServiceCard";
import ProductCard from "../components/cards/ProductCard";
import ProjectCard from "../components/cards/ProjectCard";
import TestimonialCard from "../components/cards/TestimonialCard";
import WhyItem from "../components/cards/WhyItem";
import IndustryTile from "../components/cards/IndustryTile";
import PostCard from "../components/cards/PostCard";
import { useSite } from "../context/SiteContext";
import { useApi } from "../api/hooks";
import useTypewriter from "../hooks/useTypewriter";
import fallbackServices from "../data/services";
import fallbackProjects from "../data/projects";
import fallbackPosts from "../data/posts";
import products from "../data/products";
import industries from "../data/industries";

// The buildings we actually work in — the hero types through them.
const TYPED_PHRASES = [
  "indoor environments.",
  "hotel kitchens.",
  "server rooms.",
  "office towers.",
  "hospital wards.",
  "factory floors.",
];

export default function Home() {
  const { config, stats, whyUs, brands, testimonials, wa } = useSite();
  const { data: services } = useApi("/api/services/", fallbackServices);
  const { data: featured } = useApi("/api/products/?featured=true",
    products.filter((p) => p.badges.includes("Featured")));
  const { data: solutions } = useApi("/api/solutions/", industries);
  const { data: projects } = useApi("/api/projects/", fallbackProjects);
  const { data: posts } = useApi("/api/blog/", fallbackPosts);
  const typed = useTypewriter(TYPED_PHRASES);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero wash">
        <div className="container">
          <p className="kicker kicker--light rise rise-1">
            HVAC &amp; Mechanical Ventilation · {config.address}
          </p>
          <h1 className="rise rise-2">
            Engineering better{" "}
            <span className="hero__typed">
              <span className="hero__accent">{typed.text}</span>
              {typed.done && <span className="caret" aria-hidden="true" />}
            </span>
          </h1>
          <p className="hero__lead rise rise-3">
            Design, supply, installation and maintenance of air conditioning and
            mechanical ventilation systems — sized from real surveys, installed to
            spec, and serviced like we plan to keep you for years. Because we do.
          </p>
          <div className="hero__actions rise rise-4">
            <Button to="/request-quote" icon="arrow">Request a free quotation</Button>
            <Button href={config.phoneHref} variant="ghost" icon="phone">Call now</Button>
            <Button href={wa()} variant="ghost" icon="whatsapp">WhatsApp us</Button>
          </div>
          <TickRule className="hero__rule" />
          <ul className="hero__stats">
            {stats.map((s, i) => <StatItem key={s.label} value={s.value} label={s.label} i={i} />)}
          </ul>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="section">
        <div className="container">
          <SectionHeader
            kicker="What we do"
            title="Seven services. One standard."
            lead="From a single bedroom split to a six-floor VRF plant — every job gets a survey, a spec, and a commissioning report."
          />
          <div className="grid grid--3">
            {services.slice(0, 6).map((s, i) => <ServiceCard key={s.slug} service={s} i={i} />)}
          </div>
          <div className="section__more">
            <Button to="/services" variant="ink" icon="arrow">All services</Button>
          </div>
        </div>
      </section>

      {/* ---------------- WHY MECHPRO ---------------- */}
      <section className="section section--tint">
        <div className="container">
          <SectionHeader
            kicker="Why MECHPRO"
            title="What you're actually paying for."
            lead="Anyone can hang a unit on a wall. Here's what separates an engineering company from an equipment retailer."
          />
          <div className="grid grid--3">
            {whyUs.map((w, i) => <WhyItem key={w.title} item={w} i={i} />)}
          </div>
        </div>
      </section>

      {/* ---------------- FEATURED PRODUCTS ---------------- */}
      <section className="section">
        <div className="container">
          <SectionHeader
            kicker="Equipment"
            title="Units we stand behind."
            lead="Genuine equipment from authorised channels — with warranties the manufacturer will actually honour."
          />
          <div className="grid grid--4">
            {featured.map((p, i) => <ProductCard key={p.slug} product={p} i={i} />)}
          </div>
          <div className="section__more">
            <Button to="/products" variant="ink" icon="arrow">Browse the catalogue</Button>
          </div>
        </div>
      </section>

      {/* ---------------- INDUSTRIES ---------------- */}
      <section className="section section--ink">
        <div className="container">
          <SectionHeader
            kicker="Industries served"
            title="Every building has its own physics."
            lead="A hospital ward, a hotel kitchen and a server room fail differently. We design for the building in front of us."
          />
          <div className="industry-grid">
            {solutions.map((ind, i) => <IndustryTile key={ind.slug} industry={ind} i={i} />)}
          </div>
        </div>
      </section>

      {/* ---------------- PROJECTS ---------------- */}
      <section className="section">
        <div className="container">
          <SectionHeader
            kicker="Recent work"
            title="Projects that hold up."
            lead="A few from the file — what was asked, what we installed, and what changed."
          />
          <div className="grid grid--3">
            {projects.slice(0, 3).map((p, i) => <ProjectCard key={p.slug} project={p} i={i} />)}
          </div>
          <div className="section__more">
            <Button to="/projects" variant="ink" icon="arrow">View all projects</Button>
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="section section--tint">
        <div className="container">
          <SectionHeader
            kicker="Client words"
            title="Repeat clients say it best."
          />
          <div className="grid grid--2">
            {testimonials.map((t, i) => <TestimonialCard key={t.name} t={t} i={i} />)}
          </div>
        </div>
      </section>

      {/* ---------------- BRANDS (marquee) ---------------- */}
      <section className="section section--slim">
        <div className="container">
          <p className="kicker">Brands we work with</p>
        </div>
        <div className="marquee" aria-hidden="false">
          <ul className="marquee__track">
            {[...brands, ...brands].map((b, i) => (
              <li key={`${b.name}-${i}`} aria-hidden={i >= brands.length}>
                {b.logo ? <img src={b.logo} alt={b.name} className="brand-strip__logo" /> : b.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- LATEST ARTICLES ---------------- */}
      <section className="section section--slim">
        <div className="container">
          <SectionHeader
            kicker="Knowledge centre"
            title="Straight answers, written down."
          />
          <div className="grid grid--3">
            {posts.slice(0, 3).map((post, i) => <PostCard key={post.slug} post={post} i={i} />)}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
