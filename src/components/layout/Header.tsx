import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Refill RX", href: "/refill" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar - IDA Blue header with contact info */}
      <div className="ida-gradient-blue text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            {/* Logo and Name */}
            <Link to="/" className="flex items-center gap-4">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-sm font-medium tracking-wider uppercase opacity-90">Village</span>
                <span className="text-3xl md:text-4xl font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                  I.D.A.
                </span>
                <span className="text-sm font-medium tracking-widest uppercase opacity-90">Pharmacy</span>
              </div>
            </Link>

            {/* Contact Info */}
            <div className="hidden md:flex flex-col items-end text-right">
              <div className="flex items-center gap-2 text-sm opacity-90">
                <Clock className="h-4 w-4" />
                <span>Monday - Friday: 9:00 am to 5:00 pm</span>
              </div>
              <div className="text-sm opacity-90">Saturday & Sunday: By Appointment</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-white/90">Call us now!</span>
                <a 
                  href="tel:780-440-4555" 
                  className="text-xl font-bold text-ida-red hover:opacity-80 transition-opacity"
                  style={{ color: 'hsl(0 75% 55%)' }}
                >
                  780.440.4555
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar - Green accent strip then white nav */}
      <div className="h-1 bg-success" />
      <nav className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-12 items-center justify-between">
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors relative",
                    location.pathname === item.href
                      ? "text-primary bg-ida-blue-light"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile: Show phone number */}
            <a 
              href="tel:780-440-4555" 
              className="md:hidden flex items-center gap-2 text-primary font-semibold"
            >
              <Phone className="h-4 w-4" />
              <span>780.440.4555</span>
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-md text-base font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-border">
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/refill" onClick={() => setMobileMenuOpen(false)}>
                  Refill Prescription
                </Link>
              </Button>
            </div>
            {/* Mobile contact info */}
            <div className="pt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Mon-Fri: 9AM-5PM | Sat-Sun: By Appt</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}