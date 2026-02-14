import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact - DADICOOK | Contactez Notre Restaurant à Montpellier"
        description="Contactez DADICOOK pour toute demande d'information, réservation ou événement privé. Nous sommes à votre écoute."
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
                  Contact
                </p>
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-accent mb-6 font-light tracking-tight">
                  Nous Contacter
                </h1>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-accent/30 w-24"></div>
                  <div className="w-2 h-2 bg-accent rotate-45"></div>
                  <div className="h-px bg-accent/30 w-24"></div>
                </div>
                <p className="text-accent/90 text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto">
                  Une question, une réservation ou un événement ? Nous sommes à votre écoute
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-24 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid md:grid-cols-2 gap-16">
                {/* Left Column - Contact Form */}
                <div className="space-y-8">
                  <div>
                    <h2 className="font-serif text-3xl text-muted-foreground mb-2">Envoyez-nous un message</h2>
                    <p className="text-muted-foreground">
                      Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                    </p>
                  </div>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                          Prénom
                        </label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Votre prénom"
                          className="w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                          Nom
                        </label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Votre nom"
                          className="w-full"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        className="w-full"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Téléphone (optionnel)
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Sujet
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Sujet de votre message"
                        className="w-full"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Votre message..."
                        rows={6}
                        className="w-full"
                        required
                      />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour répondre à votre demande conformément à notre{" "}
                      <Link href="/politique-confidentialite" className="text-accent hover:underline">
                        politique de confidentialité
                      </Link>
                      .
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold"
                    >
                      Envoyer le message
                    </Button>
                  </form>
                </div>

                {/* Right Column - Contact Info */}
                <div className="space-y-8">
                  <div>
                    <h2 className="font-serif text-3xl text-accent mb-6">Nos Coordonnées</h2>
                  </div>

                  {/* Téléphone */}
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-serif text-xl text-accent mb-2">Téléphone</h3>
                      <a 
                        href="tel:+33749499555"
                        className="text-muted-foreground hover:text-accent transition-colors text-lg"
                      >
                        07 49 49 95 55
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-serif text-xl text-accent mb-2">Email</h3>
                      <a 
                        href="mailto:contact@dadicook.fr"
                        className="text-muted-foreground hover:text-accent transition-colors text-lg"
                      >
                        contact@dadicook.fr
                      </a>
                    </div>
                  </div>

                  {/* Adresse */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-serif text-xl text-accent mb-2">Adresse</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        26 Rue de l'Université<br />
                        34000 Montpellier<br />
                        France
                      </p>
                    </div>
                  </div>

                  {/* Réservation */}
                  <div className="mt-12 p-8 bg-muted/30">
                    <h3 className="font-serif text-2xl text-accent mb-4">Réserver une table</h3>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      Pour réserver une table, utilisez notre système de réservation en ligne via TheFork.
                    </p>
                    <a
                      href="https://www.thefork.fr/restaurant/dadicook-r815372"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-primary text-primary-foreground px-8 py-4 font-semibold hover:bg-primary/90 transition-all duration-300 text-lg"
                    >
                      Réserver maintenant
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-muted/30 border-t border-primary/10">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="font-serif text-3xl text-center text-primary mb-10">Questions Fréquentes</h2>
              
              <div className="space-y-6">
                <div className="bg-background p-6 rounded-lg shadow-sm border border-primary/10">
                  <h3 className="font-serif text-xl text-foreground mb-2">Vos viandes sont-elles Halal ?</h3>
                  <p className="text-muted-foreground">Oui, absolument. Toutes nos viandes sont certifiées 100% Halal et sélectionnées avec soin pour garantir la meilleure qualité.</p>
                </div>
                
                <div className="bg-background p-6 rounded-lg shadow-sm border border-primary/10">
                  <h3 className="font-serif text-xl text-foreground mb-2">Proposez-vous des options végétariennes ?</h3>
                  <p className="text-muted-foreground">Oui, notre carte inclut plusieurs options végétariennes savoureuses, préparées avec des produits frais de saison.</p>
                </div>
                
                <div className="bg-background p-6 rounded-lg shadow-sm border border-primary/10">
                  <h3 className="font-serif text-xl text-foreground mb-2">Faut-il réserver à l'avance ?</h3>
                  <p className="text-muted-foreground">Il est recommandé de réserver, surtout les soirs de week-end, pour vous garantir une table. Vous pouvez réserver directement sur notre site via le bouton "Réserver".</p>
                </div>
                
                <div className="bg-background p-6 rounded-lg shadow-sm border border-primary/10">
                  <h3 className="font-serif text-xl text-foreground mb-2">Acceptez-vous les tickets restaurant ?</h3>
                  <p className="text-muted-foreground">Oui, nous acceptons les tickets restaurant (carte et papier) ainsi que les espèces et cartes bancaires.</p>
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