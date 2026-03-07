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



const faqs = [
  {
    question: "How do I transfer my prescriptions to Village IDA in Edmonton?",
    answer: "Transferring your prescriptions is simple and legally protected in Alberta. You don't even need to call your old pharmacy. Just fill out our online transfer request form or call us directly. Our pharmacists will contact your previous pharmacy on your behalf to securely transfer all your active medication files and refill counts. The process is usually completed the same business day."
  },
  {
    question: "Do you offer free prescription delivery in Edmonton?",
    answer: "Yes! We offer fast, free prescription delivery to all patients across Edmonton city limits. Whether you are managing chronic conditions, recovering from surgery, or simply have a busy schedule, our drivers will safely deliver your medications right to your front door at no extra charge. Just select 'Delivery' when requesting a refill."
  },
  {
    question: "What is blister packaging (compliance packaging)?",
    answer: "Blister packaging (also known as compliance packaging or dosing cards) is a service where we pre-sort your daily medications into secure, easy-to-use bubble packs organized by exact days and times (e.g., Morning, Noon, Evening, Bedtime). This eliminates the confusion of juggling multiple pill bottles, ensuring you or your loved ones never miss a dose."
  },
  {
    question: "What do I need to bring for a walk-in flu shot?",
    answer: "If you are walking in for a flu shot or other immunization, please bring your valid Alberta Health Care (AHC) card and wear a short-sleeved shirt. While walk-ins are always welcome, you can also book an appointment online to guarantee zero wait time."
  },
  {
    question: "What types of custom compounding do you do?",
    answer: "Our compounding specialists create customized medications tailored to unique patient needs. This includes converting pills into liquids for children or adults who cannot swallow tablets, creating dye-free or allergen-free formulations, mixing customized topical pain creams, and adding appealing flavors to pediatric medications."
  },
  {
    question: "How do medication reviews work?",
    answer: "A medication review is a free, one-on-one consultation with our pharmacist. We sit down with you to review all your current prescription medications, over-the-counter drugs, and supplements. We'll identify any potential drug interactions, suggest ways to simplify your routine, and ensure your medications are working effectively for your specific health goals."
  },
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
