import { useEffect, useRef, useState } from "react";
import { tokens } from "../content/turboai";

interface ParallaxConfig {
  depth: number; // -0.6 to 0.6 range
  lerp?: number; // smoothing factor
}

// Check if parallax should be disabled
const shouldDisableParallax = (): boolean => {
  // Disable on mobile below threshold
  if (window.innerWidth < tokens.motion.parallax.mobileDisabledBelowPx) {
    return true;
  }

  // Disable if user prefers reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  // Disable if not allowed in tokens
  if (!tokens.motion.allowParallax) {
    return true;
  }

  return false;
};

// Global scroll position and RAF management
let isUpdating = false;
const parallaxElements = new Set<ParallaxElement>();

interface ParallaxElement {
  element: HTMLElement;
  config: ParallaxConfig;
  targetY: number;
  currentY: number;
}

// Single RAF loop for all parallax elements
function updateParallax() {
  if (parallaxElements.size === 0) {
    isUpdating = false;
    return;
  }

  parallaxElements.forEach((parallaxEl) => {
    const { element, config } = parallaxEl;

    // Calculate new target based on scroll
    const rect = element.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const distance = elementCenter - viewportCenter;

    // Apply depth with max depth constraint
    const maxDepth = tokens.motion.parallax.maxDepth;
    const clampedDepth = Math.max(-maxDepth, Math.min(maxDepth, config.depth));
    const newTargetY = distance * clampedDepth;

    // Smooth interpolation
    const lerp = config.lerp || tokens.motion.parallax.lerp;
    const newCurrentY =
      parallaxEl.currentY + (newTargetY - parallaxEl.targetY) * lerp;

    // Update element transform
    element.style.transform = `translate3d(0, ${newCurrentY}px, 0)`;

    // Update stored values
    parallaxEl.targetY = newTargetY;
    parallaxEl.currentY = newCurrentY;
  });

  requestAnimationFrame(updateParallax);
}

// Throttled scroll handler
function handleScroll() {
  if (!isUpdating && parallaxElements.size > 0) {
    isUpdating = true;
    requestAnimationFrame(updateParallax);
  }
}

// Hook for parallax effects
export function useParallax(config: ParallaxConfig) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isDisabled] = useState(shouldDisableParallax);

  useEffect(() => {
    if (isDisabled || !elementRef.current) return;

    const element = elementRef.current;
    const parallaxElement: ParallaxElement = {
      element,
      config,
      targetY: 0,
      currentY: 0,
    };

    // Add to global set
    parallaxElements.add(parallaxElement);

    // Set initial styles
    element.style.willChange = "transform";
    element.setAttribute("data-parallax", "true");
    element.setAttribute("data-depth", config.depth.toString());

    // Start listening to scroll if first element
    if (parallaxElements.size === 1) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });
    }

    return () => {
      // Clean up
      parallaxElements.delete(parallaxElement);
      element.style.willChange = "auto";
      element.style.transform = "";
      element.removeAttribute("data-parallax");
      element.removeAttribute("data-depth");

      // Remove listeners if no more elements
      if (parallaxElements.size === 0) {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
        isUpdating = false;
      }
    };
  }, [config, isDisabled]);

  return {
    ref: elementRef,
    isDisabled,
  };
}
