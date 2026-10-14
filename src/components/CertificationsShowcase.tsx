import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { frameworkGroups } from "../content/certifications";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Container, Section } from "./Container";

export function CertificationsShowcase() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateNavigation = () => {
      setCanGoBack(track.scrollLeft > 2);
      setCanGoForward(track.scrollLeft < track.scrollWidth - track.clientWidth - 2);
    };
    updateNavigation();
    const observer = new ResizeObserver(updateNavigation);
    observer.observe(track);
    track.addEventListener("scroll", updateNavigation, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", updateNavigation);
    };
  }, []);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: reducedMotion ? "instant" : "smooth",
    });
  };

  return (
    <Section id="certifications" className="border-y border-white/5 bg-charcoalDeep/40">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="certifications-heading" className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Corresponding Frameworks</h2>
        </div>
        <div className="mt-8 flex justify-end gap-3" role="group" aria-label="Framework slider controls">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={!canGoBack}
            aria-label="Previous frameworks"
            aria-controls="framework-slider"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-emeraldNeon hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emeraldNeon disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={!canGoForward}
            aria-label="Next frameworks"
            aria-controls="framework-slider"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-emeraldNeon hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emeraldNeon disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <ul
          ref={trackRef}
          id="framework-slider"
          tabIndex={0}
          aria-label="Frameworks. Use the left and right arrow keys to browse."
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowLeft" ? -1 : 1);
            } else if (event.key === "Home" || event.key === "End") {
              event.preventDefault();
              const track = trackRef.current;
              track?.scrollTo({
                left: event.key === "Home" ? 0 : track.scrollWidth,
                behavior: reducedMotion ? "instant" : "smooth",
              });
            }
          }}
          className="scrollbar-hide mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-xl pb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emeraldNeon"
        >
          {frameworkGroups.map(({ id, label }) => (
            <li
              key={id}
              className="flex min-h-36 basis-[85%] shrink-0 snap-start items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] px-6 py-8 text-center text-xl font-semibold leading-relaxed text-white transition-colors hover:border-emeraldTint/60 hover:bg-white/[0.06] sm:basis-[calc(50%_-_0.5rem)] lg:basis-[calc(33.333333%_-_0.666667rem)] lg:text-2xl"
            >
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
