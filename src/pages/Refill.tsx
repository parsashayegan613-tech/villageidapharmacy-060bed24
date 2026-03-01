import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Plus, Trash2, Phone, Home, ArrowRight, ArrowLeft, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | "confirmation";

export default function Refill() {
  const [step, setStep] = useState<Step>(1);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", contactMethod: "call", consent: false,
    prescriptions: [""], deliveryType: "pickup", address: "", city: "", postalCode: "", notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.user_metadata?.full_name || prev.name,
        email: user.email || prev.email,
        phone: user.user_metadata?.phone || prev.phone,
      }));
    }
  }, [user]);
  const addPrescription = () => setFormData(prev => ({ ...prev, prescriptions: [...prev.prescriptions, ""] }));
  const removePrescription = (index: number) => setFormData(prev => ({ ...prev, prescriptions: prev.prescriptions.filter((_, i) => i !== index) }));
  const updatePrescription = (index: number, value: string) => setFormData(prev => ({ ...prev, prescriptions: prev.prescriptions.map((p, i) => i === index ? value : p) }));

  const handleScanBarcode = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!('BarcodeDetector' in window)) {
      toast.error("Your browser doesn't support automatic barcode scanning. Please type it in manually.");
      return;
    }

    setIsScanning(true);
    try {
      const bitmap = await createImageBitmap(file);
      // @ts-ignore
      const detector = new window.BarcodeDetector();
      const barcodes = await detector.detect(bitmap);

      if (barcodes.length > 0) {
        const value = barcodes[0].rawValue;
        toast.success(`Scanned: ${value}`);

        // Find first empty slot or add a new one
        setFormData(prev => {
          const emptyIndex = prev.prescriptions.findIndex(p => p.trim() === "");
          if (emptyIndex !== -1) {
            const newRx = [...prev.prescriptions];
            newRx[emptyIndex] = value;
            return { ...prev, prescriptions: newRx };
          } else {
            return { ...prev, prescriptions: [...prev.prescriptions, value] };
          }
        });
      } else {
        toast.error("No barcode found. Please try again or type manually.");
      }
    } catch (err: any) {
      toast.error("Failed to scan barcode.");
    } finally {
      setIsScanning(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("refills").insert([
        {
          full_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          contact_method: formData.contactMethod,
          prescriptions: formData.prescriptions.filter(rx => rx.trim() !== ""),
          delivery_type: formData.deliveryType,
          address: formData.deliveryType === "delivery" ? formData.address : null,
          city: formData.deliveryType === "delivery" ? formData.city : null,
          postal_code: formData.deliveryType === "delivery" ? formData.postalCode : null,
          notes: formData.notes,
          status: "pending",
          user_id: user?.id || null
        }
      ]);

      if (error) throw error;

      setStep("confirmation");
      toast.success("Refill request sent successfully!");
    } catch (error: any) {
      console.error("Error submitting refill:", error.message);
      toast.error("Failed to send request. Please try again or call us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "confirmation") {
    return (
      <Layout>
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h1 className="text-3xl font-serif text-foreground mb-4">We received your request</h1>
              <p className="text-muted-foreground text-lg mb-8">We'll respond within 1 business day to confirm your refill.</p>

              <div className="bg-card border border-border/60 rounded-2xl p-6 text-left mb-8 max-w-sm mx-auto shadow-soft">
                <h3 className="font-semibold text-foreground mb-4 border-b border-border pb-2">Request Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Name:</span><span className="font-medium">{formData.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Contact:</span><span className="font-medium">{formData.phone}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Delivery:</span><span className="font-medium capitalize">{formData.deliveryType}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Prescriptions:</span><span className="font-medium">{formData.prescriptions.filter(p => p.trim()).length} item(s)</span></div>
                </div>
              </div>

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
      <SEOHead title="Refill Request | Village IDA Pharmacy Edmonton" description="Request a prescription refill online. Most refills ready in 15-20 minutes. Free delivery available in Edmonton." />

      <section className="py-16 md:py-20 bg-secondary relative overflow-hidden noise">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Refill</p>
            <h1 className="text-display-sm font-serif text-foreground mb-4">Refill Request</h1>
            <p className="text-muted-foreground text-lg">Submit your refill request online. We'll confirm and have it ready for pickup or delivery.</p>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 max-w-xl mx-auto">
            <div className={cn("flex items-center gap-2", step === 1 ? "text-primary" : "text-muted-foreground")}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium", step === 1 ? "bg-primary text-primary-foreground" : "bg-muted")}>1</div>
              <span className="hidden sm:inline font-medium text-sm">Your Info</span>
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className={cn("flex items-center gap-2", step === 2 ? "text-primary" : "text-muted-foreground")}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium", step === 2 ? "bg-primary text-primary-foreground" : "bg-muted")}>2</div>
              <span className="hidden sm:inline font-medium text-sm">Refill Details</span>
            </div>
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
                  <Button type="button" onClick={() => setStep(2)} disabled={!formData.name || !formData.phone || !formData.consent} className="w-full rounded-full" size="lg">Continue<ArrowRight className="h-4 w-4 ml-2" /></Button>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Prescription Numbers</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={isScanning} className="gap-2 text-primary border-primary/20 hover:bg-primary/5">
                        <ScanLine className="h-4 w-4" /> {isScanning ? "Scanning..." : "Scan Bottle"}
                      </Button>
                      <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleScanBarcode} />
                    </div>
                    <div className="space-y-3 mt-2">{formData.prescriptions.map((rx, index) => (<div key={index} className="flex gap-2"><Input value={rx} onChange={(e) => updatePrescription(index, e.target.value)} placeholder={`Prescription #${index + 1}`} />{formData.prescriptions.length > 1 && (<Button type="button" variant="outline" size="icon" onClick={() => removePrescription(index)}><Trash2 className="h-4 w-4" /></Button>)}</div>))}</div><Button type="button" variant="ghost" size="sm" onClick={addPrescription} className="mt-2 text-muted-foreground"><Plus className="h-4 w-4 mr-2" />Add Another</Button>
                  </div>
                  <div><Label>Pickup or Delivery</Label><RadioGroup value={formData.deliveryType} onValueChange={(value) => setFormData(prev => ({ ...prev, deliveryType: value }))} className="mt-2 grid grid-cols-2 gap-4"><label className={cn("flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all", formData.deliveryType === "pickup" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50")}><RadioGroupItem value="pickup" id="pickup" className="sr-only" /><span className="font-medium">Pickup</span></label><label className={cn("flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all", formData.deliveryType === "delivery" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50")}><RadioGroupItem value="delivery" id="delivery" className="sr-only" /><span className="font-medium">Delivery</span></label></RadioGroup></div>
                  {formData.deliveryType === "delivery" && (<div className="space-y-4 p-4 bg-muted rounded-xl"><div><Label htmlFor="address">Street Address *</Label><Input id="address" value={formData.address} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} required={formData.deliveryType === "delivery"} className="mt-2" /></div><div className="grid grid-cols-2 gap-4"><div><Label htmlFor="city">City</Label><Input id="city" value={formData.city} onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))} className="mt-2" defaultValue="Edmonton" /></div><div><Label htmlFor="postalCode">Postal Code</Label><Input id="postalCode" value={formData.postalCode} onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))} className="mt-2" /></div></div></div>)}
                  <div><Label htmlFor="notes">Additional Notes</Label><p className="text-sm text-muted-foreground mt-1 mb-2">Please do not include medical details here. We will confirm everything by phone.</p><Textarea id="notes" value={formData.notes} onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))} rows={3} /></div>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-full" size="lg"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
                    <Button type="submit" disabled={isSubmitting} className="flex-1 rounded-full" size="lg">
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </Button>
                  </div>
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
