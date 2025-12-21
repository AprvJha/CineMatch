import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RatingDistribution } from '@/hooks/useRecommendationLogic';

interface PerformanceChartsProps {
  rmse: number;
  ratingDistribution: RatingDistribution[];
}

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];

export const PerformanceCharts = ({ rmse, ratingDistribution }: PerformanceChartsProps) => {
  // Model comparison data
  const modelData = [
    { name: 'SVD', rmse: 0.94, color: 'hsl(357, 92%, 47%)' },
    { name: 'KNN', rmse: 1.02, color: 'hsl(220, 70%, 50%)' },
    { name: 'NMF', rmse: 0.98, color: 'hsl(150, 70%, 45%)' },
    { name: 'Baseline', rmse: 1.15, color: 'hsl(45, 70%, 50%)' },
  ];

  // Training progress data
  const trainingData = [
    { epoch: 1, rmse: 1.45 },
    { epoch: 5, rmse: 1.20 },
    { epoch: 10, rmse: 1.05 },
    { epoch: 15, rmse: 0.98 },
    { epoch: 20, rmse: 0.94 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Model Comparison */}
      <Card className="gradient-card border-border/50 opacity-0 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
        <CardHeader>
          <CardTitle className="text-foreground">Model Comparison</CardTitle>
          <CardDescription>RMSE scores across different algorithms</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 1.5]} stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={60} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Bar 
                dataKey="rmse" 
                fill="hsl(var(--primary))" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Training Progress */}
      <Card className="gradient-card border-border/50 opacity-0 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
        <CardHeader>
          <CardTitle className="text-foreground">Training Progress</CardTitle>
          <CardDescription>RMSE reduction over epochs</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trainingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="epoch" stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={[0.8, 1.6]} stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="rmse" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Rating Distribution Bar */}
      <Card className="gradient-card border-border/50 opacity-0 animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
        <CardHeader>
          <CardTitle className="text-foreground">Rating Distribution</CardTitle>
          <CardDescription>User ratings across the MovieLens dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ratingDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="rating" 
                stroke="hsl(var(--muted-foreground))"
                tickFormatter={(value) => `${value}★`}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [value.toLocaleString(), 'Count']}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {ratingDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Rating Pie Chart */}
      <Card className="gradient-card border-border/50 opacity-0 animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
        <CardHeader>
          <CardTitle className="text-foreground">Rating Breakdown</CardTitle>
          <CardDescription>Percentage of ratings by star level</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ratingDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="count"
                nameKey="rating"
                label={({ rating, percent }) => `${rating}★ (${(percent * 100).toFixed(0)}%)`}
                labelLine={false}
              >
                {ratingDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [value.toLocaleString(), 'Ratings']}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
