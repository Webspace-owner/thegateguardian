import {
  Cable,
  HardHat,
  ShieldCheck,
  Server,
  Sparkles,
  Video,
  UtensilsCrossed,
  Code2,
  type LucideIcon,
} from "lucide-react";

export type Solution = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  highlights: { title: string; body: string }[];
  capabilities: string[];
};

export const solutions: Solution[] = [
  {
    slug: "low-current-systems",
    title: "Low Current Systems",
    tagline: "The nervous system of every modern facility.",
    description:
      "We design, supply, install, and commission integrated low current systems that connect, protect, and automate buildings of every scale — from commercial towers and hospitals to industrial plants and government complexes.",
    icon: Cable,
    highlights: [
      { title: "Structured Cabling", body: "Copper and fiber backbones engineered to international standards (TIA/EIA, ISO/IEC) for long-term performance." },
      { title: "IPTV & Public Address", body: "Centralized broadcast, voice evacuation, and background music with zoned control." },
      { title: "Building Management (BMS)", body: "Unified control of HVAC, lighting, and energy — fully integrated with security and life-safety systems." },
      { title: "Access & Intercom", body: "Card, biometric, and video intercom platforms tied into a single management dashboard." },
    ],
    capabilities: [
      "Design & engineering (concept, schematic, IFC)",
      "Supply of certified active & passive equipment",
      "Installation, termination & commissioning",
      "System integration across multiple vendors",
      "SLA-backed maintenance and support",
    ],
  },
  {
    slug: "health-and-safety-hse",
    title: "Health and Safety (HSE)",
    tagline: "Protecting people, assets, and operations.",
    description:
      "Comprehensive HSE solutions covering fire detection, suppression, voice evacuation, and life-safety integration — designed to comply with NFPA, Civil Defence, and international standards.",
    icon: HardHat,
    highlights: [
      { title: "Fire Detection & Alarm", body: "Addressable and conventional fire alarm systems with full graphical monitoring." },
      { title: "Fire Suppression", body: "Gas, water mist, and pre-action systems for data centers, kitchens, and critical assets." },
      { title: "Voice Evacuation", body: "Intelligent EVC systems for safe, instruction-led evacuation in emergencies." },
      { title: "Gas & Leak Detection", body: "Detection of toxic, combustible, and refrigerant gases with automated response." },
    ],
    capabilities: [
      "Civil Defence approval & submission support",
      "Risk and hazard assessment",
      "Detailed engineering & shop drawings",
      "Installation, T&C, and handover",
      "Annual inspection & preventive maintenance",
    ],
  },
  {
    slug: "security",
    title: "Security",
    tagline: "Layered protection, end-to-end visibility.",
    description:
      "Physical and electronic security solutions that protect your premises, your people, and your information — combining best-in-class hardware with intelligent analytics and 24/7 monitoring.",
    icon: ShieldCheck,
    highlights: [
      { title: "CCTV & Video Analytics", body: "HD/4K IP surveillance with AI-driven detection, license plate recognition, and intrusion analytics." },
      { title: "Access Control", body: "Card, PIN, and biometric access with anti-passback, mantrap, and visitor management." },
      { title: "Intrusion & Perimeter", body: "Intrusion alarms, fence detection, and turnstile/barrier integration." },
      { title: "Command & Control (PSIM)", body: "Unified security operations dashboards correlating events across every subsystem." },
    ],
    capabilities: [
      "Security risk assessment",
      "System design & integration",
      "Project execution & commissioning",
      "Operator training",
      "Managed security services",
    ],
  },
  {
    slug: "data-center",
    title: "Data Center",
    tagline: "Mission-critical infrastructure, built to last.",
    description:
      "Turnkey data center solutions — from micro edge rooms to enterprise white spaces — engineered for uptime, efficiency, and scalability in alignment with Uptime Institute and TIA-942 standards.",
    icon: Server,
    highlights: [
      { title: "White Space & Racks", body: "Hot/cold aisle containment, intelligent PDUs, and high-density rack solutions." },
      { title: "Precision Cooling", body: "CRAC/CRAH, in-row, and liquid cooling tuned for energy efficiency." },
      { title: "Power & UPS", body: "Modular UPS, generators, ATS, and full electrical distribution." },
      { title: "DCIM & Monitoring", body: "Real-time visibility on power, cooling, capacity, and environmental conditions." },
    ],
    capabilities: [
      "Site assessment & capacity planning",
      "MEP & IT infrastructure design",
      "Build, fit-out, and migration",
      "Tier-aligned commissioning",
      "Operations & managed services",
    ],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    tagline: "Re-imagine how your business runs.",
    description:
      "We help organizations modernize legacy systems, unify data, and roll out cloud-native platforms — turning technology into a true engine of growth, agility, and customer experience.",
    icon: Sparkles,
    highlights: [
      { title: "Cloud Adoption", body: "Migration and cloud-native builds on AWS, Azure, and Google Cloud." },
      { title: "Data & Analytics", body: "Unified data platforms, BI dashboards, and AI-ready architectures." },
      { title: "Application Modernization", body: "Replace brittle legacy stacks with modular, API-first services." },
      { title: "Process Automation", body: "RPA, workflow orchestration, and intelligent document processing." },
    ],
    capabilities: [
      "Strategy & digital roadmap",
      "Enterprise architecture",
      "Cloud migration & FinOps",
      "DevOps & CI/CD enablement",
      "Change management & training",
    ],
  },
  {
    slug: "collaboration-and-multimedia",
    title: "Collaboration and Multimedia",
    tagline: "Where ideas meet, decisions happen.",
    description:
      "Modern meeting rooms, auditoriums, command centers, and digital signage — built around seamless audio, video, and conferencing experiences that just work.",
    icon: Video,
    highlights: [
      { title: "AV & Conferencing", body: "Microsoft Teams Rooms, Zoom Rooms, and Cisco/Poly video conferencing." },
      { title: "Auditoriums & Halls", body: "Line array audio, projection, LED walls, and stage lighting." },
      { title: "Digital Signage", body: "Centrally managed signage for retail, corporate, and wayfinding." },
      { title: "Command & Control Rooms", body: "Multi-source video walls, KVM, and operator workflows." },
    ],
    capabilities: [
      "Acoustic & AV design",
      "Equipment supply & integration",
      "Programming & user-experience design",
      "Installation & commissioning",
      "Lifecycle support & training",
    ],
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    tagline: "Technology that delights your guests.",
    description:
      "Specialized technology solutions for hotels, resorts, and serviced apartments — engineered to elevate guest experience while simplifying operations for staff.",
    icon: UtensilsCrossed,
    highlights: [
      { title: "Guest Room Automation", body: "Smart room controls for lighting, climate, drapes, and Do-Not-Disturb." },
      { title: "IPTV & In-Room Entertainment", body: "Hospitality IPTV, casting, and content management." },
      { title: "Property Wi-Fi & Network", body: "High-density guest Wi-Fi with secure VLAN segmentation." },
      { title: "PMS & POS Integration", body: "Integration with Opera, Protel, Micros, and leading hospitality platforms." },
    ],
    capabilities: [
      "Concept design & guest journey mapping",
      "Branded room control interfaces",
      "Pre-opening fit-out and commissioning",
      "Staff training & operations handover",
      "Ongoing managed services",
    ],
  },
  {
    slug: "software",
    title: "Software",
    tagline: "Custom software that fits your business.",
    description:
      "From web and mobile apps to enterprise platforms and integrations — we build the software your business needs, using modern stacks and a product-led delivery approach.",
    icon: Code2,
    highlights: [
      { title: "Web & Mobile Apps", body: "Responsive web apps and native/cross-platform mobile (iOS, Android)." },
      { title: "Enterprise Platforms", body: "ERP, CRM, and HRMS implementations and customizations." },
      { title: "Integration & APIs", body: "API-led integration across SaaS, legacy, and on-prem systems." },
      { title: "AI & Data Products", body: "Custom AI assistants, analytics dashboards, and intelligent automations." },
    ],
    capabilities: [
      "Product discovery & UX design",
      "Full-stack engineering",
      "QA & test automation",
      "DevOps & cloud hosting",
      "Support & continuous evolution",
    ],
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
