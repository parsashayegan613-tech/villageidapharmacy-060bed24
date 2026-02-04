import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Services",
    href: "/services",
    dropdown: [
      { name: "Services Overview", href: "/services" },
      { name: "Compounding", href: "/compounding" },
    ],
  },
  { name: "Refill", href: "/refill" },
  { name: "Transfer", href: "/transfer" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm relative">
          <span>💉 Flu shots now available — walk-ins welcome!</span>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 focus-ring rounded"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">V</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-semibold text-foreground">Village IDA</div>
                <div className="text-xs text-muted-foreground">Pharmacy</div>
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
                          "px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 focus-ring",
                          location.pathname.startsWith("/services") || location.pathname === "/compounding"
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted hover:text-primary"
                        )}
                      >
                        {item.name}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link
                            to={subItem.href}
                            className={cn(
                              "w-full",
                              location.pathname === subItem.href && "bg-primary/10 text-primary"
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
                      "px-4 py-2 text-sm font-medium rounded-lg transition-colors focus-ring",
                      location.pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted hover:text-primary"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link to="/appointments">
                  <Calendar className="h-4 w-4" />
                  Request Appointment
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
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navigation.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="space-y-1">
                  <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
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
            <div className="pt-4 mt-4 border-t border-border">
              <Button asChild className="w-full" variant="outline">
                <Link to="/appointments" onClick={() => setMobileMenuOpen(false)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Request Appointment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
