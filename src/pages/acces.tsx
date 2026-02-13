import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { MapPin, Phone, Mail, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Acces() {
  return (
    <>
      <SEO
        title="Horaires & Accès - DADICOOK | Restaurant à Montpellier"
        description="Découvrez nos horaires d'ouverture et notre adresse : 26 Rue de l'Université, 34000 Montpellier. Réservez votre table dès maintenant."
        image="/Image_interieur_restaurant.jpg"
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
                  Horaires & Accès
                </p>
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-accent mb-6 font-light tracking-tight">
                  Nous Trouver
                </h1>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-accent/30 w-24"></div>
                  <div className="w-2 h-2 bg-accent rotate-45"></div>
                  <div className="h-px bg-accent/30 w-24"></div>
                </div>
                <p className="text-accent/90 text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto">
                  Venez découvrir notre restaurant au cœur de Montpellier
                </p>
              </div>
            </div>
          </section>

          {/* Info Section */}
          <section className="py-24 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid md:grid-cols-2 gap-16">
                {/* Left Column - Contact Info */}
                <div className="space-y-12">
                  {/* Adresse */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="font-serif text-2xl text-accent mb-2">Adresse</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          26 Rue de l'Université<br />
                          34000 Montpellier<br />
                          France
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="font-serif text-2xl text-accent mb-2">Téléphone</h2>
                        <a 
                          href="tel:+33749499555"
                          className="text-muted-foreground text-lg hover:text-accent transition-colors"
                        >
                          07 49 49 95 55
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="font-serif text-2xl text-accent mb-2">Email</h2>
                        <a 
                          href="mailto:contact@dadicook.fr"
                          className="text-muted-foreground text-lg hover:text-accent transition-colors"
                        >
                          contact@dadicook.fr
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Horaires */}
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h2 className="font-serif text-2xl text-accent mb-6">Horaires d'Ouverture</h2>
                      
                      <div className="space-y-4">
                        {/* Mercredi */}
                        <div className="flex justify-between items-start py-3 border-b border-border">
                          <span className="text-foreground font-medium text-lg">Mercredi</span>
                          <div className="text-right text-muted-foreground text-lg">
                            <div>11:30 - 14:30</div>
                            <div>19:00 - 23:00</div>
                          </div>
                        </div>

                        {/* Jeudi */}
                        <div className="flex justify-between items-start py-3 border-b border-border">
                          <span className="text-foreground font-medium text-lg">Jeudi</span>
                          <div className="text-right text-muted-foreground text-lg">
                            <div>11:30 - 14:30</div>
                            <div>19:00 - 23:00</div>
                          </div>
                        </div>

                        {/* Vendredi */}
                        <div className="flex justify-between items-start py-3 border-b border-border">
                          <span className="text-foreground font-medium text-lg">Vendredi</span>
                          <div className="text-right text-muted-foreground text-lg">
                            <div>19:00 - 23:00</div>
                          </div>
                        </div>

                        {/* Samedi */}
                        <div className="flex justify-between items-start py-3 border-b border-border">
                          <span className="text-foreground font-medium text-lg">Samedi</span>
                          <div className="text-right text-muted-foreground text-lg">
                            <div>11:30 - 14:30</div>
                            <div>19:00 - 23:00</div>
                          </div>
                        </div>

                        {/* Dimanche */}
                        <div className="flex justify-between items-start py-3 border-b border-border">
                          <span className="text-foreground font-medium text-lg">Dimanche</span>
                          <div className="text-right text-muted-foreground text-lg">
                            <div>11:30 - 14:30</div>
                            <div>19:00 - 23:00</div>
                          </div>
                        </div>

                        {/* Lundi & Mardi */}
                        <div className="flex justify-between items-start py-3 border-b border-border">
                          <span className="text-foreground font-medium text-lg">Lundi & Mardi</span>
                          <span className="text-muted-foreground italic text-lg">Fermé</span>
                        </div>
                      </div>

                      <div className="mt-8 p-6 bg-muted/30">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Nous vous recommandons de réserver à l'avance, particulièrement pour les week-ends et soirées.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Google Maps Section */}
          <section className="py-0">
            <div className="w-full h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.123456789!2d3.8767890156781234!3d43.6112422791234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6af0123456789%3A0x987654321abcdef!2s26%20Rue%20de%20l'Université%2C%2034000%20Montpellier!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation DADICOOK sur Google Maps"
              ></iframe>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 font-light">
                Réservez Votre Table
              </h2>
              <p className="text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Profitez d'une expérience culinaire unique dans notre restaurant à Montpellier.
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
    </>
  );
}