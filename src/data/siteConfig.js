// ------------------------------------------------------------------
// siteConfig.js — single source of truth for company identity.
// Change a phone number or email HERE and it updates everywhere.
// ------------------------------------------------------------------

const siteConfig = {
  name: "MECHPRO SOLUTIONS LTD",
  shortName: "MECHPRO",
  tagline: "Professional HVAC Solutions",
  descriptor:
    "Kenyan mechanical engineering company delivering end-to-end HVAC and mechanical ventilation solutions: design, supply, installation, commissioning and maintenance.",

  phoneDisplay: "+254 758 644 781",
  phoneHref: "tel:+254758644781",

  whatsappNumber: "254758644781",
  whatsappDefaultMessage:
    "Hello MECHPRO SOLUTIONS LTD. I would like to request a quotation for your HVAC services.",

  emails: {
    info: "info@mechpro.co.ke",
    sales: "sales@mechpro.co.ke",
    quotations: "quotations@mechpro.co.ke",
    support: "support@mechpro.co.ke",
  },

  address: "Nairobi, Kenya",
  hours: "Mon – Sat · 8:00 AM – 6:00 PM",
  emergencyNote: "24/7 emergency response for contract clients",

  mapEmbedSrc: "https://www.google.com/maps?q=Nairobi,Kenya&output=embed",

  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
  ],

  serviceAreas: [
    "Nairobi", "Kiambu", "Machakos", "Kajiado", "Nakuru",
    "Eldoret", "Kisumu", "Mombasa", "Nyeri", "Thika", "Meru",
  ],
};

// Builds a wa.me link with any message (defaults to the standard one).
export const whatsappLink = (message = siteConfig.whatsappDefaultMessage) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

export default siteConfig;
