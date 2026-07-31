// ------------------------------------------------------------------
// brain.js — the assistant's intent engine.
// Pure functions: (userText, knowledge) → reply { text, actions, quick }
// Knowledge = live CMS data (config, services, products, faqs) so answers
// stay current with whatever the client edits in the admin.
// ------------------------------------------------------------------

const norm = (s) => s.toLowerCase().replace(/[^\w\s/+.-]/g, " ").replace(/\s+/g, " ").trim();
const hasAny = (text, words) => words.some((w) => text.includes(w));
const STOPWORDS = new Set(["the", "a", "an", "is", "are", "do", "does", "you", "your",
  "i", "my", "me", "to", "for", "of", "and", "or", "in", "on", "at", "it", "can", "what",
  "how", "will", "with", "if", "be", "have", "has", "that", "this"]);

const significantWords = (text) =>
  text.split(" ").filter((w) => w.length > 2 && !STOPWORDS.has(w));

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

// BTU sizing table (rough, standard rule-of-thumb ranges for Kenyan room heights/insulation).
const BTU_TABLE = [
  { maxSqm: 15, btu: "9,000" },
  { maxSqm: 23, btu: "12,000" },
  { maxSqm: 32, btu: "18,000" },
  { maxSqm: 40, btu: "24,000" },
  { maxSqm: 60, btu: "36,000" },
];

function recommendBtu(sqm) {
  const tier = BTU_TABLE.find((t) => sqm <= t.maxSqm);
  if (tier) return `around ${tier.btu} BTU`;
  return "36,000 BTU or above, at that size we'd usually recommend a ducted or multi-split system rather than one wall unit";
}

// Parses "18 sqm", "200 sqft", "4m x 5m", "20 square meters" out of free text.
function extractRoomSize(text) {
  let m = /(\d+(?:\.\d+)?)\s*(?:sq\.?\s*m|sqm|m2|m²|square met)/.exec(text);
  if (m) return parseFloat(m[1]);
  m = /(\d+(?:\.\d+)?)\s*(?:sq\.?\s*ft|sqft|square feet)/.exec(text);
  if (m) return parseFloat(m[1]) / 10.764;
  m = /(\d+(?:\.\d+)?)\s*(?:m|meter|metre)s?\s*(?:x|by)\s*(\d+(?:\.\d+)?)\s*(?:m|meter|metre)?/.exec(text);
  if (m) return parseFloat(m[1]) * parseFloat(m[2]);
  m = /(\d+(?:\.\d+)?)\s*(?:ft|feet)\s*(?:x|by)\s*(\d+(?:\.\d+)?)\s*(?:ft|feet)?/.exec(text);
  if (m) return (parseFloat(m[1]) * parseFloat(m[2])) / 10.764;
  return null;
}

export function greeting(config) {
  return {
    text: `Hi, I'm the ${config.shortName} assistant. I can size a unit for your room, explain a service, help you find equipment, or get you a quotation in about a minute. What do you need?`,
    quick: ["Get a quotation", "Size my room", "Our services", "Find a product"],
  };
}

export function think(raw, k) {
  const text = norm(raw);
  const { config, services, products, faqs } = k;

  // --- cancel / exit any flow ---
  if (hasAny(text, ["cancel", "stop", "never mind", "nevermind", "forget it", "exit"])) {
    return { cancelFlow: true, text: "No problem, cancelled. What else can I help with?", quick: ["Get a quotation", "Our services", "Find a product"] };
  }

  // --- BTU / room-size calculator: check this before general product search ---
  const sqm = extractRoomSize(text);
  if (sqm !== null && sqm > 0) {
    const rec = recommendBtu(sqm);
    return {
      text: `For roughly ${sqm % 1 === 0 ? sqm : sqm.toFixed(1)} m² you're typically looking at ${rec}. That's a starting point though. Ceiling height, sun exposure and how many people usually use the room all shift it a bit, which is exactly why we do a proper survey before quoting.`,
      actions: [{ label: "See units in that range", to: "/products" }],
      quick: ["Get a quotation", "Talk to a human"],
    };
  }
  if (hasAny(text, ["how many btu", "what size ac", "what size unit", "btu do i need", "size my room", "room size"])) {
    return { text: "Happy to help size it. Tell me the room in metres or feet, something like \"4m by 5m\" or \"18 sqm\", and I'll give you a starting BTU range." };
  }

  if (hasAny(text, ["quote", "quotation", "price", "cost", "how much", "estimate", "bei", "pesa"])) {
    return { startFlow: true, text: "Happy to get that moving, a few quick questions and you'll have a reference number from our engineering team." };
  }

  if (hasAny(text, ["human", "person", "agent", "someone", "call me", "talk to", "speak"])) {
    return {
      text: `Of course. ${config.hours}, and a human genuinely answers.`,
      actions: [
        { label: `Call ${config.phoneDisplay}`, href: config.phoneHref },
        { label: "WhatsApp us", href: "wa" },
      ],
      quick: ["Get a quotation", "Our services"],
    };
  }

  if (hasAny(text, ["emergency", "urgent", "flooding", "burst", "sparking"])) {
    return {
      text: `That sounds urgent, call us directly so the on-duty team can triage it now. ${config.emergencyNote}.`,
      actions: [{ label: `Call ${config.phoneDisplay}`, href: config.phoneHref }],
    };
  }

  if (hasAny(text, ["hour", "open", "close", "time", "when are you"])) {
    return { text: `We're open ${config.hours}. ${config.emergencyNote}.`, quick: ["Get a quotation", "Talk to a human"] };
  }

  if (hasAny(text, ["where", "location", "address", "office", "found", "map"])) {
    return {
      text: `We're based in ${config.address}, and our teams cover ${config.serviceAreas.slice(0, 5).join(", ")} and beyond, ${config.serviceAreas.length} counties in all.`,
      actions: [{ label: "Contact page and map", to: "/contact" }],
    };
  }

  if (hasAny(text, ["warranty", "guarantee"])) {
    return {
      text: "Two layers: manufacturer warranties on the equipment (we only supply through authorised channels, so serial numbers actually verify), plus our own workmanship warranty on the installation, both in writing. Specific terms are listed on each product page.",
      actions: [{ label: "Browse products", to: "/products" }],
      quick: ["Get a quotation"],
    };
  }

  // --- FAQ search: check the real service FAQs before falling back to a generic answer ---
  if (faqs && faqs.length > 0) {
    const words = significantWords(text);
    if (words.length > 0) {
      let best = null, bestScore = 0;
      for (const faq of faqs) {
        const hay = norm(`${faq.question} ${faq.answer}`);
        const score = words.filter((w) => hay.includes(w)).length;
        if (score > bestScore) { bestScore = score; best = faq; }
      }
      if (best && bestScore >= 2) {
        return {
          text: best.answer,
          actions: [{ label: `More on ${best.serviceName}`, to: `/services/${best.serviceSlug}` }],
          quick: ["Get a quotation", "Talk to a human"],
        };
      }
    }
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
        text: `Here's what matches best, tap one for full specs${matches.length > 1 ? ", or tell me the room size and I'll narrow it down" : ""}:`,
        actions: matches.map((p) => ({
          label: `${p.name}${p.capacityBtu !== "—" ? ` · ${p.capacityBtu} BTU` : ""}`,
          to: `/products/${p.slug}`,
        })),
        quick: ["Get a quotation", "Browse all products"],
      };
    }
    return {
      text: "Tell me a bit more, the brand you prefer, the room size, or the type (wall-mounted, cassette, ducted...) and I'll point you at the right units. Or browse the full catalogue:",
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

  if (hasAny(text, ["how are you", "how's it going", "you good", "unaendaje"])) {
    return { text: "Doing well, thanks for asking! Ready to help with anything HVAC. What's on your mind?", quick: ["Get a quotation", "Our services", "Size my room"] };
  }

  if (hasAny(text, ["thank", "asante", "great", "awesome", "bye", "later"])) {
    return { text: "Karibu sana! I'm here whenever the building needs us.", quick: ["Get a quotation", "Our services"] };
  }

  // --- fallback: honest, useful ---
  return {
    text: "I want to make sure you get a proper answer to that. I'm best at services, products, room sizing, and quotations, or I can hand you straight to the team.",
    actions: [
      { label: `Call ${config.phoneDisplay}`, href: config.phoneHref },
      { label: "WhatsApp the team", href: "wa" },
    ],
    quick: ["Get a quotation", "Our services", "Size my room"],
  };
}

// --- Guided quotation flow (mini-RFQ inside the chat) ---
export const FLOW_STEPS = [
  { key: "fullName", prompt: "First, what's your name?", validate: (v) => v.trim().length >= 2 || "A name helps us address you properly." },
  { key: "phone", prompt: (v) => `Thanks ${v.fullName.split(" ")[0]}! What phone number should our engineer call?`, validate: (v) => (v.replace(/\D/g, "").length >= 9) || "That number looks short, try the format 07XX XXX XXX." },
  { key: "county", prompt: "Which county is the work in?", chips: ["Nairobi", "Kiambu", "Machakos", "Kajiado", "Mombasa", "Nakuru", "Kisumu", "Other"] },
  { key: "service", prompt: "And what do you need done?", chipsFrom: "services" },
  { key: "message", prompt: "Last one, describe the project in a line or two (rooms, sizes, what's wrong). Or tap Skip.", optional: true, chips: ["Skip"] },
];
