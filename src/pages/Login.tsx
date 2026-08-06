import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-inter text-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* 🔮 Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-100/40 rounded-full blur-[120px] animate-blob-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100/40 rounded-full blur-[120px] animate-blob-float [animation-delay:2s]" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan via-purple to-pink p-0.5 group-hover:rotate-12 transition-transform">
              <div className="h-full w-full rounded-[14px] bg-white flex items-center justify-center font-bold text-2xl text-slate-800">U</div>
            </div>
            <span className="text-3xl font-black tracking-tighter text-slate-900">UniLink</span>
          </Link>
          <p className="text-slate-500 mt-3 font-medium">Elevate your campus networking experience</p>
        </div>

        <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border-black/[0.05] shadow-xl bg-white/70">
          <h2 className="text-3xl font-bold mb-2 text-slate-900">Welcome Back</h2>
          <p className="text-sm text-slate-500 mb-8">Please enter your details to sign in.</p>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-slate-700 ml-1">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu" 
                  className="bg-white/80 border-slate-200 h-14 pl-12 rounded-2xl focus:border-cyan-500 focus:ring-cyan-200 transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label className="text-slate-700">Password</Label>
                <button className="text-xs text-cyan-600 hover:text-cyan-500 transition-colors">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••" 
                  className="bg-white/80 border-slate-200 h-14 pl-12 rounded-2xl focus:border-cyan-500 focus:ring-cyan-200 transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <Button onClick={handleLogin} className="w-full h-14 rounded-2xl bg-cyan-purple text-white font-black text-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all group">
              Sign In <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-500 font-medium">
          New to UniLink? <Link to="/signup" className="text-cyan-600 font-bold hover:text-cyan-500 transition-colors">Create an account</Link>
        </p>
      </motion.div>

    </div>
  );
}
