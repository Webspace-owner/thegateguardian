import { Sparkles, ShieldCheck, Cog, Gauge, type LucideIcon } from "lucide-react";

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
    slug: "digital-transformation",
    title: "Digital Transformation",
    tagline: "Modernize operations end-to-end.",
    description:
      "We help organizations re-imagine the way they work — modernizing legacy systems, unifying data, and rolling out cloud-native platforms that scale with the business.",
    icon: Sparkles,
    highlights: [
      { title: "Cloud Adoption", body: "Lift-and-shift, re-platforming, and cloud-native builds on AWS, Azure, and Google Cloud." },
      { title: "Data & Analytics", body: "Unified data platforms, BI dashboards, and AI-ready architectures." },
      { title: "Application Modernization", body: "Replace brittle legacy stacks with modular, API-first services." },
      { title: "Collaboration & Workplace", body: "Microsoft 365, unified comms, and digital workspace rollouts." },
    ],
    capabilities: [
      "Strategy & roadmap design",
      "Enterprise architecture",
      "Cloud migration & FinOps",
      "DevOps & CI/CD enablement",
      "Change management & training",
    ],
  },
  {
    slug: "security",
    title: "Security",
    tagline: "Defend every layer, every endpoint.",
    description:
      "Holistic cybersecurity — from network and perimeter to identity, endpoint, and application. We design, deploy, and operate the controls that keep your business resilient.",
    icon: ShieldCheck,
    highlights: [
      { title: "Network & Perimeter", body: "Next-gen firewalls, segmentation, and secure SD-WAN." },
      { title: "Identity & Access", body: "IAM, PAM, MFA, and Zero Trust access frameworks." },
      { title: "Threat Detection & Response", body: "SIEM, SOC operations, EDR/XDR, and incident response." },
      { title: "Governance & Compliance", body: "Risk assessments, policy design, ISO / NIST alignment." },
    ],
    capabilities: [
      "Security assessments & audits",
      "Architecture & design",
      "SOC build & co-managed services",
      "Vulnerability management",
      "Awareness training",
    ],
  },
  {
    slug: "automation",
    title: "Automation",
    tagline: "Replace repetitive work with intelligent flow.",
    description:
      "We automate the manual, error-prone work that slows teams down — from IT operations and infrastructure provisioning to business process and customer journeys.",
    icon: Cog,
    highlights: [
      { title: "Process Automation", body: "RPA and workflow orchestration across back-office systems." },
      { title: "Infrastructure Automation", body: "Infrastructure-as-Code, auto-scaling, and self-healing services." },
      { title: "AI & Intelligent Automation", body: "ML models and AI agents embedded into business workflows." },
      { title: "Customer Experience", body: "Omnichannel contact center, IVR, and conversational AI." },
    ],
    capabilities: [
      "Discovery & opportunity mapping",
      "RPA design & deployment",
      "Workflow & integration (iPaaS)",
      "AI / LLM integration",
      "Managed automation services",
    ],
  },
  {
    slug: "gaining-efficiency",
    title: "Gaining Efficiency",
    tagline: "More performance, less cost.",
    description:
      "Squeeze more value out of every system, contract, and team. We optimize infrastructure, licensing, and operations so technology stops being a cost center and starts being a multiplier.",
    icon: Gauge,
    highlights: [
      { title: "Infrastructure Optimization", body: "Right-sizing, consolidation, and energy-efficient data centers." },
      { title: "Cost & License Optimization", body: "Cloud FinOps, software asset management, vendor consolidation." },
      { title: "Operational Excellence", body: "ITIL-aligned operations, monitoring, and observability." },
      { title: "Sustainable IT", body: "Green data center design and power / cooling efficiency." },
    ],
    capabilities: [
      "Current-state assessment",
      "TCO & ROI modeling",
      "Performance tuning",
      "Managed operations",
      "Continuous improvement",
    ],
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
