"use client";

import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Printer, Mail, Clock, Copy, Check } from "lucide-react";

const contactInfo = [
    { icon: MapPin, label: "Address", value: "7004 98 Ave, Edmonton, AB T6A 0A5", copyable: true },
    { icon: Phone, label: "Phone", value: "780-440-4555", href: "tel:780-440-4555", copyable: true },
    { icon: Printer, label: "Fax", value: "780-440-1931", copyable: true },
    { icon: Mail, label: "Email", value: "villageidapharmacy@gmail.com", href: "mailto:villageidapharmacy@gmail.com", copyable: true },
];

export function ContactClient() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

    const copyToClipboard = async (text: string, index: number) => {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { error } = await supabase.from("contact_messages").insert([{ full_name: formData.name, phone: formData.phone, message: formData.message, status: "unread", user_id: null }]);
            if (error) throw error;
            await supabase.functions.invoke("send-contact-alert", { body: { name: formData.name, phone: formData.phone, message: formData.message } });
            setSubmitted(true);
            toast.success("Message sent successfully!");
        } catch (error: any) {
            toast.error("Failed to send message. Please try again or call us.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-2xl font-serif text-foreground mb-8">Reach us directly</h2>
                            <div className="space-y-3 mb-10">
                                {contactInfo.map((item, index) => (
                                    <div key={item.label} className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border/60 hover:border-primary/20 transition-colors">
                                        <item.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{item.label}</div>
                                            {item.href ? (<a href={item.href} className="font-medium text-foreground hover:text-primary transition-colors">{item.value}</a>) : (<div className="font-medium text-foreground">{item.value}</div>)}
                                        </div>
                                        {item.copyable && (<button onClick={() => copyToClipboard(item.value, index)} className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label={`Copy ${item.label}`}>{copiedIndex === index ? (<Check className="h-4 w-4 text-success" />) : (<Copy className="h-4 w-4 text-muted-foreground" />)}</button>)}
                                    </div>
                                ))}
                            </div>
                            <h3 className="text-lg font-serif text-foreground mb-4">Hours</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-primary flex-shrink-0" /><span className="font-medium text-foreground">Monday – Friday:</span><span className="text-muted-foreground">9:00 AM – 5:00 PM</span></div>
                                <div className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-primary flex-shrink-0" /><span className="font-medium text-foreground">Saturday & Sunday:</span><span className="text-muted-foreground">By Appointment</span></div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-soft-lg border border-border/60 bg-muted">
                                <img src="/_DSC3857.jpg" alt="Pharmacist answering patient questions" className="w-full h-full object-cover object-center" loading="lazy" />
                            </div>
                            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/60">
                                <h3 className="text-lg font-serif text-foreground mb-5">Send us a message</h3>
                                {submitted ? (
                                    <div className="text-center py-8">
                                        <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4"><Check className="h-7 w-7 text-success" /></div>
                                        <p className="text-foreground font-medium text-lg mb-1">Message sent!</p>
                                        <p className="text-sm text-muted-foreground mb-6">We'll get back to you soon.</p>
                                        <div className="bg-card/50 rounded-xl p-4 text-left border border-border/40 inline-block w-full text-sm space-y-2">
                                            <div className="flex justify-between"><span className="text-muted-foreground">Name:</span><span className="font-medium">{formData.name}</span></div>
                                            <div className="flex justify-between"><span className="text-muted-foreground">Phone:</span><span className="font-medium">{formData.phone}</span></div>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div><Label htmlFor="name">Name</Label><Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required className="mt-1.5" /></div>
                                        <div><Label htmlFor="phone">Phone</Label><Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} required className="mt-1.5" /></div>
                                        <div><Label htmlFor="message">Message</Label><Textarea id="message" value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} required rows={4} className="mt-1.5" /></div>
                                        <Button type="submit" disabled={isSubmitting} className="w-full rounded-full">{isSubmitting ? "Sending..." : "Send Message"}</Button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="rounded-2xl overflow-hidden border border-border/60 shadow-soft">
                        <iframe title="Village IDA Pharmacy Location" src="https://maps.google.com/maps?q=Village+IDA+Pharmacy+7004+98+Ave+Edmonton+AB&t=&z=14&ie=UTF8&iwloc=&output=embed" width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full" />
                    </div>
                </div>
            </section>
            <div className="h-16 md:hidden" />
        </>
    );
}
