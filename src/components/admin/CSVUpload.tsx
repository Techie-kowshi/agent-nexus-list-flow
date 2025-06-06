
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Task } from '../../types/auth';
import { mockAgents } from '../../data/mockData';
import { useToast } from '@/hooks/use-toast';
import { UploadIcon, FileIcon, CheckIcon, AlertCircleIcon, DownloadIcon } from 'lucide-react';

const CSVUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [distributedTasks, setDistributedTasks] = useState<Task[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const allowedTypes = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  const sampleCSV = `FirstName,Phone,Notes
John Doe,+1234567890,Follow up on product inquiry
Jane Smith,+1987654321,Interested in premium package
Mike Johnson,+1122334455,Schedule demo next week
Sarah Wilson,+1555666777,Price quote requested
David Brown,+1999888777,Technical support needed`;

  const downloadSampleCSV = () => {
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'sample-tasks.csv';
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
          createdAt: new Date()
        });
      }
    }
    
    return tasks;
  };

  const distributeTasks = (tasks: Task[]) => {
    const agents = mockAgents.slice(0, 5); // Use first 5 agents
    const tasksPerAgent = Math.floor(tasks.length / agents.length);
    const remainingTasks = tasks.length % agents.length;
    
    let taskIndex = 0;
    
    agents.forEach((agent, agentIndex) => {
      const agentTaskCount = tasksPerAgent + (agentIndex < remainingTasks ? 1 : 0);
      
      for (let i = 0; i < agentTaskCount; i++) {
        if (taskIndex < tasks.length) {
          tasks[taskIndex].assignedTo = agent.id;
          tasks[taskIndex].assignedBy = 'admin';
          taskIndex++;
        }
      }
    });
    
    return tasks;
  };

  const handleUpload = async () => {
    if (!file) return;

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
          description: `${distributedTaskList.length} tasks uploaded and distributed among agents.`,
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

  const getAgentName = (agentId: string) => {
    const agent = mockAgents.find(a => a.id === agentId);
    return agent?.name || 'Unknown Agent';
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
            Download a sample CSV file to understand the required format
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
          <CardTitle>Upload Tasks</CardTitle>
          <CardDescription>
            Upload a CSV file with tasks. The tasks will be automatically distributed among your agents.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
                  <Button onClick={handleUpload} disabled={uploading}>
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
                <div className="text-2xl font-bold text-green-600">5</div>
                <div className="text-sm text-gray-600">Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.floor(distributedTasks.length / 5)}
                </div>
                <div className="text-sm text-gray-600">Tasks/Agent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {distributedTasks.length % 5}
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
                    {getAgentName(task.assignedTo!)}
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

export default CSVUpload;
