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

export interface NetworkRegion {
  name: string;
  /** Anchor point for the map marker — a representative centre, not a port. */
  lat: number;
  lon: number;
}

// One list drives both the map markers and the corridor chips beneath it, so
// the two can never disagree about where we operate. India is anchored on the
// west coast to keep it clear of the Chennai and Tuticorin hub markers.
export const NETWORK_REGIONS: NetworkRegion[] = [
  { name: "India", lat: 19.1, lon: 72.9 },
  { name: "Middle East", lat: 24.5, lon: 54.4 },
  { name: "United Kingdom", lat: 52.5, lon: -1.5 },
  { name: "USA", lat: 39.8, lon: -98.5 },
  { name: "South East Asia", lat: 2.5, lon: 102.5 },
  { name: "Europe", lat: 48.5, lon: 11.5 },
  { name: "Africa", lat: 6, lon: 20 },
  { name: "China", lat: 32, lon: 112 },
  { name: "Australia", lat: -25, lon: 134 },
];
