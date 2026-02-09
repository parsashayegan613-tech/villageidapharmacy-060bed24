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
    <div className={cn("flex items-start gap-5", className)}>
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
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
