import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import SpecPlate from "../ui/SpecPlate";
import useReveal from "../../hooks/useReveal";

export default function ServiceCard({ service, i = 0 }) {
  const r = useReveal((i % 3) * 90);
  return (
    <Link
      to={`/services/${service.slug}`}
      ref={r.ref}
      className={`card service-card ${r.className}`}
      style={r.style}
    >
      {service.image && (
        <div className="card-media">
          <img src={service.image} alt="" loading="lazy" />
        </div>
      )}
      <p className="card-ref">Service · {String(i + 1).padStart(2, "0")}</p>
      <h3>{service.name}</h3>
      <p className="card__text">{service.summary}</p>
      <SpecPlate
        items={[
          { label: "Scope", value: service.plate.scope },
          { label: "Approach", value: service.plate.lead },
          { label: "Cover", value: service.plate.cover },
        ]}
      />
      <span className="card__link">Explore this service <Icon name="arrow" size={16} /></span>
    </Link>
  );
}
