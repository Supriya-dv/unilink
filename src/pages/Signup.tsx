import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight, CheckCheck } from "lucide-react";
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
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
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

  const handleSubmit = async () => {
    try {
      await signup({
        email: formData.email,
        password: formData.password,
        fullName: formData.name,
        age: formData.age,
        role: formData.role,
        department: formData.department,
        interests: formData.interests,
        bio: formData.bio,
      });
      navigate("/start-match");
    } catch {
      toast.error("Signup failed. Please check your details and try again.");
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-slate-50 font-inter text-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* 🔮 Background Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100/40 rounded-full blur-[120px] animate-blob-float" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-100/40 rounded-full blur-[120px] animate-blob-float [animation-delay:2s]" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan via-purple to-pink p-0.5 group-hover:rotate-12 transition-transform">
              <div className="h-full w-full rounded-[10px] bg-white flex items-center justify-center font-bold text-xl text-slate-800">U</div>
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">UniLink</span>
          </Link>
        </div>

        <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-black/[0.05] shadow-xl relative overflow-hidden bg-white/70">
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100">
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
                  <h2 className="text-3xl font-bold mb-2 text-slate-900">Create Account</h2>
                  <p className="text-slate-500">Start your premium networking journey.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-700 ml-1">Full Name</Label>
                      <Input id="name" placeholder="John Doe" className="bg-white/80 border-slate-200 h-12 rounded-xl focus:border-cyan-500 focus:ring-cyan-200 transition-all text-slate-900 placeholder:text-slate-455" onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 ml-1">Age</Label>
                      <Input id="age" type="number" placeholder="21" className="bg-white/80 border-slate-200 h-12 rounded-xl focus:border-cyan-500 focus:ring-cyan-200 transition-all text-slate-900 placeholder:text-slate-455" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 ml-1">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@university.edu" className="bg-white/80 border-slate-200 h-12 rounded-xl focus:border-cyan-500 focus:ring-cyan-200 transition-all text-slate-900 placeholder:text-slate-455" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 ml-1">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" className="bg-white/80 border-slate-200 h-12 rounded-xl focus:border-cyan-500 focus:ring-cyan-200 transition-all text-slate-900 placeholder:text-slate-455" onChange={handleChange} />
                  </div>
                </div>

                <Button onClick={nextStep} className="w-full h-14 rounded-2xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-all group">
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
                  <h2 className="text-3xl font-bold mb-2 text-slate-900">Profile Details</h2>
                  <p className="text-slate-500">Tell us about your academic background.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700 ml-1">Role</Label>
                    <Select onValueChange={handleRoleChange}>
                      <SelectTrigger className="bg-white/80 border-slate-200 h-12 rounded-xl focus:ring-cyan-200 text-slate-900">
                        <SelectValue placeholder="Are you a Student or Alumni?" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200 text-slate-900">
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="alumni">Alumni</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 ml-1">Course / Department</Label>
                    <Input id="department" placeholder="e.g. Computer Science" className="bg-white/80 border-slate-200 h-12 rounded-xl focus:border-cyan-500 focus:ring-cyan-200 transition-all text-slate-900 placeholder:text-slate-455" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 ml-1">Interests (comma separated)</Label>
                    <Input id="interests" placeholder="AI, Design, Music..." className="bg-white/80 border-slate-200 h-12 rounded-xl focus:border-cyan-500 focus:ring-cyan-200 transition-all text-slate-900 placeholder:text-slate-455" onChange={handleChange} />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={prevStep} variant="ghost" className="flex-1 h-14 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50">
                    Back
                  </Button>
                  <Button onClick={nextStep} className="flex-1 h-14 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all">
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
                  <div className="inline-flex h-20 w-20 rounded-full bg-cyan-100 items-center justify-center text-cyan-600 mb-4 animate-bounce">
                    <Sparkles className="h-10 w-10" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 text-slate-900">Final Touch</h2>
                  <p className="text-slate-500">Add a short bio to complete your profile.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700 ml-1">Short Bio</Label>
                    <Textarea id="bio" placeholder="What makes you unique?" className="bg-white/80 border-slate-200 rounded-xl min-h-[120px] focus:border-cyan-500 focus:ring-cyan-200 transition-all resize-none text-slate-900 placeholder:text-slate-400" onChange={handleChange} />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={prevStep} variant="ghost" className="flex-1 h-14 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50">
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

        <p className="text-center mt-8 text-slate-500 font-medium">
          Already have an account? <Link to="/login" className="text-cyan-600 font-bold hover:text-cyan-500 transition-colors">Log in</Link>
        </p>
      </motion.div>

    </div>
  );
}