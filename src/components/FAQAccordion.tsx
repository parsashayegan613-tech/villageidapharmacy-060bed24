import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className={cn("w-full", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border border-border/50 rounded-xl mb-3 bg-card shadow-soft overflow-hidden data-[state=open]:shadow-soft-lg transition-shadow"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors text-left [&[data-state=open]]:bg-muted/30">
            <span className="font-medium text-foreground pr-4">{item.question}</span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
