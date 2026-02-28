import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Calendar, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Services",
    href: "/services",
    dropdown: [
      { name: "All Services", href: "/services" },
      { name: "Compounding", href: "/compounding" },
    ],
  },
  { name: "Refill", href: "/refill" },
  { name: "Transfer", href: "/transfer" },
  { name: "Appointments", href: "/appointments" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-foreground text-background py-2.5 px-4 text-center text-sm relative">
          <span className="font-medium">💉 Flu shots now available — walk-ins welcome</span>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity focus-ring rounded"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="glass border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex flex-col items-center justify-center bg-primary rounded-xl px-3.5 py-1.5 group-hover:bg-primary/90 transition-colors">
                <span className="text-primary-foreground font-bold tracking-[0.2em] uppercase text-[7px] leading-tight">
                  Village
                </span>
                <span
                  className="font-black leading-none text-primary-foreground"
                  style={{
                    fontSize: 20,
                    textShadow: '1.5px 0 0 hsl(4,80%,56%), -1.5px 0 0 hsl(4,80%,56%), 0 1.5px 0 hsl(4,80%,56%), 0 -1.5px 0 hsl(4,80%,56%)',
                    fontFamily: "'DM Sans', Arial Black, sans-serif",
                    letterSpacing: '0.04em'
                  }}
                >
                  I.D.A.
                </span>
                <span className="text-primary-foreground font-bold tracking-[0.15em] uppercase text-[6px] leading-tight">
                  Pharmacy
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) =>
                item.dropdown ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1 focus-ring",
                          location.pathname.startsWith("/services") || location.pathname === "/compounding"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.name}
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link
                            to={subItem.href}
                            className={cn(
                              "w-full",
                              location.pathname === subItem.href && "text-primary"
                            )}
                          >
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all focus-ring",
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button asChild size="sm" className="rounded-full px-5 gap-2">
                <Link to="/appointments">
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg focus-ring"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card shadow-soft-lg animate-fade-in">
          <div className="container mx-auto px-4 py-6 space-y-1">
            {navigation.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="space-y-1">
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.name}
                  </div>
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block pl-8 pr-4 py-3 rounded-xl text-base font-medium transition-colors",
                        location.pathname === subItem.href
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="pt-4 mt-4 border-t border-border space-y-2">
              <Button asChild className="w-full rounded-full" size="lg">
                <Link to="/appointments" onClick={() => setMobileMenuOpen(false)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
