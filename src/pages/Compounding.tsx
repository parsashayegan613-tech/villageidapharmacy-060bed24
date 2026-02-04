import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTABand } from "@/components/CTABand";
import { StepCard } from "@/components/StepCard";
import {
  FlaskConical,
  Droplets,
  Palette,
  Pill,
  TestTube,
  Sparkles,
  CheckCircle,
  Phone,
  FileText,
  MessageSquare,
  Package,
  Calendar,
} from "lucide-react";

const compoundingExamples = [
  {
    icon: Droplets,
    title: "Dye-Free Options",
    description: "Medications without artificial colors for sensitive patients.",
  },
  {
    icon: Pill,
    title: "Alternative Dosage Forms",
    description: "Liquids, creams, or capsules when tablets won't work.",
  },
  {
    icon: Palette,
    title: "Flavoring",
    description: "Make bitter medications taste better for children.",
  },
  {
    icon: TestTube,
    title: "Topical Preparations",
    description: "Creams and gels for localized treatment.",
  },
  {
    icon: Sparkles,
    title: "Preservative-Free",
    description: "Options for patients with preservative sensitivities.",
  },
  {
    icon: Package,
    title: "Custom Combinations",
    description: "Multiple medications combined into one dose.",
  },
];

const goodFitChecklist = [
  "You have allergies to dyes, fillers, or preservatives in standard medications",
  "Your child refuses to take bitter-tasting medications",
  "You need a medication in a form that's not commercially available",
  "Your doctor recommends a specific strength not available commercially",
  "You need a topical version of an oral medication",
  "You're looking for hormone replacement options",
];

const faqs = [
  {
    question: "What is compounding?",
    answer: "Compounding is the art and science of creating personalized medications. We combine, mix, or alter ingredients to create a medication tailored to your specific needs.",
  },
  {
    question: "Do I need a prescription for compounded medications?",
    answer: "Yes, most compounded medications require a prescription from your doctor. We work closely with physicians to ensure your medication meets your needs.",
  },
  {
    question: "How long does it take to get a compounded medication?",
    answer: "Most compounds are ready within 1-3 business days. Complex formulations may take slightly longer. We'll let you know the timeline when you place your order.",
  },
  {
    question: "Is compounding covered by insurance?",
    answer: "Coverage varies by plan. Many insurance plans cover compounded medications. We can help you check your coverage and process claims.",
  },
  {
    question: "How do I know if compounding is right for me?",
    answer: "If standard medications aren't working for you due to allergies, dosage issues, or difficulty swallowing pills, compounding might help. Schedule a consult to discuss your options.",
  },
];

export default function Compounding() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wide">Compounding Services</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
                Medications made just for you
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                When standard medications don't fit your needs, we create custom solutions. Our compounding pharmacy tailors medications to work for you — not the other way around.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/appointments?type=compounding">
                    <Calendar className="h-4 w-4 mr-2" />
                    Request a Consult
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="tel:780-440-4555">
                    <Phone className="h-4 w-4 mr-2" />
                    Call to Discuss
                  </a>
                </Button>
              </div>
            </div>
            <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center">
              <FlaskConical className="h-32 w-32 text-muted-foreground/30" />
            </div>
          </div>
        </div>
      </section>

      {/* What We Can Compound */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What we can compound
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Custom solutions for a variety of needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compoundingExamples.map((example) => (
              <div
                key={example.title}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <example.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{example.title}</h3>
                <p className="text-sm text-muted-foreground">{example.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How it works
            </h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-6">
            <StepCard
              icon={MessageSquare}
              step={1}
              title="Consult with us"
              description="Discuss your needs with our pharmacist — we'll explain what's possible."
            />
            <StepCard
              icon={FileText}
              step={2}
              title="Get a prescription"
              description="Your doctor writes a prescription for your custom medication."
            />
            <StepCard
              icon={FlaskConical}
              step={3}
              title="We create your medication"
              description="We compound your personalized medication with quality ingredients."
            />
            <StepCard
              icon={Package}
              step={4}
              title="Pick up or delivery"
              description="Get your medication in-store or delivered to your door."
            />
          </div>
        </div>
      </section>

      {/* Good Fit Checklist */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Compounding might be right for you if...
              </h2>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-soft-lg border border-border/50">
              <ul className="space-y-4">
                {goodFitChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-secondary">
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

      {/* CTA */}
      <CTABand
        headline="Ready to explore compounding?"
        primaryAction={{ label: "Request a Consult", href: "/appointments?type=compounding" }}
        secondaryAction={{ label: "Call to Discuss", href: "tel:780-440-4555", external: true }}
      />

      {/* Spacer for mobile dock */}
      <div className="h-16 md:hidden" />
    </Layout>
  );
}
