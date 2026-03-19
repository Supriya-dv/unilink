import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, MessageCircle, Bookmark, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const suggestedUsers = [
  { name: "Priya Sharma", role: "Alumni", dept: "Computer Science", company: "Google", avatar: "PS" },
  { name: "Rahul Verma", role: "Student", dept: "Electrical Eng.", year: "3rd Year", avatar: "RV" },
  { name: "Ananya Iyer", role: "Alumni", dept: "MBA", company: "McKinsey", avatar: "AI" },
  { name: "Karthik Nair", role: "Student", dept: "Mechanical Eng.", year: "2nd Year", avatar: "KN" },
];

const feedPosts = [
  {
    author: "Priya Sharma",
    avatar: "PS",
    badge: "Alumni",
    time: "2h ago",
    content: "Just completed my first year at Google! Here's what I wish I knew as a student: focus on problem-solving over memorizing syntax. The skills that truly matter are communication, collaboration, and a growth mindset. 🚀",
    likes: 42,
    comments: 8,
  },
  {
    author: "Ananya Iyer",
    avatar: "AI",
    badge: "Alumni",
    time: "5h ago",
    content: "My journey from campus placement to McKinsey: I failed 7 interviews before getting my first offer. Each rejection taught me something. To all current students — don't give up. Your breakthrough is closer than you think! 💪",
    likes: 89,
    comments: 23,
  },
  {
    author: "Karthik Nair",
    avatar: "KN",
    badge: "Student",
    time: "1d ago",
    content: "Looking for seniors who have experience with robotics competitions. Planning to participate in Robocon next year and would love some guidance! 🤖",
    likes: 15,
    comments: 6,
  },
];

const Dashboard = () => {
  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Welcome */}
        <div className="mb-8 rounded-xl bg-hero-gradient p-6 text-primary-foreground md:p-8">
          <h1 className="font-display text-2xl font-bold md:text-3xl">Welcome back, Student! 👋</h1>
          <p className="mt-2 opacity-90">Explore new connections and career insights today.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Feed */}
          <div className="space-y-4 lg:col-span-2">
            <h2 className="font-display text-lg font-semibold">Your Feed</h2>
            {feedPosts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="shadow-card transition-shadow hover:shadow-card-hover">
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                        {post.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.author}</span>
                          <Badge variant={post.badge === "Alumni" ? "default" : "secondary"} className="text-xs">
                            {post.badge}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{post.time}</span>
                      </div>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-foreground">{post.content}</p>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                        <ThumbsUp className="h-3.5 w-3.5" /> {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                        <MessageCircle className="h-3.5 w-3.5" /> {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="ml-auto gap-1.5 text-xs">
                        <Bookmark className="h-3.5 w-3.5" /> Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold">People to Connect</h2>
            {suggestedUsers.map((user, i) => (
              <Card key={i} className="shadow-card transition-shadow hover:shadow-card-hover">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                    {user.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-sm">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.dept} · {user.company || user.year}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    <UserPlus className="h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
