import Icon from "../ui/Icon";
import useReveal from "../../hooks/useReveal";

export default function TestimonialCard({ t, i = 0 }) {
  const r = useReveal((i % 2) * 110);
  return (
    <figure ref={r.ref} className={`card testimonial-card ${r.className}`} style={r.style}>
      <div className="testimonial-card__stars" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }).map((_, idx) => <Icon key={idx} name="star" size={15} />)}
      </div>
      <blockquote>“{t.text}”</blockquote>
      <figcaption>
        {t.photo && <img className="testimonial-card__photo" src={t.photo} alt={`${t.name}, MECHPRO client`} loading="lazy" />}
        <span>
          <strong>{t.name}</strong>
          <span>{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
