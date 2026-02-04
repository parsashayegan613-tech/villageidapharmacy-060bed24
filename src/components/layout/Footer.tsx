import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Refill RX", href: "/refill" },
  { name: "Contact", href: "/contact" },
];

const services = [
  "Prescription Services",
  "Compounding",
  "Immunizations",
  "Blister Packaging",
  "Health Consultations",
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                V
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">Village IDA</span>
                <span className="text-xs opacity-70 leading-tight">Pharmacy</span>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Your trusted neighborhood pharmacy in Edmonton, providing personalized care and quality health services since our founding.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-sm opacity-80">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:780-440-4555"
                  className="flex items-start gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <div>(780) 440-4555</div>
                    <div className="text-xs opacity-70">Fax: (780) 440-1931</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:villida@telus.net"
                  className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>villida@telus.net</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm opacity-80">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>7004 98 Ave NW<br />Edmonton, AB T6B 0K7</span>
              </li>
              <li className="flex items-start gap-3 text-sm opacity-80">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>Mon-Fri: 9:00 AM - 6:00 PM</div>
                  <div>Saturday: 10:00 AM - 2:00 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-70">
            <p>© {new Date().getFullYear()} Village IDA Pharmacy. All rights reserved.</p>
            <p className="text-center md:text-right text-xs">
              This pharmacy is licensed by the Alberta College of Pharmacy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
