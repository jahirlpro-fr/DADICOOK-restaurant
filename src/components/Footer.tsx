import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-primary text-secondary border-t border-secondary/20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <Image
                src="/LOGO1.svg"
                alt="DADICOOK"
                width={60}
                height={60}
                className="[filter:brightness(0)_saturate(100%)_invert(89%)_sepia(12%)_saturate(531%)_hue-rotate(343deg)_brightness(98%)_contrast(90%)]"
              />
              <Image
                src="/LOGO2.svg"
                alt="DADICOOK Restaurant"
                width={200}
                height={30}
                className="[filter:brightness(0)_saturate(100%)_invert(89%)_sepia(12%)_saturate(531%)_hue-rotate(343deg)_brightness(98%)_contrast(90%)]"
              />
            </div>
            <p className="text-sm text-accent/80 max-w-xs">
              Restaurant bistronomique proposant une cuisine du monde dans une ambiance chaleureuse et conviviale.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 font-sans text-sm">
              <li>
                <Link href="/" className="text-secondary/80 hover:text-secondary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-secondary/80 hover:text-secondary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="text-secondary/80 hover:text-secondary transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/acces" className="text-secondary/80 hover:text-secondary transition-colors">
                  Horaires & Accès
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary/80 hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-secondary/80">
              <p>+33 7 49 49 95 55</p>
              <p>contact@dadicook.fr</p>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Horaires
            </h3>
            <ul className="space-y-2 font-sans text-sm text-secondary/80">
              <li>
                <span className="font-medium text-secondary">Lundi :</span> Fermé
              </li>
              <li>
                <span className="font-medium text-secondary">Mar-Ven :</span> 12h-14h30, 19h-22h30
              </li>
              <li>
                <span className="font-medium text-secondary">Samedi :</span> 12h-15h, 19h-23h
              </li>
              <li>
                <span className="font-medium text-secondary">Dimanche :</span> Fermé
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-secondary/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-sm text-secondary/70">
            <p>© {new Date().getFullYear()} DADICOOK. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link
                href="/mentions-legales"
                className="hover:text-secondary transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-confidentialite"
                className="hover:text-secondary transition-colors"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}