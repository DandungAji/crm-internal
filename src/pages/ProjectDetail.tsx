import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Users,
  Clock,
  CheckSquare,
  FileText,
  MessageSquare,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Define project type to match the structure used in Projects.tsx
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

// Mock project data for demo purposes
const projectsData: Project[] = [
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
    client: "HR Department",
  },
];

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Find the project by ID from our mock data
  const project = projectsData.find((p) => p.id === parseInt(projectId || "0"));

  // If project not found, show error message
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
        <p className="text-black-600 mb-4">
          The project you're looking for doesn't exist or has been deleted.
        </p>
        <Button onClick={() => navigate("/projects")}>
          Return to Projects
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Planning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Review":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with navigation back */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/projects")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          <h1 className="text-2xl font-bold text-black-900">{project.name}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/team")}>
            <Users className="h-4 w-4 mr-2" />
            Manage Team
          </Button>
          <Button size="sm" onClick={() => navigate("/tasks")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
          {/* <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button> */}
        </div>
      </div>

      {/* Project Status */}
      <div className="flex flex-wrap gap-3">
        <Badge className={`${getStatusColor(project.status)} text-xs`}>
          {project.status}
        </Badge>
        <Badge className={`${getPriorityColor(project.priority)} text-xs`}>
          {project.priority}
        </Badge>
        <Badge variant="outline" className="text-xs">
          Due: {project.dueDate}
        </Badge>
        <Badge variant="outline" className="text-xs">
          Budget: {project.budget}
        </Badge>
        <Badge variant="outline" className="text-xs">
          Client: {project.client}
        </Badge>
      </div>

      {/* Project Description */}
      <Card>
        <CardContent className="p-4">
          <p className="text-black-600">{project.description}</p>
        </CardContent>
      </Card>

      {/* Tabs for different views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          {/* <TabsTrigger value="discussions">Discussions</TabsTrigger> */}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Progress Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Project Progress</CardTitle>
              <CardDescription>
                Overall completion and milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Overall Progress
                    </span>
                    <span className="text-sm">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Tasks Completed</span>
                    <span className="text-sm">
                      {project.tasksCompleted}/{project.tasksTotal}
                    </span>
                  </div>
                  <Progress
                    value={(project.tasksCompleted / project.tasksTotal) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Team Members</CardTitle>
              <CardDescription>People assigned to this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {member.charAt(0)}
                    </div>
                    <span className="ml-3">{member}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Tasks</CardTitle>
                  <CardDescription>Manage project tasks</CardDescription>
                </div>
                <Button size="sm" onClick={() => navigate("/tasks")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(project.tasksTotal)].map((_, index) => {
                  const isCompleted = index < project.tasksCompleted;
                  return (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg flex items-center justify-between ${
                        isCompleted ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <CheckSquare
                          className={`h-5 w-5 mr-3 ${
                            isCompleted ? "text-green-500" : "text-gray-400"
                          }`}
                        />
                        <div>
                          <h4
                            className={`font-medium ${
                              isCompleted
                                ? "line-through text-gray-500"
                                : "text-black-900"
                            }`}
                          >
                            Example Task {index + 1}
                          </h4>
                          <p className="text-sm text-black-500">
                            Due in {Math.floor(Math.random() * 10) + 1} days
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={isCompleted ? "outline" : "secondary"}
                        className="text-xs"
                      >
                        {isCompleted ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Files & Documents</CardTitle>
                  <CardDescription>Project files and resources</CardDescription>
                </div>
                <Button size="sm" onClick={() => navigate("/files")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-3 text-blue-500" />
                      <div>
                        <h4 className="font-medium text-black-900">
                          Project Document {index}
                        </h4>
                        <p className="text-sm text-black-500">
                          Added {index * 2} days ago
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="discussions">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Discussions</CardTitle>
                  <CardDescription>
                    Project conversations and updates
                  </CardDescription>
                </div>
                <Button size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start mb-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium mr-3">
                        {project.teamMembers[
                          index % project.teamMembers.length
                        ].charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium text-black-900">
                          {
                            project.teamMembers[
                              index % project.teamMembers.length
                            ]
                          }
                        </h4>
                        <p className="text-xs text-black-500">
                          {index} days ago
                        </p>
                      </div>
                    </div>
                    <p className="text-black-700">
                      This is a sample discussion message about the project. It
                      could include updates, questions, or important information
                      for the team.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
