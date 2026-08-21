"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
}

interface PanelPosition {
  left: number;
  width: number;
  top?: number;
  bottom?: number;
}

export default function Dropdown({ value, onChange, options }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<PanelPosition | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  function openDropdown() {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const estimatedPanelHeight = Math.min(options.length * 44 + 12, 260);
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openAbove = spaceBelow < estimatedPanelHeight && spaceAbove > spaceBelow;

    setPosition(
      openAbove
        ? { bottom: viewportHeight - rect.top + 6, left: rect.left, width: rect.width }
        : { top: rect.bottom + 6, left: rect.left, width: rect.width }
    );
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    function handleScroll() {
      setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  return (
    <div className="relative md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openDropdown())}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-[9px] border-[1.5px] border-line bg-[#fcfdff] px-[13px] py-3 text-left text-[14.5px] text-charcoal"
      >
        <span>{selected?.label ?? ""}</span>
        <ChevronDown className="h-3.5 w-3.5 flex-shrink-0 text-charcoal-soft" />
      </button>

      {open && position && (
        <div
          ref={panelRef}
          role="listbox"
          style={{
            position: "fixed",
            top: position.top,
            bottom: position.bottom,
            left: position.left,
            width: position.width,
          }}
          className="z-50 max-h-[260px] overflow-y-auto rounded-[10px] border border-line bg-white py-1.5 shadow-[var(--shadow-lg)]"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2.5 text-left text-[14.5px] ${
                option.value === value
                  ? "bg-blue-light font-medium text-blue"
                  : "text-charcoal"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
