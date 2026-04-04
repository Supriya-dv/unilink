import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Heart, Sparkles, Zap, Download, 
  ArrowRight, Star, ShieldCheck, 
  Orbit, Globe, Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function StartMatch() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-premium-900 text-white relative overflow-hidden font-inter">
      
      {/* 🔮 Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan/10 rounded-full blur-[140px] animate-blob-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple/10 rounded-full blur-[140px] animate-blob-float [animation-delay:2s]" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-pink/5 rounded-full blur-[120px] animate-blob-float [animation-delay:4s]" />
      </div>

      {/* 🛰️ Navigation */}
      <nav className="h-20 glass border-b border-white/5 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-10 w-10 rounded-xl bg-cyan-purple flex items-center justify-center p-0.5 group-hover:rotate-12 transition-transform">
            <div className="h-full w-full rounded-[10px] bg-premium-900 flex items-center justify-center font-bold text-xl">U</div>
          </div>
          <span className="text-2xl font-black tracking-tighter">UniLink</span>
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="text-white/60 hover:text-white font-bold">Skip to Dashboard</Button>
          <Button onClick={() => navigate("/discover")} className="rounded-xl bg-white text-premium-900 font-bold px-6 shadow-lg hover:bg-cyan transition-all">Start Now</Button>
        </div>
      </nav>

      <main className="container max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* 🚀 Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-cyan/10 text-cyan border-cyan/20 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-pulse">
               ⚡ Matching Beta v2.0
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              FIND YOUR <br />
              <span className="text-gradient-cyan-purple-pink">ELITE MATCH</span>
            </h1>
            <p className="text-xl text-white/50 mb-12 max-w-xl leading-relaxed font-medium">
              Join the most exclusive campus networking ecosystem. 
              Our AI engine connects you with high-impact peers, mentors, and founders.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
               <div className="glass-card p-6 rounded-[2rem] border-white/5 hover:border-white/20 transition-all group">
                  <div className="h-12 w-12 rounded-xl bg-cyan/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="h-6 w-6 text-cyan fill-cyan" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">98% Match Rate</h3>
                  <p className="text-sm text-white/40">Curated specifically for your goals.</p>
               </div>
               <div className="glass-card p-6 rounded-[2rem] border-white/5 hover:border-white/20 transition-all group">
                  <div className="h-12 w-12 rounded-xl bg-purple/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="h-6 w-6 text-purple fill-purple" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Instant Access</h3>
                  <p className="text-sm text-white/40">Connect with leaders in real-time.</p>
               </div>
            </div>

            <Button 
              size="lg" 
              onClick={() => navigate("/discover")}
              className="h-16 px-12 rounded-2xl bg-cyan-purple text-white font-black text-xl shadow-cyan hover:scale-105 active:scale-95 transition-all group w-full sm:w-auto"
            >
              LAUNCH DISCOVERY <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* 💎 Right Side Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card rounded-[3.5rem] p-8 border-white/10 shadow-[0_0_100px_-20px_rgba(34,211,238,0.2)] relative z-10">
               <div className="flex items-center justify-between mb-10">
                  <div>
                    <p className="text-cyan font-black text-xs uppercase tracking-widest mb-1">Real-time Activity</p>
                    <h3 className="text-3xl font-black">1.2k+ ONLINE</h3>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center animate-spin-slow">
                    <Orbit className="h-6 w-6 text-purple" />
                  </div>
               </div>

               <div className="space-y-4">
                  {[
                    { name: "Siddharth", role: "AI Researcher", match: 98, color: "cyan" },
                    { name: "Elena", role: "UX Strategist", match: 94, color: "purple" },
                    { name: "Marcus", role: "Fintech Founder", match: 91, color: "pink" },
                  ].map((user, i) => (
                    <motion.div 
                      key={i}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      className="group flex items-center justify-between p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-2xl bg-${user.color}-500/20 flex items-center justify-center font-black text-${user.color}-400`}>
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-white group-hover:text-cyan-400 transition-colors">{user.name}</p>
                          <p className="text-xs text-white/40">{user.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-black text-${user.color}-400`}>{user.match}%</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Match Score</p>
                      </div>
                    </motion.div>
                  ))}
               </div>

               <div className="mt-10 p-6 rounded-[2.5rem] bg-gradient-to-br from-cyan/10 to-purple/10 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-premium-900 shadow-xl">
                      <Rocket className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Download Mobile App</p>
                      <p className="text-[10px] text-white/40">Exclusive features available now.</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-10 w-10 text-white/50 hover:text-white hover:bg-white/10 rounded-xl">
                    <Download className="h-5 w-5" />
                  </Button>
               </div>
            </div>

            {/* Glowing backgrounds behind the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-cyan/5 blur-[100px] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple/10 blur-[80px] -z-20 animate-pulse-glow" />
          </motion.div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 px-6">
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-xs text-white/20 font-bold uppercase tracking-[0.2em]">© {new Date().getFullYear()} UNILINK • ALL SYSTEMS OPERATIONAL</p>
           <div className="flex gap-8">
             {["Twitter", "Discord", "Terms"].map((l) => (
               <a key={l} href="#" className="text-xs text-white/30 hover:text-cyan font-black transition-colors uppercase tracking-widest">{l}</a>
             ))}
           </div>
        </div>
      </footer>

    </div>
  );
}