import { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
    title: "Custom Medication for Kids: A Parent's Guide to Compounding",
    description: "Learn how pediatric compounding pharmacies create custom, flavored, dye-free medications for kids who hate taking standard prescriptions.",
};

export default function GuidePediatricCompounding() {
    return (
        <Layout>
            <article className="py-20 md:py-28 bg-background">
                <div className="container mx-auto px-4 max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Patient Guide</p>
                    <h1 className="text-display-sm md:text-5xl font-serif text-foreground mb-8">
                        Custom Medication for Kids: A Parent's Guide to Compounding
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border pb-8 mb-10">
                        <span>By Heidi, Lead Pharmacist</span>
                        <span>•</span>
                        <span>5 min read</span>
                    </div>

                    <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-medium prose-a:text-primary max-w-none space-y-8">
                        <p className="lead text-xl text-muted-foreground leading-relaxed">
                            If you’ve ever tried to negotiate with a toddler over a spoonful of bitter antibiotic syrup, you understand the daily battle of pediatric medication. When a child refuses a vital prescription, turns down a pill they can't swallow, or has an allergy to red dye, standard chain pharmacy options often fail.
                        </p>

                        <h2>Why Won't My Child Take Their Medicine?</h2>
                        <p>
                            It's rarely stubbornness; it's often biology. Children have highly sensitive taste buds that interpret bitter medicine as inherently bad. Furthermore, many vital medications are manufactured only with adult dosages and adult pill forms securely in mind. The mass-market pharmaceutical industry simply doesn't prioritize the palatability or specific dosing needs of a four-year-old.
                        </p>

                        <p>
                            When an adult dose is cut in half or a pill is crushed into applesauce, it can compromise the efficacy of the drug, leave a chalky texture that induces gagging, or supply an inconsistent dosage of the active ingredient.
                        </p>

                        <h2>Enter the Compounding Pharmacy</h2>
                        <p>
                            A compounding pharmacy does not simply hand you a pre-filled bottle from a factory. We are trained to create medication from scratch in our laboratory. For pediatric patients, this means transforming an impossible prescription into an easy, customized treatment plan.
                        </p>

                        <div className="bg-secondary p-8 rounded-2xl border border-border/50 my-10">
                            <h3 className="!mt-0">How Pediatric Compounding Works</h3>
                            <ul className="mb-0 space-y-4">
                                <li>
                                    <strong>Flavoring:</strong> We can significantly mask bitter tastes with child-friendly flavors like grape, bubblegum, cherry, or marshmallow, turning a daily fight into something they don't mind taking.
                                </li>
                                <li>
                                    <strong>Texture and Form Changes:</strong> If your child gags on pills or gritty liquids, we can compound the medication into a smooth suspension, a melting troche, a gummy, or even a topical cream that absorbs through the skin.
                                </li>
                                <li>
                                    <strong>Removing Allergens:</strong> Many standard syrups contain sugars, red dyes, gluten, or preservatives that trigger allergic reactions or specific dietary intolerances. We formulate pure, allergen-free alternatives using safe bases.
                                </li>
                                <li>
                                    <strong>Exact Dosing:</strong> We don't rely on cutting an adult pill into quarters. We compound the exact strength your child needs based on their current body weight.
                                </li>
                            </ul>
                        </div>

                        <h2>Do I Need a Special Prescription?</h2>
                        <p>
                            Yes, just like a standard prescription, your pediatrician or family doctor needs to write an order for the compounded medication. Many doctors in Edmonton are highly familiar with writing compounding prescriptions when standard options fail.
                        </p>

                        <p>
                            At Village IDA, our compounding team collaborates directly with local pediatricians to find the perfect formulation for your child. Never force a pill again.
                        </p>

                    </div>
                </div>
            </article>

            <CTABand
                headline="Need custom pediatric medication?"
                primaryAction={{ label: "Contact Compounding Team", href: "/appointments?type=compounding" }}
                secondaryAction={{ label: "Learn More", href: "/compounding" }}
            />
        </Layout>
    );
}
