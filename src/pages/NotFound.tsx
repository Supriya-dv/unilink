import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-hero-gradient opacity-25 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-[520px] w-[780px] rounded-full bg-primary/10 opacity-40 blur-3xl" />
      </div>

      <div className="flex min-h-screen items-center justify-center px-4 py-16">
        <div className="max-w-md rounded-3xl border border-border bg-card/80 p-10 text-center shadow-card backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">404 error</p>
          <h1 className="mt-4 text-5xl font-extrabold">Page not found</h1>
          <p className="mt-4 text-base text-muted-foreground">We couldn't find the page you're looking for.</p>
          <a
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
