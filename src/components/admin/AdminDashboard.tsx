
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User } from '../../types/auth';
import AgentManagement from './AgentManagement';
import CSVUpload from './CSVUpload';
import TaskDistribution from './TaskDistribution';
import { UserIcon, UploadIcon, FileTextIcon, LogOutIcon, TrendingUpIcon, UsersIcon, ActivityIcon, GamepadIcon } from 'lucide-react';
import ParticleBackground from '../ui/particle-background';
import FloatingStatsCard from '../ui/floating-stats-card';
import HolographicCard from '../ui/holographic-card';
import { CyberTabs, CyberTabsList, CyberTabTrigger, CyberTabsContent } from '../ui/cyber-tabs';
import NeonButton from '../ui/neon-button';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('agents');

  const stats = [
    { label: "Neural Agents", value: "24", icon: UsersIcon, change: "+12% efficiency", color: "text-cyan-400" },
    { label: "Tasks Processed", value: "1,847", icon: ActivityIcon, change: "+8% throughput", color: "text-emerald-400" },
    { label: "AI Success Rate", value: "94.2%", icon: TrendingUpIcon, change: "+2.1% accuracy", color: "text-purple-400" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Matrix-style grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            animation: 'matrix-scroll 20s linear infinite'
          }}
        />
      </div>

      {/* Cyberpunk Header */}
      <header className="relative z-50 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-xl border-b border-cyan-500/30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center animate-pulse">
                  <GamepadIcon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  NEXUS COMMAND CENTER
                </h1>
                <p className="text-cyan-300 font-mono">
                  Welcome back, <span className="text-cyan-400 font-bold">{user.name}</span> • Status: 
                  <span className="text-green-400 ml-2">⚡ ONLINE</span>
                </p>
              </div>
            </div>
            <NeonButton 
              onClick={onLogout} 
              glowColor="pink" 
              intensity="medium"
              className="font-bold tracking-wider"
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              DISCONNECT
            </NeonButton>
          </div>
        </div>
        
        {/* Scanning line effect */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <FloatingStatsCard
              key={index}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              color={stat.color}
              delay={index * 150}
            />
          ))}
        </div>

        {/* Enhanced Main Content */}
        <CyberTabs value={activeTab} onValueChange={setActiveTab}>
          <CyberTabsList className="grid w-full grid-cols-3 mb-8">
            <CyberTabTrigger value="agents" icon={UserIcon}>
              AGENT MATRIX
            </CyberTabTrigger>
            <CyberTabTrigger value="upload" icon={UploadIcon}>
              DATA UPLOAD
            </CyberTabTrigger>
            <CyberTabTrigger value="distribution" icon={FileTextIcon}>
              TASK NEXUS
            </CyberTabTrigger>
          </CyberTabsList>

          <CyberTabsContent value="agents" className="space-y-6">
            <HolographicCard
              title={
                <>
                  <UserIcon className="w-6 h-6" />
                  Neural Agent Management
                </>
              }
              description="Deploy, configure, and monitor your AI agent network with quantum precision"
              headerClassName="bg-gradient-to-r from-cyan-600 to-blue-600"
              intensity="high"
            >
              <AgentManagement />
            </HolographicCard>
          </CyberTabsContent>

          <CyberTabsContent value="upload" className="space-y-6">
            <HolographicCard
              title={
                <>
                  <UploadIcon className="w-6 h-6" />
                  Quantum Data Uplink
                </>
              }
              description="Upload massive datasets and distribute them across the neural network instantly"
              headerClassName="bg-gradient-to-r from-emerald-600 to-teal-600"
              intensity="high"
            >
              <CSVUpload />
            </HolographicCard>
          </CyberTabsContent>

          <CyberTabsContent value="distribution" className="space-y-6">
            <HolographicCard
              title={
                <>
                  <FileTextIcon className="w-6 h-6" />
                  Task Distribution Matrix
                </>
              }
              description="Monitor real-time task allocation and performance metrics across all agents"
              headerClassName="bg-gradient-to-r from-purple-600 to-pink-600"
              intensity="high"
            >
              <TaskDistribution />
            </HolographicCard>
          </CyberTabsContent>
        </CyberTabs>
      </main>

      {/* Status indicators */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            QUANTUM CORES: ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
