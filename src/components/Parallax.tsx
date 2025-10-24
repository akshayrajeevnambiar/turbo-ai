import { type ReactNode } from "react";
import { useParallax } from "../lib/parallax";

interface ParallaxProps {
  children: ReactNode;
  depth: number;
  lerp?: number;
  className?: string;
}

export function Parallax({
  children,
  depth,
  lerp,
  className = "",
}: ParallaxProps) {
  const { ref, isDisabled } = useParallax({ depth, lerp });

  if (isDisabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
}
