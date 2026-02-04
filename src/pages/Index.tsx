import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { StepCard } from "@/components/StepCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { LocationCard } from "@/components/LocationCard";
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
  Phone,
  FileText,
  ArrowRightLeft,
  MessageSquare,
  CheckCircle,
  Star,
  ChevronRight,
  ChevronLeft,
  Calendar,
} from "lucide-react";
import { useState } from "react";

// Services data
const services = [
  {
    icon: Truck,
    title: "Delivery",
    description: "Free prescription delivery to your door.",
    whoItsFor: "Anyone in Edmonton who prefers home delivery.",
    howItWorks: "Request delivery when you refill — we'll call to confirm.",
  },
  {
    icon: Package,
    title: "Blister Packaging",
    description: "Medications organized by day and time.",
    whoItsFor: "Patients managing multiple medications daily.",
    howItWorks: "We pre-sort your medications into easy weekly packs.",
  },
  {
    icon: ClipboardCheck,
    title: "Medication Reviews",
    description: "One-on-one review of your medications.",
    whoItsFor: "Anyone wanting to understand their medications better.",
    howItWorks: "Book a private session with our pharmacist.",
  },
  {
    icon: HeartPulse,
    title: "Diabetes Support",
    description: "Personalized diabetes management help.",
    whoItsFor: "Patients managing Type 1 or Type 2 diabetes.",
    howItWorks: "We review your medications, devices, and lifestyle.",
  },
  {
    icon: Cigarette,
    title: "Smoking Cessation",
    description: "Support to help you quit smoking.",
    whoItsFor: "Anyone ready to quit or thinking about it.",
    howItWorks: "Meet with our pharmacist to build a quit plan.",
  },
  {
    icon: Syringe,
    title: "Injection Services",
    description: "Flu shots, vaccines, and more.",
    whoItsFor: "Adults seeking immunizations or injections.",
    howItWorks: "Walk in or book an appointment.",
  },
  {
    icon: FlaskConical,
    title: "Compounding",
    description: "Custom medications made for you.",
    whoItsFor: "Patients who need specialized formulations.",
    howItWorks: "We create medications tailored to your needs.",
  },
  {
    icon: HomeIcon,
    title: "Home Health Care",
    description: "Medical supplies and equipment.",
    whoItsFor: "Patients needing home care products.",
    howItWorks: "Browse our selection or ask our team.",
  },
];

// Staff data
const staff = [
  {
    name: "Dr. Sarah Chen",
    role: "Lead Pharmacist",
    statement: "I believe every patient deserves time and attention.",
  },
  {
    name: "Michael Torres",
    role: "Pharmacy Manager",
    statement: "We treat every customer like family.",
  },
  {
    name: "Lisa Nguyen",
    role: "Compounding Specialist",
    statement: "Custom solutions are my specialty.",
  },
];

// Reviews data
const reviews = [
  { rating: 5, text: "Best pharmacy in Edmonton. The staff truly cares.", author: "James M." },
  { rating: 5, text: "They always remember my name and my medications.", author: "Patricia L." },
  { rating: 5, text: "The compounding service has been life-changing for my child.", author: "David K." },
  { rating: 5, text: "Fast, friendly, and incredibly knowledgeable.", author: "Sarah T." },
  { rating: 5, text: "I've been coming here for 15 years. Wouldn't go anywhere else.", author: "Robert H." },
  { rating: 5, text: "Their delivery service is a lifesaver.", author: "Emily W." },
];

// FAQ data
const faqs = [
  {
    question: "How do I transfer my prescriptions to Village IDA?",
    answer: "Simply fill out our transfer form online or call us. We handle everything with your old pharmacy — no work required from you.",
  },
  {
    question: "Do you offer prescription delivery?",
    answer: "Yes! We offer free delivery throughout Edmonton. Just request delivery when you place your refill.",
  },
  {
    question: "What is blister packaging?",
    answer: "Blister packaging organizes your medications by day and time in easy-to-use packs. It's especially helpful if you take multiple medications daily.",
  },
  {
    question: "Do I need an appointment for a flu shot?",
    answer: "Walk-ins are welcome during our regular hours, but booking ahead ensures no wait time.",
  },
  {
    question: "What compounding services do you offer?",
    answer: "We create custom medications including dye-free options, alternative dosage forms, flavored medications for children, and topical preparations.",
  },
  {
    question: "How long does a refill take?",
    answer: "Most refills are ready within 15-20 minutes. We'll call or text when your order is ready for pickup or delivery.",
  },
];

export default function Index() {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-secondary overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Your local Edmonton pharmacy for refills, transfers, and personalized care.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              We take the time to know you — your medications, your health goals, and what matters to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild size="lg" className="shadow-soft">
                <Link to="/refill">Refill Request</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/transfer">Transfer to Us</Link>
              </Button>
              <Link 
                to="/appointments" 
                className="inline-flex items-center text-primary font-medium hover:underline self-center"
              >
                Request Appointment
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {/* Trust Row */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Free delivery in Edmonton</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Custom compounding</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Flu shots available</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/5 to-transparent" />
      </section>

      {/* Desktop Quick Actions */}
      <div className="hidden md:block border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex justify-end gap-2 py-3">
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <a href="tel:780-440-4555">
                <Phone className="h-4 w-4" />
                Call
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link to="/refill">
                <FileText className="h-4 w-4" />
                Refill
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link to="/transfer">
                <ArrowRightLeft className="h-4 w-4" />
                Transfer
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What we can help with
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              More than just prescriptions — we offer a full range of pharmacy services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Transfer Steps */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-8">Transfer in 3 steps</h3>
              <div className="space-y-6">
                <StepCard
                  icon={MessageSquare}
                  step={1}
                  title="Tell us where to call"
                  description="Share your current pharmacy name and we'll take it from there."
                />
                <StepCard
                  icon={Phone}
                  step={2}
                  title="We handle the paperwork"
                  description="We contact your old pharmacy and transfer everything over."
                />
                <StepCard
                  icon={CheckCircle}
                  step={3}
                  title="Pick up or get delivery"
                  description="Your medications are ready — choose pickup or free delivery."
                />
              </div>
              <Button asChild className="mt-8" variant="outline">
                <Link to="/transfer">Start a Transfer</Link>
              </Button>
            </div>

            {/* Refill Steps */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-8">Refill in 3 steps</h3>
              <div className="space-y-6">
                <StepCard
                  icon={FileText}
                  step={1}
                  title="Submit your request"
                  description="Enter your prescription numbers online — takes under a minute."
                />
                <StepCard
                  icon={ClipboardCheck}
                  step={2}
                  title="We prepare your order"
                  description="We'll confirm and fill your prescriptions right away."
                />
                <StepCard
                  icon={Truck}
                  step={3}
                  title="Pick up or get delivery"
                  description="Come in when it's ready or we'll bring it to you."
                />
              </div>
              <Button asChild className="mt-8" variant="outline">
                <Link to="/refill">Request a Refill</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Compounding Spotlight */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] bg-muted rounded-2xl flex items-center justify-center">
              <FlaskConical className="h-24 w-24 text-muted-foreground/30" />
            </div>
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wide">Compounding Services</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Medications made just for you
              </h2>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Dye-free and preservative-free options for sensitive patients</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Custom dosage forms when standard options don't work</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Flavoring for children who won't take bitter medications</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/compounding">Learn About Compounding</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/appointments?type=compounding">
                    <Calendar className="h-4 w-4 mr-2" />
                    Request a Consult
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet your pharmacy team
            </h2>
            <p className="text-muted-foreground text-lg">
              Real people who care about your health.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {staff.map((member) => (
              <div key={member.name} className="bg-card rounded-2xl p-6 shadow-soft text-center">
                <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground/50">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground italic">"{member.statement}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-primary text-primary" />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              What our patients say
            </h2>
            <p className="text-muted-foreground">Rated 5 stars by our community</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-soft-lg text-center">
              <p className="text-lg text-foreground mb-6 leading-relaxed">
                "{reviews[currentReview].text}"
              </p>
              <p className="text-sm text-muted-foreground">— {reviews[currentReview].author}</p>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" size="icon" onClick={prevReview}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentReview(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentReview ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={nextReview}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Visit us
            </h2>
            <p className="text-muted-foreground text-lg">
              Conveniently located with free parking.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <LocationCard />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Common questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTABand
        headline="Need help today?"
        primaryAction={{ label: "Call Now", href: "tel:780-440-4555", external: true }}
        secondaryAction={{ label: "Refill Request", href: "/refill" }}
      />

      {/* Spacer for mobile dock */}
      <div className="h-16 md:hidden" />
    </Layout>
  );
}
