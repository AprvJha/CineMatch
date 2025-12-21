import { Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center gradient-hero overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-3xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/50 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Machine Learning Powered</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight opacity-0 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <span className="text-gradient">Hybrid Movie</span>
            <br />
            <span className="text-gradient-accent">Recommendation</span>
            <br />
            <span className="text-foreground">System</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl opacity-0 animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            Combining <span className="text-foreground font-medium">Content-Based Filtering</span> and{' '}
            <span className="text-foreground font-medium">Collaborative Filtering</span> to deliver 
            personalized movie recommendations with industry-leading accuracy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 opacity-0 animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <Link to="/recommendations">
              <Button variant="hero" size="xl">
                Try the Engine
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/architecture">
              <Button variant="outline" size="lg">
                View Architecture
              </Button>
            </Link>
          </div>

          {/* Quick Search */}
          <div className="relative max-w-md opacity-0 animate-slide-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for a movie..."
              className="pl-12 h-14 text-lg bg-secondary/50 border-border/50 backdrop-blur-sm focus:border-primary/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
