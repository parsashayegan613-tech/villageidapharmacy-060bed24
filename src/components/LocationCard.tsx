import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LocationCardProps {
  className?: string;
}

export function LocationCard({ className }: LocationCardProps) {
  const address = "7004 98 Ave, Edmonton, AB T6A 0A5";
  const phone = "780-440-4555";
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;

  return (
    <div className={cn("bg-card rounded-2xl shadow-soft-lg overflow-hidden border border-border/50", className)}>
      {/* Map */}
      <div className="aspect-video w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.8892558788584!2d-113.4688693!3d53.4683889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0193c8b5a8e1f%3A0x1b5f3b6b5f3f5f3f!2s7004%2098%20Ave%20NW%2C%20Edmonton%2C%20AB%20T6A%200A5!5e0!3m2!1sen!2sca!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Village IDA Pharmacy Location"
          className="w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-foreground font-medium">{address}</p>
              <p className="text-sm text-muted-foreground">Free parking available</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-foreground font-medium">Monday – Friday: 9 AM – 5 PM</p>
              <p className="text-sm text-muted-foreground">Saturday & Sunday: By Appointment</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button asChild className="flex-1 gap-2">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Open in Maps
            </a>
          </Button>
          <Button asChild variant="outline" className="flex-1 gap-2">
            <a href={`tel:${phone}`}>
              <Phone className="h-4 w-4" />
              Call
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
