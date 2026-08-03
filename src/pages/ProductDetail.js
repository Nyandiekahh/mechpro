import { useParams, Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import SpecPlate from "../components/ui/SpecPlate";
import CTASection from "../components/ui/CTASection";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import ProductCard from "../components/cards/ProductCard";
import NotFound from "./NotFound";
import { useApi, useApiAll } from "../api/hooks";
import fallbackProducts, { getProduct } from "../data/products";
import { useSite } from "../context/SiteContext";
import useSeo from "../hooks/useSeo";

export default function ProductDetail() {
  const { slug } = useParams();
  const { wa } = useSite();
  const { data: product, loading } = useApi(`/api/products/${slug}/`, getProduct(slug));
  const { data: allProducts } = useApiAll("/api/products/", fallbackProducts);

  useSeo({
    title: product ? product.name : "Product",
    description: product
      ? `${product.name} — ${product.brand} ${product.model}. ${product.idealFor || "Supplied and installed by MECHPRO SOLUTIONS LTD."}`
      : "HVAC equipment supplied and installed by MECHPRO SOLUTIONS LTD.",
    path: `/products/${slug}`,
  });

  if (!product) {
    return loading ? <section className="section"><div className="container"><p className="kicker">Loading…</p></div></section> : <NotFound />;
  }

  const related = allProducts
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(allProducts.filter((p) => p.slug !== product.slug && p.category !== product.category))
    .slice(0, 3);

  const inquiry = wa(
    `Hello MECHPRO SOLUTIONS LTD. I'm interested in the ${product.name} (${product.model}). Please share a quotation including installation.`
  );
  const photos = product.images || [];

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
            {photos.length > 0 && (
              <div className="product-gallery">
                {photos.map((img) => (
                  <img key={img.url} src={img.url} alt={img.alt || product.name} loading="lazy" />
                ))}
              </div>
            )}
            <SectionHeader kicker="Key features" title="Why this unit earns its place." />
            <ul className="check-list check-list--spread">
              {product.features.map((f) => (
                <li key={f}><Icon name="check" size={18} /> {f}</li>
              ))}
            </ul>
            {product.description && (
              <div className="prose" style={{ marginTop: "1.5rem" }}><p>{product.description}</p></div>
            )}
            <SectionHeader kicker="Warranty" title="Backed in writing." />
            <div className="prose">
              <p>
                {product.warranty || "Warranty per manufacturer terms"}. Warranty validity
                depends on qualified installation and scheduled servicing, both of
                which we provide and document.
              </p>
            </div>
          </div>
          <aside className="detail-aside">
            <div className="detail-aside__card">
              <p className="kicker">Get this unit</p>
              <p className="detail-aside__note">
                Quotations include a site survey to confirm sizing, so the price we quote
                is the price you pay.
              </p>
              <div className="detail-aside__actions">
                <Button to="/request-quote" icon="arrow">Request a quotation</Button>
                <Button href={inquiry} variant="whatsapp" icon="whatsapp">Ask on WhatsApp</Button>
                {product.brochure && (
                  <Button href={product.brochure} variant="ghost" icon="clipboard">Download brochure</Button>
                )}
              </div>
            </div>
            <div className="detail-aside__card">
              <p className="kicker">What size do you need?</p>
              <p className="detail-aside__note">
                Room coverage depends on ceiling height, sun exposure and how
                the space is used, so we size every job properly rather than
                guess from a chart. Tell us the room and we'll confirm the
                right unit, free, before you commit.
              </p>
              <div className="detail-aside__actions">
                <Button href={inquiry} variant="whatsapp" icon="whatsapp">Ask on WhatsApp</Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHeader kicker="Related" title="Also worth a look." />
          <div className="grid grid--3">
            {related.map((p, i) => <ProductCard key={p.slug} product={p} i={i} />)}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
