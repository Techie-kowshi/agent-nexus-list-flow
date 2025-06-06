
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
  createdAt?: Date;
}

export interface Agent extends User {
  mobile: string;
  countryCode: string;
  password: string;
  adminId?: string;
}

export interface SubAgent extends Agent {
  agentId: string;
}

export interface Task {
  id: string;
  firstName: string;
  phone: string;
  notes: string;
  assignedTo?: string;
  assignedBy?: string;
  status: 'pending' | 'completed' | 'in-progress';
  createdAt: Date;
}

export interface TaskDistribution {
  id: string;
  agentId: string;
  agentName: string;
  tasks: Task[];
  totalTasks: number;
}
