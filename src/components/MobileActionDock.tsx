import { Link } from "react-router-dom";
import { Phone, MapPin, RefreshCw, ArrowRightLeft } from "lucide-react";

const actions = [
  { icon: Phone, label: "Call", href: "tel:780-440-4555", external: true },
  { icon: MapPin, label: "Directions", href: "https://maps.google.com/?q=7004+98+Ave+NW+Edmonton+AB+T6A+0A5", external: true },
  { icon: RefreshCw, label: "Refill", href: "/refill", external: false },
  { icon: ArrowRightLeft, label: "Transfer", href: "/transfer", external: false },
];

export function MobileActionDock() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-card border-t border-border shadow-soft-lg z-50 safe-area-pb">
      <div className="grid grid-cols-4 divide-x divide-border">
        {actions.map((action) =>
          action.external ? (
            <a
              key={action.label}
              href={action.href}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center justify-center py-3 text-muted-foreground hover:text-primary hover:bg-muted transition-colors focus-ring"
            >
              <action.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{action.label}</span>
            </a>
          ) : (
            <Link
              key={action.label}
              to={action.href}
              className="flex flex-col items-center justify-center py-3 text-muted-foreground hover:text-primary hover:bg-muted transition-colors focus-ring"
            >
              <action.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{action.label}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
