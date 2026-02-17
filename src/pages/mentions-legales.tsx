import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import Link from "next/link";

export default function MentionsLegales() {
  return (
    <>
      <SEO
        title="Mentions Légales - DADICOOK"
        description="Mentions légales du restaurant DADICOOK"
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-16 bg-background">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-8">
                  Mentions Légales
                </h1>

                <div className="space-y-8 font-sans text-base text-muted-foreground">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      1. Éditeur du site
                    </h2>
                    <p className="mb-2">
                      Le site dadicook.fr est édité par :
                    </p>
                    <ul className="list-none space-y-1 ml-4">
                      <li>Raison sociale : DADICOOK</li>
                      <li>Forme juridique : SARL</li>
                      <li>Capital social : 500,00€</li>
                      <li>Siège social : 26 Rue de l'univeristé 34000 MONTPELLIER</li>
                      <li>Numéro SIRET : 98318001900017</li>
                      <li>RCS : </li>
                      <li>Email : contact@dadicook.fr</li>
                      <li>Téléphone : +33 </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      2. Directeur de la publication
                    </h2>
                    <p>
                      Le directeur de la publication du site est : Jeremy GABORY
                    </p>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      3. Hébergement
                    </h2>
                    <p className="mb-2">
                      Le site dadicook.fr est hébergé par :
                    </p>
                    <ul className="list-none space-y-1 ml-4">
                      <li>Raison sociale : Vercel Inc.</li>
                      <li>Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, USA</li>
                      <li>Site web : https://vercel.com</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      4. Propriété intellectuelle
                    </h2>
                    <p className="mb-4">
                      L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, etc.) 
                      est la propriété exclusive de DADICOOK, sauf mention contraire.
                    </p>
                    <p>
                      Toute reproduction, représentation, modification, publication, adaptation de tout 
                      ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est 
                      interdite, sauf autorisation écrite préalable de DADICOOK.
                    </p>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      5. Liens hypertextes
                    </h2>
                    <p>
                      Le site peut contenir des liens vers d'autres sites web. DADICOOK n'exerce aucun 
                      contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                    </p>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      6. Protection des données personnelles
                    </h2>
                    <p>
                      Pour toute information concernant le traitement de vos données personnelles, 
                      veuillez consulter notre{" "}
                      <Link href="/politique-confidentialite" className="text-primary hover:underline">
                        Politique de confidentialité
                      </Link>.
                    </p>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      7. Cookies
                    </h2>
                    <p>
                      Le site utilise des cookies pour améliorer l'expérience utilisateur et analyser 
                      le trafic. Vous pouvez gérer vos préférences en matière de cookies via notre 
                      bannière de consentement.
                    </p>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      8. Limitation de responsabilité
                    </h2>
                    <p className="mb-4">
                      DADICOOK s'efforce d'assurer au mieux l'exactitude et la mise à jour des 
                      informations diffusées sur ce site. Toutefois, DADICOOK ne peut garantir 
                      l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
                    </p>
                    <p>
                      DADICOOK ne pourra être tenue responsable des dommages directs ou indirects 
                      résultant de l'accès au site ou de l'utilisation de ce dernier.
                    </p>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      9. Droit applicable
                    </h2>
                    <p>
                      Les présentes mentions légales sont soumises au droit français. En cas de litige, 
                      les tribunaux français seront seuls compétents.
                    </p>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      10. Contact
                    </h2>
                    <p>
                      Pour toute question concernant les mentions légales, vous pouvez nous contacter :
                    </p>
                    <ul className="list-none space-y-1 ml-4 mt-2">
                      <li>Par email : contact@dadicook.fr</li>
                      <li>Par téléphone : +33 0 00 00 00 00</li>
                      <li>Par courrier : 26 Rue de l'univeristé 34000 MONTPELLIER</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm italic">
                      Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { 
                        year: "numeric", 
                        month: "long", 
                        day: "numeric" 
                      })}
                    </p>
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