import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { format } from "date-fns";
import { Search, MessageSquare, User, Phone, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ContactMessage {
    id: string;
    created_at: string;
    full_name: string;
    phone: string;
    message: string;
    status: string;
    admin_notes: string | null;
}

const statuses = ["unread", "read", "replied"];

export default function AdminMessages() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [filtered, setFiltered] = useState<ContactMessage[]>([]);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [selected, setSelected] = useState<ContactMessage | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [adminNote, setAdminNote] = useState("");
    const [isSavingNote, setIsSavingNote] = useState(false);

    useEffect(() => {
        if (selected) setAdminNote(selected.admin_notes || "");
    }, [selected]);

    const saveAdminNote = async (id: string) => {
        setIsSavingNote(true);
        const { error } = await supabase.from("contact_messages").update({ admin_notes: adminNote }).eq("id", id);
        setIsSavingNote(false);
        if (error) { toast.error("Failed to save note."); return; }
        toast.success("Admin note saved");
        setMessages(prev => prev.map(m => m.id === id ? { ...m, admin_notes: adminNote } : m));
        if (selected?.id === id) setSelected(prev => prev ? { ...prev, admin_notes: adminNote } : null);
    };

    const fetchMessages = async () => {
        const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
        if (!error && data) { setMessages(data); setFiltered(data); }
        setIsLoading(false);
    };

    useEffect(() => { fetchMessages(); }, []);

    useEffect(() => {
        let result = [...messages];
        if (filterStatus !== "all") result = result.filter(m => m.status === filterStatus);
        if (search) result = result.filter(m => m.full_name.toLowerCase().includes(search.toLowerCase()));

        result.sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return sortBy === "newest" ? dateB - dateA : dateA - dateB;
        });

        setFiltered(result);
    }, [search, filterStatus, sortBy, messages]);

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase.from("contact_messages").update({ status: newStatus }).eq("id", id);
        if (error) { toast.error("Failed to update status."); return; }
        toast.success(`Status updated to ${newStatus}`);
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
        if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: newStatus } : null);
    };

    // Auto-mark as read when opening
    const handleSelect = async (msg: ContactMessage) => {
        setSelected(msg);
        if (msg.status === "unread") {
            updateStatus(msg.id, "read");
        }
    };

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-serif font-bold text-foreground">Messages</h1>
                <p className="text-muted-foreground mt-1">View and respond to contact messages.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px]"><SelectValue placeholder="Sort By" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {isLoading ? (
                <div className="border border-border/60 rounded-2xl overflow-hidden bg-card p-4 space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-14 w-full bg-muted/60 rounded-xl" />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="bg-card rounded-2xl p-8 border border-border/60 text-center">
                    <MessageSquare className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-muted-foreground">No messages found.</p>
                </div>
            ) : (
                <div className="bg-card rounded-2xl border border-border/60 overflow-hidden divide-y divide-border/60">
                    {filtered.map(msg => (
                        <button
                            key={msg.id}
                            onClick={() => handleSelect(msg)}
                            className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-sm font-medium ${msg.status === "unread" ? "text-foreground font-semibold" : "text-foreground"}`}>{msg.full_name}</span>
                                    <StatusBadge status={msg.status} />
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap mt-1">{format(new Date(msg.created_at), "MMM d")}</span>
                        </button>
                    ))}
                </div>
            )}

            <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    {selected && (
                        <>
                            <SheetHeader><SheetTitle className="text-xl font-serif">Message Details</SheetTitle></SheetHeader>
                            <div className="mt-6 space-y-5">
                                <DetailRow icon={User} label="From" value={selected.full_name} />
                                <DetailRow icon={Phone} label="Phone" value={selected.phone} />
                                <div className="flex items-start gap-3">
                                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</p>
                                        <p className="text-sm text-foreground whitespace-pre-wrap mt-1 bg-muted p-3 rounded-xl">{selected.message}</p>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground">Received {format(new Date(selected.created_at), "MMMM d, yyyy 'at' h:mm a")}</p>
                                <div className="pt-4 border-t border-border/60">
                                    <p className="text-sm font-medium text-foreground mb-2">Admin Notes</p>
                                    <div className="flex flex-col gap-2">
                                        <Textarea value={adminNote} onChange={e => setAdminNote(e.target.value)} className="min-h-[80px]" placeholder="Add internal notes here. These are not visible to the client." />
                                        <div className="flex justify-end"><Button onClick={() => saveAdminNote(selected.id)} size="sm" variant="secondary" disabled={isSavingNote}>{isSavingNote ? "Saving..." : "Save Note"}</Button></div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-border/60">
                                    <p className="text-sm font-medium text-foreground mb-2">Update Status</p>
                                    <div className="flex flex-wrap gap-2">
                                        {statuses.map(s => (
                                            <Button key={s} variant={selected.status === s ? "default" : "outline"} size="sm" className="rounded-full capitalize" onClick={() => updateStatus(selected.id, s)}>{s}</Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </AdminLayout>
    );
}

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3">
            <Icon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
                <p className="text-sm text-foreground">{value}</p>
            </div>
        </div>
    );
}
