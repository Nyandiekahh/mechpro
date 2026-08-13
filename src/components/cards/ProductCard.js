import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import SpecPlate from "../ui/SpecPlate";
import { useSite } from "../../context/SiteContext";
import useReveal from "../../hooks/useReveal";

export default function ProductCard({ product, i = 0 }) {
  const { wa } = useSite();
  const r = useReveal((i % 4) * 80);
  const inquiry = wa(
    `Hello MECHPRO SOLUTIONS LTD. I'm interested in the ${product.name} (${product.model}). Please share a quotation.`
  );
  const photo = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <article ref={r.ref} className={`card product-card ${r.className}`} style={r.style}>
      <Link to={`/products/${product.slug}`} className="product-card__media" aria-label={product.name}>
        {photo ? (
          <img src={photo.url} alt={photo.alt || product.name} loading="lazy" />
        ) : (
          <span className="product-card__monogram">{product.brand.slice(0, 2)}</span>
        )}
        <span className="product-card__brand">{product.brand}</span>
        {product.badges.length > 0 && (
          <span className="product-card__badges">
            {product.badges.map((b) => <em key={b}>{b}</em>)}
          </span>
        )}
      </Link>
      <div className="product-card__body">
        <p className="product-card__cat">{product.category}</p>
        <h3><Link to={`/products/${product.slug}`}>{product.name}</Link></h3>
        <SpecPlate
          items={[
            { label: "Capacity", value: product.capacityBtu === "—" ? product.coverage : `${product.capacityBtu} BTU` },
            { label: "Energy", value: product.energyRating },
            { label: "Refrigerant", value: product.refrigerant },
            {
              label: "Price",
              value: product.price
                ? `KES ${Math.round(Number(product.price)).toLocaleString("en-KE")}`
                : "",
            },
          ]}
        />
        <div className="product-card__actions">
          <Link to={`/products/${product.slug}`} className="card__link">View details <Icon name="arrow" size={15} /></Link>
          <a href={inquiry} target="_blank" rel="noreferrer" className="card__link card__link--wa">
            <Icon name="whatsapp" size={15} /> Request quote
          </a>
        </div>
      </div>
    </article>
  );
}
