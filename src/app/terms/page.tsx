import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
    title: "Terms of Service | Village IDA Pharmacy",
    description: "Terms and conditions for using the Village IDA Pharmacy website and services.",
};

export default function Terms() {
    return (
        <Layout>

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-display-sm font-serif text-foreground mb-4">Terms of Service</h1>
                    <p className="text-muted-foreground mb-10">Last updated: February 2026</p>

                    <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">
                        <section>
                            <h2 className="text-xl font-serif font-semibold text-foreground">1. Acceptance of Terms</h2>
                            <p>By accessing and using the Village IDA Pharmacy website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold text-foreground">2. Services</h2>
                            <p>Our website provides information about our pharmacy services and allows you to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Submit prescription refill requests</li>
                                <li>Request prescription transfers from another pharmacy</li>
                                <li>Book appointments for health services</li>
                                <li>Contact our pharmacy team</li>
                            </ul>
                            <p className="mt-3">These online services are requests only and do not constitute a confirmed prescription fill or appointment. Our pharmacists will confirm all requests by phone or in person.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold text-foreground">3. Medical Disclaimer</h2>
                            <p>The information on this website is for general informational purposes only and is not a substitute for professional medical or pharmaceutical advice. Always consult with a qualified healthcare provider regarding your health conditions and medications.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold text-foreground">4. Accuracy of Information</h2>
                            <p>We strive to keep all information on our website accurate and up to date. However, we cannot guarantee that all content is error-free. Prices, availability, and service details are subject to change without notice.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold text-foreground">5. Limitation of Liability</h2>
                            <p>Village IDA Pharmacy shall not be liable for any damages arising from the use or inability to use this website, including but not limited to direct, indirect, incidental, or consequential damages.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold text-foreground">6. Changes to Terms</h2>
                            <p>We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated revision date. Continued use of the website after changes constitutes acceptance of the new terms.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold text-foreground">7. Contact</h2>
                            <p>If you have questions about these Terms of Service, please contact us:</p>
                            <div className="bg-card rounded-xl border border-border/60 p-6 mt-4">
                                <p className="font-semibold">Village IDA Pharmacy</p>
                                <p>7004 98 Ave, Edmonton, AB T6A 0A5</p>
                                <p>Phone: <a href="tel:780-440-4555" className="text-primary hover:underline">780-440-4555</a></p>
                                <p>Email: <a href="mailto:villageidapharmacy@gmail.com" className="text-primary hover:underline">villageidapharmacy@gmail.com</a></p>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
