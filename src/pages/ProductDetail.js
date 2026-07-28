import { useParams, Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import SpecPlate from "../components/ui/SpecPlate";
import CTASection from "../components/ui/CTASection";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import ProductCard from "../components/cards/ProductCard";
import NotFound from "./NotFound";
import products, { getProduct } from "../data/products";
import { whatsappLink } from "../data/siteConfig";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);
  if (!product) return <NotFound />;

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(products.filter((p) => p.slug !== product.slug && p.category !== product.category))
    .slice(0, 3);

  const inquiry = whatsappLink(
    `Hello MECHPRO SOLUTIONS LTD. I'm interested in the ${product.name} (${product.model}). Please share a quotation including installation.`
  );

  return (
    <>
      <PageHero kicker={`${product.brand} · ${product.category}`} title={product.name} lead={product.idealFor}>
        <SpecPlate
          className="specplate--onink"
          items={[
            { label: "Model", value: product.model },
            { label: "Capacity", value: product.capacityBtu === "—" ? product.coverage : `${product.capacityBtu} BTU` },
            { label: "Coverage", value: product.coverage },
            { label: "Energy", value: product.energyRating },
            { label: "Refrigerant", value: product.refrigerant },
            { label: "Power", value: product.power },
          ]}
        />
      </PageHero>

      <section className="section">
        <div className="container detail-grid">
          <div>
            <SectionHeader kicker="Key features" title="Why this unit earns its place." />
            <ul className="check-list check-list--spread">
              {product.features.map((f) => (
                <li key={f}><Icon name="check" size={18} /> {f}</li>
              ))}
            </ul>
            <SectionHeader kicker="Warranty" title="Backed in writing." />
            <div className="prose">
              <p>
                {product.warranty}. Warranty validity depends on qualified installation
                and scheduled servicing — both of which we provide and document.
              </p>
            </div>
          </div>
          <aside className="detail-aside">
            <div className="detail-aside__card">
              <p className="kicker">Get this unit</p>
              <p className="detail-aside__note">
                Quotations include a site survey to confirm sizing — the price we quote
                is the price you pay.
              </p>
              <div className="detail-aside__actions">
                <Button to="/request-quote" icon="arrow">Request a quotation</Button>
                <Button href={inquiry} variant="ghost" icon="whatsapp">Ask on WhatsApp</Button>
              </div>
            </div>
            <div className="detail-aside__card">
              <p className="kicker">Not sure it's the right size?</p>
              <p className="detail-aside__note">
                Read our guide on <Link to="/blog/ac-installation-cost-kenya">what drives installation cost</Link>,
                or just send us your room dimensions.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHeader kicker="Related" title="Also worth a look." />
          <div className="grid grid--3">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
