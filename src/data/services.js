// Services: one dedicated page each, per the WRS.
// Each record drives: card, detail page (overview, benefits, process, FAQs).
const services = [
  {
    slug: "air-conditioning-installation",
    name: "Air Conditioning Installation",
    plate: { scope: "Residential to Commercial", lead: "Survey to commissioning", cover: "All major brands" },
    icon: "snowflake",
    summary:
      "We supply and install split, cassette, ducted and floor-standing units. Every job starts with a proper site survey so the unit we fit is actually the right size for your room, and it goes in the way the manufacturer says it should.",
    overview:
      "Get the sizing wrong on an AC unit and you'll feel it for years. Too small and it runs flat out without ever really cooling the room. Too big and it cools fast but never pulls the humidity out, so the room feels clammy even at the right temperature. That's why we don't quote off a phone call. Someone comes to measure the room, check where the sun hits, and see what else is generating heat in there, and the unit we recommend comes from that. Installation follows the manufacturer's spec properly: a real vacuum before the gas goes in, brazed joints that get pressure tested, condensate lines that actually slope so they drain, and wiring done properly rather than just made to work. When we're done you get a written commissioning report showing what the unit is actually achieving, not just a remote that turns it on.",
    benefits: [
      "Sizing based on an actual site survey, not a guess over the phone",
      "Installed to the manufacturer's spec so your warranty stays valid",
      "Tidy pipework and cable runs, because it's your wall, not ours",
      "A written report showing measured performance after commissioning",
      "We walk you through the unit before we leave",
    ],
    process: [
      { step: "Site survey", detail: "We measure the room, check the sun and heat sources, and agree the mounting position with you." },
      { step: "Quotation", detail: "One itemised quote covering equipment, materials and labour. What you see is what you pay." },
      { step: "Installation", detail: "A single split usually takes half a day. We cover the floors and clean up before we go." },
      { step: "Commissioning", detail: "Vacuum, gas charge, test run and a measured performance report, plus your warranty paperwork." },
    ],
    faqs: [
      { q: "How long does a split AC installation take?", a: "Most single splits are done in half a day. Multi-splits and concealed units with more ducting can run one to three days depending on access." },
      { q: "Do you supply the unit or can I buy my own?", a: "Either. We supply genuine equipment through authorised channels, or we'll install a unit you've already bought after checking it's actually the right size." },
      { q: "Will installation affect my manufacturer warranty?", a: "It protects it, if anything. Most brands require a qualified installer for the warranty to hold, and we give you the paperwork to prove it." },
    ],
  },
  {
    slug: "hvac-design",
    name: "HVAC Design and Engineering",
    plate: { scope: "New builds and retrofits", lead: "Load calcs to drawings", cover: "Consultant-ready" },
    icon: "ruler",
    summary:
      "Heat load calculations, equipment selection, duct and pipe sizing, and drawings your contractor can actually price from. We work directly with architects, developers and MEP contractors.",
    overview:
      "The best time to think about HVAC is before the walls go up, not after. We work alongside architects, quantity surveyors and MEP contractors to produce designs that hold up on site: proper cooling load calculations, equipment schedules with models you can actually buy in Kenya, duct and pipe sizing, and drawings coordinated with the structural and electrical work so nobody's fighting for the same ceiling void. For retrofits it starts with a survey of what's actually there, because what's on the original drawings and what's behind the ceiling tiles are rarely the same thing.",
    benefits: [
      "Load calculations done to recognised engineering standards",
      "Equipment schedules built around models with real local support",
      "Drawings coordinated with structural and electrical, not drawn in isolation",
      "Value engineering that trims cost without gutting performance",
      "We stay involved through tender, construction and commissioning",
    ],
    process: [
      { step: "Brief and survey", detail: "We sit with your team, go through the drawings, and survey the existing building where it matters." },
      { step: "Load calculation", detail: "Room by room cooling and ventilation loads based on the actual building, not rules of thumb." },
      { step: "Design and drawings", detail: "Equipment selection and a distribution layout your contractor can price and build from." },
      { step: "Construction support", detail: "We answer contractor queries, inspect the install, and witness commissioning." },
    ],
    faqs: [
      { q: "Can you review a design another firm produced?", a: "Yes, that's a common request. We'll flag anything oversized, anything hard to build, and anything that's going to cost more to run than it needs to." },
      { q: "Do you design for cold rooms and server rooms?", a: "Yes. Both need redundancy thinking built in from the start, which is where a lot of designs fall short." },
    ],
  },
  {
    slug: "mechanical-ventilation",
    name: "Mechanical Ventilation",
    plate: { scope: "Kitchens to factories", lead: "Airflow engineered", cover: "Supply and extract" },
    icon: "fan",
    summary:
      "Kitchen extract, fresh air supply, warehouse and factory ventilation, dust extraction and air curtains. We size the airflow properly and balance the system so air actually goes where it's supposed to.",
    overview:
      "Ventilation is the one that nobody thinks about until it's not working, and then it's the only thing anyone's thinking about. We handle mechanical ventilation for commercial kitchens, basements, warehouses, factories and parking structures. The fans get sized from actual air change requirements rather than a rule of thumb, the ductwork gets balanced so measured airflow at the grilles matches the drawing, and the controls don't run everything at full tilt in a room nobody's using.",
    benefits: [
      "Air changes worked out from real occupancy and use, not guesswork",
      "Systems balanced and measured at every grille before we sign off",
      "Kitchen extract with grease management that passes inspection",
      "EC fans and demand controls that don't waste power on empty rooms",
      "Noise is designed in from the start, not patched afterward",
    ],
    process: [
      { step: "Assessment", detail: "We work out what air change rate the space actually needs and look at how to route it." },
      { step: "Design", detail: "Fan selection, duct sizing, grille layout, and how the controls should behave." },
      { step: "Installation", detail: "Ducting, fans, grilles and controls fitted with as little disruption as we can manage." },
      { step: "Balancing", detail: "We measure airflow at every terminal and hand you a report with the numbers." },
    ],
    faqs: [
      { q: "My restaurant kitchen fills with smoke, can you fix it?", a: "Almost always yes. It's usually undersized extract, blocked filters, or no make-up air coming in to replace what's leaving. We measure the airflow before proposing anything, so you're not paying to guess." },
      { q: "Do you handle dust extraction for workshops?", a: "Yes, including filtration and getting the discharge sorted so it's actually compliant." },
    ],
  },
  {
    slug: "preventive-maintenance",
    name: "Preventive Maintenance",
    plate: { scope: "Scheduled visits", lead: "Checklist driven", cover: "All systems" },
    icon: "clipboard",
    summary:
      "Regular servicing that keeps systems running efficiently and warranties valid. Filters, coils, refrigerant checks, electrical inspection, and a written report after every visit.",
    overview:
      "A neglected AC unit gets a little worse every month, and the compressor pays for it before you do. Dirty coils make it work harder to move the same amount of heat, which shows up on your power bill long before it shows up as a breakdown. Our maintenance visits follow a written checklist every time: filters and coils cleaned, refrigerant pressure checked, condensate drains cleared, electrical connections inspected and tightened, controls tested. You get a condition report after every visit, so you're seeing problems while they're still cheap to fix.",
    benefits: [
      "Lower power bills, because clean systems don't have to work as hard",
      "Fewer breakdowns, and rarely in the week you can least afford one",
      "Keeps you inside your manufacturer's warranty conditions",
      "A written condition report after every single visit",
      "Priority call-out if you're on a maintenance contract",
    ],
    process: [
      { step: "System audit", detail: "The first visit is about documenting everything you have: model, serial number, condition, location." },
      { step: "Schedule", detail: "We agree a service calendar that fits around your operations, weekends and nights included if that's what suits you." },
      { step: "Service visits", detail: "Checklist-driven, photographed, and reported after every visit." },
      { step: "Review", detail: "We periodically review system condition and give you honest recommendations and rough budget numbers." },
    ],
    faqs: [
      { q: "How often should AC units be serviced?", a: "For most commercial spaces in Kenya, every three to four months. Dusty environments and kitchens usually need more frequent visits, and we'll tell you what makes sense after the audit." },
      { q: "Can you maintain systems you didn't install?", a: "Yes, most of what we maintain was installed by someone else. The first audit visit brings it into our system regardless of who fitted it." },
    ],
  },
  {
    slug: "emergency-repairs",
    name: "Repairs and Emergency Response",
    plate: { scope: "Diagnose then repair", lead: "Genuine parts", cover: "Fast response" },
    icon: "bolt",
    summary:
      "We diagnose faults on all major brands using actual instruments, not guesswork, and give you a fixed quote before touching a spanner. Genuine parts, work warranted in writing.",
    overview:
      "When cooling stops, some situations can wait and some can't. A server room has minutes; a restaurant on a Friday night has maybe a couple of hours before it's a real problem. Our repair techs diagnose with actual test equipment: gauges on the pressures, meters on the electricals, detectors tracing leaks. You get told what's actually wrong in plain language and a fixed quote before any work starts. We carry the common parts on the van and source the rest through authorised suppliers, so the fix actually holds rather than needing a second visit.",
    benefits: [
      "Diagnosis with real instruments, so you know what actually failed",
      "A fixed quote before we start, not a surprise on the invoice",
      "Genuine parts through authorised suppliers",
      "Repairs backed in writing",
      "Faster response if you're already on a maintenance contract",
    ],
    process: [
      { step: "Call logged", detail: "Tell us what's happening. We triage how urgent it is and dispatch accordingly." },
      { step: "Diagnosis", detail: "On-site testing to find the actual fault, explained to you without the jargon." },
      { step: "Quote and repair", detail: "You approve a fixed quote, then we fix it with genuine parts." },
      { step: "Test and report", detail: "System run-tested, performance checked, and a report left with you." },
    ],
    faqs: [
      { q: "My AC is running but not cooling, what's wrong?", a: "Usually low refrigerant from a leak, dirty coils, or a compressor valve on its way out. Diagnosis is normally under an hour." },
      { q: "Do you repair all brands?", a: "All the major ones: LG, Midea, Daikin, Carrier, Gree, Samsung, Panasonic, Toshiba and more." },
    ],
  },
  {
    slug: "commercial-hvac",
    name: "Commercial and Industrial HVAC",
    plate: { scope: "VRF to chillers", lead: "Multi-site capable", cover: "Design to service" },
    icon: "building",
    summary:
      "VRF systems, ducted plants and large installations for offices, hotels, hospitals, factories and data centres, delivered against a construction programme, not around it.",
    overview:
      "Commercial HVAC is a different job to a bedroom split. Bigger loads, longer pipe runs, building management systems to integrate with, and a construction programme that isn't going to wait for you to catch up. We deliver VRF and ducted systems for multi-floor offices, hotels and institutions, coordinating with the main contractor and consultants, hitting the milestone dates, and commissioning to the standard that a handover inspection actually expects.",
    benefits: [
      "VRF and VRV design and installation for multi-zone buildings",
      "Real coordination with main contractors and consultants, not just paperwork",
      "We hit programme milestones and flag delays early rather than late",
      "Commissioning documentation ready for handover, not chased for weeks after",
      "We stay on for the long-term maintenance once the project's done",
    ],
    process: [
      { step: "Tender or brief", detail: "We price from your drawings, or design from your brief if there isn't one yet." },
      { step: "Programme", detail: "Installation sequenced into the construction programme alongside the other trades." },
      { step: "Installation", detail: "Pipework, units and controls installed and inspected in stages, not all at the end." },
      { step: "Commissioning", detail: "Full system commissioning with the documentation handover expects." },
    ],
    faqs: [
      { q: "What size projects do you take on?", a: "Anything from a single office floor to a multi-building campus. For very large plants we bring in the equipment manufacturer on selection and commissioning." },
      { q: "Can you integrate with a building management system?", a: "Yes. Modern VRF systems have standard interfaces for it, and we coordinate that integration with your BMS contractor directly." },
    ],
  },
  {
    slug: "annual-maintenance-contracts",
    name: "Annual Maintenance Contracts",
    plate: { scope: "12-month cover", lead: "Fixed annual cost", cover: "Priority response" },
    icon: "calendar",
    summary:
      "One fixed annual price for scheduled servicing, priority call-outs, and a full maintenance history on record. This is how facility managers keep HVAC off their weekly problem list.",
    overview:
      "An annual maintenance contract turns HVAC from a string of emergencies into a single line item. Visits happen on schedule without you having to chase anyone, response is faster when something does go wrong, repair rates are discounted, and you get a documented history on every unit you own. Facility managers like it because the budget stops surprising them, and finance likes it because it's one purchase order covering the whole year instead of a dozen ad-hoc invoices.",
    benefits: [
      "One fixed cost for the year, agreed once and budgeted once",
      "Scheduled visits that just happen, without anyone chasing them",
      "Priority response when something breaks, including outside hours",
      "Discounted rates on repairs and parts",
      "A complete asset register and service history for every unit",
    ],
    process: [
      { step: "Asset audit", detail: "Every unit gets documented properly. This is the foundation the whole contract sits on." },
      { step: "Contract and schedule", detail: "Visit frequency, response times and rates all agreed in writing upfront." },
      { step: "Service delivery", detail: "Scheduled visits, a report after each one, and a single point of contact throughout." },
      { step: "Annual review", detail: "We talk through condition trends, likely replacements, and renewal terms." },
    ],
    faqs: [
      { q: "What response time do AMC clients get?", a: "Priority dispatch, usually same-day in Nairobi and next-day in other service areas. Critical-cooling clauses are available if you're running a server room." },
      { q: "Can one contract cover multiple sites?", a: "Yes, that's actually one of the things we do best: a single schedule and consolidated reporting across all your sites." },
    ],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
export default services;
