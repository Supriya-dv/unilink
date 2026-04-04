import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Lock, ArrowRight, Camera, 
  Sparkles, ShieldCheck, ChevronRight, ChevronLeft,
  Briefcase, School, Heart, CheckCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    department: "",
    interests: "",
    bio: "",
    email: "",
    password: "",
    role: "",
    photo: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = () => {
    console.log("User Profile:", formData);
    navigate("/start-match");
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-premium-900 font-inter text-white flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* 🔮 Background Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple/10 rounded-full blur-[120px] animate-blob-float" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan/10 rounded-full blur-[120px] animate-blob-float [animation-delay:2s]" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan via-purple to-pink p-0.5 group-hover:rotate-12 transition-transform">
              <div className="h-full w-full rounded-[10px] bg-premium-900 flex items-center justify-center font-bold text-xl">U</div>
            </div>
            <span className="text-2xl font-black tracking-tighter">UniLink</span>
          </Link>
        </div>

        <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-white/5 shadow-2xl relative overflow-hidden">
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/5">
             <motion.div 
               className="h-full bg-gradient-to-r from-cyan to-purple"
               initial={{ width: "33.33%" }}
               animate={{ width: `${(step / 3) * 100}%` }}
             />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                  <p className="text-white/50">Start your premium networking journey.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white/70 ml-1">Full Name</Label>
                      <Input id="name" placeholder="John Doe" className="bg-white/[0.03] border-white/10 h-12 rounded-xl focus:border-cyan/50 focus:ring-cyan/20 transition-all" onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/70 ml-1">Age</Label>
                      <Input id="age" type="number" placeholder="21" className="bg-white/[0.03] border-white/10 h-12 rounded-xl focus:border-cyan/50 focus:ring-cyan/20 transition-all" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/70 ml-1">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@university.edu" className="bg-white/[0.03] border-white/10 h-12 rounded-xl focus:border-cyan/50 focus:ring-cyan/20 transition-all" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/70 ml-1">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" className="bg-white/[0.03] border-white/10 h-12 rounded-xl focus:border-cyan/50 focus:ring-cyan/20 transition-all" onChange={handleChange} />
                  </div>
                </div>

                <Button onClick={nextStep} className="w-full h-14 rounded-2xl bg-white text-premium-900 font-bold text-lg hover:bg-cyan transition-all group">
                  Next Step <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-2">Profile Details</h2>
                  <p className="text-white/50">Tell us about your academic background.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white/70 ml-1">Role</Label>
                    <Select onValueChange={handleRoleChange}>
                      <SelectTrigger className="bg-white/[0.03] border-white/10 h-12 rounded-xl focus:ring-cyan/20">
                        <SelectValue placeholder="Are you a Student or Alumni?" />
                      </SelectTrigger>
                      <SelectContent className="bg-premium-800 border-white/10 text-white">
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="alumni">Alumni</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/70 ml-1">Course / Department</Label>
                    <Input id="department" placeholder="e.g. Computer Science" className="bg-white/[0.03] border-white/10 h-12 rounded-xl focus:border-cyan/50 focus:ring-cyan/20 transition-all" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/70 ml-1">Interests (comma separated)</Label>
                    <Input id="interests" placeholder="AI, Design, Music..." className="bg-white/[0.03] border-white/10 h-12 rounded-xl focus:border-cyan/50 focus:ring-cyan/20 transition-all" onChange={handleChange} />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={prevStep} variant="ghost" className="flex-1 h-14 rounded-2xl border border-white/10 text-white hover:bg-white/5">
                    Back
                  </Button>
                  <Button onClick={nextStep} className="flex-1 h-14 rounded-2xl bg-white text-premium-900 font-bold hover:bg-cyan transition-all">
                    Last Step
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="inline-flex h-20 w-20 rounded-full bg-cyan/10 items-center justify-center text-cyan mb-4 animate-bounce">
                    <Sparkles className="h-10 w-10" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Final Touch</h2>
                  <p className="text-white/50">Add a short bio to complete your profile.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white/70 ml-1">Short Bio</Label>
                    <Textarea id="bio" placeholder="What makes you unique?" className="bg-white/[0.03] border-white/10 rounded-xl min-h-[120px] focus:border-cyan/50 focus:ring-cyan/20 transition-all resize-none" onChange={handleChange} />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={prevStep} variant="ghost" className="flex-1 h-14 rounded-2xl border border-white/10 text-white hover:bg-white/5">
                    Back
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 h-14 rounded-2xl bg-cyan-purple text-white font-black text-lg shadow-cyan hover:scale-105 transition-all">
                    Complete <CheckCheck className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center mt-8 text-white/40 font-medium">
          Already have an account? <Link to="/login" className="text-cyan font-bold hover:text-cyan-400 transition-colors">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}