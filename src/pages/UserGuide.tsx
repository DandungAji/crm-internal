import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  FolderKanban,
  Users,
  FileText,
  Settings,
  Database,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-black-900">User Guide</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="masterdata">Masterdata</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FolderKanban className="h-5 w-5 mr-2" />
                ProjectFlow Overview
              </CardTitle>
              <CardDescription>
                Your complete project management solution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Getting Started</h3>
                <p className="text-black-600">
                  ProjectFlow is designed to help you manage projects, tasks,
                  teams, and resources efficiently. Start by exploring the
                  dashboard to get an overview of your current projects and
                  tasks.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Key Features</h3>
                <ul className="list-disc list-inside text-black-600 space-y-1">
                  <li>Project management with detailed tracking</li>
                  <li>Task assignment and progress monitoring</li>
                  <li>Team collaboration tools</li>
                  <li>Calendar integration for scheduling</li>
                  <li>File management and sharing</li>
                  <li>Invoice generation from projects</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FolderKanban className="h-5 w-5 mr-2" />
                Project Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Creating Projects</h3>
                <p className="text-black-600">
                  Click the "New Project" button to create a new project. Fill
                  in the project details including name, description, due date,
                  and assign team members.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Project Options</h3>
                <p className="text-black-600">
                  Each project card has an options menu that allows you to:
                </p>
                <ul className="list-disc list-inside text-black-600 space-y-1 ml-4">
                  <li>Edit project details</li>
                  <li>Manage team members</li>
                  <li>Generate invoices</li>
                  <li>Archive or delete projects</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Task Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Creating Tasks</h3>
                <p className="text-black-600">
                  Tasks can be created from the Tasks page or within individual
                  projects. Set priorities, due dates, and assign team members.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Task Status</h3>
                <p className="text-black-600">
                  Tasks can be in different states: To Do, In Progress, Review,
                  or Completed. Update status as work progresses.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Calendar Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Creating Events</h3>
                <p className="text-black-600">
                  Click "New Event" to schedule meetings, deadlines, or
                  milestones. Events can be linked to projects and team members.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Calendar Views</h3>
                <p className="text-black-600">
                  Switch between month, week, and day views to see your schedule
                  at different levels of detail.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Team Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Adding Team Members</h3>
                <p className="text-black-600">
                  Invite team members by email and assign roles. Team members
                  can be assigned to projects and tasks.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Role Management</h3>
                <p className="text-black-600">
                  Different roles have different permissions within the system.
                  Manage access levels appropriately.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="masterdata">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Masterdata Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Departments</h3>
                <p className="text-black-600">
                  Manage organizational departments. Create, edit, and organize
                  departments to better structure your team and projects.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">User Management</h3>
                <p className="text-black-600">
                  Comprehensive user management including creating accounts,
                  assigning departments, and managing permissions across the
                  platform.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserGuide;
