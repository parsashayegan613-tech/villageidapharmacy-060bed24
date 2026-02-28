import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthProvider";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard, Calendar, RefreshCw, ArrowRightLeft,
    MessageSquare, LogOut, Pill,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Appointments", href: "/admin/appointments", icon: Calendar },
    { label: "Refills", href: "/admin/refills", icon: RefreshCw },
    { label: "Transfers", href: "/admin/transfers", icon: ArrowRightLeft },
    { label: "Messages", href: "/admin/messages", icon: MessageSquare },
];

interface AdminLayoutProps {
    children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const { user, signOut } = useAdminAuth();
    const location = useLocation();

    return (
        <div className="min-h-screen flex bg-muted/30">
            {/* Sidebar */}
            <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border/60 fixed inset-y-0 left-0 z-30">
                {/* Logo */}
                <div className="p-6 border-b border-border/60">
                    <Link to="/admin" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                            <Pill className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                            <p className="font-serif font-bold text-foreground text-sm leading-tight">Village IDA</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Admin Portal</p>
                        </div>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 px-3 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href || (item.href !== "/admin" && location.pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* User */}
                <div className="p-4 border-t border-border/60">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">
                                {user?.email?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{user?.email}</p>
                            <p className="text-[10px] text-muted-foreground">Admin</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground" onClick={signOut}>
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-card border-b border-border/60 px-4 py-3">
                <div className="flex items-center justify-between">
                    <Link to="/admin" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <Pill className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span className="font-serif font-bold text-sm">Admin</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={signOut}>
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
                {/* Mobile nav tabs */}
                <div className="flex gap-1 mt-3 overflow-x-auto pb-1 -mb-1 scrollbar-hide">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href || (item.href !== "/admin" && location.pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                                    isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                )}
                            >
                                <item.icon className="h-3 w-3" />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 pt-[100px] md:pt-0">
                <div className="p-6 md:p-8 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
