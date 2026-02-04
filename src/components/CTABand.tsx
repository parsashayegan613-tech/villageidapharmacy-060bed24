import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTABandProps {
  headline: string;
  primaryAction: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryAction?: {
    label: string;
    href: string;
    external?: boolean;
  };
  className?: string;
}

export function CTABand({ headline, primaryAction, secondaryAction, className }: CTABandProps) {
  return (
    <section className={cn("py-16 bg-primary text-primary-foreground", className)}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{headline}</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryAction.external ? (
            <Button asChild size="lg" variant="secondary" className="shadow-soft">
              <a href={primaryAction.href}>{primaryAction.label}</a>
            </Button>
          ) : (
            <Button asChild size="lg" variant="secondary" className="shadow-soft">
              <Link to={primaryAction.href}>{primaryAction.label}</Link>
            </Button>
          )}
          {secondaryAction && (
            secondaryAction.external ? (
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              </Button>
            ) : (
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
