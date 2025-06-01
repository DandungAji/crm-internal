import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Users, Mail, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type TeamMember = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  bio: string;
  projects: string[];
};

type TeamMemberFormData = {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  bio: string;
};

const Team = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isNewMemberOpen, setIsNewMemberOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Form state
  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    bio: "",
  });

  // Mock team member data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "123-456-7890",
      role: "UI/UX Designer",
      department: "Design",
      bio: "Experienced designer with a focus on user experience and interface design.",
      projects: ["Website Redesign", "Marketing Campaign"],
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "123-456-7891",
      role: "Frontend Developer",
      department: "Development",
      bio: "Frontend developer with 5+ years experience in React and modern JavaScript frameworks.",
      projects: ["Website Redesign", "Employee Training Portal"],
    },
    {
      id: 3,
      name: "Charlie Davis",
      email: "charlie@example.com",
      phone: "123-456-7892",
      role: "Backend Developer",
      department: "Development",
      bio: "Backend specialist with expertise in API design and database optimization.",
      projects: ["Mobile App Development", "Database Migration"],
    },
    {
      id: 4,
      name: "Diana Wilson",
      email: "diana@example.com",
      phone: "123-456-7893",
      role: "Content Strategist",
      department: "Marketing",
      bio: "Content creator with a background in digital marketing and SEO optimization.",
      projects: ["Marketing Campaign"],
    },
    {
      id: 5,
      name: "Eve Brown",
      email: "eve@example.com",
      phone: "123-456-7894",
      role: "Database Administrator",
      department: "IT",
      bio: "Database expert specializing in performance tuning and system architecture.",
      projects: ["Database Migration"],
    },
    {
      id: 6,
      name: "Frank Miller",
      email: "frank@example.com",
      phone: "123-456-7895",
      role: "UX Researcher",
      department: "Design",
      bio: "User researcher with experience conducting usability tests and user interviews.",
      projects: ["Website Redesign", "Mobile App Development"],
    },
    {
      id: 7,
      name: "Grace Lee",
      email: "grace@example.com",
      phone: "123-456-7896",
      role: "Project Manager",
      department: "Management",
      bio: "Certified PMP with 8 years of experience managing complex technical projects.",
      projects: ["Mobile App Development", "Employee Training Portal"],
    },
  ]);

  // Available departments (derived from team members)
  const departments = [
    "Design",
    "Development",
    "Marketing",
    "IT",
    "Management",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id.replace("member-", "")]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateMember = () => {
    // Validate form
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive",
      });
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Create new member
    const newMember: TeamMember = {
      id: teamMembers.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Not provided",
      role: formData.role || "Not specified",
      department: formData.department || "Not assigned",
      bio: formData.bio || "No bio provided",
      projects: [],
    };

    // Add to team members array
    setTeamMembers((prev) => [...prev, newMember]);

    // Reset form and close dialog
    resetForm();
    setIsNewMemberOpen(false);

    toast({
      title: "Success",
      description: `${newMember.name} has been added to the team`,
    });
  };

  const handleUpdateMember = () => {
    if (!selectedMember) return;

    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive",
      });
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Update member
    const updatedMember: TeamMember = {
      ...selectedMember,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Not provided",
      role: formData.role || "Not specified",
      department: formData.department || "Not assigned",
      bio: formData.bio || "No bio provided",
    };

    setTeamMembers((prev) =>
      prev.map((member) =>
        member.id === selectedMember.id ? updatedMember : member
      )
    );

    resetForm();
    setSelectedMember(null);

    toast({
      title: "Success",
      description: `${updatedMember.name}'s information has been updated`,
    });
  };

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      department: member.department,
      bio: member.bio,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      bio: "",
    });
  };

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || member.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black-900">Team</h1>
          <p className="text-black-600 mt-1">
            Manage team members and their roles
          </p>
        </div>

        <Dialog open={isNewMemberOpen} onOpenChange={setIsNewMemberOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-black hover:bg-accent">
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Add a new member to your team. Fill in their details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="member-name">Full Name</Label>
                <Input
                  id="member-name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="member-email">Email</Label>
                  <Input
                    id="member-email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="member-phone">Phone</Label>
                  <Input
                    id="member-phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="member-role">Role</Label>
                  <Input
                    id="member-role"
                    placeholder="Job title or role"
                    value={formData.role}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Department</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("department", value)
                    }
                    value={formData.department}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="member-bio">Bio</Label>
                <Textarea
                  id="member-bio"
                  placeholder="Brief description or bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsNewMemberOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateMember}>Add Member</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Member Dialog */}
        <Dialog
          open={!!selectedMember}
          onOpenChange={(open) => !open && setSelectedMember(null)}
        >
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit Team Member</DialogTitle>
              <DialogDescription>
                Update details for this team member.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="member-name">Full Name</Label>
                <Input
                  id="member-name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="member-email">Email</Label>
                  <Input
                    id="member-email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="member-phone">Phone</Label>
                  <Input
                    id="member-phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="member-role">Role</Label>
                  <Input
                    id="member-role"
                    placeholder="Job title or role"
                    value={formData.role}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Department</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("department", value)
                    }
                    value={formData.department}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="member-bio">Bio</Label>
                <Textarea
                  id="member-bio"
                  placeholder="Brief description or bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setSelectedMember(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateMember}>Update</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 h-4 w-4" />
          <Input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-accent"
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border-black-200"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-800 text-lg">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {member.role}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col space-y-1 text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-black-400" />
                  <span>{member.email}</span>
                </div>
                {member.phone !== "Not provided" && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-black-400" />
                    <span>{member.phone}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-black-400" />
                  <span>{member.department}</span>
                </div>
              </div>

              <p className="text-sm text-black-600">{member.bio}</p>

              {member.projects.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-black-500 mb-2">
                    PROJECTS
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {member.projects.map((project, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-primary hover:bg-accent dark:bg-accent-light text-black dark:text-black text-xs"
                      >
                        {project}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleEditMember(member)}
                >
                  Edit Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-black-200">
          <div className="text-black-400 mb-4">
            <Users className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-black-900 mb-2">
            No team members found
          </h3>
          <p className="text-black-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Team;
