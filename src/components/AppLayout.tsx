import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const AppLayout = () => {
  return (
    <div className="relative flex min-h-screen bg-background text-foreground">

      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[460px] w-[640px] -translate-x-1/2 rounded-full bg-hero-gradient opacity-30 blur-3xl" />
        <div className="absolute bottom-0 right-1/2 h-[480px] w-[720px] translate-x-1/2 rounded-full bg-primary/10 opacity-40 blur-3xl" />
      </div>

      {/* Sidebar */}
      <div className="w-[18rem] shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};