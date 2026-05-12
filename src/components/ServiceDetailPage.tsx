import { ReactNode } from "react";
import Link from "next/link";
import { LucideIcon, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { StepCard } from "@/components/StepCard";
import { CTABand } from "@/components/CTABand";
import { Button } from "@/components/ui/button";

type ServiceDetailPageProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  icon: LucideIcon;
  image: {
    src: string;
    alt: string;
    className?: string;
  };
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
    external?: boolean;
  };
  benefits: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
  }>;
  steps: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
  }>;
  fitTitle: string;
  fitDescription: string;
  fitItems: string[];
  reassurance: string;
  ctaHeadline: string;
};

export function ServiceDetailPage({
  eyebrow,
  title,
  description,
  icon,
  image,
  primaryAction,
  secondaryAction,
  benefits,
  steps,
  fitTitle,
  fitDescription,
  fitItems,
  reassurance,
  ctaHeadline,
}: ServiceDetailPageProps) {
  return (
    <Layout>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        icon={icon}
        image={image}
        actions={
          <>
            <Button asChild size="lg" className="rounded-full px-8 gap-2 shadow-lift">
              <Link href={primaryAction.href}>
                {primaryAction.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 gap-2">
              {secondaryAction.external ? (
                <a href={secondaryAction.href}>
                  <Phone className="h-4 w-4" />
                  {secondaryAction.label}
                </a>
              ) : (
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              )}
            </Button>
          </>
        }
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Benefits"
            title="Designed to make medication care easier."
            description={reassurance}
          />
          <div className="grid md:grid-cols-3 gap-5">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-card rounded-2xl border border-border/60 p-6 shadow-soft hover:shadow-lift hover:-translate-y-1 hover:border-primary/25 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-sans font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary relative overflow-hidden noise">
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading
            eyebrow="How it works"
            title="A clear process from request to follow-up."
          />
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <StepCard key={step.title} icon={step.icon} step={index + 1} title={step.title} description={step.description} />
              ))}
            </div>
            <div className="bg-card rounded-2xl border border-border/60 p-7 md:p-8 shadow-soft">
              <h3 className="text-2xl font-serif text-foreground mb-3">{fitTitle}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{fitDescription}</p>
              <ul className="space-y-3">
                {fitItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-3.5 w-3.5 text-success" />
                    </div>
                    <span className="text-sm text-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        headline={ctaHeadline}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
      />
      <div className="h-16 md:hidden" />
    </Layout>
  );
}
