// Knowledge Centre articles — SEO content per the WRS keyword strategy.
const posts = [
  {
    slug: "ac-installation-cost-kenya",
    title: "How much does AC installation cost in Kenya? An honest breakdown",
    category: "Buying Guides",
    date: "July 2026",
    readTime: "6 min read",
    excerpt:
      "The quote depends on four things: unit capacity, pipe run length, wall type and access. Here's how each one moves the number, so you can read any quotation like a professional.",
    body: [
      "Every week someone asks us for 'the price of installing an AC.' The honest answer is that installation cost is built from four variables, not pulled from a price list.",
      "Capacity drives the equipment price: a 12,000 BTU bedroom unit and a 24,000 BTU office cassette are different animals. Pipe run length is the second lever. Refrigerant pipework, insulation and cabling are priced per metre, so a unit mounted back-to-back with its outdoor unit costs meaningfully less to install than one 15 metres away.",
      "Wall type matters more than people expect: coring through stone masonry takes different tools and time than a drywall partition. And access can be the biggest swing of all: a ground floor job is a different world from a fourth-floor outdoor unit that needs certified riggers.",
      "The takeaway: distrust any installation price quoted before a site survey. A serious contractor surveys first, then quotes a number that won't grow on invoice day.",
    ],
  },
  {
    slug: "inverter-vs-fixed-speed",
    title: "Inverter vs fixed-speed AC: what the power bill says",
    category: "Energy Saving",
    date: "July 2026",
    readTime: "5 min read",
    excerpt:
      "Inverter units cost more upfront and less every month after. We walk through the arithmetic that tells you when the premium pays for itself, usually sooner than you'd think.",
    body: [
      "A fixed-speed compressor has two settings: flat out, and off. It cools by sprinting and resting, and every restart draws a surge of current. An inverter compressor varies its speed continuously, cruising at exactly the output the room needs.",
      "In practice, for a unit that runs several hours a day, inverter technology typically trims 30–50% off the cooling portion of your power bill. Against a purchase premium of perhaps 15–25%, the payback period for a daily-use unit in Kenya commonly lands between one and two years.",
      "Where fixed-speed still makes sense is rooms cooled rarely. A guest room used a few weekends a year doesn't run long enough to repay the premium.",
      "Rule of thumb: if it runs daily, buy inverter. If it runs monthly, save the capital.",
    ],
  },
  {
    slug: "why-ac-not-cooling",
    title: "Five reasons your AC runs but doesn't cool",
    category: "Maintenance",
    date: "June 2026",
    readTime: "4 min read",
    excerpt:
      "Before you call anyone, check these five things. Two of them you can fix yourself in ten minutes, and the other three you'll be able to describe precisely on the phone.",
    body: [
      "First, the filters. A clogged filter suffocates airflow. The coil freezes, and the unit blows air that feels weak and barely cool. Wash the filters, run the unit fan-only for an hour, and you may be done.",
      "Second, the outdoor unit. If its coil is caked in dust or its airflow is blocked by stored boxes, heat has nowhere to go. Clear a half-metre around it.",
      "Third, refrigerant leaks, the most common professional-level fault. Symptoms: ice on the small copper pipe, hissing, cooling that faded gradually over weeks. This needs a technician with a leak detector, not just a top-up.",
      "Fourth, a failing capacitor or compressor valve: the unit hums, the fan spins, but the compressor never actually kicks in. Fifth, thermostat or sensor faults reading the room wrong.",
      "Anything past the first two: log the symptoms and call a professional. Describing 'ice on the small pipe, faded over three weeks' gets you a faster, cheaper diagnosis than 'it's not working'.",
    ],
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);
export default posts;
