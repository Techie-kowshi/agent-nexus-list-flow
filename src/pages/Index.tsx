
import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import AdminDashboard from '../components/admin/AdminDashboard';
import AgentDashboard from '../components/agent/AgentDashboard';
import SubAgentDashboard from '../components/agent/SubAgentDashboard';
import { User, SubAgent } from '../types/auth';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'agent' | 'sub-agent' | null>(null);

  const handleLogin = (user: User, role: 'admin' | 'agent' | 'sub-agent') => {
    setCurrentUser(user);
    setUserRole(role);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
  };

  if (!currentUser || !userRole) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {userRole === 'admin' ? (
        <AdminDashboard user={currentUser} onLogout={handleLogout} />
      ) : userRole === 'agent' ? (
        <AgentDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <SubAgentDashboard subAgent={currentUser as SubAgent} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
