import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, MessageCircle, Bookmark, ThumbsUp, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
          className="relative overflow-hidden rounded-[2rem] glass border border-black/[0.05] p-8 md:p-12 bg-white/70 shadow-sm"
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-64 w-64 rounded-full bg-cyan-200/20 blur-[80px]" />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Welcome back, <span className="text-gradient-cyan-purple">Explorer!</span> 👋
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl font-medium">
              Your network is growing. You have <span className="text-cyan-600 font-semibold">12 new connection requests</span> and 3 potential matches waiting for you.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button onClick={() => navigate('/discover')} className="rounded-2xl h-12 px-8 bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all">
                Explore Matches
              </Button>
              <Button onClick={() => navigate('/connections')} variant="outline" className="rounded-2xl h-12 px-8 border-slate-200 hover:bg-slate-50 text-slate-700 bg-white">
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
              className="glass-card rounded-3xl p-6 flex items-center gap-6 bg-white/70 border-black/[0.05]"
            >
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center bg-cyan-50 border border-cyan-100 text-cyan-600`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-bold">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* 📡 Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-cyan-600" />
                Trending Insight
              </h2>
              <Button variant="ghost" className="text-cyan-600 hover:bg-cyan-50 font-semibold">See All</Button>
            </div>
            
            {feedPosts.map((post, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="glass-card border border-black/[0.05] rounded-[2rem] overflow-hidden hover:bg-white transition-all bg-white/80 group">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`h-12 w-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center font-bold text-cyan-600 text-lg`}>
                        {post.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-lg">{post.author}</span>
                          <Badge className={`bg-cyan-50 text-cyan-700 border-cyan-100`}>
                            {post.badge}
                          </Badge>
                        </div>
                        <span className="text-sm text-slate-400">{post.time}</span>
                      </div>
                    </div>
                    <p className="text-lg text-slate-700 leading-relaxed mb-6 italic">
                      "{post.content}"
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="flex items-center gap-6 text-slate-500">
                        <button className="flex items-center gap-2 hover:text-pink-600 transition-colors group/btn">
                          <ThumbsUp className="h-5 w-5 group-hover/btn:scale-110 transition-transform" /> {post.likes}
                        </button>
                        <button className="flex items-center gap-2 hover:text-cyan-600 transition-colors group/btn">
                          <MessageCircle className="h-5 w-5 group-hover/btn:scale-110 transition-transform" /> {post.comments}
                        </button>
                      </div>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-700 rounded-xl">
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
            <h2 className="text-2xl font-bold text-slate-900 px-2">People to Connect</h2>
            <div className="space-y-4">
              {suggestedUsers.map((user, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="glass-card border border-black/[0.05] rounded-2xl p-4 hover:bg-white transition-all cursor-pointer bg-white/80">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 shrink-0 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-slate-750`}>
                        {user.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">
                          {user.dept} · {user.company || user.year}
                        </p>
                      </div>
                      <Button size="icon" className={`h-10 w-10 shrink-0 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100 hover:bg-cyan-500 hover:text-white transition-all`}>
                        <UserPlus className="h-5 w-5" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
              <Button onClick={() => navigate('/discover')} variant="outline" className="w-full rounded-2xl border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 py-6 bg-white shadow-sm">
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
