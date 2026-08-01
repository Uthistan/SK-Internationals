export interface QuoteOption {
  value: string;
  label: string;
}

/**
 * The four pickers that decide what a quote actually costs: mode, how far along
 * the journey we carry it, and what the cargo is. Every option is a service we
 * already list in `content/services.ts` — the form must not offer a lane we
 * cannot price.
 */
export const SHIPPING_MODES: QuoteOption[] = [
  { value: "ocean-lcl", label: "Ocean LCL (part container)" },
  { value: "ocean-fcl", label: "Ocean FCL (full container)" },
  { value: "air-freight", label: "Air Freight" },
  { value: "road-freight", label: "Road Freight" },
  { value: "rail-freight", label: "Rail Freight" },
  { value: "multimodal", label: "Multimodal (combination)" },
  // Namespaced, because movement type offers its own "not sure" and the
  // notification email resolves both through one label map.
  { value: "mode-not-sure", label: "Not sure, advise me" },
];

// Mirrors DELIVERY_MODES in content/network.ts, which is what the services page
// promises. Kept as its own list because a form value must stay stable even if
// the marketing wording of a mode changes.
export const MOVEMENT_TYPES: QuoteOption[] = [
  { value: "door-to-door", label: "Door to Door" },
  { value: "port-to-port", label: "Port to Port" },
  { value: "port-to-door", label: "Port to Door" },
  { value: "door-to-port", label: "Door to Port" },
  { value: "movement-not-sure", label: "Not sure, advise me" },
];

export const CARGO_TYPES: QuoteOption[] = [
  { value: "pallets", label: "Pallets" },
  { value: "cartons", label: "Boxes / Cartons" },
  { value: "containers", label: "Containers" },
  { value: "break-bulk", label: "Break bulk / loose cargo" },
  { value: "drums", label: "Drums / barrels" },
  { value: "machinery", label: "Machinery / project cargo" },
  { value: "dangerous-goods", label: "Dangerous goods (DG)" },
  { value: "other", label: "Other" },
];

export const SHIPMENT_PURPOSES: QuoteOption[] = [
  { value: "commercial", label: "Commercial" },
  { value: "personal", label: "Personal" },
];

/** Every value the form can post, so the API can name it back in the email. */
export const QUOTE_LABELS: Record<string, string> = Object.fromEntries(
  [
    ...SHIPPING_MODES,
    ...MOVEMENT_TYPES,
    ...CARGO_TYPES,
    ...SHIPMENT_PURPOSES,
  ].map(({ value, label }) => [value, label]),
);
