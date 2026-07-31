export interface WhyChooseItem {
  title: string;
  /** The proof behind the claim. A bare label persuades nobody. */
  desc: string;
}

/**
 * Seven reasons, each carrying the specific behaviour behind it — a weekly
 * report, a city count, a mode of delivery. Adjectives on their own
 * ("reliable", "experienced") read as filler to a buyer comparing three
 * forwarders on the same lane.
 */
export const WHY_CHOOSE_US: WhyChooseItem[] = [
  {
    title: "Pan-India Presence",
    desc: "Local teams in six major cities, so coordination happens where your cargo actually is.",
  },
  {
    title: "Worldwide Delivery",
    desc: "Door to door, port to door, or door to port by sea and air — whichever leg you need us to hold.",
  },
  {
    title: "Proactive Updates",
    desc: "Weekly shipment reports by email and WhatsApp. You should never have to ask where your cargo is.",
  },
  {
    title: "24x7 Operations Support",
    desc: "Cargo does not wait for office hours, so neither does the team handling it.",
  },
  {
    title: "A Worldwide Agent Network",
    desc: "Trusted agents at the major sea ports and international airports on our lanes.",
  },
  {
    title: "One-Window Solution",
    desc: "3PL and 4PL on a single file: freight, customs, documentation, and warehousing from one team.",
  },
  {
    title: "Committed to Timelines",
    desc: "The pickup and delivery dates agreed at booking are the dates we are held to.",
  },
];

export const COMPANY_QUOTE = {
  text: "Our commitment doesn't end when your shipment is delivered. It begins with understanding your business and continues through every milestone of your growth.",
  attribution: "SK Internationals",
};
