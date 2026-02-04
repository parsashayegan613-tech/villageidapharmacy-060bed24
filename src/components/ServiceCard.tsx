import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  whoItsFor?: string;
  howItWorks?: string;
  className?: string;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  whoItsFor,
  howItWorks,
  className,
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "group bg-card rounded-2xl p-6 shadow-soft transition-all duration-300 cursor-pointer border border-border/50",
        "hover:shadow-lift hover:-translate-y-1",
        "md:hover:shadow-lift",
        className
      )}
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={(e) => e.key === "Enter" && setIsExpanded(!isExpanded)}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Expanded content - visible on mobile tap or desktop hover */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100 md:group-hover:mt-4"
        )}
      >
        <div className="pt-4 border-t border-border space-y-2">
          {whoItsFor && (
            <div>
              <span className="text-xs font-medium text-primary uppercase tracking-wide">Who it's for</span>
              <p className="text-sm text-muted-foreground">{whoItsFor}</p>
            </div>
          )}
          {howItWorks && (
            <div>
              <span className="text-xs font-medium text-primary uppercase tracking-wide">How it works</span>
              <p className="text-sm text-muted-foreground">{howItWorks}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
