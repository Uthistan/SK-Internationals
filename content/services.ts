export interface ServiceItem {
  num: string;
  tag: string;
  /**
   * URL segment for this service's page. Written out rather than derived from
   * the title: these are permanent addresses, and renaming a service for
   * marketing reasons must not silently break every inbound link to it.
   */
  slug: string;
  title: string;
  desc: string;
  body: string;
  items: string[];
  image: string;
  credit: string;
  creditHref: string;
}

export const SERVICES: ServiceItem[] = [
  {
    num: "01",
    tag: "Ocean · Air · Road · Rail",
    slug: "freight-forwarding",
    title: "Freight Forwarding",
    desc: "Seamless Freight Forwarding Across Domestic & International Markets",
    body: "Efficient freight forwarding is the foundation of a successful supply chain. We coordinate the movement of cargo across sea, air, road, and rail through trusted transportation networks, choosing the mode that suits your cargo, destination, transit time, and budget. As a 3PL and 4PL operator we can run the whole chain or slot into the part you need, with on time pickup at origin and on time delivery at destination.",
    items: [
      "Ocean Freight (FCL / LCL)",
      "Air Freight",
      "Rail Freight",
      "Multimodal Transportation",
      "3PL and 4PL Logistics Management",
      "Logistics from Door to Door",
      "Services from Port to Port",
      "Services from Port to Door",
      "Services from Door to Port",
      "Services from Airport to Airport",
      "Cross Trade Shipments",
      "Buyers Consolidation",
      "Cargo Consolidation",
      "Dangerous Goods (DG) Cargo Handling",
      "Special & Odd Dimension Cargo Handling",
      "Purchase Order Management",
      "Vendor Coordination",
      "Shipment Planning",
      "Cargo Insurance Assistance",
      "Track & Trace Support",
      "Weekly Shipment Reporting by Email & WhatsApp",
      "24x7 Operations Support",
      "Project Cargo Coordination",
    ],
    image: "/images/services/freight-forwarding.jpg",
    credit: "Logan Voss on Unsplash",
    creditHref: "https://unsplash.com/@loganvoss",
  },
  {
    num: "02",
    tag: "Import · Export · Compliance",
    slug: "customs-clearance",
    title: "Customs Clearance",
    desc: "Simplifying Customs. Ensuring Compliance.",
    body: "Customs procedures can often be complex and bound by tight deadlines. Our experienced team assists businesses in navigating documentation, regulatory requirements, and clearance procedures, helping minimize delays and ensuring compliance with applicable regulations.",
    items: [
      "Import Customs Clearance",
      "Export Customs Clearance",
      "Bill of Entry Processing",
      "Shipping Bill Processing",
      "Duty Assessment Assistance",
      "GST Compliance Support",
      "HS Code Classification",
      "Customs Documentation",
      "SEZ Documentation",
      "EOU Documentation",
      "DGFT Assistance",
      "Drawback Processing",
      "High Sea Sale Documentation",
      "Bonding & Clearance from Bond",
      "ATA Carnet Assistance",
      "Documentation for Reimport and Reexport",
      "SVB Support",
      "Customs Compliance Advisory",
    ],
    image: "/images/services/customs-clearance.jpg",
    credit: "Haris Illahi on Unsplash",
    creditHref: "https://unsplash.com/@harisillahi",
  },
  {
    num: "03",
    tag: "Storage · Fulfilment",
    slug: "warehousing",
    title: "Warehousing",
    desc: "Secure Storage Solutions That Support Your Supply Chain",
    body: "Efficient warehousing plays a critical role in inventory management and business continuity. Our warehousing solutions provide secure storage, organized inventory handling, and flexible space to meet changing business requirements.",
    items: [
      "Bonded Warehousing",
      "General Warehousing",
      "Inventory Management",
      "Pick & Pack",
      "Cross Docking",
      "Palletization",
      "Order Fulfilment",
      "Distribution Management",
      "Cargo Consolidation",
      "Deconsolidation",
      "Barcode Management",
      "Value Added Services",
      "Stock Monitoring",
    ],
    image: "/images/services/warehousing.jpg",
    credit: "Vida Huang on Unsplash",
    creditHref: "https://unsplash.com/@rebylulu",
  },
  {
    num: "04",
    tag: "Domestic · Last Mile",
    slug: "transportation",
    title: "Transportation",
    desc: "Reliable Transportation You Can Count On",
    body: "Timely transportation is essential to keeping businesses moving. We provide dependable transportation solutions that connect suppliers, manufacturers, distributors, and customers through efficient logistics planning and execution.",
    items: [
      "Full Truck Load (FTL)",
      "Part Truck Load (PTL)",
      "Container Transportation",
      "ODC Transportation",
      "Break Bulk Cargo",
      "First Mile Pickup",
      "Last Mile Delivery",
      "Movement from Factory to Port",
      "Movement from Port to Warehouse",
      "Interstate Transportation",
      "Dedicated Fleet Solutions",
      "Reverse Logistics",
      "Milk Run Distribution",
      "Time Critical Deliveries",
    ],
    image: "/images/services/transportation.jpeg",
    credit: "Vitalii Onyshchuk on Unsplash",
    creditHref: "https://unsplash.com/@true_zuzu",
  },
  {
    num: "05",
    tag: "Yard · Equipment",
    slug: "container-handling",
    title: "Container Handling",
    desc: "Efficient Container Management with Operational Precision",
    body: "From container movement to handling and coordination, we ensure smooth operations throughout the logistics process. Our experienced team works closely with clients and partners to optimize container handling while minimizing operational delays.",
    items: [
      "Empty Container Movement",
      "Laden Container Movement",
      "Container Yard Coordination",
      "ICD Coordination",
      "CFS Coordination",
      "Container Stuffing",
      "Container Unloading",
      "Seal Verification",
      "Container Inspection",
      "Port Coordination",
      "Equipment Planning",
    ],
    image: "/images/services/container-handling.jpg",
    credit: "Wolfgang Weiser on Unsplash",
    creditHref: "https://unsplash.com/@hamburgmeinefreundin",
  },
  {
    num: "06",
    tag: "Road · Land Borders",
    slug: "cross-border-road-solutions",
    title: "Cross Border Road Solutions",
    desc: "Moving Cargo Into Nepal and Bangladesh by Road",
    body: "We move cargo by road into Nepal and Bangladesh, with road connectivity supporting longer stretches of the journey. Our team coordinates border formalities and cargo transfers along the way.",
    items: [
      "Road Freight to Nepal",
      "Road Freight to Bangladesh",
      "Land Border Coordination",
      "Border Documentation Support",
      "Cargo Transfer at Border Points",
    ],
    image: "/images/services/cross-border-road.jpg",
    credit: "Bhargav Panchal on Unsplash",
    creditHref: "https://unsplash.com/@bhargavpanchal1986",
  },
  {
    num: "07",
    tag: "Express · Documents · Samples",
    slug: "sea-air-courier",
    title: "Sea / Air Courier",
    desc: "Documents and Small Consignments, on the Fastest Leg That Suits Them",
    body: "Not every shipment fills a container. Export documents, product samples, spare parts, and small parcels move on their own clock, and putting them on a full freight booking costs time you do not have. We run them as courier consignments, by air when the deadline is short, consolidated by sea when the cost matters more than the day. They are collected at your door and delivered to your buyer's, with the same paperwork and delivery confirmation as any other file on our desk.",
    items: [
      "Air Courier for Documents and Samples",
      "Economy Sea Courier via Consolidation",
      "Small Parcel Export and Import",
      "Spare Parts and Replacement Shipments",
      "Door to Door Pickup and Delivery",
      "Courier Shipment Documentation",
      "Duty and Tax Guidance at Destination",
      "Packing and Labelling Support",
      "Track & Trace Support",
      "Proof of Delivery",
      "Cargo Insurance Assistance",
    ],
    image: "/images/services/sea-air-courier.jpg",
    credit: "Client supplied",
    creditHref: "",
  },
  {
    num: "08",
    tag: "DGFT · Licensing · Incentives",
    slug: "dgft-and-licensing",
    title: "DGFT and Licensing",
    desc: "Licensing and Incentives Handled with the DGFT",
    body: "Dealing with the Directorate General of Foreign Trade takes time most exporters cannot spare. We manage your registrations, licence applications, and incentive claims from filing through to approval. Our team keeps your records current and your entitlements in order, so you spend less time chasing paperwork and more time selling to customers.",
    items: [
      "Import Export Code (IEC): registration, updates, and maintenance",
      "Incentive schemes: EPCG, Advance Authorization, RoDTEP, RoSCTL, Duty Drawback",
      "RCMC filing across the Export Promotion Councils",
    ],
    image: "/images/services/dgft-licensing.jpg",
    credit: "Gabrielle Henderson on Unsplash",
    creditHref: "https://unsplash.com/@gabriellefaithhenderson",
  },
  {
    num: "09",
    tag: "Inspection · Certification",
    slug: "export-inspection",
    title: "Export Inspection",
    desc: "Quality Certification That Clears Foreign Customs",
    body: "Many foreign buyers and customs authorities will not accept goods without official quality certification. We help you obtain the approvals issued before shipment that prove your products meet the entry standards of your destination market. Whether you ship food, farm produce, or industrial cargo, we arrange the checks that let your consignment clear inspection abroad.",
    items: [
      "Export Inspection Agency (EIA) certification and coordination",
      "Health, sanitary, and phytosanitary certificates",
      "Preferential and non preferential Certificates of Origin (COO)",
      "Quality inspection clearances required before goods leave port",
    ],
    image: "/images/services/export-inspection.jpg",
    credit: "Bernd Dittrich on Unsplash",
    creditHref: "https://unsplash.com/@hdbernd",
  },
  {
    num: "10",
    tag: "Coir · RCMC · Licensing",
    slug: "coir-board",
    title: "Coir Board",
    desc: "Coir Exports Registered, Licensed, and Documented",
    body: "Exporting coir fibre, yarn, mats, or pith comes with its own set of rules. We handle the industry approvals that let you ship coir products legally and claim the support available to the sector. From membership registration to permit processing, we cover the paperwork so your consignments leave on schedule.",
    items: [
      "Coir Board Registration cum Membership Certificate (RCMC)",
      "Export licensing, quality endorsements, and permit processing",
      "Documentation to claim subsidies and export incentives for coir",
    ],
    image: "/images/services/coir-board.jpg",
    credit: "Gurth Bramall on Unsplash",
    creditHref: "https://unsplash.com/@gurthb",
  },
  {
    num: "11",
    tag: "Textiles · Testing · COO",
    slug: "textile-committee",
    title: "Textile Committee",
    desc: "Textiles Tested and Certified for Overseas Buyers",
    body: "Fabrics, garments, and technical textiles need proper verification before they can be sold overseas. We arrange Textile Committee registration and the testing that confirms your material meets buyer requirements. Our team prepares the reports and origin certificates your shipment needs, so your textile exports move through customs without questions about quality.",
    items: [
      "Textile Committee registration and export endorsements",
      "Fabric testing reports and quality certificates before shipment",
      "Generalized System of Preferences (GSP) Certificates of Origin",
    ],
    image: "/images/services/textile-committee.jpg",
    credit: "Bergstrand Consultancy on Unsplash",
    creditHref: "https://unsplash.com/@bergstrand",
  },
  {
    num: "12",
    tag: "EPR · Environmental",
    slug: "epr-compliance",
    title: "EPR Compliance",
    desc: "Environmental Compliance That Keeps Imports Moving",
    body: "Companies that import packaging or regulated products carry environmental obligations that customs will check. We manage your EPR compliance so your goods stay within the law and clear the port on time. From first registration to annual returns and recycling targets, we handle the filings that keep your imports free of environmental holds.",
    items: [
      "CPCB and SPCB registration for packaging, electronic waste, batteries, tyres",
      "Annual return filing, recycling target fulfilment, and credit transfers",
      "Import clearance without delays from environmental compliance holds",
    ],
    image: "/images/services/epr-compliance.jpeg",
    credit: "Bernd Dittrich on Unsplash",
    creditHref: "https://unsplash.com/@hdbernd",
  },
  {
    num: "13",
    tag: "BIS · Standards · Testing",
    slug: "bis-certification",
    title: "BIS Certification",
    desc: "Products Certified to Meet Mandatory Standards",
    body: "Many products cannot be sold in India or abroad until they carry the required safety and quality marks. We guide your goods through Bureau of Indian Standards certification and arrange the testing that supports it. Our team coordinates with laboratories and auditors, so your products meet mandatory standards before they reach the market.",
    items: [
      "Bureau of Indian Standards (BIS) registration and ISI mark approvals",
      "Compulsory Registration Scheme (CRS) and Foreign Manufacturers Scheme (FMCS)",
      "Coordination for lab testing, sample verification, and audit support",
    ],
    image: "/images/services/bis-certification.jpeg",
    credit: "ThisisEngineering on Unsplash",
    creditHref: "https://unsplash.com/@thisisengineering",
  },
  {
    num: "14",
    tag: "Attestation · Legalization",
    slug: "export-legalization",
    title: "Export Legalization",
    desc: "Documents Legalized for Customs and Payment",
    body: "Foreign customs and banks often require your trade documents to be legalized before they release goods or payment. We handle the attestation of your invoices, packing lists, and certificates through every stage the process demands. With the right stamps in place, you clear customs sooner and collect payment against your letters of credit without holdups.",
    items: [
      "Chamber of Commerce stamping of commercial invoices and packing lists",
      "Apostille and Ministry of External Affairs (MEA) attestations",
      "Embassy legalization for foreign buyers and Letter of Credit compliance",
    ],
    image: "/images/services/export-legalization.jpeg",
    credit: "Wesley Tingey on Unsplash",
    creditHref: "https://unsplash.com/@wesleyphotography",
  },
];

export interface ServicePage {
  title: string;
  tag: string;
  desc: string;
  image: string;
  /** Typed against the section it lives under, so no page can drift out of it. */
  href: `/services/${string}`;
}

/**
 * Every service that has a page, in the order menus should read them. This is
 * what the nav, the services index, and the footer all list — `SERVICES` is
 * only the subset whose pages come from the shared detail template.
 */
export const SERVICE_PAGES: ServicePage[] = SERVICES.map((service) => ({
  title: service.title,
  tag: service.tag,
  desc: service.desc,
  image: service.image,
  href: `/services/${service.slug}`,
}));

// Export consultancy is the one service whose page is written by hand rather
// than generated: what it sells is an advisory engagement with its own stages,
// not a list of operations. It opens the trade advisory block here, since that
// is the work it gets bought alongside.
const advisoryOpensAt = SERVICE_PAGES.findIndex(
  (service) => service.title === "DGFT and Licensing",
);
SERVICE_PAGES.splice(advisoryOpensAt, 0, {
  title: "Export Consultancy",
  tag: "Advisory · Market Entry",
  desc: "Helping Businesses Enter Global Markets with Confidence",
  image: "/images/services/export-consultancy.jpg",
  href: "/services/export-consultancy",
});

export const MARQUEE_SERVICE_NAMES = SERVICE_PAGES.map((s) => s.title).concat([
  "Global Trade Solutions",
]);
