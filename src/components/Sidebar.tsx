import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, MessageCircle, User, Settings, LogOut, Compass, Sparkles, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const navItems = [
  { label: "Home", icon: Home, path: "/dashboard", color: "cyan" },
  { label: "Discover", icon: Compass, path: "/discover", color: "purple" },
  { label: "Connections", icon: Users, path: "/connections", color: "pink" },
  { label: "Messages", icon: MessageCircle, path: "/messages", color: "cyan" },
  { label: "Profile", icon: User, path: "/profile", color: "purple" },
  { label: "Settings", icon: Settings, path: "/settings", color: "pink" },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const [isPremium, setIsPremium] = useState(localStorage.getItem("unilink_is_premium") === "true");
  const [userTier, setUserTier] = useState(localStorage.getItem("unilink_user_tier") || (isPremium ? "pro" : "free"));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const checkPremium = () => {
      const prem = localStorage.getItem("unilink_is_premium") === "true";
      setIsPremium(prem);
      setUserTier(localStorage.getItem("unilink_user_tier") || (prem ? "pro" : "free"));
    };
    window.addEventListener("premiumUpdated", checkPremium);
    window.addEventListener("storage", checkPremium);
    return () => {
      window.removeEventListener("premiumUpdated", checkPremium);
      window.removeEventListener("storage", checkPremium);
    };
  }, []);

  // Use real data with original defaults
  const initials = user?.fullName
    ? user.fullName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "JD";
  const displayName = user?.fullName || "John Doe";
  const displayLabel = userTier === "alumni_direct" ? "Alumni VIP" : isPremium ? "Pro Member" : "Free Member";

  return (
    <>
      {/* 🔮 Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? "80px" : "280px" }}
        className="hidden md:flex flex-col h-screen glass-dark border-r border-white/5 p-4 z-40 relative transition-all duration-300 ease-in-out shadow-2xl overflow-hidden"
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-2 mb-10 h-12">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-purple shadow-cyan cursor-pointer"
          >
            <span className="font-display text-lg font-bold text-white">U</span>
          </motion.div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-display text-xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-cyan-purple"
            >
              UniLink
            </motion.span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative group flex items-center h-12 rounded-2xl px-3 transition-all duration-200",
                  isActive(item.path) 
                    ? "bg-slate-900/[0.06] text-slate-950 shadow-sm" 
                    : "text-slate-500 hover:bg-slate-900/[0.03] hover:text-slate-900"
                )}
              >
                {isActive(item.path) && (
                  <motion.div
                    layoutId="active-pill"
                    className={cn(
                      "absolute left-0 w-1 h-6 rounded-full",
                      item.color === "cyan" ? "bg-cyan shadow-cyan-glow" : 
                      item.color === "purple" ? "bg-purple shadow-purple-glow" : "bg-pink shadow-pink-glow"
                    )}
                  />
                )}
                <item.icon className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive(item.path) && item.color === "cyan" ? "text-cyan-600" :
                  isActive(item.path) && item.color === "purple" ? "text-purple-600" :
                  isActive(item.path) && item.color === "pink" ? "text-pink-600" : ""
                )} />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-3 font-semibold text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-white border border-slate-200 text-slate-800 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                    {item.label}
                  </div>
                )}
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Premium Upgrade CTA Card inside Sidebar */}
        {!isPremium && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => navigate('/premium')}
            className="p-4 mb-4 rounded-2xl bg-gradient-to-tr from-amber-500/10 to-amber-600/10 border border-amber-500/20 text-center cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Crown className="h-6 w-6 text-amber-500 mx-auto mb-2 animate-bounce" />
            <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">Unlock Pro</h4>
            <p className="text-[10px] text-amber-700 mt-1 leading-tight">See who liked you & get unlimited swipes!</p>
          </motion.div>
        )}

        {/* Profile Card / Logout */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          {!isCollapsed ? (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-3 rounded-2xl bg-white border border-slate-150 flex items-center gap-3 mb-2 shadow-sm"
            >
              <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center font-bold text-purple-700 relative">
                {initials}
                {userTier === "alumni_direct" ? (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple-600 rounded-full flex items-center justify-center text-[8px] text-white shadow-md border-2 border-white">
                    👑
                  </span>
                ) : isPremium ? (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-amber-500 rounded-full flex items-center justify-center text-[8px] text-white shadow-md border-2 border-white">
                    ★
                  </span>
                ) : null}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate flex items-center gap-1.5">
                  {displayName}
                  {userTier === "alumni_direct" ? (
                    <span className="bg-purple-100 text-purple-700 text-[8px] font-extrabold px-1 rounded">VIP</span>
                  ) : isPremium ? (
                    <span className="bg-amber-100 text-amber-700 text-[8px] font-extrabold px-1 rounded">PRO</span>
                  ) : null}
                </p>
                <p className="text-xs text-slate-400 truncate">{displayLabel}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8 text-slate-400 hover:text-pink-600 hover:bg-pink-50">
                <LogOut className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
             <div className="relative">
               <Button variant="ghost" size="icon" onClick={handleLogout} className="w-full h-12 rounded-2xl hover:bg-white/10">
                 <LogOut className="h-5 w-5 text-muted-foreground" />
               </Button>
             </div>
          )}
          
          <Button
            variant="ghost"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full text-xs text-slate-400 hover:text-slate-800"
          >
            {isCollapsed ? "→" : "Collapse Sidebar"}
          </Button>
        </div>
      </motion.aside>

      {/* 📱 Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 glass-dark border-t border-white/5 z-50 flex items-center justify-around px-2">
        {navItems.slice(0, 5).map((item) => (
          <Link key={item.path} to={item.path} className="flex flex-col items-center gap-1">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={cn(
                "p-2 rounded-xl transition-all",
                isActive(item.path) ? "bg-white/10 text-white" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn(
                "h-6 w-6",
                isActive(item.path) && item.color === "cyan" ? "text-cyan" :
                isActive(item.path) && item.color === "purple" ? "text-purple" :
                isActive(item.path) && item.color === "pink" ? "text-pink" : ""
              )} />
              {isActive(item.path) && (
                <motion.div layoutId="active-dot" className="absolute -bottom-1 h-1 w-1 bg-white rounded-full mx-auto" />
              )}
            </motion.div>
          </Link>
        ))}
      </nav>
    </>
  );
};
