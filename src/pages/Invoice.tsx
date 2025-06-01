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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Eye, Send, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import InvoiceGenerator from "@/components/InvoiceGenerator";

type Invoice = {
  id: number;
  invoiceNumber: string;
  projectName: string;
  clientName: string;
  amount: string;
  status: "draft" | "sent" | "paid" | "overdue";
  dueDate: string;
  createdDate: string;
  description: string;
};

const Invoice = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      invoiceNumber: "INV-2024-001",
      projectName: "Website Redesign",
      clientName: "TechCorp Inc.",
      amount: "$25,000",
      status: "sent",
      dueDate: "2024-02-15",
      createdDate: "2024-01-15",
      description: "Complete website redesign including UI/UX improvements",
    },
    {
      id: 2,
      invoiceNumber: "INV-2024-002",
      projectName: "Mobile App Development",
      clientName: "StartupXYZ",
      amount: "$50,000",
      status: "paid",
      dueDate: "2024-01-30",
      createdDate: "2024-01-01",
      description: "Native iOS and Android app development",
    },
    {
      id: 3,
      invoiceNumber: "INV-2024-003",
      projectName: "Marketing Campaign",
      clientName: "Local Business",
      amount: "$15,000",
      status: "overdue",
      dueDate: "2024-01-20",
      createdDate: "2023-12-20",
      description: "Digital marketing campaign across multiple channels",
    },
  ]);

  const [newInvoice, setNewInvoice] = useState({
    projectName: "",
    clientName: "",
    amount: "",
    dueDate: "",
    description: "",
  });

  const handleCreateInvoice = () => {
    if (
      !newInvoice.projectName ||
      !newInvoice.clientName ||
      !newInvoice.amount
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const invoice: Invoice = {
      id: invoices.length + 1,
      invoiceNumber: `INV-2024-${String(invoices.length + 1).padStart(3, "0")}`,
      projectName: newInvoice.projectName,
      clientName: newInvoice.clientName,
      amount: newInvoice.amount,
      status: "draft",
      dueDate: newInvoice.dueDate,
      createdDate: new Date().toISOString().split("T")[0],
      description: newInvoice.description,
    };

    setInvoices([...invoices, invoice]);
    setNewInvoice({
      projectName: "",
      clientName: "",
      amount: "",
      dueDate: "",
      description: "",
    });
    setIsCreateDialogOpen(false);
    toast({
      title: "Success",
      description: "Invoice created successfully",
    });
  };

  const handlePreviewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPreviewDialogOpen(true);
  };

  const handleSendInvoice = (invoiceId: number) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === invoiceId ? { ...inv, status: "sent" as const } : inv
      )
    );
    toast({
      title: "Success",
      description: "Invoice sent successfully",
    });
  };

  const handleChangeStatus = (
    invoiceId: number,
    newStatus: "paid" | "sent"
  ) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === invoiceId ? { ...inv, status: newStatus } : inv
      )
    );

    const statusText = newStatus === "paid" ? "paid" : "unpaid";
    toast({
      title: "Success",
      description: `Invoice marked as ${statusText}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "sent":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusButtonText = (status: string) => {
    switch (status) {
      case "paid":
        return "Mark Unpaid";
      case "sent":
        return "Mark Paid";
      default:
        return "";
    }
  };

  const getNewStatus = (currentStatus: string): "paid" | "sent" => {
    return currentStatus === "paid" ? "sent" : "paid";
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black-900 dark:text-black-100">
            Invoices
          </h1>
          <p className="text-black-600 dark:text-black-400 mt-1">
            Track and manage your invoices
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-black hover:bg-accent">
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>
                Generate a new invoice for your project
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={newInvoice.projectName}
                  onChange={(e) =>
                    setNewInvoice({
                      ...newInvoice,
                      projectName: e.target.value,
                    })
                  }
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={newInvoice.clientName}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, clientName: e.target.value })
                  }
                  placeholder="Enter client name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    value={newInvoice.amount}
                    onChange={(e) =>
                      setNewInvoice({ ...newInvoice, amount: e.target.value })
                    }
                    placeholder="$0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) =>
                      setNewInvoice({ ...newInvoice, dueDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newInvoice.description}
                  onChange={(e) =>
                    setNewInvoice({
                      ...newInvoice,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter invoice description"
                />
              </div>
              <Button onClick={handleCreateInvoice} className="w-full">
                Create Invoice
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 h-4 w-4" />
          <Input
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-accent"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Invoices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvoices.map((invoice) => (
          <Card
            key={invoice.id}
            className="shadow-sm hover:shadow-md transition-shadow duration-200 border-black-200 dark:border-black-700"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-black-900 dark:text-black-100">
                    {invoice.invoiceNumber}
                  </CardTitle>
                  <CardDescription className="mt-1 text-black-600 dark:text-black-400">
                    {invoice.projectName}
                  </CardDescription>
                </div>
                <Badge className={`${getStatusColor(invoice.status)} text-xs`}>
                  {invoice.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-black-600 dark:text-black-400">
                    Client:
                  </span>
                  <span className="font-medium text-black-900 dark:text-black-100">
                    {invoice.clientName}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black-600 dark:text-black-400">
                    Amount:
                  </span>
                  <span className="font-medium text-black-900 dark:text-black-100">
                    {invoice.amount}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black-600 dark:text-black-400">
                    Due Date:
                  </span>
                  <span className="font-medium text-black-900 dark:text-black-100">
                    {invoice.dueDate}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePreviewInvoice(invoice)}
                  className="flex-1 dark:bg-sidebar hover:bg-accent dark:hover:bg-accent-dark/10"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                {invoice.status === "draft" && (
                  <Button
                    size="sm"
                    onClick={() => handleSendInvoice(invoice.id)}
                    className="flex-1"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                )}
                {(invoice.status === "sent" || invoice.status === "paid") && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        className={`flex-1 ${
                          invoice.status === "paid"
                            ? "bg-red-600 dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-700 text-background hover:text-background"
                            : "bg-primary dark:bg-accent-dark hover:bg-primary/70 text-foreground hover:text-forefround"
                        }`}
                      >
                        {getStatusButtonText(invoice.status)}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Change Invoice Status
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to mark this invoice as{" "}
                          {getNewStatus(invoice.status) === "paid"
                            ? "paid"
                            : "unpaid"}
                          ?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            handleChangeStatus(
                              invoice.id,
                              getNewStatus(invoice.status)
                            )
                          }
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-black-900 dark:text-black-100 mb-2">
            No invoices found
          </h3>
          <p className="text-black-600 dark:text-black-400 mb-4">
            {statusFilter !== "all"
              ? `No invoices with status "${statusFilter}" found`
              : "Create your first invoice to get started"}
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      )}

      <InvoiceGenerator
        isOpen={isPreviewDialogOpen}
        onClose={() => setIsPreviewDialogOpen(false)}
        project={
          selectedInvoice
            ? {
                id: selectedInvoice.id,
                name: selectedInvoice.projectName,
                client: selectedInvoice.clientName,
                budget: selectedInvoice.amount,
              }
            : null
        }
      />
    </div>
  );
};

export default Invoice;
