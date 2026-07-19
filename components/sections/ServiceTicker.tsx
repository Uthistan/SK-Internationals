import { Marquee } from "@/components/ui/Marquee";
import { MARQUEE_SERVICE_NAMES } from "@/content/services";

export function ServiceTicker() {
  return (
    <div className="border-b border-secondary/8 bg-secondary py-4.5">
      <Marquee direction="left">
        {MARQUEE_SERVICE_NAMES.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="text-caption font-semibold tracking-wide text-white/70"
          >
            {name}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
