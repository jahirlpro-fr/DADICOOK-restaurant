import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { galleryService } from "@/services/galleryService";
import { menuService } from "@/services/menuService";
import Image from "next/image";
import { X } from "lucide-react";

interface GalleryItem {
  id: string;
  category_id?: string | null;
  title: string;
  description: string | null;
  image_url: string | null;
  allergens: string[] | null;
}

interface Category {
  id: string;
  name: string;
  display_order: number;
}

export default function Galerie() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [dynamicItems, setDynamicItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [items, cats] = await Promise.all([
        galleryService.getGalleryItems("published"),
        menuService.getAllCategories()
      ]);
      setDynamicItems(items as GalleryItem[]);
      setCategories(cats);
    } catch (error) {
      console.error("Error loading gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  // Static gallery images from /public folder
  const staticGalleryImages = [
    {
      src: "/Cheescake_vanille_Rhubarbe.jpg",
      alt: "Cheesecake Vanille Rhubarbe",
      title: "Cheesecake Vanille Rhubarbe"
    },
    {
      src: "/Fondant_au_chocolat_noisettes.avif",
      alt: "Fondant au Chocolat Noisettes",
      title: "Fondant au Chocolat Noisettes"
    },
    {
      src: "/Hampe_de_boeuf_sauce_poivre.jpg",
      alt: "Hampe de Boeuf Sauce Poivre",
      title: "Hampe de Boeuf Sauce Poivre"
    },
    {
      src: "/Image_interieur_restaurant.jpg",
      alt: "Intérieur du Restaurant",
      title: "Notre Restaurant"
    },
    {
      src: "/Image_random_1.avif",
      alt: "Ambiance DADICOOK",
      title: "Ambiance Chaleureuse"
    },
    {
      src: "/Image_random_2.jpg",
      alt: "Plat du Chef",
      title: "Création du Chef"
    },
    {
      src: "/image_random_3.jpg",
      alt: "Expérience Culinaire",
      title: "Expérience Unique"
    },
    {
      src: "/Khychin.jpg",
      alt: "Khychin",
      title: "Khychin"
    },
    {
      src: "/Le_batbout.jpg",
      alt: "Le Batbout",
      title: "Le Batbout"
    },
    {
      src: "/Le_chiktay_de_morue.jpg",
      alt: "Le Chiktay de Morue",
      title: "Le Chiktay de Morue"
    },
    {
      src: "/Maakouda.jpg",
      alt: "Maakouda",
      title: "Maakouda"
    },
    {
      src: "/Mocktail_Dadi.jpg",
      alt: "Mocktail Dadi",
      title: "Mocktail Dadi"
    },
    {
      src: "/Mocktail_Didine.jpg",
      alt: "Mocktail Didine",
      title: "Mocktail Didine"
    },
    {
      src: "/Poulet_satay.jpg",
      alt: "Poulet Satay",
      title: "Poulet Satay"
    },
    {
      src: "/Salade_boulgour.jpg",
      alt: "Salade Boulgour",
      title: "Salade Boulgour"
    },
    {
      src: "/Tarte_mangue_passion_cacahue_te.jpg",
      alt: "Tarte Mangue Passion Cacahuète",
      title: "Tarte Mangue Passion"
    },
    {
      src: "/Tiramisu.jpg",
      alt: "Tiramisu",
      title: "Tiramisu"
    }
  ];

  const handleImageClick = (item: GalleryItem) => {
    setSelectedImage(item);
  };

  return (
    <>
      <SEO 
        title="Galerie - DADICOOK"
        description="Découvrez en images l'univers culinaire de DADICOOK, nos plats signatures et l'ambiance chaleureuse de notre restaurant bistronomique."
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center bg-primary">
            <div className="absolute inset-0">
              <Image
                src="/Image_interieur_restaurant.jpg"
                alt="Galerie DADICOOK"
                fill
                className="object-cover opacity-30"
                priority
              />
            </div>
            <div className="relative z-10 text-center px-4">
              <p className="font-serif text-accent/80 text-lg md:text-xl mb-4">Découvrez</p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-accent mb-6">
                Notre Galerie
              </h1>
              <p className="text-accent/90 text-lg md:text-xl max-w-2xl mx-auto">
                Plongez dans l'univers culinaire de DADICOOK
              </p>
            </div>
          </section>

          {/* Dynamic Gallery Section - Categorized */}
          <section className="py-16 md:py-24">
            <div className="container">
              {categories.map(category => {
                const items = dynamicItems.filter(item => item.category_id === category.id);
                if (items.length === 0) return null;

                return (
                  <div key={category.id} className="mb-20 last:mb-0">
                    <div className="text-center space-y-2 mb-12">
                      <h2 className="font-serif text-4xl text-primary mb-2">
                        {category.name}
                      </h2>
                      <div className="w-24 h-px bg-accent/30 mx-auto mt-4" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {items.map((item) => (
                        <div 
                          key={item.id}
                          className="group relative aspect-square overflow-hidden bg-muted cursor-pointer"
                          onClick={() => handleImageClick(item)}
                        >
                          {item.image_url && (
                            <>
                              <Image
                                src={item.image_url}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-6 w-full">
                                  <h3 className="font-serif text-2xl text-accent">{item.title}</h3>
                                  {item.description && (
                                    <p className="text-accent/80 text-sm mt-2 line-clamp-2">{item.description}</p>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Uncategorized Items / Static Fallback */}
              {dynamicItems.filter(i => !i.category_id).length > 0 && (
                 <div className="mb-20 last:mb-0">
                    <div className="text-center space-y-2 mb-12">
                      <h2 className="font-serif text-4xl text-primary mb-2">
                        Autres Créations
                      </h2>
                      <div className="w-24 h-px bg-accent/30 mx-auto mt-4" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {dynamicItems.filter(i => !i.category_id).map((item) => (
                        <div 
                          key={item.id}
                          className="group relative aspect-square overflow-hidden bg-muted cursor-pointer"
                          onClick={() => handleImageClick(item)}
                        >
                          {item.image_url && (
                            <>
                              <Image
                                src={item.image_url}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-6 w-full">
                                  <h3 className="font-serif text-2xl text-accent">{item.title}</h3>
                                  {item.description && (
                                    <p className="text-accent/80 text-sm mt-2 line-clamp-2">{item.description}</p>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                 </div>
              )}
            </div>
          </section>

          {/* Reservation CTA */}
          <section className="py-20 md:py-28 bg-primary">
            <div className="container text-center">
              <h2 className="font-serif text-4xl md:text-5xl text-accent mb-6">
                Réservez votre Table
              </h2>
              <p className="text-accent/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                Laissez-vous tenter par notre cuisine du monde et réservez dès maintenant pour une expérience culinaire inoubliable.
              </p>
              <a
                href="https://www.thefork.fr/restaurant/dadicook-r815372"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-primary px-10 py-4 text-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Réserver maintenant
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-accent transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            {selectedImage.image_url && (
              <div className="relative w-full h-[60vh]">
                <Image
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            
            <div className="p-6 md:p-8">
              <h3 className="font-serif text-3xl text-primary mb-3">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-muted-foreground text-lg mb-4">{selectedImage.description}</p>
              )}
              {selectedImage.allergens && selectedImage.allergens.length > 0 && (
                <p className="text-sm text-muted-foreground/70 italic">
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