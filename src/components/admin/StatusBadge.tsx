import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; className: string }> = {
    pending: { label: "Pending", className: "bg-amber-100 text-amber-800 border-amber-200" },
    confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-800 border-blue-200" },
    completed: { label: "Completed", className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800 border-red-200" },
    unread: { label: "Unread", className: "bg-amber-100 text-amber-800 border-amber-200" },
    read: { label: "Read", className: "bg-slate-100 text-slate-600 border-slate-200" },
    replied: { label: "Replied", className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
};

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status] || { label: status, className: "bg-gray-100 text-gray-800 border-gray-200" };
    return (
        <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
            config.className,
            className
        )}>
            {config.label}
        </span>
    );
}
