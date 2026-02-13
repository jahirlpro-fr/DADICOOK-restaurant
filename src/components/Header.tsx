import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Galerie", href: "/galerie" },
    { name: "Horaires & Accès", href: "/acces" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-secondary/20">
      <nav className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/LOGO1.svg"
              alt="DADICOOK"
              width={40}
              height={40}
              className="object-contain [filter: brightness(0) saturate(100%) invert(55%) sepia(45%) saturate(650%) hue-rotate(15deg) brightness(95%) contrast(85%)]"
            />
            <Image
              src="/LOGO2.svg"
              alt="DADICOOK Restaurant"
              width={160}
              height={24}
              className="object-contain [filter: brightness(0) saturate(100%) invert(55%) sepia(45%) saturate(650%) hue-rotate(15deg) brightness(95%) contrast(85%)]"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-sans text-base font-medium text-[#E8DCC4] hover:text-[#E8DCC4]/80 transition-colors tracking-wide uppercase"
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="bg-secondary text-primary hover:bg-secondary/90 rounded-none font-sans text-sm uppercase tracking-wide">
            <a
              href="https://www.thefork.fr/restaurant/dadicook-r815372"
              target="_blank"
              rel="noopener noreferrer"
            >
              Réserver
            </a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-secondary" />
          ) : (
            <Menu className="h-6 w-6 text-secondary" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary border-t border-secondary/20">
          <div className="container space-y-1 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 font-sans text-lg font-medium text-[#E8DCC4] hover:text-[#E8DCC4]/80 hover:bg-primary-dark transition-colors uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button asChild className="w-full bg-secondary text-primary hover:bg-secondary/90 rounded-none font-sans text-sm uppercase tracking-wide">
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
        </div>
      )}
    </header>
  );
}