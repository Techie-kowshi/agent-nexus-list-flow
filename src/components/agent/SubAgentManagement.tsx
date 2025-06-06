
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { SubAgent } from '../../types/auth';
import { mockSubAgents } from '../../data/mockData';
import { useToast } from '@/hooks/use-toast';
import { PlusIcon, EditIcon, TrashIcon } from 'lucide-react';

interface SubAgentManagementProps {
  agentId: string;
}

const SubAgentManagement: React.FC<SubAgentManagementProps> = ({ agentId }) => {
  const [subAgents, setSubAgents] = useState<SubAgent[]>(
    mockSubAgents.filter(sa => sa.agentId === agentId)
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSubAgent, setEditingSubAgent] = useState<SubAgent | null>(null);
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

  const handleAddSubAgent = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSubAgent: SubAgent = {
      id: Date.now().toString(),
      ...formData,
      role: 'agent' as const,
      agentId,
      createdAt: new Date()
    };

    setSubAgents([...subAgents, newSubAgent]);
    setIsAddDialogOpen(false);
    resetForm();
    
    toast({
      title: "Sub Agent Added",
      description: `${formData.name} has been successfully added as a sub-agent.`,
    });
  };

  const handleEditSubAgent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingSubAgent) return;

    const updatedSubAgents = subAgents.map(subAgent => 
      subAgent.id === editingSubAgent.id 
        ? { ...subAgent, ...formData }
        : subAgent
    );

    setSubAgents(updatedSubAgents);
    setIsEditDialogOpen(false);
    setEditingSubAgent(null);
    resetForm();
    
    toast({
      title: "Sub Agent Updated",
      description: `${formData.name}'s details have been successfully updated.`,
    });
  };

  const handleDeleteSubAgent = (subAgentId: string) => {
    const subAgent = subAgents.find(sa => sa.id === subAgentId);
    setSubAgents(subAgents.filter(sa => sa.id !== subAgentId));
    
    toast({
      title: "Sub Agent Deleted",
      description: `${subAgent?.name} has been removed from your team.`,
    });
  };

  const openEditDialog = (subAgent: SubAgent) => {
    setEditingSubAgent(subAgent);
    setFormData({
      name: subAgent.name,
      email: subAgent.email,
      mobile: subAgent.mobile,
      countryCode: subAgent.countryCode,
      password: subAgent.password
    });
    setIsEditDialogOpen(true);
  };

  const SubAgentForm = ({ onSubmit, isEdit = false }: { onSubmit: (e: React.FormEvent) => void; isEdit?: boolean }) => (
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
        {isEdit ? 'Update Sub Agent' : 'Add Sub Agent'}
      </Button>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Sub Agents ({subAgents.length})</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Sub Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Sub Agent</DialogTitle>
            </DialogHeader>
            <SubAgentForm onSubmit={handleAddSubAgent} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Sub Agents</CardTitle>
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
              {subAgents.map((subAgent) => (
                <TableRow key={subAgent.id}>
                  <TableCell className="font-medium">{subAgent.name}</TableCell>
                  <TableCell>{subAgent.email}</TableCell>
                  <TableCell>{subAgent.countryCode} {subAgent.mobile}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Active</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(subAgent)}
                      >
                        <EditIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteSubAgent(subAgent.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {subAgents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No sub agents created yet.</p>
              <p className="text-sm">Add your first sub agent to start delegating tasks.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Sub Agent</DialogTitle>
          </DialogHeader>
          <SubAgentForm onSubmit={handleEditSubAgent} isEdit={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubAgentManagement;
