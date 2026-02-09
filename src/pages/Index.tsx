import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { StepCard } from "@/components/StepCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { LocationCard } from "@/components/LocationCard";
import { CTABand } from "@/components/CTABand";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SEOHead } from "@/components/SEOHead";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck, Package, ClipboardCheck, HeartPulse, Cigarette, Syringe,
  FlaskConical, Home as HomeIcon, Phone, FileText, ArrowRightLeft, Star,
  MessageSquare, CheckCircle, ChevronRight, ChevronLeft, Calendar,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import heroImage from "@/assets/pharmacy-hero-new.jpg";
import compoundingImage from "@/assets/compounding-closeup.jpg";

// Services data
const services = [
  { icon: Truck, title: "Delivery", description: "Free prescription delivery to your door.", whoItsFor: "Anyone in Edmonton who prefers home delivery.", howItWorks: "Request delivery when you refill — we'll call to confirm." },
  { icon: Package, title: "Blister Packaging", description: "Medications organized by day and time.", whoItsFor: "Patients managing multiple medications daily.", howItWorks: "We pre-sort your medications into easy weekly packs." },
  { icon: ClipboardCheck, title: "Medication Reviews", description: "One-on-one review of your medications.", whoItsFor: "Anyone wanting to understand their medications better.", howItWorks: "Book a private session with our pharmacist." },
  { icon: HeartPulse, title: "Diabetes Support", description: "Personalized diabetes management help.", whoItsFor: "Patients managing Type 1 or Type 2 diabetes.", howItWorks: "We review your medications, devices, and lifestyle." },
  { icon: Cigarette, title: "Smoking Cessation", description: "Support to help you quit smoking.", whoItsFor: "Anyone ready to quit or thinking about it.", howItWorks: "Meet with our pharmacist to build a quit plan." },
  { icon: Syringe, title: "Injection Services", description: "Flu shots, vaccines, and more.", whoItsFor: "Adults seeking immunizations or injections.", howItWorks: "Walk in or book an appointment." },
  { icon: FlaskConical, title: "Compounding", description: "Custom medications made for you.", whoItsFor: "Patients who need specialized formulations.", howItWorks: "We create medications tailored to your needs." },
  { icon: HomeIcon, title: "Home Health Care", description: "Medical supplies and equipment.", whoItsFor: "Patients needing home care products.", howItWorks: "Browse our selection or ask our team." },
];

const staff = [
  { name: "Dr. Sarah Chen", role: "Lead Pharmacist", statement: "I believe every patient deserves time and attention." },
  { name: "Michael Torres", role: "Pharmacy Manager", statement: "We treat every customer like family." },
  { name: "Lisa Nguyen", role: "Compounding Specialist", statement: "Custom solutions are my specialty." },
];

const reviews = [
  { rating: 5, text: "Truly the most thoughtful and caring pharmacy I've ever dealt with. I appreciate Heidi and her team so much. They always go above and beyond, and treat their customers like family. You'll be in great hands with this pharmacy!", author: "Anna Romkey" },
  { rating: 5, text: "Village Pharmacy provides the best service and advise over any other pharmacy in town. My husband and I have gone here for our pharmaceutical needs for years. Heidi and Anoosh are extremely kind, knowledgeable and helpful. We would give them a 10 star rating if possible.", author: "Sharon Kreuzer" },
  { rating: 5, text: "Best Pharmacy in the city hands down!! I've been going here for 30 years now and Heidi & her husband are so warm welcoming and very knowledgeable not to mention EXTREMELY accommodating by delivering my daily medication all across the city for me. Highly recommend!!", author: "Sherilee Donison" },
  { rating: 5, text: "This pharmacy team is absolutely fantastic, so kind and knowledgeable. Real concern for their patients health and well-being. Recommended 10/10 ✨❤️ They patiently listen to you and often exceed expectations with their knowledge and advice. Simply the best.", author: "April Lavergne" },
  { rating: 5, text: "This is a very caring and friendly place to have as a pharmacy. I have dealt with them for about five years and never once had a problem. They are always more than willing to help with information and when they gave me my flu and covid shots I didn't even feel them!", author: "K Webster" },
  { rating: 5, text: "Heidi and her team are fantastic! They treat you like family with their care and service. I recommend this pharmacy to all of my family, friends, and clients.", author: "Craig Stretch" },
];

const faqs = [
  { question: "How do I transfer my prescriptions to Village IDA?", answer: "Simply fill out our transfer form online or call us. We handle everything with your old pharmacy — no work required from you." },
  { question: "Do you offer prescription delivery?", answer: "Yes! We offer free delivery throughout Edmonton. Just request delivery when you place your refill." },
  { question: "What is blister packaging?", answer: "Blister packaging organizes your medications by day and time in easy-to-use packs. It's especially helpful if you take multiple medications daily." },
  { question: "Do I need an appointment for a flu shot?", answer: "Walk-ins are welcome during our regular hours, but booking ahead ensures no wait time." },
  { question: "What compounding services do you offer?", answer: "We create custom medications including dye-free options, alternative dosage forms, flavored medications for children, and topical preparations." },
  { question: "How long does a refill take?", answer: "Most refills are ready within 15-20 minutes. We'll call or text when your order is ready for pickup or delivery." },
];

export default function Index() {
  const [currentReview, setCurrentReview] = useState(0);
  const nextReview = useCallback(() => setCurrentReview((prev) => (prev + 1) % reviews.length), []);

  useEffect(() => {
    const timer = setInterval(nextReview, 7000);
    return () => clearInterval(timer);
  }, [nextReview]);

  return (
    <Layout>
      <SEOHead 
        title="Village IDA Pharmacy | Edmonton Prescription & Health Services"
        description="Your local Edmonton pharmacy for refills, transfers, compounding, and personalized care. Free delivery available. Call 780-440-4555."
      />

      {/* Skip to content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to main content
      </a>

      {/* Hero Section */}
      <section id="main-content" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Your local Edmonton pharmacy for refills, transfers, and personalized care.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              We take the time to know you — your medications, your health goals, and what matters to you.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button asChild size="lg" className="shadow-soft">
                <Link to="/refill">Refill Request</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-card/80 backdrop-blur-sm">
                <Link to="/transfer">Transfer to Us</Link>
              </Button>
              <Link 
                to="/appointments" 
                className="inline-flex items-center text-primary font-medium hover:underline self-center"
              >
                Request Appointment
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>
            
            {/* Trust Row */}
            <motion.div 
              className="flex flex-wrap gap-4 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Free delivery in Edmonton</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Custom compounding</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Flu shots available</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Desktop Quick Actions */}
      <div className="hidden md:block border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex justify-end gap-2 py-3">
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <a href="tel:780-440-4555"><Phone className="h-4 w-4" />Call</a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link to="/refill"><FileText className="h-4 w-4" />Refill</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link to="/transfer"><ArrowRightLeft className="h-4 w-4" />Transfer</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What we can help with
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                More than just prescriptions — we offer a full range of pharmacy services.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.08}>
                <ServiceCard {...service} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <ScrollReveal direction="left">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8">Transfer in 3 steps</h3>
                <div className="space-y-6">
                  <StepCard icon={MessageSquare} step={1} title="Tell us where to call" description="Share your current pharmacy name and we'll take it from there." />
                  <StepCard icon={Phone} step={2} title="We handle the paperwork" description="We contact your old pharmacy and transfer everything over." />
                  <StepCard icon={CheckCircle} step={3} title="Pick up or get delivery" description="Your medications are ready — choose pickup or free delivery." />
                </div>
                <Button asChild className="mt-8" variant="outline">
                  <Link to="/transfer">Start a Transfer</Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8">Refill in 3 steps</h3>
                <div className="space-y-6">
                  <StepCard icon={FileText} step={1} title="Submit your request" description="Enter your prescription numbers online — takes under a minute." />
                  <StepCard icon={ClipboardCheck} step={2} title="We prepare your order" description="We'll confirm and fill your prescriptions right away." />
                  <StepCard icon={Truck} step={3} title="Pick up or get delivery" description="Come in when it's ready or we'll bring it to you." />
                </div>
                <Button asChild className="mt-8" variant="outline">
                  <Link to="/refill">Request a Refill</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Compounding Spotlight */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-soft-lg">
                <img 
                  src={compoundingImage} 
                  alt="Pharmacist compounding custom medication"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div>
                <span className="text-sm font-medium text-primary uppercase tracking-wide">Compounding Services</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                  Medications made just for you
                </h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Dye-free and preservative-free options for sensitive patients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Custom dosage forms when standard options don't work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
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
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet your pharmacy team</h2>
              <p className="text-muted-foreground text-lg">Real people who care about your health.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {staff.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <div className="bg-card rounded-2xl p-6 shadow-soft text-center hover-lift">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mx-auto mb-4 flex items-center justify-center ring-4 ring-primary/10">
                    <span className="text-2xl font-bold text-primary/60">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground italic">"{member.statement}"</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <svg viewBox="0 0 24 24" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-lg font-semibold text-foreground">Google Reviews</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-4xl font-bold text-foreground">4.9</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Based on Google Reviews</p>
            </div>
          </ScrollReveal>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0 rounded-full"
                onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)}
                aria-label="Previous review"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="bg-card rounded-xl border border-border p-6 shadow-soft min-h-[200px] flex flex-col justify-center flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentReview}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                        {reviews[currentReview].author.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground text-sm">{reviews[currentReview].author}</p>
                        <div className="flex items-center gap-0.5">
                          {[...Array(reviews[currentReview].rating)].map((_, j) => (
                            <Star key={j} className="h-3.5 w-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                          ))}
                        </div>
                      </div>
                      <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0 opacity-60" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      "{reviews[currentReview].text}"
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0 rounded-full"
                onClick={nextReview}
                aria-label="Next review"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentReview(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentReview ? 'bg-primary w-6' : 'bg-border hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <a 
                href="https://www.google.com/maps/place/Village+IDA+Pharmacy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                See all reviews on Google
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Visit us</h2>
              <p className="text-muted-foreground text-lg">Conveniently located with free parking.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <LocationCard />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Common questions</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <FAQAccordion items={faqs} />
            </div>
          </ScrollReveal>
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
