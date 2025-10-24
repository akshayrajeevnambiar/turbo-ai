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
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const announcedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  const meta = useMemo(() => {
    const parsed = parseFormattedNumber(value);
    // Debug logging
    console.log(`StatNumber parsing "${value}":`, parsed);
    return parsed;
  }, [value]);

  // Start value should be 10-25% higher than target for countdown effect
  const start = useMemo(() => {
    const multiplier = 1.1 + Math.random() * 0.15; // 1.1 to 1.25
    return Math.max(meta.numeric * multiplier, meta.numeric + 1);
  }, [meta.numeric]);

  // Cubic ease-out for smooth deceleration
  const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

  // Watch for the parent element to be revealed by IntersectionObserver
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if the parent container has the 'revealed' class
    const checkRevealed = () => {
      const parent = element.closest('.reveal');
      const isRevealed = parent && parent.classList.contains('revealed');
      console.log(`StatNumber "${value}" reveal check:`, { parent: !!parent, isRevealed });
      if (isRevealed) {
        setShouldAnimate(true);
      }
    };

    // Initial check
    checkRevealed();

    // Set up a MutationObserver to watch for class changes on parent
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkRevealed();
        }
      });
    });

    // Find the parent with reveal class and observe it
    const revealParent = element.closest('.reveal');
    if (revealParent) {
      observer.observe(revealParent, {
        attributes: true,
        attributeFilter: ['class'],
      });
    } else {
      // If no reveal parent found, start animation immediately
      setShouldAnimate(true);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Reset announcement flag when value changes
    announcedRef.current = false;

    // If reduced motion is preferred, value is not numeric, or animation shouldn't start yet
    if (reduced || isNaN(meta.numeric) || !shouldAnimate) {
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
        const flickerIntensity = (1 - progress / 0.55) * 0.02; // Decreases from 2% to 0%
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
  }, [value, durationMs, delayMs, flicker, reduced, meta.numeric, start, shouldAnimate]);

  return (
    <span
      ref={elementRef}
      aria-live="polite"
      className={className}
      style={{
        // Micro-glow effect using emeraldTint at low opacity for premium feel
        textShadow: `0 0 10px ${tokens.colors.emeraldTint}1A`, // 1A = ~10% opacity in hex
        letterSpacing: "-0.01em",
        color: tokens.colors.white,
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
