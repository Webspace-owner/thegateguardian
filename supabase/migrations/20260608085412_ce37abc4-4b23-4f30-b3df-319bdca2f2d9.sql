
ALTER TABLE public.industries
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS tagline text,
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS overview text,
  ADD COLUMN IF NOT EXISTS challenges text,
  ADD COLUMN IF NOT EXISTS solutions text,
  ADD COLUMN IF NOT EXISTS services text;

UPDATE public.industries SET
  slug = 'manufacturing',
  tagline = 'Protecting production lines, IP and OT environments.',
  image_url = 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1600&q=80',
  overview = 'Manufacturing facilities operate at the intersection of physical operations and increasingly connected OT/IT systems. A single security gap can halt production, leak intellectual property, or expose workers to safety risk. The Gate Guardian designs converged physical-and-cyber security programs purpose-built for plants, warehouses and distribution hubs.',
  challenges = 'Theft of raw materials, finished goods and tooling
Industrial espionage targeting proprietary processes and IP
OT/SCADA exposure as production lines connect to corporate networks
Workforce safety across large multi-zone sites
Vendor, contractor and visitor access at high volume
Compliance with ISO 27001, IEC 62443 and local labor / safety codes',
  solutions = 'Perimeter intrusion detection with thermal and AI video analytics
Multi-layer access control across gates, production zones and clean rooms
OT network segmentation and asset visibility
24/7 monitoring with SOC integration and incident response runbooks
Tamper-resistant CCTV with license-plate recognition at logistics yards
Security awareness training for line workers, supervisors and IT staff',
  services = 'Site risk assessment & threat modeling
Security master plan & system design
Tender preparation, vendor evaluation, supervision
Commissioning, handover and as-built documentation
Operator and maintenance training programs'
WHERE name = 'Manufacturing';

UPDATE public.industries SET
  slug = 'financial-services',
  tagline = 'Vaults, branches and data — secured end to end.',
  image_url = 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=1600&q=80',
  overview = 'Banks, insurers and fintechs hold the most regulated and most-targeted assets in any economy. We help financial institutions harden branches, headquarters and data centers against physical intrusion, social engineering and insider threat — while staying aligned with central-bank and PCI-DSS requirements.',
  challenges = 'Armed robbery, ATM attacks and after-hours intrusion
Insider fraud and unauthorized access to vaults / server rooms
Strict regulator audits and tight reporting timelines
Customer experience pressure — security must be invisible at the branch
Coordinated physical + cyber attacks on payment systems',
  solutions = 'Vault and cash-handling area hardening with dual-control access
Biometric and multi-factor access control for sensitive zones
AI video analytics for behavior detection at ATMs and counters
Centralized command-and-control across multi-branch networks
Penetration testing of physical security controls
Compliance-ready documentation and audit support',
  services = 'Branch and HQ security audit
Vault, server-room and trading-floor design
ATM and cash-in-transit risk advisory
Guard force training and standard operating procedures
Incident drills and tabletop exercises'
WHERE name = 'Financial Services';

UPDATE public.industries SET
  slug = 'government',
  tagline = 'Mission-grade security for public institutions.',
  image_url = 'https://images.unsplash.com/photo-1541872703-74c5e44368f4?w=1600&q=80',
  overview = 'Government ministries, embassies and critical public facilities face nation-state level threats, public scrutiny and the obligation to keep citizens safe. Our consultants bring international best practice in protective security, classified-area design and crisis management to public-sector projects of any scale.',
  challenges = 'Terrorism, civil unrest and targeted violence
Protection of classified information and assets
Secure visitor management for diplomats and the public
Coordination across multiple agencies and contractors
Long-cycle procurement and strict documentation requirements',
  solutions = 'Hostile vehicle mitigation and blast-resistant perimeter design
Layered access control with classified-zone separation
Counter-surveillance and TSCM (technical surveillance counter-measures)
Command, control and communications (C3) center design
Continuity-of-operations and emergency response planning',
  services = 'Threat, vulnerability and risk assessment (TVRA)
Master security plan aligned with national standards
Tender documents and independent supervision
Staff vetting frameworks and clearance procedures
Crisis management training and live exercises'
WHERE name = 'Government';

UPDATE public.industries SET
  slug = 'commercial',
  tagline = 'Offices and mixed-use developments people trust.',
  image_url = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
  overview = 'Corporate headquarters, business parks and mixed-use towers must balance frictionless tenant experience with serious protection of people, data and property. We design security programs that feel invisible to occupants but stand up to real-world threats.',
  challenges = 'High tenant turnover and complex visitor flows
Mixed occupancy: retail, office, residential, parking
After-hours intrusion and vandalism
Active-assailant and workplace-violence preparedness
Integration with building management and life-safety systems',
  solutions = 'Mobile-credential access control with tenant self-service
Lobby design with discreet weapons / threat detection
AI video analytics for loitering, tailgating and crowd density
Integrated parking, EV and visitor management
Mass notification and emergency communication systems',
  services = 'Security concept design at project feasibility stage
Coordination with architects, MEP and IT consultants
Technology selection and lifecycle planning
Tenant security guidelines and onboarding kits
Post-occupancy audits and continuous improvement'
WHERE name = 'Commercial';

UPDATE public.industries SET
  slug = 'oil-gas',
  tagline = 'Upstream, midstream, downstream — protected.',
  image_url = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80',
  overview = 'Oil & gas facilities are high-consequence targets: remote, hazardous, and economically critical. The Gate Guardian delivers integrated physical, cyber and personnel security programs for refineries, terminals, pipelines and offshore assets — aligned with API, NOGEPA and local energy regulators.',
  challenges = 'Sabotage, theft of product and pipeline tapping
Remote sites with limited connectivity and long response times
Process safety overlapping with security (HAZOP / SIL interfaces)
Contractor and shift-worker access at scale
Geopolitical risk and travel security for expatriate staff',
  solutions = 'Long-range thermal perimeter detection and drone-based patrols
Hazardous-area-rated CCTV, access and intrusion equipment
SCADA / DCS network segmentation and continuous monitoring
Journey management and travel risk programs
Crisis response, evacuation and hostage-incident planning',
  services = 'Site security review against API SPC and IMO ISPS
Onshore / offshore master security plan
Integration with process safety and emergency response
Guard force structuring and competency framework
Training: counter-piracy, defensive driving, incident command'
WHERE name = 'Oil & Gas';

UPDATE public.industries SET
  slug = 'real-estate',
  tagline = 'Communities residents are proud to call home.',
  image_url = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80',
  overview = 'Gated communities, residential compounds and master-planned developments are judged on the safety they deliver every day. We help developers and facility managers design security that elevates the lifestyle promise — from gatehouse architecture to resident apps and 24/7 control rooms.',
  challenges = 'Resident, domestic-staff and contractor access at high volume
Parcel, food-delivery and ride-share traffic
Perimeter intrusion across long, landscaped boundaries
Privacy expectations and data protection of residents
Multi-phase developments with evolving security needs',
  solutions = 'License-plate recognition and resident QR / mobile credentials
Visitor pre-authorization with delivery and contractor workflows
Integrated CCTV with discreet camera placement
Community app for incident reporting and announcements
24/7 control room with SLA-driven response protocols',
  services = 'Security master plan from masterplan stage
Gatehouse, control room and patrol design
Selection and onboarding of guarding contractors
Standard operating procedures and resident charters
KPI dashboards and quarterly security reviews'
WHERE name = 'Real Estate';

UPDATE public.industries SET
  slug = 'data-centers',
  tagline = 'Tier-III and Tier-IV security, certified to scale.',
  image_url = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80',
  overview = 'Data centers concentrate massive value in a small footprint — and customer trust depends on demonstrable physical security. We design and audit security programs aligned with Uptime Institute, ISO 27001, SOC 2 and TIA-942, from greenfield builds to hyperscale expansions.',
  challenges = 'Multi-tenant access with strict customer separation
Insider risk from cleaning, maintenance and contractor staff
Audit pressure: ISO 27001, SOC 2 Type II, PCI-DSS, HIPAA
Physical-to-cyber attack chains (rogue devices, supply chain)
24/7 operations with zero tolerance for downtime',
  solutions = 'Mantrap and anti-tailgating portals at every layer
Biometric + smart card multi-factor authentication
Cage and rack-level access logging with video correlation
Tamper-evident shipping and equipment destruction workflows
SOC integration with environmental and BMS alarms',
  services = 'Greenfield site selection and threat assessment
Security architecture aligned with Tier-III / Tier-IV
Pre-audit gap analysis for ISO 27001 and SOC 2
Commissioning, witness testing and Cx documentation
Operator training and continuous compliance support'
WHERE name = 'Data Centers';

UPDATE public.industries SET
  slug = 'educational-facilities',
  tagline = 'Safer schools, colleges and university campuses.',
  image_url = 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80',
  overview = 'Educational institutions must protect children and young adults while remaining open, welcoming environments. Our consultants help schools, colleges and universities build layered safety programs that cover everyday risks and the most serious emergencies — without turning campuses into fortresses.',
  challenges = 'Unauthorized access and stranger intrusion
Bullying, harassment and behavioral incidents
Active-assailant preparedness and lockdown procedures
Bus routes, drop-off / pick-up and parent communication
Lab, library and dormitory-specific risks',
  solutions = 'Single-point-of-entry design with vestibules and visitor screening
Anonymous tip-line and behavior threat assessment programs
Integrated CCTV with AI for fight and weapon detection
Mass notification across PA, mobile apps and digital signage
Lockdown drills and faculty / student training',
  services = 'Campus safety audit and policy review
Master security plan and capex roadmap
Procurement of integrated security and life-safety systems
Tabletop exercises with local first responders
Faculty, security and student awareness training'
WHERE name = 'Educational Facilities';

UPDATE public.industries SET
  slug = 'shopping-malls',
  tagline = 'Where retail experience and safety converge.',
  image_url = 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1600&q=80',
  overview = 'Shopping malls and large retail destinations attract millions of visitors a year. Owners and operators must deliver an inviting customer experience while preventing theft, managing crowds, and being ready for the unexpected. We blend operations, technology and people to deliver mall security that supports footfall and tenant satisfaction.',
  challenges = 'Shoplifting, organized retail crime and fraud
Crowd management at events, weekends and seasonal peaks
Parking security, vehicle theft and traffic flow
Active-assailant and bomb-threat preparedness
Tenant coordination across hundreds of stores and F&B outlets',
  solutions = 'Centralized command center with AI video analytics
LPR-enabled parking and valet integration
Loss-prevention program with tenant scorecards
Crowd-density monitoring and dynamic deployment of guards
Mass notification and evacuation route management',
  services = 'Mall security operating model design
Selection and supervision of guarding and loss-prevention vendors
Standard operating procedures and emergency response plans
Tenant security inductions and joint drills
Quarterly performance reviews and KPI dashboards'
WHERE name = 'Shopping Malls';

CREATE UNIQUE INDEX IF NOT EXISTS industries_slug_key ON public.industries(slug);
