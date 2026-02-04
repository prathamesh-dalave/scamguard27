import { Shield, ShieldCheck, ShieldAlert, AlertTriangle, Users, Activity, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const stats = [
  { label: "Total Threats Blocked", value: "156", icon: ShieldCheck, color: "text-success", bgColor: "bg-success/10" },
  { label: "Blocked Today", value: "12", icon: ShieldAlert, color: "text-destructive", bgColor: "bg-destructive/10" },
  { label: "Family Members", value: "5", icon: Users, color: "text-primary", bgColor: "bg-primary/10" },
  { label: "Active Protection", value: "24/7", icon: Activity, color: "text-success", bgColor: "bg-success/10" },
];

const familyMembers = [
  { name: "Grandma", role: "Elderly", status: "protected", autoDeleted: 3, mode: "Auto-Delete" },
  { name: "Grandpa", role: "Elderly", status: "protected", autoDeleted: 2, mode: "Auto-Delete" },
  { name: "Sarah", role: "Child", status: "protected", autoDeleted: 2, mode: "Strict Protection" },
  { name: "Dad", role: "Admin", status: "active", quarantined: 1, mode: "Review Mode" },
  { name: "Mom", role: "Parent", status: "protected", quarantined: 0, mode: "Review Mode" },
];

const recentActivity = [
  { time: "2 min ago", member: "Grandma", action: "Auto-deleted", threat: "Fake bank alert", riskLevel: "high" },
  { time: "15 min ago", member: "Sarah", action: "Blocked", threat: "Unknown sender", riskLevel: "medium" },
  { time: "1 hr ago", member: "Dad", action: "Quarantined", threat: "Suspicious link", riskLevel: "high" },
  { time: "2 hrs ago", member: "Grandpa", action: "Auto-deleted", threat: "Lottery scam", riskLevel: "high" },
  { time: "3 hrs ago", member: "Sarah", action: "Blocked", threat: "OTP request", riskLevel: "medium" },
];

const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case "Elderly":
      return "bg-success/10 text-success border-success/20";
    case "Child":
      return "bg-primary/10 text-primary border-primary/20";
    case "Admin":
      return "bg-warning/10 text-warning border-warning/20";
    case "Parent":
      return "bg-accent text-accent-foreground border-accent";
    default:
      return "";
  }
};

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

const getActionColor = (action: string) => {
  switch (action) {
    case "Auto-deleted":
      return "text-success";
    case "Blocked":
      return "text-destructive";
    case "Quarantined":
      return "text-warning";
    default:
      return "";
  }
};

export default function FamilyDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Family Dashboard</h1>
          <p className="text-muted-foreground">Monitor and protect your family from SMS scams</p>
        </div>
        <Badge className="bg-success/10 text-success border-success/20 px-4 py-2 text-sm font-medium animate-pulse-glow">
          <Shield className="h-4 w-4 mr-2" />
          Family Safe
        </Badge>
      </div>

      {/* Stats Grid */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {familyMembers.map((member) => (
              <div
                key={member.name}
                className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <Badge variant="outline" className={getRoleBadgeClass(member.role)}>
                      {member.role}
                    </Badge>
                  </div>
                  <div className={`h-3 w-3 rounded-full ${member.status === 'active' ? 'bg-warning animate-pulse' : 'bg-success'}`} />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{member.mode}</p>
                <div className="text-sm">
                  {member.autoDeleted !== undefined && member.autoDeleted > 0 && (
                    <span className="text-success font-medium">
                      {member.autoDeleted} auto-deleted today
                    </span>
                  )}
                  {member.quarantined !== undefined && member.quarantined > 0 && (
                    <span className="text-warning font-medium">
                      {member.quarantined} quarantined
                    </span>
                  )}
                  {((member.autoDeleted === undefined || member.autoDeleted === 0) && 
                    (member.quarantined === undefined || member.quarantined === 0)) && (
                    <span className="text-muted-foreground">No threats today</span>
                  )}
                </div>
              </div>
            ))}
          </div>
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
              {recentActivity.map((activity, index) => (
                <TableRow key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <TableCell className="text-muted-foreground">{activity.time}</TableCell>
                  <TableCell className="font-medium">{activity.member}</TableCell>
                  <TableCell>{activity.threat}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRiskBadgeClass(activity.riskLevel)}>
                      {activity.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getActionColor(activity.action)}`}>
                      {activity.action}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
