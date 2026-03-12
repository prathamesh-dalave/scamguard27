import { useState } from "react";
import { ShieldCheck, ShieldAlert, ShieldOff, Trash2, Eye, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useMessages, useDeleteMessage, useUpdateMessageStatus } from "@/hooks/useMessages";
import { useToast } from "@/hooks/use-toast";

const getRiskBadgeClass = (level: string) => {
  switch (level) {
    case "high": return "threat-badge-danger";
    case "medium": return "threat-badge-warning";
    case "low": return "threat-badge-safe";
    default: return "";
  }
};

const getActionBadgeClass = (action: string) => {
  switch (action) {
    case "Auto-Deleted": return "bg-success/10 text-success border-success/20";
    case "Blocked": return "bg-destructive/10 text-destructive border-destructive/20";
    case "Quarantined": return "bg-warning/10 text-warning border-warning/20";
    default: return "";
  }
};

export default function ThreatMonitor() {
  const [activeTab, setActiveTab] = useState("suspicious");
  const { data: allMessages, isLoading } = useMessages();
  const deleteMessage = useDeleteMessage();
  const updateStatus = useUpdateMessageStatus();
  const { toast } = useToast();

  const safe = allMessages?.filter(m => m.status === "safe") ?? [];
  const suspicious = allMessages?.filter(m => m.status === "suspicious") ?? [];
  const quarantined = allMessages?.filter(m => m.status === "quarantined") ?? [];

  const handleDelete = (id: string) => {
    deleteMessage.mutate(id, { onSuccess: () => toast({ title: "Message deleted" }) });
  };

  const handleRestore = (id: string) => {
    updateStatus.mutate({ id, status: "safe" }, { onSuccess: () => toast({ title: "Message restored to safe" }) });
  };

  if (isLoading) {
    return <div className="space-y-6"><Skeleton className="h-10 w-64" /><Skeleton className="h-32" /><Skeleton className="h-64" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Threat Monitor</h1>
        <p className="text-muted-foreground">View and manage all messages across your family</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{ icon: ShieldCheck, color: "text-success", bg: "bg-success/10", count: safe.length, label: "Safe Messages" },
          { icon: ShieldAlert, color: "text-warning", bg: "bg-warning/10", count: suspicious.length, label: "Suspicious" },
          { icon: ShieldOff, color: "text-destructive", bg: "bg-destructive/10", count: quarantined.length, label: "Quarantined" }
        ].map(s => (
          <Card key={s.label} className="stat-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-lg ${s.bg} flex items-center justify-center`}>
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.count}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="safe" className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" />Safe</TabsTrigger>
          <TabsTrigger value="suspicious" className="flex items-center gap-2"><ShieldAlert className="h-4 w-4" />Suspicious</TabsTrigger>
          <TabsTrigger value="quarantine" className="flex items-center gap-2"><ShieldOff className="h-4 w-4" />Quarantine</TabsTrigger>
        </TabsList>

        <TabsContent value="safe">
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-success" />Safe Messages</CardTitle></CardHeader>
            <CardContent>
              {safe.length > 0 ? (
                <Table>
                  <TableHeader><TableRow><TableHead>Sender</TableHead><TableHead>Type</TableHead><TableHead>Message</TableHead><TableHead>Time</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {safe.map((msg: any) => (
                      <TableRow key={msg.id}>
                        <TableCell className="font-medium">{msg.sender}</TableCell>
                        <TableCell><Badge variant="outline" className="threat-badge-safe">{msg.type}</Badge></TableCell>
                        <TableCell className="max-w-xs truncate">{msg.message}</TableCell>
                        <TableCell className="text-muted-foreground">{new Date(msg.detected_at).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : <p className="text-muted-foreground text-center py-8">No safe messages yet.</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suspicious">
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-warning" />Suspicious Messages</CardTitle></CardHeader>
            <CardContent>
              {suspicious.length > 0 ? (
                <Table>
                  <TableHeader><TableRow><TableHead>Sender</TableHead><TableHead>Type</TableHead><TableHead>Risk</TableHead><TableHead>Member</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {suspicious.map((msg: any) => (
                      <TableRow key={msg.id}>
                        <TableCell className="font-medium">{msg.sender}</TableCell>
                        <TableCell>{msg.type}</TableCell>
                        <TableCell><Badge variant="outline" className={getRiskBadgeClass(msg.risk_level ?? "low")}>{msg.risk_level}</Badge></TableCell>
                        <TableCell>{msg.family_members?.name ?? "—"}</TableCell>
                        <TableCell>{msg.action_taken && <Badge variant="outline" className={getActionBadgeClass(msg.action_taken)}>{msg.action_taken}</Badge>}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : <p className="text-muted-foreground text-center py-8">No suspicious messages.</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quarantine">
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><ShieldOff className="h-5 w-5 text-destructive" />Quarantined Messages</CardTitle></CardHeader>
            <CardContent>
              {quarantined.length > 0 ? (
                <Table>
                  <TableHeader><TableRow><TableHead>Sender</TableHead><TableHead>Type</TableHead><TableHead>Message</TableHead><TableHead>Risk</TableHead><TableHead>Detected</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {quarantined.map((msg: any) => (
                      <TableRow key={msg.id}>
                        <TableCell className="font-medium">{msg.sender}</TableCell>
                        <TableCell>{msg.type}</TableCell>
                        <TableCell className="max-w-xs truncate">{msg.message}</TableCell>
                        <TableCell><Badge variant="outline" className={getRiskBadgeClass(msg.risk_level ?? "low")}>{msg.risk_level}</Badge></TableCell>
                        <TableCell className="text-muted-foreground">{new Date(msg.detected_at).toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success" onClick={() => handleRestore(msg.id)}>
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(msg.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : <p className="text-muted-foreground text-center py-8">No quarantined messages.</p>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
