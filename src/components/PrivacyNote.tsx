import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PrivacyNoteProps = {
  children?: ReactNode;
  className?: string;
};

export function PrivacyNote({ children, className }: PrivacyNoteProps) {
  return (
    <div className={cn("flex items-start gap-3 rounded-2xl border border-border/60 bg-secondary/70 p-4 text-sm text-muted-foreground", className)}>
      <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
      <p className="leading-relaxed">
        {children ?? "Your request is sent securely to our pharmacy team and used only to prepare and follow up on your pharmacy care."}
      </p>
    </div>
  );
}
