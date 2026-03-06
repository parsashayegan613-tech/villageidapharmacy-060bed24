"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Phone, Truck, Package, Search, X, Send } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Refill = {
    id: string;
    created_at: string;
    full_name: string;
    phone: string;
    email: string | null;
    prescriptions: string[];
    delivery_type: string;
    address: string | null;
    city: string | null;
    postal_code: string | null;
    notes: string | null;
    status: string;
    admin_notes: string | null;
    contact_method: string;
};

const STATUS_STYLES: Record<string, string> = {
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    processing: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    ready: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    out_for_delivery: "bg-purple-500/15 text-purple-400 border-purple-500/20",
    delivered: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
    completed: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
};

const STATUS_OPTIONS = ["pending", "processing", "ready", "out_for_delivery", "delivered", "completed"];

const SMS_TEMPLATES: Record<string, string> = {
    ready: `Hi {name}, your prescription is ready for pickup at Village IDA Pharmacy (7004 98 Ave NW). Call us at 780-440-4555 with any questions.`,
    out_for_delivery: `Hi {name}, your prescription is out for delivery and should arrive today. Call 780-440-4555 if you have any questions.`,
    delivered: `Hi {name}, your prescription has been delivered. Thank you for choosing Village IDA Pharmacy! Call 780-440-4555 if you need anything.`,
};

export default function AdminRefills() {
    const [refills, setRefills] = useState<Refill[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selected, setSelected] = useState<Refill | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [sendingSms, setSendingSms] = useState(false);

    useEffect(() => { fetchRefills(); }, []);

    async function fetchRefills() {
        const { data } = await supabase.from("refills").select("*").order("created_at", { ascending: false });
        setRefills(data || []);
        setLoading(false);
    }

    async function updateStatus(id: string, status: string) {
        setUpdatingId(id);
        const { error } = await supabase.from("refills").update({ status }).eq("id", id);
        if (!error) {
            setRefills(prev => prev.map(r => r.id === id ? { ...r, status } : r));
            if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
            toast.success("Status updated");
        } else {
            toast.error("Failed to update status");
        }
        setUpdatingId(null);
    }

    async function sendSms(refill: Refill, key: string) {
        setSendingSms(true);
        const firstName = refill.full_name.split(" ")[0];
        const message = SMS_TEMPLATES[key].replace("{name}", firstName);
        try {
            await supabase.functions.invoke("send-ready-sms", {
                body: { phone: refill.phone, name: refill.full_name, message },
            });
            toast.success("SMS sent to " + refill.full_name);
        } catch {
            toast.error("Failed to send SMS");
        }
        setSendingSms(false);
    }

    const filtered = refills.filter(r => {
        const q = search.toLowerCase();
        const matchSearch = r.full_name.toLowerCase().includes(q) || r.phone.includes(q);
        const matchStatus = filterStatus === "all" || r.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const pending = refills.filter(r => r.status === "pending").length;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-white">Refill Requests</h1>
                    <p className="text-zinc-400 text-sm mt-1">{pending} pending</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or phone..." className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors">
                    <option value="all">All Statuses</option>
                    {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-zinc-800">{s.replace(/_/g, " ")}</option>)}
                </select>
            </div>

            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-zinc-500">Loading...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-12 text-center text-zinc-500">No refill requests found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-zinc-800">
                                    {["Patient", "Rx Count", "Delivery", "Date", "Status", ""].map(h => (
                                        <th key={h} className={cn("text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider", !h && "w-16", h === "Rx Count" && "hidden sm:table-cell", h === "Date" && "hidden lg:table-cell", h === "Delivery" && "hidden md:table-cell")}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {filtered.map((refill) => (
                                    <tr key={refill.id} className="hover:bg-zinc-800/40 transition-colors cursor-pointer" onClick={() => setSelected(refill)}>
                                        <td className="px-4 py-3.5">
                                            <p className="text-white font-medium text-sm">{refill.full_name}</p>
                                            <a href={`tel:${refill.phone}`} onClick={e => e.stopPropagation()} className="text-zinc-400 text-xs hover:text-blue-400 flex items-center gap-1 w-fit">
                                                <Phone className="h-3 w-3" />{refill.phone}
                                            </a>
                                        </td>
                                        <td className="px-4 py-3.5 text-zinc-300 text-sm hidden sm:table-cell">
                                            {refill.prescriptions?.length ?? 0} Rx
                                        </td>
                                        <td className="px-4 py-3.5 hidden md:table-cell">
                                            <span className="flex items-center gap-1.5 text-zinc-300 text-sm capitalize">
                                                {refill.delivery_type === "delivery" ? <Truck className="h-4 w-4 text-zinc-500" /> : <Package className="h-4 w-4 text-zinc-500" />}
                                                {refill.delivery_type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 text-zinc-500 text-sm hidden lg:table-cell">
                                            {format(new Date(refill.created_at), "MMM d, h:mm a")}
                                        </td>
                                        <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                                            <select
                                                value={refill.status}
                                                onChange={e => updateStatus(refill.id, e.target.value)}
                                                disabled={updatingId === refill.id}
                                                className={cn("text-xs font-medium border px-2 py-1.5 rounded-full bg-transparent focus:outline-none cursor-pointer transition-opacity", STATUS_STYLES[refill.status] || STATUS_STYLES.pending, updatingId === refill.id && "opacity-50")}
                                            >
                                                {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-zinc-800 text-white">{s.replace(/_/g, " ")}</option>)}
                                            </select>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <button onClick={e => { e.stopPropagation(); setSelected(refill); }} className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded-md border border-zinc-700 hover:border-zinc-500 transition-colors">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Detail Drawer */}
            {selected && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
                    <div className="relative w-full max-w-md bg-zinc-900 border-l border-zinc-800 h-full overflow-y-auto flex flex-col">
                        <div className="p-5 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-zinc-900 z-10">
                            <h2 className="text-white font-semibold">Refill Details</h2>
                            <button onClick={() => setSelected(null)} className="text-zinc-400 hover:text-white transition-colors p-1">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-5 space-y-6 flex-1">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1.5">Patient</p>
                                    <p className="text-white font-medium">{selected.full_name}</p>
                                    <a href={`tel:${selected.phone}`} className="text-blue-400 text-sm hover:underline">{selected.phone}</a>
                                    {selected.email && <p className="text-zinc-400 text-sm">{selected.email}</p>}
                                </div>
                                <div>
                                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1.5">Received</p>
                                    <p className="text-zinc-300 text-sm">{format(new Date(selected.created_at), "MMM d, yyyy")}</p>
                                    <p className="text-zinc-500 text-xs">{format(new Date(selected.created_at), "h:mm a")}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Prescriptions ({selected.prescriptions?.length ?? 0})</p>
                                <div className="space-y-1.5">
                                    {selected.prescriptions?.map((rx, i) => (
                                        <div key={i} className="text-white text-sm bg-zinc-800 px-3 py-2 rounded-lg font-mono">{rx}</div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1.5">Delivery Method</p>
                                <p className="text-white text-sm capitalize flex items-center gap-2">
                                    {selected.delivery_type === "delivery" ? <Truck className="h-4 w-4 text-zinc-400" /> : <Package className="h-4 w-4 text-zinc-400" />}
                                    {selected.delivery_type}
                                </p>
                                {selected.address && (
                                    <p className="text-zinc-400 text-sm mt-1">{selected.address}{selected.city ? `, ${selected.city}` : ""}{selected.postal_code ? ` ${selected.postal_code}` : ""}</p>
                                )}
                            </div>

                            {selected.notes && (
                                <div>
                                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1.5">Patient Notes</p>
                                    <p className="text-zinc-300 text-sm leading-relaxed bg-zinc-800 rounded-lg px-3 py-2.5">{selected.notes}</p>
                                </div>
                            )}

                            <div>
                                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1.5">Update Status</p>
                                <select
                                    value={selected.status}
                                    onChange={e => updateStatus(selected.id, e.target.value)}
                                    className="w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                >
                                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
                                </select>
                            </div>

                            <div>
                                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2.5">Send SMS Update</p>
                                <div className="space-y-2">
                                    {Object.entries(SMS_TEMPLATES).map(([key, msg]) => (
                                        <button
                                            key={key}
                                            onClick={() => sendSms(selected, key)}
                                            disabled={sendingSms}
                                            className="w-full flex items-start gap-3 p-3 rounded-lg border border-zinc-800 hover:border-blue-500/40 hover:bg-blue-500/5 text-left transition-all disabled:opacity-50 group"
                                        >
                                            <Send className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-semibold text-white capitalize mb-0.5">{key.replace(/_/g, " ")}</p>
                                                <p className="text-xs text-zinc-500 leading-relaxed">{msg.replace("{name}", selected.full_name.split(" ")[0])}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
