import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Crown, Check, Zap, Sparkles, MessageSquare, 
  ShieldCheck, ArrowRight, Star, X, QrCode, Copy, 
  CheckCircle2, CreditCard, Smartphone, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";

const plans = [
  {
    name: "Free",
    priceInr: "₹0",
    priceUsd: "$0",
    description: "Basic student networking parameters",
    features: [
      "10 Swipe discover actions per day",
      "Standard matching system",
      "Message only after matching",
      "Standard profile placement"
    ],
    cta: "Current Tier",
    popular: false,
    color: "slate",
  },
  {
    name: "UniLink Pro",
    priceInr: "₹799",
    priceUsd: "$9.99",
    description: "Unlock advanced matching & requests view",
    features: [
      "Unlimited swiping discover actions",
      "See who liked you instantly (Unlock blur)",
      "5 SuperLikes daily to stand out",
      "1 Profile Boost per month",
      "Premium profile badge"
    ],
    cta: "Pay & Upgrade via UPI",
    popular: true,
    color: "cyan",
  },
  {
    name: "Alumni Direct",
    priceInr: "₹1,499",
    priceUsd: "$19.99",
    description: "Exclusive mentoring from top industry professionals",
    features: [
      "Everything in UniLink Pro",
      "Direct Messaging before matching",
      "Priority matching with top Alumni mentors",
      "Advanced company/department search filters",
      "Exclusive alumni career webinars access"
    ],
    cta: "Pay & Upgrade via UPI",
    popular: false,
    color: "purple",
  }
];

export default function Premium() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedVpa, setCopiedVpa] = useState(false);

  const handleOpenPayment = (plan: typeof plans[0]) => {
    if (plan.name === "Free") return;
    setSelectedPlan(plan);
  };

  const handleCopyVpa = () => {
    navigator.clipboard.writeText("unilink@upi");
    setCopiedVpa(true);
    toast.success("UPI ID copied to clipboard!");
    setTimeout(() => setCopiedVpa(false), 2000);
  };

  const handleConfirmPayment = () => {
    if (!selectedPlan) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const tierValue = selectedPlan.name === "Alumni Direct" ? "alumni_direct" : "pro";
      localStorage.setItem("unilink_is_premium", "true");
      localStorage.setItem("unilink_user_tier", tierValue);
      window.dispatchEvent(new Event("premiumUpdated"));
      
      toast.success(`Payment Verified! Welcome to ${selectedPlan.name} 🚀`, {
        description: selectedPlan.name === "Alumni Direct" 
          ? "Unlocked Advanced Alumni Filters & Direct Messaging!"
          : "Your connection requests have been completely unblurred!",
      });

      setSelectedPlan(null);
      navigate("/connections");
    }, 1500);
  };

  return (
    <PageTransition className="container max-w-6xl mx-auto px-4 py-12">
      
      {/* ✨ Header */}
      <div className="text-center mb-16 relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex h-16 w-16 rounded-3xl bg-amber-100 items-center justify-center text-amber-600 mb-6 shadow-md"
        >
          <Crown className="h-9 w-9 animate-pulse" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">
          CHOOSE YOUR <span className="text-gradient-cyan-purple-pink">TIER</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
          Accelerate your academic journey and professional network with premium match options.
        </p>
      </div>

      {/* 🚀 Pricing Grid */}
      <div className="grid gap-8 lg:grid-cols-3 items-stretch">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex"
          >
            <Card className={cn(
              "w-full glass-card border rounded-[2.5rem] p-6 flex flex-col justify-between transition-all relative overflow-hidden bg-white/70",
              plan.popular ? "border-cyan-500 shadow-cyan/10 ring-2 ring-cyan-500/20" : "border-black/[0.05] shadow-sm",
            )}>
              {plan.popular && (
                <Badge className="absolute top-4 right-4 bg-cyan-500 text-white font-bold px-3 py-1 rounded-full text-xs">
                  Most Popular
                </Badge>
              )}
              
              <div>
                <CardHeader className="p-0 mb-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{plan.name}</span>
                  <CardTitle className="text-slate-950 text-5xl font-black mt-2 flex items-baseline gap-2">
                    {plan.priceInr}
                    <span className="text-base font-semibold text-slate-400">/mo ({plan.priceUsd})</span>
                  </CardTitle>
                  <p className="text-sm text-slate-500 mt-2 font-medium leading-relaxed">{plan.description}</p>
                </CardHeader>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={cn(
                        "h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-white text-xs mt-0.5",
                        plan.color === "cyan" ? "bg-cyan-500" :
                        plan.color === "purple" ? "bg-purple-500" : "bg-slate-400"
                      )}>
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-sm text-slate-650 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => handleOpenPayment(plan)}
                disabled={plan.name === "Free"}
                className={cn(
                  "w-full h-13 rounded-2xl font-bold transition-all text-base flex items-center justify-center gap-2",
                  plan.popular 
                    ? "bg-cyan-purple text-white shadow-md hover:scale-[1.02]" 
                    : plan.name === "Free"
                    ? "bg-slate-100 text-slate-400"
                    : "bg-slate-950 text-white hover:bg-slate-800"
                )}
              >
                {plan.cta} <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 💳 UPI Payment Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-6 md:p-8 z-10 border border-slate-100 overflow-hidden"
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedPlan(null)}
                className="absolute top-6 right-6 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-600">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">UPI Quick Pay</h3>
                  <p className="text-xs text-slate-500">Scan QR or use any UPI app to unlock Pro features</p>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Plan Selected</span>
                  <h4 className="text-base font-bold text-slate-900">{selectedPlan.name} Subscription</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-400">Total Due</span>
                  <p className="text-xl font-black text-cyan-600">{selectedPlan.priceInr}</p>
                </div>
              </div>

              {/* QR Code & VPA Section */}
              <div className="flex flex-col items-center justify-center p-6 bg-slate-900 text-white rounded-3xl mb-6 relative overflow-hidden">
                <div className="p-3 bg-white rounded-2xl shadow-xl mb-4">
                  {/* Generated QR visual representation */}
                  <div className="h-40 w-40 bg-slate-950 rounded-xl flex flex-col items-center justify-center p-2 text-center border-4 border-slate-900">
                    <QrCode className="h-28 w-28 text-white" />
                    <span className="text-[10px] font-mono text-cyan-400 mt-1">unilink@upi</span>
                  </div>
                </div>

                <p className="text-xs font-medium text-slate-300 mb-2">Scan with Google Pay, PhonePe, Paytm, or BHIM</p>
                
                {/* VPA Copy Bar */}
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-xs font-mono">
                  <span>VPA: unilink@upi</span>
                  <button onClick={handleCopyVpa} className="ml-2 hover:text-cyan-400 transition-colors">
                    {copiedVpa ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* What Unlocks Reminder */}
              <div className="space-y-2 mb-6 text-xs text-slate-600">
                <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-500" /> What happens after payment:
                </h5>
                <ul className="space-y-1 text-slate-500 pl-5 list-disc">
                  <li>Your <strong>Connections requests</strong> will be instantly unblurred.</li>
                  <li>You will receive the gold <strong>PRO badge</strong> on your sidebar.</li>
                  <li>Unlimited swiping enabled on <strong>Discover</strong> cards.</li>
                </ul>
              </div>

              {/* Pay & Confirm Action */}
              <Button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full h-14 rounded-2xl bg-cyan-purple text-white font-bold shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all text-base flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Verifying Payment...</>
                ) : (
                  <><ShieldCheck className="h-5 w-5" /> Confirm & Verify Payment ({selectedPlan.priceInr})</>
                )}
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </PageTransition>
  );
}

// Utility class helper mapping
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
