import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { CalendarCheck, ClipboardList, HeartPulse, Package, PackageCheck, PhoneCall, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
    title: "Blister Packaging Pharmacy in Edmonton | Village IDA",
    description: "Simplify your medication routine with custom blister packaging in Edmonton. We organize your pills by day and time to ensure you never miss a dose.",
    alternates: {
        canonical: "https://www.villageidapharmacy.com/blister-packaging"
    }
};

export default function BlisterPackagingPage() {
    return (
        <ServiceDetailPage
            eyebrow="Blister packaging"
            title="Medications organized by day and time."
            description="We prepare easy-to-follow blister packs so patients and caregivers can see what to take, when to take it, and what has already been taken."
            icon={Package}
            image={{ src: "/_DSC3877.jpg", alt: "Pharmacist preparing organized medication packaging" }}
            primaryAction={{ label: "Ask About Packaging", href: "/contact" }}
            secondaryAction={{ label: "Call for Details", href: "tel:780-440-4555", external: true }}
            reassurance="Blister packaging reduces guesswork for people managing multiple medications and gives caregivers a simpler way to support a daily routine."
            benefits={[
                { icon: ShieldCheck, title: "Clear dose timing", description: "Medication is grouped by scheduled day and time to reduce confusion." },
                { icon: HeartPulse, title: "Supports adherence", description: "A visible pack makes it easier to follow the routine your prescriber intended." },
                { icon: PackageCheck, title: "Refill coordination", description: "Our team helps align refill timing so packaging stays consistent." },
            ]}
            steps={[
                { icon: PhoneCall, title: "Tell us about the routine", description: "We review current medications, timing, and any practical concerns." },
                { icon: ClipboardList, title: "We organize the schedule", description: "Our pharmacists prepare a packaging plan and confirm details." },
                { icon: CalendarCheck, title: "Pickup or delivery continues", description: "Your packaged medication is prepared on a recurring schedule." },
            ]}
            fitTitle="Packaging is a good fit when..."
            fitDescription="It is especially helpful when medication routines are becoming hard to track."
            fitItems={[
                "A patient takes several medications each day",
                "A caregiver wants a clearer way to monitor doses",
                "Medication timing is easy to forget or mix up",
                "You want refills and packaging coordinated together",
            ]}
            ctaHeadline="Want an easier medication routine?"
        />
    );
}
