
import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  headerClassName?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const HolographicCard: React.FC<HolographicCardProps> = ({
  children,
  className,
  title,
  description,
  headerClassName,
  intensity = 'medium'
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const intensityMap = {
    low: { rotation: 5, glow: 10 },
    medium: { rotation: 10, glow: 20 },
    high: { rotation: 15, glow: 30 }
  };

  const { rotation, glow } = intensityMap[intensity];

  return (
    <Card
      ref={cardRef}
      className={cn(
        'relative overflow-hidden transition-all duration-300 group cursor-pointer',
        'bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-700',
        'hover:border-cyan-400/50 hover:shadow-2xl',
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y * rotation}deg) rotateY(${mousePosition.x * rotation}deg)`,
        boxShadow: `0 0 ${glow}px rgba(0, 255, 255, ${Math.abs(mousePosition.x) + Math.abs(mousePosition.y)})`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Holographic overlay */}
      <div 
        className="absolute inset-0 opacity-30 transition-opacity duration-300 group-hover:opacity-60"
        style={{
          background: `linear-gradient(${mousePosition.x * 45 + 45}deg, 
            rgba(0, 255, 255, 0.1) 0%, 
            rgba(255, 0, 255, 0.1) 25%, 
            rgba(255, 255, 0, 0.1) 50%, 
            rgba(0, 255, 0, 0.1) 75%, 
            rgba(0, 255, 255, 0.1) 100%)`
        }}
      />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
          }}
        />
      </div>

      {title && (
        <CardHeader className={cn(
          'relative z-10 bg-gradient-to-r from-cyan-600 to-blue-600 text-white',
          headerClassName
        )}>
          <CardTitle className="flex items-center gap-3 text-white">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-cyan-100">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}

      <CardContent className="relative z-10 p-6">
        {children}
      </CardContent>

      {/* Scanning line effect */}
      <div 
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000"
        style={{
          transform: `translateY(${(mousePosition.y + 1) * 200}px)`,
          animation: 'scan 3s infinite'
        }}
      />
    </Card>
  );
};

export default HolographicCard;
