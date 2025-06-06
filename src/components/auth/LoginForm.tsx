
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Agent } from '../../types/auth';
import { mockAdmins, mockAgents } from '../../data/mockData';
import { useToast } from '@/hooks/use-toast';
import { UserIcon, ShieldIcon, Users2Icon, TrendingUpIcon, ZapIcon, CheckCircleIcon } from 'lucide-react';

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
      // Simulate authentication
      const users = role === 'admin' ? mockAdmins : mockAgents;
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        onLogin(userWithoutPassword as User, role);
        toast({
          title: "🎉 Welcome Back!",
          description: `Successfully logged in as ${user.name}`,
        });
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid credentials. Please check your email and password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Users2Icon, title: "Smart Agent Management", desc: "Create and manage unlimited agents with role-based permissions" },
    { icon: ZapIcon, title: "Lightning-Fast CSV Processing", desc: "Upload and distribute thousands of tasks in seconds" },
    { icon: TrendingUpIcon, title: "Real-Time Analytics", desc: "Track performance with live dashboards and insights" },
    { icon: CheckCircleIcon, title: "Automated Task Distribution", desc: "AI-powered equal distribution across your team" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Features */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                <ZapIcon className="w-4 h-4" />
                Enterprise Task Management
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
                Revolutionize Your
                <span className="block">Workforce Management</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Transform how you manage agents, distribute tasks, and track performance with our cutting-edge platform designed for modern enterprises.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Sign in to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="admin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
                    <TabsTrigger value="admin" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <ShieldIcon className="w-4 h-4" />
                      Admin
                    </TabsTrigger>
                    <TabsTrigger value="agent" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <UserIcon className="w-4 h-4" />
                      Agent
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="admin">
                    <form onSubmit={(e) => handleSubmit(e, 'admin')} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin-email" className="text-gray-700 font-medium">Email Address</Label>
                        <Input
                          id="admin-email"
                          type="email"
                          placeholder="admin@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-password" className="text-gray-700 font-medium">Password</Label>
                        <Input
                          id="admin-password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-200 hover:scale-[1.02]" 
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Signing in...
                          </div>
                        ) : (
                          'Sign In as Admin'
                        )}
                      </Button>
                      <div className="text-sm text-gray-600 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <strong>Demo:</strong> admin@example.com / admin123
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="agent">
                    <form onSubmit={(e) => handleSubmit(e, 'agent')} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="agent-email" className="text-gray-700 font-medium">Email Address</Label>
                        <Input
                          id="agent-email"
                          type="email"
                          placeholder="agent@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="agent-password" className="text-gray-700 font-medium">Password</Label>
                        <Input
                          id="agent-password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-3 rounded-lg transition-all duration-200 hover:scale-[1.02]" 
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Signing in...
                          </div>
                        ) : (
                          'Sign In as Agent'
                        )}
                      </Button>
                      <div className="text-sm text-gray-600 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                        <strong>Demo:</strong> john.smith@example.com / agent123
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">Trusted by leading companies worldwide</p>
            <div className="flex justify-center items-center gap-8 text-gray-400">
              <div className="text-lg font-semibold">Enterprise Ready</div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="text-lg font-semibold">SOC 2 Compliant</div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="text-lg font-semibold">99.9% Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
