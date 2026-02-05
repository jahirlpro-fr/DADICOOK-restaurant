import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { Button } from "@/components/ui/button";
import { ChefHat, UtensilsCrossed, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const reviews = [
  {
    author: "Client 1",
    rating: 5,
    date: "Janvier 2026",
    text: "Excellente cuisine et service impeccable. Une expérience culinaire mémorable dans un cadre chaleureux."
  },
  {
    author: "Client 2",
    rating: 5,
    date: "Janvier 2026",
    text: "Les plats sont délicieux et l'ambiance est très agréable. Je recommande vivement ce restaurant."
  },
  {
    author: "Client 3",
    rating: 5,
    date: "Décembre 2025",
    text: "Un moment exceptionnel ! La qualité des produits et la présentation des plats sont remarquables."
  },
  {
    author: "Client 4",
    rating: 5,
    date: "Décembre 2025",
    text: "Service attentionné et cuisine savoureuse. Un très bon rapport qualité-prix."
  },
  {
    author: "Client 5",
    rating: 5,
    date: "Novembre 2025",
    text: "Une découverte fantastique ! L'équipe est accueillante et les saveurs sont au rendez-vous."
  }
];

export default function Home() {
  return (
    <>
      <SEO
        title="DADICOOK - Restaurant Bistronomique | Cuisine du Monde"
        description="Découvrez DADICOOK, restaurant bistronomique proposant une cuisine du monde raffinée dans une ambiance chaleureuse et conviviale. Réservez votre table en ligne."
        image="/og-image.png"
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="/Bannie_re_late_rale.jpg"
                alt="DADICOOK Restaurant"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
            </div>
            
            <div className="relative z-10 container text-center">
              <div className="inline-block bg-primary px-12 py-6 mb-8">
                <h1 className="font-serif text-5xl md:text-7xl font-bold text-secondary">
                  DADICOOK
                </h1>
              </div>
              <p className="font-sans text-xl md:text-2xl text-secondary mb-8 max-w-2xl mx-auto">
                Cuisine du monde
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary text-secondary hover:bg-primary/90 font-sans text-lg px-8 py-6">
                  <a
                    href="https://www.thefork.fr/restaurant/dadicook-r815372"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Réserver une table
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-sans text-lg px-8 py-6 border-secondary text-secondary hover:bg-secondary/10">
                  <Link href="/menu">
                    Découvrir le menu
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Notre Philosophie
                </h2>
                <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Chez DADICOOK, nous célébrons la diversité culinaire mondiale dans une ambiance chaleureuse 
                  et conviviale. Chaque plat est une invitation au voyage, préparé avec passion et des produits 
                  de qualité soigneusement sélectionnés.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-8 bg-muted border border-border">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary mb-6">
                    <ChefHat className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-4">Cuisine Authentique</h3>
                  <p className="font-sans text-muted-foreground">
                    Des recettes traditionnelles revisitées avec créativité et savoir-faire.
                  </p>
                </div>

                <div className="text-center p-8 bg-muted border border-border">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary mb-6">
                    <UtensilsCrossed className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-4">Produits Frais</h3>
                  <p className="font-sans text-muted-foreground">
                    Une sélection rigoureuse d'ingrédients de qualité pour des saveurs incomparables.
                  </p>
                </div>

                <div className="text-center p-8 bg-muted border border-border">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary mb-6">
                    <Heart className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-4">Ambiance Chaleureuse</h3>
                  <p className="font-sans text-muted-foreground">
                    Un cadre accueillant et convivial pour partager des moments inoubliables.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative h-[500px]">
                  <Image
                    src="/DADICOOK-MENU-1.jpg"
                    alt="Plat signature DADICOOK"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                    Une Expérience Culinaire Unique
                  </h2>
                  <p className="font-sans text-lg text-muted-foreground mb-6 leading-relaxed">
                    Notre chef et son équipe vous proposent une carte variée qui célèbre les saveurs 
                    du monde entier. Des entrées raffinées aux desserts gourmands, chaque plat est 
                    une création soignée qui ravira vos papilles.
                  </p>
                  <p className="font-sans text-lg text-muted-foreground mb-8 leading-relaxed">
                    Laissez-vous tenter par nos plats signatures et découvrez des associations de 
                    saveurs audacieuses dans un cadre élégant et décontracté.
                  </p>
                  <Button asChild size="lg" className="bg-primary text-secondary hover:bg-primary/90 font-sans">
                    <Link href="/menu">
                      Découvrir notre carte
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Ils Parlent de Nous
                </h2>
                <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
                  Découvrez les avis de nos clients qui ont apprécié leur expérience chez DADICOOK.
                </p>
              </div>
              <ReviewsCarousel reviews={reviews} />
            </div>
          </section>

          <section className="py-20 bg-primary text-secondary">
            <div className="container text-center">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Réservez Votre Table
              </h2>
              <p className="font-sans text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Rejoignez-nous pour un moment de convivialité et de partage autour d'une cuisine 
                savoureuse et généreuse.
              </p>
              <Button asChild size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-primary font-sans text-lg px-8 py-6">
                <a
                  href="https://www.thefork.fr/restaurant/dadicook-r815372"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Réserver sur TheFork
                </a>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
}