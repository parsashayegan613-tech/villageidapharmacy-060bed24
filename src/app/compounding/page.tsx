import type { Metadata } from "next";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTABand } from "@/components/CTABand";
import { StepCard } from "@/components/StepCard";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import {
  FlaskConical, Droplets, Palette, Pill, TestTube, Sparkles,
  CheckCircle, Phone, FileText, MessageSquare, Package, Calendar,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Compounding Pharmacy Edmonton | Village IDA Pharmacy",
  description: "Custom compounded medications in Edmonton. Dye-free, preservative-free, and alternative dosage forms made specifically for you. Call 780-440-4555.",
};

const compoundingExamples = [
  { icon: Droplets, title: "Dye-Free Options", description: "Medications without artificial colors for sensitive patients." },
  { icon: Pill, title: "Alternative Dosage Forms", description: "Liquids, creams, or capsules when tablets won't work." },
  { icon: Palette, title: "Flavoring", description: "Make bitter medications taste better for children." },
  { icon: TestTube, title: "Topical Preparations", description: "Creams and gels for localized treatment." },
  { icon: Sparkles, title: "Preservative-Free", description: "Options for patients with preservative sensitivities." },
  { icon: Package, title: "Custom Combinations", description: "Multiple medications combined into one dose." },
];

const goodFitChecklist = [
  "You have allergies to dyes, fillers, or preservatives in standard medications",
  "Your child has difficulty taking bitter-tasting medications",
  "You need a medication in a form that's not commercially available",
  "Your doctor recommends a specific strength not available commercially",
  "You need a topical version of an oral medication",
  "You're looking for hormone replacement options",
];

const faqs = [
  { question: "What is a compounding pharmacy?", answer: "A compounding pharmacy specializes in creating customized medications when a commercially available option does not meet a patient's needs. Our specially trained compounding pharmacists can adjust the form, dosage, or ingredients of a medication based on a valid prescription." },
  { question: "Why would my child need compounded medication?", answer: "Many medications are manufactured in standard strengths or forms. If your child needs a specific dose, has trouble swallowing pills, or is allergic to common dyes and preservatives, we can compound their prescription into a child-friendly flavor, liquid suspension, lollipop, or gummy." },
  { question: "Do I need a prescription for compounded medications?", answer: "Yes. Just like commercially available medications, compounded medications require a valid prescription from a licensed healthcare provider (such as a doctor, dentist, or veterinarian). We work directly with your prescriber to formulate the exact treatment you need." },
  { question: "Is compounding covered by Alberta health insurance?", answer: "Coverage depends entirely on your specific insurance provider and plan. Many extended health benefit plans do cover compounded medications, provided the active ingredients are eligible. Our team can help process the claim or provide the necessary documentation for you to submit." },
  { question: "Can you compound medications for my pets?", answer: "Yes. Some pets have difficulty taking standard medications. We work with veterinarians to compound pet medications into easier-to-administer forms, such as tuna-flavored liquids for cats, beef-flavored treats for dogs, or transdermal creams that can be rubbed on their ear." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Compounding() {
  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        eyebrow="Compounding"
        title={<>Medications made <span className="italic">just for you</span></>}
        description="When standard medications do not fit your needs, we create custom solutions. Our compounding pharmacy tailors medications to work for you."
        image={{ src: "/_DSC3900.jpg", alt: "Pharmacist compounding medications" }}
        actions={
          <>
                <Button asChild size="lg" className="rounded-full px-8 gap-2">
                  <Link href="/appointments?type=compounding"><Calendar className="h-4 w-4" />Request a Consult</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 gap-2">
                  <a href="tel:780-440-4555"><Phone className="h-4 w-4" />Call to Discuss</a>
                </Button>
          </>
        }
      />

      {/* What We Compound */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Capabilities" title="What we can compound" description="Custom solutions for a variety of needs." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {compoundingExamples.map((example) => (
              <div key={example.title} className="bg-card rounded-2xl p-6 border border-border/60 hover:border-primary/20 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                  <example.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-sans font-semibold text-foreground mb-2">{example.title}</h3>
                <p className="text-sm text-muted-foreground">{example.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-secondary relative overflow-hidden noise">
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading eyebrow="Process" title="How it works" />
          <div className="max-w-2xl space-y-8">
            <StepCard icon={MessageSquare} step={1} title="Consult with us" description="Discuss your needs with our pharmacist — we'll explain what's possible." />
            <StepCard icon={FileText} step={2} title="Get a prescription" description="Your doctor writes a prescription for your custom medication." />
            <StepCard icon={FlaskConical} step={3} title="We create your medication" description="We compound your personalized medication with quality ingredients." />
            <StepCard icon={Package} step={4} title="Pick up or delivery" description="Get your medication in-store or delivered to your door." />
          </div>
        </div>
      </section>

      {/* Good Fit */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <SectionHeading eyebrow="Is it right for you?" title="Compounding might be right for you if..." />
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/60">
              <ul className="space-y-4">
                {goodFitChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-3.5 w-3.5 text-success" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-secondary relative overflow-hidden noise">
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="max-w-3xl">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to explore compounding?"
        primaryAction={{ label: "Request a Consult", href: "/appointments?type=compounding" }}
        secondaryAction={{ label: "Call to Discuss", href: "tel:780-440-4555", external: true }}
      />
      <div className="h-16 md:hidden" />
    </Layout>
  );
}
