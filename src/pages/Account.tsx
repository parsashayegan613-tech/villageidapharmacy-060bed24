import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Calendar, RefreshCw, ArrowRightLeft, Clock, User, Mail, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface RequestItem {
    id: string;
    type: string;
    status: string;
    created_at: string;
    details: string;
}

export default function Account() {
    const { user, isLoading: authLoading, signOut } = useAuth();
    const navigate = useNavigate();
    const [requests, setRequests] = useState<RequestItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/login?redirect=/account");
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (!user) return;

        const fetchHistory = async () => {
            const userId = user.id;

            const [appts, refills, transfers] = await Promise.all([
                supabase.from("appointments").select("id, status, created_at, service_type, client_name").eq("user_id", userId),
                supabase.from("refills").select("id, status, created_at, full_name, delivery_type").eq("user_id", userId),
                supabase.from("transfers").select("id, status, created_at, full_name, current_pharmacy").eq("user_id", userId),
            ]);

            const items: RequestItem[] = [
                ...(appts.data || []).map(a => ({
                    id: a.id,
                    type: "Appointment",
                    status: a.status,
                    created_at: a.created_at,
                    details: `${a.service_type.replace("-", " ")} — ${a.client_name}`,
                })),
                ...(refills.data || []).map(r => ({
                    id: r.id,
                    type: "Refill",
                    status: r.status,
                    created_at: r.created_at,
                    details: `${r.delivery_type} — ${r.full_name}`,
                })),
                ...(transfers.data || []).map(t => ({
                    id: t.id,
                    type: "Transfer",
                    status: t.status,
                    created_at: t.created_at,
                    details: `From ${t.current_pharmacy} — ${t.full_name}`,
                })),
            ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

            setRequests(items);
            setIsLoading(false);
        };

        fetchHistory();
    }, [user]);

    if (authLoading) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
            </Layout>
        );
    }

    const typeIcons: Record<string, any> = {
        Appointment: Calendar,
        Refill: RefreshCw,
        Transfer: ArrowRightLeft,
    };

    return (
        <Layout>
            <SEOHead title="My Account | Village IDA Pharmacy" description="View your prescription history, appointments, and account details." />

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-3xl">
                    {/* Profile Header */}
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-serif font-bold text-foreground">
                                    {user?.user_metadata?.full_name || "My Account"}
                                </h1>
                                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                                    <Mail className="h-3.5 w-3.5" />
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full" onClick={signOut}>
                            Sign Out
                        </Button>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
                        <Button asChild variant="outline" className="rounded-xl h-auto py-4 flex flex-col gap-1.5">
                            <Link to="/appointments">
                                <Calendar className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium">Book Appointment</span>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="rounded-xl h-auto py-4 flex flex-col gap-1.5">
                            <Link to="/refill">
                                <RefreshCw className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium">Request Refill</span>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="rounded-xl h-auto py-4 flex flex-col gap-1.5">
                            <Link to="/transfer">
                                <ArrowRightLeft className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium">Transfer Rx</span>
                            </Link>
                        </Button>
                    </div>

                    {/* Request History */}
                    <div>
                        <h2 className="text-lg font-serif font-semibold text-foreground mb-4">Request History</h2>
                        {isLoading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <Skeleton key={i} className="h-[74px] w-full rounded-2xl bg-muted/50" />
                                ))}
                            </div>
                        ) : requests.length === 0 ? (
                            <div className="bg-card rounded-2xl p-8 border border-border/60 text-center">
                                <Clock className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                                <p className="text-muted-foreground">No requests yet.</p>
                                <p className="text-sm text-muted-foreground/60 mt-1">Your appointments and refills will appear here.</p>
                            </div>
                        ) : (
                            <div className="bg-card rounded-2xl border border-border/60 overflow-hidden divide-y divide-border/60">
                                {requests.map((item) => {
                                    const Icon = typeIcons[item.type] || Clock;
                                    return (
                                        <div key={`${item.type}-${item.id}`} className="flex items-center gap-4 px-5 py-4">
                                            <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                                                <Icon className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{item.type}</span>
                                                    <StatusBadge status={item.status} />
                                                </div>
                                                <p className="text-sm text-foreground truncate capitalize">{item.details}</p>
                                            </div>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                {format(new Date(item.created_at), "MMM d")}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
