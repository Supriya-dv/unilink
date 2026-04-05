import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, MessageCircle, Bookmark, ThumbsUp, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Connections", value: "128", icon: Users, color: "cyan" },
  { label: "Matches", value: "24", icon: Zap, color: "purple" },
  { label: "New Messages", value: "7", icon: MessageCircle, color: "pink" },
];

const suggestedUsers = [
  { name: "Priya Sharma", role: "Alumni", dept: "Computer Science", company: "Google", avatar: "PS", color: "cyan" },
  { name: "Rahul Verma", role: "Student", dept: "Electrical Eng.", year: "3rd Year", avatar: "RV", color: "purple" },
  { name: "Ananya Iyer", role: "Alumni", dept: "MBA", company: "McKinsey", avatar: "AI", color: "pink" },
  { name: "Karthik Nair", role: "Student", dept: "Mechanical Eng.", year: "2nd Year", avatar: "KN", color: "cyan" },
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
    color: "cyan"
  },
  {
    author: "Ananya Iyer",
    avatar: "AI",
    badge: "Alumni",
    time: "5h ago",
    content: "My journey from campus placement to McKinsey: I failed 7 interviews before getting my first offer. Each rejection taught me something. To all current students — don't give up. Your breakthrough is closer than you think! 💪",
    likes: 89,
    comments: 23,
    color: "purple"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
};

import { PageTransition } from "@/components/PageTransition";

const Dashboard = () => {
  return (
    <PageTransition className="container max-w-7xl mx-auto px-4 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* ✨ Hero Section */}
        <motion.div 
          variants={itemVariants}
          className="relative overflow-hidden rounded-[2rem] glass-dark border border-white/5 p-8 md:p-12"
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-64 w-64 rounded-full bg-cyan/10 blur-[80px]" />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Welcome back, <span className="text-gradient-cyan-purple">Explorer!</span> 👋
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Your network is growing. You have <span className="text-cyan font-semibold">12 new connection requests</span> and 3 potential matches waiting for you.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button className="rounded-2xl h-12 px-8 bg-cyan text-premium-900 font-bold hover:shadow-cyan transition-all">
                Explore Matches
              </Button>
              <Button variant="outline" className="rounded-2xl h-12 px-8 border-white/10 hover:bg-white/5 text-white">
                View Requests
              </Button>
            </div>
          </div>
        </motion.div>

        {/* 📊 Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-3xl p-6 flex items-center gap-6"
            >
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center bg-${stat.color}/10 border border-${stat.color}/20 text-${stat.color} shadow-${stat.color}`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* 📡 Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-cyan" />
                Trending Insight
              </h2>
              <Button variant="ghost" className="text-cyan hover:bg-cyan/10">See All</Button>
            </div>
            
            {feedPosts.map((post, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="glass-card border-none rounded-[2rem] overflow-hidden hover:bg-white/[0.04] transition-all group">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`h-12 w-12 rounded-2xl bg-${post.color}/20 border border-${post.color}/30 flex items-center justify-center font-bold text-${post.color} text-lg shadow-${post.color}`}>
                        {post.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-lg">{post.author}</span>
                          <Badge className={`bg-${post.color}/10 text-${post.color} border-${post.color}/20`}>
                            {post.badge}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{post.time}</span>
                      </div>
                    </div>
                    <p className="text-lg text-foreground/90 leading-relaxed mb-6 italic">
                      "{post.content}"
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-6 text-muted-foreground">
                        <button className="flex items-center gap-2 hover:text-pink transition-colors group/btn">
                          <ThumbsUp className="h-5 w-5 group-hover/btn:scale-110 transition-transform" /> {post.likes}
                        </button>
                        <button className="flex items-center gap-2 hover:text-cyan transition-colors group/btn">
                          <MessageCircle className="h-5 w-5 group-hover/btn:scale-110 transition-transform" /> {post.comments}
                        </button>
                      </div>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-xl">
                        <Bookmark className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 👥 Suggestions */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white px-2">People to Connect</h2>
            <div className="space-y-4">
              {suggestedUsers.map((user, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="glass-card border-none rounded-2xl p-4 hover:bg-white/[0.05] transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 shrink-0 rounded-xl bg-${user.color}/20 border border-${user.color}/30 flex items-center justify-center font-bold text-${user.color}`}>
                        {user.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-white truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.dept} · {user.company || user.year}
                        </p>
                      </div>
                      <Button size="icon" className={`h-10 w-10 shrink-0 rounded-xl bg-${user.color}/10 text-${user.color} hover:bg-${user.color} hover:text-white transition-all`}>
                        <UserPlus className="h-5 w-5" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
              <Button variant="outline" className="w-full rounded-2xl border-white/5 text-muted-foreground hover:text-white hover:bg-white/5 py-6">
                Discover More People
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default Dashboard;
