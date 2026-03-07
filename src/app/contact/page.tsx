import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { ContactClient } from "./_components/ContactClient";
import { Button } from "@/components/ui/button";
import { Phone, ExternalLink, RefreshCw, ArrowRightLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us | Village IDA Pharmacy Edmonton",
  description: "Get in touch with Village IDA Pharmacy. Call 780-440-4555 or visit us at 7004 98 Ave, Edmonton. Hours: Mon-Fri 9-5.",
};

export default function ContactPage() {
  return (
    <Layout>
      <section className="py-20 md:py-28 bg-secondary relative overflow-hidden noise">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Contact</p>
            <h1 className="text-display-sm md:text-display font-serif text-foreground mb-4">Get in touch.</h1>
            <p className="text-muted-foreground text-lg">Have a question? We're here to help.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="ghost" size="sm" className="gap-2 rounded-full"><a href="tel:780-440-4555"><Phone className="h-4 w-4" />Call</a></Button>
            <Button asChild variant="ghost" size="sm" className="gap-2 rounded-full"><a href="https://maps.google.com/?q=7004+98+Ave+Edmonton+AB+T6A+0A5" target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" />Directions</a></Button>
            <Button asChild variant="ghost" size="sm" className="gap-2 rounded-full"><Link href="/refill"><RefreshCw className="h-4 w-4" />Refill</Link></Button>
            <Button asChild variant="ghost" size="sm" className="gap-2 rounded-full"><Link href="/transfer"><ArrowRightLeft className="h-4 w-4" />Transfer</Link></Button>
          </div>
        </div>
      </section>

      <ContactClient />
    </Layout>
  );
}
