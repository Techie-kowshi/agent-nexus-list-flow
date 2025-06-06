
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends ButtonProps {
  glowColor?: 'cyan' | 'pink' | 'yellow' | 'green' | 'purple';
  intensity?: 'low' | 'medium' | 'high';
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  className, 
  glowColor = 'cyan', 
  intensity = 'medium',
  ...props 
}) => {
  const glowStyles = {
    cyan: {
      low: 'shadow-[0_0_10px_#00ffff] hover:shadow-[0_0_20px_#00ffff] border-cyan-400 text-cyan-400',
      medium: 'shadow-[0_0_15px_#00ffff] hover:shadow-[0_0_30px_#00ffff] border-cyan-400 text-cyan-400',
      high: 'shadow-[0_0_25px_#00ffff] hover:shadow-[0_0_40px_#00ffff] border-cyan-400 text-cyan-400'
    },
    pink: {
      low: 'shadow-[0_0_10px_#ff00ff] hover:shadow-[0_0_20px_#ff00ff] border-pink-400 text-pink-400',
      medium: 'shadow-[0_0_15px_#ff00ff] hover:shadow-[0_0_30px_#ff00ff] border-pink-400 text-pink-400',
      high: 'shadow-[0_0_25px_#ff00ff] hover:shadow-[0_0_40px_#ff00ff] border-pink-400 text-pink-400'
    },
    yellow: {
      low: 'shadow-[0_0_10px_#ffff00] hover:shadow-[0_0_20px_#ffff00] border-yellow-400 text-yellow-400',
      medium: 'shadow-[0_0_15px_#ffff00] hover:shadow-[0_0_30px_#ffff00] border-yellow-400 text-yellow-400',
      high: 'shadow-[0_0_25px_#ffff00] hover:shadow-[0_0_40px_#ffff00] border-yellow-400 text-yellow-400'
    },
    green: {
      low: 'shadow-[0_0_10px_#00ff00] hover:shadow-[0_0_20px_#00ff00] border-green-400 text-green-400',
      medium: 'shadow-[0_0_15px_#00ff00] hover:shadow-[0_0_30px_#00ff00] border-green-400 text-green-400',
      high: 'shadow-[0_0_25px_#00ff00] hover:shadow-[0_0_40px_#00ff00] border-green-400 text-green-400'
    },
    purple: {
      low: 'shadow-[0_0_10px_#8b00ff] hover:shadow-[0_0_20px_#8b00ff] border-purple-400 text-purple-400',
      medium: 'shadow-[0_0_15px_#8b00ff] hover:shadow-[0_0_30px_#8b00ff] border-purple-400 text-purple-400',
      high: 'shadow-[0_0_25px_#8b00ff] hover:shadow-[0_0_40px_#8b00ff] border-purple-400 text-purple-400'
    }
  };

  return (
    <Button
      className={cn(
        'bg-transparent border-2 font-bold transition-all duration-300 hover:scale-105 active:scale-95',
        'relative overflow-hidden group',
        glowStyles[glowColor][intensity],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </Button>
  );
};

export default NeonButton;
