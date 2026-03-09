"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, FileText, ArrowRightLeft, Calendar, MessageSquare, LogOut, Menu, X, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
    { href: "/admin/patients", label: "Patients", icon: Users },
    { href: "/admin/refills", label: "Refills", icon: FileText },
    { href: "/admin/transfers", label: "Transfers", icon: ArrowRightLeft },
    { href: "/admin/appointments", label: "Appointments", icon: Calendar },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (pathname === "/admin/login") { setLoading(false); return; }
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) router.replace("/admin/login");
            else setLoading(false);
        });
    }, [pathname, router]);

    if (pathname === "/admin/login") return <>{children}</>;

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
        );
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace("/admin/login");
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex">
            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-60 bg-zinc-900 border-r border-zinc-800 flex flex-col transition-transform duration-300 md:translate-x-0",
                mobileOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-5 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">IDA</span>
                        </div>
                        <div>
                            <p className="text-white font-semibold text-sm leading-tight">Village IDA</p>
                            <p className="text-zinc-500 text-xs">Admin Panel</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-3 space-y-0.5">
                    {navItems.map((item) => {
                        const isActive = item.exact
                            ? pathname === item.href
                            : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-blue-600/15 text-blue-400"
                                        : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                                )}
                            >
                                <item.icon className="h-4 w-4 flex-shrink-0" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-zinc-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-400/5 w-full transition-all"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {mobileOpen && (
                <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setMobileOpen(false)} />
            )}

            <div className="flex-1 md:ml-60 min-h-screen flex flex-col">
                {/* Mobile header */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900 sticky top-0 z-30">
                    <button onClick={() => setMobileOpen(true)} className="text-zinc-400 hover:text-white transition-colors">
                        <Menu className="h-5 w-5" />
                    </button>
                    <p className="text-white font-semibold text-sm">Admin</p>
                    <div className="w-5" />
                </div>

                <main className="flex-1 p-5 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
