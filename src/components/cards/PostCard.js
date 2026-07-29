import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import useReveal from "../../hooks/useReveal";

export default function PostCard({ post, i = 0 }) {
  const r = useReveal((i % 3) * 90);
  return (
    <Link
      to={`/blog/${post.slug}`}
      ref={r.ref}
      className={`card post-card ${r.className}`}
      style={r.style}
    >
      {post.featuredImage && (
        <div className="card-media">
          <img src={post.featuredImage} alt="" loading="lazy" />
        </div>
      )}
      <p className="post-card__meta"><span>{post.category}</span><span>{post.readTime}</span></p>
      <h3>{post.title}</h3>
      <p className="card__text">{post.excerpt}</p>
      <span className="card__link">Read article <Icon name="arrow" size={15} /></span>
    </Link>
  );
}
