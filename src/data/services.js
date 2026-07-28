// Services — one dedicated page each, per the WRS.
// Each record drives: card, detail page (overview, benefits, process, FAQs).
const services = [
  {
    slug: "air-conditioning-installation",
    name: "Air Conditioning Installation",
    plate: { scope: "Residential – Commercial", lead: "Survey to commissioning", cover: "All major brands" },
    icon: "snowflake",
    summary:
      "Supply and installation of split, cassette, ducted and floor-standing systems — sized from an actual heat-load survey of your space, installed to manufacturer spec, and commissioned with a written report.",
    overview:
      "An air conditioner is only as good as its installation. Undersized units run flat out and die young; oversized ones short-cycle and never dehumidify. We start every installation with a site survey — room dimensions, glazing, occupancy, equipment heat — and size the system from the numbers. Installation follows manufacturer specification to the letter: proper vacuum before charging, pressure-tested braze joints, sloped condensate drainage, and clean electrical terminations. You receive a commissioning report with measured performance, not just a working remote.",
    benefits: [
      "Correct sizing from a real heat-load calculation, not a guess",
      "Manufacturer-spec installation that keeps your warranty valid",
      "Neat pipework and trunking — we treat your walls like our own",
      "Written commissioning report with measured supply temperatures",
      "Post-installation walkthrough so you know your system",
    ],
    process: [
      { step: "Site survey", detail: "We measure the space, note heat sources and pick mounting positions with you." },
      { step: "Quotation", detail: "Itemised quote — equipment, materials, labour. No surprises at invoice time." },
      { step: "Installation", detail: "Typically one day for a split system. We protect your floors and clean up after." },
      { step: "Commissioning", detail: "Vacuum, charge, test run, measured performance, and your warranty documents." },
    ],
    faqs: [
      { q: "How long does a split AC installation take?", a: "Most single-split installations are completed in 4–8 hours. Multi-splits and concealed units can take 1–3 days depending on ducting and access." },
      { q: "Do you supply the unit or can I buy my own?", a: "Both. We supply genuine equipment from authorised channels, but we're happy to install a unit you've purchased — we'll verify it's correctly sized first." },
      { q: "Will installation affect my manufacturer warranty?", a: "It protects it. Most brands require installation by a qualified contractor for the warranty to hold. We provide the documentation." },
    ],
  },
  {
    slug: "hvac-design",
    name: "HVAC Design & Engineering",
    plate: { scope: "New builds – Retrofits", lead: "Load calcs to drawings", cover: "Consultant-ready" },
    icon: "ruler",
    summary:
      "Heat-load calculations, equipment selection, duct and pipe sizing, and coordinated drawings for architects, developers and MEP contractors — designs that pass review and work on day one.",
    overview:
      "Good HVAC design happens before the first wall goes up. We work with architects, quantity surveyors and MEP contractors to produce designs that are buildable, efficient and compliant: cooling-load calculations to recognised standards, equipment schedules, duct and refrigerant pipe sizing, and drawings your contractor can actually price from. For retrofits, we survey what exists before we draw what should — because the ceiling void always has an opinion.",
    benefits: [
      "Load calculations to recognised engineering standards",
      "Equipment schedules with genuine, locally-supported models",
      "Drawings coordinated with structural and electrical services",
      "Value engineering that cuts cost without cutting performance",
      "Support through tender, construction and commissioning",
    ],
    process: [
      { step: "Brief & survey", detail: "We sit with your team, review drawings, and survey existing conditions where relevant." },
      { step: "Load calculation", detail: "Room-by-room cooling and ventilation loads from the actual building data." },
      { step: "Design & drawings", detail: "Equipment selection, distribution layout, and coordinated drawings for pricing." },
      { step: "Construction support", detail: "Responses to contractor queries, inspections, and commissioning witness." },
    ],
    faqs: [
      { q: "Can you review a design another firm produced?", a: "Yes — design review and value engineering are common requests. We'll flag oversizing, buildability issues and running-cost traps." },
      { q: "Do you design for cold rooms and server rooms?", a: "Yes. Process cooling, server-room precision cooling and cold rooms are within scope — these need redundancy planning, which we build in." },
    ],
  },
  {
    slug: "mechanical-ventilation",
    name: "Mechanical Ventilation",
    plate: { scope: "Kitchens – Factories", lead: "Airflow engineered", cover: "Supply & extract" },
    icon: "fan",
    summary:
      "Kitchen extract, fresh-air supply, warehouse and factory ventilation, dust extraction and air curtains — engineered airflow that keeps buildings healthy and workplaces compliant.",
    overview:
      "Ventilation is the part of building services nobody notices until it fails — then everybody notices. We design and install mechanical ventilation for commercial kitchens, basements, warehouses, factories and parking structures: extract fans sized from air-change requirements, ducting balanced so air actually goes where the drawing says, and controls that don't run fans at full speed for empty rooms.",
    benefits: [
      "Air-change rates calculated to occupancy and use, not rules of thumb",
      "Balanced systems — measured airflow at every grille",
      "Kitchen extract with grease management that passes inspection",
      "Energy-efficient EC fans and demand-based controls",
      "Noise control designed in, not apologised for later",
    ],
    process: [
      { step: "Assessment", detail: "We establish the required air changes and survey routing options." },
      { step: "Design", detail: "Fan selection, duct sizing, grille schedule and controls philosophy." },
      { step: "Installation", detail: "Ducting, fans, grilles and controls installed with minimal disruption." },
      { step: "Balancing", detail: "Airflow measured and balanced at every terminal; report issued." },
    ],
    faqs: [
      { q: "My restaurant kitchen fills with smoke — can you fix it?", a: "Almost certainly. It's usually undersized extract, blocked filters, or missing make-up air. We diagnose with airflow measurements before proposing anything." },
      { q: "Do you handle dust extraction for workshops?", a: "Yes — dust and fume extraction for workshops and factories, including filtration and safe discharge." },
    ],
  },
  {
    slug: "preventive-maintenance",
    name: "Preventive Maintenance",
    plate: { scope: "Scheduled visits", lead: "Checklist-driven", cover: "All systems" },
    icon: "clipboard",
    summary:
      "Scheduled servicing that keeps systems efficient, warranties valid and breakdowns rare — filters, coils, refrigerant checks, electrical inspection, and a written condition report every visit.",
    overview:
      "A neglected AC unit loses efficiency every month — dirty coils make the compressor work harder, which raises your power bill first and kills the compressor second. Our preventive maintenance follows a written checklist: filters and coils cleaned, refrigerant pressures verified, condensate drains cleared, electrical connections inspected and torqued, controls tested. Every visit ends with a condition report so you see problems while they're still cheap.",
    benefits: [
      "Lower running costs — clean systems draw less power",
      "Fewer breakdowns, and never in the worst week for it",
      "Manufacturer warranty conditions maintained",
      "Written condition report after every visit",
      "Priority call-out response for maintenance clients",
    ],
    process: [
      { step: "System audit", detail: "First visit documents every unit — model, serial, condition, location." },
      { step: "Schedule", detail: "Service calendar agreed around your operations — nights and weekends included." },
      { step: "Service visits", detail: "Checklist-driven servicing, photographed and reported." },
      { step: "Review", detail: "Periodic review of system condition and recommendations, with budget forecasts." },
    ],
    faqs: [
      { q: "How often should AC units be serviced?", a: "For most commercial spaces in Kenya, every 3–4 months. Dusty environments and kitchens need more frequent attention; we'll recommend a schedule from your audit." },
      { q: "Can you maintain systems you didn't install?", a: "Yes. Most of our maintenance portfolio is systems installed by others. The audit visit brings everything into our system regardless of origin." },
    ],
  },
  {
    slug: "emergency-repairs",
    name: "Repairs & Emergency Response",
    plate: { scope: "Diagnose – Repair", lead: "Genuine parts", cover: "Rapid response" },
    icon: "bolt",
    summary:
      "Fault diagnosis and repair for all major brands — gas leaks, compressor failures, control faults, water leaks — with genuine parts and a clear quote before any work begins.",
    overview:
      "When cooling fails, the clock matters — a server room has minutes, a restaurant has hours. Our repair teams diagnose with instruments, not guesswork: pressures measured, electricals tested, leaks traced with detectors. You get a clear diagnosis and a fixed quote before we touch a spanner. We carry common parts on the van and source the rest through authorised channels, so the repair holds.",
    benefits: [
      "Instrument-based diagnosis — you're told what actually failed",
      "Fixed quote before repair work begins",
      "Genuine parts through authorised channels",
      "Repairs warranted in writing",
      "Priority response for maintenance-contract clients",
    ],
    process: [
      { step: "Call logged", detail: "Describe the fault; we triage severity and dispatch." },
      { step: "Diagnosis", detail: "On-site testing pins the fault; findings explained in plain language." },
      { step: "Quote & repair", detail: "Fixed quote approved by you, then repair with genuine parts." },
      { step: "Test & report", detail: "System run-tested, performance verified, report issued." },
    ],
    faqs: [
      { q: "My AC is running but not cooling — what's wrong?", a: "The usual suspects are low refrigerant (a leak), dirty coils, or a failing compressor valve. Diagnosis takes under an hour in most cases." },
      { q: "Do you repair all brands?", a: "All major brands — LG, Midea, Daikin, Carrier, Gree, Samsung, Panasonic, Toshiba and more." },
    ],
  },
  {
    slug: "commercial-hvac",
    name: "Commercial & Industrial HVAC",
    plate: { scope: "VRF – Chillers", lead: "Multi-site capable", cover: "Design to service" },
    icon: "building",
    summary:
      "VRF/VRV systems, ducted plants, process cooling and large-scale installations for offices, hotels, hospitals, factories and data centres — delivered on programme, alongside other trades.",
    overview:
      "Commercial HVAC is a different discipline: bigger loads, longer pipe runs, building-management integration, and a construction programme that doesn't wait. We deliver VRF and ducted systems for multi-floor offices, hotels and institutions — working alongside main contractors and MEP consultants, hitting milestone dates, and commissioning to the standard that handover inspections demand.",
    benefits: [
      "VRF/VRV design and installation for multi-zone buildings",
      "Coordination with main contractors and consultants",
      "Programme discipline — milestones hit, delays flagged early",
      "Commissioning documentation ready for handover",
      "Long-term maintenance continuity after practical completion",
    ],
    process: [
      { step: "Tender / brief", detail: "We price from your drawings or design from your brief." },
      { step: "Programme", detail: "Installation sequenced with the construction programme and other trades." },
      { step: "Installation", detail: "Pipework, units and controls installed and inspected in stages." },
      { step: "Commissioning", detail: "Full system commissioning with documentation for handover." },
    ],
    faqs: [
      { q: "What size projects do you take on?", a: "From a single office floor to multi-building campuses. For very large plants we partner with equipment manufacturers on selection and commissioning." },
      { q: "Can you integrate with a building management system?", a: "Yes — modern VRF systems expose standard interfaces, and we coordinate integration with your BMS contractor." },
    ],
  },
  {
    slug: "annual-maintenance-contracts",
    name: "Annual Maintenance Contracts",
    plate: { scope: "12-month cover", lead: "Fixed annual cost", cover: "Priority response" },
    icon: "calendar",
    summary:
      "A fixed annual price for scheduled servicing, priority call-outs and a documented maintenance history — the way facility managers keep HVAC off their problem list.",
    overview:
      "An AMC turns HVAC from a series of emergencies into a line item: scheduled visits at agreed intervals, priority response when something does fail, discounted repair rates, and a documented history for every unit you own. Facility managers like AMCs because budgets stop surprising them; finance likes them because one PO covers the year.",
    benefits: [
      "Fixed annual cost — budget once, covered all year",
      "Scheduled visits that happen without chasing",
      "Priority emergency response, including out of hours",
      "Discounted rates on repairs and parts",
      "Complete asset register and service history",
    ],
    process: [
      { step: "Asset audit", detail: "Every unit documented — the foundation of the contract." },
      { step: "Contract & schedule", detail: "Visit frequency, response times and rates agreed in writing." },
      { step: "Service delivery", detail: "Scheduled visits, reports after each, one point of contact." },
      { step: "Annual review", detail: "Condition trends, replacement forecasts and renewal terms." },
    ],
    faqs: [
      { q: "What response time do AMC clients get?", a: "Contract clients get priority dispatch — typically same-day in Nairobi, next-day in other service areas, with critical-cooling clauses available for server rooms." },
      { q: "Can one contract cover multiple sites?", a: "Yes — multi-site contracts with a single schedule and consolidated reporting are our specialty." },
    ],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
export default services;
