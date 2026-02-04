import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StepCard } from "@/components/StepCard";
import {
  CheckCircle,
  Phone,
  Home,
  MessageSquare,
  Truck,
  Clock,
} from "lucide-react";

export default function Transfer() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    currentPharmacy: "",
    currentPharmacyPhone: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to an email service
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-accent" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Transfer request received
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                We'll contact your old pharmacy and have everything ready within 1-2 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="tel:780-440-4555">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
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
      {/* Hero */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              We can transfer your prescriptions for you
            </h1>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span>Save time — we handle all the paperwork</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span>We contact your old pharmacy directly</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span>Quick pickup or free delivery</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-foreground mb-6">What happens next</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <StepCard
              icon={MessageSquare}
              step={1}
              title="You tell us where"
              description="Share your current pharmacy name."
            />
            <StepCard
              icon={Phone}
              step={2}
              title="We make the call"
              description="We handle the transfer for you."
            />
            <StepCard
              icon={Truck}
              step={3}
              title="Pick up or delivery"
              description="Your prescriptions are ready."
            />
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Your Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone">Your Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="currentPharmacy">Current Pharmacy Name *</Label>
                <Input
                  id="currentPharmacy"
                  value={formData.currentPharmacy}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentPharmacy: e.target.value }))}
                  required
                  className="mt-2"
                  placeholder="e.g., Shoppers Drug Mart on Whyte Ave"
                />
              </div>
              <div>
                <Label htmlFor="currentPharmacyPhone">Current Pharmacy Phone (optional)</Label>
                <Input
                  id="currentPharmacyPhone"
                  type="tel"
                  value={formData.currentPharmacyPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentPharmacyPhone: e.target.value }))}
                  className="mt-2"
                  placeholder="If you have it handy"
                />
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <p className="text-sm text-muted-foreground mt-1 mb-2">
                  Please do not include medical details here. We will confirm everything by phone.
                </p>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Submit Transfer Request
              </Button>
            </form>

            {/* Prefer to Call */}
            <div className="mt-12 p-6 bg-muted rounded-2xl text-center">
              <h3 className="font-semibold text-foreground mb-2">Prefer to call?</h3>
              <p className="text-muted-foreground mb-4">
                We're happy to help over the phone.
              </p>
              <Button asChild variant="outline">
                <a href="tel:780-440-4555">
                  <Phone className="h-4 w-4 mr-2" />
                  780-440-4555
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for mobile dock */}
      <div className="h-16 md:hidden" />
    </Layout>
  );
}
