import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { menuService } from "@/services/menuService";
import { Utensils } from "lucide-react";

interface MenuItem {
  id: string;
  title: string;
  description: string | null;
  price: number;
  allergens: string[] | null;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
  menu_items: MenuItem[];
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<Record<string, any[]>>({});
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasHalalItems, setHasHalalItems] = useState(false);

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const items = await menuService.getAllMenuItems();
      const cats = await menuService.getAllCategories();
      
      const grouped = items.reduce((acc: Record<string, any[]>, item: any) => {
        const catId = item.category_id;
        if (!acc[catId]) acc[catId] = [];
        acc[catId].push(item);
        return acc;
      }, {});

      // Check if any items are halal
      const hasHalal = items.some((item: any) => item.is_halal);
      
      setMenuItems(grouped);
      setCategories(cats);
      setHasHalalItems(hasHalal);
    } catch (error) {
      console.error("Error fetching menu:", error);
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
                <p className="text-accent/80 uppercase tracking-[0.2em] text-xl mb-6 font-light">
                  SAVEURS DU MONDE
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

                  <div className="bg-background/95 backdrop-blur-sm">
                      <div className="max-w-5xl mx-auto px-6 py-12">
                          <div className="grid gap-16 md:gap-24">
                              {categories
                                  .sort((a, b) => a.display_order - b.display_order)
                                  .map((category) => {
                                      const items = menuItems[category.id] || [];
                                      if (items.length === 0) return null;

                                      return (
                                          <div key={category.id} className="space-y-8">
                                              <div className="text-center space-y-2">
                                                  <h2 className="font-serif text-4xl text-primary mb-2">
                                                      {category.name}
                                                  </h2>
                                                  {category.description && (
                                                      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                                          {category.description}
                                                      </p>
                                                  )}
                                                  <div className="w-24 h-px bg-muted-foreground/50 mx-auto mt-4" />
                                              </div>

                                              <div className="space-y-8">
                                                  {items
                                                      .sort((a, b) => a.display_order - b.display_order)
                                                      .map((item, index) => (
                                                          <div key={item.id}>
                                                              <div className="pb-6">
                                                                  <div className="flex items-start justify-between gap-6 mb-3">
                                                                      <h3 className="font-serif text-3xl text-primary flex-1">
                                                                          {item.title}
                                                                          {item.is_halal && (
                                                                              <span className="text-muted-foreground ml-1">*</span>
                                                                          )}
                                                                      </h3>
                                                                      {item.price && (
                                                                          <span className="font-serif text-3xl text-primary whitespace-nowrap">
                                                                              {item.price.toFixed(2)}€
                                                                          </span>
                                                                      )}
                                                                  </div>

                                                                  {item.description && (
                                                                      <p className="text-muted-foreground text-lg leading-relaxed mb-3">
                                                                          {item.description}
                                                                      </p>
                                                                  )}

                                                                  {item.allergens && item.allergens.length > 0 && (
                                                                      <p className="text-base text-muted-foreground/60 italic mb-4">
                                                                          Allergènes : {item.allergens.join(", ")}
                                                                      </p>
                                                                  )}
                                                              </div>

                                                              {/* Séparateur (ne s'affiche pas après le dernier plat) */}
                                                              {index < items.length - 1 && (
                                                                  <div className="flex items-center justify-center gap-4 py-6">
                                                                      <div className="h-px bg-primary w-24"></div>
                                                                      <div className="w-2 h-2 bg-primary rotate-45"></div>
                                                                      <div className="h-px bg-primary w-24"></div>
                                                                  </div>
                                                              )}
                                                          </div>
                                                      ))}
                                              </div>
                                          </div>
                                      );
                                  })}
                          </div>
              {/* Halal Legend */}
              {hasHalalItems && (
                <div className="mt-16 pt-8 border-t border-muted/20 text-center">
                  <p className="text-muted-foreground text-lg">
                    <span className="text-muted-foreground text-lg">*</span> Viande 100% certifiée Halal
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Reservation CTA */}
          <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4xl text-center">
              <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 font-light">
                Réservez votre Table
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Laissez-vous tenter par notre cuisine du monde et réservez dès maintenant
                pour une expérience culinaire inoubliable.
              </p>
              <a
                href="https://www.thefork.fr/restaurant/dadicook-r815372"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
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