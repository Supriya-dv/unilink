import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Sparkles, Users, ShieldCheck, 
  ArrowRight, Heart, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Sparkles,
    title: "Futuristic Glass UI",
    description: "Experience a billion-dollar startup aesthetic with our premium glassmorphism design system.",
    color: "cyan"
  },
  {
    icon: Users,
    title: "Deep Connections",
    description: "Find your tribe through AI-powered matching and meaningful campus interactions.",
    color: "purple"
  },
  {
    icon: Sparkles,
    title: "Instant Networking",
    description: "Zero friction. Connect with peers, mentors, and alumni with a single swipe.",
    color: "pink"
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description: "Your data is yours. We provide a safe, encrypted space for student communities.",
    color: "cyan"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100 }
  }
};

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-cyan-200 selection:text-cyan-800">
      
      {/* 🔮 Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-200/40 rounded-full blur-[120px] animate-blob-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/40 rounded-full blur-[120px] animate-blob-float [animation-delay:2s]" />
      </div>

      {/* 🛰️ Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 h-20 glass border-b border-black/[0.05] px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan via-purple to-pink flex items-center justify-center p-0.5"
          >
            <div className="h-full w-full rounded-[10px] bg-white flex items-center justify-center font-bold text-xl text-slate-800">U</div>
          </motion.div>
          <span className="text-2xl font-bold tracking-tighter text-slate-900 group-hover:text-cyan-600 transition-colors">UniLink</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
          <a href="#about" className="hover:text-slate-900 transition-colors">Network</a>
          <Link to="/pricing" className="text-cyan-600 font-bold hover:text-cyan-700 transition-colors flex items-center gap-1">
             Pricing & Tiers
          </Link>
          <a href="#community" className="hover:text-slate-900 transition-colors">Join Us</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/pricing" className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors sm:hidden">Pricing</Link>
          <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">Log in</Link>
          <Link to="/signup">
            <Button className="rounded-xl bg-slate-900 text-white font-bold px-6 h-11 hover:bg-slate-800 transition-all">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      {/* 🚀 Hero & Network Section */}
      <section id="about" className="pt-40 pb-20 px-6 container max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-slate-200/50 border-black/5 text-cyan-600 mb-6 py-2 px-4 rounded-full text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
               ✨ The Future of Campus Networking
             </Badge>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-slate-900">
              CONNECT <br /> 
              <span className="text-gradient-cyan-purple-pink">BEYOND</span> <br />
              BOUNDARIES
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              UniLink is a premium ecosystem for ambitious students and alumni. 
              Find your next co-founder, mentor, or friend in a space built for excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button className="h-14 px-10 rounded-2xl bg-cyan-purple text-white font-black text-lg shadow-cyan transition-all hover:scale-105 active:scale-95 group">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="ghost" className="h-14 px-10 rounded-2xl border border-black/10 text-slate-700 font-bold hover:bg-black/5">
                  View Tiers & Pricing
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-12 w-12 rounded-full border-2 border-white bg-slate-200" />
                ))}
              </div>
              <p className="text-sm text-slate-500">
                Joined by <span className="text-slate-900 font-bold">10,000+</span> curious minds
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
             <div className="relative z-10 glass-card rounded-[3rem] p-4 aspect-square max-w-[500px] mx-auto overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan/20 to-pink/20 opacity-50 group-hover:scale-110 transition-transform duration-700" />
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop" 
                  className="w-full h-full object-cover rounded-[2.5rem] mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-700" 
                  alt="App Preview"
                />
                
                {/* Floating Elements on Top */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-10 right-10 glass-dark border-black/[0.05] p-4 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600"><Heart className="h-5 w-5 fill-cyan-600" /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">New Match!</p>
                      <p className="text-[10px] text-slate-500">Sophia liked you back</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-10 left-10 glass-dark border-black/[0.05] p-4 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600"><Star className="h-5 w-5 fill-purple-600" /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Premium Rank</p>
                      <p className="text-[10px] text-slate-500">Top 1% Profile</p>
                    </div>
                  </div>
                </motion.div>
             </div>
             
             {/* Glowing Orbs behind the card */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-100/30 blur-[100px] -z-10 rounded-full" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-100/30 blur-[80px] -z-20 rounded-full animate-pulse-glow" />
          </motion.div>
        </div>
      </section>

      {/* 🔮 Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-slate-900">ENGINEERED FOR <span className="text-cyan-600">IMPACT</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Everything you need to navigate campus life and beyond.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="glass-card p-8 rounded-[2.5rem] border-black/[0.05] hover:border-black/10 transition-all group shadow-sm bg-white/70"
              >
                <div className={`h-16 w-16 rounded-2xl bg-cyan-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                  <feature.icon className={`h-8 w-8 text-cyan-600`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🚀 CTA / Join Us Section */}
      <section id="community" className="py-20 px-6 overflow-hidden">
        <div className="container max-w-5xl mx-auto">
           <div className="relative glass-card rounded-[3.5rem] p-12 md:p-24 text-center overflow-hidden border-black/[0.05] bg-white/80">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100/50 via-slate-50 to-pink-100/50 -z-10 animate-blob-float" />
              <h2 className="text-5xl md:text-7xl font-black mb-8 text-slate-900">READY TO <br /> REDEFINE YOUR <br /> CAMPUS LIFE?</h2>
              <p className="text-xl text-slate-600 mb-12 max-w-xl mx-auto">Join the elite network of students and graduates making real moves.</p>
              <Link to="/signup">
                <Button className="h-16 px-16 rounded-3xl bg-slate-900 text-white font-black text-xl shadow-lg transition-all hover:scale-110 active:scale-95">
                  JOIN UNILINK
                </Button>
              </Link>
           </div>
        </div>
      </section>

      {/* 🛰️ Footer */}
      <footer className="py-12 border-t border-black/[0.05] px-6">
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-200 flex items-center justify-center font-bold text-slate-700">U</div>
            <span className="font-bold tracking-tight text-slate-800">UniLink</span>
          </div>
          <p className="text-sm text-slate-500 truncate mx-auto md:mx-0">
            Design & Build by <span className="text-cyan-600 font-semibold">UniLink Labs</span> • © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-slate-950 transition-colors text-xs font-semibold uppercase tracking-widest">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-slate-950 transition-colors text-xs font-semibold uppercase tracking-widest">Terms</a>
            <a href="#" className="text-slate-400 hover:text-slate-950 transition-colors text-xs font-semibold uppercase tracking-widest">Twitter</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
