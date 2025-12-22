import { useState } from 'react';
import { Search, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Movie, RecommendationStrategy } from '@/hooks/useRecommendationLogic';
import { cn } from '@/lib/utils';

interface RecommendationFormProps {
  movies: Movie[];
  onSubmit: (movie: Movie | null, userId: number, strategy: RecommendationStrategy) => void;
  isLoading?: boolean;
}

const strategies: { value: RecommendationStrategy; label: string; description: string }[] = [
  { 
    value: 'content-based', 
    label: 'Content-Based', 
    description: 'Uses TF-IDF & Cosine Similarity' 
  },
  { 
    value: 'collaborative', 
    label: 'Collaborative', 
    description: 'Uses SVD Matrix Factorization' 
  },
  { 
    value: 'hybrid', 
    label: 'Hybrid', 
    description: 'Best of both worlds' 
  },
];

export const RecommendationForm = ({ movies, onSubmit, isLoading }: RecommendationFormProps) => {
  const [selectedMovieId, setSelectedMovieId] = useState<string>('');
  const [userId, setUserId] = useState<string>('1');
  const [strategy, setStrategy] = useState<RecommendationStrategy>('hybrid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedMovie = movies.find(m => m.id.toString() === selectedMovieId) || null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userIdNum = parseInt(userId) || 1;
    onSubmit(selectedMovie, userIdNum, strategy);
  };

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Sparkles className="h-5 w-5 text-primary" />
          Generate Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Movie Selection */}
          <div className="space-y-2">
            <Label htmlFor="movie" className="text-foreground">Target Movie (Optional)</Label>
            <Select value={selectedMovieId} onValueChange={setSelectedMovieId}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select a movie..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-border max-h-[300px]">
                <div className="p-2 sticky top-0 bg-card">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search movies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-secondary border-border"
                    />
                  </div>
                </div>
                {filteredMovies.map((movie) => (
                  <SelectItem key={movie.id} value={movie.id.toString()}>
                    <span className="flex items-center gap-2">
                      <span>{movie.title}</span>
                      <span className="text-muted-foreground text-xs">({movie.year})</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* User ID */}
          <div className="space-y-2">
            <Label htmlFor="userId" className="text-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              User ID (1-943)
            </Label>
            <Input
              id="userId"
              type="number"
              min="1"
              max="943"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID..."
              className="bg-secondary border-border"
            />
          </div>

          {/* Strategy Selection */}
          <div className="space-y-3">
            <Label className="text-foreground">Recommendation Strategy</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {strategies.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setStrategy(s.value)}
                  className={cn(
                    "p-4 rounded-xl border text-left transition-all duration-300",
                    strategy === s.value
                      ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                      : "border-border bg-secondary hover:border-primary/50"
                  )}
                >
                  <p className="font-semibold text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⚙️</span>
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Get Recommendations
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
