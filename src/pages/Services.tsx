import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Pill,
  Stethoscope,
  Syringe,
  Heart,
  Package,
  Truck,
  FlaskConical,
  Thermometer,
  ClipboardCheck,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

// Import images
import pharmacistConsultation from "@/assets/pharmacist-consultation.jpg";
import compoundingService from "@/assets/compounding-service.jpg";
import fluShotService from "@/assets/flu-shot-service.jpg";
import deliveryService from "@/assets/delivery-service.jpg";

const services = [
  {
    icon: Pill,
    title: "Prescription Services",
    description: "Fast, accurate prescription filling with personalized consultation for every patient.",
    features: [
      "New prescription filling",
      "Prescription refills",
      "Prescription transfers",
      "Drug interaction checks",
      "Insurance processing",
    ],
  },
  {
    icon: FlaskConical,
    title: "Compounding",
    description: "Custom-formulated medications tailored to your specific health needs.",
    image: compoundingService,
    features: [
      "Hormone replacement",
      "Pediatric formulations",
      "Allergen-free options",
      "Custom dosage forms",
    ],
  },
  {
    icon: Syringe,
    title: "Immunizations",
    description: "Convenient vaccination services administered by certified pharmacists.",
    image: fluShotService,
    features: [
      "Flu shots (seasonal)",
      "COVID-19 vaccines",
      "Travel vaccines",
      "Shingles vaccine",
    ],
  },
  {
    icon: Stethoscope,
    title: "Health Consultations",
    description: "One-on-one sessions with our pharmacists for comprehensive medication reviews.",
    image: pharmacistConsultation,
    features: [
      "Medication reviews",
      "Diabetes management",
      "Blood pressure monitoring",
      "Smoking cessation",
    ],
  },
  {
    icon: Package,
    title: "Blister Packaging",
    description: "Organized medication packaging for easier daily management and compliance.",
    features: [
      "Weekly organizers",
      "Multi-dose packaging",
      "Clear labeling",
      "Ideal for seniors",
    ],
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Convenient prescription delivery right to your home or office.",
    image: deliveryService,
    features: [
      "Free local delivery",
      "Same-day available",
      "Scheduled deliveries",
      "Delivery reminders",
    ],
  },
];

const additionalServices = [
  {
    icon: Thermometer,
    title: "Medical Equipment",
    description: "Blood pressure monitors, glucometers, mobility aids, and more.",
  },
  {
    icon: ClipboardCheck,
    title: "Insurance & Claims",
    description: "We work with all major insurance providers to process your claims.",
  },
  {
    icon: Users,
    title: "Long-Term Care",
    description: "Specialized services for nursing homes and assisted living facilities.",
  },
  {
    icon: Heart,
    title: "Wellness Programs",
    description: "Health screenings, education, and preventive care programs.",
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full border-4 border-white" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full border-4 border-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-accent font-semibold uppercase tracking-wider">What We Offer</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">
              Our Pharmacy Services
            </h1>
            <p className="text-xl opacity-90">
              Comprehensive health services designed to meet all your pharmaceutical needs. From prescription filling to specialized compounding, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="overflow-hidden border-0 shadow-warm-lg group hover:shadow-2xl transition-shadow">
                {service.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <service.icon className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                ) : (
                  <CardHeader className="bg-primary pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                        <service.icon className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-xl text-primary-foreground">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                )}
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">More Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Additional Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We offer a range of additional services to support your health and wellness
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service) => (
              <Card key={service.title} className="text-center bg-ida-cream border-0 shadow-warm hover:shadow-warm-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compounding Highlight */}
      <section className="py-20 bg-ida-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <img 
                  src={compoundingService}
                  alt="Compounding Services"
                  className="rounded-2xl shadow-warm-lg w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-lg hidden lg:block">
                  <FlaskConical className="h-8 w-8 mb-2" />
                  <div className="text-sm font-bold">Custom Medications</div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Specialized Service</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Custom Medications for Your Unique Needs
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Not everyone responds the same way to standard medications. Our compounding pharmacy can create custom medications tailored specifically to your needs.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Personalized formulations",
                  "Quality-tested ingredients",
                  "Expert pharmacist consultations",
                  "Allergen-free options available",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/contact">
                  Inquire About Compounding
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 ida-gradient-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you need a prescription refill or want to learn more about our services, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
              <Link to="/refill">Refill Prescription</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}