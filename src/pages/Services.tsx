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
} from "lucide-react";

const services = [
  {
    icon: Pill,
    title: "Prescription Services",
    description: "Fast, accurate prescription filling with personalized consultation for every patient.",
    features: [
      "New prescription filling",
      "Prescription refills",
      "Prescription transfers from other pharmacies",
      "Medication synchronization",
      "Drug interaction checks",
      "Insurance claim processing",
    ],
  },
  {
    icon: FlaskConical,
    title: "Compounding",
    description: "Custom-formulated medications tailored to your specific health needs.",
    features: [
      "Hormone replacement therapy",
      "Pediatric formulations",
      "Dermatological preparations",
      "Veterinary compounds",
      "Allergen-free medications",
      "Custom strength and dosage forms",
    ],
  },
  {
    icon: Syringe,
    title: "Immunizations",
    description: "Convenient vaccination services administered by certified pharmacists.",
    features: [
      "Flu shots (seasonal)",
      "COVID-19 vaccinations",
      "Travel vaccines",
      "Shingles vaccine",
      "Pneumonia vaccine",
      "Hepatitis A & B vaccines",
    ],
  },
  {
    icon: Stethoscope,
    title: "Health Consultations",
    description: "One-on-one sessions with our pharmacists for comprehensive medication reviews.",
    features: [
      "Medication therapy management",
      "Diabetes management",
      "Blood pressure monitoring",
      "Cholesterol screening",
      "Smoking cessation programs",
      "Weight management advice",
    ],
  },
  {
    icon: Package,
    title: "Blister Packaging",
    description: "Organized medication packaging for easier daily management and compliance.",
    features: [
      "Weekly medication organizers",
      "Multi-dose packaging",
      "Clear labeling with date/time",
      "Ideal for seniors",
      "Reduces medication errors",
      "Sync with prescription refills",
    ],
  },
  {
    icon: Truck,
    title: "Delivery Services",
    description: "Convenient prescription delivery right to your home or office.",
    features: [
      "Free local delivery",
      "Same-day delivery available",
      "Scheduled recurring deliveries",
      "Signature confirmation",
      "Temperature-controlled transport",
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
      <section className="bg-ida-cream py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Pharmacy Services
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive health services designed to meet all your pharmaceutical needs. From prescription filling to specialized compounding, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="overflow-hidden border-0 shadow-warm">
                <CardHeader className="bg-secondary pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                      <service.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
                        {feature}
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
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Additional Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We offer a range of additional services to support your health and wellness
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service) => (
              <Card key={service.title} className="text-center bg-white border-0 shadow-warm">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
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
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-primary/10 to-success/10 rounded-2xl p-8 md:p-10 shadow-warm">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6">
                  <FlaskConical className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Specialized Compounding
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our compounding services allow us to create medications that aren't commercially available. Whether you need a different dosage form, strength, or flavor, we can customize your prescription.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    Personalized formulations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    Quality-tested ingredients
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    Expert pharmacist consultations
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Custom Medications for Your Unique Needs
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Not everyone responds the same way to standard medications. Our compounding pharmacy can create custom medications tailored specifically to your needs.
                </p>
                <p>
                  From hormone replacement therapy to pediatric formulations, our experienced pharmacists work with your healthcare provider to create the perfect solution for you.
                </p>
                <p>
                  We also offer compounding for patients with allergies to dyes, lactose, gluten, or other inactive ingredients found in commercial medications.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/contact">
                    Inquire About Compounding
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 ida-gradient-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you need a prescription refill or want to learn more about our services, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
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