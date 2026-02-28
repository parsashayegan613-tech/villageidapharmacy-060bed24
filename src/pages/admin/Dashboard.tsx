import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatsCard } from "@/components/admin/StatsCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, RefreshCw, ArrowRightLeft, MessageSquare, Clock } from "lucide-react";
import { format } from "date-fns";

interface RecentItem {
    id: string;
    type: "appointment" | "refill" | "transfer" | "message";
    name: string;
    status: string;
    created_at: string;
}

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [counts, setCounts] = useState({ appointments: 0, refills: 0, transfers: 0, messages: 0 });
    const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const [appts, refills, transfers, msgs] = await Promise.all([
                supabase.from("appointments").select("id, client_name, status, created_at").eq("status", "pending"),
                supabase.from("refills").select("id, full_name, status, created_at").eq("status", "pending"),
                supabase.from("transfers").select("id, full_name, status, created_at").eq("status", "pending"),
                supabase.from("contact_messages").select("id, full_name, status, created_at").eq("status", "unread"),
            ]);

            setCounts({
                appointments: appts.data?.length || 0,
                refills: refills.data?.length || 0,
                transfers: transfers.data?.length || 0,
                messages: msgs.data?.length || 0,
            });

            // Merge and sort recent activity
            const recent: RecentItem[] = [
                ...(appts.data || []).map(r => ({ id: r.id, type: "appointment" as const, name: r.client_name, status: r.status, created_at: r.created_at })),
                ...(refills.data || []).map(r => ({ id: r.id, type: "refill" as const, name: r.full_name, status: r.status, created_at: r.created_at })),
                ...(transfers.data || []).map(r => ({ id: r.id, type: "transfer" as const, name: r.full_name, status: r.status, created_at: r.created_at })),
                ...(msgs.data || []).map(r => ({ id: r.id, type: "message" as const, name: r.full_name, status: r.status, created_at: r.created_at })),
            ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 10);

            setRecentItems(recent);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const typeLabels: Record<string, string> = { appointment: "Appointment", refill: "Refill", transfer: "Transfer", message: "Message" };
    const typeRoutes: Record<string, string> = { appointment: "/admin/appointments", refill: "/admin/refills", transfer: "/admin/transfers", message: "/admin/messages" };

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Overview of pending requests.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <StatsCard icon={Calendar} label="Pending Appointments" count={counts.appointments} onClick={() => navigate("/admin/appointments")} />
                <StatsCard icon={RefreshCw} label="Pending Refills" count={counts.refills} onClick={() => navigate("/admin/refills")} />
                <StatsCard icon={ArrowRightLeft} label="Pending Transfers" count={counts.transfers} onClick={() => navigate("/admin/transfers")} />
                <StatsCard icon={MessageSquare} label="Unread Messages" count={counts.messages} onClick={() => navigate("/admin/messages")} />
            </div>

            {/* Recent Activity */}
            <div>
                <h2 className="text-lg font-serif font-semibold text-foreground mb-4">Recent Activity</h2>
                {isLoading ? (
                    <div className="bg-card rounded-2xl border border-border/60 p-4 space-y-4">
                        {[1, 2, 3].map(i => (
                            <Skeleton key={i} className="h-10 w-full bg-muted/60" />
                        ))}
                    </div>
                ) : recentItems.length === 0 ? (
                    <div className="bg-card rounded-2xl p-8 border border-border/60 text-center">
                        <Clock className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                        <p className="text-muted-foreground">No pending requests yet.</p>
                        <p className="text-sm text-muted-foreground/60 mt-1">Submissions will appear here in real time.</p>
                    </div>
                ) : (
                    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden">
                        <div className="divide-y divide-border/60">
                            {recentItems.map((item) => (
                                <button
                                    key={`${item.type}-${item.id}`}
                                    onClick={() => navigate(typeRoutes[item.type])}
                                    className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{typeLabels[item.type]}</span>
                                            <StatusBadge status={item.status} />
                                        </div>
                                        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                        {format(new Date(item.created_at), "MMM d, h:mm a")}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
