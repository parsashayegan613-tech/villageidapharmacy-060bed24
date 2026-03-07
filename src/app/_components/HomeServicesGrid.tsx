"use client";

import { ServiceCard } from "@/components/ServiceCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
    Truck, Package, ClipboardCheck, HeartPulse, Cigarette, Syringe,
    FlaskConical, Home as HomeIcon,
} from "lucide-react";

const services = [
    { icon: Truck, title: "Delivery", description: "Free prescription delivery to your door.", whoItsFor: "Anyone in Edmonton who prefers home delivery.", howItWorks: "Request delivery when you refill — we'll call to confirm.", href: "/delivery" },
    { icon: Package, title: "Blister Packaging", description: "Medications organized by day and time.", whoItsFor: "Patients managing multiple medications daily.", howItWorks: "We pre-sort your medications into easy weekly packs.", href: "/blister-packaging" },
    { icon: ClipboardCheck, title: "Medication Reviews", description: "One-on-one review of your medications.", whoItsFor: "Anyone wanting to understand their medications better.", howItWorks: "Book a private session with our pharmacist." },
    { icon: HeartPulse, title: "Diabetes Support", description: "Personalized diabetes management help.", whoItsFor: "Patients managing Type 1 or Type 2 diabetes.", howItWorks: "We review your medications, devices, and lifestyle." },
    { icon: Cigarette, title: "Smoking Cessation", description: "Support to help you quit smoking.", whoItsFor: "Anyone ready to quit or thinking about it.", howItWorks: "Meet with our pharmacist to build a quit plan." },
    { icon: Syringe, title: "Injection Services", description: "Flu shots, vaccines, and more.", whoItsFor: "Adults seeking immunizations or injections.", howItWorks: "Walk in or book an appointment." },
    { icon: FlaskConical, title: "Compounding", description: "Custom medications made for you.", whoItsFor: "Patients who need specialized formulations.", howItWorks: "We create medications tailored to your needs.", href: "/compounding" },
    { icon: HomeIcon, title: "Home Health Care", description: "Medical supplies and equipment.", whoItsFor: "Patients needing home care products.", howItWorks: "Browse our selection or ask our team." },
];

export function HomeServicesGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, i) => (
                <ScrollReveal key={service.title} delay={i * 0.06}>
                    <ServiceCard {...service} />
                </ScrollReveal>
            ))}
        </div>
    );
}
