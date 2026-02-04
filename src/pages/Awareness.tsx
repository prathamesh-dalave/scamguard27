import { BookOpen, AlertTriangle, CreditCard, Gift, Smartphone, Package, CheckCircle2, ShieldAlert, MessageSquare, Link } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const scamTypes = [
  {
    icon: CreditCard,
    title: "Fake Bank Alerts",
    description: "Scammers pretend to be your bank, claiming your account is blocked or needs KYC update.",
    warning: "Banks NEVER ask for OTP, PIN, or passwords via SMS.",
    examples: ["Your SBI account is blocked. Click here to update KYC", "Your card is expired. Update details immediately"],
    riskLevel: "high",
  },
  {
    icon: Gift,
    title: "Lottery & Prize Scams",
    description: "Fake winning messages claiming you won money, cars, or electronics.",
    warning: "You cannot win a lottery you never entered.",
    examples: ["Congratulations! You won ₹10 Lakh in Jio lottery", "You've been selected for iPhone 15 giveaway"],
    riskLevel: "high",
  },
  {
    icon: MessageSquare,
    title: "OTP Fraud",
    description: "Scammers try to trick you into sharing your OTP for banking or other services.",
    warning: "NEVER share OTP with anyone, even if they claim to be from bank or police.",
    examples: ["Share your OTP to verify account", "Your OTP for bank verification is..."],
    riskLevel: "high",
  },
  {
    icon: Package,
    title: "Delivery Scams",
    description: "Fake delivery messages asking you to pay fees or click suspicious links.",
    warning: "Real delivery services don't ask for payments via SMS links.",
    examples: ["Your package is on hold. Pay ₹25 to release", "Delivery failed. Update address here"],
    riskLevel: "medium",
  },
  {
    icon: Link,
    title: "Suspicious Links",
    description: "Shortened or suspicious links that lead to phishing sites or malware.",
    warning: "Never click on links from unknown numbers. Verify with the sender first.",
    examples: ["bit.ly/free-recharge", "tinyurl.com/claim-prize"],
    riskLevel: "high",
  },
  {
    icon: Smartphone,
    title: "Job & Loan Scams",
    description: "Fake job offers or instant loan promises requiring upfront payments.",
    warning: "Legitimate jobs don't require you to pay money first.",
    examples: ["Work from home. Earn ₹50,000/month. Register fee ₹500", "Instant loan approved. Pay processing fee"],
    riskLevel: "medium",
  },
];

const safetyTips = [
  { icon: ShieldAlert, tip: "Never share OTP, PIN, CVV, or passwords with anyone" },
  { icon: ShieldAlert, tip: "Don't click on links from unknown numbers" },
  { icon: ShieldAlert, tip: "Verify bank messages by calling your bank directly" },
  { icon: ShieldAlert, tip: "Report suspicious messages to cybercrime.gov.in" },
  { icon: ShieldAlert, tip: "Enable ScamGuard protection for elderly family members" },
  { icon: ShieldAlert, tip: "Educate your family about common scam tactics" },
];

const getRiskBadgeClass = (level: string) => {
  switch (level) {
    case "high":
      return "threat-badge-danger";
    case "medium":
      return "threat-badge-warning";
    default:
      return "threat-badge-safe";
  }
};

export default function Awareness() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Scam Awareness Center
        </h1>
        <p className="text-muted-foreground">Learn to identify and protect your family from common SMS scams</p>
      </div>

      {/* Safety Tips Banner */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            Quick Safety Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {safetyTips.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-card"
              >
                <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scam Types Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Common Scam Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scamTypes.map((scam) => (
            <Card key={scam.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <scam.icon className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{scam.title}</CardTitle>
                    </div>
                  </div>
                  <Badge variant="outline" className={getRiskBadgeClass(scam.riskLevel)}>
                    {scam.riskLevel} risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-foreground/80">
                  {scam.description}
                </CardDescription>

                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <p className="text-sm font-medium text-warning flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    {scam.warning}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Example Messages:</p>
                  <div className="space-y-2">
                    {scam.examples.map((example, index) => (
                      <div
                        key={index}
                        className="text-sm p-2 rounded bg-destructive/5 border border-destructive/10 font-mono"
                      >
                        "{example}"
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* What To Do Section */}
      <Card className="bg-success/5 border-success/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            What To Do If You Receive a Scam Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground text-sm font-bold">
                1
              </span>
              <p>Don't panic or act immediately. Scammers create urgency to make you react without thinking.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground text-sm font-bold">
                2
              </span>
              <p>Never click on links or share personal information like OTP, PIN, or passwords.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground text-sm font-bold">
                3
              </span>
              <p>Verify by calling your bank or the organization directly using official numbers.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground text-sm font-bold">
                4
              </span>
              <p>Report the scam to National Cyber Crime Portal: cybercrime.gov.in or call 1930.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground text-sm font-bold">
                5
              </span>
              <p>Block the sender and delete the message. Inform your family about the scam attempt.</p>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
