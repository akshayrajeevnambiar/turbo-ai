import { useState, useRef, useEffect } from "react";
import type { DropdownItem } from "../content/turboai";
import { SectionLink } from "./SectionLink";

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  className?: string;
}

export function Dropdown({ label, items, className = "" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="nav-link flex items-center gap-1 hover:text-emeraldNeon transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${label} menu`}
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-charcoalDeep/95 backdrop-blur-md border border-emeraldTint/20 rounded-lg shadow-xl z-50">
          <div className="py-2">
            {items.map((item, index) => (
              <SectionLink
                key={index}
                href={item.href}
                className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-emeraldTint/10 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
                aria-label={
                  item.external
                    ? `Visit ${item.label} (opens in new tab)`
                    : `Navigate to ${item.label}`
                }
              >
                <div className="flex items-center justify-between">
                  {item.label}
                  {item.external && (
                    <svg
                      className="w-3 h-3 opacity-60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  )}
                </div>
              </SectionLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
