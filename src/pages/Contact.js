import { useState } from "react";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import SectionHeader from "../components/ui/SectionHeader";
import { useSite } from "../context/SiteContext";
import Chip from "../components/ui/Chip";
import { apiPost } from "../api/client";
import { trackClick } from "../api/trackClick";
import useSeo from "../hooks/useSeo";

const emptyForm = { fullName: "", company: "", email: "", phone: "", subject: "", message: "" };

// Fallback labels/required flags — used until the CMS values load, and if
// the backend patch adding contactFormFields hasn't been deployed yet.
const DEFAULT_FIELDS = {
  fullName: { label: "Full name", required: true },
  company: { label: "Company (optional)", required: false },
  email: { label: "Email address", required: true },
  phone: { label: "Phone number", required: true },
  subject: { label: "Subject", required: true },
  message: { label: "Message", required: true },
};

export default function Contact() {
  const { config, wa } = useSite();
  useSeo({
    title: "Contact Us",
    description: "Call, WhatsApp or email MECHPRO SOLUTIONS LTD for HVAC and air conditioning enquiries in Nairobi and across Kenya. A human answers.",
    path: "/contact",
  });

  const fields = config.contactFormFields || DEFAULT_FIELDS;

  // --- General contact form (WRS 'D. Contact Form') -> POST /api/contact/ ---
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState(null); // set only if the API call fails

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (fields.fullName.required && !form.fullName.trim()) next.fullName = "Please tell us your name.";
    if (fields.email.required && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (fields.phone.required && !form.phone.trim()) next.phone = "We need a phone number to reach you.";
    if (fields.subject.required && !form.subject.trim()) next.subject = "A short subject helps us route it.";
    if (fields.message.required && !form.message.trim()) next.message = "Tell us what it's about.";
    if (Object.keys(next).length > 0) { setErrors(next); return; }

    setSending(true);
    try {
      const res = await apiPost("/api/contact/", form);
      if (res.ok) {
        setSent(true);
      } else if (res.status === 400 && res.data) {
        const serverErrors = {};
        Object.entries(res.data).forEach(([field, msgs]) => {
          serverErrors[field] = Array.isArray(msgs) ? msgs.join(" ") : String(msgs);
        });
        setErrors(serverErrors);
      } else throw new Error();
    } catch {
      // The API call failed. Rather than auto-opening a WhatsApp tab
      // (which browsers often block after an async call, and which
      // flashes an empty tab open-then-closed even when it isn't
      // blocked), show the customer a real link they tap themselves.
      setFallbackUrl(wa(`${form.subject}\n\n${form.message}\n\nFrom ${form.fullName}, ${form.phone}`));
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        kicker="Contact"
        title={config.contactPageTitle || "A human answers."}
        lead={config.contactPageLead || "Phone, WhatsApp, email or the form below, whichever suits you. Office hours are listed below, and contract clients have emergency lines."}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            <div className="detail-aside__card contact-card">
              <Chip>Phone</Chip>
              <h3>Call us</h3>
              <p className="detail-aside__note">{config.hours}<br />{config.emergencyNote}.</p>
              <Button href={config.phoneHref} variant="phone" icon="phone" onClick={() => trackClick("phone")}>{config.phoneDisplay}</Button>
            </div>
            <div className="detail-aside__card contact-card">
              <Chip>WhatsApp</Chip>
              <h3>WhatsApp</h3>
              <p className="detail-aside__note">Fastest for photos of your unit, nameplates or fault codes.</p>
              <Button href={wa()} variant="whatsapp" icon="whatsapp" onClick={() => trackClick("whatsapp")}>Start a chat</Button>
            </div>
            <div className="detail-aside__card contact-card">
              <Chip>Email</Chip>
              <h3>Email</h3>
              <ul className="footer__contact">
                <li><a href={`mailto:${config.emails.info}`} onClick={() => trackClick("email")}>{config.emails.info}</a></li>
                <li><a href={`mailto:${config.emails.sales}`} onClick={() => trackClick("email")}>{config.emails.sales}</a></li>
                <li><a href={`mailto:${config.emails.quotations}`} onClick={() => trackClick("email")}>{config.emails.quotations}</a></li>
                <li><a href={`mailto:${config.emails.support}`} onClick={() => trackClick("email")}>{config.emails.support}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--slim">
        <div className="container detail-grid">
          <div>
            <SectionHeader kicker="Write to us" title="Send a message." />
            {sent ? (
              <div className="detail-aside__card">
                <p className="kicker">Message received</p>
                <ul className="check-list">
                  <li><Icon name="check" size={16} /> Thanks, {form.fullName.split(" ")[0]}, your message is with our team.</li>
                  <li><Icon name="check" size={16} /> We respond within one working day, usually much sooner.</li>
                </ul>
              </div>
            ) : (
              <>
                {fallbackUrl && (
                  <div className="detail-aside__card" style={{ marginBottom: "1.5rem" }}>
                    <p className="kicker">Couldn't send just now</p>
                    <p className="detail-aside__note">
                      Our system didn't confirm your message went through. Send it directly on WhatsApp instead, nothing is lost.
                    </p>
                    <div className="detail-aside__actions">
                      <Button href={fallbackUrl} variant="whatsapp" icon="whatsapp" onClick={() => trackClick("whatsapp")}>
                        Send via WhatsApp
                      </Button>
                    </div>
                  </div>
                )}
                <form className="rfq-form" onSubmit={submit} noValidate>
                <fieldset>
                  <legend>Your message</legend>
                  <div className="rfq-form__row">
                    <label>
                      <span>{fields.fullName.label}{fields.fullName.required ? " *" : ""}</span>
                      <input value={form.fullName} onChange={set("fullName")} autoComplete="name" />
                      {errors.fullName && <em className="field-error">{errors.fullName}</em>}
                    </label>
                    <label>
                      <span>{fields.company.label}</span>
                      <input value={form.company} onChange={set("company")} autoComplete="organization" />
                    </label>
                  </div>
                  <div className="rfq-form__row">
                    <label>
                      <span>{fields.email.label}{fields.email.required ? " *" : ""}</span>
                      <input value={form.email} onChange={set("email")} inputMode="email" autoComplete="email" />
                      {errors.email && <em className="field-error">{errors.email}</em>}
                    </label>
                    <label>
                      <span>{fields.phone.label}{fields.phone.required ? " *" : ""}</span>
                      <input value={form.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" />
                      {errors.phone && <em className="field-error">{errors.phone}</em>}
                    </label>
                  </div>
                  <label>
                    <span>{fields.subject.label}{fields.subject.required ? " *" : ""}</span>
                    <input value={form.subject} onChange={set("subject")} />
                    {errors.subject && <em className="field-error">{errors.subject}</em>}
                  </label>
                  <label>
                    <span>{fields.message.label}{fields.message.required ? " *" : ""}</span>
                    <textarea rows={5} value={form.message} onChange={set("message")} />
                    {errors.message && <em className="field-error">{errors.message}</em>}
                  </label>
                </fieldset>
                <div className="rfq-form__actions">
                  <Button type="submit" icon="arrow">{sending ? "Sending..." : "Send message"}</Button>
                </div>
              </form>
              </>
            )}
          </div>
          <aside className="detail-aside">
            <div className="detail-aside__card">
              <p className="kicker">Find us</p>
              <p className="detail-aside__note">{config.address}<br />{config.hours}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--slim">
        <div className="container">
          <SectionHeader kicker="On the map" title={config.address} />
          <div className="map-frame">
            <iframe
              title={`Map of ${config.name}`}
              src={config.mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
