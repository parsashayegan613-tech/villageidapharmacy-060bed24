import { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
    title: "How to Transfer Prescriptions in Alberta (Step-by-Step)",
    description: "Learn your legal rights to transfer prescriptions in Alberta, and how easy it is to switch pharmacies in Edmonton without calling your old provider.",
};

export default function GuideTransfer() {
    return (
        <Layout>
            <article className="py-20 md:py-28 bg-background">
                <div className="container mx-auto px-4 max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Patient Guide</p>
                    <h1 className="text-display-sm md:text-5xl font-serif text-foreground mb-8">
                        How to Transfer Prescriptions in Alberta (Step-by-Step)
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border pb-8 mb-10">
                        <span>By Heidi, Lead Pharmacist</span>
                        <span>•</span>
                        <span>4 min read</span>
                    </div>

                    <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-medium prose-a:text-primary max-w-none space-y-8">
                        <p className="lead text-xl text-muted-foreground leading-relaxed">
                            Many patients stay at a pharmacy they actively dislike because they assume switching will be a massive headache. The truth? Transferring prescriptions in Alberta is a heavily regulated, seamless process designed entirely around patient rights.
                        </p>

                        <h2>Your Legal Right to Transfer</h2>
                        <p>
                            In Alberta, pharmacies do not "own" your prescriptions — you do. Under the Alberta College of Pharmacy regulations, you have the legal right to choose where you receive your care. If you request a transfer, your current pharmacy is legally obligated to comply and securely send your active files to your new pharmacy of choice.
                        </p>

                        <h2>The Big Secret: You Don't Have to Make the Call</h2>
                        <p>
                            The biggest reason people hesitate to switch is the dread of having "the breakup call" with their old pharmacist. The good news is, you literally do not have to.
                        </p>
                        <p>
                            When you submit a transfer request to a new pharmacy (like Village IDA), the new pharmacists handle the entire process. We contact your old pharmacy via direct secure fax or verbal pharmacist-to-pharmacist call. It is a completely standard professional procedure, and we handle the paperwork.
                        </p>

                        <div className="bg-secondary p-8 rounded-2xl border border-border/50 my-10">
                            <h3 className="!mt-0">The 3-Step Transfer Process</h3>
                            <ol className="mb-0 space-y-4">
                                <li>
                                    <strong>Choose a new pharmacy:</strong> Look for an independent pharmacy with good reviews and services like free delivery.
                                </li>
                                <li>
                                    <strong>Request a transfer:</strong> Fill out a quick online form or give the new pharmacy a 2-minute phone call. Provide your name, date of birth, and the name/phone number of your old pharmacy.
                                </li>
                                <li>
                                    <strong>Wait a few hours:</strong> The pharmacists handle the secure transfer of your files, including your remaining refill counts. By the same afternoon, your prescriptions are ready at your new location.
                                </li>
                            </ol>
                        </div>

                        <h2>What Happens to My Refills?</h2>
                        <p>
                            Your active refills transfer with you. If your doctor wrote a prescription for a 1-year supply, and you’ve only used 3 months of it, the remaining 9 months legally transfer to your new pharmacy. You do not need to go back to your doctor just to switch pharmacies.
                        </p>

                        <h2>Why Choose a Local Independent Pharmacy?</h2>
                        <p>
                            Big box chain pharmacies often treat prescriptions as a high-volume transactional business, relying on automated phone trees and long lines. Independent pharmacies (like Village IDA) generally focus on clinical relationships. We know our patients by name, we offer free delivery across Edmonton, and we compound custom medications.
                        </p>
                    </div>
                </div>
            </article>

            <CTABand
                headline="Ready for better pharmacy care?"
                primaryAction={{ label: "Transfer in 60 Seconds", href: "/transfer" }}
                secondaryAction={{ label: "Call Us", href: "tel:780-440-4555", external: true }}
            />
        </Layout>
    );
}
