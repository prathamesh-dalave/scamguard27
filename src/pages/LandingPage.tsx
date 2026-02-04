import { Link } from "react-router-dom";
import { Shield, ShieldCheck, Users, AlertTriangle, ArrowRight, CheckCircle2, Smartphone, Bell, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Threats Blocked Today", value: "47", icon: ShieldCheck, color: "text-success" },
  { label: "Family Members Protected", value: "5", icon: Users, color: "text-primary" },
  { label: "Protection Status", value: "Active", icon: Shield, color: "text-success" },
];

const features = [
  {
    icon: Shield,
    title: "Role-Based Protection",
    description: "Different protection levels for elderly, children, and adults based on their needs.",
  },
  {
    icon: AlertTriangle,
    title: "Smart Threat Detection",
    description: "AI-powered detection of phishing, scam messages, and fraudulent links.",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description: "Get notified immediately when threats are detected for your family members.",
  },
  {
    icon: Lock,
    title: "Auto-Delete for Vulnerable",
    description: "Automatic removal of scam messages for elderly and child users.",
  },
];

const protectionModes = [
  {
    role: "Elderly",
    mode: "Auto-Delete Mode",
    description: "Suspicious messages are automatically deleted. They never see scam attempts.",
    color: "bg-success/10 border-success/20 text-success",
  },
  {
    role: "Child",
    mode: "Strict Protection",
    description: "Only whitelisted contacts can send messages. All unknown senders are blocked.",
    color: "bg-primary/10 border-primary/20 text-primary",
  },
  {
    role: "Parent/Admin",
    mode: "Review Mode",
    description: "Suspicious messages are quarantined for review. Full control over family protection.",
    color: "bg-warning/10 border-warning/20 text-warning",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">ScamGuard</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-6">
          <CheckCircle2 className="h-4 w-4" />
          Protecting 10,000+ families worldwide
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="text-foreground">ScamGuard</span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-muted-foreground font-medium mb-4">
          Clickbait? We don't click that.
        </p>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Protect your family from SMS scams with intelligent, role-based protection. 
          Elderly and children are shielded automatically while admins maintain full control.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/dashboard">
            <Button size="lg" className="text-base px-8 h-12">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/awareness">
            <Button size="lg" variant="outline" className="text-base px-8 h-12">
              Learn About Scams
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <Card key={stat.label} className="stat-card animate-fade-in">
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Protection Modes Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Smart Protection for Everyone</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Different family members need different levels of protection. 
              ScamGuard adapts to each user's role automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {protectionModes.map((mode) => (
              <Card key={mode.role} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border mb-4 ${mode.color}`}>
                    {mode.role}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{mode.mode}</h3>
                  <p className="text-muted-foreground">{mode.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Families Trust ScamGuard</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive protection features designed specifically for family safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <Smartphone className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Start Protecting Your Family Today</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Join thousands of families who trust ScamGuard to keep their loved ones safe from SMS scams.
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="text-base px-8 h-12">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">ScamGuard</span>
          </div>
          <p className="text-sm">© 2024 ScamGuard. Protecting families from SMS scams.</p>
        </div>
      </footer>
    </div>
  );
}
