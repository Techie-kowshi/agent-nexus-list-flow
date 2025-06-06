
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '../../types/auth';
import { mockTasks, mockSubAgents } from '../../data/mockData';
import { useToast } from '@/hooks/use-toast';
import { UsersIcon, CheckIcon } from 'lucide-react';

interface TaskProvisionProps {
  agentId: string;
}

const TaskProvision: React.FC<TaskProvisionProps> = ({ agentId }) => {
  const [availableTasks, setAvailableTasks] = useState<Task[]>(
    mockTasks.filter(task => task.assignedTo === agentId && !task.assignedBy)
  );
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectedSubAgent, setSelectedSubAgent] = useState<string>('');
  const [isProvisionDialogOpen, setIsProvisionDialogOpen] = useState(false);
  const { toast } = useToast();

  const subAgents = mockSubAgents.filter(sa => sa.agentId === agentId);

  const handleTaskSelection = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks([...selectedTasks, taskId]);
    } else {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    }
  };

  const handleSelectAllTasks = (checked: boolean) => {
    if (checked) {
      setSelectedTasks(availableTasks.map(task => task.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleProvisionTasks = () => {
    if (selectedTasks.length === 0 || !selectedSubAgent) {
      toast({
        title: "Invalid Selection",
        description: "Please select tasks and a sub-agent.",
        variant: "destructive",
      });
      return;
    }

    const selectedSubAgentData = subAgents.find(sa => sa.id === selectedSubAgent);
    
    setAvailableTasks(prevTasks => 
      prevTasks.map(task => 
        selectedTasks.includes(task.id) 
          ? { ...task, assignedTo: selectedSubAgent, assignedBy: agentId }
          : task
      )
    );

    toast({
      title: "Tasks Provisioned",
      description: `${selectedTasks.length} tasks have been assigned to ${selectedSubAgentData?.name}.`,
    });

    setSelectedTasks([]);
    setSelectedSubAgent('');
    setIsProvisionDialogOpen(false);
  };

  const getTasksBySubAgent = () => {
    const tasksBySubAgent = subAgents.map(subAgent => {
      const assignedTasks = availableTasks.filter(task => task.assignedTo === subAgent.id);
      return {
        subAgent,
        tasks: assignedTasks,
        totalTasks: assignedTasks.length
      };
    });

    return tasksBySubAgent;
  };

  const unassignedTasks = availableTasks.filter(task => !task.assignedBy);
  const taskDistribution = getTasksBySubAgent();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UsersIcon className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Available Tasks</p>
                <p className="text-xl font-bold">{unassignedTasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckIcon className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sub Agents</p>
                <p className="text-xl font-bold">{subAgents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <UsersIcon className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Assigned Tasks</p>
                <p className="text-xl font-bold">{availableTasks.filter(t => t.assignedBy).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Provision */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Available Tasks for Assignment</span>
            <Dialog open={isProvisionDialogOpen} onOpenChange={setIsProvisionDialogOpen}>
              <DialogTrigger asChild>
                <Button disabled={unassignedTasks.length === 0 || subAgents.length === 0}>
                  <UsersIcon className="w-4 h-4 mr-2" />
                  Assign Tasks
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Assign Tasks to Sub Agent</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Sub Agent</label>
                    <Select value={selectedSubAgent} onValueChange={setSelectedSubAgent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a sub agent" />
                      </SelectTrigger>
                      <SelectContent>
                        {subAgents.map((subAgent) => (
                          <SelectItem key={subAgent.id} value={subAgent.id}>
                            {subAgent.name} - {subAgent.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all"
                        checked={selectedTasks.length === unassignedTasks.length && unassignedTasks.length > 0}
                        onCheckedChange={handleSelectAllTasks}
                      />
                      <label htmlFor="select-all" className="text-sm font-medium">
                        Select All Tasks ({unassignedTasks.length})
                      </label>
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">Select</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Notes</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {unassignedTasks.map((task) => (
                            <TableRow key={task.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedTasks.includes(task.id)}
                                  onCheckedChange={(checked) => 
                                    handleTaskSelection(task.id, checked as boolean)
                                  }
                                />
                              </TableCell>
                              <TableCell className="font-medium">{task.firstName}</TableCell>
                              <TableCell>{task.phone}</TableCell>
                              <TableCell className="max-w-xs truncate">{task.notes}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-sm text-gray-600">
                      {selectedTasks.length} tasks selected
                    </span>
                    <Button 
                      onClick={handleProvisionTasks}
                      disabled={selectedTasks.length === 0 || !selectedSubAgent}
                    >
                      Assign Selected Tasks
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unassignedTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.firstName}</TableCell>
                  <TableCell>{task.phone}</TableCell>
                  <TableCell className="max-w-xs truncate">{task.notes}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{task.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {unassignedTasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No tasks available for assignment.</p>
              <p className="text-sm">All your tasks have been assigned to sub-agents.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sub Agent Task Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Sub Agent Task Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taskDistribution.map((distribution) => (
              <div key={distribution.subAgent.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium">{distribution.subAgent.name}</h4>
                    <p className="text-sm text-gray-600">{distribution.subAgent.email}</p>
                  </div>
                  <Badge variant="outline">
                    {distribution.totalTasks} tasks
                  </Badge>
                </div>
                
                {distribution.tasks.length > 0 && (
                  <div className="mt-3">
                    <div className="text-sm text-gray-600">Recent assignments:</div>
                    <div className="space-y-1 mt-1">
                      {distribution.tasks.slice(0, 3).map((task) => (
                        <div key={task.id} className="text-sm bg-gray-50 p-2 rounded">
                          {task.firstName} - {task.phone}
                        </div>
                      ))}
                      {distribution.tasks.length > 3 && (
                        <div className="text-xs text-gray-500">
                          And {distribution.tasks.length - 3} more tasks...
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {subAgents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No sub agents created yet.</p>
                <p className="text-sm">Create sub agents first to assign tasks to them.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskProvision;
