import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  Users,
  Layers,
  ShieldCheck,
  ArrowRight,
  ClipboardList,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Polished UI, Fast Results",
    description:
      "Ship faster with a consistent, modern design system built for student communities and professional growth.",
  },
  {
    icon: Users,
    title: "Meaningful Connections",
    description:
      "Find peers, mentors, and alumni in moments — not months. Build your network with purpose.",
  },
  {
    icon: Layers,
    title: "Organize Your Workflow",
    description:
      "Keep projects, conversations, and goals in one modern dashboard — designed for clarity and impact.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy You Can Trust",
    description:
      "We respect your data. End-to-end mindset, without compromising the experience.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card/70 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-hero-gradient">
              <span className="font-display text-xl font-bold text-primary-foreground">U</span>
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">UniLink</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#why" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Why UniLink
            </a>
            <a href="#footer" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute -inset-x-16 -top-24 h-[440px] w-[980px] -translate-x-1/2 transform rounded-full bg-hero-gradient opacity-30 blur-3xl" />
          <div className="container relative">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-12 md:grid-cols-12 md:items-center">
                <div className="md:col-span-7">
                  <Badge className="mb-6 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                    Built for students + professionals
                  </Badge>
                  <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                    A modern platform for building authentic <span className="text-gradient">campus communities</span>
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                    From connecting with classmates and alumni, to tracking progress toward your next career milestone — UniLink brings it all together in a clean, professional experience.
                  </p>
                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Link to="/signup">
                      <Button size="lg" className="gap-2">
                        Start free trial <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="hero-outline" size="lg">
                        Already have an account?
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-2xl bg-card/60 p-4 text-center backdrop-blur">
                      <p className="text-2xl font-semibold text-foreground">10K+</p>
                      <p className="text-sm text-muted-foreground">Active members</p>
                    </div>
                    <div className="rounded-2xl bg-card/60 p-4 text-center backdrop-blur">
                      <p className="text-2xl font-semibold text-foreground">250+</p>
                      <p className="text-sm text-muted-foreground">Universities represented</p>
                    </div>
                    <div className="rounded-2xl bg-card/60 p-4 text-center backdrop-blur">
                      <p className="text-2xl font-semibold text-foreground">1,200+</p>
                      <p className="text-sm text-muted-foreground">Mentorship connections</p>
                    </div>
                    <div className="rounded-2xl bg-card/60 p-4 text-center backdrop-blur">
                      <p className="text-2xl font-semibold text-foreground">4.9</p>
                      <p className="text-sm text-muted-foreground">Average satisfaction</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur">
                    <div className="absolute inset-x-0 -top-10 h-32 bg-gradient-to-b from-primary/30 to-transparent blur-2xl" />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-primary">Today at 11:00 AM</p>
                        <p className="text-lg font-semibold text-foreground">Weekly community meetup</p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        Live
                      </span>
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex -space-x-3">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <div
                            key={idx}
                            className="h-10 w-10 rounded-full border border-card bg-muted"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">+ 12 more joining</p>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <Button size="sm" className="flex-1">
                        Join now
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        View agenda
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-border bg-card py-20">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Everything you need to <span className="text-gradient">build a thriving community</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                A modern experience for students, educators, and professionals — designed for clarity, speed, and impact.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-border bg-background p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why section */}
        <section id="why" className="py-20">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  Built to feel <span className="text-gradient">purposeful and professional</span>
                </h2>
                <p className="mt-6 max-w-xl text-muted-foreground">
                  UniLink combines familiar collaboration patterns with a clean UI, so every interaction feels intentional and focused. Spend less time navigating and more time creating value.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Security-first mindset</p>
                      <p className="text-sm text-muted-foreground">Secure by default with thoughtful privacy controls and permissions.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ClipboardList className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Clear structure</p>
                      <p className="text-sm text-muted-foreground">Everything is organized so you can focus on progress instead of navigation.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-border bg-card p-10 shadow-lg">
                  <h3 className="font-display text-xl font-semibold">Latest activity</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Stay in the loop with real-time updates tailored to your network.</p>

                  <div className="mt-8">
                    <ScrollArea className="h-[340px] rounded-2xl border border-border bg-background p-4">
                      <div className="space-y-4">
                        {Array.from({ length: 6 }).map((_, idx) => (
                          <div key={idx} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <Sparkles className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">New connection suggestion</p>
                              <p className="text-sm text-muted-foreground">
                                See how {idx % 2 === 0 ? "Sarah" : "Jordan"} is applying for internships at top firms.
                              </p>
                              <p className="mt-2 text-xs text-muted-foreground">2h ago</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="border-t border-border bg-card py-12">
          <div className="container">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-hero-gradient">
                    <span className="font-display text-lg font-bold text-primary-foreground">U</span>
                  </div>
                  <span className="font-display text-lg font-semibold">UniLink</span>
                </div>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  A modern platform for students and professionals who want more than a message board—built for connection, collaboration, and long-term growth.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Product</h4>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li>
                      <a href="#features" className="transition-colors hover:text-foreground">
                        Features
                      </a>
                    </li>
                    <li>
                      <a href="#why" className="transition-colors hover:text-foreground">
                        Why UniLink
                      </a>
                    </li>
                    <li>
                      <Link to="/login" className="transition-colors hover:text-foreground">
                        Sign in
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Company</h4>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li>
                      <a href="#" className="transition-colors hover:text-foreground">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors hover:text-foreground">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors hover:text-foreground">
                        Privacy
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Connect</h4>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li>
                      <a href="#" className="transition-colors hover:text-foreground">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors hover:text-foreground">
                        Feedback
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors hover:text-foreground">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-10 border-t border-border pt-8 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} UniLink. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
