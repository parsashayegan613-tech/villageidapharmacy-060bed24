import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { StepCard } from "@/components/StepCard";
import { TransferForm } from "./_components/TransferForm";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CheckCircle, Phone, MessageSquare, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Transfer Prescriptions | Village IDA Pharmacy Edmonton",
  description: "Transfer your prescriptions to Village IDA. We handle all the paperwork with your old pharmacy. Free delivery available in Edmonton.",
};

export default function TransferPage() {
  return (
    <Layout>
      <section className="py-16 md:py-20 bg-secondary relative overflow-hidden noise">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Transfer</p>
            <h1 className="text-display-sm font-serif text-foreground mb-6">We'll handle everything.</h1>
            <ul className="space-y-3 text-muted-foreground">
              {["Save time — we handle all the paperwork", "We contact your old pharmacy directly", "Quick pickup or free delivery"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-3.5 w-3.5 text-success" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-serif text-foreground mb-8">What happens next</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard icon={MessageSquare} step={1} title="You tell us where" description="Share your current pharmacy name." />
            <StepCard icon={Phone} step={2} title="We make the call" description="We handle the transfer for you." />
            <StepCard icon={Truck} step={3} title="Pick up or delivery" description="Your prescriptions are ready." />
          </div>
        </div>
      </section>

      <TransferForm />

      <section className="py-16 md:py-24 bg-card border-t border-border/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-serif text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <FAQAccordion
            items={[
              {
                question: "How long does it take to transfer my prescriptions?",
                answer: "Most prescription transfers are completed on the same business day. Depending on how quickly your current pharmacy responds to our request, we typically have everything moved over within a few hours.",
              },
              {
                question: "Do I have to call my old pharmacy?",
                answer: "No, you don't have to lift a finger! Once you submit the form above, our pharmacists will contact your old pharmacy directly to transfer all your active prescription files on your behalf.",
              },
              {
                question: "How does transferring prescriptions work in Alberta?",
                answer: "In Alberta, pharmacies are legally required to transfer active prescriptions when requested by the patient. All your health information and remaining refill counts are securely documented and transferred directly between the two pharmacists.",
              },
              {
                question: "Can I transfer just one prescription, or does it have to be all of them?",
                answer: "You can transfer as many or as few as you'd like. The form above allows you to either select 'Transfer All' or specify the exact medications you want moved to Village IDA.",
              },
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}
