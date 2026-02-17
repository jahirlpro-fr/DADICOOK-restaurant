import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import Image from "next/image";
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

interface MenuDuJour {
  id: string;
  title: string;
  description: string | null;
  price?: number | null;
  content?: string | null;
  is_active: boolean;
}

export default function QRMenuPage() {
  const [menuItems, setMenuItems] = useState<Record<string, any[]>>({});
  const [categories, setCategories] = useState<any[]>([]);
  const [menuDuJour, setMenuDuJour] = useState < MenuDuJour | null > (null);
  const [menuDuJourItems, setMenuDuJourItems] = useState < any[] > ([]);
  const [loading, setLoading] = useState(true);
  const [hasHalalItems, setHasHalalItems] = useState(false);

  useEffect(() => {
    fetchMenuData();
  }, []);

const fetchMenuData = async () => {
  try {
    const items = await menuService.getAllMenuItems();
    const cats = await menuService.getAllCategories();
    const dailyMenu = await menuService.getMenuDuJour();
    const dailyItems = await menuService.getMenuDuJourItems("published");
      
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
      setMenuDuJour(dailyMenu);
      setMenuDuJourItems(dailyItems);
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
          title="Menu QR - DADICOOK"
          description="Consultez notre menu complet et nos plats du jour"
        />
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="text-center">
            <Utensils className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
            <p className="text-muted-foreground">Chargement du menu...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Menu QR - DADICOOK"
        description="Consultez notre menu complet et nos plats du jour"
      />
      
      <div className="min-h-screen bg-background">
        {/* Header avec Logo */}
        <header className="bg-primary py-6 border-b border-accent/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-3">
              <Image
                src="/LOGO1.svg"
                alt="DADICOOK"
                width={50}
                height={50}
                className="[filter:brightness(0)_saturate(100%)_invert(89%)_sepia(12%)_saturate(531%)_hue-rotate(343deg)_brightness(98%)_contrast(90%)]"
              />
              <Image
                src="/LOGO2.svg"
                alt="DADICOOK Restaurant"
                width={180}
                height={27}
                className="[filter:brightness(0)_saturate(100%)_invert(89%)_sepia(12%)_saturate(531%)_hue-rotate(343deg)_brightness(98%)_contrast(90%)]"
              />
            </div>
          </div>
        </header>

        <main className="py-8">
          {/* Menu du Jour Section */}
          {menuDuJour && (
            <section className="mb-12 bg-primary/5 py-8">
              <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-6">
                  <p className="text-primary/60 uppercase tracking-wider text-xs mb-2">
                    Aujourd'hui
                  </p>
                  <h2 className="font-serif text-3xl text-primary mb-2">
                    {menuDuJour.title}
                  </h2>
                  <div className="w-16 h-px bg-primary/20 mx-auto"></div>
                </div>

                {menuDuJour.description && (
                  <p className="text-center text-muted-foreground mb-4 text-sm">
                    {menuDuJour.description}
                  </p>
                )}

                {menuDuJour.content && (
                  <div className="bg-background rounded-lg p-6 shadow-sm">
                    <p className="text-foreground whitespace-pre-line text-sm leading-relaxed">
                      {menuDuJour.content}
                    </p>
                  </div>
                )}

                {menuDuJour.price && (
                  <p className="text-center mt-4 font-serif text-2xl text-primary">
                    {menuDuJour.price.toFixed(2)}€
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Menu Complet */}
          <section className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-primary/60 uppercase tracking-wider text-xs mb-2">
                Notre Carte
              </p>
              <h1 className="font-serif text-4xl text-primary mb-2">
                Menu Complet
              </h1>
              <div className="w-16 h-px bg-primary/20 mx-auto"></div>
            </div>

            <div className="bg-background/95">
              <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="grid gap-12">
                  {categories
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((category) => {
                      const items = menuItems[category.id] || [];
                      if (items.length === 0) return null;

                      return (
                        <div key={category.id} className="space-y-6">
                          <div className="text-center space-y-1">
                            <h2 className="font-serif text-3xl text-primary">
                              {category.name}
                            </h2>
                            {category.description && (
                              <p className="text-muted-foreground text-sm">
                                {category.description}
                              </p>
                            )}
                            <div className="w-16 h-px bg-accent/30 mx-auto mt-3" />
                          </div>

                          <div className="space-y-6">
{items
  .sort((a, b) => a.display_order - b.display_order)
  .map((item, index) => (
    <div key={item.id}>
      <div className="pb-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-serif text-xl text-primary flex-1">
            {item.title}
            {item.is_halal && (
              <span className="text-muted-foreground ml-1">*</span>
            )}
          </h3>
          {item.price && (
            <span className="font-serif text-xl text-primary whitespace-nowrap">
              {item.price.toFixed(2)}€
            </span>
          )}
        </div>

        {item.description && (
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
            {item.description}
          </p>
        )}

        {item.allergens && item.allergens.length > 0 && (
          <p className="text-xs text-muted-foreground/60 italic">
            Allergènes : {item.allergens.join(", ")}
          </p>
        )}
      </div>

      {/* Séparateur (ne s'affiche pas après le dernier plat) */}
      {index < items.length - 1 && (
        <div className="flex items-center justify-center gap-4 py-6">
          <div className="h-px bg-primary/60 w-24"></div>
          <div className="w-2 h-2 bg-primary/60 rotate-45"></div>
          <div className="h-px bg-primary/60 w-24"></div>
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
                  <div className="mt-12 pt-6 border-t border-muted/20 text-center">
                    <p className="text-muted-foreground text-lg">
                      <span className="text-muted-foreground texte-sm md:text-sm">*</span> Viande 100% certifiée Halal
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

        </main>

        {/* Footer minimal */}
        <footer className="bg-primary py-6 border-t border-accent/20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-accent/80 text-xs">© 2026 DADICOOK - Tous droits réservés</p>

            
            {/* Halal Mention - Discrete */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center gap-2 px-3 py-1.5 border border-accent/30 rounded-full bg-accent/10">
                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">Viandes certifiées Halal</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}