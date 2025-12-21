import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  accentColor?: 'primary' | 'green' | 'blue' | 'orange';
  delay?: number;
}

const accentClasses = {
  primary: 'from-primary/20 to-transparent border-primary/30',
  green: 'from-emerald-500/20 to-transparent border-emerald-500/30',
  blue: 'from-blue-500/20 to-transparent border-blue-500/30',
  orange: 'from-orange-500/20 to-transparent border-orange-500/30',
};

const iconBgClasses = {
  primary: 'bg-primary/20 text-primary',
  green: 'bg-emerald-500/20 text-emerald-400',
  blue: 'bg-blue-500/20 text-blue-400',
  orange: 'bg-orange-500/20 text-orange-400',
};

export const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  accentColor = 'primary',
  delay = 0 
}: StatCardProps) => {
  return (
    <Card 
      className={cn(
        "card-glow bg-gradient-to-br overflow-hidden opacity-0 animate-slide-up",
        accentClasses[accentColor]
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground font-display tracking-wider">
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-xl",
            iconBgClasses[accentColor]
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
