
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task, SubAgent } from '../../types/auth';
import { mockTasks } from '../../data/mockData';
import { useToast } from '@/hooks/use-toast';
import { CheckCircleIcon, ClockIcon, AlertCircleIcon, Zap, Trophy } from 'lucide-react';
import AchievementBadge from '../ui/achievement-badge';
import LevelProgress from '../ui/level-progress';
import QuestCard from '../ui/quest-card';
import NeuralNetworkBg from '../ui/neural-network-bg';

interface SubAgentDashboardProps {
  subAgent: SubAgent;
  onLogout: () => void;
}

const SubAgentDashboard: React.FC<SubAgentDashboardProps> = ({ subAgent, onLogout }) => {
  const [tasks, setTasks] = useState<Task[]>(
    mockTasks.filter(task => task.assignedTo === subAgent.id)
  );
  const { toast } = useToast();

  const updateTaskStatus = (taskId: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    
    toast({
      title: "🎯 Mission Updated",
      description: `Task status synchronized to ${newStatus}. +50 XP earned!`,
    });
  };

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;

  const currentLevel = 15;
  const currentXP = 2840;
  const nextLevelXP = 3200;

  const quests = [
    {
      title: "Task Completion Streak",
      description: "Complete 10 tasks without any failures",
      progress: 7,
      maxProgress: 10,
      reward: "+500 XP",
      difficulty: 'medium' as const
    },
    {
      title: "Speed Demon",
      description: "Complete 5 tasks in under 24 hours",
      progress: 3,
      maxProgress: 5,
      reward: "+750 XP",
      difficulty: 'hard' as const
    },
    {
      title: "Neural Sync Master",
      description: "Maintain 100% accuracy for 7 days",
      progress: 5,
      maxProgress: 7,
      reward: "+1000 XP",
      difficulty: 'legendary' as const
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <NeuralNetworkBg />
      
      {/* Enhanced Sub-Agent Header */}
      <header className="relative z-50 bg-gradient-to-r from-purple-900/95 to-indigo-900/95 backdrop-blur-xl border-b border-purple-500/30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl flex items-center justify-center animate-pulse">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  SUB-AGENT NEURAL HUB
                </h1>
                <p className="text-purple-300 font-mono">
                  Sub-Agent <span className="text-purple-400 font-bold">{subAgent.name}</span> • Status: 
                  <span className="text-green-400 ml-2">⚡ ACTIVE</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <LevelProgress 
                currentLevel={currentLevel}
                currentXP={currentXP}
                nextLevelXP={nextLevelXP}
              />
              <Button 
                onClick={onLogout}
                className="bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 font-bold tracking-wider"
              >
                DISCONNECT
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-scan" />
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Achievement & Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Stats */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-cyan-500/30">
              <CardContent className="flex items-center p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100/10 rounded-lg">
                    <AlertCircleIcon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Missions</p>
                    <p className="text-2xl font-bold text-cyan-400">{tasks.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-green-500/30">
              <CardContent className="flex items-center p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100/10 rounded-lg">
                    <CheckCircleIcon className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Completed</p>
                    <p className="text-2xl font-bold text-green-400">{completedTasks}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-blue-500/30">
              <CardContent className="flex items-center p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100/10 rounded-lg">
                    <ClockIcon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Active</p>
                    <p className="text-2xl font-bold text-blue-400">{inProgressTasks}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-yellow-500/30">
              <CardContent className="flex items-center p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100/10 rounded-lg">
                    <AlertCircleIcon className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Pending</p>
                    <p className="text-2xl font-bold text-yellow-400">{pendingTasks}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Panel */}
          <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Trophy className="w-6 h-6" />
                Neural Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <AchievementBadge type="streak" level={5} />
                <AchievementBadge type="milestone" level={3} />
                <AchievementBadge type="performance" level={7} />
                <AchievementBadge type="leadership" level={2} />
                <AchievementBadge type="elite" level={1} unlocked={false} />
                <AchievementBadge type="streak" level={10} unlocked={false} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quests Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Active Neural Quests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quests.map((quest, index) => (
              <QuestCard key={index} {...quest} />
            ))}
          </div>
        </div>

        {/* Mission Control Panel */}
        <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">Mission Control Interface</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Target</TableHead>
                  <TableHead className="text-gray-300">Contact</TableHead>
                  <TableHead className="text-gray-300">Intel</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                  <TableHead className="text-gray-300">Deployed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell className="font-medium text-white">{task.firstName}</TableCell>
                    <TableCell className="text-gray-300">{task.phone}</TableCell>
                    <TableCell className="max-w-xs truncate text-gray-300">{task.notes}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={task.status === 'completed' ? 'default' : task.status === 'in-progress' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={task.status}
                        onValueChange={(value: 'pending' | 'in-progress' | 'completed') => 
                          updateTaskStatus(task.id, value)
                        }
                      >
                        <SelectTrigger className="w-32 bg-gray-800 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">Active</SelectItem>
                          <SelectItem value="completed">Complete</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {tasks.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Zap className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-lg">No missions assigned yet.</p>
                <p className="text-sm">Your neural link is ready for deployment.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SubAgentDashboard;
