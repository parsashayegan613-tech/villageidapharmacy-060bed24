import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { ClipboardCheck, Home, MapPin, PackageCheck, PhoneCall, Truck } from "lucide-react";

export const metadata: Metadata = {
    title: "Free Prescription Delivery in Edmonton | Village IDA Pharmacy",
    description: "Get your medications delivered directly to your door anywhere in Edmonton. Fast, free, and reliable prescription delivery from Village IDA Pharmacy.",
    alternates: {
        canonical: "https://www.villageidapharmacy.com/delivery"
    }
};

export default function DeliveryPage() {
    return (
        <ServiceDetailPage
            eyebrow="Free delivery"
            title="Prescription delivery across Edmonton."
            description="Request delivery with your refill or transfer and our team will confirm the details before your medication leaves the pharmacy."
            icon={Truck}
            image={{ src: "/delivery-service.jpg", alt: "Prescription delivery service from Village IDA Pharmacy" }}
            primaryAction={{ label: "Request Refill with Delivery", href: "/refill" }}
            secondaryAction={{ label: "Call Pharmacy", href: "tel:780-440-4555", external: true }}
            reassurance="Delivery keeps pharmacy care simple when getting to the store is inconvenient. We confirm each order before delivery so patients know what to expect."
            benefits={[
                { icon: MapPin, title: "City-wide service", description: "Available across Edmonton city limits for eligible prescription orders." },
                { icon: PackageCheck, title: "Reviewed before it leaves", description: "Our pharmacists check the order and confirm details before delivery." },
                { icon: Home, title: "Convenient for daily life", description: "Helpful for caregivers, busy families, recovery periods, and ongoing medications." },
            ]}
            steps={[
                { icon: ClipboardCheck, title: "Request refill or transfer", description: "Submit your request online or call the pharmacy and choose delivery." },
                { icon: PhoneCall, title: "We confirm the order", description: "Our team reviews the medication request and follows up if anything needs clarification." },
                { icon: Truck, title: "Delivery is arranged", description: "Your medication is packed securely and delivered to your Edmonton address." },
            ]}
            fitTitle="Delivery is a good fit when..."
            fitDescription="It helps patients stay on schedule without adding another trip to the day."
            fitItems={[
                "You manage ongoing or repeat prescriptions",
                "You are caring for someone at home",
                "You are recovering, busy, or unable to visit in person",
                "You prefer a call before pickup or delivery details are finalized",
            ]}
            ctaHeadline="Need delivery with your next refill?"
        />
    );
}
