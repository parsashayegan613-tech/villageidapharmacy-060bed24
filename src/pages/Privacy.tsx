import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function Privacy() {
    return (
        <Layout>
            <SEOHead title="Privacy Policy | Village IDA Pharmacy" description="How Village IDA Pharmacy collects, uses, and protects your personal information." />

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-display-sm font-serif text-foreground mb-4">Privacy Policy</h1>
                    <p className="text-muted-foreground mb-10">Last updated: February 2026</p>

                    <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">
                        <section>
                            <h2 className="text-xl font-serif font-semibold text-foreground">1. Information We Collect</h2>
                            <p>When you use our website or services, we may collect the following personal information:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Contact information:</strong> name, email address, phone number, mailing address</li>
                                <li><strong>Health-related information:</strong> prescription numbers, medication details, health conditions relevant to pharmacy services</li>
                                <li><strong>Account information:</strong> login credentials (securely stored via Supabase authentication)</li>
                                <li><strong>Communication records:</strong> messages you send through our contact and appointment forms</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold text-foreground">2. How We Use Your Information</h2>
                            <p>We use your personal information to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Process and fill your prescription refill and transfer requests</li>
                                <li>Schedule and manage appointments</li>
                                <li>Provide personalized pharmacy services including compounding</li>
                                <li>Communicate with you about your prescriptions and health services</li>
                                <li>Improve our website and services</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold text-foreground">3. How We Protect Your Information</h2>
                            <p>We take the security of your personal information seriously. We use industry-standard measures including:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Encrypted data transmission (SSL/TLS)</li>
                                <li>Secure database storage with row-level security policies</li>
                                <li>Access controls limiting who can view your information</li>
                                <li>Regular security reviews and updates</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold text-foreground">4. Information Sharing</h2>
                            <p>We do not sell, rent, or trade your personal information. We may share information only:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>With your consent or at your direction</li>
                                <li>With healthcare professionals involved in your care</li>
                                <li>As required by law or regulatory requirements</li>
                                <li>With service providers who assist in our operations (e.g., secure hosting), under strict confidentiality agreements</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold text-foreground">5. Your Rights (PIPEDA)</h2>
                            <p>Under Canada's Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access your personal information that we hold</li>
                                <li>Request corrections to inaccurate information</li>
                                <li>Withdraw consent for the collection of your information</li>
                                <li>File a complaint with the Office of the Privacy Commissioner of Canada</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold text-foreground">6. Cookies & Analytics</h2>
                            <p>Our website may use cookies and similar technologies to improve your browsing experience. You can disable cookies through your browser settings.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold text-foreground">7. Contact Us</h2>
                            <p>If you have questions about this Privacy Policy or your personal information, contact us at:</p>
                            <div className="bg-card rounded-xl border border-border/60 p-6 mt-4">
                                <p className="font-semibold">Village IDA Pharmacy</p>
                                <p>7004 98 Ave, Edmonton, AB T6A 0A5</p>
                                <p>Phone: <a href="tel:780-440-4555" className="text-primary hover:underline">780-440-4555</a></p>
                                <p>Email: <a href="mailto:villida@telus.net" className="text-primary hover:underline">villida@telus.net</a></p>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
