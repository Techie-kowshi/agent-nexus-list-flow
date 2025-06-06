
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from '../../types/auth';
import SubAgentManagement from './SubAgentManagement';
import AgentCSVUpload from './AgentCSVUpload';
import AssignedTasks from './AssignedTasks';
import TaskProvision from './TaskProvision';
import { UserIcon, UploadIcon, FileTextIcon, LogOutIcon, UsersIcon } from 'lucide-react';

interface AgentDashboardProps {
  user: User;
  onLogout: () => void;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
              <span className="ml-4 text-sm text-gray-600">Welcome, {user.name}</span>
            </div>
            <Button onClick={onLogout} variant="outline" size="sm">
              <LogOutIcon className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <FileTextIcon className="w-4 h-4" />
              My Tasks
            </TabsTrigger>
            <TabsTrigger value="subagents" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Sub Agents
            </TabsTrigger>
            <TabsTrigger value="provision" className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4" />
              Task Provision
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <UploadIcon className="w-4 h-4" />
              Upload CSV
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Tasks</CardTitle>
                <CardDescription>
                  Tasks assigned to you by the admin. You can distribute these among your sub-agents.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AssignedTasks agentId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subagents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sub Agent Management</CardTitle>
                <CardDescription>
                  Create and manage your sub-agents who will help you complete tasks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SubAgentManagement agentId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="provision" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Provision to Sub Agents</CardTitle>
                <CardDescription>
                  Distribute your assigned tasks among your sub-agents for efficient completion.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TaskProvision agentId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Tasks</CardTitle>
                <CardDescription>
                  Upload CSV files with new tasks and distribute them among your sub-agents.
                </CardDescription>
              </CardHeader>
              <CardContent>
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
