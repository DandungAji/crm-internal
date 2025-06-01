import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  MoreHorizontal,
  Settings,
  Trash2,
  Users,
  Calendar,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ProjectTeamManager from "@/components/ProjectTeamManager";
import ProjectTimeline from "@/components/ProjectTimeline";

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

const Projects = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [isTimelineDialogOpen, setIsTimelineDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Website Redesign",
      description:
        "Complete overhaul of company website with new branding and improved UX",
      status: "In Progress",
      priority: "High",
      progress: 65,
      dueDate: "2024-01-15",
      teamMembers: ["Alice", "Bob", "Charlie"],
      tasksTotal: 24,
      tasksCompleted: 16,
      budget: "$25,000",
      client: "Internal",
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
      client: "TechCorp",
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
      client: "Marketing Dept",
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
      client: "IT Department",
    },
  ]);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    budget: "",
    client: "",
  });

  const handleCreateProject = () => {
    if (!newProject.name || !newProject.description || !newProject.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const project: Project = {
      id: projects.length + 1,
      name: newProject.name,
      description: newProject.description,
      status: "Planning",
      priority: newProject.priority,
      progress: 0,
      dueDate: newProject.dueDate,
      teamMembers: [],
      tasksTotal: 0,
      tasksCompleted: 0,
      budget: newProject.budget,
      client: newProject.client,
    };

    setProjects([...projects, project]);
    setNewProject({
      name: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      budget: "",
      client: "",
    });
    setIsCreateDialogOpen(false);
    toast({
      title: "Success",
      description: "Project created successfully",
    });
  };

  const handleDeleteProject = (projectId: number) => {
    setProjects(projects.filter((p) => p.id !== projectId));
    toast({
      title: "Success",
      description: "Project deleted successfully",
    });
  };

  const handleManageTeam = (project: Project) => {
    setSelectedProject(project);
    setIsTeamDialogOpen(true);
  };

  const handleViewTimeline = (project: Project) => {
    setSelectedProject(project);
    setIsTimelineDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 hover:bg-blue-100/80 text-blue-800 border-blue-200";
      case "Planning":
        return "bg-yellow-100 hover:bg-yellow-100/80 text-yellow-800 border-yellow-200";
      case "Review":
        return "bg-purple-100 hover:bg-purple-100/80 text-purple-800 border-purple-200";
      case "Completed":
        return "bg-green-100 hover:bg-green-100/80 text-green-800 border-green-200";
      default:
        return "bg-gray-100 hover:bg-gray-100/80 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 hover:bg-red-100/80 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 hover:bg-orange-100/80 text-orange-800 border-orange-200";
      case "Medium":
        return "bg-blue-100 hover:bg-blue-100/80 text-blue-800 border-blue-200";
      case "Low":
        return "bg-green-100 hover:bg-green-100/80 text-green-800 border-green-200";
      default:
        return "bg-gray-100 hover:bg-gray-100/80 text-gray-800 border-gray-200";
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black-900">Projects</h1>
          <p className="text-black-600 mt-1">Manage and track your projects</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-black hover:bg-accent">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new project to your workspace
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <Label htmlFor="projectDesc">Description</Label>
                <Textarea
                  id="projectDesc"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter project description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectPriority">Priority</Label>
                  <Select
                    value={newProject.priority}
                    onValueChange={(value) =>
                      setNewProject({ ...newProject, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="projectDueDate">Due Date</Label>
                  <Input
                    id="projectDueDate"
                    type="date"
                    value={newProject.dueDate}
                    onChange={(e) =>
                      setNewProject({ ...newProject, dueDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectBudget">Budget</Label>
                  <Input
                    id="projectBudget"
                    value={newProject.budget}
                    onChange={(e) =>
                      setNewProject({ ...newProject, budget: e.target.value })
                    }
                    placeholder="$0"
                  />
                </div>
                <div>
                  <Label htmlFor="projectClient">Client</Label>
                  <Input
                    id="projectClient"
                    value={newProject.client}
                    onChange={(e) =>
                      setNewProject({ ...newProject, client: e.target.value })
                    }
                    placeholder="Client name"
                  />
                </div>
              </div>
              <Button onClick={handleCreateProject} className="w-full">
                Create Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 h-4 w-4" />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-accent"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle
                    className="text-lg font-semibold text-black-900 dark:text-black-100 cursor-pointer hover:text-primary"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    {project.name}
                  </CardTitle>
                  <CardDescription className="mt-1 text-black-600 dark:text-black-400">
                    {project.description}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Project Options</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleManageTeam(project)}>
                      <Users className="h-4 w-4 mr-2" />
                      Manage Team
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleViewTimeline(project)}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      View Timeline
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Project
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white dark:bg-black-800">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Project</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{project.name}"?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteProject(project.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={`${getStatusColor(project.status)} text-xs`}>
                  {project.status}
                </Badge>
                <Badge
                  className={`${getPriorityColor(project.priority)} text-xs`}
                >
                  {project.priority}
                </Badge>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-black-600">Progress</span>
                  <span className="text-sm font-medium">
                    {project.progress}%
                  </span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="flex justify-between text-sm text-black-600">
                <span>Due: {project.dueDate}</span>
                <span>{project.teamMembers.length} members</span>
              </div>

              <div className="flex justify-between text-sm text-black-600">
                <span>
                  Tasks: {project.tasksCompleted}/{project.tasksTotal}
                </span>
                <span className="font-medium">{project.budget}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-black-900 mb-2">
            No projects found
          </h3>
          <p className="text-black-600 mb-4">
            Create your first project to get started
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </div>
      )}

      {/* Team Management Dialog */}
      <ProjectTeamManager
        isOpen={isTeamDialogOpen}
        onClose={() => setIsTeamDialogOpen(false)}
        projectName={selectedProject?.name || ""}
        initialTeamMembers={selectedProject?.teamMembers}
      />

      {/* Timeline Dialog */}
      <ProjectTimeline
        isOpen={isTimelineDialogOpen}
        onClose={() => setIsTimelineDialogOpen(false)}
        projectName={selectedProject?.name || ""}
      />
    </div>
  );
};

export default Projects;
