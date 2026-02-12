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

          {/* Menu Categories - Simple & Elegant */}
          <section className="py-24">
            <div className="container mx-auto px-4 max-w-4xl">
              {categories.map((category, categoryIndex) => (
                <div key={category.id} className={categoryIndex > 0 ? "mt-20" : ""}>
                  {/* Category Title */}
                  <div className="text-center mb-12">
                    <h2 className="font-serif text-4xl text-primary mb-2">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-muted-foreground text-5xl mt-2">{category.description}</p>
                    )}
                    <div className="w-20 h-px bg-primary/20 mx-auto mt-4"></div>
                  </div>

                  {/* Menu Items List - Simple Format */}
                  <div className="space-y-8">
                    {category.menu_items.map((item) => (
                      <div key={item.id} className="pb-8">
                        {/* Item Header */}
                        <div className="flex justify-between items-baseline mb-4">
                          <h3 className="font-serif text-3xl text-primary flex-1">
                            {item.title}
                          </h3>
                          <div className="flex-shrink-0 ml-4 flex items-center gap-3">
                            <div className="flex-1 border-b border-dotted border-muted/40 min-w-[40px]"></div>
                            <span className="font-serif text-3xl text-primary whitespace-nowrap">
                              {item.price.toFixed(2)}€
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        {item.description && (
                          <p className="text-muted-foreground text-xl leading-relaxed mb-3">
                            {item.description}
                          </p>
                        )}

                        {/* Allergens */}
                        {item.allergens && Array.isArray(item.allergens) && item.allergens.length > 0 && (
                          <p className="text-base text-muted-foreground/60 italic mb-4">
                            Allergènes : {item.allergens.join(", ")}
                          </p>
                        )}

                        {/* Elegant Separator */}
                        <div className="flex items-center justify-center mt-6">
                          <div className="h-px bg-primary/10 flex-1 max-w-[100px]"></div>
                          <div className="w-1.5 h-1.5 bg-primary/20 rotate-45 mx-4"></div>
                          <div className="h-px bg-primary/10 flex-1 max-w-[100px]"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reservation CTA */}
          <section className="py-24 bg-gray-100">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">
                Réservez votre Table
              </h2>
              <p className="text-primary/80 text-lg mb-8 max-w-2xl mx-auto">
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