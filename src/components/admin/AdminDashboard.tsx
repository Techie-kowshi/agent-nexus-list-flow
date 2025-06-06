
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from '../../types/auth';
import AgentManagement from './AgentManagement';
import CSVUpload from './CSVUpload';
import TaskDistribution from './TaskDistribution';
import { UserIcon, UploadIcon, FileTextIcon, LogOutIcon, TrendingUpIcon, UsersIcon, ActivityIcon } from 'lucide-react';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('agents');

  const stats = [
    { label: "Active Agents", value: "24", icon: UsersIcon, change: "+12%", color: "text-blue-600" },
    { label: "Tasks Completed", value: "1,847", icon: ActivityIcon, change: "+8%", color: "text-emerald-600" },
    { label: "Success Rate", value: "94.2%", icon: TrendingUpIcon, change: "+2.1%", color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                  Admin Dashboard
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color} font-medium`}>{stat.change} from last month</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/60 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="agents" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md">
              <UserIcon className="w-4 h-4" />
              Agent Management
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md">
              <UploadIcon className="w-4 h-4" />
              Upload CSV
            </TabsTrigger>
            <TabsTrigger value="distribution" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md">
              <FileTextIcon className="w-4 h-4" />
              Task Distribution
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <UserIcon className="w-6 h-6" />
                  Agent Management
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Create, edit, and manage your agents. Each agent can handle assigned tasks and create sub-agents.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <AgentManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <UploadIcon className="w-6 h-6" />
                  Upload CSV File
                </CardTitle>
                <CardDescription className="text-emerald-100">
                  Upload a CSV file with tasks to distribute among agents. Supported formats: CSV, XLSX, XLS
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <CSVUpload />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <FileTextIcon className="w-6 h-6" />
                  Task Distribution
                </CardTitle>
                <CardDescription className="text-purple-100">
                  View how tasks are distributed among agents and their progress.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <TaskDistribution />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
