// ------------------------------------------------------------------
// brain.js — the assistant's intent engine.
// Pure functions: (userText, knowledge) → reply { text, actions, quick }
// Knowledge = live CMS data (config, services, products) so answers stay
// current with whatever the client edits in the admin.
// ------------------------------------------------------------------

const norm = (s) => s.toLowerCase().replace(/[^\w\s/+.-]/g, " ").replace(/\s+/g, " ").trim();
const hasAny = (text, words) => words.some((w) => text.includes(w));

// Service keyword map — matches how customers actually talk.
const SERVICE_KEYWORDS = {
  "air-conditioning-installation": ["install", "installation", "fit", "new ac", "buy ac", "mounting"],
  "hvac-design": ["design", "drawing", "engineer", "consult", "load calc", "architect", "boq"],
  "mechanical-ventilation": ["ventilation", "extract", "fresh air", "airflow", "fan", "smoke", "fume", "dust"],
  "preventive-maintenance": ["maintenance", "service", "servicing", "clean", "filter"],
  "emergency-repairs": ["repair", "fix", "broken", "not cooling", "not working", "leak", "fault", "gas"],
  "commercial-hvac": ["vrf", "vrv", "commercial", "office block", "chiller", "building", "floors"],
  "annual-maintenance-contracts": ["contract", "amc", "annual", "retainer", "facility"],
};

export function greeting(config) {
  return {
    text: `Karibu! I'm the ${config.shortName} assistant. I can explain our services, help you find the right AC unit, or get you a quotation in about a minute. What brings you in?`,
    quick: ["Get a quotation", "Our services", "Find a product", "Talk to a human"],
  };
}

export function think(raw, k) {
  const text = norm(raw);
  const { config, services, products } = k;

  // --- order matters: specific intents before broad ones ---

  if (hasAny(text, ["quote", "quotation", "price", "cost", "how much", "estimate", "bei", "pesa"])) {
    return { startFlow: true, text: "Happy to get that moving — a few quick questions and you'll have a reference number from our engineering team." };
  }

  if (hasAny(text, ["human", "person", "agent", "someone", "call me", "talk to", "speak"])) {
    return {
      text: `Of course. ${config.hours} — a human genuinely answers.`,
      actions: [
        { label: `Call ${config.phoneDisplay}`, href: config.phoneHref },
        { label: "WhatsApp us", href: "wa" },
      ],
      quick: ["Get a quotation", "Our services"],
    };
  }

  if (hasAny(text, ["emergency", "urgent", "flooding", "burst", "sparking"])) {
    return {
      text: `That sounds urgent — call us directly so the on-duty team can triage it now. ${config.emergencyNote}.`,
      actions: [{ label: `Call ${config.phoneDisplay}`, href: config.phoneHref }],
    };
  }

  if (hasAny(text, ["hour", "open", "close", "time", "when are you"])) {
    return { text: `We're open ${config.hours}. ${config.emergencyNote}.`, quick: ["Get a quotation", "Talk to a human"] };
  }

  if (hasAny(text, ["where", "location", "address", "office", "found", "map"])) {
    return {
      text: `We're based in ${config.address}, and our teams cover ${config.serviceAreas.slice(0, 5).join(", ")} and beyond — ${config.serviceAreas.length} counties in all.`,
      actions: [{ label: "Contact page & map", to: "/contact" }],
    };
  }

  if (hasAny(text, ["warranty", "guarantee"])) {
    return {
      text: "Two layers: manufacturer warranties on equipment (we supply through authorised channels, so serial numbers verify), and our own workmanship warranty on installation — both in writing. Specific terms are listed on each product page.",
      actions: [{ label: "Browse products", to: "/products" }],
      quick: ["Get a quotation"],
    };
  }

  // --- product search: brand, capacity, category ---
  const wantsProduct = hasAny(text, ["product", "unit", "ac ", " ac", "aircon", "conditioner",
    "btu", "cassette", "split", "ducted", "floor standing", "curtain", "heat pump",
    ...products.map((p) => norm(p.brand)).filter((v, i, a) => a.indexOf(v) === i)]);
  if (wantsProduct) {
    const matches = products.filter((p) => {
      const hay = norm(`${p.name} ${p.brand} ${p.category} ${p.capacityBtu} ${p.model}`);
      return text.split(" ").some((word) => word.length > 2 && hay.includes(word));
    }).slice(0, 3);
    if (matches.length > 0) {
      return {
        text: `Here's what matches best — tap one for full specs${matches.length > 1 ? ", or tell me the room size and I'll narrow it down" : ""}:`,
        actions: matches.map((p) => ({
          label: `${p.name}${p.capacityBtu !== "—" ? ` · ${p.capacityBtu} BTU` : ""}`,
          to: `/products/${p.slug}`,
        })),
        quick: ["Get a quotation", "Browse all products"],
      };
    }
    return {
      text: "Tell me a bit more — the brand you prefer, the room size, or the type (wall-mounted, cassette, ducted...) and I'll point you at the right units. Or browse the full catalogue:",
      actions: [{ label: "Browse all products", to: "/products" }],
    };
  }

  // --- service matching ---
  for (const service of services) {
    const keys = SERVICE_KEYWORDS[service.slug] || [];
    if (text.includes(norm(service.name)) || hasAny(text, keys)) {
      return {
        text: `${service.summary}`,
        actions: [{ label: `More on ${service.name}`, to: `/services/${service.slug}` }],
        quick: ["Get a quotation", "Talk to a human"],
      };
    }
  }

  if (hasAny(text, ["service", "what do you do", "help with", "offer"])) {
    return {
      text: `We cover the full journey: ${services.map((s) => s.name).join(", ")}. Which one is closest to what you need?`,
      quick: services.slice(0, 4).map((s) => s.name),
    };
  }

  if (hasAny(text, ["hi", "hello", "hey", "habari", "mambo", "niaje", "good morning", "good afternoon", "good evening"])) {
    return greeting(config);
  }

  if (hasAny(text, ["thank", "asante", "great", "awesome", "bye", "later"])) {
    return { text: "Karibu sana! I'm here whenever the building needs us. 🌬️".replace(" 🌬️", ""), quick: ["Get a quotation", "Our services"] };
  }

  // --- fallback: honest, useful ---
  return {
    text: "I want to make sure you get a proper answer to that. I'm best at services, products, and quotations — or I can hand you straight to the team.",
    actions: [
      { label: `Call ${config.phoneDisplay}`, href: config.phoneHref },
      { label: "WhatsApp the team", href: "wa" },
    ],
    quick: ["Get a quotation", "Our services", "Find a product"],
  };
}

// --- Guided quotation flow (mini-RFQ inside the chat) ---
export const FLOW_STEPS = [
  { key: "fullName", prompt: "First — what's your name?", validate: (v) => v.trim().length >= 2 || "A name helps us address you properly." },
  { key: "phone", prompt: (v) => `Thanks ${v.fullName.split(" ")[0]}! What phone number should our engineer call?`, validate: (v) => (v.replace(/\D/g, "").length >= 9) || "That number looks short — try the format 07XX XXX XXX." },
  { key: "county", prompt: "Which county is the work in?", chips: ["Nairobi", "Kiambu", "Machakos", "Kajiado", "Mombasa", "Nakuru", "Kisumu", "Other"] },
  { key: "service", prompt: "And what do you need done?", chipsFrom: "services" },
  { key: "message", prompt: "Last one — describe the project in a line or two (rooms, sizes, what's wrong). Or tap Skip.", optional: true, chips: ["Skip"] },
];
