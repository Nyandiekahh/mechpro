import { useMemo, useState } from "react";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/ui/CTASection";
import ProductCard from "../components/cards/ProductCard";
import Icon from "../components/ui/Icon";
import { useApiAll } from "../api/hooks";
import fallbackProducts from "../data/products";
import useSeo from "../hooks/useSeo";

export default function Products() {
  // Fetch the ENTIRE catalogue (follows API pagination) so search and
  // filters stay instant client-side — and grow as the client adds products.
  const { data: products } = useApiAll("/api/products/", fallbackProducts);
  useSeo({
    title: "Air Conditioner & HVAC Equipment Catalogue",
    description: "Browse LG, Midea, Hisense and Solstar air conditioners, ventilation fans and HVAC equipment. Genuine units supplied and installed across Kenya.",
    path: "/products",
  });


  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [energyRating, setEnergyRating] = useState("All");
  const [capacity, setCapacity] = useState("All");

  // Filter options derive from whatever exists in the CMS.
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const brands = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.brand)))], [products]);
  const energyRatings = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.energyRating).filter(Boolean)))],
    [products]);
  const capacities = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.capacityBtu).filter((c) => c && c !== "—")))
      .sort((a, b) => parseInt(a.replace(/,/g, "")) - parseInt(b.replace(/,/g, "")))],
    [products]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const inCategory = category === "All" || p.category === category;
      const inBrand = brand === "All" || p.brand === brand;
      const inEnergy = energyRating === "All" || p.energyRating === energyRating;
      const inCapacity = capacity === "All" || p.capacityBtu === capacity;
      const inQuery =
        !q ||
        [p.name, p.brand, p.model, p.category, p.capacityBtu]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return inCategory && inBrand && inEnergy && inCapacity && inQuery;
    });
  }, [products, query, category, brand, energyRating, capacity]);

  const hasEnergyRatings = energyRatings.length > 1;
  const hasCapacities = capacities.length > 1;

  return (
    <>
      <PageHero
        kicker="Products"
        title="The catalogue, with the spec plates showing."
        lead="Every unit listed with capacity, refrigerant and energy class, because that's what actually decides your power bill."
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
            {hasCapacities && (
              <label>
                <span>Capacity</span>
                <select value={capacity} onChange={(e) => setCapacity(e.target.value)}>
                  {capacities.map((c) => (
                    <option key={c} value={c}>{c === "All" ? "All" : `${c} BTU`}</option>
                  ))}
                </select>
              </label>
            )}
            {hasEnergyRatings && (
              <label>
                <span>Energy Rating</span>
                <select value={energyRating} onChange={(e) => setEnergyRating(e.target.value)}>
                  {energyRatings.map((r) => <option key={r}>{r}</option>)}
                </select>
              </label>
            )}
          </div>

          {results.length > 0 ? (
            <div className="grid grid--4">
              {results.map((p, i) => <ProductCard key={p.slug} product={p} i={i} />)}
            </div>
          ) : (
            <div className="empty-state">
              <p><strong>No products match that search.</strong></p>
              <p>Try a broader term, clear the filters, or just tell us what you need on WhatsApp and we'll source it.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Don't see the unit you need?"
        lead="The catalogue shows our common lines. We supply the full range of every brand we carry, so describe what you need and we'll quote it."
      />
    </>
  );
}
