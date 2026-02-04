import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Plus, Trash2, Phone, Home, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | "confirmation";

export default function Refill() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", contactMethod: "call", consent: false,
    prescriptions: [""], deliveryType: "pickup", address: "", city: "", postalCode: "", notes: "",
  });

  const addPrescription = () => setFormData(prev => ({ ...prev, prescriptions: [...prev.prescriptions, ""] }));
  const removePrescription = (index: number) => setFormData(prev => ({ ...prev, prescriptions: prev.prescriptions.filter((_, i) => i !== index) }));
  const updatePrescription = (index: number, value: string) => setFormData(prev => ({ ...prev, prescriptions: prev.prescriptions.map((p, i) => i === index ? value : p) }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setStep("confirmation"); };

  if (step === "confirmation") {
    return (
      <Layout>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-accent" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">We received your request</h1>
              <p className="text-muted-foreground text-lg mb-8">We'll respond within 1 business day to confirm your refill.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg"><a href="tel:780-440-4555"><Phone className="h-4 w-4 mr-2" />Call Now</a></Button>
                <Button asChild size="lg" variant="outline"><Link to="/"><Home className="h-4 w-4 mr-2" />Back to Home</Link></Button>
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
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4"><div className="max-w-2xl"><h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Refill Request</h1><p className="text-muted-foreground text-lg">Submit your refill request online. We'll confirm and have it ready for pickup or delivery.</p></div></div>
      </section>
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className={cn("flex items-center gap-2", step === 1 ? "text-primary" : "text-muted-foreground")}><div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium", step === 1 ? "bg-primary text-primary-foreground" : "bg-muted")}>1</div><span className="hidden sm:inline font-medium">Your Info</span></div>
            <div className="flex-1 h-px bg-border" />
            <div className={cn("flex items-center gap-2", step === 2 ? "text-primary" : "text-muted-foreground")}><div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium", step === 2 ? "bg-primary text-primary-foreground" : "bg-muted")}>2</div><span className="hidden sm:inline font-medium">Refill Details</span></div>
          </div>
        </div>
      </div>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div><Label htmlFor="name">Full Name *</Label><Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required className="mt-2" /></div>
                  <div><Label htmlFor="phone">Phone Number *</Label><Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} required className="mt-2" /></div>
                  <div><Label htmlFor="email">Email (optional)</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="mt-2" /></div>
                  <div><Label>Preferred Contact Method *</Label><RadioGroup value={formData.contactMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, contactMethod: value }))} className="mt-2 flex gap-4"><div className="flex items-center space-x-2"><RadioGroupItem value="call" id="call" /><Label htmlFor="call" className="font-normal">Call</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="text" id="text" /><Label htmlFor="text" className="font-normal">Text</Label></div></RadioGroup></div>
                  <div className="flex items-start space-x-3"><Checkbox id="consent" checked={formData.consent} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: !!checked }))} /><Label htmlFor="consent" className="text-sm font-normal leading-relaxed">I consent to be contacted at the phone number provided regarding my refill request.</Label></div>
                  <Button type="button" onClick={() => setStep(2)} disabled={!formData.name || !formData.phone || !formData.consent} className="w-full" size="lg">Continue<ArrowRight className="h-4 w-4 ml-2" /></Button>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-6">
                  <div><Label>Prescription Numbers</Label><div className="space-y-3 mt-2">{formData.prescriptions.map((rx, index) => (<div key={index} className="flex gap-2"><Input value={rx} onChange={(e) => updatePrescription(index, e.target.value)} placeholder={`Prescription #${index + 1}`} />{formData.prescriptions.length > 1 && (<Button type="button" variant="outline" size="icon" onClick={() => removePrescription(index)}><Trash2 className="h-4 w-4" /></Button>)}</div>))}</div><Button type="button" variant="ghost" size="sm" onClick={addPrescription} className="mt-2"><Plus className="h-4 w-4 mr-2" />Add Another</Button></div>
                  <div><Label>Pickup or Delivery</Label><RadioGroup value={formData.deliveryType} onValueChange={(value) => setFormData(prev => ({ ...prev, deliveryType: value }))} className="mt-2 grid grid-cols-2 gap-4"><label className={cn("flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-colors", formData.deliveryType === "pickup" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50")}><RadioGroupItem value="pickup" id="pickup" className="sr-only" /><span className="font-medium">Pickup</span></label><label className={cn("flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-colors", formData.deliveryType === "delivery" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50")}><RadioGroupItem value="delivery" id="delivery" className="sr-only" /><span className="font-medium">Delivery</span></label></RadioGroup></div>
                  {formData.deliveryType === "delivery" && (<div className="space-y-4 p-4 bg-muted rounded-xl"><div><Label htmlFor="address">Street Address *</Label><Input id="address" value={formData.address} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} required={formData.deliveryType === "delivery"} className="mt-2" /></div><div className="grid grid-cols-2 gap-4"><div><Label htmlFor="city">City</Label><Input id="city" value={formData.city} onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))} className="mt-2" defaultValue="Edmonton" /></div><div><Label htmlFor="postalCode">Postal Code</Label><Input id="postalCode" value={formData.postalCode} onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))} className="mt-2" /></div></div></div>)}
                  <div><Label htmlFor="notes">Additional Notes</Label><p className="text-sm text-muted-foreground mt-1 mb-2">Please do not include medical details here. We will confirm everything by phone.</p><Textarea id="notes" value={formData.notes} onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))} rows={3} /></div>
                  <div className="flex gap-4"><Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1" size="lg"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button><Button type="submit" className="flex-1" size="lg">Submit Request</Button></div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
      <div className="h-16 md:hidden" />
    </Layout>
  );
}
