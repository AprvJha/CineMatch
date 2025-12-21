import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Database, Brain, Layers, Cpu } from 'lucide-react';

const Architecture = () => {
  const architectureLayers = [
    {
      title: 'Data Layer',
      icon: Database,
      color: 'from-blue-500/20 to-transparent border-blue-500/30',
      iconBg: 'bg-blue-500/20 text-blue-400',
      items: [
        'MovieLens 100K Dataset',
        'User-Item Rating Matrix',
        'Movie Metadata (genres, year)',
        'TF-IDF Feature Vectors',
      ],
    },
    {
      title: 'Processing Layer',
      icon: Cpu,
      color: 'from-purple-500/20 to-transparent border-purple-500/30',
      iconBg: 'bg-purple-500/20 text-purple-400',
      items: [
        'Data Preprocessing & Cleaning',
        'Feature Engineering',
        'Train/Test Split (80/20)',
        'Cross-Validation (5-Fold)',
      ],
    },
    {
      title: 'Model Layer',
      icon: Brain,
      color: 'from-primary/20 to-transparent border-primary/30',
      iconBg: 'bg-primary/20 text-primary',
      items: [
        'Content-Based: TF-IDF + Cosine Similarity',
        'Collaborative: SVD Matrix Factorization',
        'Hybrid: Weighted Ensemble',
        'Hyperparameter Tuning',
      ],
    },
    {
      title: 'Output Layer',
      icon: Layers,
      color: 'from-emerald-500/20 to-transparent border-emerald-500/30',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      items: [
        'Top-N Recommendations',
        'Similarity Scores',
        'Explanation Generation',
        'API Response',
      ],
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-10">
        {/* Page Header */}
        <div className="mb-10 pt-10 lg:pt-0">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 opacity-0 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            System <span className="text-gradient-accent">Architecture</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl opacity-0 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            A deep dive into the technical architecture of the hybrid recommendation system.
          </p>
        </div>

        {/* Architecture Overview */}
        <Card className="gradient-card border-border/50 mb-12 opacity-0 animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          <CardHeader>
            <CardTitle className="text-foreground">Architecture Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              The hybrid recommendation system combines two powerful approaches to deliver 
              accurate and personalized movie recommendations:
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Content-Based Filtering
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block" />
              <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                Collaborative Filtering
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block" />
              <span className="px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30">
                Hybrid Ensemble
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Architecture Layers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {architectureLayers.map((layer, index) => (
            <Card 
              key={layer.title}
              className={`bg-gradient-to-br border overflow-hidden opacity-0 animate-slide-up ${layer.color}`}
              style={{ animationDelay: `${(index + 4) * 100}ms`, animationFillMode: 'forwards' }}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className={`p-3 rounded-xl ${layer.iconBg}`}>
                  <layer.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-foreground">{layer.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {layer.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Algorithm Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="gradient-card border-border/50 opacity-0 animate-slide-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
            <CardHeader>
              <CardTitle className="text-foreground">Content-Based Filtering</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Analyzes movie features to find similar items based on their attributes.
              </p>
              <div className="space-y-3 p-4 bg-secondary/50 rounded-xl border border-border/50">
                <code className="block text-sm text-foreground font-mono">
                  1. Extract features (genres, overview)
                </code>
                <code className="block text-sm text-foreground font-mono">
                  2. Apply TF-IDF Vectorization
                </code>
                <code className="block text-sm text-foreground font-mono">
                  3. Compute Cosine Similarity Matrix
                </code>
                <code className="block text-sm text-foreground font-mono">
                  4. Rank by similarity score
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border/50 opacity-0 animate-slide-up" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
            <CardHeader>
              <CardTitle className="text-foreground">Collaborative Filtering</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Leverages user behavior patterns to predict preferences.
              </p>
              <div className="space-y-3 p-4 bg-secondary/50 rounded-xl border border-border/50">
                <code className="block text-sm text-foreground font-mono">
                  1. Build User-Item Rating Matrix
                </code>
                <code className="block text-sm text-foreground font-mono">
                  2. Apply SVD Decomposition (k=100)
                </code>
                <code className="block text-sm text-foreground font-mono">
                  3. Predict missing ratings
                </code>
                <code className="block text-sm text-foreground font-mono">
                  4. Recommend top-N items
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Architecture;
