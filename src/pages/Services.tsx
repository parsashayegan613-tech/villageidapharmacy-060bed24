import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CTABand } from "@/components/CTABand";
import {
  Truck,
  Package,
  ClipboardCheck,
  HeartPulse,
  Cigarette,
  Syringe,
  FlaskConical,
  Home as HomeIcon,
  X,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const categories = [
  { id: "all", label: "All" },
  { id: "medication", label: "Medication Support" },
  { id: "delivery", label: "Delivery" },
  { id: "injections", label: "Injections" },
  { id: "compounding", label: "Compounding" },
  { id: "wellness", label: "Wellness" },
];

const services = [
  {
    id: "delivery",
    icon: Truck,
    title: "Delivery",
    description: "Free prescription delivery to your door.",
    category: "delivery",
    whoItsFor: "Anyone in Edmonton who prefers home delivery.",
    howItWorks: "Request delivery when you refill — we'll call to confirm.",
    whatToBring: "Nothing required for delivery.",
    timing: "Same-day delivery available for most orders.",
    ctaLabel: "Request Refill with Delivery",
    ctaHref: "/refill",
  },
  {
    id: "blister",
    icon: Package,
    title: "Blister Packaging",
    description: "Medications organized by day and time.",
    category: "medication",
    whoItsFor: "Patients managing multiple medications daily.",
    howItWorks: "We pre-sort your medications into easy weekly packs.",
    whatToBring: "List of current medications.",
    timing: "Setup takes 1-2 days, then weekly refills.",
    ctaLabel: "Contact Us",
    ctaHref: "/contact",
  },
  {
    id: "medication-reviews",
    icon: ClipboardCheck,
    title: "Medication Reviews",
    description: "One-on-one review of your medications.",
    category: "medication",
    whoItsFor: "Anyone wanting to understand their medications better.",
    howItWorks: "Book a private session with our pharmacist.",
    whatToBring: "All current medications or a list.",
    timing: "Sessions typically last 15-30 minutes.",
    ctaLabel: "Request Appointment",
    ctaHref: "/appointments",
  },
  {
    id: "diabetes",
    icon: HeartPulse,
    title: "Diabetes Support",
    description: "Personalized diabetes management help.",
    category: "wellness",
    whoItsFor: "Patients managing Type 1 or Type 2 diabetes.",
    howItWorks: "We review your medications, devices, and lifestyle.",
    whatToBring: "Blood glucose records if available.",
    timing: "Initial consultation: 30 minutes.",
    ctaLabel: "Request Appointment",
    ctaHref: "/appointments?type=diabetes",
  },
  {
    id: "smoking",
    icon: Cigarette,
    title: "Smoking Cessation",
    description: "Support to help you quit smoking.",
    category: "wellness",
    whoItsFor: "Anyone ready to quit or thinking about it.",
    howItWorks: "Meet with our pharmacist to build a quit plan.",
    whatToBring: "Nothing required.",
    timing: "First session: 20-30 minutes.",
    ctaLabel: "Request Appointment",
    ctaHref: "/appointments?type=smoking",
  },
  {
    id: "injections",
    icon: Syringe,
    title: "Injection Services",
    description: "Flu shots, vaccines, and more.",
    category: "injections",
    whoItsFor: "Adults seeking immunizations or injections.",
    howItWorks: "Walk in or book an appointment.",
    whatToBring: "Alberta Health Care card.",
    timing: "Walk-ins welcome, appointments preferred.",
    ctaLabel: "Request Appointment",
    ctaHref: "/appointments?type=injection",
  },
  {
    id: "compounding",
    icon: FlaskConical,
    title: "Compounding",
    description: "Custom medications made for you.",
    category: "compounding",
    whoItsFor: "Patients who need specialized formulations.",
    howItWorks: "We create medications tailored to your needs.",
    whatToBring: "Prescription from your doctor.",
    timing: "Most compounds ready in 1-3 days.",
    ctaLabel: "Learn More",
    ctaHref: "/compounding",
  },
  {
    id: "home-health",
    icon: HomeIcon,
    title: "Home Health Care",
    description: "Medical supplies and equipment.",
    category: "wellness",
    whoItsFor: "Patients needing home care products.",
    howItWorks: "Browse our selection or ask our team.",
    whatToBring: "Nothing required.",
    timing: "Most items available same-day.",
    ctaLabel: "Contact Us",
    ctaHref: "/contact",
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              More than just prescriptions — we offer a full range of pharmacy services to support your health.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="sticky top-[64px] z-40 bg-card border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus-ring",
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="text-left bg-card rounded-2xl p-6 shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300 border border-border/50 focus-ring"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Sheet */}
      <Sheet open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedService && (
            <>
              <SheetHeader className="text-left">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <selectedService.icon className="h-7 w-7 text-primary" />
                  </div>
                  <SheetTitle className="text-2xl">{selectedService.title}</SheetTitle>
                </div>
                <p className="text-muted-foreground">{selectedService.description}</p>
              </SheetHeader>

              <div className="mt-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Who it's for</h4>
                      <p className="text-sm text-muted-foreground">{selectedService.whoItsFor}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">How it works</h4>
                      <p className="text-sm text-muted-foreground">{selectedService.howItWorks}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">What to bring</h4>
                      <p className="text-sm text-muted-foreground">{selectedService.whatToBring}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Typical timing</h4>
                      <p className="text-sm text-muted-foreground">{selectedService.timing}</p>
                    </div>
                  </div>
                </div>

                <Button asChild className="w-full" size="lg">
                  <Link to={selectedService.ctaHref} onClick={() => setSelectedService(null)}>
                    {selectedService.ctaLabel}
                  </Link>
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* CTA */}
      <CTABand
        headline="Questions about our services?"
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "Call Now", href: "tel:780-440-4555", external: true }}
      />

      {/* Spacer for mobile dock */}
      <div className="h-16 md:hidden" />
    </Layout>
  );
}
