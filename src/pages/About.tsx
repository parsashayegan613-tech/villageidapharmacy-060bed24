import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Award, Target, CheckCircle } from "lucide-react";

// Import images
import pharmacistConsultation from "@/assets/pharmacist-consultation.jpg";
import pharmacyHero from "@/assets/pharmacy-hero.jpg";

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We treat every patient with empathy, understanding, and respect.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We're invested in the health of our Edmonton community.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards of pharmaceutical care.",
  },
  {
    icon: Target,
    title: "Personalization",
    description: "Every patient's health journey is unique to us.",
  },
];

const stats = [
  { value: "25+", label: "Years Serving Edmonton" },
  { value: "10K+", label: "Happy Patients" },
  { value: "100%", label: "ACP Compliant" },
  { value: "5★", label: "Patient Rating" },
];

const certifications = [
  "Licensed by the Alberta College of Pharmacy",
  "Fully accredited compounding facility",
  "Pharmacists complete ongoing professional development",
  "Adherence to all provincial and federal pharmacy regulations",
  "Member of IDA Pharmacy network",
  "Commitment to patient privacy and confidentiality",
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pharmacyHero})` }}
        >
          <div className="absolute inset-0 bg-primary/90" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-white">
            <span className="text-accent font-semibold uppercase tracking-wider">Our Story</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">
              About Village IDA Pharmacy
            </h1>
            <p className="text-xl opacity-90">
              Your trusted neighborhood pharmacy, serving the Edmonton community with personalized care and professional health services for over 25 years.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-accent text-accent-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Who We Are</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                A Community Pharmacy With Heart
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                  Village IDA Pharmacy has been a cornerstone of healthcare in Edmonton's community for over two decades. What started as a small neighborhood pharmacy has grown into a trusted health destination.
                </p>
                <p>
                  Located at 7004 98 Ave NW, we've built our reputation on one simple principle: <strong className="text-foreground">treating every patient like family.</strong>
                </p>
                <p>
                  As an IDA member pharmacy, we combine the personal touch of an independent pharmacy with the resources of a national network, bringing you the best of both worlds.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src={pharmacistConsultation}
                alt="Pharmacist helping customer"
                className="rounded-2xl shadow-warm-lg w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg hidden lg:block">
                <div className="text-3xl font-bold">Since</div>
                <div className="text-lg">1998</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to improving the health and well-being of our community through exceptional pharmaceutical care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center bg-white border-0 shadow-warm hover:shadow-warm-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Dedicated Healthcare Professionals
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-warm overflow-hidden">
              <div className="h-48 bg-primary flex items-center justify-center">
                <Users className="h-20 w-20 text-primary-foreground opacity-50" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-1">Pharmacist Team</h3>
                <p className="text-accent font-medium text-sm mb-3">Licensed Pharmacists</p>
                <p className="text-muted-foreground text-sm">
                  Our team of licensed pharmacists brings decades of combined experience in pharmaceutical care and patient consultation.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-warm overflow-hidden">
              <div className="h-48 bg-success flex items-center justify-center">
                <Award className="h-20 w-20 text-success-foreground opacity-50" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-1">Pharmacy Technicians</h3>
                <p className="text-accent font-medium text-sm mb-3">Certified Professionals</p>
                <p className="text-muted-foreground text-sm">
                  Our skilled technicians ensure accurate prescription preparation and provide friendly, efficient service.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-warm overflow-hidden">
              <div className="h-48 bg-accent flex items-center justify-center">
                <Heart className="h-20 w-20 text-accent-foreground opacity-50" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-1">Support Staff</h3>
                <p className="text-primary font-medium text-sm mb-3">Customer Care</p>
                <p className="text-muted-foreground text-sm">
                  Our dedicated support team assists with all your questions, from insurance to delivery scheduling.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-ida-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Standards</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                Commitment to Quality
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-warm">
                  <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 ida-gradient-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience the Village IDA Difference
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Visit us today and discover why thousands of Edmonton families trust us with their health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
              <Link to="/contact">Visit Us Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}