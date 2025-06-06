
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'sub-agent';
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

export interface GameStats {
  level: number;
  xp: number;
  achievements: Achievement[];
  quests: Quest[];
}

export interface Achievement {
  id: string;
  type: 'streak' | 'milestone' | 'performance' | 'leadership' | 'elite';
  level: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  completed: boolean;
  type: 'daily' | 'weekly' | 'special';
}
