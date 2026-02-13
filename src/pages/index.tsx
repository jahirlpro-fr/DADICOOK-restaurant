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
                className="inline-block bg-[#EDD5C8] text-[#8B6F47] px-8 py-2 font-sans text-sm uppercase tracking-wide hover:bg-[#E8D0C0] transition-all duration-300"
              >
                Réserver une table
              </a>
            </div>

            {/* Logo centré */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
              <div className="flex flex-col items-center gap-8">
                {/* LOGO1 - Version complète */}
                <Image
                  src="/LOGO1.svg"
                  alt="DADICOOK - Cuisine du Monde"
                  width={228}
                  height={134}
                  className="w-auto h-auto [filter:brightness(0)_saturate(100%)_invert(89%)_sepia(12%)_saturate(531%)_hue-rotate(343deg)_brightness(98%)_contrast(90%)]"
                  priority
                />
                
                {/* LOGO2 - Version horizontale */}
                <Image
                  src="/LOGO2.svg"
                  alt="DADICOOK Restaurant"
                  width={320}
                  height={48}
                  className="w-auto h-auto [filter:brightness(0)_saturate(100%)_invert(89%)_sepia(12%)_saturate(531%)_hue-rotate(343deg)_brightness(98%)_contrast(90%)]"
                />
                
                {/* LOGO3 - Version compacte */}
                <Image
                  src="/LOGO3.svg"
                  alt="DADICOOK"
                  width={262}
                  height={40}
                  className="w-auto h-auto [filter:brightness(0)_saturate(100%)_invert(89%)_sepia(12%)_saturate(531%)_hue-rotate(343deg)_brightness(98%)_contrast(90%)]"
                />
              </div>
            </div>

            {/* Navigation verticale */}
            <nav className="flex-1 flex items-center justify-center">
              <ul className="flex flex-col items-center gap-8 text-2xl font-light tracking-wider text-[#EDD5C8]">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                        href={item.href}
                        className="relative group text-[#EDD5C8] transition-colors duration-300 hover:text-accent"
                    >
                      {item.label}
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-[140%]"></span>
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
              <p className="text-primary/60 uppercase tracking-wider text-xl mb-4 font-light">
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
              <div className="space-y-4">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src="/Poulet_satay.jpg"
                    alt="Cuisine Authentique"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-serif text-foreground">
                    Cuisine Authentique
                  </h3>
                  <p className="text-muted-foreground">
                    Des recettes traditionnelles revisitées avec créativité et savoir-faire.
                  </p>
                </div>
              </div>

              {/* Card 2 - Produits Frais */}
              <div className="space-y-4">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src="/Salade_boulgour.jpg"
                    alt="Produits Frais"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-serif text-foreground">
                    Produits Frais
                  </h3>
                  <p className="text-muted-foreground">
                    Une sélection rigoureuse d'ingrédients de qualité pour des saveurs incomparables.
                  </p>
                </div>
              </div>

              {/* Card 3 - Ambiance Chaleureuse */}
              <div className="space-y-4">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src="/Image_interieur_restaurant.jpg"
                    alt="Ambiance Chaleureuse"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-serif text-foreground">
                    Ambiance Chaleureuse
                  </h3>
                  <p className="text-muted-foreground">
                    Un cadre accueillant et convivial pour partager des moments inoubliables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Expérience Culinaire avec image */}
        <section className="min-h-screen grid md:grid-cols-2">
          {/* Image */}
          <div className="relative h-[50vh] md:h-auto">
            <Image
              src="/Le_chiktay_de_morue.jpg"
              alt="Chiktay de morue"
              fill
              className="object-cover"
            />
          </div>

          {/* Contenu */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-16 bg-background">
            <div className="w-16 h-[2px] bg-primary mb-6"></div>
            
            <h2 className="text-4xl md:text-5xl font-light mb-8 text-foreground">
              Une Expérience Culinaire Unique
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Chez DADICOOK, nous célébrons la diversité culinaire mondiale. Du Maroc à l'Asie, 
              de la Méditerranée aux Caraïbes, chaque plat est une invitation au voyage, préparé 
              avec passion et authenticité.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Savourez nos créations dans une ambiance chaleureuse et conviviale, où chaque 
              détail est pensé pour votre confort. Laissez-vous transporter par nos saveurs 
              du monde dans un cadre accueillant qui invite au partage.
            </p>

            <div className="flex gap-4">
              <Link 
                href="/menu"
                className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Voir le menu
              </Link>
              <Link 
                href="https://module.lafourchette.com/fr_FR/module/463969-a9311"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Réserver une table
              </Link>
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