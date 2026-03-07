import { MapPin, Phone, Clock, ExternalLink, Star } from "lucide-react";
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
          src="https://maps.google.com/maps?q=Village+IDA+Pharmacy+7004+98+Ave+Edmonton+AB&t=&z=14&ie=UTF8&iwloc=&output=embed"
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

        <div className="flex items-center gap-3 bg-secondary rounded-xl p-3 border border-border mt-4 mb-2">
          <img src="/staff_anoosh.png" alt="Pharmacist Anoosh" className="w-12 h-12 rounded-full border border-border/50 object-cover" />
          <div>
            <div className="flex items-center gap-0.5 text-amber-400 mb-0.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold text-foreground ml-1">4.9/5</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">Read our Google Reviews</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button asChild className="flex-1 gap-2 shadow-lift">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Open in Maps
            </a>
          </Button>
          <Button asChild variant="outline" className="flex-1 gap-2">
            <a href={`tel:${phone}`}>
              <Phone className="h-4 w-4" />
              Call Pharmacy
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
