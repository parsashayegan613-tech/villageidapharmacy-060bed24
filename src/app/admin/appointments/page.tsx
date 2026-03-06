"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Phone, Search, X, Calendar } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Appointment = {
    id: string;
    created_at: string;
    client_name: string;
    client_email: string;
    client_phone: string | null;
    appointment_date: string;
    appointment_time: string;
    service_type: string;
    status: string;
    notes: string | null;
    admin_notes: string | null;
};

const STATUS_STYLES: Record<string, string> = {
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    confirmed: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    cancelled: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
    no_show: "bg-red-500/15 text-red-400 border-red-500/20",
};

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled", "no_show"];

const SERVICE_LABELS: Record<string, string> = {
    "injection": "Injection",
    "medication-review": "Medication Review",
    "diabetes": "Diabetes Support",
    "smoking": "Smoking Cessation",
    "compounding": "Compounding Consult",
    "other": "Other",
};

export default function AdminAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Appointment | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        supabase.from("appointments").select("*").order("created_at", { ascending: false })
            .then(({ data }) => { setAppointments(data || []); setLoading(false); });
    }, []);

    async function updateStatus(id: string, status: string) {
        setUpdatingId(id);
        const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
        if (!error) {
            setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
            if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
            toast.success("Status updated");
        } else {
            toast.error("Failed to update");
        }
        setUpdatingId(null);
    }

    const filtered = appointments.filter(a => {
        const q = search.toLowerCase();
        return a.client_name.toLowerCase().includes(q) || (a.client_phone || "").includes(q) || a.service_type.includes(q);
    });

    const pending = appointments.filter(a => a.status === "pending").length;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-white">Appointments</h1>
                <p className="text-zinc-400 text-sm mt-1">{pending} pending</p>
            </div>

            <div className="relative mb-5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or phone..." className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors" />
            </div>

            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-zinc-500">Loading...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-12 text-center text-zinc-500">No appointments found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-zinc-800">
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Patient</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider hidden md:table-cell">Service</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider hidden lg:table-cell">Requested Date</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                                    <th className="w-16"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {filtered.map(a => (
                                    <tr key={a.id} className="hover:bg-zinc-800/40 transition-colors cursor-pointer" onClick={() => setSelected(a)}>
                                        <td className="px-4 py-3.5">
                                            <p className="text-white font-medium text-sm">{a.client_name}</p>
                                            {a.client_phone && (
                                                <a href={`tel:${a.client_phone}`} onClick={e => e.stopPropagation()} className="text-zinc-400 text-xs hover:text-blue-400 flex items-center gap-1 w-fit">
                                                    <Phone className="h-3 w-3" />{a.client_phone}
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-4 py-3.5 text-zinc-300 text-sm hidden md:table-cell">
                                            {SERVICE_LABELS[a.service_type] || a.service_type}
                                        </td>
                                        <td className="px-4 py-3.5 hidden lg:table-cell">
                                            <span className="flex items-center gap-1.5 text-zinc-400 text-sm">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {a.appointment_date} {a.appointment_time && `· ${a.appointment_time}`}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                                            <select
                                                value={a.status}
                                                onChange={e => updateStatus(a.id, e.target.value)}
                                                disabled={updatingId === a.id}
                                                className={cn("text-xs font-medium border px-2 py-1.5 rounded-full bg-transparent focus:outline-none cursor-pointer", STATUS_STYLES[a.status] || STATUS_STYLES.pending)}
                                            >
                                                {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-zinc-800 text-white">{s.replace(/_/g, " ")}</option>)}
                                            </select>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <button onClick={e => { e.stopPropagation(); setSelected(a); }} className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded-md border border-zinc-700 hover:border-zinc-500 transition-colors">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {selected && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
                    <div className="relative w-full max-w-md bg-zinc-900 border-l border-zinc-800 h-full overflow-y-auto">
                        <div className="p-5 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-zinc-900 z-10">
                            <h2 className="text-white font-semibold">Appointment Details</h2>
                            <button onClick={() => setSelected(null)} className="text-zinc-400 hover:text-white p-1"><X className="h-5 w-5" /></button>
                        </div>
                        <div className="p-5 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1.5">Patient</p>
                                    <p className="text-white font-medium">{selected.client_name}</p>
                                    {selected.client_phone && <a href={`tel:${selected.client_phone}`} className="text-blue-400 text-sm hover:underline">{selected.client_phone}</a>}
                                    {selected.client_email && <p className="text-zinc-400 text-sm">{selected.client_email}</p>}
                                </div>
                                <div>
                                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1.5">Submitted</p>
                                    <p className="text-zinc-300 text-sm">{format(new Date(selected.created_at), "MMM d, yyyy")}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1.5">Service Requested</p>
                                <p className="text-white font-medium">{SERVICE_LABELS[selected.service_type] || selected.service_type}</p>
                            </div>

                            <div>
                                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1.5">Preferred Date & Time</p>
                                <p className="text-white">{selected.appointment_date}</p>
                                {selected.appointment_time && <p className="text-zinc-400 text-sm">{selected.appointment_time}</p>}
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
