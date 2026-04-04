import React from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-premium-900 text-white flex items-center justify-center p-6 relative overflow-hidden font-inter">
      
      {/* 🔮 Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan/10 rounded-full blur-[120px] animate-blob-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple/10 rounded-full blur-[120px] animate-blob-float [animation-delay:2s]" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <div className="inline-flex h-32 w-32 rounded-[2.5rem] bg-white/5 border border-white/10 items-center justify-center mb-8 shadow-2xl relative group">
           <div className="absolute inset-0 bg-cyan/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
           <Ghost className="h-16 w-16 text-cyan animate-bounce" />
        </div>
        
        <h1 className="text-8xl font-black tracking-tighter mb-4 text-gradient-cyan-purple-pink">404</h1>
        <h2 className="text-3xl font-bold mb-4">You've reached the void.</h2>
        <p className="text-white/40 mb-10 max-w-md mx-auto font-medium">
          The page <code className="text-pink bg-pink/10 px-2 py-0.5 rounded">{location.pathname}</code> does not exist or has been moved to another dimension.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="h-14 px-8 rounded-2xl bg-white text-premium-900 font-bold text-lg hover:bg-cyan transition-all group">
              <Home className="mr-2 h-5 w-5" /> Back to Safety
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="h-14 px-8 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
