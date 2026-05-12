import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { StepCard } from "@/components/StepCard";
import { RefillForm } from "./_components/RefillForm";
import { ClipboardCheck, FileText, Truck } from "lucide-react";

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
      <section className="py-10 md:py-12 bg-card border-b border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-serif text-foreground mb-8">What happens next</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard icon={FileText} step={1} title="You send the request" description="Add your prescription number and pickup or delivery preference." />
            <StepCard icon={ClipboardCheck} step={2} title="We review it" description="Our pharmacy team checks the request and follows up if anything needs clarification." />
            <StepCard icon={Truck} step={3} title="Pickup or delivery" description="We confirm when it is ready and arrange delivery if requested." />
          </div>
        </div>
      </section>
      <RefillForm />
    </Layout>
  );
}
