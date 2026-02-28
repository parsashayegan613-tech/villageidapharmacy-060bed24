import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Home, Search, Phone, RefreshCw, ArrowRightLeft, Calendar } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <SEOHead title="Page Not Found | Village IDA Pharmacy" description="The page you're looking for doesn't exist." />

      <section className="py-20 md:py-28 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-primary/60" />
          </div>
          <h1 className="text-6xl font-serif font-bold text-foreground mb-3">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            We couldn't find that page. It may have moved or doesn't exist.
          </p>

          <Button asChild size="lg" className="rounded-full px-8 gap-2 mb-10">
            <Link to="/"><Home className="h-4 w-4" /> Go Home</Link>
          </Button>

          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground mb-4">Looking for one of these?</p>
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline" className="rounded-xl h-auto py-3 flex flex-col gap-1">
                <Link to="/refill">
                  <RefreshCw className="h-4 w-4 text-primary" />
                  <span className="text-xs">Refill Request</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl h-auto py-3 flex flex-col gap-1">
                <Link to="/transfer">
                  <ArrowRightLeft className="h-4 w-4 text-primary" />
                  <span className="text-xs">Transfer Rx</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl h-auto py-3 flex flex-col gap-1">
                <Link to="/appointments">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-xs">Appointments</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl h-auto py-3 flex flex-col gap-1">
                <Link to="/contact">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-xs">Contact Us</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
