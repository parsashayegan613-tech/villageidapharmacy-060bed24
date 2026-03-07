import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CTABand } from "@/components/CTABand";
import { Heart, Users, Award, Truck, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us | Village IDA Pharmacy Edmonton",
    description: "Learn about Village IDA Pharmacy — your trusted Edmonton pharmacy for personalized care, prescription services, and community health support.",
};



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
        image: "/staff_heidi.png",
    },
    {
        name: "Anoosh",
        role: "Pharmacist",
        statement: "We treat every customer like family — because to us, they are.",
        image: "/staff_anoosh.png",
    },
];

export default function About() {
    return (
        <Layout>

            {/* Hero */}
            <section className="py-20 md:py-28 bg-secondary relative overflow-hidden noise">
                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal>
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">About us</p>
                            <h1 className="text-display-sm md:text-display font-serif text-foreground mb-6">
                                Tired of feeling like just another number?
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-4 font-medium">
                                At Village IDA Pharmacy, we believe healthcare shouldn't be rushed, transactional, or impersonal. We actually take the time to know you, your medications, and your health goals.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                As an independent Edmonton pharmacy, we offer an antidote to the frustrating big-box pharmacy experience. No long lines, no being put on hold forever, and no talking to a different pharmacist every time you visit. Just consistent, caring people who know your name.
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
                                    Why patients switch <span className="italic">to us.</span>
                                </h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>
                                        We hear it every day: patients come to us because they are exhausted by the big pharmacy chains. They're tired of waiting days for simple refills, battling automated phone systems, and feeling rushed out the door before they can ask a question about their new prescription.
                                    </p>
                                    <p>
                                        When you trust Village IDA Pharmacy with your care, you get direct access to the same dedicated pharmacists every time. We offer free city-wide delivery so you don't even have to leave home, custom compounding for unusual dosages, and compliance blister packaging to make managing multiple daily pills effortless.
                                    </p>
                                    <p>
                                        Best of all, <strong className="text-foreground">we handle the entire transfer process for you.</strong> You don't have to call your old pharmacy or lift a finger. Just tell us you want to switch, and we do the rest in minutes.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="right">
                            <div className="space-y-6">
                                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lift">
                                    <img
                                        src="/team_group.png"
                                        alt="Village IDA Pharmacy Team"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
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
                    <div className="grid md:grid-cols-2 max-w-4xl gap-8">
                        {team.map((member, i) => (
                            <ScrollReveal key={member.name} delay={i * 0.1}>
                                <div className="bg-card rounded-2xl p-8 shadow-soft hover-lift border border-border/60">
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-20 h-20 rounded-2xl mb-5 object-cover shadow-sm" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 mb-5 flex items-center justify-center">
                                            <span className="text-xl font-serif text-primary/70">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </span>
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

            {/* CTA */}
            <CTABand
                headline="Ready to experience the difference?"
                primaryAction={{ label: "Switch to Village IDA", href: "/transfer" }}
                secondaryAction={{ label: "Call Us Today", href: "tel:780-440-4555", external: true }}
            />

            <div className="h-16 md:hidden" />
        </Layout>
    );
}
