import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { galleryService, type GalleryItem } from "@/services/galleryService";
import { menuService } from "@/services/menuService";

export default function GaleriePage() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [galleryItemsByCategory, setGalleryItemsByCategory] = useState<Record<string, GalleryItem[]>>({});
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const categoriesData = await menuService.getAllCategories();
      const sortedCategories = (categoriesData || []).sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
      setCategories(sortedCategories);

      // Fetch all published gallery items
      const items = await galleryService.getGalleryItems("published");
      
      // Group by category
      const grouped: Record<string, GalleryItem[]> = {};
      items.forEach((item) => {
        const categoryId = item.category_id || "uncategorized";
        if (!grouped[categoryId]) {
          grouped[categoryId] = [];
        }
        grouped[categoryId].push(item);
      });

      // Sort items within each category by display_order
      Object.keys(grouped).forEach((catId) => {
        grouped[catId].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
      });

      setGalleryItemsByCategory(grouped);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId: string) => {
    if (categoryId === "uncategorized") return "Autres";
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || "Autres";
  };

  return (
    <>
      <SEO 
        title="Galerie - DADICOOK"
        description="Découvrez en images nos créations culinaires, notre ambiance chaleureuse et nos plats signatures."
        image="/og-image.png"
      />
      
      <Header />
      
          <main className="pt-20">
              {/* Hero Section - Elegant Header */}
              <section className="relative py-24 bg-primary">
                  <div className="container mx-auto px-4">
                      <div className="max-w-4xl mx-auto text-center">
                          <p className="text-accent/80 uppercase tracking-[0.2em] text-xl mb-6 font-light">
                              Découvrez nos créations
                          </p>
                          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-accent mb-6">
                              Notre Galerie
                          </h1>
                          <div className="flex items-center justify-center gap-4 mb-8">
                              <div className="h-px bg-accent/30 w-24"></div>
                              <div className="w-2 h-2 bg-accent rotate-45"></div>
                              <div className="h-px bg-accent/30 w-24"></div>
                          </div>
                          <p className="text-lg md:text-xl text-accent/90 leading-relaxed max-w-2xl mx-auto">
                              Découvrez en images nos créations culinaires et l'ambiance chaleureuse de notre restaurant
                          </p>
                      </div>
                  </div>
              </section>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-accent/60">Chargement de la galerie...</p>
            </div>
          ) : Object.keys(galleryItemsByCategory).length === 0 ? (
            <div className="text-center py-16">
              <p className="text-accent/60">Aucune image disponible pour le moment.</p>
            </div>
          ) : (
                          <div className="space-y-20 py-16">
                              {categories
                                  .sort((a, b) => {
                                      const aOrder = categories.find(c => c.id === a.id)?.display_order || 999;
                                      const bOrder = categories.find(c => c.id === b.id)?.display_order || 999;
                                      return aOrder - bOrder;
                                  })
                                  .filter(category => galleryItemsByCategory[category.id]?.length > 0)
                                  .map(category => {
                                      const items = galleryItemsByCategory[category.id];

                                      return (
                                          <section key={category.id} className="space-y-8">
                                              {/* Category Title */}
                                              <div className="text-center space-y-3">
                                                  <h2 className="font-serif text-4xl md:text-4xl text-primary">
                                                      {category.name}
                                                  </h2>
                                                  <div className="flex items-center justify-center gap-4">
                                                      <div className="h-px bg-primary w-24"></div>
                                                      <div className="w-2 h-2 bg-primary rotate-45"></div>
                                                      <div className="h-px bg-primary w-24"></div>
                                                  </div>
                                              </div>

                                              {/* Gallery Grid */}
                                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                                  {items.map((item) => (
                                                      <div
                                                          key={item.id}
                                                          className="group relative aspect-square overflow-hidden bg-surface cursor-pointer"
                                                          onClick={() => setSelectedImage(item)}
                                                      >
                                                          <img
                                                              src={item.image_url}
                                                              alt={item.title}
                                                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                              loading="lazy"
                                                          />
                                                          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                                                  <h3 className="text-white font-display text-lg">
                                                                      {item.title}
                                                                  </h3>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  ))}
                                              </div>
                                          </section>
                                      );
                                  })
                              }

                              {/* Uncategorized items if any */}
                              {galleryItemsByCategory["uncategorized"]?.length > 0 && (
                                  <section className="space-y-8">
                                      <div className="text-center space-y-3">
                                          <h2 className="font-serif text-4xl md:text-4xl text-primary">
                                              Autres
                                          </h2>
                                          <div className="flex items-center justify-center gap-4">
                                              <div className="h-px bg-primary w-24"></div>
                                              <div className="w-2 h-2 bg-primary rotate-45"></div>
                                              <div className="h-px bg-primary w-24"></div>
                                          </div>
                                      </div>
                                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                          {galleryItemsByCategory["uncategorized"].map((item) => (
                                              <div
                                                  key={item.id}
                                                  className="group relative aspect-square overflow-hidden bg-surface cursor-pointer"
                                                  onClick={() => setSelectedImage(item)}
                                              >
                                                  <img
                                                      src={item.image_url}
                                                      alt={item.title}
                                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                      loading="lazy"
                                                  />
                                                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                      <div className="absolute bottom-0 left-0 right-0 p-4">
                                                          <h3 className="text-white font-display text-lg">
                                                              {item.title}
                                                          </h3>
                                                      </div>
                                                  </div>
                                              </div>
                                          ))}
                                      </div>
                                  </section>
                              )}
                          </div>
          )}

              {/* Reservation CTA */}
              <section className="py-24 bg-muted/30">
                  <div className="container mx-auto px-4xl text-center">
                      <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 font-light">
                          Envie de découvrir nos saveurs ?
                      </h2>
                      <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                          Réservez votre table dès maintenant
                      </p>
                      <a
                          href="https://www.thefork.fr/restaurant/dadicook-r815372"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                          Réserver une table
                      </a>
                  </div>
              </section>
          </main>


      <Footer />

      {/* Image Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-background p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <X className="w-5 h-5 text-primary" />
            </button>

            <div className="aspect-video w-full overflow-hidden bg-surface">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2 text-center">
              <h3 className="font-display text-2xl text-primary">
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p className="text-primary text-base">
                  {selectedImage.description}
                </p>
              )}
              {selectedImage.allergens && selectedImage.allergens.length > 0 && (
                <p className="text-sm text-accent/60">
                  Allergènes : {selectedImage.allergens.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}