import { useEffect, useMemo, useRef, useState } from "react";
import { formatNumberLike, parseFormattedNumber } from "../lib/numberFormat";
import { tokens } from "../content/turboai";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface StatNumberProps {
  value: string | number;
  durationMs?: number;
  delayMs?: number;
  flicker?: boolean;
  className?: string;
}

export default function StatNumber({
  value,
  durationMs = 1600,
  delayMs = 0,
  flicker = true,
  className = "",
}: StatNumberProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(String(value));
  const [hasStarted, setHasStarted] = useState(false);
  const announcedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  const meta = useMemo(() => parseFormattedNumber(value), [value]);

  // Start value should be 10-25% higher than target for countdown effect
  const start = useMemo(() => {
    const multiplier = 1.1 + Math.random() * 0.15; // 1.1 to 1.25
    return Math.max(meta.numeric * multiplier, meta.numeric + 1);
  }, [meta.numeric]);

  // Cubic ease-out for smooth deceleration
  const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

  // Use IntersectionObserver to trigger animation when element comes into view
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If reduced motion, start immediately
    if (reduced) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      {
        rootMargin: "0px 0px -20% 0px", // Start animation when element is 20% visible
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted, reduced]);

  useEffect(() => {
    // Reset announcement flag when value changes
    announcedRef.current = false;

    // If reduced motion is preferred, value is not numeric, or animation shouldn't start yet
    if (reduced || isNaN(meta.numeric) || !hasStarted) {
      setDisplay(String(value));
      return;
    }

    let startTime = 0;

    const animate = (currentTime: number) => {
      // Initialize start time with delay
      if (!startTime) {
        startTime = currentTime + delayMs;
      }

      const elapsed = Math.max(0, currentTime - startTime);

      // Still in delay period
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Calculate progress (0 to 1)
      const progress = Math.min(1, elapsed / durationMs);
      const easedProgress = easeOutCubic(progress);

      // Calculate current value
      const currentValue = start - (start - meta.numeric) * easedProgress;

      // Apply flicker effect during first 55% of animation
      let displayValue = currentValue;
      const flickerPhase = progress < 0.55 && flicker;

      if (flickerPhase) {
        // Gentle flicker - small random variation that decreases over time
        const flickerIntensity = (1 - progress / 0.55) * 0.04; // Slightly stronger flicker for visibility
        const jitter = (Math.random() - 0.5) * meta.numeric * flickerIntensity;
        displayValue += jitter;
      }

      // Update display with formatted value
      setDisplay(formatNumberLike(value, displayValue));

      // Continue animation or finalize
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else if (!announcedRef.current) {
        // Snap to exact final value and announce to screen readers
        setDisplay(formatNumberLike(value, meta.numeric));
        announcedRef.current = true;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [
    value,
    durationMs,
    delayMs,
    flicker,
    reduced,
    meta.numeric,
    start,
    hasStarted,
  ]);

  return (
    <span
      ref={elementRef}
      aria-live="polite"
      className={className}
      style={{
        // Blue glow effect using emeraldTint (now blue) for premium feel
        textShadow: `0 0 4px ${tokens.colors.emeraldNeon}4D, 0 0 8px ${tokens.colors.emeraldNeon}33, 0 0 12px ${tokens.colors.emeraldNeon}1A`, // Blue glow layers
        letterSpacing: "-0.01em",
        color: tokens.colors.emeraldNeon, // Use blue color instead of white
        // Reserve width to prevent layout shift
        minWidth: "1ch",
        display: "inline-block",
        fontVariantNumeric: "tabular-nums", // Monospace numbers for smoother animation
      }}
    >
      {display}
    </span>
  );
}
