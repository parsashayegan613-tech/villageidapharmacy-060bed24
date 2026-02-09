import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StepCard } from "@/components/StepCard";
import { CheckCircle, Phone, Home, MessageSquare, Truck, ArrowRight } from "lucide-react";

export default function Transfer() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", currentPharmacy: "", currentPharmacyPhone: "", notes: "" });

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <Layout>
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h1 className="text-3xl font-serif text-foreground mb-4">Transfer request received</h1>
              <p className="text-muted-foreground text-lg mb-8">We'll contact your old pharmacy and have everything ready within 1-2 business days.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full px-8 gap-2"><a href="tel:780-440-4555"><Phone className="h-4 w-4" />Call Now</a></Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 gap-2"><Link to="/"><Home className="h-4 w-4" />Back to Home</Link></Button>
              </div>
            </div>
          </div>
        </section>
        <div className="h-16 md:hidden" />
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead title="Transfer Prescriptions | Village IDA Pharmacy" description="Transfer your prescriptions to Village IDA. We handle all the paperwork with your old pharmacy. Free delivery available." />
      
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

      {/* Steps */}
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

      {/* Form */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div><Label htmlFor="name">Your Full Name *</Label><Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required className="mt-2" /></div>
              <div><Label htmlFor="phone">Your Phone Number *</Label><Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} required className="mt-2" /></div>
              <div><Label htmlFor="currentPharmacy">Current Pharmacy Name *</Label><Input id="currentPharmacy" value={formData.currentPharmacy} onChange={(e) => setFormData(prev => ({ ...prev, currentPharmacy: e.target.value }))} required className="mt-2" placeholder="e.g., Shoppers Drug Mart on Whyte Ave" /></div>
              <div><Label htmlFor="currentPharmacyPhone">Current Pharmacy Phone (optional)</Label><Input id="currentPharmacyPhone" type="tel" value={formData.currentPharmacyPhone} onChange={(e) => setFormData(prev => ({ ...prev, currentPharmacyPhone: e.target.value }))} className="mt-2" placeholder="If you have it handy" /></div>
              <div><Label htmlFor="notes">Additional Notes</Label><p className="text-sm text-muted-foreground mt-1 mb-2">Please do not include medical details here. We will confirm everything by phone.</p><Textarea id="notes" value={formData.notes} onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))} rows={3} /></div>
              <Button type="submit" className="w-full rounded-full gap-2" size="lg">Submit Transfer Request <ArrowRight className="h-4 w-4" /></Button>
            </form>

            <div className="mt-12 p-8 bg-muted rounded-2xl text-center">
              <h3 className="font-serif text-foreground text-lg mb-2">Prefer to call?</h3>
              <p className="text-muted-foreground mb-4 text-sm">We're happy to help over the phone.</p>
              <Button asChild variant="outline" className="rounded-full gap-2">
                <a href="tel:780-440-4555"><Phone className="h-4 w-4" />780-440-4555</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="h-16 md:hidden" />
    </Layout>
  );
}
