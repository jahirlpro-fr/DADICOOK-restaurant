import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import Image from "next/image";
import { menuService } from "@/services/menuService";
import { Utensils } from "lucide-react";

interface MenuItem {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  allergens: string[] | null;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
  menu_items: MenuItem[];
}

export default function Menu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const data = await menuService.getCategoriesWithItems("published");
      setCategories(data as any);
    } catch (error) {
      console.error("Error loading menu:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <SEO 
          title="Menu - DADICOOK"
          description="Découvrez notre carte : entrées, plats, desserts et boissons. Une cuisine du monde raffinée et authentique."
        />
        <div className="min-h-screen bg-background">
          <Header />
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Utensils className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground">Chargement du menu...</p>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Menu - DADICOOK"
        description="Découvrez notre carte : entrées, plats, desserts et boissons. Une cuisine du monde raffinée et authentique."
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section - Elegant Header */}
          <section className="relative py-24 bg-primary">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-accent/80 uppercase tracking-[0.2em] text-sm mb-6 font-light">
                  Découvrez nos créations
                </p>
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-accent mb-6">
                  Notre Menu
                </h1>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-accent/30 w-24"></div>
                  <div className="w-2 h-2 bg-accent rotate-45"></div>
                  <div className="h-px bg-accent/30 w-24"></div>
                </div>
                <p className="text-lg md:text-xl text-accent/90 leading-relaxed max-w-2xl mx-auto">
                  Une sélection de plats inspirés des quatre coins du monde,
                  préparés avec passion et des produits de qualité.
                </p>
              </div>
            </div>
          </section>

          {/* Menu Categories */}
          <section className="py-24">
            <div className="container mx-auto px-4 max-w-6xl">
              {categories.map((category, categoryIndex) => (
                <div key={category.id} className={categoryIndex > 0 ? "mt-24" : ""}>
                  {/* Category Title with Underline Animation */}
                  <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4 inline-block relative">
                      {category.name}
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary/20"></span>
                    </h2>
                    {category.description && (
                      <p className="text-muted-foreground mt-4 text-lg">{category.description}</p>
                    )}
                  </div>

                  {/* Menu Items Grid */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {category.menu_items.map((item) => (
                      <div 
                        key={item.id}
                        className="group"
                      >
                        {/* Image */}
                        {item.image_url && (
                          <div className="relative h-64 mb-6 overflow-hidden">
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-start gap-4">
                            <h3 className="font-serif text-2xl text-primary group-hover:text-primary/80 transition-colors">
                              {item.title}
                            </h3>
                            <span className="font-serif text-2xl text-primary whitespace-nowrap">
                              {item.price.toFixed(2)}€
                            </span>
                          </div>

                          {item.description && (
                            <p className="text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          )}

                          {item.allergens && Array.isArray(item.allergens) && item.allergens.length > 0 && (
                            <p className="text-xs text-muted-foreground/70 italic">
                              Allergènes : {item.allergens.join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reservation CTA */}
          <section className="py-24 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-serif text-4xl md:text-5xl text-accent mb-6">
                Réservez votre Table
              </h2>
              <p className="text-accent/90 text-lg mb-8 max-w-2xl mx-auto">
                Laissez-vous tenter par notre cuisine du monde et réservez dès maintenant
                pour une expérience culinaire inoubliable.
              </p>
              <a
                href="https://www.thefork.fr/restaurant/dadicook-r815372"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-primary px-8 py-4 font-semibold hover:bg-accent/90 transition-all duration-300 text-lg"
              >
                Réserver maintenant
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}