import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
}

interface ReviewsCarouselProps {
  reviews: Review[];
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (reviews.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-card border border-border p-8 md:p-12">
        <div className="mb-6">
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < reviews[currentIndex].rating
                    ? "fill-primary text-primary"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <p className="font-sans text-lg text-foreground leading-relaxed mb-4">
            "{reviews[currentIndex].text}"
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-serif text-base font-semibold text-foreground">
                {reviews[currentIndex].author}
              </p>
              <p className="font-sans text-sm text-muted-foreground">
                {reviews[currentIndex].date}
              </p>
            </div>
            <span className="font-sans text-sm text-muted-foreground">
              {currentIndex + 1} / {reviews.length}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevReview}
            className="h-10 w-10"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextReview}
            className="h-10 w-10"
            aria-label="Avis suivant"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="text-center mt-8">
        <Button asChild variant="outline" className="font-sans">
          <a
            href="https://www.google.com/search?sca_esv=3184b47af171a3f6&sxsrf=ANbL-n7wQU2hgZMgZxa9eHc9nX4y5fOGOw:1770215294343&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOfydF3XcEmX2Gk2o_ugjmsB67JTT46njevEqMEYQ-EVXitdG6I9cvzJCxZMU1huaLLvWdyQsa8YFueGIm3d8gJSt-HjSBjGKSPB_ivqO9GiIojoy_w%3D%3D&q=Dadicook+Restaurant+Avis&sa=X&ved=2ahUKEwjYia7uhcCSAxX_VqQEHaKjA7sQ0bkNegQIMRAF&biw=1280&bih=598&dpr=1.5&aic=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir tous les avis
          </a>
        </Button>
      </div>
    </div>
  );
}