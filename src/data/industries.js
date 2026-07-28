// Solutions / Industries Served — one page per sector, per the WRS.
const industries = [
  {
    slug: "residential",
    name: "Residential",
    icon: "home",
    tag: "Homes & apartments",
    challenge:
      "Homes need quiet, efficient cooling that doesn't dominate the power bill — and installation crews who respect the fact that people live there.",
    approach: [
      "Split and multi-split systems sized room by room",
      "Inverter units specified for low running cost",
      "Neat installation — concealed pipe runs where possible",
      "Servicing scheduled around your household, not ours",
    ],
  },
  {
    slug: "commercial-offices",
    name: "Commercial Offices",
    icon: "building",
    tag: "Workspaces & towers",
    challenge:
      "Offices fight uneven temperatures — the corner office freezes while the open plan bakes. Zoning and control are the whole game.",
    approach: [
      "VRF systems with independent zone control",
      "Ceiling cassettes and concealed units for clean interiors",
      "Fresh-air supply that keeps afternoon meetings awake",
      "After-hours servicing so business hours stay business hours",
    ],
  },
  {
    slug: "hospitals",
    name: "Hospitals & Clinics",
    icon: "cross",
    tag: "Healthcare facilities",
    challenge:
      "Healthcare HVAC carries real stakes: infection control, air-change compliance, and zero tolerance for downtime in critical areas.",
    approach: [
      "Air-change rates designed to healthcare requirements",
      "Filtration specified per area classification",
      "Redundancy planning for theatres and critical care",
      "Maintenance with documented, auditable records",
    ],
  },
  {
    slug: "hotels",
    name: "Hotels & Hospitality",
    icon: "bed",
    tag: "Guest comfort, quietly",
    challenge:
      "A noisy AC unit becomes a bad review by morning. Hotels need silent guest-room comfort and kitchens that don't perfume the lobby.",
    approach: [
      "Low-noise units selected for guest rooms",
      "Individual room control with energy-saving occupancy logic",
      "Kitchen extract that keeps smells out of front-of-house",
      "Night-shift servicing invisible to guests",
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    icon: "flame",
    tag: "Kitchens & dining",
    challenge:
      "The kitchen produces astonishing heat and grease-laden air; the dining room must stay cool and calm. Two climates, one roof.",
    approach: [
      "Kitchen extract hoods with proper grease management",
      "Make-up air so extract fans aren't fighting the building",
      "Dining-area cooling balanced for comfort at capacity",
      "Filter and duct cleaning schedules that satisfy inspectors",
    ],
  },
  {
    slug: "schools",
    name: "Schools & Universities",
    icon: "book",
    tag: "Learning environments",
    challenge:
      "Stuffy classrooms put students to sleep. Institutions need healthy air across many rooms on budgets that answer to committees.",
    approach: [
      "Ventilation-first designs that cut cooling cost",
      "Robust, low-maintenance equipment selections",
      "Phased installation aligned to term calendars",
      "Multi-year maintenance contracts with fixed pricing",
    ],
  },
  {
    slug: "factories",
    name: "Factories & Industrial",
    icon: "factory",
    tag: "Production facilities",
    challenge:
      "Process heat, dust, fumes and big open volumes — industrial ventilation is about worker safety and process stability, not comfort alone.",
    approach: [
      "General and spot ventilation engineered from heat loads",
      "Dust and fume extraction at source",
      "Process cooling for temperature-sensitive production",
      "Heat-recovery options where exhaust air has value",
    ],
  },
  {
    slug: "warehouses",
    name: "Warehouses & Logistics",
    icon: "box",
    tag: "Storage at scale",
    challenge:
      "Large volumes, tall racking, and goods that mind the temperature. Warehouses need airflow strategies, not just bigger fans.",
    approach: [
      "High-volume ventilation with destratification",
      "Targeted cooling for temperature-sensitive zones",
      "Air curtains at loading doors to hold conditions",
      "Energy monitoring so the roof isn't cooling the sky",
    ],
  },
  {
    slug: "data-centres",
    name: "Data Centres & Server Rooms",
    icon: "server",
    tag: "Critical cooling",
    challenge:
      "Servers fail in minutes without cooling. This is precision territory: redundancy, monitoring, and response times written into contracts.",
    approach: [
      "Precision cooling sized to IT load with headroom",
      "N+1 redundancy so one failure is an alert, not an outage",
      "Temperature monitoring with alarmed thresholds",
      "Critical-response maintenance clauses in writing",
    ],
  },
];

export const getIndustry = (slug) => industries.find((i) => i.slug === slug);
export default industries;
