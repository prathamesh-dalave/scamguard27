import { useState } from "react";
import { UserPlus, Shield, Baby, Users, Volume2, Globe, Phone, Plus, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAddFamilyMember } from "@/hooks/useFamilyMembers";
import { useAddTrustedContact } from "@/hooks/useTrustedContacts";
import { useToast } from "@/hooks/use-toast";

const roles = [
  { value: "elderly", label: "Elderly", icon: Shield, color: "text-success", bgColor: "bg-success/10 border-success/20", description: "Auto-delete mode: Suspicious messages are automatically deleted." },
  { value: "child", label: "Child", icon: Baby, color: "text-primary", bgColor: "bg-primary/10 border-primary/20", description: "Strict protection: Only whitelisted contacts can send messages." },
  { value: "parent", label: "Parent/Admin", icon: Users, color: "text-warning", bgColor: "bg-warning/10 border-warning/20", description: "Review mode: Suspicious messages are quarantined for review." },
];

const protectionModes = [
  { value: "normal", label: "Normal", description: "Warn only - show alerts but don't block" },
  { value: "elderly", label: "Elderly Mode", description: "Auto-delete all suspicious messages" },
  { value: "child", label: "Child Mode", description: "Strict whitelist - block all unknown senders" },
];

export default function AddMember() {
  const [selectedRole, setSelectedRole] = useState("elderly");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [protectionMode, setProtectionMode] = useState("elderly");
  const [language, setLanguage] = useState("english");
  const [voiceAlerts, setVoiceAlerts] = useState(false);
  const [trustedContacts, setTrustedContacts] = useState<string[]>([]);
  const [newContact, setNewContact] = useState("");
  const addMember = useAddFamilyMember();
  const addTrustedContact = useAddTrustedContact();
  const { toast } = useToast();

  const handleAddContact = () => {
    if (newContact && !trustedContacts.includes(newContact)) {
      setTrustedContacts([...trustedContacts, newContact]);
      setNewContact("");
    }
  };

  const removeTrustedContact = (contact: string) => {
    setTrustedContacts(trustedContacts.filter((c) => c !== contact));
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    try {
      const member = await addMember.mutateAsync({
        name: name.trim(),
        phone: phone || undefined,
        role: selectedRole,
        protection_mode: protectionMode,
        language,
        voice_alerts: voiceAlerts,
      });
      // Add trusted contacts for this member
      for (const contact of trustedContacts) {
        await addTrustedContact.mutateAsync({ name: contact, phone: contact, family_member_id: member.id });
      }
      toast({ title: "Member added!", description: `${name} has been added to your family.` });
      setName(""); setPhone(""); setTrustedContacts([]); setSelectedRole("elderly"); setProtectionMode("elderly");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Add Family Member</h1>
        <p className="text-muted-foreground">Set up protection for a new family member</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5 text-primary" />Member Information</CardTitle>
            <CardDescription>Basic details and role selection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter member name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+91-XXXXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-3">
              <Label>Role</Label>
              <RadioGroup value={selectedRole} onValueChange={setSelectedRole} className="space-y-3">
                {roles.map((role) => (
                  <div key={role.value} className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${selectedRole === role.value ? role.bgColor : "border-border hover:bg-muted/50"}`} onClick={() => setSelectedRole(role.value)}>
                    <RadioGroupItem value={role.value} id={role.value} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <role.icon className={`h-4 w-4 ${role.color}`} />
                        <Label htmlFor={role.value} className="font-medium cursor-pointer">{role.label}</Label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button className="w-full" onClick={handleSubmit} disabled={addMember.isPending}>
              <UserPlus className="h-4 w-4 mr-2" />
              {addMember.isPending ? "Adding..." : "Add Family Member"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Protection Settings</CardTitle>
            <CardDescription>Configure advanced protection options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Protection Mode</Label>
              <RadioGroup value={protectionMode} onValueChange={setProtectionMode} className="space-y-2">
                {protectionModes.map((mode) => (
                  <div key={mode.value} className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors cursor-pointer ${protectionMode === mode.value ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`} onClick={() => setProtectionMode(mode.value)}>
                    <RadioGroupItem value={mode.value} id={`mode-${mode.value}`} className="mt-0.5" />
                    <div>
                      <Label htmlFor={`mode-${mode.value}`} className="font-medium cursor-pointer">{mode.label}</Label>
                      <p className="text-sm text-muted-foreground">{mode.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Globe className="h-4 w-4" />Alert Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi (हिंदी)</SelectItem>
                  <SelectItem value="marathi">Marathi (मराठी)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-primary" />
                <div><Label>Voice Alerts</Label><p className="text-sm text-muted-foreground">Speak alerts for elderly members</p></div>
              </div>
              <Switch checked={voiceAlerts} onCheckedChange={setVoiceAlerts} />
            </div>
            <Separator />
            <div className="space-y-3">
              <Label className="flex items-center gap-2"><Phone className="h-4 w-4" />Trusted Contacts</Label>
              <p className="text-sm text-muted-foreground">Messages from these contacts will never be blocked</p>
              <div className="flex gap-2">
                <Input placeholder="+91-XXXXXXXXXX" value={newContact} onChange={(e) => setNewContact(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddContact()} />
                <Button onClick={handleAddContact} variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {trustedContacts.map((contact) => (
                  <Badge key={contact} variant="secondary" className="pl-3 pr-1 py-1.5 flex items-center gap-2">
                    {contact}
                    <button onClick={() => removeTrustedContact(contact)} className="ml-1 h-4 w-4 rounded-full bg-muted-foreground/20 hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
