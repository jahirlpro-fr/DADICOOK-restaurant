import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    author: "Sophie M.",
    rating: 5,
    date: "Il y a 2 semaines",
    text: "Excellente découverte ! Les plats sont savoureux et l'ambiance chaleureuse. Le personnel est aux petits soins. Je recommande vivement le poulet satay et le tiramisu maison.",
    avatar: "SM"
  },
  {
    id: 2,
    author: "Thomas L.",
    rating: 5,
    date: "Il y a 1 mois",
    text: "Un vrai coup de cœur ! La cuisine est authentique et raffinée. Les saveurs sont au rendez-vous et les portions généreuses. Le rapport qualité-prix est excellent.",
    avatar: "TL"
  },
  {
    id: 3,
    author: "Marie D.",
    rating: 5,
    date: "Il y a 1 mois",
    text: "Ambiance cosy et accueillante, parfait pour un dîner entre amis. Les plats sont délicieux et bien présentés. Service impeccable. À découvrir absolument !",
    avatar: "MD"
  },
  {
    id: 4,
    author: "Alexandre P.",
    rating: 5,
    date: "Il y a 2 mois",
    text: "Une expérience culinaire remarquable. Les recettes sont originales et les produits de qualité. Le cadre est très agréable. Je reviendrai sans hésiter !",
    avatar: "AP"
  },
  {
    id: 5,
    author: "Isabelle R.",
    rating: 5,
    date: "Il y a 2 mois",
    text: "Restaurant chaleureux avec une cuisine savoureuse. J'ai particulièrement apprécié le chiktay de morue et le fondant au chocolat. Service attentionné et souriant.",
    avatar: "IR"
  }
];

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <div className="py-20 px-4 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ce que disent nos clients
          </h2>
          <p className="font-sans text-lg text-foreground/70 max-w-2xl mx-auto">
            Découvrez les avis authentiques de nos clients sur Google
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 border border-primary/10 shadow-lg">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(currentReview.rating)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[#E8D4A0] text-[#E8D4A0]" />
              ))}
            </div>

            {/* Review Text */}
            <p className="font-sans text-lg text-foreground/80 text-center mb-6 leading-relaxed min-h-[120px]">
              &ldquo;{currentReview.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary text-secondary flex items-center justify-center font-sans font-semibold text-lg">
                {currentReview.avatar}
              </div>
              <div className="text-left">
                <p className="font-sans font-semibold text-foreground">{currentReview.author}</p>
                <p className="font-sans text-sm text-foreground/60">{currentReview.date}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevReview}
                className="p-2 hover:bg-primary/10 transition-colors"
                aria-label="Avis précédent"
              >
                <ChevronLeft className="h-6 w-6 text-primary" />
              </button>
              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 transition-all ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-primary/30 hover:bg-primary/50"
                    }`}
                    aria-label={`Aller à l'avis ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextReview}
                className="p-2 hover:bg-primary/10 transition-colors"
                aria-label="Avis suivant"
              >
                <ChevronRight className="h-6 w-6 text-primary" />
              </button>
            </div>
          </div>

          {/* CTA vers Google */}
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-secondary font-sans uppercase tracking-wide">
              <a
                href="https://www.google.com/search?q=Dadicook+Restaurant+Avis"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir tous les avis sur Google
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}