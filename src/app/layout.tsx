import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionDock } from "@/components/MobileActionDock";
import Providers from "./providers";
import "@/index.css";

export const metadata = {
    title: "Village IDA Pharmacy | Edmonton Prescription & Health Services",
    description: "Your local Edmonton pharmacy for refills, transfers, compounding, and personalized care. Free delivery available. Call 780-440-4555.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen flex flex-col bg-background">
                <Providers>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <MobileActionDock />
                </Providers>
            </body>
        </html>
    );
}
