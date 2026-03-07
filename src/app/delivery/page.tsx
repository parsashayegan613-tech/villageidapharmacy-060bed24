import type { Metadata } from "next";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { CTABand } from "@/components/CTABand";
import { CheckCircle, Truck, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: "Free Prescription Delivery in Edmonton | Village IDA Pharmacy",
    description: "Get your medications delivered directly to your door anywhere in Edmonton. Fast, free, and reliable prescription delivery from your local independent pharmacy.",
    alternates: {
        canonical: "https://villageidapharmacy.ca/delivery"
    }
};

export default function DeliveryPage() {
    return (
        <Layout>
            <section className="bg-muted py-16 md:py-24 border-b border-border/50">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <Truck className="h-12 w-12 text-primary mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
                        Free Prescription Delivery in Edmonton
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Skip the lineup and stay home. We offer fast, free, and reliable delivery for all prescriptions to patients across Edmonton.
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div>
                            <h2 className="text-3xl font-serif text-foreground mb-6">How our delivery service works</h2>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">1</span>
                                    <div>
                                        <h3 className="font-semibold text-lg">Request your refill or transfer</h3>
                                        <p className="text-muted-foreground mt-1">Submit your request online or over the phone and let us know you need delivery.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">2</span>
                                    <div>
                                        <h3 className="font-semibold text-lg">We prepare your medication</h3>
                                        <p className="text-muted-foreground mt-1">Our pharmacists review your profile to ensure safety and accuracy before packing.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">3</span>
                                    <div>
                                        <h3 className="font-semibold text-lg">Delivered to your door</h3>
                                        <p className="text-muted-foreground mt-1">Our driver will safely deliver your medications right to your home in Edmonton.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-card rounded-2xl shadow-soft p-8 border border-border/50">
                            <h3 className="text-xl font-serif mb-6">Who is this for?</h3>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Seniors handling ongoing medications",
                                    "Parents with sick kids at home",
                                    "Patients recovering from surgery",
                                    "Anyone with a busy schedule",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                                        <span className="text-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <hr className="border-border my-6" />
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                                    <p className="text-sm font-medium">Available across Edmonton city limits.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                                    <p className="text-sm font-medium">Most prescriptions delivered within 1 business day.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTABand
                headline="Ready to get your medications delivered?"
                primaryAction={{ label: "Request a Refill", href: "/refill" }}
                secondaryAction={{ label: "Transfer to Us", href: "/transfer" }}
            />
        </Layout>
    );
}
