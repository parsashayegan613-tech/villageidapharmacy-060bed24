import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent!", {
      description: "We'll get back to you as soon as possible.",
    });

    setIsSubmitting(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-lg opacity-90">
              Please feel free to contact us for more information. Have a question or need assistance? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="bg-accent text-accent-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a href="tel:780-440-4555" className="flex items-center gap-3 text-lg font-bold hover:opacity-80 transition-opacity">
              <Phone className="h-6 w-6" />
              <span>780.440.4555</span>
            </a>
            <a href="mailto:villida@telus.net" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Mail className="h-6 w-6" />
              <span>villida@telus.net</span>
            </a>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6" />
              <span>7004 98 Ave NW, Edmonton, AB</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="border-0 shadow-warm overflow-hidden">
                <div className="h-2 bg-primary" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Phone & Fax
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <a
                      href="tel:780-440-4555"
                      className="text-2xl font-bold text-accent hover:opacity-80 transition-opacity"
                    >
                      780.440.4555
                    </a>
                    <p className="text-sm text-muted-foreground">Main Line</p>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-foreground">780.440.1931</p>
                    <p className="text-sm text-muted-foreground">Fax</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-warm overflow-hidden">
                <div className="h-2 bg-primary" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:villida@telus.net"
                    className="text-lg font-medium text-primary hover:underline transition-colors"
                  >
                    villida@telus.net
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    We typically respond within 24 hours
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-warm overflow-hidden">
                <div className="h-2 bg-success" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-success" />
                    Hours of Operation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-semibold text-success">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium">By Appointment</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium">By Appointment</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-warm overflow-hidden bg-ida-cream">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    What We Offer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Free Prescription Delivery",
                      "Medication Reviews",
                      "Compounding Services",
                      "Flu Shots & Vaccines",
                      "Diabetes Education",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-success" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-warm-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="h-12"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        required
                      />
                    </div>
                    <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map - Fixed coordinates for 7004 98 Ave NW, Edmonton */}
              <Card className="border-0 shadow-warm-lg overflow-hidden">
                <CardHeader className="pb-0">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Find Us
                  </CardTitle>
                  <CardDescription>
                    7004 98 Ave NW, Edmonton, AB T6B 0K7
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.8693547834244!2d-113.4178489!3d53.5256891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0221c8fe5f5a9%3A0x6e5c9f0f8e5a0b3d!2s7004%2098%20Ave%20NW%2C%20Edmonton%2C%20AB%20T6B%200K7!5e0!3m2!1sen!2sca!4v1707000000000!5m2!1sen!2sca"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Village IDA Pharmacy Location - 7004 98 Ave NW, Edmonton"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=7004+98+Ave+NW+Edmonton+AB+T6B+0K7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 ida-gradient-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            For urgent prescription needs or immediate questions, give us a call. Our pharmacists are ready to help.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
            <a href="tel:780-440-4555">
              <Phone className="h-5 w-5 mr-2" />
              Call 780.440.4555
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}