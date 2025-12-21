import { MainLayout } from '@/components/layout/MainLayout';
import { PerformanceCharts } from '@/components/analytics/PerformanceCharts';
import { StatCard } from '@/components/dashboard/StatCard';
import { useRecommendationLogic } from '@/hooks/useRecommendationLogic';
import { Target, TrendingDown, Gauge, Award } from 'lucide-react';

const Analytics = () => {
  const { getStats, getRatingDistribution } = useRecommendationLogic();
  const stats = getStats();
  const ratingDistribution = getRatingDistribution();

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-10">
        {/* Page Header */}
        <div className="mb-10 pt-10 lg:pt-0">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 opacity-0 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Model <span className="text-gradient-accent">Performance</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl opacity-0 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Detailed analytics and performance metrics of the hybrid recommendation system, 
            trained on the MovieLens dataset.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Best RMSE Score"
            value={stats.rmse.toFixed(2)}
            subtitle="SVD Algorithm"
            icon={Target}
            accentColor="primary"
            delay={100}
          />
          <StatCard
            title="Improvement"
            value="18%"
            subtitle="vs. Baseline"
            icon={TrendingDown}
            accentColor="green"
            delay={200}
          />
          <StatCard
            title="Training Epochs"
            value="20"
            subtitle="Converged"
            icon={Gauge}
            accentColor="blue"
            delay={300}
          />
          <StatCard
            title="Cross-Validation"
            value="5-Fold"
            subtitle="Robust evaluation"
            icon={Award}
            accentColor="orange"
            delay={400}
          />
        </div>

        {/* Charts */}
        <PerformanceCharts 
          rmse={stats.rmse} 
          ratingDistribution={ratingDistribution} 
        />
      </div>
    </MainLayout>
  );
};

export default Analytics;
