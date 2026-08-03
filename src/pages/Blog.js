import { Link, useParams } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/ui/CTASection";
import Icon from "../components/ui/Icon";
import NotFound from "./NotFound";
import PostCard from "../components/cards/PostCard";
import { useApi } from "../api/hooks";
import fallbackPosts, { getPost } from "../data/posts";
import useSeo from "../hooks/useSeo";

function Article({ slug }) {
  const { data: post, loading } = useApi(`/api/blog/${slug}/`, getPost(slug));

  useSeo({
    title: post ? post.title : "Article",
    description: post ? post.excerpt : "HVAC advice from MECHPRO SOLUTIONS LTD.",
    path: `/blog/${slug}`,
  });

  if (!post) {
    return loading ? <section className="section"><div className="container"><p className="kicker">Loading…</p></div></section> : <NotFound />;
  }
  return (
    <>
      <PageHero kicker={`${post.category} · ${post.date} · ${post.readTime}`} title={post.title} image={post.featuredImage} />
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

/** Handles both /blog (listing) and /blog/:slug (article). */
export default function Blog() {
  const { slug } = useParams();
  const { data: posts } = useApi("/api/blog/", fallbackPosts);

  if (slug) return <Article slug={slug} />;
  useSeo({
    title: "HVAC Knowledge Centre",
    description: "Buying guides, energy-saving tips and maintenance advice for air conditioning and ventilation in Kenya, from MECHPRO SOLUTIONS LTD.",
    path: "/blog",
  });


  return (
    <>
      <PageHero
        kicker="Knowledge centre"
        title="Straight answers about cooling and air."
        lead="Buying guides, energy math and maintenance sense, written for building owners rather than other engineers."
      />
      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {posts.map((p, i) => <PostCard key={p.slug} post={p} i={i} />)}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
