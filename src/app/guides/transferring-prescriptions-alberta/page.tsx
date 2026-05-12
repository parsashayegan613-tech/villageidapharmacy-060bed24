import { Metadata } from "next";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { CTABand } from "@/components/CTABand";
import { RelatedGuides } from "@/components/RelatedGuides";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "How to Transfer Prescriptions in Alberta (Step-by-Step)",
    description: "Learn your legal rights to transfer prescriptions in Alberta, and how easy it is to move your prescriptions to a new Edmonton pharmacy.",
};

export default function GuideTransfer() {
    return (
        <Layout>
            <article className="py-20 md:py-28 bg-background">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-8 focus-ring rounded">
                        <ArrowLeft className="h-4 w-4" />
                        Back to patient guides
                    </Link>
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
                            Changing pharmacies can feel like a lot to organize, but transferring prescriptions in Alberta is a regulated process designed around patient choice and continuity of care.
                        </p>

                        <h2>Your Legal Right to Transfer</h2>
                        <p>
                            In Alberta, pharmacies do not "own" your prescriptions — you do. Under the Alberta College of Pharmacy regulations, you have the legal right to choose where you receive your care. If you request a transfer, your current pharmacy is legally obligated to comply and securely send your active files to your new pharmacy of choice.
                        </p>

                        <h2>You Don't Have to Coordinate the Transfer Yourself</h2>
                        <p>
                            The part people often worry about most is contacting their current pharmacy. In most cases, your new pharmacy can coordinate that professional transfer on your behalf.
                        </p>
                        <p>
                            When you submit a transfer request to a new pharmacy, the pharmacists handle the process through secure fax or a pharmacist-to-pharmacist call. It is a standard professional procedure, and we handle the paperwork.
                        </p>

                        <div className="bg-secondary p-8 rounded-2xl border border-border/50 my-10">
                            <h3 className="!mt-0">The 3-Step Transfer Process</h3>
                            <ol className="mb-0 space-y-4">
                                <li>
                                    <strong>Choose a new pharmacy:</strong> Look for accessible pharmacists, strong reviews, delivery options, and services that match your needs.
                                </li>
                                <li>
                                    <strong>Request a transfer:</strong> Fill out a quick online form or give the new pharmacy a short phone call. Provide your name, date of birth, and the name and phone number of your current pharmacy.
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

                        <h2>What to Look For in a Pharmacy</h2>
                        <p>
                            Choose a pharmacy that offers accessible pharmacists, clear communication, and services that fit your routine. At Village IDA, we get to know our patients, offer free delivery across Edmonton, and prepare custom compounded medications when commercially available options are not the right fit.
                        </p>
                    </div>
                </div>
            </article>

            <RelatedGuides excludeHref="/guides/transferring-prescriptions-alberta" />

            <CTABand
                headline="Want us to coordinate your prescription transfer?"
                primaryAction={{ label: "Start Transfer Request", href: "/transfer" }}
                secondaryAction={{ label: "Call Pharmacy", href: "tel:780-440-4555", external: true }}
            />
        </Layout>
    );
}
