import { useState, useRef, useEffect, useCallback, useId } from "react";
import { useLocation } from "react-router-dom";
import type { DropdownItem } from "../content/turboai";
import { SectionLink } from "./SectionLink";

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  className?: string;
  openOnHover?: boolean;
}

export function Dropdown({ label, items, className = "", openOnHover = false }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof window.setTimeout> | undefined>(undefined);
  const clickPointerTypeRef = useRef<string | undefined>(undefined);
  const panelId = useId();
  const location = useLocation();

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== undefined) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = undefined;
    }
  }, []);

  const closeMenu = useCallback(() => {
    clearCloseTimer();
    setIsOpen(false);
  }, [clearCloseTimer]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  useEffect(() => {
    if (openOnHover) closeMenu();
  }, [location.pathname, openOnHover, closeMenu]);

  useEffect(() => {
    if (!openOnHover || !isOpen) return;
    const breakpoint = window.matchMedia("(min-width: 1280px)");
    breakpoint.addEventListener("change", closeMenu);
    return () => breakpoint.removeEventListener("change", closeMenu);
  }, [openOnHover, isOpen, closeMenu]);

  const isAnyChildActive = items.some(
    (item) => !item.external && (location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href)))
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const eventType = openOnHover ? "pointerdown" : "mousedown";
    document.addEventListener(eventType, handleClickOutside);
    return () => document.removeEventListener(eventType, handleClickOutside);
  }, [openOnHover, closeMenu]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        if (openOnHover && isOpen) triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [openOnHover, isOpen, closeMenu]);

  return (
    <div
      ref={dropdownRef}
      className={`relative ${className}`}
      onPointerEnter={(event) => {
        if (!openOnHover || event.pointerType !== "mouse") return;
        clearCloseTimer();
        setIsOpen(true);
      }}
      onPointerLeave={(event) => {
        if (!openOnHover || event.pointerType !== "mouse") return;
        clearCloseTimer();
        closeTimerRef.current = window.setTimeout(() => {
          closeTimerRef.current = undefined;
          const focusedElement = document.activeElement;
          const hasFocusedLink = panelRef.current?.contains(focusedElement);
          const hasKeyboardTrigger = focusedElement === triggerRef.current && focusedElement?.matches(":focus-visible");
          if (!hasFocusedLink && !hasKeyboardTrigger) setIsOpen(false);
        }, 200);
      }}
      onBlur={openOnHover ? (event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) closeMenu();
      } : undefined}
    >
      <button
        ref={triggerRef}
        type="button"
        onPointerDown={(event) => {
          clickPointerTypeRef.current = event.pointerType;
        }}
        onClick={(event) => {
          clearCloseTimer();
          const mouseClick = openOnHover && event.detail > 0 && clickPointerTypeRef.current === "mouse";
          setIsOpen(mouseClick || !isOpen);
        }}
        onKeyDown={openOnHover ? (event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            clearCloseTimer();
            setIsOpen(true);
            requestAnimationFrame(() => panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
          }
        } : undefined}
        className={`nav-link inline-flex items-center gap-1.5 whitespace-nowrap hover:text-emeraldNeon transition-colors duration-200 cursor-pointer ${
          isAnyChildActive ? "aria-current text-emeraldNeon" : ""
        }`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="true"
        aria-label={`${label} menu`}
      >
        <span className="leading-none">{label}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
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
        <div ref={panelRef} id={panelId} className="absolute top-full left-0 mt-2 min-w-[280px] w-max max-w-sm bg-charcoalDeep/95 backdrop-blur-md border border-emeraldTint/20 rounded-lg shadow-xl z-50">
          {/* Fill the margin with a transparent hover target without moving the panel. */}
          {openOnHover && <span aria-hidden="true" className="absolute -top-3 left-0 right-0 h-3" />}
          <div className="py-2">
            {items.map((item, index) => (
              <SectionLink
                key={index}
                href={item.href}
                className="block px-4 py-2.5 text-sm text-white/85 hover:text-white hover:bg-emeraldTint/15 transition-colors duration-200"
                onClick={closeMenu}
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
