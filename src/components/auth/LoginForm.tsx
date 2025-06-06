
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Agent } from '../../types/auth';
import { mockAdmins, mockAgents } from '../../data/mockData';
import { useToast } from '@/hooks/use-toast';
import { UserIcon, ShieldIcon, Users2Icon, TrendingUpIcon, ZapIcon, CheckCircleIcon, GamepadIcon, RocketIcon, StarIcon } from 'lucide-react';
import ParticleBackground from '../ui/particle-background';
import NeonButton from '../ui/neon-button';

interface LoginFormProps {
  onLogin: (user: User, role: 'admin' | 'agent') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent, role: 'admin' | 'agent') => {
    e.preventDefault();
    setLoading(true);

    try {
      const users = role === 'admin' ? mockAdmins : mockAgents;
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        onLogin(userWithoutPassword as User, role);
        toast({
          title: "🚀 ACCESS GRANTED!",
          description: `Neural link established. Welcome back, ${user.name}`,
        });
      } else {
        toast({
          title: "🔒 ACCESS DENIED",
          description: "Invalid credentials detected. Please verify your neural signature.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "⚠️ SYSTEM ERROR",
        description: "Connection to mainframe failed. Please retry.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: GamepadIcon, title: "AI-Powered Agent Control", desc: "Command unlimited agents with neural-link precision and real-time synchronization" },
    { icon: RocketIcon, title: "Quantum Task Processing", desc: "Process millions of tasks instantly with our quantum-enhanced distribution engine" },
    { icon: StarIcon, title: "Holographic Analytics", desc: "Visualize performance data in stunning 3D holographic displays with predictive insights" },
    { icon: ZapIcon, title: "Lightning Distribution", desc: "Auto-balance workloads across infinite agent networks with zero latency" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full animate-pulse"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4 lg:p-8 min-h-screen">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Enhanced Features */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                  <ZapIcon className="w-8 h-8 text-white" />
                </div>
                <div className="bg-gradient-to-r from-cyan-400 to-purple-500 text-black px-6 py-3 rounded-full text-sm font-bold tracking-wider animate-bounce">
                  ⚡ NEURAL NEXUS v3.0 ⚡
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                  COMMAND
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-400 bg-clip-text text-transparent">
                  THE FUTURE
                </span>
              </h1>
              
              <p className="text-xl text-cyan-100 max-w-2xl leading-relaxed">
                Step into the ultimate workforce management experience. Control infinite agent networks, 
                process quantum-scale tasks, and dominate your industry with{' '}
                <span className="text-cyan-400 font-bold">Neural Nexus</span>.
              </p>
            </div>

            {/* Enhanced Features Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group p-6 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-cyan-400 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] cursor-pointer"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-300 group-hover:text-cyan-100 transition-colors duration-300">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Cyberpunk Login Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl relative overflow-hidden group">
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-[1px] bg-gradient-to-br from-gray-900 to-black rounded-lg" />
              
              <div className="relative z-10">
                <CardHeader className="text-center pb-8 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center animate-spin-slow">
                      <ShieldIcon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mt-8">
                    NEURAL ACCESS
                  </CardTitle>
                  <CardDescription className="text-cyan-200 text-lg">
                    Initialize connection to the mainframe
                  </CardDescription>
                  
                  {/* Scanning line */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
                </CardHeader>
                
                <CardContent className="relative">
                  <Tabs defaultValue="admin" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-800 border border-gray-600">
                      <TabsTrigger 
                        value="admin" 
                        className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
                      >
                        <ShieldIcon className="w-4 h-4" />
                        ADMIN
                      </TabsTrigger>
                      <TabsTrigger 
                        value="agent" 
                        className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all duration-300"
                      >
                        <UserIcon className="w-4 h-4" />
                        AGENT
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="admin">
                      <form onSubmit={(e) => handleSubmit(e, 'admin')} className="space-y-6">
                        <div className="space-y-3">
                          <Label htmlFor="admin-email" className="text-cyan-400 font-bold tracking-wider">NEURAL ID</Label>
                          <Input
                            id="admin-email"
                            type="email"
                            placeholder="admin@nexus.core"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-gray-800/50 border-gray-600 focus:border-cyan-400 focus:ring-cyan-400/20 text-white placeholder-gray-400 h-12"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="admin-password" className="text-cyan-400 font-bold tracking-wider">ACCESS CODE</Label>
                          <Input
                            id="admin-password"
                            type="password"
                            placeholder="Enter neural passkey"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-gray-800/50 border-gray-600 focus:border-cyan-400 focus:ring-cyan-400/20 text-white placeholder-gray-400 h-12"
                          />
                        </div>
                        <NeonButton 
                          type="submit" 
                          className="w-full h-14 text-lg font-bold tracking-wider"
                          glowColor="cyan"
                          intensity="high"
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                              CONNECTING...
                            </div>
                          ) : (
                            '⚡ INITIALIZE ACCESS ⚡'
                          )}
                        </NeonButton>
                        <div className="text-sm text-cyan-300 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30 backdrop-blur-sm">
                          <strong className="text-cyan-400">DEMO ACCESS:</strong> admin@example.com / admin123
                        </div>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="agent">
                      <form onSubmit={(e) => handleSubmit(e, 'agent')} className="space-y-6">
                        <div className="space-y-3">
                          <Label htmlFor="agent-email" className="text-purple-400 font-bold tracking-wider">AGENT ID</Label>
                          <Input
                            id="agent-email"
                            type="email"
                            placeholder="agent@nexus.core"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-gray-800/50 border-gray-600 focus:border-purple-400 focus:ring-purple-400/20 text-white placeholder-gray-400 h-12"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="agent-password" className="text-purple-400 font-bold tracking-wider">SECURITY KEY</Label>
                          <Input
                            id="agent-password"
                            type="password"
                            placeholder="Enter agent passkey"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-gray-800/50 border-gray-600 focus:border-purple-400 focus:ring-purple-400/20 text-white placeholder-gray-400 h-12"
                          />
                        </div>
                        <NeonButton 
                          type="submit" 
                          className="w-full h-14 text-lg font-bold tracking-wider"
                          glowColor="purple"
                          intensity="high"
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
                              SYNCING...
                            </div>
                          ) : (
                            '🚀 AGENT LOGIN 🚀'
                          )}
                        </NeonButton>
                        <div className="text-sm text-purple-300 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30 backdrop-blur-sm">
                          <strong className="text-purple-400">DEMO ACCESS:</strong> john.smith@example.com / agent123
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-cyan-500/30 bg-black/80 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-center items-center gap-8 text-cyan-400 text-sm font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              QUANTUM SERVERS ONLINE
            </div>
            <div className="w-px h-4 bg-cyan-500/50"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              NEURAL LINK ACTIVE
            </div>
            <div className="w-px h-4 bg-cyan-500/50"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              AI CORES SYNCHRONIZED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
