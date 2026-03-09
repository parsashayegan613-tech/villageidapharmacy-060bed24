import { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
    title: "A Caregiver's Guide to Blister Packaging in Edmonton",
    description: "Learn how compliance blister packaging can eliminate prescription errors, reduce stress for caregivers, and simplify medication schedules in Edmonton.",
};

export default function GuideBlisterPackaging() {
    return (
        <Layout>
            <article className="py-20 md:py-28 bg-background">
                <div className="container mx-auto px-4 max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Patient Guide</p>
                    <h1 className="text-display-sm md:text-5xl font-serif text-foreground mb-8">
                        A Caregiver's Guide to Blister Packaging in Edmonton
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border pb-8 mb-10">
                        <span>By Anoosh, Pharmacist</span>
                        <span>•</span>
                        <span>3 min read</span>
                    </div>

                    <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-medium prose-a:text-primary max-w-none space-y-8">
                        <p className="lead text-xl text-muted-foreground leading-relaxed">
                            Managing a single medication is easy. Managing six different medications taken at four different times of day is a full-time job. For patients and family caregivers in Edmonton, compliance blister packaging is the single most effective tool for medication safety.
                        </p>

                        <h2>What Exactly is Blister Packaging?</h2>
                        <p>
                            Also known as compliance packaging, bubble packs, or dosing cards, blister packaging replaces individual pill bottles. Instead of handing you eight different orange bottles, the pharmacy pre-sorts all the medications into a secure weekly or monthly card. Each "blister" (or bubble) on the card contains the exact combination of pills meant to be taken at a specific day and time.
                        </p>

                        <h2>Why Pill Bottles Fail Complex Regimens</h2>
                        <p>
                            When a patient is managing chronic conditions, heart medications, and daily vitamins simultaneously, the margin for error is high. Did Dad take his morning pills? Did he accidentally take them twice? Which bottle should be taken with food, and which before bed?
                        </p>
                        <p>
                            Caregivers spend hours every Sunday hunched over a kitchen table, manually sorting pills into day-of-the-week plastic organizers. Blister packaging outsources this dangerous, tedious chore entirely to a licensed pharmacy. We handle the sorting, ensuring everything is pharmaceutically accurate.
                        </p>

                        <div className="bg-secondary p-8 rounded-2xl border border-border/50 my-10">
                            <h3 className="!mt-0">The 4 Core Benefits of Blister Packs</h3>
                            <ul className="mb-0 space-y-4">
                                <li>
                                    <strong>Visual Confirmation:</strong> You can see at a glance if Tuesday afternoon's medications have been taken yet by simply looking at the empty (or unopened) bubble.
                                </li>
                                <li>
                                    <strong>Reduced Medication Errors:</strong> Eliminates the risk of double-dosing or missing vital doses, the leading cause of adverse drug events in seniors.
                                </li>
                                <li>
                                    <strong>Caregiver Stress Relief:</strong> Replaces Sunday-night pill sorting with peace of mind.
                                </li>
                                <li>
                                    <strong>Travel Friendliness:</strong> No more bringing a grocery bag full of bottles on vacation. Let us package a one-week card for you.
                                </li>
                            </ul>
                        </div>

                        <h2>How Do I Get Started in Edmonton?</h2>
                        <p>
                            At Village IDA Pharmacy, we specialize in helping Edmonton seniors and busy caregivers transition to compliance packaging. If you currently fill your prescriptions with us, just ask us to switch you over. We will consolidate your refill schedule and start preparing your customized cards.
                        </p>
                        <p>
                            If you’re currently with another pharmacy, moving everything to us is a completely free, seamless process that we handle on our end. We'll simply contact your old pharmacy, pull your files, and start building your custom blister packs. Then, we can schedule our driver to deliver the blister pack directly to your door, across Edmonton.
                        </p>
                    </div>
                </div>
            </article>

            <CTABand
                headline="Ready to simplify your medication?"
                primaryAction={{ label: "Learn About Our Packaging", href: "/blister-packaging" }}
                secondaryAction={{ label: "Call Us", href: "tel:780-440-4555", external: true }}
            />
        </Layout>
    );
}
