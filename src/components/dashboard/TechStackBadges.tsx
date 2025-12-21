import { cn } from '@/lib/utils';

interface TechBadgeProps {
  name: string;
  icon: string;
  color: string;
  delay?: number;
}

const techStack: TechBadgeProps[] = [
  { name: 'Python', icon: '🐍', color: 'from-yellow-500/20 to-blue-500/20 border-yellow-500/30' },
  { name: 'Scikit-learn', icon: '🔬', color: 'from-orange-500/20 to-orange-600/20 border-orange-500/30' },
  { name: 'Surprise', icon: '📊', color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30' },
  { name: 'TMDB API', icon: '🎬', color: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30' },
  { name: 'MovieLens', icon: '📽️', color: 'from-pink-500/20 to-pink-600/20 border-pink-500/30' },
  { name: 'TF-IDF', icon: '📝', color: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30' },
  { name: 'SVD', icon: '🧮', color: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30' },
];

export const TechStackBadges = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Powered By</h3>
      <div className="flex flex-wrap gap-3">
        {techStack.map((tech, index) => (
          <div
            key={tech.name}
            className={cn(
              "px-4 py-2 rounded-full border bg-gradient-to-r flex items-center gap-2 opacity-0 animate-scale-in transition-transform hover:scale-105 cursor-default",
              tech.color
            )}
            style={{ 
              animationDelay: `${index * 100 + 400}ms`,
              animationFillMode: 'forwards'
            }}
          >
            <span className="text-lg">{tech.icon}</span>
            <span className="text-sm font-medium text-foreground">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
