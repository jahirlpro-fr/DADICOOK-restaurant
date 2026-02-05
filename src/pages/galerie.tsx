import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  category: "plats" | "ambiance" | "equipe";
}

const galleryImages: GalleryImage[] = [
  { src: "/DADICOOK-MENU-1.jpg", alt: "Plat signature DADICOOK", category: "plats" },
  { src: "/DADICOOK-MENU-2.jpg", alt: "Plat DADICOOK", category: "plats" },
  { src: "/DADICOOK-MENU-3.jpg", alt: "Création culinaire DADICOOK", category: "plats" },
  { src: "/Bannie_re_late_rale.jpg", alt: "Ambiance restaurant DADICOOK", category: "ambiance" },
];

export default function Galerie() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("tous");

  const filteredImages = selectedCategory === "tous"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <>
      <SEO
        title="Galerie Photos - DADICOOK | Nos Plats et Ambiance"
        description="Découvrez en images nos plats, notre restaurant et notre équipe. Plongez dans l'univers chaleureux et savoureux de DADICOOK."
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="/DADICOOK-MENU-3.jpg"
                alt="Galerie DADICOOK"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
            </div>
            
            <div className="relative z-10 container text-center">
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-secondary mb-4">
                Galerie Photos
              </h1>
              <p className="font-sans text-xl text-secondary/90 max-w-2xl mx-auto">
                Découvrez l'univers DADICOOK en images
              </p>
            </div>
          </section>

          <section className="py-16 bg-background">
            <div className="container">
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {["tous", "plats", "ambiance", "equipe"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 font-sans text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-secondary"
                        : "bg-muted text-foreground hover:bg-primary/10"
                    }`}
                  >
                    {category === "tous" && "Tous"}
                    {category === "plats" && "Nos Plats"}
                    {category === "ambiance" && "Ambiance"}
                    {category === "equipe" && "Notre Équipe"}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square cursor-pointer overflow-hidden group"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  </div>
                ))}
              </div>

              {filteredImages.length === 0 && (
                <div className="text-center py-16">
                  <p className="font-sans text-lg text-muted-foreground">
                    Aucune image dans cette catégorie pour le moment.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
        <CookieConsent />
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Fermer"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}