import { useEffect, useState } from "react";
import { tokens } from "../content/turboai";

interface ScrollJackerState {
  currentSection: number;
  isAnimating: boolean;
  isEnabled: boolean;
  sections: readonly string[];
}

// Check if scroll jacking should be disabled
const shouldDisableScrollJacking = (): boolean => {
  // Disable if user prefers reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  // Disable if not allowed in tokens
  if (!tokens.motion.allowScrollJacking) {
    return true;
  }

  return false;
};

// Global state management
let globalState: ScrollJackerState = {
  currentSection: 0,
  isAnimating: false,
  isEnabled: false,
  sections: tokens.motion.scrollJacking.enabledSections,
};

let touchStartY = 0;
let lastWheelTime = 0;

// Smooth scroll to section
function scrollToSection(
  sectionId: string,
  duration: number = tokens.motion.scrollJacking.stepDurationMs
) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  globalState.isAnimating = true;

  const targetY = element.offsetTop - tokens.layout.headerH;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out)
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentY = startY + distance * easedProgress;

    window.scrollTo(0, currentY);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      globalState.isAnimating = false;
      // Update hash without scroll
      history.replaceState(null, "", `#${sectionId}`);
    }
  }

  requestAnimationFrame(animate);
}

// Handle wheel events
function handleWheel(event: WheelEvent) {
  if (!globalState.isEnabled || globalState.isAnimating) return;

  const now = performance.now();
  const timeDiff = now - lastWheelTime;

  // Throttle wheel events
  if (timeDiff < tokens.motion.scrollJacking.wheelThrottleMs) return;

  lastWheelTime = now;
  event.preventDefault();

  const direction = event.deltaY > 0 ? 1 : -1;
  const nextIndex = globalState.currentSection + direction;

  if (nextIndex >= 0 && nextIndex < globalState.sections.length) {
    globalState.currentSection = nextIndex;
    scrollToSection(globalState.sections[nextIndex]);
  }
}

// Handle touch events
function handleTouchStart(event: TouchEvent) {
  if (!globalState.isEnabled) return;
  touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event: TouchEvent) {
  if (!globalState.isEnabled || globalState.isAnimating) return;

  const touchCurrentY = event.touches[0].clientY;
  const deltaY = touchStartY - touchCurrentY;

  // Check if swipe meets minimum threshold
  if (Math.abs(deltaY) < tokens.motion.scrollJacking.touchSwipeMin) return;

  event.preventDefault();

  const direction = deltaY > 0 ? 1 : -1;
  const nextIndex = globalState.currentSection + direction;

  if (nextIndex >= 0 && nextIndex < globalState.sections.length) {
    globalState.currentSection = nextIndex;
    scrollToSection(globalState.sections[nextIndex]);
  }
}

// Handle keyboard events (Escape to disable)
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Escape" && globalState.isEnabled) {
    globalState.isEnabled = false;
    // Store in session storage
    sessionStorage.setItem("scrollJackingDisabled", "true");
  }
}

// Update current section based on scroll position
function updateCurrentSection() {
  if (globalState.isAnimating) return;

  const scrollY = window.scrollY + tokens.layout.headerH + 100; // Offset for better detection

  for (let i = globalState.sections.length - 1; i >= 0; i--) {
    const element = document.getElementById(globalState.sections[i]);
    if (element && scrollY >= element.offsetTop) {
      globalState.currentSection = i;
      break;
    }
  }
}

// Hook for scroll jacking functionality
export function useScrollJacker() {
  const [isDisabled] = useState(shouldDisableScrollJacking);
  const [isSessionDisabled] = useState(
    () => sessionStorage.getItem("scrollJackingDisabled") === "true"
  );

  useEffect(() => {
    if (isDisabled || isSessionDisabled) {
      globalState.isEnabled = false;
      return;
    }

    globalState.isEnabled = true;

    // Add event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", updateCurrentSection, { passive: true });

    // Initial section detection
    updateCurrentSection();

    return () => {
      // Clean up event listeners
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", updateCurrentSection);
      globalState.isEnabled = false;
    };
  }, [isDisabled, isSessionDisabled]);

  // Navigation functions
  const goToSection = (sectionId: string) => {
    const index = globalState.sections.indexOf(sectionId);
    if (index !== -1) {
      globalState.currentSection = index;
      scrollToSection(sectionId);
    }
  };

  const nextSection = () => {
    const nextIndex = globalState.currentSection + 1;
    if (nextIndex < globalState.sections.length) {
      globalState.currentSection = nextIndex;
      scrollToSection(globalState.sections[nextIndex]);
    }
  };

  const prevSection = () => {
    const prevIndex = globalState.currentSection - 1;
    if (prevIndex >= 0) {
      globalState.currentSection = prevIndex;
      scrollToSection(globalState.sections[prevIndex]);
    }
  };

  return {
    isEnabled: globalState.isEnabled && !isDisabled && !isSessionDisabled,
    currentSection: globalState.sections[globalState.currentSection],
    currentIndex: globalState.currentSection,
    sections: globalState.sections,
    goToSection,
    nextSection,
    prevSection,
  };
}

// Utility to manually disable scroll jacking for the session
export function disableScrollJacking() {
  globalState.isEnabled = false;
  sessionStorage.setItem("scrollJackingDisabled", "true");
}

// Utility to check if scroll jacking is active
export function isScrollJackingActive(): boolean {
  return globalState.isEnabled && !shouldDisableScrollJacking();
}
