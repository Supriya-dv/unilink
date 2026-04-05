import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, MapPin, Briefcase, School, 
  Edit3, Github, Linkedin, Twitter, ExternalLink,
  ChevronRight, Camera, X, Check, Plus, Sparkles, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const skills = ["React", "TypeScript", "UI Design", "Product Management", "Node.js", "Python"];

import { PageTransition } from "@/components/PageTransition";

export default function Profile() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  return (
    <PageTransition className="min-h-screen pb-20">
      
      {/* 🌆 Cover Image Section */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 via-purple/20 to-pink/20 animate-pulse-glow" />
        <img 
          src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1200&h=400&fit=crop" 
          className="w-full h-full object-cover opacity-60"
          alt="Cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-premium-900 to-transparent" />
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute bottom-6 right-6 md:right-12 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/20"
        >
          <Camera className="h-4 w-4 mr-2" /> Change Cover
        </Button>
      </div>

      <div className="container max-w-5xl mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* 👤 Avatar & Basic Info */}
          <div className="w-full md:w-1/3 space-y-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative inline-block mx-auto md:mx-0"
            >
              <div className="h-40 w-40 rounded-[2.5rem] p-1.5 bg-gradient-to-tr from-cyan via-purple to-pink shadow-cyan-glow animate-spin-slow">
                <div className="h-full w-full rounded-[2.2rem] bg-premium-900" />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" 
                className="absolute inset-2 h-[calc(10rem-1rem)] w-[calc(10rem-1rem)] rounded-[2.1rem] object-cover border-4 border-premium-900"
                alt="Avatar"
              />
              <Button size="icon" className="absolute bottom-2 right-2 h-10 w-10 rounded-2xl bg-cyan text-premium-900 shadow-cyan border-4 border-premium-900 hover:scale-110 transition-transform">
                <Camera className="h-5 w-5" />
              </Button>
            </motion.div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white tracking-tight">John Doe</h1>
              <p className="text-cyan font-medium mt-1">Full Stack Developer</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-muted-foreground text-sm">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> New York, NY</span>
                <span className="flex items-center gap-1.5"><School className="h-4 w-4" /> Stanford University</span>
              </div>
            </div>

            <Button 
              onClick={() => setIsDrawerOpen(true)}
              className="w-full h-12 rounded-2xl bg-white/[0.05] border border-white/10 text-white hover:bg-white/10 font-bold transition-all"
            >
              <Edit3 className="h-5 w-5 mr-3" /> Edit Profile
            </Button>

            <div className="glass-card rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white mb-2">Social Links</h3>
              <div className="space-y-3">
                {[
                  { icon: Github, label: "GitHub", link: "github.com/johndoe", color: "text-white" },
                  { icon: Linkedin, label: "LinkedIn", link: "linkedin.com/in/johndoe", color: "text-cyan" },
                  { icon: Twitter, label: "Twitter", link: "twitter.com/johndoe", color: "text-purple" },
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    href="#"
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <social.icon className={`h-5 w-5 ${social.color}`} />
                      <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">{social.label}</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground/30 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* 📝 Detailed Info */}
          <div className="flex-1 w-full space-y-8">
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-[2.5rem] p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <User className="h-6 w-6 text-cyan" /> About Me
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Passionate about building highly interactive and visually stunning web applications. 
                I specialize in React, Framer Motion, and modern UI/UX patterns. Currently focused on 
                creating the next generation of college networking experiences.
              </p>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-[2.5rem] p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-purple" /> Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + (i * 0.05) }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 245, 255, 0.1)" }}
                  >
                    <Badge className="bg-white/5 border-white/10 text-white rounded-xl px-4 py-2 text-sm font-medium hover:text-cyan hover:border-cyan/30 transition-all cursor-default">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl border border-dashed border-white/20 px-4 py-2 text-sm text-muted-foreground hover:text-white hover:border-white/40 transition-all flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Add Skill
                </motion.button>
              </div>
            </motion.div>

            {/* 🔥 Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Connections", value: "1.2k+", color: "cyan" },
                { label: "Matches", value: "48", color: "purple" },
                { label: "Profile Views", value: "892", color: "pink" },
                { label: "Posts", value: "15", color: "cyan" },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="glass-card rounded-3xl p-6 text-center"
                >
                  <h4 className="text-2xl font-bold text-white">{stat.value}</h4>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 Slide-in Edit Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.2, damping: 20, stiffness: 150 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl glass-dark border-l border-white/10 z-[70] shadow-2xl p-8 overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">Edit Profile</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsDrawerOpen(false)} className="rounded-xl hover:bg-white/10">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                   <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Basic Information</h3>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-sm text-foreground/70 ml-1">Full Name</label>
                       <Input placeholder="John Doe" className="bg-white/[0.03] border-white/10 rounded-xl h-12" />
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm text-foreground/70 ml-1">Title</label>
                       <Input placeholder="Full Stack Developer" className="bg-white/[0.03] border-white/10 rounded-xl h-12" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm text-foreground/70 ml-1">Bio</label>
                     <Textarea 
                       placeholder="Tell us about yourself..." 
                       className="bg-white/[0.03] border-white/10 rounded-xl min-h-[120px] resize-none"
                     />
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Education & Location</h3>
                   <div className="space-y-2">
                     <label className="text-sm text-foreground/70 ml-1">University</label>
                     <Input placeholder="Stanford University" className="bg-white/[0.03] border-white/10 rounded-xl h-12 transition-all focus:border-cyan/50 focus:ring-cyan/20" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm text-foreground/70 ml-1">Location</label>
                     <Input placeholder="New York, NY" className="bg-white/[0.03] border-white/10 rounded-xl h-12 transition-all focus:border-cyan/50 focus:ring-cyan/20" />
                   </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <Button className="flex-1 h-14 rounded-2xl bg-cyan text-premium-900 font-bold shadow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <Check className="h-5 w-5 mr-3" /> Save Changes
                  </Button>
                  <Button variant="ghost" onClick={() => setIsDrawerOpen(false)} className="flex-1 h-14 rounded-2xl border border-white/10 hover:bg-white/5 text-white">
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </PageTransition>
  );
}
