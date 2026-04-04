import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export const AppLayout = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative flex min-h-screen bg-premium-900 text-foreground overflow-hidden selection:bg-cyan/30 selection:text-cyan">
      
      {/* 🔴 Cursor Glow Effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${cursorX}px ${cursorY}px, rgba(0, 245, 255, 0.1), transparent 80%)`,
        }}
      />

      {/* 🔮 Background Animated Blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#050505]">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -left-[10%] h-[50%] w-[50%] rounded-full bg-cyan/10 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[20%] -right-[10%] h-[40%] w-[40%] rounded-full bg-purple/10 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[10%] left-[20%] h-[45%] w-[45%] rounded-full bg-pink/10 blur-[120px]"
        />
      </div>

      {/* 📱 Sidebar (Fixed/Glass) */}
      <Sidebar />

      {/* 🚀 Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto no-scrollbar pb-10">
          <Outlet />
        </main>
      </div>

    </div>
  );
};