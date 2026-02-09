import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Syringe,
  ClipboardCheck,
  HeartPulse,
  Cigarette,
  FlaskConical,
  HelpCircle,
  CheckCircle,
  Phone,
  Home,
} from "lucide-react";
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

  const [submitted, setSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState(preselectedType);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    contactMethod: "call",
    preferredDay: "",
    preferredTime: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                Request received
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                We'll contact you within 1 business day to confirm your appointment.
              </p>
              
              <div className="bg-muted rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-2">Need something urgent?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Call us directly and we'll do our best to fit you in.
                </p>
                <Button asChild>
                  <a href="tel:780-440-4555">
                    <Phone className="h-4 w-4 mr-2" />
                    780-440-4555
                  </a>
                </Button>
              </div>

              <Button asChild variant="outline" size="lg">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
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
      {/* Hero */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Request an Appointment
            </h1>
            <p className="text-muted-foreground text-lg">
              Select the type of appointment you need, and we'll be in touch to confirm a time.
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Types */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-foreground mb-4">What do you need?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {appointmentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all focus-ring",
                    selectedType === type.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <type.icon className={cn(
                    "h-6 w-6 mb-2",
                    selectedType === type.id ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "text-sm font-medium",
                    selectedType === type.id ? "text-primary" : "text-foreground"
                  )}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Form */}
            {selectedType && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
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
                  <Label htmlFor="phone">Phone Number *</Label>
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
                  <Label>Preferred Contact Method</Label>
                  <RadioGroup
                    value={formData.contactMethod}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, contactMethod: value }))}
                    className="mt-2 flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="call" id="call" />
                      <Label htmlFor="call" className="font-normal">Call</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="text" id="text" />
                      <Label htmlFor="text" className="font-normal">Text</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Preferred Day</Label>
                    <select
                      value={formData.preferredDay}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredDay: e.target.value }))}
                      className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Any day</option>
                      {dayOptions.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Preferred Time</Label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                      className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Any time</option>
                      {timeOptions.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <p className="text-sm text-muted-foreground mt-1 mb-2">
                    Please do not include medical details here. We will discuss in person.
                  </p>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Submit Request
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Spacer for mobile dock */}
      <div className="h-16 md:hidden" />
    </Layout>
  );
}
