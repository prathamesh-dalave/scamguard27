import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Globe, Volume2, Shield, Users, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserSettings, useUpsertUserSettings } from "@/hooks/useUserSettings";
import { useTrustedContacts, useAddTrustedContact, useDeleteTrustedContact } from "@/hooks/useTrustedContacts";
import { Skeleton } from "@/components/ui/skeleton";

export default function Settings() {
  const { toast } = useToast();
  const { data: settings, isLoading: settingsLoading } = useUserSettings();
  const { data: contacts, isLoading: contactsLoading } = useTrustedContacts();
  const upsertSettings = useUpsertUserSettings();
  const addContact = useAddTrustedContact();
  const deleteContact = useDeleteTrustedContact();

  const [language, setLanguage] = useState("english");
  const [voiceAlerts, setVoiceAlerts] = useState(true);
  const [defaultProtectionMode, setDefaultProtectionMode] = useState("normal");
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");

  useEffect(() => {
    if (settings) {
      setLanguage(settings.language);
      setVoiceAlerts(settings.voice_alerts);
      setDefaultProtectionMode(settings.default_protection_mode);
    }
  }, [settings]);

  const handleAddContact = async () => {
    if (newContactName && newContactPhone) {
      try {
        await addContact.mutateAsync({ name: newContactName, phone: newContactPhone });
        setNewContactName("");
        setNewContactPhone("");
        toast({ title: "Contact Added", description: `${newContactName} has been added.` });
      } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    }
  };

  const handleRemoveContact = async (id: string, name: string) => {
    try {
      await deleteContact.mutateAsync(id);
      toast({ title: "Contact Removed", description: `${name} has been removed.` });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleSaveSettings = async () => {
    try {
      await upsertSettings.mutateAsync({ language, voice_alerts: voiceAlerts, default_protection_mode: defaultProtectionMode });
      toast({ title: "Settings Saved", description: "Your preferences have been updated." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (settingsLoading || contactsLoading) {
    return <div className="space-y-6"><Skeleton className="h-10 w-64" /><Skeleton className="h-64" /></div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-primary" />Settings
        </h1>
        <p className="text-muted-foreground mt-1">Manage your ScamGuard preferences and configurations.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-primary" />Language</CardTitle>
            <CardDescription>Choose your preferred language for the interface and alerts.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Volume2 className="h-5 w-5 text-primary" />Voice Alerts</CardTitle>
            <CardDescription>Enable audio notifications for detected threats.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="voice-alerts">Voice Alerts</Label>
                <p className="text-sm text-muted-foreground">{voiceAlerts ? "Alerts are enabled" : "Alerts are disabled"}</p>
              </div>
              <Switch id="voice-alerts" checked={voiceAlerts} onCheckedChange={setVoiceAlerts} />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Default Protection Mode</CardTitle>
            <CardDescription>Set the default protection level for new family members.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={defaultProtectionMode} onValueChange={setDefaultProtectionMode}>
              <SelectTrigger><SelectValue placeholder="Select mode" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="normal"><div className="flex items-center gap-2"><span>Normal Mode</span><Badge variant="outline" className="text-xs">Warn Only</Badge></div></SelectItem>
                <SelectItem value="elderly"><div className="flex items-center gap-2"><span>Elderly Mode</span><Badge className="bg-success/10 text-success border-success/20 text-xs">Auto Delete</Badge></div></SelectItem>
                <SelectItem value="child"><div className="flex items-center gap-2"><span>Child Mode</span><Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Strict</Badge></div></SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" />Manage Trusted Contacts</CardTitle>
          <CardDescription>Messages from trusted contacts will never be flagged as suspicious.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input placeholder="Contact name" value={newContactName} onChange={(e) => setNewContactName(e.target.value)} className="flex-1" />
            <Input placeholder="Phone number" value={newContactPhone} onChange={(e) => setNewContactPhone(e.target.value)} className="flex-1" />
            <Button onClick={handleAddContact} disabled={!newContactName || !newContactPhone || addContact.isPending}>
              <Plus className="h-4 w-4 mr-2" />Add
            </Button>
          </div>
          <div className="space-y-2">
            {contacts?.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                <div><p className="font-medium">{contact.name}</p><p className="text-sm text-muted-foreground">{contact.phone}</p></div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveContact(contact.id, contact.name)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {(!contacts || contacts.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-4">No trusted contacts added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} size="lg" disabled={upsertSettings.isPending}>
          {upsertSettings.isPending ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
