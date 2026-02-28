import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CTABand } from "@/components/CTABand";
import { Heart, Users, Award, Truck, Clock, ShieldCheck } from "lucide-react";

const values = [
    { icon: Heart, title: "Personal Care", description: "We take the time to know each patient by name, understand their health goals, and provide tailored advice." },
    { icon: Users, title: "Community Focus", description: "We've been part of Edmonton's community for decades, building lasting relationships with the families we serve." },
    { icon: Award, title: "Expert Knowledge", description: "Our pharmacists stay current with the latest treatments and medications to give you the best possible guidance." },
    { icon: Truck, title: "Free Delivery", description: "We deliver prescriptions across Edmonton at no extra charge — because health shouldn't wait." },
    { icon: Clock, title: "Always Accessible", description: "With walk-in availability and quick turnaround times, we're here when you need us." },
    { icon: ShieldCheck, title: "Trust & Privacy", description: "Your health information is handled with the highest standard of confidentiality and security." },
];

const team = [
    {
        name: "Heidi",
        role: "Owner & Lead Pharmacist",
        statement: "Every patient deserves to feel heard and cared for. That's what drives us every day.",
    },
    {
        name: "Anoosh",
        role: "Pharmacist",
        statement: "We treat every customer like family — because to us, they are.",
    },
    {
        name: "Team Member",
        role: "Pharmacy Technician",
        statement: "Helping our patients manage their health is the most rewarding part of what we do.",
    },
];

export default function About() {
    return (
        <Layout>
            <SEOHead
                title="About Us | Village IDA Pharmacy Edmonton"
                description="Learn about Village IDA Pharmacy — your trusted Edmonton pharmacy for personalized care, prescription services, and community health support since day one."
            />

            {/* Hero */}
            <section className="py-20 md:py-28 bg-secondary relative overflow-hidden noise">
                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal>
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">About us</p>
                            <h1 className="text-display-sm md:text-display font-serif text-foreground mb-6">
                                Your neighbourhood pharmacy.
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                                Village IDA Pharmacy has been serving Edmonton families with personalized pharmaceutical care. We believe in taking the time to truly know our patients — their medications, their concerns, and what matters most to their health.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                As an independent IDA member pharmacy, we combine the personal touch of a family-run business with the resources and buying power of Canada's largest network of independent pharmacies.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <ScrollReveal direction="left">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Our story</p>
                                <h2 className="text-display-sm font-serif text-foreground mb-6">
                                    Built on care, <span className="italic">not volume.</span>
                                </h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>
                                        Located in the heart of Edmonton at 7004 98 Ave, Village IDA Pharmacy was founded with a simple belief: pharmacy should be personal. In an era of big-box stores and rushed consultations, we chose a different path.
                                    </p>
                                    <p>
                                        Our pharmacists don't just fill prescriptions — they sit down with you, review your medications, answer your questions, and make sure you understand your treatment. Whether it's custom compounding for a child who can't swallow pills, or delivering blister-packed medications to a senior's doorstep, we go the extra mile.
                                    </p>
                                    <p>
                                        We're proud to be part of the IDA Pharmacy Group, Canada's largest banner group of independent pharmacies. This means you get the warmth of a local pharmacy with the competitive pricing and resources of a national network.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="right">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-soft text-center">
                                    <div className="text-3xl font-serif font-bold text-primary mb-1">4.9</div>
                                    <div className="text-sm text-muted-foreground">Google Rating</div>
                                </div>
                                <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-soft text-center">
                                    <div className="text-3xl font-serif font-bold text-primary mb-1">Free</div>
                                    <div className="text-sm text-muted-foreground">Delivery</div>
                                </div>
                                <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-soft text-center">
                                    <div className="text-3xl font-serif font-bold text-primary mb-1">IDA</div>
                                    <div className="text-sm text-muted-foreground">Member Pharmacy</div>
                                </div>
                                <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-soft text-center">
                                    <div className="text-3xl font-serif font-bold text-primary mb-1">8+</div>
                                    <div className="text-sm text-muted-foreground">Services Offered</div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 md:py-28 bg-secondary relative overflow-hidden noise">
                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal>
                        <div className="max-w-xl mb-14">
                            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">What we stand for</p>
                            <h2 className="text-display-sm font-serif text-foreground mb-4">Our values</h2>
                            <p className="text-muted-foreground text-lg">The principles that guide everything we do.</p>
                        </div>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {values.map((value, i) => (
                            <ScrollReveal key={value.title} delay={i * 0.06}>
                                <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-soft hover-lift h-full">
                                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <value.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="font-sans font-semibold text-foreground mb-2">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <div className="max-w-xl mb-14">
                            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Our team</p>
                            <h2 className="text-display-sm font-serif text-foreground mb-4">Meet the people who care.</h2>
                            <p className="text-muted-foreground text-lg">Real pharmacists, real relationships.</p>
                        </div>
                    </ScrollReveal>
                    <div className="grid md:grid-cols-3 gap-6">
                        {team.map((member, i) => (
                            <ScrollReveal key={member.name} delay={i * 0.1}>
                                <div className="bg-card rounded-2xl p-8 shadow-soft hover-lift border border-border/60">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 mb-5 flex items-center justify-center">
                                        <span className="text-xl font-serif text-primary/70">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <h3 className="font-sans font-semibold text-foreground text-lg">{member.name}</h3>
                                    <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                                    <p className="text-sm text-muted-foreground italic leading-relaxed">"{member.statement}"</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <CTABand
                headline="Ready to experience the difference?"
                primaryAction={{ label: "Call Us", href: "tel:780-440-4555", external: true }}
                secondaryAction={{ label: "Transfer Your Prescriptions", href: "/transfer" }}
            />

            <div className="h-16 md:hidden" />
        </Layout>
    );
}
