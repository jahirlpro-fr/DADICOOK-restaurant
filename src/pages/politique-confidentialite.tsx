import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

export default function PolitiqueConfidentialite() {
  return (
    <>
      <SEO
        title="Politique de Confidentialité - DADICOOK"
        description="Politique de confidentialité et protection des données personnelles du restaurant DADICOOK"
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-16 bg-background">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-8">
                  Politique de Confidentialité
                </h1>

                <div className="space-y-8 font-sans text-base text-muted-foreground">
                  <div>
                    <p className="mb-4">
                      DADICOOK accorde une grande importance à la protection de vos données personnelles. 
                      Cette politique de confidentialité vous informe sur la manière dont nous collectons, 
                      utilisons et protégeons vos informations personnelles, conformément au Règlement 
                      Général sur la Protection des Données (RGPD).
                    </p>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      1. Responsable du traitement des données
                    </h2>
                    <p className="mb-2">
                      Le responsable du traitement des données personnelles est :
                    </p>
                    <ul className="list-none space-y-1 ml-4">
                      <li>DADICOOK</li>
                      <li>26 Rue de l'univeristé 34000 MONTPELLIER</li>
                      <li>Email : contact@dadicook.fr</li>
                      <li>Téléphone : +33 </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      2. Données collectées
                    </h2>
                    <p className="mb-4">
                      Nous collectons les données personnelles suivantes :
                    </p>
                    
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      Via le formulaire de contact :
                    </h3>
                    <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                      <li>Nom et prénom</li>
                      <li>Adresse email</li>
                      <li>Numéro de téléphone (optionnel)</li>
                      <li>Message</li>
                    </ul>

                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      Via les cookies et outils d'analyse :
                    </h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Données de navigation (pages visitées, durée de visite)</li>
                      <li>Données techniques (adresse IP, type de navigateur, système d'exploitation)</li>
                      <li>Données statistiques anonymisées via Google Analytics</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      3. Finalités du traitement
                    </h2>
                    <p className="mb-2">
                      Vos données personnelles sont collectées pour les finalités suivantes :
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Répondre à vos demandes de contact</li>
                      <li>Gérer et améliorer nos services</li>
                      <li>Analyser la fréquentation du site et améliorer l'expérience utilisateur</li>
                      <li>Respecter nos obligations légales</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      4. Base légale du traitement
                    </h2>
                    <p className="mb-2">
                      Le traitement de vos données personnelles repose sur :
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Votre consentement (formulaire de contact, cookies)</li>
                      <li>L'exécution de mesures précontractuelles (réservations)</li>
                      <li>Notre intérêt légitime (amélioration de nos services, sécurité)</li>
                      <li>Le respect d'obligations légales</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      5. Destinataires des données
                    </h2>
                    <p className="mb-2">
                      Vos données personnelles sont destinées :
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Au personnel autorisé de DADICOOK</li>
                      <li>À nos prestataires techniques (hébergement, analytics) sous contrat de confidentialité</li>
                      <li>Aux autorités compétentes sur demande légale</li>
                    </ul>
                    <p className="mt-4">
                      Vos données ne sont jamais vendues à des tiers.
                    </p>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      6. Durée de conservation
                    </h2>
                    <p className="mb-2">
                      Nous conservons vos données personnelles pendant les durées suivantes :
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Données du formulaire de contact : 3 ans à compter du dernier contact</li>
                      <li>Données de navigation : 25 mois (Google Analytics)</li>
                      <li>Consentement cookies : 13 mois</li>
                    </ul>
                    <p className="mt-4">
                      Au-delà de ces durées, vos données sont supprimées ou anonymisées.
                    </p>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      7. Vos droits
                    </h2>
                    <p className="mb-4">
                      Conformément au RGPD, vous disposez des droits suivants :
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles</li>
                      <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
                      <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
                      <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
                      <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                      <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                      <li><strong>Droit de retrait du consentement</strong> : retirer votre consentement à tout moment</li>
                    </ul>
                    <p className="mt-4">
                      Pour exercer vos droits, contactez-nous à : contact@dadicook.fr
                    </p>
                    <p className="mt-2">
                      Vous disposez également du droit de déposer une réclamation auprès de la CNIL 
                      (Commission Nationale de l'Informatique et des Libertés) : 
                      <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                        www.cnil.fr
                      </a>
                    </p>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      8. Sécurité des données
                    </h2>
                    <p>
                      Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
                      pour protéger vos données personnelles contre la destruction accidentelle ou 
                      illicite, la perte, l'altération, la divulgation ou l'accès non autorisé :
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Chiffrement SSL/TLS (HTTPS)</li>
                      <li>Accès restreint aux données personnelles</li>
                      <li>Sauvegardes régulières et sécurisées</li>
                      <li>Mise à jour régulière des systèmes de sécurité</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      9. Cookies
                    </h2>
                    <p className="mb-4">
                      Notre site utilise des cookies pour améliorer votre expérience et analyser 
                      le trafic. Vous pouvez gérer vos préférences via notre bannière de consentement.
                    </p>
                    
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      Types de cookies utilisés :
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Cookies essentiels</strong> : Nécessaires au fonctionnement du site 
                        (ne nécessitent pas de consentement)
                      </li>
                      <li>
                        <strong>Cookies analytiques</strong> : Google Analytics pour mesurer l'audience 
                        (avec votre consentement)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      10. Modifications
                    </h2>
                    <p>
                      Nous nous réservons le droit de modifier cette politique de confidentialité à 
                      tout moment. La version en vigueur est celle publiée sur cette page avec la 
                      date de dernière mise à jour.
                    </p>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      11. Contact
                    </h2>
                    <p>
                      Pour toute question concernant cette politique de confidentialité ou l'exercice 
                      de vos droits :
                    </p>
                    <ul className="list-none space-y-1 ml-4 mt-2">
                      <li>Email : contact@dadicook.fr</li>
                      <li>Téléphone : +33 </li>
                      <li>Courrier : DADICOOK, 26 Rue de l'univeristé 34000 MONTPELLIER</li>
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