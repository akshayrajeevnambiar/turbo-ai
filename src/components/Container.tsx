import { type ReactNode, type ElementType, createElement } from "react";
import { tokens } from "../content/turboai";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`max-w-container mx-auto px-4 sm:px-6 lg:px-8 xl:px-gutter ${className}`}
      style={{ maxWidth: `${tokens.layout.maxWidth}px` }}
    >
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  as?: ElementType;
}

export function Section({
  children,
  id,
  className = "",
  as: Component = "section",
}: SectionProps) {
  return createElement(
    Component,
    {
      id,
      className: `py-12 sm:py-16 md:py-20 lg:py-sectionDesktop premium-section ${className}`,
      role: Component === "section" ? "region" : undefined,
      "aria-labelledby": id ? `${id}-heading` : undefined,
    },
    children
  );
}

interface DividerProps {
  animate?: boolean;
  className?: string;
}

export function Divider({ animate = false, className = "" }: DividerProps) {
  return (
    <div
      className={`divider ${animate ? "animate" : ""} ${className}`}
      style={{
        backgroundColor: tokens.colors.emeraldTint,
        opacity: tokens.lines.opacity,
        height: `${tokens.lines.thickness}px`,
      }}
    />
  );
}
