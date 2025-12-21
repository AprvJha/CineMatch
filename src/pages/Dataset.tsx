import { MainLayout } from '@/components/layout/MainLayout';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { useRecommendationLogic } from '@/hooks/useRecommendationLogic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Film, Users, Star } from 'lucide-react';

const Dataset = () => {
  const { allMovies, getStats } = useRecommendationLogic();
  const stats = getStats();

  const datasetInfo = [
    { label: 'Total Movies', value: stats.totalMovies.toLocaleString(), icon: Film },
    { label: 'Total Users', value: stats.activeUsers.toLocaleString(), icon: Users },
    { label: 'Total Ratings', value: stats.totalRatings.toLocaleString(), icon: Star },
    { label: 'Dataset', value: 'MovieLens', icon: Database },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-10">
        {/* Page Header */}
        <div className="mb-10 pt-10 lg:pt-0">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 opacity-0 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Dataset <span className="text-gradient-accent">Explorer</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl opacity-0 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Explore the MovieLens dataset used to train our recommendation models.
          </p>
        </div>

        {/* Dataset Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {datasetInfo.map((item, index) => (
            <Card 
              key={item.label}
              className="gradient-card border-border/50 opacity-0 animate-slide-up"
              style={{ animationDelay: `${(index + 1) * 100}ms`, animationFillMode: 'forwards' }}
            >
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/20">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About MovieLens */}
        <Card className="gradient-card border-border/50 mb-12 opacity-0 animate-slide-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
          <CardHeader>
            <CardTitle className="text-foreground">About MovieLens Dataset</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              MovieLens is a web-based recommender system and online community that recommends movies 
              for its users to watch. The dataset used in this project is the{' '}
              <span className="text-foreground font-medium">MovieLens 100K</span> dataset, which contains:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>100,000 ratings from 600+ users on 9,000+ movies</li>
              <li>Ratings on a scale of 0.5 to 5.0</li>
              <li>Movie metadata including genres and release year</li>
              <li>Collected by GroupLens Research at the University of Minnesota</li>
            </ul>
          </CardContent>
        </Card>

        {/* Sample Movies */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Sample Movies</h2>
          <MovieGrid movies={allMovies} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dataset;
