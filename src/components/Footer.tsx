import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="bg-primary px-6 py-3 inline-block mb-4">
              <span className="font-serif text-2xl font-bold text-secondary">DADICOOK</span>
            </div>
            <p className="font-sans text-sm text-muted-foreground">
              Cuisine du monde dans une ambiance chaleureuse et conviviale.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 font-sans text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="text-muted-foreground hover:text-primary transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/acces" className="text-muted-foreground hover:text-primary transition-colors">
                  Horaires & Accès
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 font-sans text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Adresse à définir</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+33000000000" className="text-muted-foreground hover:text-primary transition-colors">
                  +33 0 00 00 00 00
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:contact@dadicook.fr" className="text-muted-foreground hover:text-primary transition-colors">
                  contact@dadicook.fr
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Horaires</h3>
            <ul className="space-y-2 font-sans text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p>Lundi - Vendredi : 12h - 14h30 & 19h - 22h30</p>
                  <p>Samedi - Dimanche : 12h - 15h & 19h - 23h</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} DADICOOK. Tous droits réservés.
            </p>
            <div className="flex gap-6 font-sans text-sm">
              <Link href="/mentions-legales" className="text-muted-foreground hover:text-primary transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="text-muted-foreground hover:text-primary transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}