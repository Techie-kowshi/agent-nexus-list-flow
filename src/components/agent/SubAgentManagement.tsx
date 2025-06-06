
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
import { PlusIcon, EditIcon, TrashIcon, Users, Zap, Brain } from 'lucide-react';
import NeonButton from '../ui/neon-button';

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
      title: "🎯 Sub-Agent Deployed",
      description: `${formData.name} has been neural-linked to your network. +100 XP earned!`,
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
      title: "🔧 Neural Link Updated",
      description: `${formData.name}'s neural patterns have been recalibrated successfully.`,
    });
  };

  const handleDeleteSubAgent = (subAgentId: string) => {
    const subAgent = subAgents.find(sa => sa.id === subAgentId);
    setSubAgents(subAgents.filter(sa => sa.id !== subAgentId));
    
    toast({
      title: "⚡ Neural Link Severed",
      description: `${subAgent?.name} has been disconnected from the neural network.`,
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
        <Label htmlFor="name" className="text-cyan-400">Neural Identifier</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="bg-gray-800 border-gray-600 text-white focus:border-cyan-400"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-cyan-400">Neural Email Channel</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="bg-gray-800 border-gray-600 text-white focus:border-cyan-400"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="countryCode" className="text-cyan-400">Region Code</Label>
          <Select 
            value={formData.countryCode} 
            onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              {countryCodes.map((code) => (
                <SelectItem key={code.value} value={code.value} className="text-white">
                  {code.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mobile" className="text-cyan-400">Neural Contact</Label>
          <Input
            id="mobile"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            required
            className="bg-gray-800 border-gray-600 text-white focus:border-cyan-400"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-cyan-400">Neural Access Key</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="bg-gray-800 border-gray-600 text-white focus:border-cyan-400"
        />
      </div>
      
      <NeonButton type="submit" className="w-full" glowColor="cyan" intensity="high">
        {isEdit ? '🔧 UPDATE NEURAL LINK' : '⚡ DEPLOY SUB-AGENT'}
      </NeonButton>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-cyan-400">Sub-Agent Neural Network</h3>
            <p className="text-sm text-gray-400">({subAgents.length} active neural links)</p>
          </div>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <NeonButton onClick={resetForm} glowColor="purple" intensity="medium">
              <PlusIcon className="w-4 h-4 mr-2" />
              DEPLOY NEW SUB-AGENT
            </NeonButton>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-cyan-400">Deploy New Sub-Agent</DialogTitle>
            </DialogHeader>
            <SubAgentForm onSubmit={handleAddSubAgent} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Users className="w-6 h-6" />
            Active Sub-Agent Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Neural ID</TableHead>
                <TableHead className="text-gray-300">Communication Channel</TableHead>
                <TableHead className="text-gray-300">Neural Contact</TableHead>
                <TableHead className="text-gray-300">Link Status</TableHead>
                <TableHead className="text-gray-300">Neural Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subAgents.map((subAgent) => (
                <TableRow key={subAgent.id} className="border-gray-700 hover:bg-gray-800/50">
                  <TableCell className="font-medium text-cyan-400">{subAgent.name}</TableCell>
                  <TableCell className="text-gray-300">{subAgent.email}</TableCell>
                  <TableCell className="text-gray-300">{subAgent.countryCode} {subAgent.mobile}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <Zap className="w-3 h-3 mr-1" />
                      NEURAL ACTIVE
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(subAgent)}
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
                      >
                        <EditIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteSubAgent(subAgent.id)}
                        className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
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
            <div className="text-center py-12 text-gray-500">
              <Brain className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-lg">No sub-agents in neural network yet.</p>
              <p className="text-sm">Deploy your first sub-agent to expand your neural reach.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">Recalibrate Neural Link</DialogTitle>
          </DialogHeader>
          <SubAgentForm onSubmit={handleEditSubAgent} isEdit={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubAgentManagement;
