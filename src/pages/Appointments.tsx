import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Syringe, ClipboardCheck, HeartPulse, Cigarette, FlaskConical, HelpCircle, CheckCircle, Phone, Home, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const appointmentTypes = [
  { id: "injection", label: "Injection Request", icon: Syringe },
  { id: "medication-review", label: "Medication Review", icon: ClipboardCheck },
  { id: "diabetes", label: "Diabetes Support", icon: HeartPulse },
  { id: "smoking", label: "Smoking Cessation", icon: Cigarette },
  { id: "compounding", label: "Compounding Consult", icon: FlaskConical },
  { id: "other", label: "Other", icon: HelpCircle },
];

const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeOptions = ["Morning (9-12)", "Afternoon (12-3)", "Late Afternoon (3-5)"];

export default function Appointments() {
  const [searchParams] = useSearchParams();
  const preselectedType = searchParams.get("type") || "";
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState(preselectedType);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactMethod: "call",
    preferredDay: "",
    preferredTime: "",
    notes: ""
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("appointments").insert([
        {
          client_name: formData.name,
          client_email: formData.email,
          client_phone: formData.phone,
          appointment_date: formData.preferredDay || "Any day",
          appointment_time: formData.preferredTime || "Any time",
          service_type: selectedType,
          notes: formData.notes,
          status: "pending",
          user_id: user?.id || null
        }
      ]);

      if (error) throw error;

      setSubmitted(true);
      toast.success("Appointment request sent successfully!");
    } catch (error: any) {
      console.error("Error submitting appointment:", error.message);
      toast.error("Failed to send request. Please try again or call us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h1 className="text-3xl font-serif text-foreground mb-4">Request received</h1>
              <p className="text-muted-foreground text-lg mb-8">We'll contact you within 1 business day to confirm your appointment.</p>

              <div className="bg-card border border-border/60 rounded-2xl p-6 text-left mb-8 max-w-sm mx-auto shadow-soft">
                <h3 className="font-semibold text-foreground mb-4 border-b border-border pb-2">Request Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Name:</span><span className="font-medium">{formData.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Service:</span><span className="font-medium capitalize">{selectedType.replace("-", " ")}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Preferred Day:</span><span className="font-medium">{formData.preferredDay || "Any day"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Preferred Time:</span><span className="font-medium">{formData.preferredTime || "Any time"}</span></div>
                </div>
              </div>

              <div className="bg-muted rounded-2xl p-6 mb-8">
                <h3 className="font-serif text-foreground mb-2">Need something urgent?</h3>
                <p className="text-sm text-muted-foreground mb-4">Call us directly and we'll do our best to fit you in.</p>
                <Button asChild className="rounded-full gap-2"><a href="tel:780-440-4555"><Phone className="h-4 w-4" />780-440-4555</a></Button>
              </div>
              <Button asChild variant="outline" size="lg" className="rounded-full gap-2"><Link to="/"><Home className="h-4 w-4" />Back to Home</Link></Button>
            </div>
          </div>
        </section>
        <div className="h-16 md:hidden" />
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead title="Request Appointment | Village IDA Pharmacy" description="Book a pharmacy appointment for injections, medication reviews, diabetes support, smoking cessation, or compounding consultations." />

      <section className="py-16 md:py-20 bg-secondary relative overflow-hidden noise">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-3">Appointments</p>
            <h1 className="text-display-sm font-serif text-foreground mb-4">Request an Appointment</h1>
            <p className="text-muted-foreground text-lg">Select the type of appointment you need, and we'll be in touch to confirm a time.</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg font-serif text-foreground mb-5">What do you need?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
              {appointmentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all focus-ring",
                    selectedType === type.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/30"
                  )}
                >
                  <type.icon className={cn("h-5 w-5 mb-2", selectedType === type.id ? "text-primary" : "text-muted-foreground")} />
                  <span className={cn("text-sm font-medium", selectedType === type.id ? "text-primary" : "text-foreground")}>{type.label}</span>
                </button>
              ))}
            </div>

            {selectedType && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                <div><Label htmlFor="name">Your Full Name *</Label><Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required className="mt-2" /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label htmlFor="email">Email Address *</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required className="mt-2" /></div>
                  <div><Label htmlFor="phone">Phone Number *</Label><Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} required className="mt-2" /></div>
                </div>
                <div><Label>Preferred Contact Method</Label><RadioGroup value={formData.contactMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, contactMethod: value }))} className="mt-2 flex gap-4"><div className="flex items-center space-x-2"><RadioGroupItem value="call" id="call" /><Label htmlFor="call" className="font-normal">Call</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="text" id="text" /><Label htmlFor="text" className="font-normal">Text</Label></div></RadioGroup></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Preferred Day</Label><select value={formData.preferredDay} onChange={(e) => setFormData(prev => ({ ...prev, preferredDay: e.target.value }))} className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">Any day</option>{dayOptions.map(day => (<option key={day} value={day}>{day}</option>))}</select></div>
                  <div><Label>Preferred Time</Label><select value={formData.preferredTime} onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))} className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">Any time</option>{timeOptions.map(time => (<option key={time} value={time}>{time}</option>))}</select></div>
                </div>
                <div><Label htmlFor="notes">Additional Notes</Label><p className="text-sm text-muted-foreground mt-1 mb-2">Please do not include medical details here. We will discuss in person.</p><Textarea id="notes" value={formData.notes} onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))} rows={3} /></div>
                <Button type="submit" disabled={isSubmitting} className="w-full rounded-full gap-2" size="lg">
                  {isSubmitting ? "Submitting..." : "Submit Request"} <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
      <div className="h-16 md:hidden" />
    </Layout>
  );
}
