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

  return (
    <header className="sticky top-0 z-50 border-b bg-card shadow-nav">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hero-gradient">
            <span className="font-display text-lg font-bold text-primary-foreground">U</span>
          </div>
          <span className="font-display text-xl font-bold text-gradient">UniLink</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                size="sm"
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileOpen && (
        <nav className="border-t bg-card p-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                <Button
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
