import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  icon: LucideIcon;
  step: number;
  title: string;
  description: string;
  className?: string;
}

export function StepCard({ icon: Icon, step, title, description, className }: StepCardProps) {
  return (
    <div className={cn("flex items-start gap-4", className)}>
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
          {step}
        </div>
      </div>
      <div className="pt-1">
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
