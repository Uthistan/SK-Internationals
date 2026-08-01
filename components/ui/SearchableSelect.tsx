"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { inputClasses } from "@/components/ui/FormField";
import { cn } from "@/lib/utils";

export interface SearchableOption {
  value: string;
  label: string;
  /** Matched against the query; falls back to `label`. */
  name?: string;
}

interface SearchableSelectProps {
  id: string;
  options: SearchableOption[];
  value: string;
  onChange: (value: string) => void;
  /** Marks the field touched — the caller passes react-hook-form's `onBlur`. */
  onBlur?: () => void;
  placeholder?: string;
  invalid?: boolean;
  required?: boolean;
  "aria-describedby"?: string;
}

/**
 * A select you can type into, for lists too long to scan — a native `<select>`
 * has no search, and 250 countries is past the point where scrolling one is
 * reasonable.
 *
 * Built on `inputClasses` rather than styled independently so it stays visually
 * identical to every other control in the form, and follows the ARIA combobox
 * pattern so it is operable by keyboard and announced correctly. Prefer the
 * native `Select` in FormField for short lists; this exists only where search
 * earns its complexity.
 */
export function SearchableSelect({
  id,
  options,
  value,
  onChange,
  onBlur,
  placeholder,
  invalid,
  required,
  "aria-describedby": describedBy,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  /** `null` means "not searching", so the input shows the current selection. */
  const [query, setQuery] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = `${id}-listbox`;

  const selected = options.find((option) => option.value === value);

  const filtered = useMemo(() => {
    const term = query?.trim().toLowerCase();
    if (!term) return options;
    return options.filter((option) =>
      (option.name ?? option.label).toLowerCase().includes(term),
    );
  }, [options, query]);

  // The filtered list can shrink under the cursor as the user types, so the
  // index is clamped at read time rather than trusted from state.
  const active = Math.min(activeIndex, Math.max(filtered.length - 1, 0));

  function close() {
    setOpen(false);
    setQuery(null);
  }

  function openList() {
    if (open) return;
    setOpen(true);
    setActiveIndex(
      Math.max(
        filtered.findIndex((option) => option.value === value),
        0,
      ),
    );
  }

  function select(option: SearchableOption) {
    onChange(option.value);
    close();
  }

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        if (!open) {
          openList();
          return;
        }
        if (filtered.length === 0) return;
        const step = event.key === "ArrowDown" ? 1 : -1;
        setActiveIndex((active + step + filtered.length) % filtered.length);
        return;
      }
      case "Home":
        if (!open) return;
        event.preventDefault();
        setActiveIndex(0);
        return;
      case "End":
        if (!open) return;
        event.preventDefault();
        setActiveIndex(filtered.length - 1);
        return;
      case "Enter":
        if (!open) return;
        // Only swallow the key when it resolves to a choice, so Enter still
        // submits the form when the list is open on an empty result.
        if (filtered[active]) {
          event.preventDefault();
          select(filtered[active]);
        }
        return;
      case "Escape":
        if (!open) return;
        event.preventDefault();
        close();
        return;
      case "Tab":
        close();
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input
        id={id}
        type="text"
        role="combobox"
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholder}
        // Shows the typed query while searching, the selection otherwise.
        value={query ?? selected?.label ?? ""}
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={
          open && filtered[active] ? `${id}-option-${filtered[active].value}` : undefined
        }
        aria-autocomplete="list"
        aria-invalid={invalid || undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy}
        className={cn(inputClasses, "pr-12", invalid && "border-error")}
        onClick={openList}
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          close();
          onBlur?.();
        }}
      />
      <ChevronDown
        aria-hidden="true"
        size={18}
        strokeWidth={2}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-text-secondary"
      />

      {open && (
        <ul
          id={listboxId}
          ref={listRef}
          role="listbox"
          aria-label={placeholder}
          // Lenis binds the wheel at the document and drives the page itself,
          // so without this the list cannot scroll — the page scrolls under it
          // instead. Opting the subtree out hands the wheel back to the browser.
          data-lenis-prevent
          className="absolute z-20 mt-1.5 max-h-64 w-full overflow-y-auto overscroll-contain rounded-md border border-border bg-surface py-1.5 shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-2.5 text-body text-text-secondary">
              No countries match that search.
            </li>
          ) : (
            filtered.map((option, index) => {
              const isActive = index === active;
              return (
                <li
                  key={option.value}
                  id={`${id}-option-${option.value}`}
                  role="option"
                  aria-selected={option.value === value}
                  data-active={isActive || undefined}
                  onMouseMove={() => setActiveIndex(index)}
                  // Held on the option rather than the list: on the list it
                  // would also swallow mousedown on the scrollbar and make the
                  // thumb undraggable. Here it only stops the click from
                  // blurring the input and closing the list before it lands.
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => select(option)}
                  className={cn(
                    "cursor-pointer px-4 py-2.5 text-body text-text",
                    isActive && "bg-surface-alt",
                    option.value === value && "font-medium",
                  )}
                >
                  {option.label}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
