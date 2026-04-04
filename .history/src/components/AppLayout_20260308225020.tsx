import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};