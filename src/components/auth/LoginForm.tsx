
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Agent } from '../../types/auth';
import { mockAdmins, mockAgents } from '../../data/mockData';
import { useToast } from '@/hooks/use-toast';
import { UserIcon, ShieldIcon, Users2Icon, TrendingUpIcon, ZapIcon, CheckCircleIcon, GamepadIcon, RocketIcon, StarIcon, LockIcon, MailIcon } from 'lucide-react';
import ParticleBackground from '../ui/particle-background';
import NeonButton from '../ui/neon-button';

interface LoginFormProps {
  onLogin: (user: User, role: 'admin' | 'agent') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'agent'>('admin');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const users = selectedRole === 'admin' ? mockAdmins : mockAgents;
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        onLogin(userWithoutPassword as User, selectedRole);
        toast({
          title: "🚀 Neural Link Established",
          description: `Welcome to the Matrix, ${user.name}. Your access level: ${selectedRole.toUpperCase()}`,
        });
      } else {
        toast({
          title: "🔒 Access Denied",
          description: "Invalid neural signature. Please verify your credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "⚠️ System Malfunction",
        description: "Connection to the mainframe failed. Please retry neural link.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const systemFeatures = [
    { icon: GamepadIcon, title: "Neural Command Center", desc: "Control unlimited agents with AI-powered precision" },
    { icon: RocketIcon, title: "Quantum Task Engine", desc: "Process millions of operations at light speed" },
    { icon: StarIcon, title: "Holographic Analytics", desc: "3D data visualization with predictive insights" },
    { icon: ZapIcon, title: "Auto-Load Balancing", desc: "Smart distribution across infinite networks" }
  ];

  const roleInfo = {
    admin: {
      title: "System Administrator",
      description: "Full neural network access and control",
      permissions: ["Manage all agents", "Global task distribution", "System analytics", "Network security"],
      color: "cyan"
    },
    agent: {
      title: "Field Agent",
      description: "Execute missions and manage sub-agents",
      permissions: ["Task execution", "Sub-agent management", "Mission reports", "Performance tracking"],
      color: "purple"
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Dynamic grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full animate-pulse"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4 lg:p-8 min-h-screen">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - System Information */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center animate-spin-slow shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                  <ZapIcon className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold">
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      NEURAL NEXUS
                    </span>
                  </h1>
                  <p className="text-cyan-400 font-mono text-sm tracking-wider">v3.0 QUANTUM EDITION</p>
                </div>
              </div>
              
              <p className="text-xl text-cyan-100 max-w-2xl leading-relaxed">
                Enter the ultimate workforce management matrix. Command infinite agent networks, 
                process quantum-scale operations, and dominate your industry with advanced AI technology.
              </p>
            </div>

            {/* System Features */}
            <div className="grid md:grid-cols-2 gap-4">
              {systemFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="group p-4 bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-300 group-hover:text-cyan-100 transition-colors">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Interface */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md space-y-6">
              
              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(roleInfo).map(([role, info]) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role as 'admin' | 'agent')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedRole === role
                        ? `border-${info.color}-400 bg-${info.color}-500/20 shadow-[0_0_20px_rgba(0,255,255,0.3)]`
                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {role === 'admin' ? (
                        <ShieldIcon className={`w-6 h-6 ${selectedRole === role ? 'text-cyan-400' : 'text-gray-400'}`} />
                      ) : (
                        <UserIcon className={`w-6 h-6 ${selectedRole === role ? 'text-purple-400' : 'text-gray-400'}`} />
                      )}
                      <h3 className={`font-bold ${selectedRole === role ? `text-${info.color}-400` : 'text-gray-300'}`}>
                        {info.title}
                      </h3>
                    </div>
                    <p className={`text-xs ${selectedRole === role ? 'text-gray-200' : 'text-gray-500'}`}>
                      {info.description}
                    </p>
                  </button>
                ))}
              </div>

              {/* Access Permissions */}
              <Card className="border-0 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  selectedRole === 'admin' 
                    ? 'from-cyan-500/20 via-blue-500/20 to-purple-500/20' 
                    : 'from-purple-500/20 via-pink-500/20 to-cyan-500/20'
                } opacity-50`} />
                
                <div className="relative z-10">
                  <CardHeader className="pb-4">
                    <CardTitle className={`text-lg ${selectedRole === 'admin' ? 'text-cyan-400' : 'text-purple-400'}`}>
                      Access Permissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {roleInfo[selectedRole].permissions.map((permission, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircleIcon className={`w-4 h-4 ${selectedRole === 'admin' ? 'text-cyan-400' : 'text-purple-400'}`} />
                          <span className="text-xs text-gray-300">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>

              {/* Login Form */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  selectedRole === 'admin'
                    ? 'from-cyan-500 via-blue-500 to-purple-500'
                    : 'from-purple-500 via-pink-500 to-cyan-500'
                } opacity-75 blur-sm`} />
                <div className="absolute inset-[1px] bg-gradient-to-br from-gray-900 to-black rounded-lg" />
                
                <div className="relative z-10">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className={`text-2xl font-bold ${
                      selectedRole === 'admin' 
                        ? 'text-cyan-400' 
                        : 'text-purple-400'
                    }`}>
                      NEURAL ACCESS PORTAL
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Authenticate your neural signature
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className={`${
                            selectedRole === 'admin' ? 'text-cyan-400' : 'text-purple-400'
                          } font-bold tracking-wider flex items-center gap-2`}>
                            <MailIcon className="w-4 h-4" />
                            NEURAL ID
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={`${selectedRole}@nexus.core`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`bg-gray-800/70 border-gray-600 focus:border-${
                              selectedRole === 'admin' ? 'cyan' : 'purple'
                            }-400 text-white placeholder-gray-400 h-12`}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="password" className={`${
                            selectedRole === 'admin' ? 'text-cyan-400' : 'text-purple-400'
                          } font-bold tracking-wider flex items-center gap-2`}>
                            <LockIcon className="w-4 h-4" />
                            SECURITY KEY
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter neural passkey"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={`bg-gray-800/70 border-gray-600 focus:border-${
                              selectedRole === 'admin' ? 'cyan' : 'purple'
                            }-400 text-white placeholder-gray-400 h-12`}
                          />
                        </div>
                      </div>
                      
                      <NeonButton 
                        type="submit" 
                        className="w-full h-14 text-lg font-bold tracking-wider"
                        glowColor={selectedRole === 'admin' ? 'cyan' : 'purple'}
                        intensity="high"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 border-2 ${
                              selectedRole === 'admin' 
                                ? 'border-cyan-400/30 border-t-cyan-400' 
                                : 'border-purple-400/30 border-t-purple-400'
                            } rounded-full animate-spin`} />
                            ESTABLISHING LINK...
                          </div>
                        ) : (
                          `⚡ INITIALIZE ${selectedRole.toUpperCase()} ACCESS ⚡`
                        )}
                      </NeonButton>
                      
                      {/* Demo Credentials */}
                      <div className={`text-sm p-4 rounded-lg border backdrop-blur-sm ${
                        selectedRole === 'admin'
                          ? 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30'
                          : 'text-purple-300 bg-purple-500/10 border-purple-500/30'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <ZapIcon className="w-4 h-4" />
                          <strong>DEMO CREDENTIALS</strong>
                        </div>
                        <div className="font-mono text-xs">
                          {selectedRole === 'admin' ? (
                            <>ID: admin@example.com<br />KEY: admin123</>
                          ) : (
                            <>ID: john.smith@example.com<br />KEY: agent123</>
                          )}
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-cyan-500/30 bg-black/90 backdrop-blur-sm z-10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6 text-cyan-400 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                QUANTUM CORES: ONLINE
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                NEURAL MATRIX: ACTIVE
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                AI SYSTEMS: SYNCHRONIZED
              </div>
            </div>
            <div className="text-gray-500 text-xs font-mono">
              NEXUS v3.0.1 | BUILD 2024.06.06
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
