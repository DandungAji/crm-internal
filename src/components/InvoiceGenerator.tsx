
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Project = {
  id: number;
  name: string;
  client: string;
  budget: string;
};

type InvoiceGeneratorProps = {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
};

const InvoiceGenerator = ({ isOpen, onClose, project }: InvoiceGeneratorProps) => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientName: project?.client || "",
    clientAddress: "Client Address\nCity, State ZIP\nCountry",
    projectDescription: project?.name || "",
    amount: project?.budget?.replace('$', '').replace(',', '') || "0",
    tax: "10",
    notes: "Thank you for your business!"
  });

  const calculateTotal = () => {
    const amount = parseFloat(invoiceData.amount) || 0;
    const taxRate = parseFloat(invoiceData.tax) || 0;
    const taxAmount = (amount * taxRate) / 100;
    return amount + taxAmount;
  };

  const handlePreview = () => {
    toast({
      title: "Invoice Preview",
      description: "Invoice preview generated successfully",
    });
  };

  const handleDownload = () => {
    // In a real application, this would generate and download a PDF
    const invoiceContent = `
INVOICE

Invoice Number: ${invoiceData.invoiceNumber}
Date: ${invoiceData.invoiceDate}
Due Date: ${invoiceData.dueDate}

Bill To:
${invoiceData.clientName}
${invoiceData.clientAddress}

Description: ${invoiceData.projectDescription}
Amount: $${invoiceData.amount}
Tax (${invoiceData.tax}%): $${((parseFloat(invoiceData.amount) * parseFloat(invoiceData.tax)) / 100).toFixed(2)}
Total: $${calculateTotal().toFixed(2)}

Notes: ${invoiceData.notes}
    `;

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceData.invoiceNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Invoice Downloaded",
      description: "Invoice has been downloaded successfully",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate Invoice - {project?.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Invoice Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="invoiceDate">Invoice Date</Label>
                <Input
                  id="invoiceDate"
                  type="date"
                  value={invoiceData.invoiceDate}
                  onChange={(e) => setInvoiceData({...invoiceData, invoiceDate: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={invoiceData.clientName}
                onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="clientAddress">Client Address</Label>
              <Textarea
                id="clientAddress"
                value={invoiceData.clientAddress}
                onChange={(e) => setInvoiceData({...invoiceData, clientAddress: e.target.value})}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                value={invoiceData.projectDescription}
                onChange={(e) => setInvoiceData({...invoiceData, projectDescription: e.target.value})}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={invoiceData.amount}
                  onChange={(e) => setInvoiceData({...invoiceData, amount: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="tax">Tax (%)</Label>
                <Input
                  id="tax"
                  type="number"
                  value={invoiceData.tax}
                  onChange={(e) => setInvoiceData({...invoiceData, tax: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
                rows={3}
              />
            </div>
          </div>

          {/* Invoice Preview */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Invoice Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">INVOICE</h2>
                  <p className="text-sm text-slate-600">#{invoiceData.invoiceNumber}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Date:</strong> {invoiceData.invoiceDate}</p>
                    <p><strong>Due:</strong> {invoiceData.dueDate}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-semibold">Bill To:</p>
                  <div className="text-sm text-slate-600 whitespace-pre-line">
                    {invoiceData.clientName}
                    {'\n'}{invoiceData.clientAddress}
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-semibold">Description:</p>
                  <p className="text-sm text-slate-600">{invoiceData.projectDescription}</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span>${invoiceData.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({invoiceData.tax}%):</span>
                    <span>${((parseFloat(invoiceData.amount) * parseFloat(invoiceData.tax)) / 100).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                {invoiceData.notes && (
                  <>
                    <Separator />
                    <div>
                      <p className="font-semibold">Notes:</p>
                      <p className="text-sm text-slate-600">{invoiceData.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceGenerator;
