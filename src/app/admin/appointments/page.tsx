"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Phone, Search, X, Trash2, Calendar } from "lucide-react";
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
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    confirmed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    cancelled: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
    no_show: "bg-red-500/15 text-red-400 border-red-500/30",
};

const STATUS_ACTIVE: Record<string, string> = {
    pending: "bg-amber-500 text-white border-amber-500",
    confirmed: "bg-blue-500 text-white border-blue-500",
    completed: "bg-emerald-500 text-white border-emerald-500",
    cancelled: "bg-zinc-500 text-white border-zinc-500",
    no_show: "bg-red-500 text-white border-red-500",
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
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        supabase.from("appointments").select("*").order("created_at", { ascending: false })
            .then(({ data, error }) => {
                if (error) toast.error("Failed to load: " + error.message);
                setAppointments(data || []);
                setLoading(false);
            });
    }, []);

    async function updateStatus(id: string, status: string) {
        setUpdatingId(id);
        const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
        if (!error) {
            setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
            if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
            toast.success("Status updated to " + status.replace(/_/g, " "));
        } else {
            toast.error("Failed to update");
        }
        setUpdatingId(null);
    }

    async function deleteAppointment(id: string) {
        const { error } = await supabase.from("appointments").delete().eq("id", id);
        if (!error) {
            setAppointments(prev => prev.filter(a => a.id !== id));
            setSelected(null);
            setConfirmDelete(false);
            toast.success("Appointment deleted");
        } else {
            toast.error("Failed to delete");
        }
    }

    const filtered = appointments.filter(a => {
        const q = search.toLowerCase();
        return a.client_name.toLowerCase().includes(q) || (a.client_phone || "").includes(q);
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
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider hidden lg:table-cell">Requested</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                                    <th className="w-20"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {filtered.map(a => (
                                    <tr key={a.id} className="hover:bg-zinc-800/40 transition-colors cursor-pointer" onClick={() => { setSelected(a); setConfirmDelete(false); }}>
                                        <td className="px-4 py-3.5">
                                            <p className="text-white font-medium text-sm">{a.client_name}</p>
                                            {a.client_phone && (
                                                <a href={`tel:${a.client_phone}`} onClick={e => e.stopPropagation()} className="text-zinc-400 text-xs hover:text-blue-400 flex items-center gap-1 w-fit">
                                                    <Phone className="h-3 w-3" />{a.client_phone}
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-4 py-3.5 text-zinc-300 text-sm hidden md:table-cell">{SERVICE_LABELS[a.service_type] || a.service_type}</td>
                                        <td className="px-4 py-3.5 hidden lg:table-cell">
                                            <span className="flex items-center gap-1.5 text-zinc-400 text-sm">
                                                <Calendar className="h-3.5 w-3.5" />{a.appointment_date}{a.appointment_time && ` · ${a.appointment_time}`}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span className={cn("text-xs font-medium border px-2.5 py-1 rounded-full capitalize", STATUS_STYLES[a.status] || STATUS_STYLES.pending)}>
                                                {a.status.replace(/_/g, " ")}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <button onClick={e => { e.stopPropagation(); setSelected(a); setConfirmDelete(false); }} className="text-xs text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-zinc-700 hover:border-zinc-500 transition-colors">Open</button>
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
                                    <p className="text-zinc-500 text-xs">{format(new Date(selected.created_at), "h:mm a")}</p>
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

                            {/* Status buttons */}
                            <div>
                                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2.5">Update Status</p>
                                <div className="flex flex-wrap gap-2">
                                    {STATUS_OPTIONS.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => updateStatus(selected.id, s)}
                                            disabled={updatingId === selected.id}
                                            className={cn(
                                                "px-3 py-1.5 rounded-full text-xs font-medium border transition-all capitalize",
                                                selected.status === s ? STATUS_ACTIVE[s] : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
                                            )}
                                        >
                                            {s.replace(/_/g, " ")}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Delete */}
                            <div className="pt-2 border-t border-zinc-800">
                                {!confirmDelete ? (
                                    <button onClick={() => setConfirmDelete(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 text-sm font-medium transition-all w-full justify-center">
                                        <Trash2 className="h-4 w-4" /> Delete Appointment
                                    </button>
                                ) : (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                                        <p className="text-red-300 text-sm font-medium mb-3">Delete this appointment? This cannot be undone.</p>
                                        <div className="flex gap-2">
                                            <button onClick={() => deleteAppointment(selected.id)} className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">Yes, Delete</button>
                                            <button onClick={() => setConfirmDelete(false)} className="flex-1 py-2 border border-zinc-700 text-zinc-300 hover:text-white text-sm font-medium rounded-lg transition-colors">Cancel</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
