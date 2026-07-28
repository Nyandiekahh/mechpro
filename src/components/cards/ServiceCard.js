import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import SpecPlate from "../ui/SpecPlate";

export default function ServiceCard({ service }) {
  return (
    <Link to={`/services/${service.slug}`} className="card service-card">
      <div className="service-card__icon"><Icon name={service.icon} size={26} /></div>
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
