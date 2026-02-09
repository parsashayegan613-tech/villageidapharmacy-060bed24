import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { MapPin, Phone, Printer, Mail, Clock, Copy, Check, RefreshCw, ArrowRightLeft, ExternalLink } from "lucide-react";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "7004 98 Ave, Edmonton, AB T6A 0A5", copyable: true },
  { icon: Phone, label: "Phone", value: "780-440-4555", href: "tel:780-440-4555", copyable: true },
  { icon: Printer, label: "Fax", value: "780-440-1931", copyable: true },
  { icon: Mail, label: "Email", value: "villida@telus.net", href: "mailto:villida@telus.net", copyable: true },
];

export default function Contact() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = async (text: string, index: number) => { await navigator.clipboard.writeText(text); setCopiedIndex(index); setTimeout(() => setCopiedIndex(null), 2000); };
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <Layout>
      <SEOHead title="Contact Us | Village IDA Pharmacy Edmonton" description="Get in touch with Village IDA Pharmacy. Call 780-440-4555 or visit us at 7004 98 Ave, Edmonton. Hours: Mon-Fri 9-5." />
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4"><div className="max-w-2xl"><h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Contact Us</h1><p className="text-muted-foreground text-lg">Have a question? We're here to help.</p></div></div>
      </section>
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm" className="gap-2"><a href="tel:780-440-4555"><Phone className="h-4 w-4" />Call</a></Button>
            <Button asChild variant="outline" size="sm" className="gap-2"><a href="https://maps.google.com/?q=7004+98+Ave+Edmonton+AB+T6A+0A5" target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" />Directions</a></Button>
            <Button asChild variant="outline" size="sm" className="gap-2"><Link to="/refill"><RefreshCw className="h-4 w-4" />Refill</Link></Button>
            <Button asChild variant="outline" size="sm" className="gap-2"><Link to="/transfer"><ArrowRightLeft className="h-4 w-4" />Transfer</Link></Button>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <div className="space-y-4 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border/50">
                    <item.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0"><div className="text-sm text-muted-foreground">{item.label}</div>{item.href ? (<a href={item.href} className="font-medium text-foreground hover:text-primary transition-colors">{item.value}</a>) : (<div className="font-medium text-foreground">{item.value}</div>)}</div>
                    {item.copyable && (<button onClick={() => copyToClipboard(item.value, index)} className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label={`Copy ${item.label}`}>{copiedIndex === index ? (<Check className="h-4 w-4 text-accent" />) : (<Copy className="h-4 w-4 text-muted-foreground" />)}</button>)}
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Hours</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-primary flex-shrink-0" /><span className="font-medium text-foreground">Monday – Friday:</span><span className="text-muted-foreground">9:00 AM – 5:00 PM</span></div>
                <div className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-primary flex-shrink-0" /><span className="font-medium text-foreground">Saturday & Sunday:</span><span className="text-muted-foreground">By Appointment</span></div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-soft-lg">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.8892558788584!2d-113.4688693!3d53.4683889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0193c8b5a8e1f%3A0x1b5f3b6b5f3f5f3f!2s7004%2098%20Ave%20NW%2C%20Edmonton%2C%20AB%20T6A%200A5!5e0!3m2!1sen!2sca!4v1234567890" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Village IDA Pharmacy Location" />
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">Send us a message</h3>
                {submitted ? (<div className="text-center py-8"><Check className="h-12 w-12 text-accent mx-auto mb-4" /><p className="text-foreground font-medium">Message sent!</p><p className="text-sm text-muted-foreground">We'll get back to you soon.</p></div>) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div><Label htmlFor="name">Name</Label><Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required className="mt-1" /></div>
                    <div><Label htmlFor="phone">Phone</Label><Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} required className="mt-1" /></div>
                    <div><Label htmlFor="message">Message</Label><Textarea id="message" value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} required rows={4} className="mt-1" /></div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="h-16 md:hidden" />
    </Layout>
  );
}
