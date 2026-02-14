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
      
            <svg className="w-6 h-6 text-[#8B6F47]" fill="currentColor" viewBox="0 0 448 512">
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
        <svg className="w-6 h-6 text-[#8B6F47]" fill="currentColor" viewBox="0 0 192 192">
          <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C91.224 44.745 85.1545 46.3804 79.8216 49.3624C72.5067 53.3565 66.6459 59.7837 62.8857 67.9683C61.1169 71.6783 59.9102 75.6584 59.2918 79.7889C58.9971 81.6246 58.7847 83.4805 58.6555 85.3491C58.5889 86.3329 58.5478 87.3207 58.532 88.3115C58.532 88.6835 58.532 89.0516 58.532 89.4158C58.532 89.7839 58.532 90.1481 58.532 90.5084C58.5478 91.4992 58.5889 92.487 58.6555 93.4708C58.7847 95.3394 58.9971 97.1953 59.2918 99.031C59.9102 103.161 61.1169 107.142 62.8857 110.852C66.6459 119.036 72.5067 125.464 79.8216 129.458C85.1545 132.44 91.224 134.075 97.5619 134.075C103.9 134.075 109.969 132.44 115.302 129.458C122.617 125.464 128.478 119.036 132.238 110.852C134.007 107.142 135.213 103.161 135.832 99.031C136.127 97.1953 136.339 95.3394 136.468 93.4708C136.535 92.487 136.576 91.4992 136.592 90.5084C136.592 90.1481 136.592 89.7839 136.592 89.4158C136.592 89.0516 136.592 88.6835 136.592 88.3115C136.576 87.3207 136.535 86.3329 136.468 85.3491C136.339 83.4805 136.127 81.6246 135.832 79.7889C135.213 75.6584 134.007 71.6783 132.238 67.9683C131.346 65.8559 130.227 63.8554 128.902 62.0024C127.577 60.1534 126.078 58.4482 124.427 56.9145C120.163 52.6855 114.81 49.5801 108.755 47.7287C104.682 46.4917 100.377 45.8416 95.9616 45.8416C91.5462 45.8416 87.2417 46.4917 83.1687 47.7287C77.1139 49.5801 71.761 52.6855 67.497 56.9145C65.8464 58.4482 64.3469 60.1534 63.0221 62.0024C61.6973 63.8554 60.5784 65.8559 59.6861 67.9683C57.9173 71.6783 56.7106 75.6584 56.0922 79.7889C55.7975 81.6246 55.5851 83.4805 55.4559 85.3491C55.3893 86.3329 55.3482 87.3207 55.3324 88.3115C55.3324 88.6835 55.3324 89.0516 55.3324 89.4158C55.3324 89.7839 55.3324 90.1481 55.3324 90.5084C55.3482 91.4992 55.3893 92.487 55.4559 93.4708C55.5851 95.3394 55.7975 97.1953 56.0922 99.031C56.7106 103.161 57.9173 107.142 59.6861 110.852C63.4464 119.036 69.3071 125.464 76.6221 129.458C81.955 132.44 88.0245 134.075 94.3624 134.075H94.5708C98.9862 134.075 103.291 133.425 107.364 132.188C113.419 130.336 118.772 127.231 123.036 123.002C124.687 121.468 126.186 119.763 127.511 117.914C128.836 116.061 129.955 114.061 130.847 111.948C132.616 108.238 133.823 104.258 134.441 100.127C134.736 98.2917 134.948 96.4358 135.077 94.5672C135.144 93.5834 135.185 92.5956 135.201 91.6048C135.201 91.2367 135.201 90.8686 135.201 90.5044C135.201 90.1363 135.201 89.7722 135.201 89.4118C135.185 88.421 135.144 87.4332 135.077 86.4494C134.948 84.5808 134.736 82.7249 134.441 80.8892C133.823 76.7587 132.616 72.7786 130.847 69.0686C127.087 60.8841 121.226 54.4568 113.911 50.4627C108.578 47.4807 102.508 45.8453 96.1705 45.8453H95.9621C91.5467 45.8453 87.2422 46.4954 83.1692 47.7324C77.1144 49.5838 71.7615 52.6892 67.4975 56.9182C65.8469 58.4519 64.3474 60.1571 63.0226 62.0061C61.6978 63.8591 60.5789 65.8596 59.6866 67.972C57.9178 71.682 56.7111 75.6621 56.0927 79.7926C55.798 81.6283 55.5856 83.4842 55.4564 85.3528C55.3898 86.3366 55.3487 87.3244 55.3329 88.3152C55.3329 88.6872 55.3329 89.0553 55.3329 89.4195C55.3329 89.7876 55.3329 90.1518 55.3329 90.5121C55.3487 91.5029 55.3898 92.4907 55.4564 93.4745C55.5856 95.3431 55.798 97.199 56.0927 99.0347C56.7111 103.165 57.9178 107.145 59.6866 110.855C63.4469 119.04 69.3076 125.467 76.6226 129.461C81.9555 132.443 88.025 134.079 94.3629 134.079H94.5713C100.909 134.079 106.979 132.443 112.311 129.461C119.626 125.467 125.487 119.04 129.247 110.855C131.016 107.145 132.223 103.165 132.841 99.0347C133.136 97.199 133.348 95.3431 133.477 93.4745C133.544 92.4907 133.585 91.5029 133.601 90.5121C133.601 90.1518 133.601 89.7876 133.601 89.4195C133.601 89.0553 133.601 88.6872 133.601 88.3152C133.585 87.3244 133.544 86.3366 133.477 85.3528C133.348 83.4842 133.136 81.6283 132.841 79.7926C132.223 75.6621 131.016 71.682 129.247 67.972C128.355 65.8596 127.236 63.8591 125.911 62.0061C124.586 60.1571 123.087 58.4519 121.436 56.9182C117.172 52.6892 111.819 49.5838 105.764 47.7324C101.691 46.4954 97.3867 45.8453 92.9713 45.8453H92.7629C88.3475 45.8453 84.043 46.4954 79.97 47.7324C73.9152 49.5838 68.5623 52.6892 64.2983 56.9182C62.6477 58.4519 61.1482 60.1571 59.8234 62.0061C58.4986 63.8591 57.3797 65.8596 56.4874 67.972C54.7186 71.682 53.5119 75.6621 52.8935 79.7926C52.5988 81.6283 52.3864 83.4842 52.2572 85.3528C52.1906 86.3366 52.1495 87.3244 52.1337 88.3152C52.1337 88.6872 52.1337 89.0553 52.1337 89.4195C52.1337 89.7876 52.1337 90.1518 52.1337 90.5121C52.1495 91.5029 52.1906 92.4907 52.2572 93.4745C52.3864 95.3431 52.5988 97.199 52.8935 99.0347C53.5119 103.165 54.7186 107.145 56.4874 110.855C60.2477 119.04 66.1084 125.467 73.4234 129.461C78.7563 132.443 84.8258 134.079 91.1637 134.079H91.3721C97.71 134.079 103.779 132.443 109.112 129.461C116.427 125.467 122.288 119.04 126.048 110.855C127.817 107.145 129.024 103.165 129.642 99.0347C129.937 97.199 130.149 95.3431 130.278 93.4745C130.345 92.4907 130.386 91.5029 130.402 90.5121C130.402 90.1518 130.402 89.7876 130.402 89.4195C130.402 89.0553 130.402 88.6872 130.402 88.3152C130.386 87.3244 130.345 86.3366 130.278 85.3528C130.149 83.4842 129.937 81.6283 129.642 79.7926C129.024 75.6621 127.817 71.682 126.048 67.972C125.156 65.8596 124.037 63.8591 122.712 62.0061C121.387 60.1571 119.888 58.4519 118.237 56.9182C113.973 52.6892 108.62 49.5838 102.565 47.7324C98.492 46.4954 94.1875 45.8453 89.7721 45.8453H89.5637C85.1483 45.8453 80.8438 46.4954 76.7708 47.7324C70.716 49.5838 65.3631 52.6892 61.0991 56.9182C59.4485 58.4519 57.949 60.1571 56.6242 62.0061C55.2994 63.8591 54.1805 65.8596 53.2882 67.972C51.5194 71.682 50.3127 75.6621 49.6943 79.7926C49.3996 81.6283 49.1872 83.4842 49.058 85.3528C48.9914 86.3366 48.9503 87.3244 48.9345 88.3152C48.9345 88.6872 48.9345 89.0553 48.9345 89.4195C48.9345 89.7876 48.9345 90.1518 48.9345 90.5121C48.9503 91.5029 48.9914 92.4907 49.058 93.4745C49.1872 95.3431 49.3996 97.199 49.6943 99.0347C50.3127 103.165 51.5194 107.145 53.2882 110.855C57.0485 119.04 62.9092 125.467 70.2242 129.461C75.5571 132.443 81.6266 134.079 87.9645 134.079H88.1729C94.5108 134.079 100.58 132.443 105.913 129.461C113.228 125.467 119.089 119.04 122.849 110.855C124.618 107.145 125.825 103.165 126.443 99.0347C126.738 97.199 126.95 95.3431 127.079 93.4745C127.146 92.4907 127.187 91.5029 127.203 90.5121C127.203 90.1518 127.203 89.7876 127.203 89.4195C127.203 89.0553 127.203 88.6872 127.203 88.3152C127.187 87.3244 127.146 86.3366 127.079 85.3528C126.95 83.4842 126.738 81.6283 126.443 79.7926C125.825 75.6621 124.618 71.682 122.849 67.972C121.957 65.8596 120.838 63.8591 119.513 62.0061C118.188 60.1571 116.689 58.4519 115.038 56.9182C110.774 52.6892 105.421 49.5838 99.3663 47.7324C95.2933 46.4954 90.9888 45.8453 86.5734 45.8453H86.365C81.9496 45.8453 77.6451 46.4954 73.5721 47.7324C67.5173 49.5838 62.1644 52.6892 57.9004 56.9182C56.2498 58.4519 54.7503 60.1571 53.4255 62.0061C52.1007 63.8591 50.9818 65.8596 50.0895 67.972C48.3207 71.682 47.114 75.6621 46.4956 79.7926C46.2009 81.6283 45.9885 83.4842 45.8593 85.3528C45.7927 86.3366 45.7516 87.3244 45.7358 88.3152C45.7358 88.6872 45.7358 89.0553 45.7358 89.4195C45.7358 89.7876 45.7358 90.1518 45.7358 90.5121C45.7516 91.5029 45.7927 92.4907 45.8593 93.4745C45.9885 95.3431 46.2009 97.199 46.4956 99.0347C47.114 103.165 48.3207 107.145 50.0895 110.855C53.8498 119.04 59.7105 125.467 67.0255 129.461C72.3584 132.443 78.4279 134.079 84.7658 134.079H84.9742C91.3121 134.079 97.3816 132.443 102.715 129.461C110.029 125.467 115.89 119.04 119.65 110.855C121.419 107.145 122.626 103.165 123.244 99.0347C123.539 97.199 123.751 95.3431 123.88 93.4745C123.947 92.4907 123.988 91.5029 124.004 90.5121C124.004 90.1518 124.004 89.7876 124.004 89.4195C124.004 89.0553 124.004 88.6872 124.004 88.3152C123.988 87.3244 123.947 86.3366 123.88 85.3528C123.751 83.4842 123.539 81.6283 123.244 79.7926C122.626 75.6621 121.419 71.682 119.65 67.972C118.758 65.8596 117.639 63.8591 116.314 62.0061C114.989 60.1571 113.49 58.4519 111.839 56.9182C107.575 52.6892 102.222 49.5838 96.1676 47.7324C92.0946 46.4954 87.7901 45.8453 83.3747 45.8453H83.1663C78.7509 45.8453 74.4464 46.4954 70.3734 47.7324C64.3186 49.5838 58.9657 52.6892 54.7017 56.9182C53.0511 58.4519 51.5516 60.1571 50.2268 62.0061C48.902 63.8591 47.7831 65.8596 46.8908 67.972" />
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