import { SEO } from "@/components/SEO";
import { CookieConsent } from "@/components/CookieConsent";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { Footer } from "@/components/Footer";
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
              <p className="text-primary uppercase tracking-wider text-xl mb-4 font-light">
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
            
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-foreground">
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

        {/* Social Media Section */}
        <section className="py-16 bg-gradient-to-b from-[#F5F1ED] to-white">
          <div className="container mx-auto px-4">
            <h2 className="font-cormorant text-4xl md:text-5xl text-center mb-12 text-[#8B6F47]">
              Suivez-nous
            </h2>
            <div className="flex justify-center gap-6 max-w-4xl mx-auto">

              href="https://www.instagram.com/dadicook.restaurant/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#8B6F47]/20"
      >
              <svg className="w-6 h-6 text-[#8B6F47]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="font-lato text-[#8B6F47] font-medium">Instagram</span>
            </a>


            href="https://www.facebook.com/dadicook/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#8B6F47]/20"
      >
            <svg className="w-6 h-6 text-[#8B6F47]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="font-lato text-[#8B6F47] font-medium">Facebook</span>
          </a>


          href="https://www.tiktok.com/@dadi_cook"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#8B6F47]/20"
      >
          <svg className="w-6 h-6 text-[#8B6F47]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
          <span className="font-lato text-[#8B6F47] font-medium">TikTok</span>
        </a>


        href="https://www.threads.com/@dadicook.restaurant/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#8B6F47]/20"
      >
        <svg className="w-6 h-6 text-[#8B6F47]" fill="currentColor" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
          <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.858-10.884 21.362-10.884h.229c7.596.07 13.478 2.117 17.469 6.086 3.016 3.004 5.012 7.058 5.938 12.046-6.256-1.39-13.047-1.88-20.344-1.47-20.81 1.164-35.43 13.439-34.265 28.742.803 10.531 8.56 18.614 19.297 20.122 2.477.35 4.982.525 7.486.525 8.512 0 16.802-2.136 23.72-6.112 8.425-4.846 13.84-11.955 15.66-20.568 4.156 2.509 7.25 5.455 8.93 8.661 3.655 6.991 3.507 19.662-6.337 31.259-1.374 1.62-2.853 3.145-4.437 4.556-11.265 10.034-27.136 15.566-44.683 15.566-17.545 0-33.417-5.532-44.68-15.565C17.796 168.798 11.64 149.378 11.64 126s6.155-42.798 17.323-55.895C40.227 60.007 56.098 54.475 73.644 54.475c17.545 0 33.417 5.532 44.683 15.565 11.167 11.097 17.323 30.518 17.323 53.895 0 3.422-.15 6.813-.447 10.156h-15.26c.25-3.328.377-6.7.377-10.156 0-19.64-5.063-35.618-14.665-46.212-9.395-10.363-22.953-16.03-38.192-15.954-15.03.074-28.49 5.833-37.865 16.215-9.611 10.638-14.916 26.595-14.916 44.95 0 18.357 5.305 34.313 14.916 44.952 9.374 10.382 22.834 16.14 37.865 16.215 15.24.076 28.797-5.591 38.192-15.954 1.863-2.058 3.595-4.24 5.181-6.532 13.462-15.828 13.925-33.541 8.985-45.424-4.12-9.9-13.646-17.522-27.504-22.096z" />
        </svg>
        <span className="font-lato text-[#8B6F47] font-medium">Threads</span>
      </a>
    </div >
  </div >
</section >
        {/* Footer */}
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
}