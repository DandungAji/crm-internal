import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  Filter,
  CheckSquare,
  Clock,
  CalendarIcon,
  UserIcon,
  TagIcon,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assignee: string;
  project: string;
  completed: boolean;
  tags: string[];
};

type TaskFormData = {
  title: string;
  description: string;
  priority: string;
  dueDate: Date | undefined;
  assignee: string;
  project: string;
  tags: string;
};

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Form state
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: undefined,
    assignee: "",
    project: "",
    tags: "",
  });

  // Mock task data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Create homepage wireframes",
      description: "Design initial wireframes for the new homepage layout",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-01-15",
      assignee: "Alice",
      project: "Website Redesign",
      completed: false,
      tags: ["Design", "Frontend"],
    },
    {
      id: 2,
      title: "Set up CI/CD pipeline",
      description: "Configure automated testing and deployment workflow",
      status: "To Do",
      priority: "Medium",
      dueDate: "2024-01-20",
      assignee: "Bob",
      project: "Website Redesign",
      completed: false,
      tags: ["DevOps"],
    },
    {
      id: 3,
      title: "API integration for user authentication",
      description: "Connect frontend to authentication API endpoints",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-01-18",
      assignee: "Charlie",
      project: "Mobile App Development",
      completed: false,
      tags: ["Backend", "Security"],
    },
    {
      id: 4,
      title: "Content audit",
      description: "Review and catalog all existing content",
      status: "Completed",
      priority: "Medium",
      dueDate: "2024-01-05",
      assignee: "Diana",
      project: "Marketing Campaign",
      completed: true,
      tags: ["Content", "SEO"],
    },
    {
      id: 5,
      title: "Database optimization",
      description: "Improve query performance for slow database operations",
      status: "To Do",
      priority: "Critical",
      dueDate: "2024-01-22",
      assignee: "Eve",
      project: "Database Migration",
      completed: false,
      tags: ["Backend", "Performance"],
    },
    {
      id: 6,
      title: "User testing sessions",
      description: "Conduct usability tests with target users",
      status: "To Do",
      priority: "High",
      dueDate: "2024-01-25",
      assignee: "Frank",
      project: "Website Redesign",
      completed: false,
      tags: ["UX", "Research"],
    },
  ]);

  // Mock project data for filtering
  const projects = [
    { id: "all", name: "All Projects" },
    { id: "1", name: "Website Redesign" },
    { id: "2", name: "Mobile App Development" },
    { id: "3", name: "Marketing Campaign" },
    { id: "4", name: "Database Migration" },
    { id: "5", name: "Employee Training Portal" },
  ];

  // Mock team members
  const teamMembers = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
    "Frank",
    "Grace",
    "Helen",
    "Ivan",
    "Jack",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id.replace("task-", "")]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateTask = () => {
    // Validate form
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive",
      });
      return;
    }

    // Create new task
    const newTask: Task = {
      id: tasks.length + 1,
      title: formData.title,
      description: formData.description || "No description provided",
      status: "To Do",
      priority: formData.priority || "Medium",
      dueDate: formData.dueDate
        ? format(formData.dueDate, "yyyy-MM-dd")
        : "Not set",
      assignee: formData.assignee || "Unassigned",
      project: formData.project || "Unassigned",
      completed: false,
      tags: formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [],
    };

    // Add to tasks array
    setTasks((prev) => [newTask, ...prev]);

    // Reset form and close dialog
    resetForm();
    setIsNewTaskOpen(false);

    toast({
      title: "Success",
      description: `Task "${newTask.title}" has been created`,
    });
  };

  const handleUpdateTask = () => {
    if (!selectedTask) return;

    if (!formData.title) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive",
      });
      return;
    }

    // Update task
    const updatedTask: Task = {
      ...selectedTask,
      title: formData.title,
      description: formData.description || "No description provided",
      priority: formData.priority || "Medium",
      dueDate: formData.dueDate
        ? format(formData.dueDate, "yyyy-MM-dd")
        : "Not set",
      assignee: formData.assignee || "Unassigned",
      project: formData.project || "Unassigned",
      tags: formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [],
    };

    setTasks((prev) =>
      prev.map((task) => (task.id === selectedTask.id ? updatedTask : task))
    );

    resetForm();
    setSelectedTask(null);

    toast({
      title: "Success",
      description: `Task "${updatedTask.title}" has been updated`,
    });
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      toast({
        title: task.completed ? "Task reopened" : "Task completed",
        description: `"${task.title}" has been marked as ${
          task.completed ? "incomplete" : "complete"
        }`,
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority.toLowerCase(),
      dueDate: task.dueDate !== "Not set" ? new Date(task.dueDate) : undefined,
      assignee: task.assignee,
      project: task.project,
      tags: task.tags.join(", "),
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: undefined,
      assignee: "",
      project: "",
      tags: "",
    });
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

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" ? task.completed : !task.completed);
    const matchesProject =
      projectFilter === "all" ||
      task.project === projects.find((p) => p.id === projectFilter)?.name;

    return matchesSearch && matchesStatus && matchesProject;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
          <p className="text-slate-600 mt-1">
            Manage your tasks across all projects
          </p>
        </div>

        <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
          <DialogTrigger asChild>
            <Button className="">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to your project. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  placeholder="Enter task title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-description">Description</Label>
                <Textarea
                  id="task-description"
                  placeholder="Task description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Project</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("project", value)
                    }
                    value={formData.project}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Website Redesign">
                        Website Redesign
                      </SelectItem>
                      <SelectItem value="Mobile App Development">
                        Mobile App Development
                      </SelectItem>
                      <SelectItem value="Marketing Campaign">
                        Marketing Campaign
                      </SelectItem>
                      <SelectItem value="Database Migration">
                        Database Migration
                      </SelectItem>
                      <SelectItem value="Employee Training Portal">
                        Employee Training Portal
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Assignee</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("assignee", value)
                    }
                    value={formData.assignee}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member} value={member}>
                          {member}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Priority</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("priority", value)
                    }
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
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !formData.dueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dueDate ? (
                          format(formData.dueDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.dueDate}
                        onSelect={(date) =>
                          setFormData((prev) => ({ ...prev, dueDate: date }))
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-tags">Tags</Label>
                <Input
                  id="task-tags"
                  placeholder="Enter tags separated by commas"
                  value={formData.tags}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsNewTaskOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>Create Task</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Task Dialog */}
        <Dialog
          open={!!selectedTask}
          onOpenChange={(open) => !open && setSelectedTask(null)}
        >
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Update the details of this task.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  placeholder="Enter task title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-description">Description</Label>
                <Textarea
                  id="task-description"
                  placeholder="Task description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Project</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("project", value)
                    }
                    value={formData.project}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Website Redesign">
                        Website Redesign
                      </SelectItem>
                      <SelectItem value="Mobile App Development">
                        Mobile App Development
                      </SelectItem>
                      <SelectItem value="Marketing Campaign">
                        Marketing Campaign
                      </SelectItem>
                      <SelectItem value="Database Migration">
                        Database Migration
                      </SelectItem>
                      <SelectItem value="Employee Training Portal">
                        Employee Training Portal
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Assignee</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("assignee", value)
                    }
                    value={formData.assignee}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member} value={member}>
                          {member}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Priority</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("priority", value)
                    }
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
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !formData.dueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dueDate ? (
                          format(formData.dueDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.dueDate}
                        onSelect={(date) =>
                          setFormData((prev) => ({ ...prev, dueDate: date }))
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-tags">Tags</Label>
                <Input
                  id="task-tags"
                  placeholder="Enter tags separated by commas"
                  value={formData.tags}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setSelectedTask(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateTask}>Update Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search tasks..."
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
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
          <CardDescription>View and manage all your tasks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8">
              <CheckSquare className="h-12 w-12 mx-auto text-slate-300 mb-2" />
              <h3 className="text-lg font-medium text-slate-900">
                No tasks found
              </h3>
              <p className="text-slate-500 mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 border rounded-lg ${
                  task.completed ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleToggleComplete(task.id)}
                    className="mt-1"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          className={`text-lg font-medium ${
                            task.completed
                              ? "line-through text-gray-500"
                              : "text-slate-900"
                          }`}
                        >
                          {task.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {task.description}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTask(task)}
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Edit</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {task.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-slate-100 text-slate-700 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <Badge
                        className={`${getPriorityColor(task.priority)} text-xs`}
                      >
                        {task.priority}
                      </Badge>

                      <div className="flex items-center text-xs text-slate-600">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {task.dueDate}
                      </div>

                      <div className="flex items-center text-xs text-slate-600">
                        <UserIcon className="h-3.5 w-3.5 mr-1" />
                        {task.assignee}
                      </div>

                      <div className="text-xs text-slate-600">
                        {task.project}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Tasks;
