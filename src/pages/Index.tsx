import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import {
  Pill,
  Stethoscope,
  Syringe,
  Heart,
  Truck,
  Clock,
  Shield,
  Users,
  Star,
  ArrowRight,
  Phone,
} from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Prescription delivery right to your door at no extra cost.",
  },
  {
    icon: Syringe,
    title: "Flu Shots",
    description: "Quick and convenient immunizations from certified pharmacists.",
  },
  {
    icon: Stethoscope,
    title: "Medication Reviews",
    description: "Free consultations to review your medications and health.",
  },
  {
    icon: Heart,
    title: "Diabetes Education",
    description: "Comprehensive support for diabetes management.",
  },
  {
    icon: Pill,
    title: "Compounding",
    description: "Custom medications tailored to your unique needs.",
  },
  {
    icon: Clock,
    title: "Home Health Care",
    description: "Support for patients managing health from home.",
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

export default function Index() {
  return (
    <Layout>
      {/* Hero Section - Pharmacy storefront style */}
      <section className="relative bg-ida-cream overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ida-blue-light/50 to-transparent" />
        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Village IDA Pharmacy
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                <strong>Free delivery, Free medication reviews, Diabetes education, Home health care, AND MUCH MORE.</strong>
              </p>
              <p className="text-muted-foreground mb-8">
                Your trusted community pharmacy serving Edmonton families with personalized care and professional health services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg">
                  <Link to="/refill">
                    Refill Prescription
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <a href="tel:780-440-4555">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us Now
                  </a>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-80 h-64 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-warm-lg">
                  <div className="text-center text-primary-foreground p-6">
                    <div className="text-sm uppercase tracking-wider mb-2">Your Neighborhood</div>
                    <div className="text-4xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>I.D.A.</div>
                    <div className="text-xl">Pharmacy</div>
                    <div className="mt-4 text-sm opacity-90">Serving Edmonton Since 1998</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards - Signature Red Cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className="group block"
              >
                <Card className="h-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors overflow-hidden shadow-warm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                        <action.icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                        <p className="text-sm opacity-90 mb-3">{action.description}</p>
                        <div className="inline-flex items-center gap-1 px-4 py-1.5 bg-success text-success-foreground text-sm font-medium rounded">
                          {action.cta}
                          <ArrowRight className="h-4 w-4" />
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

      {/* Services Overview */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive pharmacy services designed to meet all your health needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.title} className="group hover:shadow-warm-lg transition-all bg-white border-0">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Village IDA?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">Personalized Care</h3>
                    <p className="text-muted-foreground">We take time to understand your unique health needs and provide tailored solutions.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">Licensed Professionals</h3>
                    <p className="text-muted-foreground">Our pharmacists are fully certified by the Alberta College of Pharmacy.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">Community Focused</h3>
                    <p className="text-muted-foreground">Serving Edmonton families for over 25 years with dedication and care.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-success/5 rounded-2xl p-8 md:p-10 shadow-warm">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-accent mx-auto flex items-center justify-center mb-6">
                  <Pill className="h-10 w-10 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Need a Prescription Refill?</h3>
                <p className="text-muted-foreground mb-6">Submit your refill request online and we'll have it ready for pickup or delivery.</p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/refill">Request Refill Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Patients Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Hear from the community we proudly serve
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-warm">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <blockquote className="text-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 ida-gradient-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Better Pharmacy Care?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Visit us today or reach out with any questions. We're here to help you stay healthy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg">
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