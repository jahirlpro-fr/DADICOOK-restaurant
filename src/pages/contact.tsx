import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        consent: false,
      });

      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <>
      <SEO
        title="Contact - DADICOOK | Contactez-nous"
        description="Contactez le restaurant DADICOOK pour toute question, demande de renseignement ou réservation de groupe."
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-16 bg-background">
            <div className="container">
              <div className="text-center mb-12">
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
                  Contactez-nous
                </h1>
                <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">
                  Une question ? Une demande particulière ? N'hésitez pas à nous contacter
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                <div className="lg:col-span-2">
                  <div className="bg-muted border border-border p-8 md:p-12">
                    <h2 className="font-serif text-3xl font-semibold mb-6">
                      Envoyez-nous un message
                    </h2>

                    {submitStatus === "success" && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 font-sans text-sm">
                        Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 font-sans text-sm">
                        Une erreur est survenue. Veuillez réessayer ou nous contacter directement par téléphone.
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="font-sans text-sm font-medium mb-2 block">
                            Nom complet *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="font-sans"
                            placeholder="Votre nom"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="font-sans text-sm font-medium mb-2 block">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="font-sans"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="phone" className="font-sans text-sm font-medium mb-2 block">
                            Téléphone
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="font-sans"
                            placeholder="+33 0 00 00 00 00"
                          />
                        </div>

                        <div>
                          <Label htmlFor="subject" className="font-sans text-sm font-medium mb-2 block">
                            Objet *
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="font-sans"
                            placeholder="Sujet de votre message"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message" className="font-sans text-sm font-medium mb-2 block">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="font-sans min-h-[200px]"
                          placeholder="Votre message..."
                        />
                      </div>

                      <div className="flex items-start gap-3">
                        <input
                          id="consent"
                          name="consent"
                          type="checkbox"
                          required
                          checked={formData.consent}
                          onChange={handleChange}
                          className="mt-1"
                        />
                        <Label htmlFor="consent" className="font-sans text-sm text-muted-foreground">
                          J'accepte que mes données soient utilisées pour me recontacter dans le cadre de ma demande.
                          Consultez notre{" "}
                          <a href="/politique-confidentialite" className="text-primary hover:underline">
                            politique de confidentialité
                          </a>.
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full md:w-auto bg-primary text-secondary hover:bg-primary/90 font-sans"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                      </Button>
                    </form>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-muted border border-border p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-serif text-xl font-semibold mb-2">Adresse</h3>
                        <address className="font-sans text-sm text-muted-foreground not-italic">
                          <p>123 Rue de la Gastronomie</p>
                          <p>75001 Paris, France</p>
                        </address>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted border border-border p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-serif text-xl font-semibold mb-2">Téléphone</h3>
                        <a
                          href="tel:+33000000000"
                          className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          +33 0 00 00 00 00
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted border border-border p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-serif text-xl font-semibold mb-2">Email</h3>
                        <a
                          href="mailto:contact@dadicook.fr"
                          className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          contact@dadicook.fr
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted border border-border p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-serif text-xl font-semibold mb-2">Horaires</h3>
                        <div className="font-sans text-sm text-muted-foreground space-y-1">
                          <p>Lun - Ven : 12h - 14h30 & 19h - 22h30</p>
                          <p>Sam - Dim : 12h - 15h & 19h - 23h</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary p-6 text-center">
                    <h3 className="font-serif text-2xl font-semibold text-secondary mb-4">
                      Réservez votre table
                    </h3>
                    <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-primary font-sans w-full">
                      <a
                        href="https://www.thefork.fr/restaurant/dadicook-r815372"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Réserver sur TheFork
                      </a>
                    </Button>
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