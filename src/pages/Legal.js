import PageHero from "../components/ui/PageHero";
import { useApi } from "../api/hooks";
import useSeo from "../hooks/useSeo";

// One component serves /privacy, /terms and /copyright — content is
// entirely CMS-driven (core.LegalPage), so editing it never needs a
// redeploy. `slug` is passed in from the route definition in App.js.
export default function Legal({ slug }) {
  const { data, loading } = useApi(`/api/legal/${slug}/`, null);

  useSeo({
    title: data ? data.title : "Legal",
    description: `${data ? data.title : "Legal information"} for MECHPRO SOLUTIONS LTD.`,
    path: `/${slug}`,
  });

  if (loading && !data) {
    return (
      <section className="section">
        <div className="container"><p className="kicker">Loading…</p></div>
      </section>
    );
  }

  if (!data) {
    return (
      <>
        <PageHero kicker="Legal" title="Page unavailable" />
        <section className="section">
          <div className="container">
            <p className="card__text">
              This page hasn't been set up yet. Contact us if you need this information directly.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero kicker="Legal" title={data.title} />
      <section className="section">
        <div className="container container--narrow">
          <div className="prose">
            {data.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          {data.updatedAt && (
            <p className="kicker" style={{ marginTop: "2.5rem" }}>
              Last updated {new Date(data.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
