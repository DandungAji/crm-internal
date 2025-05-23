
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Search, Filter, Users, Clock, MoreHorizontal, CheckSquare, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

// Define the project type
type Project = {
  id: number;
  name: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  dueDate: string;
  teamMembers: string[];
  tasksTotal: number;
  tasksCompleted: number;
  budget: string;
  client: string;
};

// Project form type
type ProjectFormData = {
  name: string;
  description: string;
  priority: string;
  dueDate: Date | undefined;
  budget: string;
  client: string;
};

const Projects = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    priority: "",
    dueDate: undefined,
    budget: "",
    client: "Internal"
  });

  // Mock project data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Website Redesign",
      description: "Complete overhaul of company website with new branding and improved UX",
      status: "In Progress",
      priority: "High",
      progress: 65,
      dueDate: "2024-01-15",
      teamMembers: ["Alice", "Bob", "Charlie"],
      tasksTotal: 24,
      tasksCompleted: 16,
      budget: "$25,000",
      client: "Internal"
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Native iOS and Android app for customer engagement",
      status: "Planning",
      priority: "High",
      progress: 20,
      dueDate: "2024-02-28",
      teamMembers: ["David", "Emma", "Frank", "Grace"],
      tasksTotal: 45,
      tasksCompleted: 9,
      budget: "$50,000",
      client: "TechCorp"
    },
    {
      id: 3,
      name: "Marketing Campaign",
      description: "Q1 digital marketing campaign across multiple channels",
      status: "Review",
      priority: "Medium",
      progress: 80,
      dueDate: "2024-01-10",
      teamMembers: ["Helen", "Ivan", "Jack"],
      tasksTotal: 15,
      tasksCompleted: 12,
      budget: "$15,000",
      client: "Marketing Dept"
    },
    {
      id: 4,
      name: "Database Migration",
      description: "Migrate legacy database to new cloud infrastructure",
      status: "In Progress",
      priority: "Critical",
      progress: 45,
      dueDate: "2024-01-20",
      teamMembers: ["Kelly", "Liam", "Maya", "Noah"],
      tasksTotal: 18,
      tasksCompleted: 8,
      budget: "$30,000",
      client: "IT Department"
    },
    {
      id: 5,
      name: "Employee Training Portal",
      description: "Development of internal training and onboarding platform",
      status: "Completed",
      priority: "Medium",
      progress: 100,
      dueDate: "2023-12-15",
      teamMembers: ["Olivia", "Paul"],
      tasksTotal: 12,
      tasksCompleted: 12,
      budget: "$20,000",
      client: "HR Department"
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id.replace('project-', '')]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateProject = () => {
    // Validate form
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive"
      });
      return;
    }

    // Create new project
    const newProject: Project = {
      id: projects.length + 1,
      name: formData.name,
      description: formData.description || "No description provided",
      status: "Planning",
      priority: formData.priority || "Medium",
      progress: 0,
      dueDate: formData.dueDate ? format(formData.dueDate, "yyyy-MM-dd") : "Not set",
      teamMembers: [],
      tasksTotal: 0,
      tasksCompleted: 0,
      budget: formData.budget || "$0",
      client: formData.client || "Internal"
    };

    // Add to projects array
    setProjects(prev => [newProject, ...prev]);
    
    // Reset form and close dialog
    setFormData({
      name: "",
      description: "",
      priority: "",
      dueDate: undefined,
      budget: "",
      client: "Internal"
    });
    
    setIsNewProjectOpen(false);
    
    toast({
      title: "Success",
      description: `Project "${newProject.name}" has been created`,
    });
  };

  const handleViewProject = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Planning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Review": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Completed": return "bg-green-100 text-green-800 border-green-200";
      case "On Hold": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-600 mt-1">Manage and track all your projects in one place</p>
        </div>
        
        <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new project to your workspace. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input 
                  id="project-name" 
                  placeholder="Enter project name" 
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea 
                  id="project-description" 
                  placeholder="Project description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-client">Client</Label>
                <Input 
                  id="project-client" 
                  placeholder="Client name" 
                  value={formData.client}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Priority</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('priority', value)}
                    value={formData.priority}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("justify-start text-left font-normal", !formData.dueDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dueDate ? format(formData.dueDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar 
                        mode="single" 
                        selected={formData.dueDate} 
                        onSelect={(date) => setFormData(prev => ({ ...prev, dueDate: date }))}
                        initialFocus 
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-budget">Budget</Label>
                <Input 
                  id="project-budget" 
                  placeholder="$0.00" 
                  value={formData.budget}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsNewProjectOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card 
            key={project.id} 
            className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border-slate-200 cursor-pointer"
            onClick={() => handleViewProject(project.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-semibold text-slate-900">{project.name}</CardTitle>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    toast({
                      title: "Project Options",
                      description: "Options menu will be implemented soon",
                    });
                  }}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-3">
                <Badge className={`${getStatusColor(project.status)} text-xs`}>
                  {project.status}
                </Badge>
                <Badge className={`${getPriorityColor(project.priority)} text-xs`}>
                  {project.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Progress</span>
                  <span className="text-sm text-slate-600">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Task Summary */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center text-slate-600">
                  <CheckSquare className="h-4 w-4 mr-1" />
                  {project.tasksCompleted}/{project.tasksTotal} tasks
                </div>
                <div className="flex items-center text-slate-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {project.dueDate}
                </div>
              </div>

              {/* Team & Budget */}
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-slate-600">
                  <Users className="h-4 w-4 mr-1" />
                  {project.teamMembers.length} members
                </div>
                <div className="text-sm font-medium text-slate-900">{project.budget}</div>
              </div>

              {/* Team Members */}
              <div className="flex -space-x-2">
                {project.teamMembers.slice(0, 4).map((member, index) => (
                  <div key={index} className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                    {member.charAt(0)}
                  </div>
                ))}
                {project.teamMembers.length > 4 && (
                  <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-slate-600 text-xs font-medium border-2 border-white">
                    +{project.teamMembers.length - 4}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <FolderKanban className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No projects found</h3>
          <p className="text-slate-600">Try adjusting your search or filters, or create a new project.</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
