
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, Circle, AlertCircle } from "lucide-react";
import { format, addDays, differenceInDays } from "date-fns";

type Task = {
  id: number;
  title: string;
  status: "completed" | "in-progress" | "pending" | "overdue";
  startDate: Date;
  endDate: Date;
  assignee: string;
  priority: "low" | "medium" | "high" | "critical";
};

type ProjectTimelineProps = {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
};

const ProjectTimeline = ({ isOpen, onClose, projectName }: ProjectTimelineProps) => {
  const tasks: Task[] = [
    {
      id: 1,
      title: "Project Planning & Requirements",
      status: "completed",
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      assignee: "Alice Johnson",
      priority: "high"
    },
    {
      id: 2,
      title: "UI/UX Design",
      status: "in-progress",
      startDate: addDays(new Date(), 8),
      endDate: addDays(new Date(), 21),
      assignee: "Charlie Brown",
      priority: "high"
    },
    {
      id: 3,
      title: "Frontend Development",
      status: "pending",
      startDate: addDays(new Date(), 22),
      endDate: addDays(new Date(), 45),
      assignee: "Bob Smith",
      priority: "medium"
    },
    {
      id: 4,
      title: "Backend Development",
      status: "pending",
      startDate: addDays(new Date(), 30),
      endDate: addDays(new Date(), 52),
      assignee: "Diana Prince",
      priority: "medium"
    },
    {
      id: 5,
      title: "Testing & QA",
      status: "pending",
      startDate: addDays(new Date(), 53),
      endDate: addDays(new Date(), 67),
      assignee: "Eva Martinez",
      priority: "high"
    },
    {
      id: 6,
      title: "Deployment & Launch",
      status: "pending",
      startDate: addDays(new Date(), 68),
      endDate: addDays(new Date(), 75),
      assignee: "Frank Wilson",
      priority: "critical"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-600" />;
      case "overdue": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "in-progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "overdue": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "high": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getDuration = (startDate: Date, endDate: Date) => {
    const days = differenceInDays(endDate, startDate);
    return days === 1 ? "1 day" : `${days} days`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Project Timeline - {projectName}</DialogTitle>
          <DialogDescription>
            View and track project milestones and task deadlines
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Timeline Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Timeline Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-slate-600 dark:text-slate-400">Total Tasks:</span>
                  <div className="font-semibold">{tasks.length}</div>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-400">Completed:</span>
                  <div className="font-semibold text-green-600">
                    {tasks.filter(t => t.status === "completed").length}
                  </div>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-400">In Progress:</span>
                  <div className="font-semibold text-blue-600">
                    {tasks.filter(t => t.status === "in-progress").length}
                  </div>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-400">Duration:</span>
                  <div className="font-semibold">75 days</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Timeline */}
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <Card key={task.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    {/* Timeline connector */}
                    <div className="flex flex-col items-center">
                      {getStatusIcon(task.status)}
                      {index < tasks.length - 1 && (
                        <div className="w-px h-16 bg-slate-200 dark:bg-slate-700 mt-2"></div>
                      )}
                    </div>
                    
                    {/* Task content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                          {task.title}
                        </h3>
                        <div className="flex space-x-2">
                          <Badge className={`${getStatusColor(task.status)} text-xs`}>
                            {task.status}
                          </Badge>
                          <Badge className={`${getPriorityColor(task.priority)} text-xs`}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div>
                          <span className="font-medium">Start:</span> {format(task.startDate, "MMM dd, yyyy")}
                        </div>
                        <div>
                          <span className="font-medium">End:</span> {format(task.endDate, "MMM dd, yyyy")}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {getDuration(task.startDate, task.endDate)}
                        </div>
                      </div>
                      
                      <div className="mt-2 text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Assigned to:</span>
                        <span className="ml-1 font-medium text-slate-900 dark:text-slate-100">
                          {task.assignee}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectTimeline;
