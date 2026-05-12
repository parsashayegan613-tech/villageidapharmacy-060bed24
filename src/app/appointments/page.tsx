import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { StepCard } from "@/components/StepCard";
import { AppointmentsForm } from "./_components/AppointmentsForm";
import { CalendarCheck, MessageSquare, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Request Appointment | Village IDA Pharmacy Edmonton",
  description: "Request a pharmacy appointment for injections, medication reviews, diabetes support, smoking cessation, or compounding consultations.",
};

export default function AppointmentsPage() {
  return (
    <Layout>
      <section className="py-16 md:py-20 bg-secondary relative overflow-hidden noise">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Appointments</p>
            <h1 className="text-display-sm font-serif text-foreground mb-4">Request an Appointment</h1>
            <p className="text-muted-foreground text-lg">Select the type of appointment you need, and we'll be in touch to confirm a time.</p>
          </div>
        </div>
      </section>
      <section className="py-10 md:py-12 bg-card border-b border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-serif text-foreground mb-8">How appointment requests work</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard icon={MessageSquare} step={1} title="Choose a service" description="Tell us what you need help with and your preferred timing." />
            <StepCard icon={Phone} step={2} title="We confirm by phone or text" description="Your request is reviewed before an appointment time is finalized." />
            <StepCard icon={CalendarCheck} step={3} title="Visit at the confirmed time" description="Bring any required card, medication list, or documentation." />
          </div>
        </div>
      </section>
      <AppointmentsForm />
      <div className="h-16 md:hidden" />
    </Layout>
  );
}
