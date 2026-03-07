import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { AppointmentsForm } from "./_components/AppointmentsForm";

export const metadata: Metadata = {
  title: "Request Appointment | Village IDA Pharmacy Edmonton",
  description: "Book a pharmacy appointment for injections, medication reviews, diabetes support, smoking cessation, or compounding consultations.",
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
      <AppointmentsForm />
      <div className="h-16 md:hidden" />
    </Layout>
  );
}
