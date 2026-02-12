import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { menuService } from "@/services/menuService";
import Image from "next/image";
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

interface MenuDuJour {
  title: string;
  description: string | null;
  is_active: boolean;
}

export default function QRMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuDuJour, setMenuDuJour] = useState<MenuDuJour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const [categoriesData, menuDuJourData] = await Promise.all([
        menuService.getCategoriesWithItems("published"),
        menuService.getMenuDuJour()
      ]);
      setCategories(categoriesData as any);
      setMenuDuJour(menuDuJourData);
    } catch (error) {
      console.error("Error loading menu:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Utensils className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Chargement du menu...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Menu QR - DADICOOK"
        description="Consultez notre menu du jour et notre carte complète"
      />

      <div className="min-h-screen bg-background pb-8">
        {/* Header */}
        <header className="bg-primary text-secondary py-6 px-4 text-center sticky top-0 z-10 shadow-lg">
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/LOGO1.svg"
              alt="DADICOOK"
              width={50}
              height={50}
              className="[filter:brightness(0)_saturate(100%)_invert(89%)_sepia(12%)_saturate(531%)_hue-rotate(343deg)_brightness(98%)_contrast(90%)]"
            />
            <h1 className="text-2xl font-serif">DADICOOK</h1>
            <p className="text-sm text-secondary/80">Cuisine du Monde</p>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4">
          {/* Menu du Jour */}
          {menuDuJour && menuDuJour.is_active && (
            <section className="mt-8 mb-12">
              <div className="bg-primary text-secondary p-6 rounded-lg shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Utensils className="h-6 w-6 text-accent" />
                  <h2 className="text-3xl font-serif text-accent">
                    {menuDuJour.title}
                  </h2>
                </div>
                {menuDuJour.description && (
                  <p className="text-secondary/90 leading-relaxed whitespace-pre-line">
                    {menuDuJour.description}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Categories and Menu Items */}
          {categories.map((category) => (
            <section key={category.id} className="mb-12">
              <div className="mb-6">
                <h2 className="text-3xl font-serif text-primary text-center mb-2">
                  {category.name}
                </h2>
                {category.description && (
                  <p className="text-center text-muted-foreground text-sm">
                    {category.description}
                  </p>
                )}
                <div className="w-24 h-[2px] bg-primary mx-auto mt-4"></div>
              </div>

              <div className="space-y-6">
                {category.menu_items.map((item) => (
                  <div key={item.id} className="bg-card rounded-lg overflow-hidden shadow-md">
                    {item.image_url && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-serif text-primary flex-1">
                          {item.title}
                        </h3>
                        <span className="text-xl font-serif text-primary ml-4">
                          {item.price.toFixed(2)}€
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-muted-foreground text-sm mb-2 leading-relaxed">
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
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-muted-foreground text-sm px-4">
          <p className="mb-2">26 Rue de l'Université, 34000 Montpellier</p>
          <p className="mb-2">+33 7 49 49 95 55</p>
          <p className="mb-4">www.dadicook.fr</p>
          <p className="text-xs">© 2026 DADICOOK - Tous droits réservés</p>
        </footer>
      </div>
    </>
  );
}