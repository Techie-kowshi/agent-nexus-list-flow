
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from '../../types/auth';
import SubAgentManagement from './SubAgentManagement';
import AgentCSVUpload from './AgentCSVUpload';
import AssignedTasks from './AssignedTasks';
import TaskProvision from './TaskProvision';
import { UserIcon, UploadIcon, FileTextIcon, LogOutIcon, UsersIcon, ActivityIcon, TrendingUpIcon, CheckCircleIcon } from 'lucide-react';

interface AgentDashboardProps {
  user: User;
  onLogout: () => void;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('tasks');

  const stats = [
    { label: "Assigned Tasks", value: "156", icon: FileTextIcon, change: "+23%", color: "text-blue-600" },
    { label: "Completed", value: "142", icon: CheckCircleIcon, change: "+15%", color: "text-emerald-600" },
    { label: "Sub Agents", value: "8", icon: UsersIcon, change: "+2", color: "text-purple-600" },
    { label: "Success Rate", value: "91.0%", icon: TrendingUpIcon, change: "+3.2%", color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text text-transparent">
                  Agent Dashboard
                </h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
              </div>
            </div>
            <Button onClick={onLogout} variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors">
              <LogOutIcon className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color} font-medium`}>{stat.change}</p>
                  </div>
                  <div className={`w-10 h-10 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/60 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="tasks" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md">
              <FileTextIcon className="w-4 h-4" />
              My Tasks
            </TabsTrigger>
            <TabsTrigger value="subagents" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md">
              <UserIcon className="w-4 h-4" />
              Sub Agents
            </TabsTrigger>
            <TabsTrigger value="provision" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md">
              <UsersIcon className="w-4 h-4" />
              Task Provision
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md">
              <UploadIcon className="w-4 h-4" />
              Upload CSV
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <FileTextIcon className="w-6 h-6" />
                  Assigned Tasks
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Tasks assigned to you by the admin. You can distribute these among your sub-agents.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <AssignedTasks agentId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subagents" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <UserIcon className="w-6 h-6" />
                  Sub Agent Management
                </CardTitle>
                <CardDescription className="text-emerald-100">
                  Create and manage your sub-agents who will help you complete tasks.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <SubAgentManagement agentId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="provision" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <UsersIcon className="w-6 h-6" />
                  Task Provision to Sub Agents
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Distribute your assigned tasks among your sub-agents for efficient completion.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <TaskProvision agentId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <UploadIcon className="w-6 h-6" />
                  Upload New Tasks
                </CardTitle>
                <CardDescription className="text-orange-100">
                  Upload CSV files with new tasks and distribute them among your sub-agents.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <AgentCSVUpload agentId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AgentDashboard;
