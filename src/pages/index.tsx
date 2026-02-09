import { SEO } from "@/components/SEO";
import { CookieConsent } from "@/components/CookieConsent";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "DADICOOK",
  "image": "https://www.dadicook.fr/og-image.png",
  "description": "Restaurant bistronomique proposant une cuisine du monde raffinée et authentique à Montpellier",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "26 Rue de l'Université",
    "addressLocality": "Montpellier",
    "postalCode": "34000",
    "addressCountry": "FR"
  },
  "telephone": "+33749499555",
  "url": "https://www.dadicook.fr",
  "servesCuisine": "Cuisine du monde",
  "priceRange": "€€",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Wednesday", "Thursday"],
      "opens": "11:30",
      "closes": "14:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Wednesday", "Thursday", "Saturday", "Sunday"],
      "opens": "19:00",
      "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Friday",
      "opens": "19:00",
      "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "11:30",
      "closes": "14:30"
    }
  ]
};

export default function Home() {
  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Galerie", href: "/galerie" },
    { label: "Horaires & Accès", href: "/acces" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <SEO
        title="DADICOOK - Restaurant Cuisine du Monde à Montpellier"
        description="Découvrez DADICOOK, restaurant bistronomique à Montpellier proposant une cuisine du monde raffinée dans une ambiance chaleureuse et conviviale."
        image="/og-image.png"
      />
      
      <div className="min-h-screen bg-background">
        {/* Split Screen Layout */}
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Panel - Navigation */}
          <div className="lg:w-1/2 bg-primary flex flex-col justify-between p-8 lg:p-12 relative">
            {/* Bouton Réserver en haut à gauche */}
            <div className="absolute top-6 left-6 z-50">
              <a
                href="https://www.thefork.fr/restaurant/dadicook-r815372"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-primary-foreground px-6 py-3 font-semibold hover:bg-accent/90 transition-all duration-300 border border-accent/20"
              >
                Réserver une table
              </a>
            </div>

            {/* Logo centré */}
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="space-y-6">
                {/* LOGO1 - Version complète */}
                <Image
                  src="/LOGO1.svg"
                  alt="DADICOOK Logo"
                  width={228}
                  height={134}
                  className="w-auto h-auto"
                  priority
                />
                
                {/* LOGO2 - Version horizontale */}
                <Image
                  src="/LOGO2.svg"
                  alt="DADICOOK Restaurant"
                  width={320}
                  height={48}
                  className="w-auto h-auto"
                />
                
                {/* LOGO3 - Version compacte */}
                <Image
                  src="/LOGO3.svg"
                  alt="DADICOOK"
                  width={262}
                  height={40}
                  className="w-auto h-auto"
                />
              </div>
            </div>

            {/* Navigation verticale */}
            <nav className="flex-1 flex items-center justify-center">
              <ul className="space-y-8">
                {navItems.map((item) => (
                  <li key={item.label} className="text-center">
                    <Link
                      href={item.href}
                      className="text-3xl font-serif text-accent hover:text-accent/80 transition-all duration-300 relative inline-block group"
                    >
                      {item.label}
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[1px] w-0 bg-accent group-hover:w-[125%] transition-all duration-500 ease-out" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Panel - Banner Image */}
          <div className="lg:w-1/2 relative h-[50vh] lg:h-screen">
            <Image
              src="/Bannie_re_late_rale.jpg"
              alt="DADICOOK Restaurant"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Philosophy Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary/60 uppercase tracking-wider text-sm mb-4 font-light">
                Notre Philosophie
              </p>
              <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-6">
                Un Voyage Culinaire
              </h2>
              <div className="w-24 h-0.5 bg-primary mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Chez DADICOOK, nous célébrons la diversité culinaire mondiale dans une ambiance chaleureuse et conviviale. Chaque plat est une invitation au voyage, préparé avec passion et des produits de qualité soigneusement sélectionnés.
              </p>
            </div>

            {/* Cards with dish images */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 - Cuisine Authentique */}
              <div className="relative overflow-hidden group h-80">
                <Image
                  src="/Poulet_satay.jpg"
                  alt="Cuisine Authentique"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
                  <h3 className="text-accent text-2xl font-serif mb-3">
                    Cuisine Authentique
                  </h3>
                  <p className="text-accent/90 text-sm leading-relaxed">
                    Des recettes traditionnelles revisitées avec créativité et savoir-faire.
                  </p>
                </div>
              </div>

              {/* Card 2 - Produits Frais */}
              <div className="relative overflow-hidden group h-80">
                <Image
                  src="/Salade_boulgour.jpg"
                  alt="Produits Frais"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
                  <h3 className="text-accent text-2xl font-serif mb-3">
                    Produits Frais
                  </h3>
                  <p className="text-accent/90 text-sm leading-relaxed">
                    Une sélection rigoureuse d'ingrédients de qualité pour des saveurs incomparables.
                  </p>
                </div>
              </div>

              {/* Card 3 - Ambiance Chaleureuse */}
              <div className="relative overflow-hidden group h-80">
                <Image
                  src="/Hampe_de_boeuf_sauce_poivre.jpg"
                  alt="Ambiance Chaleureuse"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
                  <h3 className="text-accent text-2xl font-serif mb-3">
                    Ambiance Chaleureuse
                  </h3>
                  <p className="text-accent/90 text-sm leading-relaxed">
                    Un cadre accueillant et convivial pour partager des moments inoubliables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Signature Dishes Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="/Khychin.jpg"
                  alt="Plat signature"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover shadow-2xl"
                />
              </div>
              <div>
                <p className="text-primary/60 uppercase tracking-wider text-sm mb-4 font-light">
                  Découvrez
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                  Une Expérience Culinaire Unique
                </h2>
                <div className="w-24 h-0.5 bg-primary mb-8"></div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Notre cuisine célèbre les saveurs du monde entier. Du Batbout marocain aux délices asiatiques, chaque plat raconte une histoire et éveille vos papilles.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Laissez-vous transporter par nos créations, préparées avec passion et un savoir-faire artisanal, dans une ambiance conviviale et chaleureuse.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/menu"
                    className="px-8 py-4 bg-primary text-accent font-medium hover:bg-primary/90 transition-colors duration-300"
                  >
                    Voir le menu
                  </Link>
                  <Link
                    href="https://www.thefork.fr/restaurant/dadicook-r815372"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-accent text-primary font-medium hover:bg-accent/90 transition-colors duration-300"
                  >
                    Réserver une table
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsCarousel />

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Contact */}
              <div>
                <h3 className="text-accent text-xl font-serif mb-4">Contact</h3>
                <div className="space-y-2 text-accent/80">
                  <p>+33 7 49 49 95 55</p>
                  <p>contact@dadicook.fr</p>
                </div>
              </div>

              {/* Horaires */}
              <div>
                <h3 className="text-accent text-xl font-serif mb-4">Horaires</h3>
                <div className="space-y-1 text-accent/80 text-sm">
                  <p>Mer-Jeu : 11h30-14h30, 19h-23h</p>
                  <p>Ven : 19h-23h</p>
                  <p>Sam-Dim : 11h30-14h30, 19h-23h</p>
                  <p>Lun-Mar : Fermé</p>
                </div>
              </div>

              {/* Liens */}
              <div>
                <h3 className="text-accent text-xl font-serif mb-4">Liens</h3>
                <div className="space-y-2">
                  <Link href="/mentions-legales" className="block text-accent/80 hover:text-accent transition-colors">
                    Mentions légales
                  </Link>
                  <Link href="/politique-confidentialite" className="block text-accent/80 hover:text-accent transition-colors">
                    Politique de confidentialité
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-accent/20 pt-8 text-center text-accent/60 text-sm">
              <p>&copy; 2026 DADICOOK. Tous droits réservés.</p>
            </div>
          </div>
        </footer>

        <CookieConsent />
      </div>
    </>
  );
}