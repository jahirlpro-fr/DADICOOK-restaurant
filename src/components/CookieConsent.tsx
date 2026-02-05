import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-serif text-lg font-semibold mb-2">Cookies et confidentialité</h3>
            <p className="font-sans text-sm text-muted-foreground">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
              En poursuivant votre navigation, vous acceptez l'utilisation de cookies conformément à notre{" "}
              <a href="/politique-confidentialite" className="text-primary hover:underline">
                politique de confidentialité
              </a>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={declineCookies}
              className="font-sans"
            >
              Refuser
            </Button>
            <Button
              onClick={acceptCookies}
              className="bg-primary text-secondary hover:bg-primary/90 font-sans"
            >
              Accepter
            </Button>
          </div>
          <button
            onClick={declineCookies}
            className="absolute top-4 right-4 md:relative md:top-0 md:right-0"
            aria-label="Fermer"
          >
            <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}