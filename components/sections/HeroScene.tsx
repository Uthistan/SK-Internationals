const HUBS = [
  { x: 150, y: 600 },
  { x: 500, y: 200 },
  { x: 900, y: 280 },
  { x: 1260, y: 540 },
  { x: 760, y: 700 },
];

// Static decorative network — no animation. Visual interest here comes from
// composition, not motion (see CLAUDE.md motion philosophy).
export function HeroScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        {HUBS.map((hub) => (
          <circle
            key={`${hub.x}-${hub.y}`}
            cx={hub.x}
            cy={hub.y}
            r={3}
            fill="rgba(255,255,255,.35)"
          />
        ))}
        <path
          d="M150,600 Q400,420 500,200"
          fill="none"
          stroke="rgba(255,255,255,.14)"
          strokeWidth={1}
          strokeDasharray="3 7"
        />
        <path
          d="M900,280 Q1100,420 1260,540"
          fill="none"
          stroke="rgba(255,255,255,.14)"
          strokeWidth={1}
          strokeDasharray="3 7"
        />
        <path
          d="M760,700 Q400,640 150,600"
          fill="none"
          stroke="rgba(255,255,255,.1)"
          strokeWidth={1}
          strokeDasharray="3 7"
        />
      </svg>
    </div>
  );
}
