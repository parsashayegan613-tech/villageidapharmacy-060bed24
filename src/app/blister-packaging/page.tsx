import type { Metadata } from "next";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { CTABand } from "@/components/CTABand";
import { CheckCircle, Package, ShieldCheck, HeartPulse } from "lucide-react";

export const metadata: Metadata = {
    title: "Blister Packaging Pharmacy in Edmonton | Village IDA",
    description: "Simplify your medication routine with custom blister packaging in Edmonton. We organize your pills by day and time to ensure you never miss a dose.",
    alternates: {
        canonical: "https://villageidapharmacy.ca/blister-packaging"
    }
};

export default function BlisterPackagingPage() {
    return (
        <Layout>
            <section className="bg-muted py-16 md:py-24 border-b border-border/50">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <Package className="h-12 w-12 text-primary mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
                        Custom Blister Packaging in Edmonton
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Eliminate medication confusion. We organize your daily pills into easy-to-use, secure blister packs so you or your loved ones never miss a dose.
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
                        <div>
                            <h2 className="text-3xl font-serif text-foreground mb-6">The safest way to manage multiple prescriptions</h2>
                            <p className="text-muted-foreground mb-6">
                                Managing multiple pill bottles with different instructions is stressful and prone to error. With our compliance packaging (blister packs), our pharmacists carefully organize all your scheduled medications by the exact day and time they need to be taken.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-3">
                                    <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
                                    <span><strong>Zero Confusion:</strong> Clearly labeled "Morning", "Noon", "Evening", and "Bedtime".</span>
                                </li>
                                <li className="flex gap-3">
                                    <HeartPulse className="w-6 h-6 text-primary flex-shrink-0" />
                                    <span><strong>Better Health Outcomes:</strong> Taking medications exactly as prescribed improves the effectiveness of your treatment.</span>
                                </li>
                                <li className="flex gap-3">
                                    <Package className="w-6 h-6 text-primary flex-shrink-0" />
                                    <span><strong>Refill Management:</strong> We handle the coordination with doctors and automatic refills so you never run out.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-card rounded-2xl shadow-soft p-8 border border-border/50">
                            <h3 className="text-xl font-serif mb-6">Ideal for:</h3>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Seniors managing 3+ daily medications",
                                    "Caregivers looking to simplify routines",
                                    "Patients with chronic conditions",
                                    "Anyone struggling to remember their doses",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                                        <span className="text-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <CTABand
                headline="Ready to simplify your medications?"
                primaryAction={{ label: "Transfer Your Prescriptions", href: "/transfer" }}
                secondaryAction={{ label: "Call for Details", href: "tel:780-440-4555", external: true }}
            />
        </Layout>
    );
}
