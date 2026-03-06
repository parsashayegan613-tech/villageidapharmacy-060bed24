"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import { FileText, ArrowRightLeft, Calendar, MessageSquare } from "lucide-react";

interface Stats {
    refills: { total: number; pending: number };
    transfers: { total: number; pending: number };
    appointments: { total: number; pending: number };
    messages: { total: number; unread: number };
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        refills: { total: 0, pending: 0 },
        transfers: { total: 0, pending: 0 },
        appointments: { total: 0, pending: 0 },
        messages: { total: 0, unread: 0 },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            const [r, rp, t, tp, a, ap, m, mu] = await Promise.all([
                supabase.from("refills").select("id", { count: "exact", head: true }),
                supabase.from("refills").select("id", { count: "exact", head: true }).eq("status", "pending"),
                supabase.from("transfers").select("id", { count: "exact", head: true }),
                supabase.from("transfers").select("id", { count: "exact", head: true }).eq("status", "pending"),
                supabase.from("appointments").select("id", { count: "exact", head: true }),
                supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "pending"),
                supabase.from("contact_messages").select("id", { count: "exact", head: true }),
                supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "unread"),
            ]);
            setStats({
                refills: { total: r.count ?? 0, pending: rp.count ?? 0 },
                transfers: { total: t.count ?? 0, pending: tp.count ?? 0 },
                appointments: { total: a.count ?? 0, pending: ap.count ?? 0 },
                messages: { total: m.count ?? 0, unread: mu.count ?? 0 },
            });
            setLoading(false);
        }
        fetchStats();
    }, []);

    const cards = [
        { label: "Refill Requests", icon: FileText, href: "/admin/refills", total: stats.refills.total, badge: stats.refills.pending, badgeLabel: "pending" },
        { label: "Transfers", icon: ArrowRightLeft, href: "/admin/transfers", total: stats.transfers.total, badge: stats.transfers.pending, badgeLabel: "pending" },
        { label: "Appointments", icon: Calendar, href: "/admin/appointments", total: stats.appointments.total, badge: stats.appointments.pending, badgeLabel: "pending" },
        { label: "Messages", icon: MessageSquare, href: "/admin/messages", total: stats.messages.total, badge: stats.messages.unread, badgeLabel: "unread" },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-white">Overview</h1>
                <p className="text-zinc-400 text-sm mt-1">Village IDA Pharmacy · Admin Dashboard</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <Link
                        key={card.label}
                        href={card.href}
                        className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 hover:border-zinc-600 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                                <card.icon className="h-5 w-5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                            </div>
                            {card.badge > 0 && (
                                <span className="text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full">
                                    {card.badge} {card.badgeLabel}
                                </span>
                            )}
                        </div>
                        {loading ? (
                            <div className="h-8 bg-zinc-800 rounded animate-pulse mb-2 w-16" />
                        ) : (
                            <div className="text-3xl font-semibold text-white mb-1">{card.total}</div>
                        )}
                        <div className="text-sm text-zinc-400">{card.label}</div>
                    </Link>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
                    <h2 className="text-white font-medium mb-4">Action Needed</h2>
                    <div className="space-y-2">
                        {cards.map((card) => card.badge > 0 && (
                            <Link key={card.href} href={card.href} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <card.icon className="h-4 w-4 text-zinc-500" />
                                    <span className="text-zinc-300 text-sm">{card.label}</span>
                                </div>
                                <span className="text-xs bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-medium">
                                    {card.badge} {card.badgeLabel}
                                </span>
                            </Link>
                        ))}
                        {cards.every(c => c.badge === 0) && !loading && (
                            <p className="text-zinc-500 text-sm text-center py-4">All caught up! ✓</p>
                        )}
                    </div>
                </div>

                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
                    <h2 className="text-white font-medium mb-4">Quick Links</h2>
                    <div className="space-y-2">
                        {cards.map((card) => (
                            <Link key={card.href} href={card.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors">
                                <card.icon className="h-4 w-4 text-zinc-500" />
                                <span className="text-zinc-300 text-sm">View {card.label}</span>
                                <span className="ml-auto text-zinc-500 text-xs">{card.total} total</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
