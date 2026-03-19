import { Link, useLocation } from "react-router-dom";
import { Home, Users, MessageCircle, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { label: "Home", icon: Home, path: "/dashboard" },
  { label: "Connections", icon: Users, path: "/connections" },
  { label: "Messages", icon: MessageCircle, path: "/messages" },
  { label: "Profile", icon: User, path: "/profile" },
];

export const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/60 backdrop-blur-xl shadow-xl shadow-black/10">
      <div className="container mx-auto flex h-16 items-center justify-between gap-6 px-6">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 shadow-lg shadow-indigo-500/20">
            <span className="font-display text-lg font-bold text-white">U</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight text-white">UniLink</span>
            <span className="text-xs font-medium text-white/70">Connect + grow</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <div
                className={
                  "group relative flex items-center gap-2 rounded-full px-4 py-2 transition-colors " +
                  (isActive(item.path)
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white")
                }
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
                <span
                  className={
                    "absolute -bottom-1 left-1/2 h-0.5 w-0 rounded-full bg-indigo-400 transition-all " +
                    (isActive(item.path) ? "w-6 -translate-x-1/2" : "w-0")
                  }
                />
              </div>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </Button>

          <Button variant="hero" size="sm" className="hidden items-center gap-2 md:flex">
            <span>Go to dashboard</span>
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex items-center justify-between gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                <div
                  className={
                    "flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-semibold transition-colors " +
                    (isActive(item.path)
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/10 hover:text-white")
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
