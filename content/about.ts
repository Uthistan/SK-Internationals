export const ABOUT_PARAGRAPHS: string[] = [
  "At SK Internationals, we partner with businesses to simplify logistics, streamline operations, and support sustainable growth. Every shipment we manage reflects our commitment to reliability, transparency, and long-term relationships.",
  "Established in 2011, we have spent over a decade building trusted relationships by delivering dependable logistics solutions backed by a team with 20+ years of industry experience.",
];

export interface AboutHighlight {
  title: string;
  desc: string;
}

export const ABOUT_HIGHLIGHTS: AboutHighlight[] = [
  {
    title: "Customer-First Approach",
    desc: "Every client is unique, and every solution is tailored to their business needs.",
  },
  {
    title: "Operational Excellence",
    desc: "Efficient planning and execution ensure reliable logistics operations.",
  },
  {
    title: "Long-Term Partnerships",
    desc: "We focus on building lasting relationships based on trust, transparency, and consistency.",
  },
  {
    title: "Future-Ready Vision",
    desc: "Expanding beyond logistics to support businesses with global trade and export solutions.",
  },
];

export const ABOUT_STATS = {
  years: {
    target: 14,
    unit: "years",
    label: "Delivering trusted logistics solutions since 2011",
  },
  experience: { target: 20, label: "Combined industry expertise within our team" },
  businesses: { target: 50, label: "Businesses trusted across diverse industries" },
};
