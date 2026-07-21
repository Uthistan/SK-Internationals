export interface ExportDestination {
  value: string;
  label: string;
}

export interface DestinationGroup {
  region: string;
  destinations: ExportDestination[];
}

// Grouped by the three confirmed corridors — see claude/BUSINESS_CONTEXT.md.
// Shared by the enquiry form and the enquiry email so the labels cannot drift.
export const DESTINATION_GROUPS: DestinationGroup[] = [
  {
    region: "Persian & Arabian Gulf",
    destinations: [
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
    destinations: [
      { value: "egypt", label: "Egypt" },
      { value: "sudan", label: "Sudan" },
      { value: "djibouti", label: "Djibouti" },
      { value: "jordan", label: "Jordan" },
      { value: "yemen", label: "Yemen" },
    ],
  },
  {
    region: "Indian Sub-Continent",
    destinations: [
      { value: "sri-lanka", label: "Sri Lanka" },
      { value: "bangladesh", label: "Bangladesh" },
      { value: "maldives", label: "Maldives" },
      { value: "nepal", label: "Nepal" },
    ],
  },
  {
    region: "Other",
    destinations: [{ value: "other", label: "Other / not listed" }],
  },
];

export const DESTINATION_LABELS: Record<string, string> = Object.fromEntries(
  DESTINATION_GROUPS.flatMap((group) =>
    group.destinations.map(({ value, label }) => [value, label]),
  ),
);
