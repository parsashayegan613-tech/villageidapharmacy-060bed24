import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Award, Target, CheckCircle } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We treat every patient with empathy, understanding, and respect, because your health and well-being are our top priority.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "As a local pharmacy, we're invested in the health of our Edmonton community and the families we serve.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards of pharmaceutical care, staying current with the latest healthcare developments.",
  },
  {
    icon: Target,
    title: "Personalization",
    description: "We believe in tailored solutions because every patient's health journey is unique.",
  },
];

const teamMembers = [
  {
    name: "Pharmacist Team",
    role: "Licensed Pharmacists",
    description: "Our team of licensed pharmacists brings decades of combined experience in pharmaceutical care, compounding, and patient consultation.",
  },
  {
    name: "Pharmacy Technicians",
    role: "Certified Technicians",
    description: "Our skilled technicians ensure accurate prescription preparation and provide friendly, efficient service.",
  },
  {
    name: "Support Staff",
    role: "Customer Care",
    description: "Our dedicated support team is here to assist with all your questions, from insurance to delivery scheduling.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Village IDA Pharmacy
            </h1>
            <p className="text-lg text-muted-foreground">
              Your trusted neighborhood pharmacy, serving the Edmonton community with personalized care and professional health services.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Village IDA Pharmacy has been a cornerstone of healthcare in Edmonton's community for over two decades. What started as a small neighborhood pharmacy has grown into a trusted health destination, serving thousands of families across the region.
                </p>
                <p>
                  Located at 7004 98 Ave NW, we've built our reputation on one simple principle: treating every patient like family. Our pharmacists take the time to listen, explain, and ensure you understand your medications and health options.
                </p>
                <p>
                  As an IDA member pharmacy, we combine the personal touch of an independent pharmacy with the resources and buying power of a national network, bringing you the best of both worlds.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-background rounded-xl p-6 shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">25+</div>
                  <div className="text-sm text-muted-foreground">Years Serving Edmonton</div>
                </div>
                <div className="bg-background rounded-xl p-6 shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Patients</div>
                </div>
                <div className="bg-background rounded-xl p-6 shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">ACP Compliant</div>
                </div>
                <div className="bg-background rounded-xl p-6 shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">5★</div>
                  <div className="text-sm text-muted-foreground">Patient Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Mission & Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to improving the health and well-being of our community through exceptional pharmaceutical care and personalized service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center bg-background border-0">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our dedicated professionals are here to provide you with the best possible care
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <div className="text-sm text-primary font-medium mb-3">
                    {member.role}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Our Commitment to Quality
            </h2>
            <div className="space-y-4">
              {[
                "Licensed by the Alberta College of Pharmacy",
                "Fully accredited compounding facility",
                "Pharmacists complete ongoing professional development",
                "Adherence to all provincial and federal pharmacy regulations",
                "Member of IDA Pharmacy network",
                "Commitment to patient privacy and confidentiality",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-background rounded-lg p-4">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience the Village IDA Difference
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Visit us today and discover why thousands of Edmonton families trust us with their health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Visit Us Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
