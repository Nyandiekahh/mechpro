import Icon from "../ui/Icon";

export default function TestimonialCard({ t }) {
  return (
    <figure className="card testimonial-card">
      <div className="testimonial-card__stars" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }).map((_, i) => <Icon key={i} name="star" size={15} />)}
      </div>
      <blockquote>“{t.text}”</blockquote>
      <figcaption>
        <strong>{t.name}</strong>
        <span>{t.role}</span>
      </figcaption>
    </figure>
  );
}
