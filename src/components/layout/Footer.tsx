import { Link } from "react-router-dom";
import { MapPin, Phone, Printer, Mail, Clock, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { name: "Refill Request", href: "/refill" },
  { name: "Transfer to Us", href: "/transfer" },
  { name: "Book Appointment", href: "/appointments" },
  { name: "Services", href: "/services" },
  { name: "Compounding", href: "/compounding" },
  { name: "Contact", href: "/contact" },
];

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 5:00 PM" },
  { day: "Saturday & Sunday", time: "By Appointment" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <div className="flex flex-col items-center justify-center bg-background rounded-xl px-4 py-2">
                <span className="text-foreground font-bold tracking-[0.2em] uppercase text-[7px] leading-tight">
                  Village
                </span>
                <span 
                  className="font-black leading-none text-foreground"
                  style={{ 
                    fontSize: 20,
                    textShadow: '1.5px 0 0 hsl(4,80%,56%), -1.5px 0 0 hsl(4,80%,56%), 0 1.5px 0 hsl(4,80%,56%), 0 -1.5px 0 hsl(4,80%,56%)',
                    fontFamily: "'DM Sans', Arial Black, sans-serif",
                    letterSpacing: '0.04em'
                  }}
                >
                  I.D.A.
                </span>
                <span className="text-foreground font-bold tracking-[0.15em] uppercase text-[6px] leading-tight">
                  Pharmacy
                </span>
              </div>
            </Link>
            <p className="text-sm opacity-60 leading-relaxed max-w-[260px]">
              Your local Edmonton pharmacy for personalized care, prescription services, and trusted health advice.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans font-semibold mb-5 text-sm uppercase tracking-wider opacity-80">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-50" />
                <span className="opacity-70">7004 98 Ave, Edmonton, AB T6A 0A5</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 opacity-50" />
                <a href="tel:780-440-4555" className="opacity-70 hover:opacity-100 transition-opacity">780-440-4555</a>
              </li>
              <li className="flex items-center gap-3">
                <Printer className="h-4 w-4 flex-shrink-0 opacity-50" />
                <span className="opacity-70">780-440-1931</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 opacity-50" />
                <a href="mailto:villida@telus.net" className="opacity-70 hover:opacity-100 transition-opacity">villida@telus.net</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-sans font-semibold mb-5 text-sm uppercase tracking-wider opacity-80">Hours</h3>
            <ul className="space-y-3 text-sm">
              {hours.map((item) => (
                <li key={item.day} className="flex items-start gap-3">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-50" />
                  <div>
                    <div className="opacity-80 font-medium">{item.day}</div>
                    <div className="opacity-50">{item.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans font-semibold mb-5 text-sm uppercase tracking-wider opacity-80">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="opacity-60 hover:opacity-100 transition-opacity inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs opacity-40">
            <p>© {new Date().getFullYear()} Village IDA Pharmacy. All rights reserved.</p>
            <p>Member of the IDA Pharmacy Group</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
