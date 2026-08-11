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

export default function Contact() {
  const { config, wa } = useSite();
  useSeo({
    title: "Contact Us",
    description: "Call, WhatsApp or email MECHPRO SOLUTIONS LTD for HVAC and air conditioning enquiries in Nairobi and across Kenya. A human answers.",
    path: "/contact",
  });


  // --- General contact form (WRS 'D. Contact Form') -> POST /api/contact/ ---
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.phone.trim()) next.phone = "We need a phone number to reach you.";
    if (!form.subject.trim()) next.subject = "A short subject helps us route it.";
    if (!form.message.trim()) next.message = "Tell us what it's about.";
    if (Object.keys(next).length > 0) { setErrors(next); return; }

    const waTab = window.open("", "_blank", "noreferrer");

    setSending(true);
    try {
      const res = await apiPost("/api/contact/", form);
      if (res.ok) {
        if (waTab) waTab.close();
        setSent(true);
      } else if (res.status === 400 && res.data) {
        if (waTab) waTab.close();
        const serverErrors = {};
        Object.entries(res.data).forEach(([field, msgs]) => {
          serverErrors[field] = Array.isArray(msgs) ? msgs.join(" ") : String(msgs);
        });
        setErrors(serverErrors);
      } else throw new Error();
    } catch {
      const url = wa(`${form.subject}\n\n${form.message}\n\nFrom ${form.fullName}, ${form.phone}`);
      if (waTab) waTab.location.href = url;
      else window.open(url, "_blank", "noreferrer");
      setSent(true);
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
                <li><a href={`mailto:${config.emails.info}`}>{config.emails.info}</a></li>
                <li><a href={`mailto:${config.emails.sales}`}>{config.emails.sales}</a></li>
                <li><a href={`mailto:${config.emails.quotations}`}>{config.emails.quotations}</a></li>
                <li><a href={`mailto:${config.emails.support}`}>{config.emails.support}</a></li>
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
              <form className="rfq-form" onSubmit={submit} noValidate>
                <fieldset>
                  <legend>Your message</legend>
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
                      <span>Email address *</span>
                      <input value={form.email} onChange={set("email")} inputMode="email" autoComplete="email" />
                      {errors.email && <em className="field-error">{errors.email}</em>}
                    </label>
                    <label>
                      <span>Phone number *</span>
                      <input value={form.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" />
                      {errors.phone && <em className="field-error">{errors.phone}</em>}
                    </label>
                  </div>
                  <label>
                    <span>Subject *</span>
                    <input value={form.subject} onChange={set("subject")} />
                    {errors.subject && <em className="field-error">{errors.subject}</em>}
                  </label>
                  <label>
                    <span>Message *</span>
                    <textarea rows={5} value={form.message} onChange={set("message")} />
                    {errors.message && <em className="field-error">{errors.message}</em>}
                  </label>
                </fieldset>
                <div className="rfq-form__actions">
                  <Button type="submit" icon="arrow">{sending ? "Sending..." : "Send message"}</Button>
                </div>
              </form>
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
