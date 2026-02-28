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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Syringe, ClipboardCheck, HeartPulse, Cigarette, FlaskConical, HelpCircle, CheckCircle, Phone, Home, ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const appointmentTypes = [
  { id: "injection", label: "Injection Request", icon: Syringe },
  { id: "medication-review", label: "Medication Review", icon: ClipboardCheck },
  { id: "diabetes", label: "Diabetes Support", icon: HeartPulse },
  { id: "smoking", label: "Smoking Cessation", icon: Cigarette },
  { id: "compounding", label: "Compounding Consult", icon: FlaskConical },
  { id: "other", label: "Other", icon: HelpCircle },
];

const timeSlots = [
  "9:00 AM", "9:15 AM", "9:30 AM", "9:45 AM",
  "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM",
  "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
  "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
  "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM",
  "2:00 PM", "2:15 PM", "2:30 PM", "2:45 PM",
  "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM",
  "4:00 PM", "4:15 PM", "4:30 PM", "4:45 PM",
  "5:00 PM"
];

export default function Appointments() {
  const [searchParams] = useSearchParams();
  const preselectedType = searchParams.get("type") || "";
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState(preselectedType);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactMethod: "call",
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
          appointment_date: date ? format(date, "PPP") : "Any day",
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
                  <div className="flex justify-between"><span className="text-muted-foreground">Date & Time:</span><span className="font-medium text-right">{date ? format(date, "PPP") : "Any day"} {formData.preferredTime && `at ${formData.preferredTime}`}</span></div>
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

                <div className="space-y-2">
                  <Label>Preferred Date & Time</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal h-11 bg-background border-input",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date && formData.preferredTime ? (
                          `${format(date, "PPP")} at ${formData.preferredTime}`
                        ) : date ? (
                          `${format(date, "PPP")} (Select a time)`
                        ) : (
                          <span>Pick a date & time</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 flex flex-col sm:flex-row align-start" align="start">
                      <div className="p-2">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                          className="border-none"
                        />
                      </div>
                      {date && (
                        <div className="p-3 border-t sm:border-t-0 sm:border-l border-border w-full sm:w-48 h-64 sm:h-[310px] overflow-y-auto">
                          <div className="text-sm font-medium mb-3 text-center text-foreground sticky top-0 bg-popover/95 backdrop-blur-sm z-10 py-1">Available Times</div>
                          <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                type="button"
                                variant={formData.preferredTime === time ? "default" : "outline"}
                                className={cn("w-full h-9 text-xs", formData.preferredTime === time && "bg-primary text-primary-foreground")}
                                onClick={() => setFormData(prev => ({ ...prev, preferredTime: time }))}
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>

                <div><Label htmlFor="notes">Additional Notes</Label><p className="text-sm text-muted-foreground mt-1 mb-2">Please do not include medical details here. We will discuss in person.</p><Textarea id="notes" value={formData.notes} onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))} rows={3} className="bg-background border-input" /></div>
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
