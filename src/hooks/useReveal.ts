import { useEffect, useRef, useState } from "react";
import { tokens } from "../content/turboai";

// Check if user prefers reduced motion
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Hook for reveal animations with IntersectionObserver
export function useReveal(staggerMs: number = 60) {
  const elementsRef = useRef<HTMLElement[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    if (isReduced) {
      // Skip animations if user prefers reduced motion
      elementsRef.current.forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add delay based on stagger and element index
            const element = entry.target as HTMLElement;
            const delay = index * staggerMs;

            setTimeout(() => {
              element.classList.add("revealed");
            }, delay);

            // Stop observing once revealed
            observerRef.current?.unobserve(element);
          }
        });
      },
      {
        rootMargin: "-10% 0px -10% 0px",
        threshold: 0.1,
      }
    );

    // Observe all elements
    elementsRef.current.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [staggerMs, isReduced]);

  const addElement = (element: HTMLElement | null) => {
    if (element && !elementsRef.current.includes(element)) {
      elementsRef.current.push(element);

      // Add reveal class if not reduced motion
      if (!isReduced) {
        element.classList.add("reveal");
      }

      // Observe immediately if observer exists
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    }
  };

  return { addElement };
}

// Hook for GPU-optimized animations
export function useGpuAnimation() {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      // Add will-change for GPU acceleration
      element.style.willChange = "transform, opacity";

      return () => {
        // Clean up will-change when unmounted
        element.style.willChange = "auto";
      };
    }
  }, []);

  return elementRef;
}

// Utility to check if animations should be disabled
export function shouldReduceMotion(): boolean {
  return prefersReducedMotion();
}

// Utility to get safe transition duration
export function getTransitionDuration(): number {
  return shouldReduceMotion() ? 0 : tokens.motion.transitionMs;
}
