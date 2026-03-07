"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Phone, Search, X, MessageSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Message = {
    id: string;
    created_at: string;
    full_name: string;
    phone: string;
    message: string;
    status: string;
    admin_notes: string | null;
};

const STATUS_STYLES: Record<string, string> = {
    unread: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    read: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
    replied: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

const STATUS_ACTIVE: Record<string, string> = {
    unread: "bg-blue-500 text-white border-blue-500",
    read: "bg-zinc-500 text-white border-zinc-500",
    replied: "bg-emerald-500 text-white border-emerald-500",
};

const STATUS_OPTIONS = ["unread", "read", "replied"];

export default function AdminMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Message | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false })
            .then(({ data, error }) => {
                if (error) toast.error("Failed to load: " + error.message);
                setMessages(data || []);
                setLoading(false);
            });
    }, []);

    async function updateStatus(id: string, status: string) {
        setUpdatingId(id);
        const { error } = await supabase.from("contact_messages").update({ status }).eq("id", id);
        if (!error) {
            setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
            if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
            toast.success("Marked as " + status);
        } else {
            toast.error("Failed to update");
        }
        setUpdatingId(null);
    }

    async function deleteMessage(id: string) {
        const { error } = await supabase.from("contact_messages").delete().eq("id", id);
        if (!error) {
            setMessages(prev => prev.filter(m => m.id !== id));
            setSelected(null);
            setConfirmDelete(false);
            toast.success("Message deleted");
        } else {
            toast.error("Failed to delete");
        }
    }

    const openMessage = (msg: Message) => {
        setSelected(msg);
        setConfirmDelete(false);
        if (msg.status === "unread") updateStatus(msg.id, "read");
    };

    const filtered = messages.filter(m => {
        const q = search.toLowerCase();
        return m.full_name.toLowerCase().includes(q) || m.phone.includes(q) || m.message.toLowerCase().includes(q);
    });

    const unread = messages.filter(m => m.status === "unread").length;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-white">Messages</h1>
                <p className="text-zinc-400 text-sm mt-1">{unread} unread</p>
            </div>

            <div className="relative mb-5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..." className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors" />
            </div>

            <div className="space-y-2">
                {loading ? (
                    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-12 text-center text-zinc-500">Loading...</div>
                ) : filtered.length === 0 ? (
                    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-12 text-center text-zinc-500">No messages found.</div>
                ) : (
                    filtered.map(msg => (
                        <button
                            key={msg.id}
                            onClick={() => openMessage(msg)}
                            className={cn(
                                "w-full bg-zinc-900 rounded-xl border p-4 text-left hover:border-zinc-600 transition-all",
                                msg.status === "unread" ? "border-blue-500/30" : "border-zinc-800"
                            )}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3 min-w-0">
                                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", msg.status === "unread" ? "bg-blue-600/20" : "bg-zinc-800")}>
                                        <MessageSquare className={cn("h-4 w-4", msg.status === "unread" ? "text-blue-400" : "text-zinc-500")} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className={cn("font-medium text-sm", msg.status === "unread" ? "text-white" : "text-zinc-300")}>{msg.full_name}</p>
                                            {msg.status === "unread" && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />}
                                        </div>
                                        <p className="text-zinc-500 text-xs truncate">{msg.message}</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 text-right">
                                    <span className={cn("text-xs font-medium border px-2 py-0.5 rounded-full", STATUS_STYLES[msg.status] || STATUS_STYLES.read)}>{msg.status}</span>
                                    <p className="text-zinc-600 text-xs mt-1.5">{format(new Date(msg.created_at), "MMM d")}</p>
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>

            {selected && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
                    <div className="relative w-full max-w-md bg-zinc-900 border-l border-zinc-800 h-full overflow-y-auto">
                        <div className="p-5 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-zinc-900 z-10">
                            <h2 className="text-white font-semibold">Message</h2>
                            <button onClick={() => setSelected(null)} className="text-zinc-400 hover:text-white p-1"><X className="h-5 w-5" /></button>
                        </div>

                        <div className="p-5 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1.5">From</p>
                                    <p className="text-white font-medium">{selected.full_name}</p>
                                    <a href={`tel:${selected.phone}`} className="text-blue-400 text-sm hover:underline flex items-center gap-1">
                                        <Phone className="h-3 w-3" />{selected.phone}
                                    </a>
                                </div>
                                <div>
                                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1.5">Received</p>
                                    <p className="text-zinc-300 text-sm">{format(new Date(selected.created_at), "MMM d, yyyy")}</p>
                                    <p className="text-zinc-500 text-xs">{format(new Date(selected.created_at), "h:mm a")}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Message</p>
                                <div className="bg-zinc-800 rounded-xl p-4">
                                    <p className="text-zinc-200 text-sm leading-relaxed">{selected.message}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-3">Call Back</p>
                                <a
                                    href={`tel:${selected.phone}`}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600/15 border border-blue-500/30 rounded-xl text-blue-400 text-sm font-medium hover:bg-blue-600/25 transition-colors"
                                >
                                    <Phone className="h-4 w-4" />
                                    Call {selected.full_name.split(" ")[0]}
                                </a>
                            </div>

                            {/* Status buttons */}
                            <div>
                                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2.5">Mark As</p>
                                <div className="flex gap-2">
                                    {STATUS_OPTIONS.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => updateStatus(selected.id, s)}
                                            disabled={selected.status === s || updatingId === selected.id}
                                            className={cn(
                                                "flex-1 py-2 px-3 rounded-full text-xs font-medium border transition-all capitalize",
                                                selected.status === s ? STATUS_ACTIVE[s] : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white disabled:opacity-40"
                                            )}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Delete */}
                            <div className="pt-2 border-t border-zinc-800">
                                {!confirmDelete ? (
                                    <button onClick={() => setConfirmDelete(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 text-sm font-medium transition-all w-full justify-center">
                                        <Trash2 className="h-4 w-4" /> Delete Message
                                    </button>
                                ) : (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                                        <p className="text-red-300 text-sm font-medium mb-3">Delete this message? This cannot be undone.</p>
                                        <div className="flex gap-2">
                                            <button onClick={() => deleteMessage(selected.id)} className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">Yes, Delete</button>
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
