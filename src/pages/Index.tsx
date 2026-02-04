import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import {
  Pill,
  Syringe,
  Heart,
  Truck,
  Shield,
  Users,
  Star,
  ArrowRight,
  Phone,
  CheckCircle,
  Stethoscope,
} from "lucide-react";

// Import images
import pharmacyHero from "@/assets/pharmacy-hero.jpg";
import pharmacistConsultation from "@/assets/pharmacist-consultation.jpg";
import compoundingService from "@/assets/compounding-service.jpg";
import fluShotService from "@/assets/flu-shot-service.jpg";
import deliveryService from "@/assets/delivery-service.jpg";

const services = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Right to your door",
    image: deliveryService,
  },
  {
    icon: Syringe,
    title: "Flu Shots",
    description: "Quick & convenient",
    image: fluShotService,
  },
  {
    icon: Stethoscope,
    title: "Medication Reviews",
    description: "Free consultations",
    image: pharmacistConsultation,
  },
];

const quickActions = [
  {
    title: "Refill Rx",
    description: "Refilling your prescription is as simple as clicking the button below.",
    cta: "Click here",
    href: "/refill",
    icon: Pill,
  },
  {
    title: "Transfer Rx",
    description: "Please fill in our form to transfer your prescriptions.",
    cta: "Click here",
    href: "/contact",
    icon: ArrowRight,
  },
  {
    title: "Contact us",
    description: "Please feel free to contact us for more information.",
    cta: "Click here",
    href: "/contact",
    icon: Phone,
  },
];

const testimonials = [
  {
    quote: "The staff at Village IDA always take the time to explain my medications. They feel like family!",
    author: "Margaret L.",
    role: "Patient since 2010",
  },
  {
    quote: "Their compounding services changed my life. Finally, medication that works for my specific needs.",
    author: "David K.",
    role: "Compounding Patient",
  },
  {
    quote: "Convenient, friendly, and professional. I wouldn't go anywhere else for my prescriptions.",
    author: "Sarah M.",
    role: "Local Resident",
  },
];

const features = [
  "Free Delivery",
  "Free Medication Reviews",
  "Diabetes Education",
  "Home Health Care",
  "Compounding Services",
  "Flu Shots & Vaccines",
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[600px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pharmacyHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Village IDA Pharmacy
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {features.map((feature) => (
                <span 
                  key={feature}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  {feature}
                </span>
              ))}
            </div>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Your trusted community pharmacy serving Edmonton families with personalized care and professional health services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg shadow-lg">
                <Link to="/refill">
                  Refill Prescription
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-primary">
                <a href="tel:780-440-4555">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards - Signature Red Cards */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className="group block transform hover:-translate-y-1 transition-transform"
              >
                <Card className="h-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors overflow-hidden shadow-warm-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                        <action.icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                        <p className="text-sm opacity-90 mb-4">{action.description}</p>
                        <div className="inline-flex items-center gap-1 px-4 py-2 bg-success text-success-foreground text-sm font-bold rounded shadow-md group-hover:shadow-lg transition-shadow">
                          {action.cta}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services with Images */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive pharmacy services designed to meet all your health needs
            </p>
          </div>
          
          {/* Featured Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service) => (
              <div 
                key={service.title}
                className="group relative overflow-hidden rounded-2xl shadow-warm-lg"
              >
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <service.icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                      <p className="text-sm opacity-80">{service.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Compounding Highlight with Image */}
      <section className="py-20 bg-ida-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src={compoundingService}
                alt="Compounding Services"
                className="rounded-2xl shadow-warm-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-lg hidden md:block">
                <div className="text-3xl font-bold">25+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Specialized Service</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Custom Compounding Services
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Not everyone responds the same way to standard medications. Our compounding pharmacy creates custom medications tailored specifically to your needs.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Hormone Replacement Therapy",
                  "Pediatric Formulations",
                  "Allergen-Free Medications",
                  "Custom Dosage Forms",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/services">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Village IDA</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-8">
                Your Health Is Our Priority
              </h2>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <Users className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-xl mb-2">Personalized Care</h3>
                    <p className="text-muted-foreground">We take time to understand your unique health needs and provide tailored solutions for you and your family.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <Shield className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-xl mb-2">Licensed Professionals</h3>
                    <p className="text-muted-foreground">Our pharmacists are fully certified by the Alberta College of Pharmacy with ongoing training.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <Heart className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-xl mb-2">Community Focused</h3>
                    <p className="text-muted-foreground">Serving Edmonton families for over 25 years with dedication, compassion, and care.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={pharmacistConsultation}
                alt="Pharmacist Consultation"
                className="rounded-2xl shadow-warm-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              What Our Patients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-warm">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <blockquote className="text-foreground mb-6 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t border-border pt-4">
                    <div className="font-bold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 ida-gradient-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-4 border-white" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border-4 border-white" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full border-4 border-white -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Experience Better Care?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Visit us today or reach out with any questions. We're here to help you stay healthy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg shadow-lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-primary">
              <a href="tel:780-440-4555">Call 780.440.4555</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}