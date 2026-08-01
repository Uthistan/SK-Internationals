export interface Industry {
  name: string;
  desc: string;
  image: string;
  credit: string;
  creditHref: string;
}

/**
 * Every photograph shows the sector's own work, not a warehouse. The set this
 * replaced was seven variations on pallet racking — the card told a visitor
 * nothing their own sector name hadn't already, and the grid read as one
 * repeated stock photo.
 */
export const INDUSTRIES: Industry[] = [
  {
    name: "Manufacturing",
    desc: "Reliable supply chain solutions from procurement to delivery.",
    image: "/images/industries/manufacturing.jpg",
    credit: "Simon Kadula on Unsplash",
    creditHref: "https://unsplash.com/@simonkadula",
  },
  {
    name: "Food & Beverage",
    desc: "Efficient logistics for food businesses and exporters.",
    image: "/images/industries/food-beverage.jpg",
    credit: "Arno Senoner on Unsplash",
    creditHref: "https://unsplash.com/@arnosenoner",
  },
  {
    name: "Agriculture",
    desc: "Supporting the movement of agricultural commodities and exports.",
    image: "/images/industries/agriculture.jpg",
    credit: "Loren King on Unsplash",
    creditHref: "https://unsplash.com/@kingimaging",
  },
  {
    name: "Textiles",
    desc: "Helping textile manufacturers connect with domestic and international markets.",
    image: "/images/industries/textiles.jpg",
    credit: "Lalit Kumar on Unsplash",
    creditHref: "https://unsplash.com/@klalit",
  },
  {
    name: "Engineering",
    desc: "Specialized logistics for machinery and industrial goods.",
    image: "/images/industries/engineering.jpg",
    credit: "Zheng Ji on Unsplash",
    creditHref: "https://unsplash.com/@zhengjialuminum",
  },
  {
    name: "DG Goods",
    desc: "Hazardous cargo classified, packed, and declared to IMDG and IATA rules.",
    image: "/images/industries/dg-goods.jpg",
    credit: "benjamin lehman on Unsplash",
    creditHref: "https://unsplash.com/@abject",
  },
  {
    name: "Project Cargo",
    desc: "Safe and efficient transportation of oversized, over-dimensional, and heavy equipment through specialized logistics solutions.",
    image: "/images/industries/bigbulk-goods.jpg",
    credit: "Julia Taubitz on Unsplash",
    creditHref: "https://unsplash.com/@justmejuliee",
  },
  {
    name: "Retail & FMCG",
    desc: "Reliable transportation for consumer supply chains that move quickly.",
    image: "/images/industries/retail-fmcg.jpg",
    credit: "Fikri Rasyid on Unsplash",
    creditHref: "https://unsplash.com/@fikrirasyid",
  },
  {
    name: "SMEs Built for Export",
    desc: "Helping growing businesses take their first step into global markets.",
    image: "/images/industries/export-smes.jpg",
    credit: "Bench Accounting on Unsplash",
    creditHref: "https://unsplash.com/@benchaccounting",
  },
];
