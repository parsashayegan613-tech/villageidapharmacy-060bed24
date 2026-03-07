import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Pharmacy Services | Village IDA Pharmacy Edmonton",
  description: "Explore our full range of pharmacy services including free delivery, blister packaging, medication reviews, injections, compounding, and more.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
