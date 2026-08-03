"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { CORRIDOR_STYLE, type CorridorStyle } from "@/lib/corridors";
import { cn } from "@/lib/utils";

import type { CorridorMode } from "@/content/network";

export interface Corridor {
  name: string;
  /** Arc from the gateway to the region, in map user space. */
  path: string;
  /**
   * Which network the corridor belongs to. Colour, weight, dash, and the
   * direction of the bow are what tell the four modes apart — see
   * CORRIDOR_STYLE for the treatment per mode.
   */
  mode: CorridorMode;
}

interface RouteTracesProps {
  corridors: Corridor[];
}

/** A corridor with its treatment and its place in the entry sequence resolved. */
interface Lane extends Corridor {
  style: CorridorStyle;
  /** Seconds after the map enters view before this lane starts. */
  delay: number;
}

/**
 * Paint order, thinnest and quietest first. Sea is absent because it is placed
 * last by definition — it is the primary network, and it belongs on top of
 * everything the map draws.
 */
const SECONDARY_ORDER: CorridorMode[] = ["rail", "land", "air"];

/** Offsets between sea lanes, so the network arrives as a sequence. */
const DRAW_STAGGER_SECONDS = 0.12;

/** Held until the sea lanes have essentially landed. */
const SECONDARY_DELAY_SECONDS = 0.5;
const SECONDARY_STAGGER_SECONDS = 0.06;

/**
 * Spread across the light's own 6s cycle, so the lights sit evenly around the
 * loop instead of setting off together.
 */
const LIGHT_STAGGER_SECONDS = 0.66;
const LIGHT_RADIUS = 1.5;

/**
 * Splits the corridors into the order they are painted and the order they
 * arrive in. Sea draws first and paints last; everything else fades in
 * underneath once the sea lanes have landed.
 */
function toLanes(corridors: Corridor[]): Lane[] {
  const withStyle = corridors.map((corridor) => ({
    ...corridor,
    style: CORRIDOR_STYLE[corridor.mode],
  }));

  const secondary = withStyle
    .filter((lane) => !lane.style.primary)
    .sort(
      (a, b) =>
        SECONDARY_ORDER.indexOf(a.mode) - SECONDARY_ORDER.indexOf(b.mode),
    )
    .map((lane, index) => ({
      ...lane,
      delay: SECONDARY_DELAY_SECONDS + index * SECONDARY_STAGGER_SECONDS,
    }));

  const primary = withStyle
    .filter((lane) => lane.style.primary)
    .map((lane, index) => ({ ...lane, delay: index * DRAW_STAGGER_SECONDS }));

  return [...secondary, ...primary];
}

/**
 * Route overlay for the network map, drawn on when the map first comes into
 * view rather than on page load — the map sits well below the fold, so a
 * load-time animation would be over before anyone saw it.
 *
 * Deliberately the only client component in this map: keeping it separate from
 * `WorldMap` leaves the 33KB land silhouette server-rendered instead of
 * shipping it in the bundle.
 */
export function RouteTraces({ corridors }: RouteTracesProps) {
  const groupRef = useRef<SVGGElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const lanes = useMemo(() => toLanes(corridors), [corridors]);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // Observe the <svg>, not the group: a group of fully-retracted paths can
    // measure as an empty box and never report an intersection.
    const target = group.ownerSVGElement ?? group;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasEntered(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <g ref={groupRef}>
      {lanes.map((lane, index) => {
        const { style } = lane;
        // Custom properties are how the mode table reaches the stylesheet that
        // scales strokes for small viewports; React's CSSProperties has no slot
        // for them, so the object is asserted rather than typed loosely.
        const laneStyle = {
          "--map-lane-width": String(style.width),
          animationDelay: `${lane.delay}s`,
        } as CSSProperties;

        const laneClass = cn(
          "map-lane",
          style.primary ? "map-lane--draws" : "map-lane--fades",
          hasEntered && "map-lane--entered",
        );

        return (
          <g key={`${lane.mode}-${lane.name}`}>
            {/* A wider wash of the lane's own colour, drawn beneath it and
                animated in step, so the sea corridors carry a glow without a
                blur filter re-rendering the whole map every frame. */}
            {style.halo && (
              <path
                d={lane.path}
                pathLength={1}
                fill="none"
                stroke={style.stroke}
                strokeOpacity={style.halo.opacity}
                strokeLinecap="round"
                className={laneClass}
                style={
                  {
                    ...laneStyle,
                    "--map-lane-width": String(style.halo.width),
                  } as CSSProperties
                }
              />
            )}

            {/* pathLength normalises the route to a single unit so one duration
                draws a short hop and an ocean crossing at the same apparent
                speed — but it normalises stroke-dasharray with it, which turns
                a 4-unit dash into four whole path lengths and renders a dashed
                lane solid. Only the lanes that actually draw are normalised. */}
            <path
              d={lane.path}
              pathLength={style.primary ? 1 : undefined}
              fill="none"
              stroke={style.stroke}
              strokeWidth={style.width}
              strokeOpacity={style.opacity}
              strokeDasharray={style.dash}
              strokeLinecap="round"
              className={laneClass}
              style={laneStyle}
            />

            {/* Mounted only once the map has been seen, so no light sits parked
                at an origin waiting for its cue. Carried by the sea lanes alone:
                one moving element per primary corridor is the whole of the
                map's continuous motion, and it is what says the network is
                worked rather than illustrated. */}
            {hasEntered && style.primary && (
              <circle
                r={LIGHT_RADIUS}
                fill="var(--color-map-surface)"
                stroke={style.stroke}
                strokeWidth="1"
                className="map-light"
                style={{
                  offsetPath: `path("${lane.path}")`,
                  animationDelay: `${index * LIGHT_STAGGER_SECONDS}s`,
                }}
              />
            )}
          </g>
        );
      })}
    </g>
  );
}
