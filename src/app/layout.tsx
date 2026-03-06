import { ReactNode } from "react";
import Providers from "./providers";
import "@/index.css";

export const metadata = {
    title: "Village IDA Pharmacy | Edmonton Prescription & Health Services",
    description: "Your local Edmonton pharmacy for refills, transfers, compounding, and personalized care. Free delivery available. Call 780-440-4555.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="antialiased">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
