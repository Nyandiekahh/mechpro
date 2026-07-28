import { Link, useParams } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/ui/CTASection";
import Icon from "../components/ui/Icon";
import posts, { getPost } from "../data/posts";

/** Handles both /blog (listing) and /blog/:slug (article). */
export default function Blog() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : null;

  if (slug && post) {
    return (
      <>
        <PageHero kicker={`${post.category} · ${post.date} · ${post.readTime}`} title={post.title} />
        <section className="section">
          <div className="container container--narrow">
            <div className="prose prose--article">
              {post.body.map((para, i) => <p key={i}>{para}</p>)}
            </div>
            <p className="article-back">
              <Link to="/blog" className="card__link">
                <Icon name="arrow" size={15} className="icon--flip" /> All articles
              </Link>
            </p>
          </div>
        </section>
        <CTASection title="Got a question the article didn't answer?" />
      </>
    );
  }

  return (
    <>
      <PageHero
        kicker="Knowledge centre"
        title="Straight answers about cooling and air."
        lead="Buying guides, energy math and maintenance sense — written for building owners, not for other engineers."
      />
      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {posts.map((p) => (
              <Link to={`/blog/${p.slug}`} className="card post-card" key={p.slug}>
                <p className="post-card__meta"><span>{p.category}</span><span>{p.readTime}</span></p>
                <h3>{p.title}</h3>
                <p className="card__text">{p.excerpt}</p>
                <span className="card__link">Read article <Icon name="arrow" size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
