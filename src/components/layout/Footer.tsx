import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { VillageIdaLogo } from "@/components/VillageIdaLogo";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Refill RX", href: "/refill" },
  { name: "Contact", href: "/contact" },
];

const services = [
  "Prescription Services",
  "Compounding",
  "Flu Shots & Immunizations",
  "Blister Packaging",
  "Free Delivery",
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <VillageIdaLogo size="default" className="mb-4" />
            <p className="text-sm opacity-80 leading-relaxed mt-4">
              Your trusted neighborhood pharmacy in Edmonton, providing personalized care and quality health services to our community for over 25 years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 border-b border-white/20 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:underline transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 border-b border-white/20 pb-2">Our Services</h3>
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
            <h3 className="font-semibold text-lg mb-4 border-b border-white/20 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:780-440-4555"
                  className="flex items-start gap-3 text-sm hover:opacity-100 transition-opacity group"
                >
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 text-accent" />
                  <div>
                    <div className="font-bold text-lg group-hover:underline">780.440.4555</div>
                    <div className="text-xs opacity-70">Fax: 780.440.1931</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:villida@telus.net"
                  className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
                  <span>villida@telus.net</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm opacity-80">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-accent" />
                <span>7004 98 Ave NW<br />Edmonton, AB T6B 0K7</span>
              </li>
              <li className="flex items-start gap-3 text-sm opacity-80">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0 text-success" />
                <div>
                  <div>Mon-Fri: 9:00 AM - 5:00 PM</div>
                  <div>Sat-Sun: By Appointment</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/20 bg-primary/90">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
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