
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Clock, Users, TrendingUp, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for dashboard
  const stats = [
    { title: "Active Projects", value: "12", icon: TrendingUp, color: "bg-blue-500" },
    { title: "Tasks Due Today", value: "8", icon: Clock, color: "bg-orange-500" },
    { title: "Team Members", value: "24", icon: Users, color: "bg-green-500" },
    { title: "Completed This Week", value: "42", icon: CalendarDays, color: "bg-purple-500" }
  ];

  const recentProjects = [
    { id: 1, name: "Website Redesign", status: "In Progress", progress: 65, dueDate: "2024-01-15", team: 5 },
    { id: 2, name: "Mobile App Development", status: "Planning", progress: 20, dueDate: "2024-02-28", team: 8 },
    { id: 3, name: "Marketing Campaign", status: "Review", progress: 80, dueDate: "2024-01-10", team: 3 },
    { id: 4, name: "Database Migration", status: "In Progress", progress: 45, dueDate: "2024-01-20", team: 4 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Planning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Review": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Completed": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-slate-900">ProjectFlow</h1>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Internal CRM</Badge>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search projects, tasks, or team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back!</h2>
          <p className="text-slate-600">Here's what's happening with your projects today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`${stat.color} p-3 rounded-lg mr-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">{stat.title}</p>
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-sm border-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-slate-900">Recent Projects</CardTitle>
                <CardDescription>Keep track of your active projects and their progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-slate-900">{project.name}</h3>
                          <Badge className={`${getStatusColor(project.status)} text-xs font-medium`}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <span>Due: {project.dueDate}</span>
                          <span>{project.team} team members</span>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-slate-500">Progress</span>
                            <span className="text-xs text-slate-700 font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="bg-white shadow-sm border-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-left" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Task
                </Button>
                <Button variant="outline" className="w-full justify-start text-left" size="sm">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start text-left" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
                <p className="text-sm text-blue-700 mb-4">Explore our features and boost your productivity.</p>
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-200">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
