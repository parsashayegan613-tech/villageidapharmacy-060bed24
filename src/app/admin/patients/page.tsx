"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Search, Users, Phone, FileText, Calendar, ArrowRightLeft, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Interaction = {
    id: string;
    type: "refill" | "transfer" | "appointment";
    date: string;
    status: string;
    detail: string;
    raw: any;
};

type PatientProfile = {
    id: string; // derived from normalized phone or email/name
    name: string;
    phone: string | null;
    email: string | null;
    interactions: Interaction[];
    last_interaction: string;
    created_at: string;
};

export default function AdminPatients() {
    const [patients, setPatients] = useState<PatientProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<PatientProfile | null>(null);

    useEffect(() => {
        async function fetchAllData() {
            try {
                // Fetch all engagement data simultaneously
                const [refillsRes, transfersRes, apptsRes] = await Promise.all([
                    supabase.from("refills").select("*").order("created_at", { ascending: false }),
                    supabase.from("transfers").select("*").order("created_at", { ascending: false }),
                    supabase.from("appointments").select("*").order("created_at", { ascending: false })
                ]);

                if (refillsRes.error) throw refillsRes.error;
                if (transfersRes.error) throw transfersRes.error;
                if (apptsRes.error) throw apptsRes.error;

                const profiles = new Map<string, PatientProfile>();

                const sanitizePhone = (p: string | null) => p ? p.replace(/\D/g, '') : null;

                const getOrCreateProfile = (name: string, phone: string | null, email: string | null, date: string) => {
                    // Try to match by phone first, then exact name if no phone
                    const cleanPhone = sanitizePhone(phone);
                    const key = cleanPhone || name.toLowerCase().trim();

                    if (!profiles.has(key)) {
                        profiles.set(key, {
                            id: key,
                            name,
                            phone,
                            email,
                            interactions: [],
                            last_interaction: date,
                            created_at: date
                        });
                    }
                    return profiles.get(key)!;
                };

                // Parse Refills
                refillsRes.data?.forEach(r => {
                    const profile = getOrCreateProfile(r.full_name, r.phone, r.email, r.created_at);
                    profile.interactions.push({
                        id: r.id,
                        type: "refill",
                        date: r.created_at,
                        status: r.status,
                        detail: `${r.prescriptions?.length || 0} prescriptions`,
                        raw: r
                    });
                    if (new Date(r.created_at) > new Date(profile.last_interaction)) {
                        profile.last_interaction = r.created_at;
                    }
                });

                // Parse Transfers
                transfersRes.data?.forEach(t => {
                    const profile = getOrCreateProfile(t.full_name, t.phone, null, t.created_at);
                    profile.interactions.push({
                        id: t.id,
                        type: "transfer",
                        date: t.created_at,
                        status: t.status,
                        detail: `From ${t.current_pharmacy}`,
                        raw: t
                    });
                    if (new Date(t.created_at) > new Date(profile.last_interaction)) {
                        profile.last_interaction = t.created_at;
                    }
                });

                // Parse Appointments
                apptsRes.data?.forEach(a => {
                    const profile = getOrCreateProfile(a.client_name, a.client_phone, a.client_email, a.created_at);
                    profile.interactions.push({
                        id: a.id,
                        type: "appointment",
                        date: a.created_at,
                        status: a.status,
                        detail: a.service_type,
                        raw: a
                    });
                    if (new Date(a.created_at) > new Date(profile.last_interaction)) {
                        profile.last_interaction = a.created_at;
                    }
                });

                // Sort interactions internally by date
                const sortedProfiles = Array.from(profiles.values()).map(p => {
                    p.interactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    return p;
                });

                // Sort profiles by last interaction globally
                sortedProfiles.sort((a, b) => new Date(b.last_interaction).getTime() - new Date(a.last_interaction).getTime());

                setPatients(sortedProfiles);
            } catch (err: any) {
                toast.error("Failed to compile patient directory: " + err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchAllData();
    }, []);

    const filtered = patients.filter(p => {
        const q = search.toLowerCase();
        return p.name.toLowerCase().includes(q) || (p.phone && p.phone.includes(q)) || (p.email && p.email.toLowerCase().includes(q));
    });

    const getIcon = (type: string) => {
        if (type === "refill") return <FileText className="h-3.5 w-3.5 text-blue-400" />;
        if (type === "transfer") return <ArrowRightLeft className="h-3.5 w-3.5 text-emerald-400" />;
        return <Calendar className="h-3.5 w-3.5 text-purple-400" />;
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-white">Patient Directory</h1>
                <p className="text-zinc-400 text-sm mt-1">{patients.length} unique patients recognized</p>
            </div>

            <div className="relative mb-5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone, or email..." className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors" />
            </div>

            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-zinc-500">Compiling patient records...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-12 text-center text-zinc-500">No patients found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-zinc-800">
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Patient Info</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider text-center">Interactions</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider hidden lg:table-cell">Last Active</th>
                                    <th className="w-20"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {filtered.map(p => (
                                    <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors cursor-pointer" onClick={() => setSelected(p)}>
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                                                    <Users className="h-4 w-4 text-zinc-400" />
                                                </div>
                                                <p className="text-white font-medium text-sm">{p.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5 hidden md:table-cell">
                                            {p.phone && <a href={`tel:${p.phone}`} onClick={e => e.stopPropagation()} className="text-zinc-400 text-sm hover:text-blue-400 flex items-center gap-1.5 w-fit"><Phone className="h-3 w-3" />{p.phone}</a>}
                                            {p.email && <span className="text-zinc-500 text-xs mt-1 block">{p.email}</span>}
                                        </td>
                                        <td className="px-4 py-3.5 text-center">
                                            <span className="inline-flex items-center justify-center bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-full px-2.5 py-0.5 text-xs font-medium">
                                                {p.interactions.length} total
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 text-zinc-500 text-sm hidden lg:table-cell">{format(new Date(p.last_interaction), "MMM d, yyyy")}</td>
                                        <td className="px-4 py-3.5">
                                            <button onClick={e => { e.stopPropagation(); setSelected(p); }} className="text-xs text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-zinc-700 hover:border-zinc-500 transition-colors">View</button>
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
                            <h2 className="text-white font-semibold flex items-center gap-2"><Users className="h-5 w-5 text-blue-400" /> Patient Profile</h2>
                            <button onClick={() => setSelected(null)} className="text-zinc-400 hover:text-white p-1"><X className="h-5 w-5" /></button>
                        </div>

                        <div className="p-5">
                            <div className="mb-8">
                                <h3 className="text-xl font-medium text-white mb-2">{selected.name}</h3>
                                <div className="space-y-1">
                                    {selected.phone && (
                                        <a href={`tel:${selected.phone}`} className="text-blue-400 text-sm hover:underline flex items-center gap-2">
                                            <Phone className="h-3.5 w-3.5" /> {selected.phone}
                                        </a>
                                    )}
                                    {selected.email && <p className="text-zinc-400 text-sm flex items-center gap-2">{selected.email}</p>}
                                </div>
                            </div>

                            <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider border-b border-zinc-800 pb-2 mb-4">Interaction History ({selected.interactions.length})</h4>

                            <div className="space-y-3">
                                {selected.interactions.map((interaction, i) => (
                                    <div key={`${interaction.id}-${i}`} className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3.5 hover:border-zinc-600 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                {getIcon(interaction.type)}
                                                <span className="text-white text-sm font-medium capitalize">{interaction.type} Request</span>
                                            </div>
                                            <span className="text-zinc-500 text-xs">{format(new Date(interaction.date), "MMM d, yyyy")}</span>
                                        </div>
                                        <p className="text-zinc-400 text-sm">{interaction.detail}</p>
                                        <div className="mt-2.5 flex items-center justify-between">
                                            <span className={cn(
                                                "text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-sm",
                                                ["completed", "delivered", "confirmed"].includes(interaction.status) ? "bg-emerald-500/10 text-emerald-400" :
                                                    ["pending", "in_progress"].includes(interaction.status) ? "bg-amber-500/10 text-amber-400" :
                                                        "bg-zinc-500/10 text-zinc-400"
                                            )}>
                                                {interaction.status.replace(/_/g, " ")}
                                            </span>
                                            <span className="text-zinc-600 text-[10px]">ID: {interaction.id.substring(0, 6)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
