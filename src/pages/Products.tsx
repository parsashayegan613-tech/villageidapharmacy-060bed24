import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Leaf, Heart, Pill, Baby, ShieldPlus } from "lucide-react";

const featuredProducts = [
  {
    name: "Riversol Skin Care",
    category: "Dermatology",
    description: "Premium Canadian skincare line formulated by dermatologists. Gentle, effective products for sensitive and aging skin.",
    features: ["Clinically proven", "Dermatologist developed", "Made in Canada", "Paraben-free"],
  },
];

const productCategories = [
  {
    icon: Sparkles,
    name: "Skin Care",
    description: "Premium skincare products including Riversol, sunscreens, and dermatologist-recommended solutions.",
    items: ["Facial cleansers", "Moisturizers", "Sunscreens", "Anti-aging creams", "Acne treatments"],
  },
  {
    icon: Leaf,
    name: "Vitamins & Supplements",
    description: "High-quality vitamins, minerals, and natural supplements for optimal health.",
    items: ["Multivitamins", "Vitamin D", "Omega-3 fatty acids", "Probiotics", "Herbal supplements"],
  },
  {
    icon: Heart,
    name: "Heart Health",
    description: "Products to support cardiovascular wellness and healthy blood pressure.",
    items: ["Blood pressure monitors", "CoQ10 supplements", "Fish oil", "Low-sodium products"],
  },
  {
    icon: Pill,
    name: "Pain Relief",
    description: "Over-the-counter pain relief options for various conditions.",
    items: ["Acetaminophen", "Ibuprofen", "Topical creams", "Hot/cold therapy", "Joint support"],
  },
  {
    icon: Baby,
    name: "Baby & Kids",
    description: "Safe and gentle products for infants, children, and new parents.",
    items: ["Baby formula", "Diapers", "Baby skin care", "Children's vitamins", "First aid"],
  },
  {
    icon: ShieldPlus,
    name: "First Aid & Medical",
    description: "Essential first aid supplies and home medical equipment.",
    items: ["Bandages", "Thermometers", "Blood glucose monitors", "Mobility aids", "Braces & supports"],
  },
];

export default function Products() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-ida-cream py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Product Spotlight
            </h1>
            <p className="text-lg text-muted-foreground">
              Quality health and wellness products carefully selected by our pharmacists. From premium skincare to essential vitamins, we carry what you need for your health.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Product - Riversol */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Product
            </h2>
          </div>
          {featuredProducts.map((product) => (
            <Card key={product.name} className="max-w-4xl mx-auto overflow-hidden border-0 shadow-warm-lg">
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-to-br from-primary/10 to-success/10 p-8 md:p-12 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-16 w-16 text-primary" />
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="text-sm text-accent font-medium mb-2">{product.category}</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{product.name}</h3>
                  <p className="text-muted-foreground mb-6">{product.description}</p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link to="/contact">Ask About This Product</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Product Categories
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse our selection of health and wellness products
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((category) => (
              <Card key={category.name} className="bg-white border-0 shadow-warm">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <category.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.description}
                  </p>
                  <ul className="space-y-1">
                    {category.items.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-success" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Orders */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're happy to special order products for you. Whether it's a specific brand, a hard-to-find item, or a product you've seen elsewhere, just ask and we'll do our best to get it for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/contact">Request a Product</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <a href="tel:780-440-4555">Call 780.440.4555</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 ida-gradient-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Visit Our Pharmacy
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Come see our full selection of products in store. Our knowledgeable staff can help you find exactly what you need.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to="/contact">Get Directions</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}