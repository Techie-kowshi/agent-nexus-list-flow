
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LevelProgressProps {
  currentLevel: number;
  currentXP: number;
  nextLevelXP: number;
  className?: string;
}

const LevelProgress: React.FC<LevelProgressProps> = ({
  currentLevel,
  currentXP,
  nextLevelXP,
  className
}) => {
  const progressPercentage = (currentXP / nextLevelXP) * 100;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-cyan-400">LEVEL {currentLevel}</span>
        </div>
        <span className="text-xs text-gray-400 font-mono">
          {currentXP} / {nextLevelXP} XP
        </span>
      </div>
      
      <div className="relative">
        <Progress 
          value={progressPercentage} 
          className="h-3 bg-gray-800 border border-cyan-500/30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 rounded-full" />
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default LevelProgress;
