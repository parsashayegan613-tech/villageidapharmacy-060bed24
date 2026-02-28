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
import { Search, Calendar, User, Mail, Phone, Clock, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Appointment {
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
}

const statuses = ["pending", "confirmed", "completed", "cancelled"];

export default function AdminAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [filtered, setFiltered] = useState<Appointment[]>([]);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [selected, setSelected] = useState<Appointment | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [adminNote, setAdminNote] = useState("");
    const [isSavingNote, setIsSavingNote] = useState(false);

    useEffect(() => {
        if (selected) setAdminNote(selected.admin_notes || "");
    }, [selected]);

    const saveAdminNote = async (id: string) => {
        setIsSavingNote(true);
        const { error } = await supabase.from("appointments").update({ admin_notes: adminNote }).eq("id", id);
        setIsSavingNote(false);
        if (error) { toast.error("Failed to save note."); return; }
        toast.success("Admin note saved");
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, admin_notes: adminNote } : a));
        if (selected?.id === id) setSelected(prev => prev ? { ...prev, admin_notes: adminNote } : null);
    };

    const fetchAppointments = async () => {
        const { data, error } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
        if (!error && data) {
            setAppointments(data);
            setFiltered(data);
        }
        setIsLoading(false);
    };

    useEffect(() => { fetchAppointments(); }, []);

    useEffect(() => {
        let result = [...appointments];
        if (filterStatus !== "all") result = result.filter(a => a.status === filterStatus);
        if (search) result = result.filter(a => a.client_name.toLowerCase().includes(search.toLowerCase()) || a.client_email.toLowerCase().includes(search.toLowerCase()));

        result.sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return sortBy === "newest" ? dateB - dateA : dateA - dateB;
        });

        setFiltered(result);
    }, [search, filterStatus, sortBy, appointments]);

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase.from("appointments").update({ status: newStatus }).eq("id", id);
        if (error) { toast.error("Failed to update status."); return; }
        toast.success(`Status updated to ${newStatus}`);
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
        if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: newStatus } : null);
    };

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-serif font-bold text-foreground">Appointments</h1>
                <p className="text-muted-foreground mt-1">Manage appointment requests.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
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

            {/* Table */}
            {isLoading ? (
                <div className="border border-border/60 rounded-2xl overflow-hidden bg-card p-4 space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-12 w-full bg-muted/60 rounded-xl" />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="bg-card rounded-2xl p-8 border border-border/60 text-center">
                    <Calendar className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-muted-foreground">No appointments found.</p>
                </div>
            ) : (
                <div className="bg-card rounded-2xl border border-border/60 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 border-b border-border/60">
                                <tr>
                                    <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Client</th>
                                    <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden md:table-cell">Service</th>
                                    <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Preferred Time</th>
                                    <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Status</th>
                                    <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden sm:table-cell">Submitted</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {filtered.map(appt => (
                                    <tr key={appt.id} onClick={() => setSelected(appt)} className="hover:bg-muted/30 cursor-pointer transition-colors">
                                        <td className="px-5 py-3.5">
                                            <p className="font-medium text-foreground">{appt.client_name}</p>
                                            <p className="text-xs text-muted-foreground">{appt.client_email}</p>
                                        </td>
                                        <td className="px-5 py-3.5 hidden md:table-cell text-muted-foreground capitalize">{appt.service_type.replace("-", " ")}</td>
                                        <td className="px-5 py-3.5 hidden lg:table-cell text-muted-foreground">{appt.appointment_date} · {appt.appointment_time}</td>
                                        <td className="px-5 py-3.5"><StatusBadge status={appt.status} /></td>
                                        <td className="px-5 py-3.5 hidden sm:table-cell text-muted-foreground text-xs">{format(new Date(appt.created_at), "MMM d, h:mm a")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Detail Sheet */}
            <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    {selected && (
                        <>
                            <SheetHeader>
                                <SheetTitle className="text-xl font-serif">Appointment Details</SheetTitle>
                            </SheetHeader>
                            <div className="mt-6 space-y-5">
                                <DetailRow icon={User} label="Client" value={selected.client_name} />
                                <DetailRow icon={Mail} label="Email" value={selected.client_email} />
                                <DetailRow icon={Phone} label="Phone" value={selected.client_phone || "Not provided"} />
                                <DetailRow icon={Calendar} label="Service" value={selected.service_type.replace("-", " ")} />
                                <DetailRow icon={Clock} label="Preferred" value={`${selected.appointment_date} · ${selected.appointment_time}`} />
                                {selected.notes && <DetailRow icon={FileText} label="Notes" value={selected.notes} />}

                                <div className="pt-4 border-t border-border/60">
                                    <p className="text-sm font-medium text-foreground mb-2">Admin Notes</p>
                                    <div className="flex flex-col gap-2">
                                        <Textarea
                                            value={adminNote}
                                            onChange={e => setAdminNote(e.target.value)}
                                            className="min-h-[80px]"
                                            placeholder="Add internal notes here. These are not visible to the client."
                                        />
                                        <div className="flex justify-end">
                                            <Button onClick={() => saveAdminNote(selected.id)} size="sm" variant="secondary" disabled={isSavingNote}>
                                                {isSavingNote ? "Saving..." : "Save Note"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border/60">
                                    <p className="text-sm font-medium text-foreground mb-2">Update Status</p>
                                    <div className="flex flex-wrap gap-2">
                                        {statuses.map(s => (
                                            <Button
                                                key={s}
                                                variant={selected.status === s ? "default" : "outline"}
                                                size="sm"
                                                className="rounded-full capitalize"
                                                onClick={() => updateStatus(selected.id, s)}
                                            >
                                                {s}
                                            </Button>
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
                <p className="text-sm text-foreground capitalize">{value}</p>
            </div>
        </div>
    );
}
