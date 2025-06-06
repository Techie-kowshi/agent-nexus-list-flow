
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Agent } from '../../types/auth';
import { mockAgents } from '../../data/mockData';
import { useToast } from '@/hooks/use-toast';
import { PlusIcon, EditIcon, TrashIcon } from 'lucide-react';

const AgentManagement: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    countryCode: '+1',
    password: ''
  });
  const { toast } = useToast();

  const countryCodes = [
    { value: '+1', label: '+1 (US/CA)' },
    { value: '+44', label: '+44 (UK)' },
    { value: '+91', label: '+91 (IN)' },
    { value: '+61', label: '+61 (AU)' },
    { value: '+49', label: '+49 (DE)' }
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      countryCode: '+1',
      password: ''
    });
  };

  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAgent: Agent = {
      id: Date.now().toString(),
      ...formData,
      role: 'agent' as const,
      createdAt: new Date()
    };

    setAgents([...agents, newAgent]);
    setIsAddDialogOpen(false);
    resetForm();
    
    toast({
      title: "Agent Added",
      description: `${formData.name} has been successfully added as an agent.`,
    });
  };

  const handleEditAgent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingAgent) return;

    const updatedAgents = agents.map(agent => 
      agent.id === editingAgent.id 
        ? { ...agent, ...formData }
        : agent
    );

    setAgents(updatedAgents);
    setIsEditDialogOpen(false);
    setEditingAgent(null);
    resetForm();
    
    toast({
      title: "Agent Updated",
      description: `${formData.name}'s details have been successfully updated.`,
    });
  };

  const handleDeleteAgent = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    setAgents(agents.filter(a => a.id !== agentId));
    
    toast({
      title: "Agent Deleted",
      description: `${agent?.name} has been removed from the system.`,
    });
  };

  const openEditDialog = (agent: Agent) => {
    setEditingAgent(agent);
    setFormData({
      name: agent.name,
      email: agent.email,
      mobile: agent.mobile,
      countryCode: agent.countryCode,
      password: agent.password
    });
    setIsEditDialogOpen(true);
  };

  const AgentForm = ({ onSubmit, isEdit = false }: { onSubmit: (e: React.FormEvent) => void; isEdit?: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="countryCode">Country Code</Label>
          <Select 
            value={formData.countryCode} 
            onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((code) => (
                <SelectItem key={code.value} value={code.value}>
                  {code.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>
      
      <Button type="submit" className="w-full">
        {isEdit ? 'Update Agent' : 'Add Agent'}
      </Button>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Agents ({agents.length})</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
            </DialogHeader>
            <AgentForm onSubmit={handleAddAgent} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell>{agent.countryCode} {agent.mobile}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Active</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(agent)}
                      >
                        <EditIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteAgent(agent.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Agent</DialogTitle>
          </DialogHeader>
          <AgentForm onSubmit={handleEditAgent} isEdit={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentManagement;
