import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div className="min-h-screen bg-premium-900 font-inter text-white flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* 🔮 Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan/10 rounded-full blur-[120px] animate-blob-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple/10 rounded-full blur-[120px] animate-blob-float [animation-delay:2s]" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan via-purple to-pink p-0.5 group-hover:rotate-12 transition-transform">
              <div className="h-full w-full rounded-[14px] bg-premium-900 flex items-center justify-center font-bold text-2xl">U</div>
            </div>
            <span className="text-3xl font-black tracking-tighter">UniLink</span>
          </Link>
          <p className="text-white/40 mt-3 font-medium">Elevate your campus networking experience</p>
        </div>

        <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border-white/5 shadow-2xl">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-sm text-white/50 mb-8">Please enter your details to sign in.</p>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white/70 ml-1">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                <Input 
                  placeholder="name@university.edu" 
                  className="bg-white/[0.03] border-white/10 h-14 pl-12 rounded-2xl focus:border-cyan/50 focus:ring-cyan/20 transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label className="text-white/70">Password</Label>
                <button className="text-xs text-cyan hover:text-cyan-400 transition-colors">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                <Input 
                  type="password"
                  placeholder="••••••••" 
                  className="bg-white/[0.03] border-white/10 h-14 pl-12 rounded-2xl focus:border-cyan/50 focus:ring-cyan/20 transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            <Button className="w-full h-14 rounded-2xl bg-cyan-purple text-white font-black text-lg shadow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all group">
              Sign In <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-premium-900 px-4 text-white/30 font-bold tracking-widest">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="ghost" className="h-14 rounded-2xl bg-white/[0.03] border border-white/10 text-white font-bold hover:bg-white/5">
                <Chrome className="h-5 w-5 mr-3" /> Google
              </Button>
              <Button variant="ghost" className="h-14 rounded-2xl bg-white/[0.03] border border-white/10 text-white font-bold hover:bg-white/5">
                <Github className="h-5 w-5 mr-3" /> GitHub
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-white/40 font-medium">
          New to UniLink? <Link to="/signup" className="text-cyan font-bold hover:text-cyan-400 transition-colors">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}
