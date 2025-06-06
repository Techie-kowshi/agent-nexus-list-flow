
import { Agent, SubAgent, Task } from '../types/auth';

export const mockAdmins = [
  {
    id: 'admin1',
    name: 'System Administrator',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as const,
    createdAt: new Date('2024-01-01')
  }
];

export const mockAgents: Agent[] = [
  {
    id: 'agent1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    mobile: '1234567890',
    countryCode: '+1',
    password: 'agent123',
    role: 'agent',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'agent2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    mobile: '9876543210',
    countryCode: '+1',
    password: 'agent456',
    role: 'agent',
    createdAt: new Date('2024-01-20')
  },
  {
    id: 'agent3',
    name: 'Mike Chen',
    email: 'mike.chen@example.com',
    mobile: '5555123456',
    countryCode: '+1',
    password: 'agent789',
    role: 'agent',
    createdAt: new Date('2024-01-25')
  },
  {
    id: 'agent4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    mobile: '7778889999',
    countryCode: '+1',
    password: 'agent321',
    role: 'agent',
    createdAt: new Date('2024-02-01')
  },
  {
    id: 'agent5',
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    mobile: '1112223333',
    countryCode: '+1',
    password: 'agent654',
    role: 'agent',
    createdAt: new Date('2024-02-05')
  }
];

export const mockSubAgents: SubAgent[] = [
  {
    id: 'subagent1',
    name: 'Alex Thompson',
    email: 'alex.thompson@example.com',
    mobile: '5551234567',
    countryCode: '+1',
    password: 'sub123',
    role: 'agent',
    agentId: 'agent1',
    createdAt: new Date('2024-02-10')
  },
  {
    id: 'subagent2',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@example.com',
    mobile: '5559876543',
    countryCode: '+1',
    password: 'sub456',
    role: 'agent',
    agentId: 'agent1',
    createdAt: new Date('2024-02-12')
  },
  {
    id: 'subagent3',
    name: 'David Kim',
    email: 'david.kim@example.com',
    mobile: '5555551234',
    countryCode: '+1',
    password: 'sub789',
    role: 'agent',
    agentId: 'agent2',
    createdAt: new Date('2024-02-15')
  }
];

export const mockTasks: Task[] = [
  {
    id: 'task1',
    firstName: 'Michael Brown',
    phone: '+1234567890',
    notes: 'Interested in premium package, follow up next week',
    assignedTo: 'agent1',
    assignedBy: 'admin',
    status: 'pending',
    createdAt: new Date('2024-03-01')
  },
  {
    id: 'task2',
    firstName: 'Jennifer Wilson',
    phone: '+1987654321',
    notes: 'Price quote requested for enterprise solution',
    assignedTo: 'agent1',
    assignedBy: 'admin',
    status: 'in-progress',
    createdAt: new Date('2024-03-02')
  },
  {
    id: 'task3',
    firstName: 'Daniel Lee',
    phone: '+1122334455',
    notes: 'Technical support needed for integration',
    assignedTo: 'agent2',
    assignedBy: 'admin',
    status: 'completed',
    createdAt: new Date('2024-03-03')
  },
  {
    id: 'task4',
    firstName: 'Amanda Garcia',
    phone: '+1555666777',
    notes: 'Demo scheduled for Friday afternoon',
    assignedTo: 'agent2',
    assignedBy: 'admin',
    status: 'pending',
    createdAt: new Date('2024-03-04')
  },
  {
    id: 'task5',
    firstName: 'James Miller',
    phone: '+1999888777',
    notes: 'Contract renewal discussion needed',
    assignedTo: 'agent3',
    assignedBy: 'admin',
    status: 'in-progress',
    createdAt: new Date('2024-03-05')
  },
  {
    id: 'task6',
    firstName: 'Rachel Green',
    phone: '+1444555666',
    notes: 'New feature request and pricing inquiry',
    assignedTo: 'agent3',
    assignedBy: 'admin',
    status: 'pending',
    createdAt: new Date('2024-03-06')
  },
  {
    id: 'task7',
    firstName: 'Kevin Taylor',
    phone: '+1777888999',
    notes: 'Training session required for team onboarding',
    assignedTo: 'agent4',
    assignedBy: 'admin',
    status: 'completed',
    createdAt: new Date('2024-03-07')
  },
  {
    id: 'task8',
    firstName: 'Nicole Anderson',
    phone: '+1333222111',
    notes: 'Account upgrade and billing questions',
    assignedTo: 'agent4',
    assignedBy: 'admin',
    status: 'pending',
    createdAt: new Date('2024-03-08')
  },
  {
    id: 'task9',
    firstName: 'Steven Clark',
    phone: '+1666777888',
    notes: 'Custom solution development discussion',
    assignedTo: 'agent5',
    assignedBy: 'admin',
    status: 'in-progress',
    createdAt: new Date('2024-03-09')
  },
  {
    id: 'task10',
    firstName: 'Maria Martinez',
    phone: '+1888999000',
    notes: 'Partnership opportunity exploration',
    assignedTo: 'agent5',
    assignedBy: 'admin',
    status: 'pending',
    createdAt: new Date('2024-03-10')
  }
];
