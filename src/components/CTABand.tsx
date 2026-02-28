import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

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
    <section className={cn("py-20 relative overflow-hidden", className)}>
      {/* Bold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(220,90%,28%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_50%)]" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl text-primary-foreground mb-8 font-serif">{headline}</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryAction.external ? (
            <Button asChild size="lg" variant="secondary" className="rounded-full px-8 shadow-soft gap-2">
              <a href={primaryAction.href}>{primaryAction.label}<ArrowRight className="h-4 w-4" /></a>
            </Button>
          ) : (
            <Button asChild size="lg" variant="secondary" className="rounded-full px-8 shadow-soft gap-2">
              <Link to={primaryAction.href}>{primaryAction.label}<ArrowRight className="h-4 w-4" /></Link>
            </Button>
          )}
          {secondaryAction && (
            secondaryAction.external ? (
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              </Button>
            ) : (
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
