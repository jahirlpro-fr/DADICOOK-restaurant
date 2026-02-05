import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import Image from "next/image";
import { Leaf } from "lucide-react";
import Head from "next/head";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  allergens?: string[];
  vegetarian?: boolean;
  image?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuData: MenuSection[] = [
  {
    title: "Entrées",
    items: [
      {
        name: "Salade César revisitée",
        description: "Romaine croquante, poulet grillé, parmesan, croûtons maison, sauce César",
        price: "12€",
        allergens: ["Gluten", "Œufs", "Lait"],
      },
      {
        name: "Tartare de saumon",
        description: "Saumon frais, avocat, citron vert, coriandre, toast de pain grillé",
        price: "14€",
        allergens: ["Poisson", "Gluten"],
      },
      {
        name: "Velouté de légumes",
        description: "Velouté de saison, crème fraîche, herbes aromatiques",
        price: "9€",
        allergens: ["Lait"],
        vegetarian: true,
      },
      {
        name: "Carpaccio de bœuf",
        description: "Fines tranches de bœuf, roquette, copeaux de parmesan, huile de truffe",
        price: "15€",
        allergens: ["Lait"],
      },
    ],
  },
  {
    title: "Plats",
    items: [
      {
        name: "Filet de bœuf",
        description: "Filet de bœuf grillé, purée de pommes de terre, légumes de saison, sauce au poivre",
        price: "28€",
        allergens: ["Lait"],
      },
      {
        name: "Risotto aux champignons",
        description: "Risotto crémeux, champignons de saison, parmesan, truffe",
        price: "22€",
        allergens: ["Lait"],
        vegetarian: true,
      },
      {
        name: "Pavé de saumon",
        description: "Saumon grillé, écrasé de pommes de terre, légumes verts, beurre citronné",
        price: "24€",
        allergens: ["Poisson", "Lait"],
      },
      {
        name: "Tajine d'agneau",
        description: "Agneau confit, légumes mijotés, fruits secs, semoule parfumée",
        price: "26€",
        allergens: ["Gluten"],
      },
      {
        name: "Curry de légumes",
        description: "Légumes de saison, lait de coco, épices douces, riz basmati",
        price: "19€",
        vegetarian: true,
      },
    ],
  },
  {
    title: "Desserts",
    items: [
      {
        name: "Tiramisu maison",
        description: "Biscuits imbibés de café, mascarpone, cacao",
        price: "8€",
        allergens: ["Gluten", "Œufs", "Lait"],
      },
      {
        name: "Fondant au chocolat",
        description: "Cœur coulant, glace vanille, coulis de fruits rouges",
        price: "9€",
        allergens: ["Gluten", "Œufs", "Lait"],
      },
      {
        name: "Tarte citron meringuée",
        description: "Pâte sablée, crème citron, meringue italienne",
        price: "8€",
        allergens: ["Gluten", "Œufs", "Lait"],
      },
      {
        name: "Salade de fruits frais",
        description: "Fruits de saison, sirop léger, menthe fraîche",
        price: "7€",
        vegetarian: true,
      },
    ],
  },
  {
    title: "Formules",
    items: [
      {
        name: "Formule Déjeuner",
        description: "Entrée + Plat ou Plat + Dessert",
        price: "24€",
      },
      {
        name: "Formule Découverte",
        description: "Entrée + Plat + Dessert",
        price: "32€",
      },
      {
        name: "Menu Dégustation",
        description: "5 plats surprise du chef avec accord mets et vins",
        price: "55€",
        allergens: ["Variable selon le menu du jour"],
      },
    ],
  },
];

export default function Menu() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Menu DADICOOK",
    "mainEntityOfPage": "https://www.dadicook.fr/menu",
    "inLanguage": "fr",
    "hasMenuSection": menuData.map(section => ({
      "@type": "MenuSection",
      "name": section.title,
      "hasMenuItem": section.items.map(item => ({
        "@type": "MenuItem",
        "name": item.name,
        "description": item.description,
        "price": item.price,
        "priceCurrency": "EUR"
      }))
    }))
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <SEO
        title="Notre Menu - DADICOOK | Cuisine du Monde"
        description="Découvrez notre carte : entrées raffinées, plats savoureux, desserts gourmands. Cuisine du monde avec des produits frais et de qualité."
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="/DADICOOK-MENU-2.jpg"
                alt="Menu DADICOOK"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
            </div>
            
            <div className="relative z-10 container text-center">
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-secondary mb-4">
                Notre Menu
              </h1>
              <p className="font-sans text-xl text-secondary/90 max-w-2xl mx-auto">
                Découvrez nos créations culinaires, préparées avec passion et des produits de qualité
              </p>
            </div>
          </section>

          <section className="py-16 bg-background">
            <div className="container">
              <div className="max-w-6xl mx-auto space-y-16">
                {menuData.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <div className="text-center mb-12">
                      <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                        {section.title}
                      </h2>
                      <div className="w-24 h-1 bg-primary mx-auto" />
                    </div>

                    <div className="grid gap-8">
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="bg-muted border border-border p-6 md:p-8 hover:border-primary transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="font-serif text-2xl font-semibold text-foreground">
                                  {item.name}
                                </h3>
                                {item.vegetarian && (
                                  <Leaf className="h-5 w-5 text-green-600" aria-label="Végétarien" />
                                )}
                              </div>
                              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-3">
                                {item.description}
                              </p>
                              {item.allergens && item.allergens.length > 0 && (
                                <p className="font-sans text-sm text-muted-foreground italic">
                                  Allergènes : {item.allergens.join(", ")}
                                </p>
                              )}
                            </div>
                            <div className="md:text-right">
                              <span className="font-sans text-2xl font-bold text-primary">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 p-8 bg-muted border border-border max-w-4xl mx-auto">
                <h3 className="font-serif text-2xl font-semibold text-center mb-4">
                  Informations importantes
                </h3>
                <div className="space-y-3 font-sans text-sm text-muted-foreground">
                  <p>
                    • Tous nos plats sont préparés sur place avec des produits frais et de saison.
                  </p>
                  <p>
                    • Les prix sont susceptibles de varier selon la disponibilité des produits.
                  </p>
                  <p>
                    • Pour toute allergie ou régime alimentaire spécifique, n'hésitez pas à nous consulter.
                  </p>
                  <p>
                    • Nos formules sont disponibles du lundi au vendredi midi uniquement.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
}