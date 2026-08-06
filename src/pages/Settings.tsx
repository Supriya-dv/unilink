import React, { useState, useEffect } from "react";
import { 
  Settings as SettingsIcon, Bell, Lock, User, Eye, 
  Trash2, ShieldAlert, Sliders, Save, Crown, CreditCard, XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";

export default function Settings() {
  const [profileVisible, setProfileVisible] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [matchingRole, setMatchingRole] = useState("all");
  const [isSaving, setIsSaving] = useState(false);
  const [isPremium, setIsPremium] = useState(localStorage.getItem("unilink_is_premium") === "true");

  useEffect(() => {
    const checkPremium = () => {
      setIsPremium(localStorage.getItem("unilink_is_premium") === "true");
    };
    window.addEventListener("premiumUpdated", checkPremium);
    window.addEventListener("storage", checkPremium);
    return () => {
      window.removeEventListener("premiumUpdated", checkPremium);
      window.removeEventListener("storage", checkPremium);
    };
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully!");
    }, 800);
  };

  const handleCancelSubscription = () => {
    localStorage.removeItem("unilink_is_premium");
    setIsPremium(false);
    window.dispatchEvent(new Event("premiumUpdated"));
    toast.success("Subscription cancelled successfully.", {
      description: "Your account has returned to the Free tier.",
    });
  };

  return (
    <PageTransition className="container max-w-4xl mx-auto px-4 py-8">
      
      {/* ✨ Header Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
          <SettingsIcon className="h-9 w-9 text-purple-600 animate-spin-slow" />
          Settings
        </h1>
        <p className="text-slate-500 mt-1 font-medium">Configure your discovery parameters, subscription status, security, and notification options</p>
      </div>

      <div className="space-y-8">

        {/* 👑 Subscription Management */}
        <Card className="glass-card border border-black/[0.05] rounded-3xl bg-white/70 overflow-hidden shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Crown className="h-5 w-5 text-amber-500" /> Subscription & Billing
            </h2>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-white ${isPremium ? "bg-gradient-to-tr from-amber-500 to-amber-600 shadow-md" : "bg-slate-300"}`}>
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      {isPremium ? "UniLink Pro Member" : "Free Plan Member"}
                    </h3>
                    <Badge className={isPremium ? "bg-amber-500 text-white font-bold" : "bg-slate-200 text-slate-600 font-semibold"}>
                      {isPremium ? "Active Tier" : "Default"}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isPremium 
                      ? "Your subscription is active. All connection requests are unblurred and unlimited swipes are enabled."
                      : "Upgrade to UniLink Pro to see who liked you instantly and unlock advanced search parameters."}
                  </p>
                </div>
              </div>

              {isPremium ? (
                <Button 
                  onClick={handleCancelSubscription} 
                  variant="outline" 
                  className="h-11 px-5 rounded-xl border-red-200 hover:bg-red-50 text-red-600 font-bold shrink-0 flex items-center gap-2"
                >
                  <XCircle className="h-4 w-4" /> Cancel Pro Subscription
                </Button>
              ) : (
                <Button 
                  onClick={() => window.location.href = "/premium"} 
                  className="h-11 px-6 rounded-xl bg-slate-950 text-white font-bold hover:bg-slate-800 shrink-0"
                >
                  Upgrade to Pro
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* 🔮 Discovery Filters */}
        <Card className="glass-card border border-black/[0.05] rounded-3xl bg-white/70 overflow-hidden shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Sliders className="h-5 w-5 text-cyan-600" /> Discovery Settings
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 ml-1">Preferred Connection Role</Label>
                  <Select value={matchingRole} onValueChange={setMatchingRole}>
                    <SelectTrigger className="bg-white border-slate-200 h-12 rounded-xl text-slate-800">
                      <SelectValue placeholder="Select target role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 text-slate-850">
                      <SelectItem value="all">Everyone</SelectItem>
                      <SelectItem value="student">Students Only</SelectItem>
                      <SelectItem value="alumni">Alumni Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 ml-1">Max Search Distance</Label>
                  <Input 
                    type="number" 
                    placeholder="e.g. 10 miles" 
                    className="bg-white border-slate-200 h-12 rounded-xl text-slate-800 focus:ring-cyan-200 focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-t border-slate-100">
                <div className="space-y-0.5">
                  <Label className="text-slate-800 font-semibold flex items-center gap-2">
                    <Eye className="h-4 w-4 text-slate-500" /> Profile Visibility
                  </Label>
                  <p className="text-xs text-slate-400">Control if you are shown in the swiping discovery feed.</p>
                </div>
                <Switch 
                  checked={profileVisible} 
                  onCheckedChange={setProfileVisible} 
                  className="data-[state=checked]:bg-cyan-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🔔 Notifications */}
        <Card className="glass-card border border-black/[0.05] rounded-3xl bg-white/70 overflow-hidden shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Bell className="h-5 w-5 text-pink-600" /> Notifications
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-slate-800 font-semibold">New Matches & Chat Messages</Label>
                  <p className="text-xs text-slate-400">Receive alerts when someone likes you back or sends a message.</p>
                </div>
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications} 
                  className="data-[state=checked]:bg-pink-500"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="space-y-0.5">
                  <Label className="text-slate-800 font-semibold">Weekly Connections Digest</Label>
                  <p className="text-xs text-slate-400">Receive updates on networking opportunities via email.</p>
                </div>
                <Switch 
                  checked={emailAlerts} 
                  onCheckedChange={setEmailAlerts} 
                  className="data-[state=checked]:bg-pink-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🔒 Security */}
        <Card className="glass-card border border-black/[0.05] rounded-3xl bg-white/70 overflow-hidden shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Lock className="h-5 w-5 text-purple-600" /> Security & Account
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 ml-1">Update Password</Label>
                  <Input 
                    type="password" 
                    placeholder="Enter new password" 
                    className="bg-white border-slate-200 h-12 rounded-xl text-slate-800 focus:ring-cyan-200 focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 ml-1">Confirm Password</Label>
                  <Input 
                    type="password" 
                    placeholder="Confirm new password" 
                    className="bg-white border-slate-200 h-12 rounded-xl text-slate-800 focus:ring-cyan-200 focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="space-y-0.5">
                  <Label className="text-red-650 font-bold flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" /> Delete Account
                  </Label>
                  <p className="text-xs text-slate-400">Permanently delete your profile data. This is irreversible.</p>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => toast.error("Please contact administrator support to request account removal.")}
                  className="h-10 px-4 rounded-xl border border-red-200 hover:bg-red-50 text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 justify-end">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="h-13 px-8 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-md flex items-center gap-2"
          >
            {isSaving ? "Saving..." : <><Save className="h-5 w-5" /> Save Configuration</>}
          </Button>
        </div>

      </div>
    </PageTransition>
  );
}
