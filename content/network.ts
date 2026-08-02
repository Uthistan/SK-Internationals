/**
 * Where SK Internationals operates — the India footprint and the worldwide
 * reach built on top of it. Kept in one file because the two are one claim:
 * local teams at the Indian end, agents at the far end, one file across both.
 */

export type LocationRole =
  | "Head office"
  | "Branch office"
  | "Port operations"
  | "Team on the ground";

export interface Location {
  /** One city, or several joined by CITY_SEPARATOR where they share a role. */
  city: string;
  role: LocationRole;
  /** What this city actually contributes — a role label alone says too little. */
  note: string;
}

export const CITY_SEPARATOR = " · ";

/**
 * Reconciled from the three city lists the client supplied, which do not match
 * each other: the offices list names Tirupur, the team list names Tuticorin and
 * Delhi, and Cochin and Kochi are the same city. Every city here appears in at
 * least one of those lists; the role is what distinguishes a branch from a port
 * presence, so a visitor is never told there is an office where there isn't.
 * Coimbatore plus the five branches are the "six major cities" the client
 * counts.
 */
export const LOCATIONS: Location[] = [
  {
    city: "Coimbatore",
    role: "Head office",
    note: "Registered office and the desk your shipment file opens on",
  },
  {
    city: "Chennai",
    role: "Branch office",
    note: "Primary port of loading for sea and air",
  },
  {
    city: "Tuticorin · Chennai · Mumbai",
    role: "Port operations",
    note: "Sea gateways on the southern, eastern, and western coasts",
  },
  {
    city: "Tirupur",
    role: "Branch office",
    note: "Textile and garment export belt",
  },
  {
    city: "Kochi",
    role: "Branch office",
    note: "Kerala coast, coir and agricultural cargo",
  },
  {
    city: "Bangalore",
    role: "Branch office",
    note: "Engineering and electronics corridor",
  },
  {
    city: "Mumbai",
    role: "Branch office",
    note: "West coast gateway and JNPT movements",
  },
  {
    city: "Delhi",
    role: "Branch office",
    note: "North India pickups and DGFT liaison",
  },
];

/** Cities carrying a permanent office — the figure the copy quotes. */
export const OFFICE_CITY_COUNT = LOCATIONS.filter(
  (location) =>
    location.role === "Head office" || location.role === "Branch office",
).length;

/**
 * Every city we are present in, named once. A city can hold both an office and
 * a port desk, so the rows above list it twice by design — anywhere the cities
 * are read as a flat strip, the repeat has to be collapsed.
 */
export const ALL_CITIES = [
  ...new Set(
    LOCATIONS.flatMap((location) => location.city.split(CITY_SEPARATOR)),
  ),
];

export interface DeliveryMode {
  name: string;
  desc: string;
}

/**
 * How far into the journey we take the cargo. Named as the trade names them,
 * because a buyer arrives already knowing which of these they need to quote.
 */
export const DELIVERY_MODES: DeliveryMode[] = [
  {
    name: "Door to Door",
    desc: "Collected at your supplier, delivered to your buyer, by sea or by air. Nothing in between is yours to arrange.",
  },
  {
    name: "Port to Port",
    desc: "Terminal to terminal, when your own agents hold both ends of the move.",
  },
  {
    // Named as air shippers name it. Three of the four modes above say "Port";
    // without this line the whole offer reads as sea-only to someone whose
    // cargo flies, and they leave before the service list loads.
    name: "Airport to Airport",
    desc: "Uplift to touchdown on the air corridors, with the same file and the same team.",
  },
  {
    name: "Port to Door",
    desc: "We take over at the discharge port or airport and finish the inland leg.",
  },
];

/**
 * How cargo actually travels on a corridor. Sea and air are the long-haul
 * networks; land and rail are the two overland modes we run into the
 * neighbouring markets, which no port or terminal is involved in at all.
 */
export type CorridorMode = "sea" | "air" | "land" | "rail";

/**
 * Only the modes that have a physical gateway worth plotting. The overland
 * corridors leave from an office rather than a terminal, so they share a
 * marker instead of claiming one — see OVERLAND_GATEWAY.
 */
export type GatewayMode = Extract<CorridorMode, "sea" | "air">;

export interface Gateway {
  label: string;
  mode: GatewayMode;
  lat: number;
  lon: number;
  /** Label offset in map units, so neighbouring markers don't collide. */
  dx: number;
  dy: number;
  anchor: "start" | "end" | "middle";
}

/**
 * Where cargo actually leaves India, by mode.
 *
 * Both maps used to originate every route from Chennai and Tuticorin — two
 * seaports — which made the network read as maritime no matter what the copy
 * said. Air freight is a core service, so its gateways are plotted with equal
 * weight and the corridors are drawn per mode. The two networks genuinely are
 * different, and showing that is more convincing than claiming parity in prose.
 */
/**
 * Label offsets are laid out as a clock around the cluster rather than by a
 * uniform rule: the five gateways occupy roughly 35 x 55 map units, and Chennai
 * and Bengaluru sit 7 units apart, so a name placed the same way twice collides
 * every time. Reading anticlockwise from the north — Delhi north-west, Mumbai
 * west, Bengaluru west, Tuticorin due south, Chennai east over the Bay — no two
 * names share a band, and the four horizontal ones carry a leader line back to
 * their dot so ownership is never in question.
 */
export const GATEWAYS: Gateway[] = [
  // Sea — the ports of loading.
  { label: "Chennai", mode: "sea", lat: 13.08, lon: 80.27, dx: 14, dy: 2, anchor: "start" },
  { label: "Tuticorin", mode: "sea", lat: 8.76, lon: 78.13, dx: 2, dy: 20, anchor: "middle" },
  // Air — the freight terminals we uplift from. Bengaluru and Delhi sit inland,
  // so they also make the map read as a country rather than a coastline.
  { label: "Bengaluru", mode: "air", lat: 13.2, lon: 77.71, dx: -20, dy: 3, anchor: "end" },
  { label: "Delhi", mode: "air", lat: 28.56, lon: 77.1, dx: -12, dy: -6, anchor: "end" },
  { label: "Mumbai", mode: "air", lat: 19.09, lon: 72.87, dx: -12, dy: -7, anchor: "end" },
];

/**
 * Falls back to the first gateway so the map still draws if the city list is
 * ever reordered or a label is renamed.
 */
const gatewayNamed = (label: string): Gateway =>
  GATEWAYS.find((gateway) => gateway.label === label) ?? GATEWAYS[0];

/**
 * Centre of the gateway cluster — what a glow or a field over the origin is
 * anchored to on either map. Averaged in degrees rather than in map units,
 * which on an equirectangular projection is the same point: the projection is
 * linear in both lat and lon.
 */
export const GATEWAY_CENTROID = {
  lat: GATEWAYS.reduce((sum, g) => sum + g.lat, 0) / GATEWAYS.length,
  lon: GATEWAYS.reduce((sum, g) => sum + g.lon, 0) / GATEWAYS.length,
};

/**
 * Where the road and rail corridors are worked from. Both land borders we
 * cross — Nepal and Bangladesh — are run off the North India desk, so the
 * overland modes originate at the Delhi branch rather than at an invented
 * border office.
 */
export const OVERLAND_GATEWAY = gatewayNamed("Delhi");

/**
 * India's own longitude, near enough: the line that separates a westbound lane
 * from an eastbound one.
 */
const EASTBOUND_MERIDIAN = 77;

/**
 * Where a westbound air lane stops being regional and becomes long-haul —
 * east of it is the Gulf and East Africa, west of it is Europe and the
 * Atlantic.
 */
const LONGHAUL_MERIDIAN = 15;

/**
 * Which gateway a lane leaves from, given where it is going.
 *
 * Every sea lane used to leave Chennai and every air lane Delhi, which left
 * three of the five gateways drawn as hubs with nothing departing them and
 * fired seventeen arcs out of two points — the single biggest reason the
 * subcontinent read as a knot. Splitting the lanes by destination breaks that
 * starburst into five small fans, and it is how the trade actually moves:
 * Tuticorin faces the western approaches and Chennai the Bay, Delhi flies the
 * Atlantic long-haul, Mumbai works the Gulf and Africa, and Bengaluru covers
 * the East.
 */
export function gatewayFor(mode: CorridorMode, lon: number): Gateway {
  if (mode === "land" || mode === "rail") return OVERLAND_GATEWAY;

  const eastbound = lon >= EASTBOUND_MERIDIAN;

  if (mode === "sea") {
    return eastbound ? gatewayNamed("Chennai") : gatewayNamed("Tuticorin");
  }

  if (eastbound) return gatewayNamed("Bengaluru");
  return lon >= LONGHAUL_MERIDIAN
    ? gatewayNamed("Mumbai")
    : gatewayNamed("Delhi");
}

export interface NetworkRegion {
  name: string;
  /** Anchor point for the map marker — a representative centre, not a port. */
  lat: number;
  lon: number;
  /**
   * Which corridors reach it. Most destinations are served by sea and air both;
   * the two neighbours are reached over the land border instead, and that
   * honesty is what makes the rest of the map credible.
   */
  modes: CorridorMode[];
  /**
   * Label offset and anchor in map units. Hand-placed rather than centred:
   * Nepal sits ~19 units from the Delhi gateway and Bangladesh ~17 from Nepal,
   * so a uniform rule stacks three names on top of each other over South Asia.
   */
  dx: number;
  dy: number;
  anchor: "start" | "end" | "middle";
}

// One list drives both the map markers and the corridor chips beneath it, so
// the two can never disagree about where we operate.
export const NETWORK_REGIONS: NetworkRegion[] = [
  // Served overland rather than through a port, so each anchor is the country
  // centre; far enough from the gateway markers not to crowd them.
  // Pushed clear of the Delhi gateway marker, which lands almost on top of it.
  // Landlocked, so there is no sea corridor to claim: cargo goes by road and by
  // rail across the border, which is exactly what the road service sells.
  { name: "Nepal", lat: 28.3, lon: 84.1, modes: ["land", "rail"], dx: 9, dy: -7, anchor: "start" },
  // Just below its own dot, in the band above Chennai's name — which now runs
  // east from x737 at y216 and would meet this one anywhere lower. Reachable
  // all three ways: Chittagong by sea, the eastern border by road and rail.
  { name: "Bangladesh", lat: 23.8, lon: 90.4, modes: ["sea", "land", "rail"], dx: 11, dy: 7, anchor: "start" },
  // Held one unit further out than the rest: it is the only destination label
  // that shares a band with the India cluster, and Mumbai's name reaches back
  // towards it.
  { name: "Middle East", lat: 24.5, lon: 54.4, modes: ["sea", "air"], dx: -10, dy: -8, anchor: "end" },
  { name: "UK", lat: 52.5, lon: -1.5, modes: ["sea", "air"], dx: -9, dy: -6, anchor: "end" },
  { name: "USA", lat: 39.8, lon: -98.5, modes: ["sea", "air"], dx: 0, dy: -12, anchor: "middle" },
  { name: "South East Asia", lat: 2.5, lon: 102.5, modes: ["sea", "air"], dx: 9, dy: 13, anchor: "start" },
  // Reads right so it never runs back into the UK label beside it.
  { name: "Europe", lat: 48.5, lon: 11.5, modes: ["sea", "air"], dx: 9, dy: -6, anchor: "start" },
  { name: "Africa", lat: 6, lon: 20, modes: ["sea", "air"], dx: 0, dy: 17, anchor: "middle" },
  { name: "China", lat: 32, lon: 112, modes: ["sea", "air"], dx: 9, dy: -7, anchor: "start" },
  { name: "Australia", lat: -25, lon: 134, modes: ["sea", "air"], dx: 0, dy: 17, anchor: "middle" },
];
