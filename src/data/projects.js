// Completed projects — case-study data for the Projects page & homepage.
const projects = [
  {
    slug: "westlands-office-vrf",
    name: "Six-Floor Office VRF Retrofit",
    sector: "Commercial",
    location: "Westlands, Nairobi",
    year: "2026",
    equipment: "LG Multi V VRF · 42 indoor units",
    summary:
      "Replaced ageing split units across six floors with a zoned VRF system — installed floor by floor over weekends, so the client never lost a working day. Measured energy use dropped by roughly a third.",
  },
  {
    slug: "industrial-kitchen-extract",
    name: "Hotel Kitchen Extract Rebuild",
    sector: "Hospitality",
    location: "Upper Hill, Nairobi",
    year: "2025",
    equipment: "Extract hoods · make-up air · EC fans",
    summary:
      "A busy hotel kitchen that smoked out its own pass. We rebuilt the extract with properly sized hoods and make-up air; the kitchen now holds negative pressure and the lobby smells like a lobby.",
  },
  {
    slug: "server-room-precision",
    name: "Server Room Precision Cooling",
    sector: "Commercial",
    location: "Kilimani, Nairobi",
    year: "2025",
    equipment: "Redundant precision units · monitoring",
    summary:
      "N+1 precision cooling for a fintech server room with alarmed temperature monitoring. Commissioned with failover testing witnessed by the client's IT lead — one unit off, room holds.",
  },
  {
    slug: "hospital-ward-ventilation",
    name: "Clinic Ward Ventilation Upgrade",
    sector: "Healthcare",
    location: "Thika, Kiambu",
    year: "2025",
    equipment: "Fresh-air handling · filtration",
    summary:
      "Air-change upgrade across ward and treatment areas to healthcare ventilation requirements, delivered in phases around a live clinic without a single suspended service day.",
  },
  {
    slug: "residential-apartments-splits",
    name: "48-Unit Apartment Cooling Package",
    sector: "Residential",
    location: "Kilimani, Nairobi",
    year: "2024",
    equipment: "Inverter splits · concealed piping",
    summary:
      "Developer package for a new apartment block: concealed refrigerant piping installed at construction stage, inverter splits fitted and commissioned at finishing — clean walls, no trunking.",
  },
  {
    slug: "warehouse-ventilation-mombasa",
    name: "Warehouse Ventilation, Coast Region",
    sector: "Industrial",
    location: "Mombasa",
    year: "2024",
    equipment: "Roof extract · destratification fans",
    summary:
      "High-volume ventilation with destratification for a logistics warehouse in coastal heat — corrosion-resistant equipment specified for the marine environment.",
  },
];

export const projectSectors = ["All", "Commercial", "Hospitality", "Healthcare", "Residential", "Industrial"];
export default projects;
