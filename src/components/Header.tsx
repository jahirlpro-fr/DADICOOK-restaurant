import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="bg-primary px-6 py-3">
            <span className="font-serif text-2xl font-bold text-secondary">DADICOOK</span>
          </div>
        </Link>

        <div className="hidden md:flex md:items-center md:space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-sans text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="bg-primary text-secondary hover:bg-primary/90">
            <a
              href="https://www.thefork.fr/restaurant/dadicook-r815372"
              target="_blank"
              rel="noopener noreferrer"
            >
              Réserver une table
            </a>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="container space-y-1 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 font-sans text-base font-medium text-foreground hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button asChild className="w-full bg-primary text-secondary hover:bg-primary/90">
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