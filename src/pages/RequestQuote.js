import { useState } from "react";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import SpecPlate from "../components/ui/SpecPlate";
import { useSite } from "../context/SiteContext";
import { useApi } from "../api/hooks";
import { apiPost } from "../api/client";
import fallbackServices from "../data/services";
import useSeo from "../hooks/useSeo";

// Form option lists — from the WRS. Edit here, form updates itself.
const projectTypes = [
  "Residential", "Office", "Hospital", "School", "Hotel",
  "Restaurant", "Factory", "Warehouse", "Retail Shop", "Data Centre", "Other",
];
const equipmentTypes = [
  "Wall Mounted AC", "Cassette Unit", "Ducted Unit", "Floor Standing",
  "VRF System", "Heat Pump", "Ventilation Fans", "Air Curtain", "Not sure yet",
];
const counties = [
  "Nairobi", "Kiambu", "Machakos", "Kajiado", "Nakuru", "Uasin Gishu (Eldoret)",
  "Kisumu", "Mombasa", "Nyeri", "Meru", "Other",
];

const emptyForm = {
  fullName: "", company: "", phone: "", email: "",
  county: "", town: "", location: "",
  projectType: "", service: "", equipment: "", message: "",
};

export default function RequestQuote() {
  const { config, wa } = useSite();
  useSeo({
    title: "Request a Free HVAC Quotation",
    description: "Get a free quotation for air conditioning installation, HVAC design, ventilation or maintenance in Kenya. Response within 24 working hours.",
    path: "/request-quote",
  });

  const { data: services } = useApi("/api/services/", fallbackServices);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null);        // null | "api" | "whatsapp"
  const [reference, setReference] = useState("");

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Please tell us your name.";
    if (!form.phone.trim()) next.phone = "We need a phone number to reach you.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "That email doesn't look right.";
    if (!form.county) next.county = "Select your county.";
    if (!form.service) next.service = "Select the service you need.";
    return next;
  };

  // WhatsApp fallback message — used only if the API is unreachable.
  const buildMessage = () => {
    const lines = [
      "QUOTATION REQUEST — via mechpro website",
      "----------------------------------",
      `Name: ${form.fullName}`,
      form.company && `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      `Location: ${[form.location, form.town, form.county].filter(Boolean).join(", ")}`,
      `Project type: ${form.projectType || "—"}`,
      `Service required: ${form.service}`,
      `Equipment: ${form.equipment || "—"}`,
      form.message && `Details: ${form.message}`,
    ].filter(Boolean);
    return lines.join("\n");
  };

  const submit = async (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) { setErrors(next); return; }

    // Open the tab synchronously, inside the click/submit gesture, so
    // browsers never treat it as a blocked popup — we fill in the URL
    // once we know whether the API call succeeded or failed.
    const waTab = window.open("", "_blank", "noreferrer");

    setSending(true);
    try {
      // The RFQ workflow: store → reference → emails → receipt.
      const res = await apiPost("/api/rfq/", form);
      if (res.ok) {
        if (waTab) waTab.close();
        setReference(res.data.reference);
        setSent("api");
      } else if (res.status === 400 && res.data) {
        if (waTab) waTab.close();
        // Map server-side validation errors onto their fields.
        const serverErrors = {};
        Object.entries(res.data).forEach(([field, msgs]) => {
          serverErrors[field] = Array.isArray(msgs) ? msgs.join(" ") : String(msgs);
        });
        setErrors(serverErrors);
      } else {
        throw new Error("unexpected");
      }
    } catch {
      // Backend unreachable — the lead still gets through via WhatsApp.
      // Reuse the tab opened at the start of submit() rather than calling
      // window.open() here, which some browsers block after an await.
      const url = wa(buildMessage());
      if (waTab) waTab.location.href = url;
      else window.open(url, "_blank", "noreferrer");
      setSent("whatsapp");
    } finally {
      setSending(false);
    }
  };

  const mailtoHref = `mailto:${config.emails.quotations}?subject=${encodeURIComponent(
    "Quotation Request — " + (form.fullName || "Website")
  )}&body=${encodeURIComponent(buildMessage())}`;

  if (sent) {
    return (
      <>
        <PageHero
          kicker="Request received"
          title={sent === "api" ? "Request received. You're in the system." : "Your request is on its way."}
        />
        <section className="section">
          <div className="container container--narrow">
            {sent === "api" && (
              <div className="reference-box">
                <span>Your reference number</span>
                <strong>{reference}</strong>
              </div>
            )}
            <div className="detail-aside__card">
              <p className="kicker">What happens next</p>
              <ul className="check-list">
                {sent === "api" ? (
                  <>
                    <li><Icon name="check" size={16} /> A confirmation email is on its way{form.email ? ` to ${form.email}` : ""} with your reference number.</li>
                    <li><Icon name="check" size={16} /> Our engineering team reviews and responds within 24 working hours.</li>
                    <li><Icon name="check" size={16} /> If your project needs a site survey, we'll schedule one when we call.</li>
                    <li><Icon name="check" size={16} /> Quote your reference, <strong>{reference}</strong>, in any follow-up.</li>
                  </>
                ) : (
                  <>
                    <li><Icon name="check" size={16} /> Your request opened in WhatsApp, press send if you haven't yet.</li>
                    <li><Icon name="check" size={16} /> Our engineering team reviews and responds within 24 working hours.</li>
                    <li><Icon name="check" size={16} /> If your project needs a site survey, we'll schedule one when we call.</li>
                  </>
                )}
              </ul>
              <div className="detail-aside__actions">
                {sent === "whatsapp" && (
                  <Button href={mailtoHref} variant="ghost" icon="mail">Send by email instead</Button>
                )}
                <Button to="/" variant="ink" icon="arrow">Back to home</Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        kicker="Request a quotation"
        title="Tell us about the project. We'll do the numbers."
        lead="Five minutes here saves a week of back-and-forth. The more you tell us, the sharper the first quote."
      >
        <SpecPlate
          className="specplate--onink"
          items={[
            { label: "Response", value: "Within 24 working hours" },
            { label: "Survey", value: "Free within Nairobi" },
            { label: "Quote", value: "Itemised, no surprises" },
          ]}
        />
      </PageHero>

      <section className="section">
        <div className="container detail-grid">
          <form className="rfq-form" onSubmit={submit} noValidate>
            <fieldset>
              <legend>Your details</legend>
              <div className="rfq-form__row">
                <label>
                  <span>Full name *</span>
                  <input value={form.fullName} onChange={set("fullName")} autoComplete="name" />
                  {errors.fullName && <em className="field-error">{errors.fullName}</em>}
                </label>
                <label>
                  <span>Company (optional)</span>
                  <input value={form.company} onChange={set("company")} autoComplete="organization" />
                </label>
              </div>
              <div className="rfq-form__row">
                <label>
                  <span>Phone number *</span>
                  <input value={form.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" placeholder="07XX XXX XXX" />
                  {errors.phone && <em className="field-error">{errors.phone}</em>}
                </label>
                <label>
                  <span>Email address</span>
                  <input value={form.email} onChange={set("email")} inputMode="email" autoComplete="email" />
                  {errors.email && <em className="field-error">{errors.email}</em>}
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Where the work is</legend>
              <div className="rfq-form__row">
                <label>
                  <span>County *</span>
                  <select value={form.county} onChange={set("county")}>
                    <option value="">Select county…</option>
                    {counties.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  {errors.county && <em className="field-error">{errors.county}</em>}
                </label>
                <label>
                  <span>Town / City</span>
                  <input value={form.town} onChange={set("town")} />
                </label>
              </div>
              <label>
                <span>Physical location (building, street, estate)</span>
                <input value={form.location} onChange={set("location")} />
              </label>
            </fieldset>

            <fieldset>
              <legend>The project</legend>
              <div className="rfq-form__row">
                <label>
                  <span>Project type</span>
                  <select value={form.projectType} onChange={set("projectType")}>
                    <option value="">Select type…</option>
                    {projectTypes.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
                <label>
                  <span>Service required *</span>
                  <select value={form.service} onChange={set("service")}>
                    <option value="">Select service…</option>
                    {services.map((s) => <option key={s.slug}>{s.name}</option>)}
                  </select>
                  {errors.service && <em className="field-error">{errors.service}</em>}
                </label>
              </div>
              <label>
                <span>Equipment required</span>
                <select value={form.equipment} onChange={set("equipment")}>
                  <option value="">Select equipment…</option>
                  {equipmentTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label>
                <span>Tell us more: rooms, sizes, current problems, timelines</span>
                <textarea rows={5} value={form.message} onChange={set("message")} />
              </label>
            </fieldset>

            <div className="rfq-form__actions">
              <Button type="submit" icon="arrow">
                {sending ? "Sending…" : "Send quotation request"}
              </Button>
              <Button href={mailtoHref} variant="ghost" icon="mail">Send by email instead</Button>
            </div>
            <p className="rfq-form__note">
              Prefer to talk? Call <a href={config.phoneHref}>{config.phoneDisplay}</a>, a
              human answers.
            </p>
          </form>

          <aside className="detail-aside">
            <div className="detail-aside__card">
              <p className="kicker">Why we ask</p>
              <p className="detail-aside__note">
                County tells us travel; project type hints at the load; equipment narrows the
                brands. Every field you fill removes one clarifying phone call.
              </p>
            </div>
            <div className="detail-aside__card">
              <p className="kicker">Direct lines</p>
              <ul className="footer__contact">
                <li><a href={`mailto:${config.emails.quotations}`}><Icon name="mail" size={15} /> {config.emails.quotations}</a></li>
                <li><a href={`mailto:${config.emails.sales}`}><Icon name="mail" size={15} /> {config.emails.sales}</a></li>
                <li><a href={config.phoneHref}><Icon name="phone" size={15} /> {config.phoneDisplay}</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
