import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

const guides = [
  {
    title: "How to Transfer Prescriptions in Alberta",
    href: "/guides/transferring-prescriptions-alberta",
    description: "A plain-language guide to moving prescriptions without extra coordination.",
  },
  {
    title: "Caregiver's Guide to Blister Packaging",
    href: "/guides/blister-packaging-edmonton",
    description: "How organized packaging helps patients and caregivers manage complex routines.",
  },
  {
    title: "Custom Medication for Kids",
    href: "/guides/pediatric-compounding-guide",
    description: "What parents should know about child-friendly compounded medication.",
  },
];

type RelatedGuidesProps = {
  excludeHref?: string;
};

export function RelatedGuides({ excludeHref }: RelatedGuidesProps) {
  const visibleGuides = guides.filter((guide) => guide.href !== excludeHref);

  return (
    <section className="py-16 md:py-20 bg-secondary relative overflow-hidden noise">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">More resources</p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">Related patient guides</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {visibleGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group bg-card rounded-2xl border border-border/60 p-6 shadow-soft hover:shadow-lift hover:-translate-y-1 hover:border-primary/25 transition-all duration-300 focus-ring"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{guide.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm">
                    Read guide <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
