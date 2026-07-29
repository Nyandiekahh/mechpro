import { useMemo, useState } from "react";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/ui/CTASection";
import ProductCard from "../components/cards/ProductCard";
import Icon from "../components/ui/Icon";
import { useApiAll } from "../api/hooks";
import fallbackProducts from "../data/products";

export default function Products() {
  // Fetch the ENTIRE catalogue (follows API pagination) so search and
  // filters stay instant client-side — and grow as the client adds products.
  const { data: products } = useApiAll("/api/products/", fallbackProducts);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");

  // Filter options derive from whatever exists in the CMS.
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const brands = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.brand)))], [products]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const inCategory = category === "All" || p.category === category;
      const inBrand = brand === "All" || p.brand === brand;
      const inQuery =
        !q ||
        [p.name, p.brand, p.model, p.category, p.capacityBtu]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return inCategory && inBrand && inQuery;
    });
  }, [products, query, category, brand]);

  return (
    <>
      <PageHero
        kicker="Products"
        title="The catalogue, with the spec plates showing."
        lead="Every unit listed with capacity, refrigerant and energy class — because that's what actually decides your power bill."
      />

      <section className="section">
        <div className="container">
          <div className="catalogue-controls">
            <label className="catalogue-controls__search">
              <Icon name="search" size={18} />
              <input
                type="search"
                placeholder="Search by name, brand, model or capacity…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search products"
              />
            </label>
            <label>
              <span>Category</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label>
              <span>Brand</span>
              <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                {brands.map((b) => <option key={b}>{b}</option>)}
              </select>
            </label>
          </div>

          {results.length > 0 ? (
            <div className="grid grid--4">
              {results.map((p, i) => <ProductCard key={p.slug} product={p} i={i} />)}
            </div>
          ) : (
            <div className="empty-state">
              <p><strong>No products match that search.</strong></p>
              <p>Try a broader term, or clear the filters — or just tell us what you need on WhatsApp and we'll source it.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Don't see the unit you need?"
        lead="The catalogue shows our common lines — we supply the full range of every brand we carry. Describe what you need and we'll quote it."
      />
    </>
  );
}
