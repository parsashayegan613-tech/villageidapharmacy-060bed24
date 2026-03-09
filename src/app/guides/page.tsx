import { Metadata } from "next";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, BookOpen } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
    title: "Patient Guides & Resources",
    description: "Learn more about prescription transfers, custom compounding, blister packaging, and general pharmacy care in Edmonton, Alberta.",
};

const guides = [
    {
        title: "How to Transfer Prescriptions in Alberta (Step-by-Step)",
        description: "Everything you need to know about switching pharmacies, the laws protecting your right to choose, and how the process works behind the scenes.",
        slug: "transferring-prescriptions-alberta",
        readTime: "4 min read",
    },
    {
        title: "A Caregiver's Guide to Blister Packaging in Edmonton",
        description: "Managing multiple medications is stressful. Learn how compliance packaging works, who qualifies, and how it eliminates prescription errors.",
        slug: "blister-packaging-edmonton",
        readTime: "3 min read",
    },
    {
        title: "Custom Medication for Kids: A Parent's Guide to Compounding",
        description: "What to do when your child can't swallow pills or hates the taste of antibiotics. Discover the safe, legal process of pediatric compounding.",
        slug: "pediatric-compounding-guide",
        readTime: "5 min read",
    },
];

export default function GuidesIndex() {
    return (
        <Layout>
            <section className="py-20 md:py-28 bg-secondary relative overflow-hidden noise">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Resources</p>
                        <h1 className="text-display-sm md:text-display font-serif text-foreground mb-6">Patient Guides</h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Clear, practical advice to help you manage your health, navigate the Alberta healthcare system, and make the most of local pharmacy services.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {guides.map((guide, i) => (
                            <ScrollReveal key={guide.slug} delay={i * 0.1}>
                                <Link href={`/guides/${guide.slug}`} className="group block h-full">
                                    <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/60 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col hover:border-primary/20 hover:shadow-lg">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                                            <BookOpen className="h-5 w-5" />
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                            <span>{guide.readTime}</span>
                                        </div>
                                        <h2 className="text-xl font-serif text-foreground mb-3 group-hover:text-primary transition-colors">
                                            {guide.title}
                                        </h2>
                                        <p className="text-muted-foreground text-sm flex-1 leading-relaxed mb-6">
                                            {guide.description}
                                        </p>
                                        <div className="flex items-center gap-1.5 text-primary font-medium text-sm mt-auto">
                                            Read Guide <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
