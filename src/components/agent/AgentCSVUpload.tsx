
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '../../types/auth';
import { mockSubAgents } from '../../data/mockData';
import { useToast } from '@/hooks/use-toast';
import { UploadIcon, FileIcon, CheckIcon, DownloadIcon } from 'lucide-react';

interface AgentCSVUploadProps {
  agentId: string;
}

const AgentCSVUpload: React.FC<AgentCSVUploadProps> = ({ agentId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [distributedTasks, setDistributedTasks] = useState<Task[]>([]);
  const [distributionMode, setDistributionMode] = useState<'equal' | 'manual'>('equal');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const subAgents = mockSubAgents.filter(sa => sa.agentId === agentId);

  const allowedTypes = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  const sampleCSV = `FirstName,Phone,Notes
Alice Johnson,+1234567890,Product demo scheduled
Bob Williams,+1987654321,Follow up on pricing
Carol Davis,+1122334455,Technical questions pending
Daniel Miller,+1555666777,Contract review needed
Eva Brown,+1999888777,Implementation planning`;

  const downloadSampleCSV = () => {
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'sample-agent-tasks.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    
    if (!selectedFile) return;

    if (!allowedTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV, XLS, or XLSX file.",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
  };

  const parseCSV = (csvText: string): Task[] => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const tasks: Task[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      if (values.length >= 3 && values[0] && values[1]) {
        tasks.push({
          id: Date.now().toString() + i,
          firstName: values[0],
          phone: values[1],
          notes: values[2] || '',
          status: 'pending',
          assignedBy: agentId,
          createdAt: new Date()
        });
      }
    }
    
    return tasks;
  };

  const distributeTasks = (tasks: Task[]) => {
    if (subAgents.length === 0) {
      toast({
        title: "No Sub Agents",
        description: "Please create sub agents first before uploading tasks.",
        variant: "destructive",
      });
      return [];
    }

    const tasksPerAgent = Math.floor(tasks.length / subAgents.length);
    const remainingTasks = tasks.length % subAgents.length;
    
    let taskIndex = 0;
    
    subAgents.forEach((subAgent, agentIndex) => {
      const agentTaskCount = tasksPerAgent + (agentIndex < remainingTasks ? 1 : 0);
      
      for (let i = 0; i < agentTaskCount; i++) {
        if (taskIndex < tasks.length) {
          tasks[taskIndex].assignedTo = subAgent.id;
          taskIndex++;
        }
      }
    });
    
    return tasks;
  };

  const handleUpload = async () => {
    if (!file) return;

    if (subAgents.length === 0) {
      toast({
        title: "No Sub Agents",
        description: "Please create sub agents first before uploading tasks.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const csvText = e.target?.result as string;
        
        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
          setUploadProgress(i);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        const parsedTasks = parseCSV(csvText);
        const distributedTaskList = distributeTasks(parsedTasks);
        
        setDistributedTasks(distributedTaskList);
        
        toast({
          title: "Upload Successful",
          description: `${distributedTaskList.length} tasks uploaded and distributed among ${subAgents.length} sub agents.`,
        });
        
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      };
      
      reader.readAsText(file);
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error processing your file.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const getSubAgentName = (subAgentId: string) => {
    const subAgent = subAgents.find(sa => sa.id === subAgentId);
    return subAgent?.name || 'Unknown Sub Agent';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DownloadIcon className="w-5 h-5" />
            Sample CSV Format
          </CardTitle>
          <CardDescription>
            Download a sample CSV file to understand the required format for agent tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={downloadSampleCSV} variant="outline">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download Sample CSV
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Tasks</CardTitle>
          <CardDescription>
            Upload a CSV file with new tasks. These will be distributed among your sub-agents.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {subAgents.length === 0 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> You need to create sub agents first before you can upload and distribute tasks.
              </p>
            </div>
          )}

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {!file ? (
              <div className="space-y-2">
                <UploadIcon className="w-8 h-8 mx-auto text-gray-400" />
                <p className="text-sm text-gray-600">
                  Click to select a CSV, XLS, or XLSX file
                </p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  Select File
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <FileIcon className="w-8 h-8 mx-auto text-green-500" />
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
                <div className="flex gap-2 justify-center">
                  <Button 
                    onClick={handleUpload} 
                    disabled={uploading || subAgents.length === 0}
                  >
                    {uploading ? 'Processing...' : 'Upload & Distribute'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing file...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
        </CardContent>
      </Card>

      {distributedTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              Upload Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{distributedTasks.length}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{subAgents.length}</div>
                <div className="text-sm text-gray-600">Sub Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {subAgents.length > 0 ? Math.floor(distributedTasks.length / subAgents.length) : 0}
                </div>
                <div className="text-sm text-gray-600">Tasks/Sub Agent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {subAgents.length > 0 ? distributedTasks.length % subAgents.length : 0}
                </div>
                <div className="text-sm text-gray-600">Extra Tasks</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Recent Tasks:</h4>
              {distributedTasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">{task.firstName} - {task.phone}</span>
                  <Badge variant="outline">
                    {getSubAgentName(task.assignedTo!)}
                  </Badge>
                </div>
              ))}
              {distributedTasks.length > 5 && (
                <p className="text-sm text-gray-500">
                  And {distributedTasks.length - 5} more tasks...
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgentCSVUpload;
