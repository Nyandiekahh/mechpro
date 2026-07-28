import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import TickRule from "../components/ui/TickRule";
import SectionHeader from "../components/ui/SectionHeader";
import CTASection from "../components/ui/CTASection";
import ServiceCard from "../components/cards/ServiceCard";
import ProductCard from "../components/cards/ProductCard";
import ProjectCard from "../components/cards/ProjectCard";
import TestimonialCard from "../components/cards/TestimonialCard";
import siteConfig, { whatsappLink } from "../data/siteConfig";
import stats from "../data/stats";
import services from "../data/services";
import whyUs from "../data/whyUs";
import industries from "../data/industries";
import { featuredProducts } from "../data/products";
import projects from "../data/projects";
import testimonials from "../data/testimonials";
import brands from "../data/brands";
import posts from "../data/posts";

export default function Home() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="container">
          <p className="kicker kicker--light">
            HVAC &amp; Mechanical Ventilation · {siteConfig.address}
          </p>
          <h1>
            Engineering better <span className="hero__accent">indoor environments.</span>
          </h1>
          <p className="hero__lead">
            Design, supply, installation and maintenance of air conditioning and
            mechanical ventilation systems — sized from real surveys, installed to
            spec, and serviced like we plan to keep you for years. Because we do.
          </p>
          <div className="hero__actions">
            <Button to="/request-quote" icon="arrow">Request a free quotation</Button>
            <Button href={siteConfig.phoneHref} variant="ghost" icon="phone">Call now</Button>
            <Button href={whatsappLink()} variant="ghost" icon="whatsapp">WhatsApp us</Button>
          </div>
          <TickRule className="hero__rule" />
          <ul className="hero__stats">
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
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
            {services.slice(0, 6).map((s) => <ServiceCard key={s.slug} service={s} />)}
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
            {whyUs.map((w) => (
              <div className="why-item" key={w.title}>
                <div className="why-item__icon"><Icon name={w.icon} size={24} /></div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
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
            {featuredProducts.map((p) => <ProductCard key={p.slug} product={p} />)}
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
            {industries.map((ind) => (
              <Link to={`/solutions/${ind.slug}`} key={ind.slug} className="industry-tile">
                <Icon name={ind.icon} size={22} />
                <span>{ind.name}</span>
                <em>{ind.tag}</em>
              </Link>
            ))}
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
            {projects.slice(0, 3).map((p) => <ProjectCard key={p.slug} project={p} />)}
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
            {testimonials.map((t) => <TestimonialCard key={t.name} t={t} />)}
          </div>
        </div>
      </section>

      {/* ---------------- BRANDS ---------------- */}
      <section className="section section--slim">
        <div className="container">
          <p className="kicker">Brands we work with</p>
          <ul className="brand-strip">
            {brands.map((b) => <li key={b}>{b}</li>)}
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
            {posts.map((post) => (
              <Link to={`/blog/${post.slug}`} className="card post-card" key={post.slug}>
                <p className="post-card__meta"><span>{post.category}</span><span>{post.readTime}</span></p>
                <h3>{post.title}</h3>
                <p className="card__text">{post.excerpt}</p>
                <span className="card__link">Read article <Icon name="arrow" size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
