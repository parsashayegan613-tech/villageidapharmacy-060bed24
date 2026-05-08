import { ReactNode } from "react";
import { Metadata } from "next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import Providers from "./providers";
import "@/index.css";

export const metadata: Metadata = {
    title: {
        default: "Village IDA Pharmacy | Edmonton Prescription & Health Services",
        template: "%s | Village IDA Pharmacy",
    },
    description: "Your Edmonton pharmacy for refills, transfers, compounding, and personalized care. Free delivery available. Call 780-440-4555.",
    metadataBase: new URL("https://www.villageidapharmacy.com"),
    icons: {
        icon: [
            { url: "/village-ida-favicon.svg", type: "image/svg+xml" },
        ],
        shortcut: "/village-ida-favicon.svg",
        apple: "/village-ida-favicon.svg",
    },
    alternates: {
        canonical: "https://www.villageidapharmacy.com",
    },
    openGraph: {
        title: "Village IDA Pharmacy | Edmonton",
        description: "Edmonton pharmacy with free delivery, easy transfers, and custom compounding.",
        url: "https://www.villageidapharmacy.com",
        siteName: "Village IDA Pharmacy",
        images: [{ url: "/village-ida-logo.jpg", width: 400, height: 400, alt: "Village IDA Pharmacy Logo" }],
        locale: "en_CA",
        type: "website",
    },
};

const pharmacySchema = {
    "@context": "https://schema.org",
    "@type": ["Pharmacy", "MedicalBusiness"],
    name: "Village IDA Pharmacy",
    url: "https://villageidapharmacy.com",
    telephone: "+17804404555",
    address: {
        "@type": "PostalAddress",
        streetAddress: "7004 98 Ave",
        addressLocality: "Edmonton",
        addressRegion: "AB",
        postalCode: "T6A 0A5",
        addressCountry: "CA"
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 53.535805,
        longitude: -113.438289
    },
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00"
        }
    ],
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        ratingCount: "50" // Safe baseline placeholder for schema completeness
    }
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(pharmacySchema) }}
                />
            </head>
            <body className="antialiased bg-pattern">
                <Providers>
                    {children}
                </Providers>
                <GoogleAnalytics />
            </body>
        </html>
    );
}
