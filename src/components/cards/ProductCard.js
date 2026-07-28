import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import SpecPlate from "../ui/SpecPlate";
import { whatsappLink } from "../../data/siteConfig";

export default function ProductCard({ product }) {
  const inquiry = whatsappLink(
    `Hello MECHPRO SOLUTIONS LTD. I'm interested in the ${product.name} (${product.model}). Please share a quotation.`
  );
  return (
    <article className="card product-card">
      <Link to={`/products/${product.slug}`} className="product-card__media" aria-label={product.name}>
        {/* Image slot — drop a real photo URL into the data file and render <img> here */}
        <span className="product-card__monogram">{product.brand.slice(0, 2)}</span>
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
