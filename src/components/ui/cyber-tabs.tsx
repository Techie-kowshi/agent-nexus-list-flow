
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CyberTabTriggerProps {
  value: string;
  icon: LucideIcon;
  children: React.ReactNode;
  isActive?: boolean;
}

const CyberTabTrigger: React.FC<CyberTabTriggerProps> = ({ 
  value, 
  icon: Icon, 
  children,
  isActive = false 
}) => {
  return (
    <TabsTrigger 
      value={value}
      className={cn(
        'relative group flex items-center gap-3 px-6 py-4 rounded-none border-b-2 transition-all duration-300',
        'bg-transparent border-transparent text-gray-400',
        'hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10',
        'data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-400 data-[state=active]:bg-cyan-400/10',
        'data-[state=active]:shadow-[0_0_15px_rgba(0,255,255,0.3)]'
      )}
    >
      <Icon className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
      <span className="font-semibold">{children}</span>
      
      {/* Glitch effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
        <div className="absolute inset-0 bg-cyan-400 transform skew-x-12 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>
    </TabsTrigger>
  );
};

interface CyberTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const CyberTabs: React.FC<CyberTabsProps> = ({ value, onValueChange, children, className }) => {
  return (
    <Tabs value={value} onValueChange={onValueChange} className={cn('w-full', className)}>
      {children}
    </Tabs>
  );
};

const CyberTabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <TabsList className={cn(
      'grid w-full bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-2',
      'before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/20 before:to-purple-500/20 before:rounded-lg before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500',
      className
    )}>
      {children}
    </TabsList>
  );
};

export { CyberTabs, CyberTabsList, CyberTabTrigger, TabsContent as CyberTabsContent };
