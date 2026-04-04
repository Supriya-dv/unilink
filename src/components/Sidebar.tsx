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

export const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card/70 px-4 py-3 backdrop-blur-md md:hidden">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-hero-gradient">
            <span className="font-display text-lg font-bold text-primary-foreground">U</span>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">UniLink</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Menu />
        </Button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-border bg-card/80 p-4 backdrop-blur-md transition-transform duration-300 md:static md:translate-x-0 md:inset-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between md:justify-center">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-hero-gradient">
              <span className="font-display text-lg font-bold text-primary-foreground">U</span>
            </div>
            <span className="hidden font-display text-lg font-semibold tracking-tight text-foreground md:block">
              UniLink
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </Button>
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setOpen(false)}>
              <Button
                variant={isActive(item.path) ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start gap-3 rounded-md px-3 py-2 text-left"
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile nav */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};
