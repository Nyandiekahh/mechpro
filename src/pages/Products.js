import { useMemo, useState } from "react";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/ui/CTASection";
import ProductCard from "../components/cards/ProductCard";
import Icon from "../components/ui/Icon";
import products, { productCategories, productBrands } from "../data/products";

export default function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");

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
  }, [query, category, brand]);

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
                {productCategories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label>
              <span>Brand</span>
              <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                {productBrands.map((b) => <option key={b}>{b}</option>)}
              </select>
            </label>
          </div>

          {results.length > 0 ? (
            <div className="grid grid--4">
              {results.map((p) => <ProductCard key={p.slug} product={p} />)}
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
