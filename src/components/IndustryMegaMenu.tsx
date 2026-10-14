import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { industryNavigation, tokens } from "../content/turboai";
import { SectionLink } from "./SectionLink";

interface IndustryMegaMenuProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

export function IndustryMegaMenu({ mobile = false, onItemClick }: IndustryMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof window.setTimeout> | undefined>(undefined);
  const clickPointerTypeRef = useRef<string | undefined>(undefined);
  const panelId = useId();
  const { pathname } = useLocation();
  const isActive = pathname === industryNavigation.href || pathname.startsWith("/industries/");

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== undefined) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = undefined;
    }
  }, []);

  const closeAfterNavigation = () => {
    clearCloseTimer();
    setIsOpen(false);
    onItemClick?.();
  };

  useEffect(() => {
    clearCloseTimer();
    setIsOpen(false);
  }, [pathname, clearCloseTimer]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  useEffect(() => {
    if (!isOpen) return;

    const dismissOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        clearCloseTimer();
        setIsOpen(false);
      }
    };
    const breakpoint = window.matchMedia("(min-width: 1280px)");
    const dismissOnResize = () => {
      clearCloseTimer();
      setIsOpen(false);
    };
    document.addEventListener("pointerdown", dismissOutside);
    breakpoint.addEventListener("change", dismissOnResize);
    return () => {
      clearCloseTimer();
      document.removeEventListener("pointerdown", dismissOutside);
      breakpoint.removeEventListener("change", dismissOnResize);
    };
  }, [isOpen, clearCloseTimer]);

  return (
    <div
      ref={containerRef}
      className={mobile ? undefined : "flex items-center"}
      style={mobile ? undefined : { height: tokens.layout.headerH }}
      onPointerEnter={(event) => {
        if (mobile || event.pointerType !== "mouse") return;
        clearCloseTimer();
        setIsOpen(true);
      }}
      onPointerLeave={(event) => {
        if (mobile || event.pointerType !== "mouse") return;
        clearCloseTimer();
        // Allow the pointer to cross the space between the trigger and panel.
        closeTimerRef.current = window.setTimeout(() => {
          closeTimerRef.current = undefined;
          const focusedElement = document.activeElement;
          const hasFocusedLink = panelRef.current?.contains(focusedElement);
          const hasKeyboardTrigger = focusedElement === triggerRef.current && focusedElement?.matches(":focus-visible");
          if (!hasFocusedLink && !hasKeyboardTrigger) setIsOpen(false);
        }, 200);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          clearCloseTimer();
          setIsOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          event.preventDefault();
          event.stopPropagation();
          clearCloseTimer();
          setIsOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={mobile
          ? `mobile-nav-link w-full flex items-center justify-between ${isActive ? "aria-current" : ""}`
          : `nav-link inline-flex items-center gap-1.5 whitespace-nowrap hover:text-emeraldNeon transition-colors duration-200 ${isActive || isOpen ? "aria-current text-emeraldNeon" : ""}`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={`${industryNavigation.label} menu`}
        onPointerDown={(event) => {
          clickPointerTypeRef.current = event.pointerType;
        }}
        onClick={(event) => {
          clearCloseTimer();
          // A mouse click keeps the panel opened by hover; touch and keyboard toggle it.
          const mouseClick = !mobile && event.detail > 0 && clickPointerTypeRef.current === "mouse";
          setIsOpen(mouseClick || !isOpen);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            clearCloseTimer();
            setIsOpen(true);
            requestAnimationFrame(() => panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
          }
        }}
      >
        <span className={mobile ? "" : "leading-none"}>{industryNavigation.label}</span>
        <svg className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          id={panelId}
          className={mobile
            ? "border-b border-white/10 bg-[#0b1628] px-6 py-7"
            : "absolute inset-x-8 top-full z-50 mx-auto max-w-[1440px] overflow-y-auto overscroll-contain rounded-b-2xl border border-white/10 bg-[#0b1628] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"}
          style={mobile ? undefined : { maxHeight: `calc(100dvh - ${tokens.layout.headerH + 16}px)` }}
        >
          <div className={mobile ? "space-y-7" : "grid grid-cols-[1.1fr_repeat(3,minmax(0,1fr))] gap-8 p-8 2xl:gap-10 2xl:p-10"}>
            <div className={mobile ? "border-b border-white/10 pb-4" : "border-r border-white/10 pr-8"}>
              {!mobile && (
                <>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-300">Industries We Serve</p>
                  <p className="text-2xl font-semibold leading-tight tracking-tight text-white 2xl:text-[28px]">AI built around your industry.</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">Explore practical AI solutions shaped by your data, operations, and business priorities.</p>
                </>
              )}
              <SectionLink href={industryNavigation.href} onClick={closeAfterNavigation} className={`${mobile ? "" : "mt-6"} inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-blue-300 transition-colors hover:text-white`}>
                View all industries <span aria-hidden="true">→</span>
              </SectionLink>
            </div>

            {industryNavigation.groups.map((group, groupIndex) => (
              <div key={group.label}>
                <p id={`${panelId}-group-${groupIndex}`} className={`${mobile ? "" : "min-h-9"} mb-3 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.1em] text-slate-400`}>{group.label}</p>
                <ul aria-labelledby={`${panelId}-group-${groupIndex}`} className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <SectionLink
                        href={item.href}
                        onClick={closeAfterNavigation}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={`group -mx-3 flex min-h-11 items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm leading-snug transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:bg-white/[0.06] ${pathname === item.href ? "bg-blue-500/10 text-blue-300" : "text-slate-200"}`}
                      >
                        <span>{item.label}</span>
                        <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-blue-300 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-6-6 6 6-6 6" />
                        </svg>
                      </SectionLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
