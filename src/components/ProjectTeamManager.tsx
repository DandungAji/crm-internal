
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
};

type ProjectTeamManagerProps = {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  initialTeamMembers?: string[];
};

const ProjectTeamManager = ({ isOpen, onClose, projectName, initialTeamMembers = [] }: ProjectTeamManagerProps) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "Alice Johnson", email: "alice@company.com", role: "Project Manager" },
    { id: 2, name: "Bob Smith", email: "bob@company.com", role: "Developer" },
    { id: 3, name: "Charlie Brown", email: "charlie@company.com", role: "Designer" },
    { id: 4, name: "Diana Prince", email: "diana@company.com", role: "QA Tester" },
  ]);

  const [selectedMembers, setSelectedMembers] = useState<number[]>([1, 2]);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");

  const handleAddMember = () => {
    if (!newMemberEmail || !newMemberRole) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newMember: TeamMember = {
      id: teamMembers.length + 1,
      name: newMemberEmail.split('@')[0],
      email: newMemberEmail,
      role: newMemberRole
    };

    setTeamMembers([...teamMembers, newMember]);
    setNewMemberEmail("");
    setNewMemberRole("");
    toast({
      title: "Success",
      description: "Team member added successfully"
    });
  };

  const handleToggleMember = (memberId: number) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Team assignments updated successfully"
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Manage Team - {projectName}</DialogTitle>
          <DialogDescription>
            Add or remove team members from this project
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Add New Member */}
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Member
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="memberEmail">Email</Label>
                <Input
                  id="memberEmail"
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="user@company.com"
                />
              </div>
              <div>
                <Label htmlFor="memberRole">Role</Label>
                <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Project Manager">Project Manager</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="QA Tester">QA Tester</SelectItem>
                    <SelectItem value="Business Analyst">Business Analyst</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddMember} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Team Members List */}
          <div>
            <h3 className="font-semibold mb-3">Team Members</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedMembers.includes(member.id)
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                  onClick={() => handleToggleMember(member.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="text-xs text-slate-500">{member.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {member.role}
                    </Badge>
                    {selectedMembers.includes(member.id) && (
                      <Badge className="bg-blue-600 text-white text-xs">Assigned</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectTeamManager;
