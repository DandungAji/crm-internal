
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  
  // General settings state
  const [companyName, setCompanyName] = useState("ProjectFlow");
  const [companyLogo, setCompanyLogo] = useState("");
  const [timeZone, setTimeZone] = useState("UTC");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);
  const [taskAssignments, setTaskAssignments] = useState(true);
  const [mentions, setMentions] = useState(true);
  const [reminders, setReminders] = useState(true);
  
  // Theme settings state
  const [theme, setTheme] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("blue");
  const [compactMode, setCompactMode] = useState(false);
  
  // User profile state
  const [fullName, setFullName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [role, setRole] = useState("Administrator");
  const [bio, setBio] = useState("Project management enthusiast with a focus on efficiency and team collaboration.");
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Team settings state
  const [defaultRole, setDefaultRole] = useState("member");
  const [projectApproval, setProjectApproval] = useState(false);
  const [openProjects, setOpenProjects] = useState(true);

  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "Your general settings have been updated.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  const handleSaveTheme = () => {
    toast({
      title: "Theme Settings Updated",
      description: "Your theme preferences have been saved.",
    });
  };
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };
  
  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "All password fields are required.",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirmation don't match.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, API call would go here to validate and change password
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
  };
  
  const handleSaveTeam = () => {
    toast({
      title: "Team Settings Saved",
      description: "Your team settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">Manage your account and application preferences</p>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 mb-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic application settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company or Organization Name</Label>
                <Input 
                  id="company-name" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company-logo">Company Logo</Label>
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-slate-100 rounded-md flex items-center justify-center">
                    {companyLogo ? (
                      <img 
                        src={companyLogo} 
                        alt="Company logo" 
                        className="max-h-full max-w-full" 
                      />
                    ) : (
                      <span className="text-lg font-bold text-slate-400">Logo</span>
                    )}
                  </div>
                  <Button variant="outline" size="sm">Upload New</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Time Zone</Label>
                  <Select value={timeZone} onValueChange={setTimeZone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                      <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                      <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                      <SelectItem value="MST">MST (Mountain Standard Time)</SelectItem>
                      <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select value={dateFormat} onValueChange={setDateFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={handleSaveGeneral}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
                    {fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input 
                  id="full-name" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input 
                  id="role" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={handleSaveProfile}>Save Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Customize how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-slate-500">
                    Receive notifications via email
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notify me about:</h3>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="project-updates">Project updates</Label>
                  <Switch 
                    id="project-updates" 
                    checked={projectUpdates}
                    onCheckedChange={setProjectUpdates}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="task-assignments">Task assignments</Label>
                  <Switch 
                    id="task-assignments" 
                    checked={taskAssignments}
                    onCheckedChange={setTaskAssignments}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="mentions">Mentions and comments</Label>
                  <Switch 
                    id="mentions" 
                    checked={mentions}
                    onCheckedChange={setMentions}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="reminders">Due date reminders</Label>
                  <Switch 
                    id="reminders" 
                    checked={reminders}
                    onCheckedChange={setReminders}
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={handleSaveNotifications}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex space-x-2">
                  <Button 
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </Button>
                  <Button 
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </Button>
                  <Button 
                    variant={theme === "system" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("system")}
                  >
                    System
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex flex-wrap gap-2">
                  {["blue", "purple", "green", "red", "orange", "slate"].map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-full transition-all ${
                        primaryColor === color 
                          ? "ring-2 ring-offset-2 ring-slate-900" 
                          : ""
                      }`}
                      style={{ backgroundColor: `var(--${color}-500)` || `var(--${color})` }}
                      onClick={() => setPrimaryColor(color)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Compact Mode</Label>
                  <p className="text-sm text-slate-500">
                    Reduce spacing to display more content
                  </p>
                </div>
                <Switch 
                  checked={compactMode}
                  onCheckedChange={setCompactMode}
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={handleSaveTheme}>Save Theme Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your account password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input 
                  id="current-password" 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={handleChangePassword}>Change Password</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Login Sessions</CardTitle>
              <CardDescription>Manage your active sessions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Current Session</h3>
                      <p className="text-sm text-slate-500">Started 2 hours ago</p>
                      <p className="text-sm text-slate-500">Chrome on Windows</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Previous Session</h3>
                      <p className="text-sm text-slate-500">Yesterday, 3:24 PM</p>
                      <p className="text-sm text-slate-500">Safari on macOS</p>
                    </div>
                    <Button variant="outline" size="sm">Revoke</Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button variant="destructive">Log Out All Sessions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Settings */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Settings</CardTitle>
              <CardDescription>Configure team permissions and defaults.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Default User Role</Label>
                <Select value={defaultRole} onValueChange={setDefaultRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-slate-500">
                  Default role assigned to new team members
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Project Approval</Label>
                  <p className="text-sm text-slate-500">
                    Require admin approval for new projects
                  </p>
                </div>
                <Switch 
                  checked={projectApproval}
                  onCheckedChange={setProjectApproval}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Open Projects</Label>
                  <p className="text-sm text-slate-500">
                    Allow all team members to view all projects
                  </p>
                </div>
                <Switch 
                  checked={openProjects}
                  onCheckedChange={setOpenProjects}
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={handleSaveTeam}>Save Team Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
