import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import Head from "next/head";

const menuStructuredData = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "name": "Menu DADICOOK",
  "description": "Menu du restaurant DADICOOK - Cuisine du monde",
  "hasMenuSection": [
    {
      "@type": "MenuSection",
      "name": "Entrées",
      "hasMenuItem": [
        {
          "@type": "MenuItem",
          "name": "Le Batbout",
          "description": "Pain marocain farci, herbes fraîches, épices douces",
          "offers": { "@type": "Offer", "price": "8", "priceCurrency": "EUR" }
        },
        {
          "@type": "MenuItem",
          "name": "Maakouda",
          "description": "Beignets de pommes de terre croustillants, sauce harissa",
          "offers": { "@type": "Offer", "price": "7", "priceCurrency": "EUR" }
        },
        {
          "@type": "MenuItem",
          "name": "Le Chiktay de Morue",
          "description": "Morue fraîche, citron confit, coriandre, huile d'olive",
          "offers": { "@type": "Offer", "price": "12", "priceCurrency": "EUR" }
        },
        {
          "@type": "MenuItem",
          "name": "Salade Boulgour",
          "description": "Boulgour, légumes croquants, menthe fraîche, vinaigrette citron",
          "offers": { "@type": "Offer", "price": "9", "priceCurrency": "EUR" }
        }
      ]
    }
  ]
};

const menuCategories = [
  {
    id: "entrees",
    name: "Entrées",
    items: [
      {
        name: "Le Batbout",
        description: "Pain marocain farci, herbes fraîches, épices douces",
        price: "8€"
      },
      {
        name: "Maakouda",
        description: "Beignets de pommes de terre croustillants, sauce harissa",
        price: "7€"
      },
      {
        name: "Le Chiktay de Morue",
        description: "Morue fraîche, citron confit, coriandre, huile d'olive",
        price: "12€",
        allergens: "Poisson"
      },
      {
        name: "Salade Boulgour",
        description: "Boulgour, légumes croquants, menthe fraîche, vinaigrette citron",
        price: "9€",
        allergens: "Gluten"
      }
    ]
  },
  {
    id: "plats",
    name: "Plats",
    items: [
      {
        name: "Poulet Satay",
        description: "Brochettes de poulet mariné, sauce cacahuète onctueuse, légumes grillés",
        price: "18€",
        allergens: "Cacahuètes"
      },
      {
        name: "Hampe de Bœuf Sauce Poivre",
        description: "Hampe de bœuf tendre, sauce poivre noir, pommes grenaille rôties",
        price: "22€"
      },
      {
        name: "Khychin",
        description: "Galette caucasienne farcie, pommes de terre, fromage, herbes",
        price: "16€",
        allergens: "Gluten, Produits laitiers"
      }
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      {
        name: "Cheesecake Vanille Rhubarbe",
        description: "Cheesecake crémeux, compotée de rhubarbe, biscuit croquant",
        price: "9€",
        allergens: "Gluten, Œufs, Produits laitiers"
      },
      {
        name: "Fondant au Chocolat Noisettes",
        description: "Cœur coulant chocolat noir, éclats de noisettes torréfiées, glace vanille",
        price: "10€",
        allergens: "Gluten, Œufs, Fruits à coque"
      },
      {
        name: "Tarte Mangue Passion Cacahuète",
        description: "Tarte exotique, mangue fraîche, passion acidulée, crumble cacahuète",
        price: "9€",
        allergens: "Gluten, Œufs, Cacahuètes"
      },
      {
        name: "Tiramisu",
        description: "Tiramisu traditionnel, mascarpone onctueux, café italien, cacao amer",
        price: "8€",
        allergens: "Gluten, Œufs, Produits laitiers"
      }
    ]
  },
  {
    id: "boissons",
    name: "Boissons",
    items: [
      {
        name: "Mocktail Dadi",
        description: "Cocktail sans alcool maison, fruits frais, sirop artisanal",
        price: "7€"
      },
      {
        name: "Mocktail Didine",
        description: "Cocktail sans alcool signature, agrumes, menthe, gingembre",
        price: "7€"
      }
    ]
  }
];

export default function Menu() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(menuStructuredData) }}
        />
      </Head>
      <SEO
        title="Notre Menu - DADICOOK | Cuisine du Monde à Montpellier"
        description="Découvrez notre carte : entrées authentiques, plats savoureux et desserts gourmands. Cuisine du monde avec des produits frais et de qualité."
        image="/DADICOOK-MENU-1.jpg"
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero Section - Elegant Header */}
          <section className="relative bg-primary py-32">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary"></div>
            <div className="container mx-auto px-4 max-w-4xl relative z-10">
              <div className="text-center">
                <p className="text-accent/80 uppercase tracking-[0.3em] text-sm mb-6 font-light">
                  Notre Menu
                </p>
                <h1 className="font-serif text-5xl md:text-7xl text-accent mb-6 font-light">
                  Découvrez nos Créations
                </h1>
                <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
                <p className="text-accent/90 text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto">
                  Une sélection de plats inspirés des quatre coins du monde, préparés avec passion et des ingrédients d'exception
                </p>
              </div>
            </div>
          </section>

          {/* Menu Categories */}
          <section className="py-24 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
              {menuCategories.map((category, categoryIndex) => (
                <div
                  key={category.id}
                  className={`${categoryIndex !== 0 ? "mt-24" : ""}`}
                >
                  {/* Category Title with Underline Animation */}
                  <div className="mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-accent mb-4 inline-block relative group">
                      {category.name}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-100 transition-transform duration-300"></span>
                    </h2>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-10">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="group relative"
                      >
                        <div className="flex items-start justify-between gap-8">
                          {/* Left: Name & Description */}
                          <div className="flex-1">
                            <h3 className="font-serif text-2xl md:text-3xl text-accent mb-3 relative inline-block">
                              {item.name}
                              <span className="absolute bottom-0 left-0 w-0 h-px bg-accent/50 group-hover:w-full transition-all duration-500"></span>
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-2">
                              {item.description}
                            </p>
                            {item.allergens && (
                              <p className="text-xs text-muted-foreground/70 italic">
                                Allergènes : {item.allergens}
                              </p>
                            )}
                          </div>

                          {/* Right: Price with Different Font */}
                          <div className="flex-shrink-0">
                            <span className="font-mono text-2xl md:text-3xl text-accent font-semibold">
                              {item.price}
                            </span>
                          </div>
                        </div>

                        {/* Decorative Line */}
                        <div className="mt-6 h-px bg-border"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Réservez votre Table
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Laissez-vous tenter par notre cuisine du monde et réservez dès maintenant votre table pour une expérience culinaire inoubliable.
              </p>
              <a
                href="https://www.thefork.fr/restaurant/dadicook-r815372"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground px-10 py-4 font-semibold hover:bg-primary/90 transition-all duration-300 text-lg"
              >
                Réserver maintenant
              </a>
            </div>
          </section>
        </main>

        <Footer />
        <CookieConsent />
      </div>
    </>
  );
}