import { useState } from "react";
import { LucideIcon, ChevronRight } from "lucide-react";
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
        "group relative bg-card rounded-2xl p-6 transition-all duration-500 cursor-pointer border border-border/60",
        "hover:border-primary/30 hover:shadow-lift hover:-translate-y-1",
        className
      )}
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={(e) => e.key === "Enter" && setIsExpanded(!isExpanded)}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-sans font-semibold text-foreground">{title}</h3>
            <ChevronRight className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-300 flex-shrink-0",
              isExpanded && "rotate-90"
            )} />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-1">{description}</p>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100 md:group-hover:mt-4"
        )}
      >
        <div className="pt-4 border-t border-border/60 space-y-2">
          {whoItsFor && (
            <div>
              <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider">Who it's for</span>
              <p className="text-sm text-muted-foreground">{whoItsFor}</p>
            </div>
          )}
          {howItWorks && (
            <div>
              <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider">How it works</span>
              <p className="text-sm text-muted-foreground">{howItWorks}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
