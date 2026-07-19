export interface ExportStep {
  num: string;
  title: string;
}

export const EXPORT_STEPS: ExportStep[] = [
  { num: "01", title: "Export Readiness" },
  { num: "02", title: "Documentation" },
  { num: "03", title: "Customs & Compliance" },
  { num: "04", title: "Logistics Planning" },
  { num: "05", title: "Market Entry" },
];

export interface ExportAdvisoryItem {
  title: string;
  desc: string;
}

export const EXPORT_ADVISORY: ExportAdvisoryItem[] = [
  {
    title: "Export Readiness Assessment",
    desc: "Evaluate whether your products, operations, documentation, and supply chain are prepared for exports.",
  },
  {
    title: "Documentation Support",
    desc: "Assistance with IEC, shipping bills, certificates of origin, letters of credit, and more.",
  },
  {
    title: "Customs & Regulatory Guidance",
    desc: "Understand DGFT procedures, HS codes, licensing, and evolving compliance frameworks.",
  },
  {
    title: "Incoterms Advisory",
    desc: "Select the right Incoterms® based on your products, customers, and shipping arrangements.",
  },
  {
    title: "Government Incentives",
    desc: "Understand export-related schemes like RoDTEP, EPCG, and MSME export support programs.",
  },
  {
    title: "Market Entry Support",
    desc: "Country selection, export pricing strategy, buyer preparation, and trade fair guidance.",
  },
  {
    title: "Logistics Planning",
    desc: "Mode selection, FCL vs LCL, transit time and freight cost planning, and cargo insurance.",
  },
  {
    title: "Compliance & Risk Management",
    desc: "Payment terms, letters of credit, marine insurance awareness, and trade risk preparation.",
  },
];
