import { Shield, ShieldCheck, ShieldAlert, Users, Activity, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useFamilyMembers } from "@/hooks/useFamilyMembers";
import { useMessages } from "@/hooks/useMessages";
import { Skeleton } from "@/components/ui/skeleton";

const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case "elderly": return "bg-success/10 text-success border-success/20";
    case "child": return "bg-primary/10 text-primary border-primary/20";
    case "parent": return "bg-warning/10 text-warning border-warning/20";
    default: return "";
  }
};

const getRiskBadgeClass = (level: string) => {
  switch (level) {
    case "high": return "threat-badge-danger";
    case "medium": return "threat-badge-warning";
    case "low": return "threat-badge-safe";
    default: return "";
  }
};

const getActionColor = (action: string | null) => {
  switch (action) {
    case "Auto-Deleted": return "text-success";
    case "Blocked": return "text-destructive";
    case "Quarantined": return "text-warning";
    default: return "";
  }
};

export default function FamilyDashboard() {
  const { data: members, isLoading: membersLoading } = useFamilyMembers();
  const { data: allMessages, isLoading: messagesLoading } = useMessages();

  const suspiciousCount = allMessages?.filter(m => m.status === "suspicious").length ?? 0;
  const totalBlocked = allMessages?.filter(m => m.status !== "safe").length ?? 0;
  const todayBlocked = allMessages?.filter(m => {
    const today = new Date().toDateString();
    return m.status !== "safe" && new Date(m.detected_at).toDateString() === today;
  }).length ?? 0;

  const stats = [
    { label: "Total Threats Blocked", value: String(totalBlocked), icon: ShieldCheck, color: "text-success", bgColor: "bg-success/10" },
    { label: "Blocked Today", value: String(todayBlocked), icon: ShieldAlert, color: "text-destructive", bgColor: "bg-destructive/10" },
    { label: "Family Members", value: String(members?.length ?? 0), icon: Users, color: "text-primary", bgColor: "bg-primary/10" },
    { label: "Active Protection", value: "24/7", icon: Activity, color: "text-success", bgColor: "bg-success/10" },
  ];

  const recentActivity = allMessages?.filter(m => m.status !== "safe").slice(0, 10) ?? [];

  if (membersLoading || messagesLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-28" />)}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Family Dashboard</h1>
          <p className="text-muted-foreground">Monitor and protect your family from SMS scams</p>
        </div>
        <Badge className="bg-success/10 text-success border-success/20 px-4 py-2 text-sm font-medium">
          <Shield className="h-4 w-4 mr-2" />
          Family Safe
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={stat.label} className="stat-card animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`h-12 w-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Family Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Family Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          {members && members.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member) => (
                <div key={member.id} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <Badge variant="outline" className={getRoleBadgeClass(member.role)}>
                        {member.role}
                      </Badge>
                    </div>
                    <div className={`h-3 w-3 rounded-full ${member.status === 'active' ? 'bg-warning animate-pulse' : 'bg-success'}`} />
                  </div>
                  <p className="text-sm text-muted-foreground">{member.protection_mode}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No family members added yet. Add your first member to get started.</p>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Threat</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity: any) => (
                  <TableRow key={activity.id}>
                    <TableCell className="text-muted-foreground">
                      {new Date(activity.detected_at).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium">{activity.family_members?.name ?? "—"}</TableCell>
                    <TableCell>{activity.message}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRiskBadgeClass(activity.risk_level ?? "low")}>
                        {activity.risk_level ?? "low"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${getActionColor(activity.action_taken)}`}>
                        {activity.action_taken ?? "—"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-8">No threat activity recorded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
