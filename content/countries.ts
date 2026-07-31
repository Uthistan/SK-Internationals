export interface Country {
  value: string;
  label: string;
}

export interface CountryGroup {
  region: string;
  countries: Country[];
}

/**
 * Origin and destination options for the quote form. Grouped by the corridors
 * in `content/network.ts` so the picker reads in the same geography the map
 * draws, with India first because it is one end of nearly every shipment we
 * quote. Cross trade is a service we sell, so origin is not pinned to India.
 */
export const COUNTRY_GROUPS: CountryGroup[] = [
  {
    region: "India",
    countries: [{ value: "india", label: "India" }],
  },
  {
    region: "Persian & Arabian Gulf",
    countries: [
      { value: "uae", label: "United Arab Emirates" },
      { value: "saudi-arabia", label: "Saudi Arabia" },
      { value: "oman", label: "Oman" },
      { value: "qatar", label: "Qatar" },
      { value: "kuwait", label: "Kuwait" },
      { value: "bahrain", label: "Bahrain" },
    ],
  },
  {
    region: "Red Sea",
    countries: [
      { value: "egypt", label: "Egypt" },
      { value: "sudan", label: "Sudan" },
      { value: "djibouti", label: "Djibouti" },
      { value: "jordan", label: "Jordan" },
      { value: "yemen", label: "Yemen" },
    ],
  },
  {
    region: "Indian Subcontinent",
    countries: [
      { value: "sri-lanka", label: "Sri Lanka" },
      { value: "bangladesh", label: "Bangladesh" },
      { value: "nepal", label: "Nepal" },
      { value: "maldives", label: "Maldives" },
      { value: "pakistan", label: "Pakistan" },
    ],
  },
  {
    region: "South East Asia",
    countries: [
      { value: "singapore", label: "Singapore" },
      { value: "malaysia", label: "Malaysia" },
      { value: "indonesia", label: "Indonesia" },
      { value: "thailand", label: "Thailand" },
      { value: "vietnam", label: "Vietnam" },
      { value: "philippines", label: "Philippines" },
    ],
  },
  {
    region: "East Asia",
    countries: [
      { value: "china", label: "China" },
      { value: "hong-kong", label: "Hong Kong" },
      { value: "japan", label: "Japan" },
      { value: "south-korea", label: "South Korea" },
      { value: "taiwan", label: "Taiwan" },
    ],
  },
  {
    region: "Europe & UK",
    countries: [
      { value: "united-kingdom", label: "United Kingdom" },
      { value: "germany", label: "Germany" },
      { value: "netherlands", label: "Netherlands" },
      { value: "belgium", label: "Belgium" },
      { value: "france", label: "France" },
      { value: "italy", label: "Italy" },
      { value: "spain", label: "Spain" },
      { value: "poland", label: "Poland" },
    ],
  },
  {
    region: "Americas",
    countries: [
      { value: "united-states", label: "United States" },
      { value: "canada", label: "Canada" },
      { value: "mexico", label: "Mexico" },
      { value: "brazil", label: "Brazil" },
    ],
  },
  {
    region: "Africa",
    countries: [
      { value: "kenya", label: "Kenya" },
      { value: "tanzania", label: "Tanzania" },
      { value: "south-africa", label: "South Africa" },
      { value: "nigeria", label: "Nigeria" },
      { value: "ethiopia", label: "Ethiopia" },
    ],
  },
  {
    region: "Oceania",
    countries: [
      { value: "australia", label: "Australia" },
      { value: "new-zealand", label: "New Zealand" },
    ],
  },
  {
    region: "Other",
    countries: [{ value: "other", label: "Other / not listed" }],
  },
];

/**
 * Value to label, so the notification email names the country rather than
 * repeating the slug the form posted.
 */
export const COUNTRY_LABELS: Record<string, string> = Object.fromEntries(
  COUNTRY_GROUPS.flatMap((group) =>
    group.countries.map(({ value, label }) => [value, label]),
  ),
);
