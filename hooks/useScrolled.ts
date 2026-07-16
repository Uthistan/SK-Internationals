"use client";

import { useSyncExternalStore } from "react";

const THRESHOLD = 8;

function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getSnapshot() {
  return window.scrollY > THRESHOLD;
}

function getServerSnapshot() {
  return false;
}

export function useScrolled(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
