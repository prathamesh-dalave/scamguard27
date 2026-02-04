import { useState } from "react";
import { ShieldCheck, ShieldAlert, ShieldOff, ExternalLink, Trash2, Eye, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const safeMessages = [
  { id: 1, sender: "Mom", type: "Personal", message: "Don't forget to pick up groceries", timestamp: "Today, 10:30 AM" },
  { id: 2, sender: "Bank (Verified)", type: "Transaction", message: "Your account balance is ₹15,000", timestamp: "Today, 9:15 AM" },
  { id: 3, sender: "Amazon", type: "Delivery", message: "Your order has been delivered", timestamp: "Yesterday, 4:00 PM" },
  { id: 4, sender: "Dad", type: "Personal", message: "Coming home late today", timestamp: "Yesterday, 2:30 PM" },
];

const suspiciousMessages = [
  { id: 1, sender: "+91-9876543210", type: "Unknown", message: "You won ₹10 Lakh! Click here to claim", riskLevel: "high", member: "Grandma", action: "Auto-Deleted" },
  { id: 2, sender: "BankAlert", type: "Phishing", message: "Your account is blocked. Update KYC now", riskLevel: "high", member: "Grandpa", action: "Auto-Deleted" },
  { id: 3, sender: "+91-1234567890", type: "OTP Fraud", message: "Share your OTP to verify account", riskLevel: "high", member: "Sarah", action: "Blocked" },
  { id: 4, sender: "LotteryWin", type: "Scam", message: "Congratulations! You won iPhone 15", riskLevel: "medium", member: "Dad", action: "Quarantined" },
];

const quarantinedMessages = [
  { id: 1, sender: "+91-5555555555", type: "Suspicious Link", message: "Click here for exclusive offer: bit.ly/xyz123", riskLevel: "high", detectedAt: "Today, 11:00 AM" },
  { id: 2, sender: "FreeRecharge", type: "Scam", message: "Get free ₹500 recharge. Limited time offer!", riskLevel: "medium", detectedAt: "Today, 8:30 AM" },
  { id: 3, sender: "+91-9999999999", type: "Phishing", message: "Your SBI card is expired. Update now", riskLevel: "high", detectedAt: "Yesterday, 6:00 PM" },
];

const getRiskBadgeClass = (level: string) => {
  switch (level) {
    case "high":
      return "threat-badge-danger";
    case "medium":
      return "threat-badge-warning";
    case "low":
      return "threat-badge-safe";
    default:
      return "";
  }
};

const getActionBadgeClass = (action: string) => {
  switch (action) {
    case "Auto-Deleted":
      return "bg-success/10 text-success border-success/20";
    case "Blocked":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "Quarantined":
      return "bg-warning/10 text-warning border-warning/20";
    default:
      return "";
  }
};

export default function ThreatMonitor() {
  const [activeTab, setActiveTab] = useState("suspicious");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Threat Monitor</h1>
        <p className="text-muted-foreground">View and manage all messages across your family</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="stat-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{safeMessages.length}</p>
              <p className="text-sm text-muted-foreground">Safe Messages</p>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <ShieldAlert className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{suspiciousMessages.length}</p>
              <p className="text-sm text-muted-foreground">Suspicious</p>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
              <ShieldOff className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">{quarantinedMessages.length}</p>
              <p className="text-sm text-muted-foreground">Quarantined</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="safe" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Safe
          </TabsTrigger>
          <TabsTrigger value="suspicious" className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            Suspicious
          </TabsTrigger>
          <TabsTrigger value="quarantine" className="flex items-center gap-2">
            <ShieldOff className="h-4 w-4" />
            Quarantine
          </TabsTrigger>
        </TabsList>

        {/* Safe Messages Tab */}
        <TabsContent value="safe">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-success" />
                Safe Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sender</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Message Preview</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {safeMessages.map((msg) => (
                    <TableRow key={msg.id}>
                      <TableCell className="font-medium">{msg.sender}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="threat-badge-safe">
                          {msg.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{msg.message}</TableCell>
                      <TableCell className="text-muted-foreground">{msg.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Suspicious Messages Tab */}
        <TabsContent value="suspicious">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-warning" />
                Suspicious Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sender</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Action Taken</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suspiciousMessages.map((msg) => (
                    <TableRow key={msg.id}>
                      <TableCell className="font-medium">{msg.sender}</TableCell>
                      <TableCell>{msg.type}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getRiskBadgeClass(msg.riskLevel)}>
                          {msg.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>{msg.member}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getActionBadgeClass(msg.action)}>
                          {msg.action}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quarantine Tab */}
        <TabsContent value="quarantine">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldOff className="h-5 w-5 text-destructive" />
                Quarantined Messages (Admin Review)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sender</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Detected</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quarantinedMessages.map((msg) => (
                    <TableRow key={msg.id}>
                      <TableCell className="font-medium">{msg.sender}</TableCell>
                      <TableCell>{msg.type}</TableCell>
                      <TableCell className="max-w-xs truncate">{msg.message}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getRiskBadgeClass(msg.riskLevel)}>
                          {msg.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{msg.detectedAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success">
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
