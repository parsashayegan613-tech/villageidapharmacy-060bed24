import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { RefillForm } from "./_components/RefillForm";

export const metadata: Metadata = {
  title: "Refill Request | Village IDA Pharmacy Edmonton",
  description: "Request a prescription refill online. Most refills ready in 15-20 minutes. Free delivery available in Edmonton.",
};

export default function RefillPage() {
  return (
    <Layout>
      <section className="py-16 md:py-20 bg-secondary relative overflow-hidden noise">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Refill</p>
            <h1 className="text-display-sm font-serif text-foreground mb-4">Refill Request</h1>
            <p className="text-muted-foreground text-lg">Submit your refill request online. We'll confirm and have it ready for pickup or delivery.</p>
          </div>
        </div>
      </section>
      <RefillForm />
    </Layout>
  );
}
