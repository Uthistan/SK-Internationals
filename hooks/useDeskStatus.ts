"use client";

import { useSyncExternalStore } from "react";

// Counter hours as minutes past midnight, IST. Sunday is closed. The operations
// desk runs past these and says so on its own row — this is the front counter.
const OPENS_AT = 9 * 60 + 30;
const CLOSES_AT = 18 * 60 + 30;

const MINUTE = 60_000;

export interface DeskStatus {
  open: boolean;
  /** 24-hour IST clock, to the minute. Seconds would read as a widget. */
  time: string;
}

function subscribe(callback: () => void) {
  const id = setInterval(callback, MINUTE);
  return () => clearInterval(id);
}

/**
 * A string, not an object: `useSyncExternalStore` compares snapshots by
 * identity, and a fresh object every call would re-render forever. It changes
 * only when the displayed minute does.
 */
function getSnapshot(): string {
  const now = new Date();
  // IST is a fixed UTC+5:30 offset, so the shift is arithmetic — no timezone
  // database, and no dependence on where the visitor happens to be sitting.
  const ist = new Date(now.getTime() + (330 + now.getTimezoneOffset()) * MINUTE);
  const minutes = ist.getHours() * 60 + ist.getMinutes();
  const open = ist.getDay() !== 0 && minutes >= OPENS_AT && minutes < CLOSES_AT;
  const time = `${String(ist.getHours()).padStart(2, "0")}:${String(ist.getMinutes()).padStart(2, "0")}`;

  return `${open ? "open" : "closed"} ${time}`;
}

/** Empty on the server, so the markup falls back to the published hours. */
function getServerSnapshot(): string {
  return "";
}

/**
 * Whether anyone is actually at the desk right now. Returns null until the
 * clock is readable on the client — the caller renders the published office
 * hours in the meantime, which is true at every hour of the week.
 */
export function useDeskStatus(): DeskStatus | null {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!snapshot) return null;

  const [state, time] = snapshot.split(" ");
  return { open: state === "open", time };
}
