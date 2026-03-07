import type { Metadata } from "next";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { StepCard } from "@/components/StepCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { LocationCard } from "@/components/LocationCard";
import { CTABand } from "@/components/CTABand";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HomeHero } from "./_components/HomeHero";
import { ReviewsCarousel } from "./_components/ReviewsCarousel";
import { HomeServicesGrid } from "./_components/HomeServicesGrid";
import { Button } from "@/components/ui/button";
import {
  Truck, ClipboardCheck, Phone, FileText, MessageSquare,
  CheckCircle, ArrowRight, Calendar,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Village IDA Pharmacy | Edmonton Prescription & Health Services",
  description: "Your local Edmonton pharmacy for refills, transfers, compounding, and personalized care. Free delivery available. Call 780-440-4555.",
};


const staff = [
  { name: "Heidi", role: "Owner & Lead Pharmacist", statement: "Every patient deserves to feel heard and cared for. That's what drives us every day.", image: "/staff_heidi.png" },
  { name: "Anoosh", role: "Pharmacist", statement: "We treat every customer like family — because to us, they are.", image: "/staff_anoosh.png" },
  { name: "Team Member", role: "Pharmacy Technician", statement: "Helping our patients manage their health is the most rewarding part of what we do.", image: "/staff_tech.png" },
];

const faqs = [
  { question: "How do I transfer my prescriptions to Village IDA?", answer: "Simply fill out our transfer form online or call us. We handle everything with your old pharmacy — no work required from you." },
  { question: "Do you offer prescription delivery?", answer: "Yes! We offer free delivery throughout Edmonton. Just request delivery when you place your refill." },
  { question: "What is blister packaging?", answer: "Blister packaging organizes your medications by day and time in easy-to-use packs. It's especially helpful if you take multiple medications daily." },
  { question: "Do I need an appointment for a flu shot?", answer: "Walk-ins are welcome during our regular hours, but booking ahead ensures no wait time." },
  { question: "What compounding services do you offer?", answer: "We create custom medications including dye-free options, alternative dosage forms, flavored medications for children, and topical preparations." },
  { question: "How long does a refill take?", answer: "Most refills are ready within 15-20 minutes. We'll call or text when your order is ready for pickup or delivery." },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero — client component (framer-motion) */}
      <HomeHero />

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-xl mb-14">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">What we do</p>
              <h2 className="text-display-sm font-serif text-foreground mb-4">More than prescriptions.</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">A full range of pharmacy services to support your health — from delivery to custom compounding.</p>
            </div>
          </ScrollReveal>
          <HomeServicesGrid />
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-28 bg-secondary relative overflow-hidden noise">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <ScrollReveal direction="left">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Easy switch</p>
                <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-10">Transfer in 3 steps</h2>
                <div className="space-y-8">
                  <StepCard icon={MessageSquare} step={1} title="Tell us where to call" description="Share your current pharmacy name and we'll take it from there." />
                  <StepCard icon={Phone} step={2} title="We handle the paperwork" description="We contact your old pharmacy and transfer everything over." />
                  <StepCard icon={CheckCircle} step={3} title="Pick up or get delivery" description="Your medications are ready — choose pickup or free delivery." />
                </div>
                <Button asChild className="mt-10 rounded-full px-6 gap-2" variant="outline">
                  <Link href="/transfer">Start a Transfer <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Quick refill</p>
                <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-10">Refill in 3 steps</h2>
                <div className="space-y-8">
                  <StepCard icon={FileText} step={1} title="Submit your request" description="Enter your prescription numbers online — takes under a minute." />
                  <StepCard icon={ClipboardCheck} step={2} title="We prepare your order" description="We'll confirm and fill your prescriptions right away." />
                  <StepCard icon={Truck} step={3} title="Pick up or get delivery" description="Come in when it's ready or we'll bring it to you." />
                </div>
                <Button asChild className="mt-10 rounded-full px-6 gap-2" variant="outline">
                  <Link href="/refill">Request a Refill <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Compounding Spotlight */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lift relative group">
                <img src="/_DSC3900.jpg" alt="Pharmacist compounding custom medication" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Compounding</p>
                <h2 className="text-display-sm font-serif text-foreground mb-6">Medications made <span className="italic">just for you</span></h2>
                <ul className="space-y-4 mb-10">
                  {["Dye-free and preservative-free options for sensitive patients", "Custom dosage forms when standard options don't work", "Flavoring for children who won't take bitter medications"].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-3.5 w-3.5 text-success" />
                      </div>
                      <span className="text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="rounded-full px-6"><Link href="/compounding">Learn More</Link></Button>
                  <Button asChild variant="outline" className="rounded-full px-6 gap-2">
                    <Link href="/appointments?type=compounding"><Calendar className="h-4 w-4" />Request a Consult</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="py-20 md:py-28 bg-secondary relative overflow-hidden noise">
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="max-w-xl mb-14">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Our team</p>
              <h2 className="text-display-sm font-serif text-foreground mb-4">Meet the people who care.</h2>
              <p className="text-muted-foreground text-lg">Real pharmacists, real relationships.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {staff.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <div className="bg-card rounded-2xl p-8 shadow-soft hover-lift border border-border/60">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-20 h-20 rounded-2xl mb-5 object-cover shadow-sm" />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 mb-5 flex items-center justify-center">
                      <span className="text-xl font-serif text-primary/70">{member.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                  )}
                  <h3 className="font-sans font-semibold text-foreground text-lg">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">"{member.statement}"</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews — client component (useState/useEffect/framer-motion) */}
      <ReviewsCarousel />

      {/* Location */}
      <section className="py-20 md:py-28 bg-secondary relative overflow-hidden noise">
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="max-w-xl mb-14">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Find us</p>
              <h2 className="text-display-sm font-serif text-foreground mb-4">Visit us</h2>
              <p className="text-muted-foreground text-lg">Conveniently located with free parking.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="max-w-2xl"><LocationCard /></div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-xl mb-14">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">FAQ</p>
              <h2 className="text-display-sm font-serif text-foreground">Common questions</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="max-w-3xl"><FAQAccordion items={faqs} /></div>
          </ScrollReveal>
        </div>
      </section>

      <CTABand
        headline="Need help today?"
        primaryAction={{ label: "Call Now", href: "tel:780-440-4555", external: true }}
        secondaryAction={{ label: "Refill Request", href: "/refill" }}
      />
      <div className="h-16 md:hidden" />
    </Layout>
  );
}
