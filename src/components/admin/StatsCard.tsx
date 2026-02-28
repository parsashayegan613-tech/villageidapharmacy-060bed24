import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    icon: LucideIcon;
    label: string;
    count: number;
    color?: string;
    onClick?: () => void;
}

export function StatsCard({ icon: Icon, label, count, color = "text-primary", onClick }: StatsCardProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "bg-card rounded-2xl p-6 border border-border/60 text-left transition-all hover:shadow-md hover:-translate-y-0.5",
                onClick && "cursor-pointer"
            )}
        >
            <div className="flex items-center justify-between mb-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-primary/8", color)}>
                    <Icon className="h-5 w-5" />
                </div>
                <span className="text-3xl font-bold text-foreground">{count}</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
        </button>
    );
}
