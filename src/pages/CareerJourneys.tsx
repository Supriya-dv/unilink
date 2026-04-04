import React from "react";
import { motion } from "framer-motion";
import { 
  ThumbsUp, MessageCircle, Bookmark, 
  Share2, MoreHorizontal, Sparkles, 
  TrendingUp, Clock, Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const journeys = [
  {
    author: "Priya Sharma",
    avatar: "PS",
    company: "Google",
    title: "From Campus to Google: My 2-Year Journey",
    content: `When I graduated from IIT Bombay in 2022, I had no idea I'd end up at Google. My journey started with countless rejections — I failed 5 campus placement interviews. Instead of giving up, I spent my final semester building real projects and contributing to open source.

The key turning points:
• Built a full-stack project that got 500+ GitHub stars
• Got a referral through an alumni connection (on this very platform!)
• Cracked the Google interview on my 2nd attempt

My advice: Don't just study DSA — build things. Show impact. And always reach out to your alumni network.`,
    tags: ["SDE", "Interview Prep", "Open Source"],
    likes: 156,
    comments: 34,
    color: "cyan"
  },
  {
    author: "Ananya Iyer",
    avatar: "McKinsey",
    company: "McKinsey",
    title: "Breaking into Consulting from an Engineering Background",
    content: `Everyone told me consulting wasn't for engineers. They were wrong. Here's how I made the switch:

1. Joined the case study club in my 3rd year
2. Did a summer internship at a startup (operations role)
3. Prepared case interviews for 6 months straight
4. Got into McKinsey's generalist program

The engineering mindset is actually a superpower in consulting — structured problem solving, data analysis, and first-principles thinking. If you're an engineer interested in consulting, don't let anyone discourage you.`,
    tags: ["Consulting", "Career Switch", "MBA"],
    likes: 98,
    comments: 21,
    color: "purple"
  },
  {
    author: "Vikram Joshi",
    avatar: "VJ",
    company: "Razorpay",
    title: "My Internship Experience at Razorpay",
    content: `Just wrapped up a 6-month internship at Razorpay and here are my biggest takeaways:

• The tech stack matters less than your problem-solving ability
• Startup culture is fast-paced — you ship features weekly
• Mentorship from seniors was the best part
• I worked on the payments API that processes millions of transactions

For anyone targeting fintech, focus on understanding payments infrastructure and API design. Happy to answer any questions!`,
    tags: ["Fintech", "Internship", "Startup"],
    likes: 67,
    comments: 15,
    color: "pink"
  },
];

export default function CareerJourneys() {
  return (
    <div className="container max-w-4xl py-10 px-6">
      
      {/* 🚀 Header */}
      <div className="mb-12">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex items-center gap-2 text-cyan font-bold text-xs uppercase tracking-widest mb-3"
        >
          <Sparkles className="h-4 w-4" /> Alumni Success Stories
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4"
        >
          CAREER <span className="text-gradient-cyan-purple-pink">JOURNEYS</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/50 text-lg max-w-2xl"
        >
          Real stories from alumni who've been in your shoes. Learn, adapt, and build your own legacy.
        </motion.p>
      </div>

      {/* 🔮 Journeys List */}
      <div className="space-y-8">
        {journeys.map((journey, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative"
          >
            {/* Card Content */}
            <div className="glass-card rounded-[2.5rem] p-8 border-white/5 hover:border-white/10 transition-all shadow-2xl relative overflow-hidden group-hover:bg-white/[0.04]">
              
              {/* Corner Accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${journey.color}/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform`} />

              <div className="flex flex-col md:flex-row gap-6">
                {/* Author Info */}
                <div className="flex md:flex-col items-center md:items-start gap-4 md:w-32">
                  <div className={`h-16 w-16 rounded-2xl bg-${journey.color}/20 border border-${journey.color}/30 flex items-center justify-center font-bold text-xl text-${journey.color} shadow-lg`}>
                    {journey.avatar.substring(0, 2)}
                  </div>
                  <div className="md:mt-2">
                    <p className="font-bold text-white text-sm truncate">{journey.author}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Briefcase className="h-3 w-3 text-white/30" />
                      <p className="text-[10px] text-white/50 font-medium uppercase tracking-wider">{journey.company}</p>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan transition-colors leading-tight">
                    {journey.title}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line mb-6 font-medium">
                    {journey.content}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {journey.tags.map((tag) => (
                      <Badge key={tag} className="bg-white/5 border-white/10 text-white/70 hover:bg-white/10 rounded-lg py-1 px-3 text-[10px] font-bold uppercase tracking-wider">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-white/40 hover:text-cyan transition-colors group/btn">
                        <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/btn:bg-cyan/10 transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold">{journey.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-white/40 hover:text-purple transition-colors group/btn">
                         <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/btn:bg-purple/10 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold">{journey.comments}</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-white/30 hover:text-white hover:bg-white/5 transition-all">
                        <Bookmark className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-white/30 hover:text-white hover:bg-white/5 transition-all">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
