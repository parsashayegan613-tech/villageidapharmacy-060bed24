import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FileCheck2, Phone, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Licensing & Patient Notice | Village IDA Pharmacy",
    description: "View Village IDA Pharmacy licensing information and Alberta College of Pharmacy patient concern notice.",
};

const documents = [
    {
        title: "Pharmacy licence",
        description: "Alberta College of Pharmacy licence for Village IDA Pharmacy.",
        src: "/alberta-college-pharmacy-licence.jpg",
        alt: "Alberta College of Pharmacy licence for Village IDA Pharmacy, licence number 4572, expiring June 30, 2026.",
        width: 1240,
        height: 1580,
    },
    {
        title: "Patient concerns notice",
        description: "Alberta College of Pharmacy public notice for patient concerns.",
        src: "/alberta-college-pharmacy-concerns-notice.jpg",
        alt: "Alberta College of Pharmacy patient concerns notice with contact information.",
        width: 1200,
        height: 1588,
    },
];

export default function LicensingPage() {
    return (
        <Layout>
            <PageHero
                eyebrow="Licensing"
                icon={ShieldCheck}
                title="Licensing and patient notice."
                description="Village IDA Pharmacy displays current licensing information and patient concern guidance from the Alberta College of Pharmacy."
                compact
            />

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
                        <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-soft lg:sticky lg:top-28">
                            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                                <FileCheck2 className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="font-serif text-3xl text-foreground">Pharmacy licence details</h2>
                            <dl className="mt-6 space-y-4 text-sm">
                                <div>
                                    <dt className="font-semibold text-foreground">Licensee</dt>
                                    <dd className="mt-1 text-muted-foreground">Hayedeh (Heidi) Rashidi</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold text-foreground">Pharmacy</dt>
                                    <dd className="mt-1 text-muted-foreground">Village IDA Pharmacy, 7004 98 Ave, Edmonton, AB T6A 0A5</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold text-foreground">Licence number</dt>
                                    <dd className="mt-1 text-muted-foreground">4572</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold text-foreground">Expiry</dt>
                                    <dd className="mt-1 text-muted-foreground">June 30, 2026</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold text-foreground">Licence categories</dt>
                                    <dd className="mt-1 text-muted-foreground">Community, compounding, and repackaging</dd>
                                </div>
                            </dl>

                            <div className="mt-8 rounded-2xl border border-border/60 bg-secondary p-5">
                                <h3 className="font-sans text-base font-semibold text-foreground">Patient concerns</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Patients with concerns are encouraged to speak with the pharmacist first. If more help is needed, the Alberta College of Pharmacy can be contacted directly.
                                </p>
                                <div className="mt-4 flex flex-col gap-3 text-sm">
                                    <a href="tel:18772273838" className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 focus-ring rounded">
                                        <Phone className="h-4 w-4" />
                                        1-877-227-3838
                                    </a>
                                    <a
                                        href="https://abpharmacy.ca"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 focus-ring rounded"
                                    >
                                        abpharmacy.ca
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <SectionHeading
                                eyebrow="Displayed documents"
                                title="Current certificate and notice."
                                description="These scans are provided for patient visibility and regulatory transparency."
                            />
                            <div className="grid gap-6">
                                {documents.map((document) => (
                                    <article key={document.title} className="rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
                                        <div className="mb-4 flex flex-col gap-1 px-1 sm:flex-row sm:items-end sm:justify-between">
                                            <div>
                                                <h3 className="font-sans text-lg font-semibold text-foreground">{document.title}</h3>
                                                <p className="text-sm text-muted-foreground">{document.description}</p>
                                            </div>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={document.src} target="_blank">
                                                    Open full size
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                        <div className="relative overflow-hidden rounded-xl border border-border/60 bg-background">
                                            <Image
                                                src={document.src}
                                                alt={document.alt}
                                                width={document.width}
                                                height={document.height}
                                                sizes="(min-width: 1024px) 58vw, 100vw"
                                                quality={82}
                                                className="h-auto w-full"
                                            />
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="h-16 md:hidden" />
        </Layout>
    );
}
