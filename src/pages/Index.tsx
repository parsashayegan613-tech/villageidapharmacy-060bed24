import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import {
  Pill,
  Stethoscope,
  Syringe,
  Heart,
  Package,
  Clock,
  Shield,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Pill,
    title: "Prescription Services",
    description: "Fast, accurate prescription filling with personalized consultations.",
  },
  {
    icon: Stethoscope,
    title: "Compounding",
    description: "Custom medications tailored to your unique health needs.",
  },
  {
    icon: Syringe,
    title: "Immunizations",
    description: "Flu shots, travel vaccines, and more from certified pharmacists.",
  },
  {
    icon: Heart,
    title: "Health Consultations",
    description: "One-on-one medication reviews and health advice.",
  },
  {
    icon: Package,
    title: "Blister Packaging",
    description: "Organized medication packaging for easy daily management.",
  },
  {
    icon: Clock,
    title: "Free Delivery",
    description: "Convenient prescription delivery right to your door.",
  },
];

const trustIndicators = [
  { value: "25+", label: "Years of Service" },
  { value: "10,000+", label: "Happy Patients" },
  { value: "Licensed", label: "ACP Certified" },
  { value: "5★", label: "Patient Rating" },
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-pharmacy-gradient-light overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Trusted
              <span className="text-primary"> Community Pharmacy</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              At Village IDA Pharmacy, we believe in personalized care. Our experienced pharmacists are dedicated to helping you and your family stay healthy with expert advice and quality services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg">
                <Link to="/refill">
                  Refill Prescription
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustIndicators.map((item) => (
              <div key={item.label}>
                <div className="text-3xl md:text-4xl font-bold">{item.value}</div>
                <div className="text-sm opacity-90">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-background">
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
              <Card key={service.title} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
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
            <Button asChild variant="outline" size="lg">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Village IDA?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Personalized Care</h3>
                    <p className="text-muted-foreground">We take time to understand your unique health needs and provide tailored solutions.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Licensed Professionals</h3>
                    <p className="text-muted-foreground">Our pharmacists are fully certified by the Alberta College of Pharmacy.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Star className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Community Focused</h3>
                    <p className="text-muted-foreground">Serving Edmonton families for over 25 years with dedication and care.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary mx-auto flex items-center justify-center mb-6">
                  <Heart className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Need a Prescription Refill?</h3>
                <p className="text-muted-foreground mb-6">Submit your refill request online and we'll have it ready for pickup or delivery.</p>
                <Button asChild size="lg">
                  <Link to="/refill">Request Refill Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-background">
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
              <Card key={index} className="bg-secondary border-0">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
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
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Better Pharmacy Care?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Visit us today or reach out with any questions. We're here to help you stay healthy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:780-440-4555">Call (780) 440-4555</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
