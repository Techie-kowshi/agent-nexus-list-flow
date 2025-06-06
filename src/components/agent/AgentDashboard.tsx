
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User } from '../../types/auth';
import SubAgentManagement from './SubAgentManagement';
import AgentCSVUpload from './AgentCSVUpload';
import AssignedTasks from './AssignedTasks';
import TaskProvision from './TaskProvision';
import { UserIcon, UploadIcon, FileTextIcon, LogOutIcon, UsersIcon, ActivityIcon, TrendingUpIcon, CheckCircleIcon, ZapIcon } from 'lucide-react';
import ParticleBackground from '../ui/particle-background';
import FloatingStatsCard from '../ui/floating-stats-card';
import HolographicCard from '../ui/holographic-card';
import { CyberTabs, CyberTabsList, CyberTabTrigger, CyberTabsContent } from '../ui/cyber-tabs';
import NeonButton from '../ui/neon-button';
import AchievementBadge from '../ui/achievement-badge';
import LevelProgress from '../ui/level-progress';
import QuestCard from '../ui/quest-card';
import NeuralNetworkBg from '../ui/neural-network-bg';

interface AgentDashboardProps {
  user: User;
  onLogout: () => void;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('tasks');

  const stats = [
    { label: "Active Missions", value: "156", icon: FileTextIcon, change: "+23% efficiency", color: "text-blue-400" },
    { label: "Completed", value: "142", icon: CheckCircleIcon, change: "+15% success", color: "text-emerald-400" },
    { label: "Sub Agents", value: "8", icon: UsersIcon, change: "+2 deployed", color: "text-purple-400" },
    { label: "Neural Score", value: "91.0%", icon: TrendingUpIcon, change: "+3.2% boost", color: "text-orange-400" },
  ];

  const quests = [
    {
      title: "Network Expansion",
      description: "Deploy 5 new sub-agents to your network",
      progress: 3,
      maxProgress: 5,
      reward: "+750 XP",
      difficulty: 'medium' as const
    },
    {
      title: "Mission Master",
      description: "Complete 100 missions with perfect accuracy",
      progress: 87,
      maxProgress: 100,
      reward: "+1500 XP",
      difficulty: 'hard' as const
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <NeuralNetworkBg />
      
      {/* Enhanced grid overlay for agent theme */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,0,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'agent-grid 25s linear infinite'
          }}
        />
      </div>

      {/* Agent Command Header */}
      <header className="relative z-50 bg-gradient-to-r from-gray-900/95 to-purple-900/95 backdrop-blur-xl border-b border-purple-500/30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center animate-pulse">
                  <ZapIcon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  AGENT COMMAND DECK
                </h1>
                <p className="text-purple-300 font-mono">
                  Agent <span className="text-purple-400 font-bold">{user.name}</span> • Neural Status: 
                  <span className="text-green-400 ml-2">⚡ SYNCHRONIZED</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <LevelProgress 
                currentLevel={12}
                currentXP={1840}
                nextLevelXP={2000}
              />
              <NeonButton 
                onClick={onLogout} 
                glowColor="pink" 
                intensity="medium"
                className="font-bold tracking-wider"
              >
                <LogOutIcon className="w-4 h-4 mr-2" />
                DELINK
              </NeonButton>
            </div>
          </div>
        </div>
        
        {/* Purple scanning line effect */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-scan" />
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Enhanced Stats Grid with Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <FloatingStatsCard
                key={index}
                label={stat.label}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                color={stat.color}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Achievements Panel */}
          <HolographicCard
            title="Neural Achievements"
            description="Your progress markers"
            headerClassName="bg-gradient-to-r from-purple-600 to-pink-600"
            className="h-fit"
          >
            <div className="grid grid-cols-2 gap-3">
              <AchievementBadge type="streak" level={7} />
              <AchievementBadge type="milestone" level={4} />
              <AchievementBadge type="performance" level={9} />
              <AchievementBadge type="leadership" level={3} />
            </div>
          </HolographicCard>
        </div>

        {/* Quests Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
            <ZapIcon className="w-6 h-6" />
            Active Neural Quests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quests.map((quest, index) => (
              <QuestCard key={index} {...quest} />
            ))}
          </div>
        </div>

        {/* Enhanced Main Interface */}
        <CyberTabs value={activeTab} onValueChange={setActiveTab}>
          <CyberTabsList className="grid w-full grid-cols-4 mb-8">
            <CyberTabTrigger value="tasks" icon={FileTextIcon}>
              MISSIONS
            </CyberTabTrigger>
            <CyberTabTrigger value="subagents" icon={UserIcon}>
              SUB AGENTS
            </CyberTabTrigger>
            <CyberTabTrigger value="provision" icon={UsersIcon}>
              DEPLOY
            </CyberTabTrigger>
            <CyberTabTrigger value="upload" icon={UploadIcon}>
              DATA LINK
            </CyberTabTrigger>
          </CyberTabsList>

          <CyberTabsContent value="tasks" className="space-y-6">
            <HolographicCard
              title={
                <>
                  <FileTextIcon className="w-6 h-6" />
                  Active Mission Control
                </>
              }
              description="Monitor and execute assigned missions with neural precision"
              headerClassName="bg-gradient-to-r from-blue-600 to-indigo-600"
              intensity="high"
            >
              <AssignedTasks agentId={user.id} />
            </HolographicCard>
          </CyberTabsContent>

          <CyberTabsContent value="subagents" className="space-y-6">
            <HolographicCard
              title={
                <>
                  <UserIcon className="w-6 h-6" />
                  Sub-Agent Neural Network
                </>
              }
              description="Deploy and manage your sub-agent squad for maximum efficiency"
              headerClassName="bg-gradient-to-r from-emerald-600 to-teal-600"
              intensity="high"
            >
              <SubAgentManagement agentId={user.id} />
            </HolographicCard>
          </CyberTabsContent>

          <CyberTabsContent value="provision" className="space-y-6">
            <HolographicCard
              title={
                <>
                  <UsersIcon className="w-6 h-6" />
                  Mission Deployment Matrix
                </>
              }
              description="Distribute missions across your sub-agent network for optimal performance"
              headerClassName="bg-gradient-to-r from-purple-600 to-pink-600"
              intensity="high"
            >
              <TaskProvision agentId={user.id} />
            </HolographicCard>
          </CyberTabsContent>

          <CyberTabsContent value="upload" className="space-y-6">
            <HolographicCard
              title={
                <>
                  <UploadIcon className="w-6 h-6" />
                  Neural Data Uplink
                </>
              }
              description="Upload new mission data and auto-deploy to sub-agents"
              headerClassName="bg-gradient-to-r from-orange-600 to-red-600"
              intensity="high"
            >
              <AgentCSVUpload agentId={user.id} />
            </HolographicCard>
          </CyberTabsContent>
        </CyberTabs>
      </main>

      {/* Agent-specific status indicators */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        <div className="bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-xs text-purple-400 font-mono">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            SUB-NEURAL LINK: ACTIVE
          </div>
        </div>
        <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            MISSION SYNC: REAL-TIME
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
