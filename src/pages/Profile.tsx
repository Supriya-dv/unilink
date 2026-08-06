import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, MapPin, School, 
  Edit3, Github, Linkedin, Twitter, ExternalLink,
  Camera, X, Check, Plus, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const defaultSkills = ["React", "TypeScript", "UI Design", "Product Management", "Node.js", "Python"];

import { PageTransition } from "@/components/PageTransition";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    occupationTitle: user?.occupationTitle || "",
    bio: user?.bio || "",
    university: user?.university || "",
    location: user?.location || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        occupationTitle: user.occupationTitle || "",
        bio: user.bio || "",
        university: user.university || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const displayName = user?.fullName || "John Doe";
  const displayTitle = user?.occupationTitle || "Full Stack Developer";
  const displayLocation = user?.location || "New York, NY";
  const displayUniversity = user?.university || "Stanford University";
  const displayBio = user?.bio || "Passionate about building highly interactive and visually stunning web applications. I specialize in React, Framer Motion, and modern UI/UX patterns. Currently focused on creating the next generation of college networking experiences.";
  const displaySkills = user?.skills?.length ? user.skills : defaultSkills;

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaveError(null);
    try {
      setIsSaving(true);
      await updateUser({
        fullName: formData.fullName || undefined,
        occupationTitle: formData.occupationTitle || undefined,
        bio: formData.bio || undefined,
        university: formData.university || undefined,
        location: formData.location || undefined,
      });
      toast.success("Profile updated!");
      setIsDrawerOpen(false);
    } catch (error) {
      setSaveError("Failed to update profile. Please try again.");
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };
  
  const initials = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <PageTransition className="min-h-screen pb-20">
      
      {/* 🌆 Cover Image Section */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 via-purple/20 to-pink/20 animate-pulse-glow" />
        <img 
          src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1200&h=400&fit=crop" 
          className="w-full h-full object-cover opacity-85"
          alt="Cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent" />
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
                <div className="h-full w-full rounded-[2.2rem] bg-slate-900" />
              </div>
              
              {user?.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  className="absolute inset-2 h-[calc(10rem-1rem)] w-[calc(10rem-1rem)] rounded-[2.1rem] object-cover border-4 border-slate-900"
                  alt="Avatar"
                />
              ) : (
                <div className="absolute inset-2 h-[calc(10rem-1rem)] w-[calc(10rem-1rem)] rounded-[2.1rem] bg-slate-900 border-4 border-slate-900 flex items-center justify-center font-bold text-4xl text-white">
                  {initials}
                </div>
              )}
              
              <Button size="icon" className="absolute bottom-2 right-2 h-10 w-10 rounded-2xl bg-cyan-500 text-white shadow-md border-4 border-slate-900 hover:scale-110 transition-transform">
                <Camera className="h-5 w-5" />
              </Button>
            </motion.div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{displayName}</h1>
              <p className="text-cyan-600 font-semibold mt-1">{displayTitle}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-400" /> {displayLocation}</span>
                <span className="flex items-center gap-1.5"><School className="h-4 w-4 text-slate-400" /> {displayUniversity}</span>
              </div>
            </div>

            <Button 
              onClick={() => setIsDrawerOpen(true)}
              className="w-full h-12 rounded-2xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold transition-all shadow-sm"
            >
              <Edit3 className="h-5 w-5 mr-3" /> Edit Profile
            </Button>

            <div className="glass-card rounded-3xl p-6 space-y-4 bg-white/70 border-black/[0.05]">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Social Links</h3>
              <div className="space-y-3">
                {[
                  { icon: Github, label: "GitHub", link: "github.com/johndoe", color: "text-slate-800" },
                  { icon: Linkedin, label: "LinkedIn", link: "linkedin.com/in/johndoe", color: "text-cyan-600" },
                  { icon: Twitter, label: "Twitter", link: "twitter.com/johndoe", color: "text-purple-600" },
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    href="#"
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <social.icon className={`h-5 w-5 ${social.color}`} />
                      <span className="text-sm text-slate-500 group-hover:text-slate-800 transition-colors">{social.label}</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
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
              className="glass-card rounded-[2.5rem] p-8 md:p-10 bg-white/70 border-black/[0.05]"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <User className="h-6 w-6 text-cyan-600" /> About Me
              </h2>
              <p className="text-lg text-slate-650 leading-relaxed">
                {displayBio}
              </p>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-[2.5rem] p-8 md:p-10 bg-white/70 border-black/[0.05]"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-purple-600" /> Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-3">
                {displaySkills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + (i * 0.05) }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 245, 255, 0.1)" }}
                  >
                    <Badge className="bg-slate-100 border-slate-200 text-slate-700 rounded-xl px-4 py-2 text-sm font-semibold hover:text-cyan-600 hover:border-cyan-200 transition-all cursor-default">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-500 hover:text-slate-800 hover:border-slate-400 transition-all flex items-center gap-2"
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
                  className="glass-card rounded-3xl p-6 text-center bg-white/70 border-black/[0.05]"
                >
                  <h4 className="text-2xl font-bold text-slate-800">{stat.value}</h4>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">{stat.label}</p>
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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.2, damping: 20, stiffness: 150 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white border-l border-slate-200 z-[70] shadow-2xl p-8 overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Edit Profile</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsDrawerOpen(false)} className="rounded-xl hover:bg-slate-100">
                  <X className="h-6 w-6 text-slate-600" />
                </Button>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                   <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Basic Information</h3>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-600 ml-1">Full Name</label>
                       <Input id="edit-name" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} placeholder="John Doe" className="bg-slate-50 border-slate-200 rounded-xl h-12 text-slate-900 focus:ring-cyan-200 focus:border-cyan-500" />
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-600 ml-1">Title</label>
                       <Input id="edit-title" value={formData.occupationTitle} onChange={(e) => handleChange('occupationTitle', e.target.value)} placeholder="Full Stack Developer" className="bg-slate-50 border-slate-200 rounded-xl h-12 text-slate-900 focus:ring-cyan-200 focus:border-cyan-500" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-slate-600 ml-1">Bio</label>
                     <Textarea 
                       id="edit-bio"
                       value={formData.bio}
                       onChange={(e) => handleChange('bio', e.target.value)}
                       placeholder="Tell us about yourself..." 
                       className="bg-slate-50 border-slate-200 rounded-xl min-h-[120px] resize-none text-slate-900 focus:ring-cyan-200 focus:border-cyan-500"
                     />
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Education & Location</h3>
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-slate-600 ml-1">University</label>
                     <Input id="edit-university" defaultValue={displayUniversity} placeholder="Stanford University" className="bg-slate-50 border-slate-200 rounded-xl h-12 transition-all focus:border-cyan-500 focus:ring-cyan-200 text-slate-900" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-slate-600 ml-1">Location</label>
                     <Input id="edit-location" defaultValue={displayLocation} placeholder="New York, NY" className="bg-slate-50 border-slate-200 rounded-xl h-12 transition-all focus:border-cyan-500 focus:ring-cyan-200 text-slate-900" />
                   </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <Button onClick={handleSave} disabled={isSaving} className="flex-1 h-14 rounded-2xl bg-cyan-purple text-white font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600">
                    {isSaving ? 'Saving...' : <><Check className="h-5 w-5 mr-3" /> Save Changes</>}
                  </Button>
                  <Button variant="ghost" onClick={() => setIsDrawerOpen(false)} className="flex-1 h-14 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700">
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
