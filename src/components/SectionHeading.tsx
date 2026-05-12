import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  centered?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, centered = false, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-xl mb-12 md:mb-14", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-display-sm font-serif text-foreground mb-4 text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
