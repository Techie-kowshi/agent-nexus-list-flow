
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, Trophy, Zap, Target, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementBadgeProps {
  type: 'streak' | 'milestone' | 'performance' | 'leadership' | 'elite';
  level: number;
  unlocked?: boolean;
  className?: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ 
  type, 
  level, 
  unlocked = true, 
  className 
}) => {
  const achievements = {
    streak: {
      icon: Zap,
      color: 'from-yellow-400 to-orange-500',
      glowColor: 'shadow-[0_0_20px_rgba(255,165,0,0.6)]',
      name: 'Task Streak'
    },
    milestone: {
      icon: Trophy,
      color: 'from-blue-400 to-cyan-500',
      glowColor: 'shadow-[0_0_20px_rgba(0,191,255,0.6)]',
      name: 'Milestone'
    },
    performance: {
      icon: Target,
      color: 'from-green-400 to-emerald-500',
      glowColor: 'shadow-[0_0_20px_rgba(34,197,94,0.6)]',
      name: 'Performance'
    },
    leadership: {
      icon: Star,
      color: 'from-purple-400 to-pink-500',
      glowColor: 'shadow-[0_0_20px_rgba(168,85,247,0.6)]',
      name: 'Leadership'
    },
    elite: {
      icon: Crown,
      color: 'from-amber-400 to-yellow-600',
      glowColor: 'shadow-[0_0_25px_rgba(245,158,11,0.8)]',
      name: 'Elite Status'
    }
  };

  const achievement = achievements[type];
  const Icon = achievement.icon;

  return (
    <div className={cn(
      'relative group cursor-pointer',
      !unlocked && 'opacity-50 grayscale',
      className
    )}>
      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
        `bg-gradient-to-br ${achievement.color}`,
        unlocked && achievement.glowColor,
        'group-hover:scale-110 group-hover:rotate-12'
      )}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center text-xs font-bold text-black">
        {level}
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {achievement.name} Level {level}
      </div>
    </div>
  );
};

export default AchievementBadge;
