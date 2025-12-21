import { useState } from 'react';
import { Star, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Recommendation, Movie } from '@/hooks/useRecommendationLogic';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MovieCardProps {
  movie: Movie | Recommendation;
  index?: number;
  showScore?: boolean;
}

export const MovieCard = ({ movie, index = 0, showScore = false }: MovieCardProps) => {
  const [imageError, setImageError] = useState(false);
  const recommendation = 'score' in movie ? movie : null;

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden card-glow border-border/50 opacity-0 animate-slide-up cursor-pointer",
        "aspect-[2/3] bg-secondary"
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {/* Poster Image */}
      <div className="absolute inset-0">
        {!imageError ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-6xl">🎬</span>
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 movie-card-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Rating Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full glass border border-border/50">
        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
        <span className="text-xs font-semibold text-foreground">{movie.rating.toFixed(1)}</span>
      </div>

      {/* Score Badge (for recommendations) */}
      {showScore && recommendation && (
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full gradient-accent">
          <span className="text-xs font-bold text-primary-foreground">
            {(recommendation.score * 100).toFixed(0)}% Match
          </span>
        </div>
      )}

      {/* Content (appears on hover) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-bold text-foreground text-lg leading-tight mb-1">
          {movie.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          {movie.year} • {movie.genres.slice(0, 2).join(', ')}
        </p>
        
        {recommendation && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded-lg cursor-help">
                <Info className="h-3 w-3 text-primary" />
                <span className="line-clamp-2">Why recommended?</span>
              </div>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="max-w-[300px] glass border-border/50"
            >
              <p className="text-sm">{recommendation.reason}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </Card>
  );
};
