import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { MapPin, Phone, Mail, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Head from "next/head";

export default function Acces() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "DADICOOK",
    "image": "https://www.dadicook.fr/og-image.png",
    "telephone": "+33000000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Rue de la Gastronomie",
      "addressLocality": "Paris",
      "postalCode": "75001",
      "addressCountry": "FR"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "12:00",
        "closes": "14:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "19:00",
        "closes": "22:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "12:00",
        "closes": "15:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "19:00",
        "closes": "23:00"
      }
    ]
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
        title="Horaires & Accès - DADICOOK | Nous Trouver"
        description="Horaires d'ouverture, adresse et plan d'accès du restaurant DADICOOK. Venez nous rendre visite !"
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-16 bg-background">
            <div className="container">
              <div className="text-center mb-12">
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
                  Horaires & Accès
                </h1>
                <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">
                  Venez nous rendre visite et profiter de notre cuisine dans une ambiance chaleureuse
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div className="space-y-8">
                  <div className="bg-muted border border-border p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <Clock className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h2 className="font-serif text-3xl font-semibold mb-4">Horaires d'ouverture</h2>
                        <div className="space-y-3 font-sans text-base text-muted-foreground">
                          <div className="flex justify-between">
                            <span className="font-medium text-foreground">Lundi - Vendredi</span>
                          </div>
                          <div className="pl-4 space-y-1">
                            <p>Déjeuner : 12h00 - 14h30</p>
                            <p>Dîner : 19h00 - 22h30</p>
                          </div>
                          
                          <div className="flex justify-between mt-4">
                            <span className="font-medium text-foreground">Samedi - Dimanche</span>
                          </div>
                          <div className="pl-4 space-y-1">
                            <p>Déjeuner : 12h00 - 15h00</p>
                            <p>Dîner : 19h00 - 23h00</p>
                          </div>

                          <div className="mt-6 p-4 bg-background border-l-4 border-primary">
                            <p className="text-sm">
                              <Calendar className="inline h-4 w-4 mr-2" />
                              Dernière commande 30 minutes avant la fermeture
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted border border-border p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <MapPin className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h2 className="font-serif text-3xl font-semibold mb-4">Adresse</h2>
                        <address className="font-sans text-base text-muted-foreground not-italic space-y-3">
                          <p className="font-medium text-foreground">DADICOOK Restaurant</p>
                          <p>123 Rue de la Gastronomie</p>
                          <p>75001 Paris, France</p>
                        </address>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted border border-border p-8">
                    <div className="flex items-start gap-4">
                      <Phone className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h2 className="font-serif text-3xl font-semibold mb-4">Contact</h2>
                        <div className="space-y-3 font-sans text-base">
                          <div>
                            <p className="text-muted-foreground mb-1">Téléphone</p>
                            <a
                              href="tel:+33000000000"
                              className="text-foreground hover:text-primary transition-colors font-medium"
                            >
                              +33 0 00 00 00 00
                            </a>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Email</p>
                            <a
                              href="mailto:contact@dadicook.fr"
                              className="text-foreground hover:text-primary transition-colors font-medium"
                            >
                              contact@dadicook.fr
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-lg px-8 py-6 rounded-none uppercase tracking-wide">
                      <a
                        href="https://www.thefork.fr/restaurant/dadicook-r815372"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Réserver une table
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="lg:sticky lg:top-24 h-fit">
                  <div className="bg-muted border border-border p-2">
                    <div className="aspect-square relative">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9914406081493!2d2.3414!3d48.8566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzIzLjgiTiAywrAyMCcyOS4wIkU!5e0!3m2!1sen!2sfr!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-muted border border-border p-6">
                    <h3 className="font-serif text-xl font-semibold mb-4">Accès</h3>
                    <div className="space-y-3 font-sans text-sm text-muted-foreground">
                      <p>
                        <strong className="text-foreground">Métro :</strong> Ligne 1, 4, 7 - Station Châtelet
                      </p>
                      <p>
                        <strong className="text-foreground">Bus :</strong> Lignes 21, 38, 47, 58, 67, 70, 72, 74, 75, 76
                      </p>
                      <p>
                        <strong className="text-foreground">Parking :</strong> Parking Rivoli à 200m
                      </p>
                      <p>
                        <strong className="text-foreground">Vélib :</strong> Station à proximité
                      </p>
                    </div>
                  </div>
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