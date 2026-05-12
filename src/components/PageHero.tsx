import { ReactNode } from "react";
import Image from "next/image";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  image?: {
    src: string;
    alt: string;
    className?: string;
  };
  icon?: LucideIcon;
  actions?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
  centered?: boolean;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  icon: Icon,
  actions,
  children,
  compact = false,
  centered = false,
  className,
}: PageHeroProps) {
  const hasMedia = Boolean(image);

  return (
    <section
      className={cn(
        "bg-secondary relative overflow-hidden noise border-b border-border/40",
        compact ? "py-14 md:py-20" : "py-16 md:py-24 lg:py-28",
        className,
      )}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div
          className={cn(
            "grid gap-10 lg:gap-16 items-center",
            hasMedia ? "md:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]" : "max-w-3xl",
            centered && !hasMedia && "mx-auto text-center",
          )}
        >
          <div className={cn(centered && !hasMedia && "mx-auto")}>
            {Icon && (
              <div className={cn("w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6", centered && "mx-auto")}>
                <Icon className="h-6 w-6 text-primary" />
              </div>
            )}
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">{eyebrow}</p>
            <h1 className="text-display-sm md:text-display font-serif text-foreground mb-5 text-balance">
              {title}
            </h1>
            {description && (
              <div className="text-lg text-muted-foreground leading-relaxed max-w-2xl space-y-4">
                {description}
              </div>
            )}
            {children}
            {actions && (
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {actions}
              </div>
            )}
          </div>

          {image && (
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lift border border-border/60 bg-muted hidden md:block">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                quality={76}
                className={cn("object-cover", image.className)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
