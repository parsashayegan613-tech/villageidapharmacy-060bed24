import { Link } from "react-router-dom";
import { MapPin, Phone, Printer, Mail, Clock } from "lucide-react";

const quickLinks = [
  { name: "Refill Request", href: "/refill" },
  { name: "Transfer to Us", href: "/transfer" },
  { name: "Request Appointment", href: "/appointments" },
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
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <div className="flex flex-col items-center justify-center bg-primary-foreground rounded-lg px-4 py-2">
                <span className="text-primary font-bold tracking-[0.25em] uppercase text-[8px]">
                  Village
                </span>
                <span 
                  className="font-black leading-none text-primary"
                  style={{ 
                    fontSize: 22,
                    textShadow: '1.5px 0 0 hsl(0,70%,50%), -1.5px 0 0 hsl(0,70%,50%), 0 1.5px 0 hsl(0,70%,50%), 0 -1.5px 0 hsl(0,70%,50%), 1px 1px 0 hsl(0,70%,50%), -1px -1px 0 hsl(0,70%,50%), 1px -1px 0 hsl(0,70%,50%), -1px 1px 0 hsl(0,70%,50%)',
                    fontFamily: 'Arial Black, Impact, sans-serif',
                    letterSpacing: '0.02em'
                  }}
                >
                  I.D.A.
                </span>
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-[7px]">
                  Pharmacy
                </span>
              </div>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed">
              Your local Edmonton pharmacy for personalized care, prescription services, and trusted health advice.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-80" />
                <span className="opacity-90">7004 98 Ave, Edmonton, AB T6A 0A5</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 opacity-80" />
                <a href="tel:780-440-4555" className="opacity-90 hover:opacity-100 transition-opacity">
                  780-440-4555
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Printer className="h-4 w-4 flex-shrink-0 opacity-80" />
                <span className="opacity-90">780-440-1931</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 opacity-80" />
                <a href="mailto:villida@telus.net" className="opacity-90 hover:opacity-100 transition-opacity">
                  villida@telus.net
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Hours</h3>
            <ul className="space-y-2 text-sm">
              {hours.map((item) => (
                <li key={item.day} className="flex items-start gap-3">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-80" />
                  <div>
                    <div className="opacity-90 font-medium">{item.day}</div>
                    <div className="opacity-70">{item.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="opacity-80 hover:opacity-100 transition-opacity inline-block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm opacity-70">
            <p>© {new Date().getFullYear()} Village IDA Pharmacy. All rights reserved.</p>
            <p>Member of the IDA Pharmacy Group</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
