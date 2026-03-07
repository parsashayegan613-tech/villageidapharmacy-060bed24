"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Phone, Home, ArrowRight, Plus, Trash2 } from "lucide-react";

export function TransferForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "", currentPharmacy: "", currentPharmacyPhone: "", notes: "", medications: [""] });

    const addMedication = () => setFormData(prev => ({ ...prev, medications: [...prev.medications, ""] }));
    const removeMedication = (index: number) => setFormData(prev => ({ ...prev, medications: prev.medications.filter((_, i) => i !== index) }));
    const updateMedication = (index: number, value: string) => setFormData(prev => ({ ...prev, medications: prev.medications.map((m, i) => i === index ? value : m) }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const medicationsText = formData.medications.filter(m => m.trim() !== "").length > 0
                ? `Medications to Transfer:\n${formData.medications.filter(m => m.trim() !== "").map(m => `- ${m}`).join("\n")}\n\n` : "";
            const fullNotes = `${medicationsText}Notes:\n${formData.notes}`;
            const { error } = await supabase.from("transfers").insert([{
                full_name: formData.name, phone: formData.phone, current_pharmacy: formData.currentPharmacy,
                current_pharmacy_phone: formData.currentPharmacyPhone, notes: fullNotes, status: "pending", user_id: null,
            }]);
            if (error) throw error;
            await supabase.functions.invoke("send-transfer-alert", {
                body: { name: formData.name, phone: formData.phone, currentPharmacy: formData.currentPharmacy, medications: formData.medications.filter(rx => rx.trim() !== "") },
            });
            setSubmitted(true);
            toast.success("Transfer request sent!");
        } catch (error: any) {
            toast.error("Failed to send request. Please try again or call us.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="max-w-lg mx-auto text-center">
                        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"><CheckCircle className="h-10 w-10 text-success" /></div>
                        <h2 className="text-3xl font-serif text-foreground mb-4">Transfer request received</h2>
                        <p className="text-muted-foreground text-lg mb-8">We'll contact your old pharmacy and have everything ready within 1-2 business days.</p>
                        <div className="bg-card border border-border/60 rounded-2xl p-6 text-left mb-8 max-w-sm mx-auto shadow-soft">
                            <h3 className="font-semibold text-foreground mb-4 border-b border-border pb-2">Request Summary</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between"><span className="text-muted-foreground">Name:</span><span className="font-medium">{formData.name}</span></div>
                                <div className="flex justify-between"><span className="text-muted-foreground">From:</span><span className="font-medium truncate max-w-[150px]">{formData.currentPharmacy}</span></div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="rounded-full px-8 gap-2"><a href="tel:780-440-4555"><Phone className="h-4 w-4" />Call Now</a></Button>
                            <Button asChild size="lg" variant="outline" className="rounded-full px-8 gap-2"><Link href="/"><Home className="h-4 w-4" />Back to Home</Link></Button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div><Label htmlFor="name">Your Full Name *</Label><Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required className="mt-2" /></div>
                        <div><Label htmlFor="phone">Your Phone Number *</Label><Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} required className="mt-2" /></div>
                        <div><Label htmlFor="currentPharmacy">Current Pharmacy Name *</Label><Input id="currentPharmacy" value={formData.currentPharmacy} onChange={(e) => setFormData(prev => ({ ...prev, currentPharmacy: e.target.value }))} required className="mt-2" placeholder="e.g., Shoppers Drug Mart on Whyte Ave" /></div>
                        <div><Label htmlFor="currentPharmacyPhone">Current Pharmacy Phone (optional)</Label><Input id="currentPharmacyPhone" type="tel" value={formData.currentPharmacyPhone} onChange={(e) => setFormData(prev => ({ ...prev, currentPharmacyPhone: e.target.value }))} className="mt-2" placeholder="If you have it handy" /></div>
                        <div className="pt-4 border-t border-border">
                            <Label className="text-base font-serif mb-2 block">Medications to Transfer</Label>
                            <div className="space-y-3 mt-2">
                                {formData.medications.map((med, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input value={med} onChange={(e) => updateMedication(index, e.target.value)} placeholder={`Medication #${index + 1}${index === 0 ? " (or 'Transfer All')" : ""}`} />
                                        {formData.medications.length > 1 && (<Button type="button" variant="outline" size="icon" onClick={() => removeMedication(index)}><Trash2 className="h-4 w-4" /></Button>)}
                                    </div>
                                ))}
                            </div>
                            <Button type="button" variant="ghost" size="sm" onClick={addMedication} className="mt-2 text-muted-foreground"><Plus className="h-4 w-4 mr-2" />Add Another</Button>
                        </div>
                        <div><Label htmlFor="notes">Additional Notes</Label><p className="text-sm text-muted-foreground mt-1 mb-2">Please do not include medical details here. We will confirm everything by phone.</p><Textarea id="notes" value={formData.notes} onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))} rows={3} /></div>
                        <Button type="submit" disabled={isSubmitting} className="w-full rounded-full gap-2" size="lg">
                            {isSubmitting ? "Submitting..." : "Submit Transfer Request"} <ArrowRight className="h-4 w-4" />
                        </Button>
                    </form>
                    <div className="mt-12 p-8 bg-muted rounded-2xl text-center">
                        <h3 className="font-serif text-foreground text-lg mb-2">Prefer to call?</h3>
                        <p className="text-muted-foreground mb-4 text-sm">We're happy to help over the phone.</p>
                        <Button asChild variant="outline" className="rounded-full gap-2"><a href="tel:780-440-4555"><Phone className="h-4 w-4" />780-440-4555</a></Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
