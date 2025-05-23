
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, MessageSquare, Paperclip, MoreHorizontal } from "lucide-react";

const Kanban = () => {
  const [selectedProject, setSelectedProject] = useState("all");

  // Mock data for Kanban board
  const projects = [
    { id: "all", name: "All Projects" },
    { id: "1", name: "Website Redesign" },
    { id: "2", name: "Mobile App Development" },
    { id: "3", name: "Marketing Campaign" }
  ];

  const columns = [
    { id: "backlog", title: "Backlog", color: "bg-slate-100" },
    { id: "todo", title: "To Do", color: "bg-blue-50" },
    { id: "in-progress", title: "In Progress", color: "bg-yellow-50" },
    { id: "review", title: "Review", color: "bg-purple-50" },
    { id: "done", title: "Done", color: "bg-green-50" }
  ];

  const tasks = [
    {
      id: "1",
      title: "Design new homepage layout",
      description: "Create wireframes and mockups for the new homepage design",
      status: "in-progress",
      priority: "High",
      assignee: "Alice",
      project: "Website Redesign",
      dueDate: "2024-01-15",
      comments: 3,
      attachments: 2,
      tags: ["Design", "Frontend"]
    },
    {
      id: "2",
      title: "Set up development environment",
      description: "Configure build tools and development environment",
      status: "done",
      priority: "Medium",
      assignee: "Bob",
      project: "Mobile App Development",
      dueDate: "2024-01-10",
      comments: 1,
      attachments: 0,
      tags: ["Setup", "DevOps"]
    },
    {
      id: "3",
      title: "Create user authentication flow",
      description: "Implement login, registration, and password reset functionality",
      status: "todo",
      priority: "High",
      assignee: "Charlie",
      project: "Mobile App Development",
      dueDate: "2024-01-20",
      comments: 0,
      attachments: 1,
      tags: ["Backend", "Security"]
    },
    {
      id: "4",
      title: "Write content strategy document",
      description: "Define content pillars and messaging for Q1 campaign",
      status: "review",
      priority: "Medium",
      assignee: "Diana",
      project: "Marketing Campaign",
      dueDate: "2024-01-12",
      comments: 5,
      attachments: 3,
      tags: ["Content", "Strategy"]
    },
    {
      id: "5",
      title: "Optimize database queries",
      description: "Improve performance of slow database queries",
      status: "backlog",
      priority: "Low",
      assignee: "Eve",
      project: "Website Redesign",
      dueDate: "2024-01-25",
      comments: 0,
      attachments: 0,
      tags: ["Backend", "Performance"]
    },
    {
      id: "6",
      title: "Conduct user testing sessions",
      description: "Run usability tests with 10 target users",
      status: "todo",
      priority: "High",
      assignee: "Frank",
      project: "Website Redesign",
      dueDate: "2024-01-18",
      comments: 2,
      attachments: 1,
      tags: ["UX", "Testing"]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => 
      task.status === status && 
      (selectedProject === "all" || task.project === projects.find(p => p.id === selectedProject)?.name)
    );
  };

  const TaskCard = ({ task }: { task: typeof tasks[0] }) => (
    <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-slate-200 mb-3">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium text-slate-900 line-clamp-2">{task.title}</CardTitle>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
        {task.description && (
          <p className="text-xs text-slate-600 line-clamp-2 mt-1">{task.description}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-slate-100 text-slate-700">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Priority */}
        <Badge className={`${getPriorityColor(task.priority)} text-xs w-fit`}>
          {task.priority}
        </Badge>

        {/* Meta information */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-3">
            {task.comments > 0 && (
              <div className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {task.comments}
              </div>
            )}
            {task.attachments > 0 && (
              <div className="flex items-center">
                <Paperclip className="h-3 w-3 mr-1" />
                {task.attachments}
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {task.dueDate}
            </div>
          </div>
        </div>

        {/* Assignee */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500">{task.project}</span>
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs bg-blue-100 text-blue-800">
              {task.assignee.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Kanban Board</h1>
          <p className="text-slate-600 mt-1">Visualize and manage your workflow</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex space-x-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <div className={`${column.color} rounded-lg p-4 h-full min-h-[600px]`}>
              {/* Column Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-slate-900">{column.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {getTasksByStatus(column.id).length}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {getTasksByStatus(column.id).map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>

              {/* Add Task Button */}
              {getTasksByStatus(column.id).length === 0 && (
                <div className="flex items-center justify-center h-32 border-2 border-dashed border-slate-300 rounded-lg">
                  <Button variant="ghost" className="text-slate-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kanban;
