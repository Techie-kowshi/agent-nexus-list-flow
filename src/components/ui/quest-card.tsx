
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestCardProps {
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  completed?: boolean;
  className?: string;
}

const QuestCard: React.FC<QuestCardProps> = ({
  title,
  description,
  progress,
  maxProgress,
  reward,
  difficulty,
  completed = false,
  className
}) => {
  const difficultyColors = {
    easy: 'from-green-400 to-emerald-500',
    medium: 'from-yellow-400 to-orange-500', 
    hard: 'from-red-400 to-pink-500',
    legendary: 'from-purple-400 to-cyan-500'
  };

  const progressPercentage = (progress / maxProgress) * 100;

  return (
    <Card className={cn(
      'relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer',
      'bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-700',
      'hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]',
      completed && 'border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]',
      className
    )}>
      <CardContent className="p-4 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-white">{title}</h4>
              {completed && <CheckCircle className="w-4 h-4 text-green-400" />}
            </div>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
          <Badge 
            className={cn(
              'text-xs font-bold text-white border-0',
              `bg-gradient-to-r ${difficultyColors[difficulty]}`
            )}
          >
            {difficulty.toUpperCase()}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-cyan-400 font-mono">{progress}/{maxProgress}</span>
          </div>
          
          <div className="relative">
            <Progress value={progressPercentage} className="h-2 bg-gray-800" />
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-xs text-yellow-400">
              <Zap className="w-3 h-3" />
              <span>{reward}</span>
            </div>
            {!completed && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>In Progress</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Card>
  );
};

export default QuestCard;
