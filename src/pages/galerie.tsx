import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

const galleryImages = [
  { src: "/Poulet_satay.jpg", alt: "Poulet Satay" },
  { src: "/Salade_boulgour.jpg", alt: "Salade Boulgour" },
  { src: "/Hampe_de_boeuf_sauce_poivre.jpg", alt: "Hampe de Bœuf Sauce Poivre" },
  { src: "/Khychin.jpg", alt: "Khychin" },
  { src: "/Le_batbout.jpg", alt: "Le Batbout" },
  { src: "/Maakouda.jpg", alt: "Maakouda" },
  { src: "/Le_chiktay_de_morue.jpg", alt: "Le Chiktay de Morue" },
  { src: "/Cheescake_vanille_Rhubarbe.jpg", alt: "Cheesecake Vanille Rhubarbe" },
  { src: "/Fondant_au_chocolat_noisettes.avif", alt: "Fondant au Chocolat Noisettes" },
  { src: "/Tarte_mangue_passion_cacahue_te.jpg", alt: "Tarte Mangue Passion Cacahuète" },
  { src: "/Tiramisu.jpg", alt: "Tiramisu" },
  { src: "/Mocktail_Dadi.jpg", alt: "Mocktail Dadi" },
  { src: "/Mocktail_Didine.jpg", alt: "Mocktail Didine" },
  { src: "/Image_interieur_restaurant.jpg", alt: "Intérieur du restaurant" },
  { src: "/Image_random_1.avif", alt: "Ambiance restaurant" },
  { src: "/Image_random_2.jpg", alt: "Décoration" },
  { src: "/image_random_3.jpg", alt: "Atmosphère" }
];

export default function Galerie() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="Galerie - DADICOOK | Découvrez Nos Créations Culinaires"
        description="Explorez notre galerie photo : plats signature, desserts maison, et l'ambiance chaleureuse de notre restaurant à Montpellier."
        image="/Poulet_satay.jpg"
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero Section - Elegant Header */}
          <section className="relative bg-primary py-32 overflow-hidden">
            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(232, 212, 160, 0.1) 35px, rgba(232, 212, 160, 0.1) 70px)`
              }}></div>
            </div>
            
            <div className="container mx-auto px-4 max-w-4xl relative z-10">
              <div className="text-center space-y-6">
                <p className="text-accent/80 uppercase tracking-[0.4em] text-xl font-light">
                  Galerie
                </p>
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-accent mb-6 font-light tracking-tight">
                  Nos Créations
                </h1>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-accent/30 w-24"></div>
                  <div className="w-2 h-2 bg-accent rotate-45"></div>
                  <div className="h-px bg-accent/30 w-24"></div>
                </div>
                <p className="text-accent/90 text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto">
                  Découvrez en images notre univers culinaire et l'ambiance chaleureuse de notre restaurant
                </p>
              </div>
            </div>
          </section>

          {/* Gallery Grid */}
          <section className="py-24 bg-background">
            <div className="container mx-auto px-4 max-w-7xl">
              {/* Entrées */}
              <div className="mb-16">
                <h2 className="font-serif text-4xl md:text-5xl text-foreground text-center mb-6">
                  Entrées
                </h2>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-accent/30 w-24"></div>
                  <div className="w-2 h-2 bg-accent rotate-45"></div>
                  <div className="h-px bg-accent/30 w-24"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { src: "/Le_batbout.jpg", alt: "Le Batbout" },
                    { src: "/Maakouda.jpg", alt: "Maakouda" },
                    { src: "/Le_chiktay_de_morue.jpg", alt: "Le Chiktay de Morue" },
                    { src: "/Salade_boulgour.jpg", alt: "Salade Boulgour" }
                  ].map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden bg-muted cursor-pointer group"
                      onClick={() => setSelectedImage(image.src)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-accent text-lg font-serif">Voir</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plats */}
              <div className="mb-16">
                <h2 className="font-serif text-4xl md:text-5xl text-foreground text-center mb-6">
                  Plats
                </h2>
                <div className="flex items-center justify-center gap-4 mb-12">
                  <div className="w-16 h-px bg-primary/40 border-t-2 border-dashed border-primary/40"></div>
                  <div className="w-2 h-2 rotate-45 border border-primary/40"></div>
                  <div className="w-16 h-px bg-primary/40 border-t-2 border-dashed border-primary/40"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { src: "/Poulet_satay.jpg", alt: "Poulet Satay" },
                    { src: "/Hampe_de_boeuf_sauce_poivre.jpg", alt: "Hampe de Bœuf Sauce Poivre" },
                    { src: "/Khychin.jpg", alt: "Khychin" }
                  ].map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden bg-muted cursor-pointer group"
                      onClick={() => setSelectedImage(image.src)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-accent text-lg font-serif">Voir</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desserts */}
              <div className="mb-16">
                <h2 className="font-serif text-4xl md:text-5xl text-foreground text-center mb-6">
                  Desserts
                </h2>
                <div className="flex items-center justify-center gap-4 mb-12">
                  <div className="w-16 h-px bg-primary/40 border-t-2 border-dashed border-primary/40"></div>
                  <div className="w-2 h-2 rotate-45 border border-primary/40"></div>
                  <div className="w-16 h-px bg-primary/40 border-t-2 border-dashed border-primary/40"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { src: "/Cheescake_vanille_Rhubarbe.jpg", alt: "Cheesecake Vanille Rhubarbe" },
                    { src: "/Fondant_au_chocolat_noisettes.avif", alt: "Fondant au Chocolat Noisettes" },
                    { src: "/Tarte_mangue_passion_cacahue_te.jpg", alt: "Tarte Mangue Passion Cacahuète" },
                    { src: "/Tiramisu.jpg", alt: "Tiramisu" }
                  ].map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden bg-muted cursor-pointer group"
                      onClick={() => setSelectedImage(image.src)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-accent text-lg font-serif">Voir</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boissons */}
              <div className="mb-16">
                <h2 className="font-serif text-4xl md:text-5xl text-foreground text-center mb-6">
                  Boissons
                </h2>
                <div className="flex items-center justify-center gap-4 mb-12">
                  <div className="w-16 h-px bg-primary/40 border-t-2 border-dashed border-primary/40"></div>
                  <div className="w-2 h-2 rotate-45 border border-primary/40"></div>
                  <div className="w-16 h-px bg-primary/40 border-t-2 border-dashed border-primary/40"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { src: "/Mocktail_Dadi.jpg", alt: "Mocktail Dadi" },
                    { src: "/Mocktail_Didine.jpg", alt: "Mocktail Didine" }
                  ].map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden bg-muted cursor-pointer group"
                      onClick={() => setSelectedImage(image.src)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-accent text-lg font-serif">Voir</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ambiance */}
              <div>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground text-center mb-6">
                  Ambiance
                </h2>
                <div className="flex items-center justify-center gap-4 mb-12">
                  <div className="w-16 h-px bg-primary/40 border-t-2 border-dashed border-primary/40"></div>
                  <div className="w-2 h-2 rotate-45 border border-primary/40"></div>
                  <div className="w-16 h-px bg-primary/40 border-t-2 border-dashed border-primary/40"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { src: "/Image_interieur_restaurant.jpg", alt: "Intérieur du restaurant" },
                    { src: "/Image_random_1.avif", alt: "Ambiance restaurant" },
                    { src: "/Image_random_2.jpg", alt: "Décoration" },
                    { src: "/image_random_3.jpg", alt: "Atmosphère" }
                  ].map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden bg-muted cursor-pointer group"
                      onClick={() => setSelectedImage(image.src)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-accent text-lg font-serif">Voir</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 font-light">
                Réservez Votre Expérience
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Laissez-vous tenter par notre cuisine du monde et réservez dès maintenant votre table pour une expérience culinaire inoubliable.
              </p>
              <a
                href="https://www.thefork.fr/restaurant/dadicook-r815372"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground px-12 py-5 font-semibold hover:bg-primary/90 transition-all duration-300 text-lg tracking-wide"
              >
                Réserver une table
              </a>
            </div>
          </section>
        </main>

        <Footer />
        <CookieConsent />
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Image agrandie"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}