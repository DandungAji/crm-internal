
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  File as FileIcon, 
  FileText,
  FileImage,
  FileSpreadsheet,
  FilePresentation,
  MoreHorizontal,
  FolderOpen,
  ChevronRight
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

type File = {
  id: number;
  name: string;
  type: string;
  size: string;
  project: string;
  uploadedBy: string;
  lastModified: string;
  path: string;
};

const Files = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Mock file data
  const [files, setFiles] = useState<File[]>([
    {
      id: 1,
      name: "Website Redesign Mockups.pdf",
      type: "pdf",
      size: "4.2 MB",
      project: "Website Redesign",
      uploadedBy: "Alice",
      lastModified: "2024-01-15",
      path: "/Website Redesign/Design/Mockups"
    },
    {
      id: 2,
      name: "Project Timeline.xlsx",
      type: "spreadsheet",
      size: "1.8 MB",
      project: "Website Redesign",
      uploadedBy: "Bob",
      lastModified: "2024-01-12",
      path: "/Website Redesign/Planning"
    },
    {
      id: 3,
      name: "Mobile App Wireframes.png",
      type: "image",
      size: "3.5 MB",
      project: "Mobile App Development",
      uploadedBy: "Charlie",
      lastModified: "2024-01-10",
      path: "/Mobile App Development/Design"
    },
    {
      id: 4,
      name: "API Documentation.docx",
      type: "document",
      size: "0.9 MB",
      project: "Mobile App Development",
      uploadedBy: "David",
      lastModified: "2024-01-08",
      path: "/Mobile App Development/Documentation"
    },
    {
      id: 5,
      name: "Marketing Strategy.pptx",
      type: "presentation",
      size: "5.1 MB",
      project: "Marketing Campaign",
      uploadedBy: "Diana",
      lastModified: "2023-12-28",
      path: "/Marketing Campaign/Strategy"
    },
    {
      id: 6,
      name: "Content Calendar.xlsx",
      type: "spreadsheet",
      size: "1.2 MB",
      project: "Marketing Campaign",
      uploadedBy: "Diana",
      lastModified: "2023-12-29",
      path: "/Marketing Campaign/Planning"
    },
    {
      id: 7,
      name: "Database Schema.pdf",
      type: "pdf",
      size: "2.3 MB",
      project: "Database Migration",
      uploadedBy: "Eve",
      lastModified: "2024-01-05",
      path: "/Database Migration/Planning"
    },
    {
      id: 8,
      name: "Employee Training Guide.pdf",
      type: "pdf",
      size: "3.7 MB",
      project: "Employee Training Portal",
      uploadedBy: "Grace",
      lastModified: "2023-12-15",
      path: "/Employee Training Portal/Content"
    }
  ]);

  // Mock projects for filtering
  const projects = [
    { id: "all", name: "All Projects" },
    { id: "website-redesign", name: "Website Redesign" },
    { id: "mobile-app", name: "Mobile App Development" },
    { id: "marketing", name: "Marketing Campaign" },
    { id: "database", name: "Database Migration" },
    { id: "training", name: "Employee Training Portal" }
  ];

  const fileTypes = [
    { id: "all", name: "All Types" },
    { id: "document", name: "Documents" },
    { id: "spreadsheet", name: "Spreadsheets" },
    { id: "presentation", name: "Presentations" },
    { id: "pdf", name: "PDFs" },
    { id: "image", name: "Images" }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real application, this would handle the actual file upload
    // Here we'll just simulate adding a new file to our list
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Determine file type
      let type = "document";
      if (file.type.includes("image")) type = "image";
      if (file.type.includes("pdf")) type = "pdf";
      if (file.type.includes("spreadsheet") || file.type.includes("excel")) type = "spreadsheet";
      if (file.type.includes("presentation") || file.type.includes("powerpoint")) type = "presentation";
      
      const newFile: File = {
        id: files.length + 1,
        name: file.name,
        type,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        project: "Unassigned",
        uploadedBy: "You",
        lastModified: new Date().toISOString().split('T')[0],
        path: "/Uploads"
      };
      
      setFiles(prev => [newFile, ...prev]);
      setIsUploadOpen(false);
      
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const handleDeleteFile = (fileId: number) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    toast({
      title: "File Deleted",
      description: "The file has been deleted.",
    });
  };

  const handleDownloadFile = (fileName: string) => {
    // In a real app, this would trigger an actual download
    toast({
      title: "Downloading",
      description: `${fileName} is being downloaded.`,
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "document":
        return <FileText className="h-6 w-6 text-blue-500" />;
      case "spreadsheet":
        return <FileSpreadsheet className="h-6 w-6 text-green-500" />;
      case "presentation":
        return <FilePresentation className="h-6 w-6 text-orange-500" />;
      case "image":
        return <FileImage className="h-6 w-6 text-purple-500" />;
      default:
        return <FileIcon className="h-6 w-6 text-slate-500" />;
    }
  };

  // Filter files based on search query, project, type, and active tab
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = projectFilter === "all" || file.project.toLowerCase().includes(projectFilter.toLowerCase());
    const matchesType = typeFilter === "all" || file.type === typeFilter;
    
    // Filter based on active tab
    if (activeTab === "all") return matchesSearch && matchesProject && matchesType;
    if (activeTab === "recent") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const fileDate = new Date(file.lastModified);
      return matchesSearch && matchesProject && matchesType && fileDate >= oneWeekAgo;
    }
    if (activeTab === "shared") {
      // For demo purposes, let's consider files from other users as "shared"
      return matchesSearch && matchesProject && matchesType && file.uploadedBy !== "You";
    }
    
    return false;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Files</h1>
          <p className="text-slate-600 mt-1">Manage and access your project files</p>
        </div>
        
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Files</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <FileIcon className="h-10 w-10 text-slate-400 mx-auto mb-4" />
                <p className="text-sm text-slate-600 mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button asChild>
                  <label htmlFor="file-upload">Browse Files</label>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="shared">Shared with Me</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="File type" />
            </SelectTrigger>
            <SelectContent>
              {fileTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Files Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.type)}
                        <span>{file.name}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center">
                        <FolderOpen className="h-3 w-3 mr-1" />
                        {file.path.split('/').map((segment, index, array) => (
                          <span key={index} className="flex items-center">
                            {segment}
                            {index < array.length - 1 && <ChevronRight className="h-3 w-3 mx-1" />}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs font-normal">
                        {file.project}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {file.uploadedBy.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{file.uploadedBy}</span>
                      </div>
                    </TableCell>
                    <TableCell>{file.lastModified}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleDownloadFile(file.name)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteFile(file.id)} className="text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredFiles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FileIcon className="h-8 w-8 text-slate-300 mb-2" />
                        <p className="text-sm text-slate-500">No files found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Files;
