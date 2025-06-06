
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from '../../types/auth';
import AgentManagement from './AgentManagement';
import CSVUpload from './CSVUpload';
import TaskDistribution from './TaskDistribution';
import { UserIcon, UploadIcon, FileTextIcon, LogOutIcon } from 'lucide-react';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('agents');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
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
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Agent Management
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <UploadIcon className="w-4 h-4" />
              Upload CSV
            </TabsTrigger>
            <TabsTrigger value="distribution" className="flex items-center gap-2">
              <FileTextIcon className="w-4 h-4" />
              Task Distribution
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Management</CardTitle>
                <CardDescription>
                  Create, edit, and manage your agents. Each agent can handle assigned tasks and create sub-agents.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AgentManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload CSV File</CardTitle>
                <CardDescription>
                  Upload a CSV file with tasks to distribute among agents. Supported formats: CSV, XLSX, XLS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CSVUpload />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
                <CardDescription>
                  View how tasks are distributed among agents and their progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
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
