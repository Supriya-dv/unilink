import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageCircle, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
  },
  {
    author: "Ananya Iyer",
    avatar: "AI",
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
  },
];

const CareerJourneys = () => {
  return (
    <div className="container max-w-3xl py-8">
      <h1 className="mb-2 font-display text-2xl font-bold">Career Journeys</h1>
      <p className="mb-8 text-muted-foreground">Real stories from alumni who've been in your shoes.</p>

      <div className="space-y-6">
        {journeys.map((journey, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="shadow-card transition-shadow hover:shadow-card-hover">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-display font-bold text-primary">
                    {journey.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{journey.author}</p>
                    <p className="text-xs text-muted-foreground">{journey.company}</p>
                  </div>
                </div>

                <h2 className="mb-3 font-display text-lg font-semibold">{journey.title}</h2>
                <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {journey.content}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {journey.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-4 border-t pt-4 text-muted-foreground">
                  <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                    <ThumbsUp className="h-3.5 w-3.5" /> {journey.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                    <MessageCircle className="h-3.5 w-3.5" /> {journey.comments}
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
    </div>
  );
};

export default CareerJourneys;
