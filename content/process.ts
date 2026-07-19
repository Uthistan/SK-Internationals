export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    title: "Consultation",
    desc: "We understand your business, products, and logistics requirements to recommend the most suitable solution.",
  },
  {
    num: "02",
    title: "Strategy & Documentation",
    desc: "Our team plans the logistics process, assists with documentation, compliance, and prepares every stage for smooth execution.",
  },
  {
    num: "03",
    title: "Logistics Execution",
    desc: "We coordinate freight forwarding, transportation, customs clearance, warehousing, and shipment movement with complete operational support.",
  },
  {
    num: "04",
    title: "Successful Delivery",
    desc: "Your cargo reaches its destination safely and efficiently, backed by continuous communication and dependable service.",
  },
  {
    num: "05",
    title: "Ongoing Partnership",
    desc: "As your business grows, we continue to support your logistics and international trade journey with scalable solutions and expert guidance.",
  },
];

export const NETWORK_REGIONS: string[] = [
  "India",
  "Middle East",
  "USA",
  "South East Asia",
  "Europe",
  "Africa",
];
