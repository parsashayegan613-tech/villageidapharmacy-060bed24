import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { toast } from "sonner";
import { Clock, Truck, CheckCircle, Phone, Info } from "lucide-react";

export default function Refill() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    prescriptionNumbers: "",
    pickupMethod: "pickup",
    deliveryAddress: "",
    notes: "",
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

    toast.success("Refill request submitted!", {
      description: "We'll contact you when your prescription is ready.",
    });

    setIsSubmitting(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      prescriptionNumbers: "",
      pickupMethod: "pickup",
      deliveryAddress: "",
      notes: "",
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Prescription Refill
            </h1>
            <p className="text-lg text-muted-foreground">
              Request your prescription refill online. We'll prepare it and notify you when it's ready for pickup or delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
              <Clock className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Quick Turnaround</h3>
                <p className="text-sm text-muted-foreground">Most refills ready same day</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
              <Truck className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Free Delivery</h3>
                <p className="text-sm text-muted-foreground">Local delivery available</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
              <CheckCircle className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">We'll Notify You</h3>
                <p className="text-sm text-muted-foreground">Get a call when it's ready</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refill Form */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Refill Request Form</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll process your refill request.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
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
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                          <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Prescription Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Prescription Information</h3>
                      <div className="space-y-2">
                        <Label htmlFor="prescriptionNumbers">Prescription Number(s) *</Label>
                        <Textarea
                          id="prescriptionNumbers"
                          name="prescriptionNumbers"
                          placeholder="Enter one prescription number per line, or describe the medications you need refilled"
                          value={formData.prescriptionNumbers}
                          onChange={handleInputChange}
                          rows={4}
                          required
                        />
                        <p className="text-sm text-muted-foreground">
                          You can find your prescription number on your medication label.
                        </p>
                      </div>
                    </div>

                    {/* Pickup Method */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Pickup Method</h3>
                      <RadioGroup
                        value={formData.pickupMethod}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, pickupMethod: value }))
                        }
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-secondary transition-colors">
                          <RadioGroupItem value="pickup" id="pickup" />
                          <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                            <span className="font-medium">In-Store Pickup</span>
                            <p className="text-sm text-muted-foreground">
                              Pick up at 7004 98 Ave NW, Edmonton
                            </p>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-secondary transition-colors">
                          <RadioGroupItem value="delivery" id="delivery" />
                          <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                            <span className="font-medium">Delivery</span>
                            <p className="text-sm text-muted-foreground">
                              Free local delivery to your address
                            </p>
                          </Label>
                        </div>
                      </RadioGroup>

                      {formData.pickupMethod === "delivery" && (
                        <div className="mt-4 space-y-2">
                          <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                          <Textarea
                            id="deliveryAddress"
                            name="deliveryAddress"
                            placeholder="Enter your complete delivery address"
                            value={formData.deliveryAddress}
                            onChange={handleInputChange}
                            rows={2}
                            required={formData.pickupMethod === "delivery"}
                          />
                        </div>
                      )}
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Additional Notes</h3>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          placeholder="Any special instructions or questions?"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={3}
                        />
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Refill Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-secondary border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    If you have questions about your prescription or need immediate assistance, please call us directly.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="tel:780-440-4555">
                      <Phone className="h-4 w-4 mr-2" />
                      Call (780) 440-4555
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What to Expect</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                        1
                      </span>
                      <div>
                        <p className="font-medium text-foreground">Submit Request</p>
                        <p className="text-sm text-muted-foreground">Fill out the form with your details</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                        2
                      </span>
                      <div>
                        <p className="font-medium text-foreground">We Process</p>
                        <p className="text-sm text-muted-foreground">Our team prepares your prescription</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                        3
                      </span>
                      <div>
                        <p className="font-medium text-foreground">You're Notified</p>
                        <p className="text-sm text-muted-foreground">We call when it's ready</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                        4
                      </span>
                      <div>
                        <p className="font-medium text-foreground">Pickup or Delivery</p>
                        <p className="text-sm text-muted-foreground">Get your medications your way</p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hours of Operation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
