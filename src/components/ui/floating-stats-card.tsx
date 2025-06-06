
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingStatsCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

const FloatingStatsCard: React.FC<FloatingStatsCardProps> = ({
  label,
  value,
  change,
  icon: Icon,
  color,
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        'group relative overflow-hidden transition-all duration-500 hover:scale-110 cursor-pointer',
        'bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-700',
        'hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]',
        'animate-fade-in'
      )}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 text-sm font-medium mb-1">{label}</p>
            <p className={cn(
              'text-3xl font-bold transition-all duration-300',
              isHovered ? 'text-cyan-400' : 'text-white'
            )}>
              {value}
            </p>
            <p className={cn(
              'text-sm font-medium mt-1 transition-colors duration-300',
              color,
              isHovered && 'text-cyan-400'
            )}>
              {change}
            </p>
          </div>
          <div className={cn(
            'w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300',
            'bg-gradient-to-br from-cyan-400/20 to-blue-600/20',
            isHovered && 'scale-110 shadow-[0_0_20px_rgba(0,255,255,0.5)]'
          )}>
            <Icon className={cn(
              'w-8 h-8 transition-all duration-300',
              isHovered ? 'text-cyan-400' : color
            )} />
          </div>
        </div>
      </CardContent>
      
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'absolute w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100',
              'animate-ping'
            )}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 200}ms`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
    </Card>
  );
};

export default FloatingStatsCard;
