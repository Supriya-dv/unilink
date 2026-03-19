import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, UserMinus, MessageCircle } from "lucide-react";
import { useState } from "react";

const allConnections = [
  { name: "Priya Sharma", role: "Alumni", dept: "Computer Science", company: "Google", avatar: "PS" },
  { name: "Rahul Verma", role: "Student", dept: "Electrical Eng.", year: "3rd Year", avatar: "RV" },
  { name: "Ananya Iyer", role: "Alumni", dept: "MBA", company: "McKinsey", avatar: "AI" },
  { name: "Karthik Nair", role: "Student", dept: "Mechanical Eng.", year: "2nd Year", avatar: "KN" },
  { name: "Sneha Patel", role: "Alumni", dept: "Data Science", company: "Amazon", avatar: "SP" },
  { name: "Vikram Joshi", role: "Student", dept: "Civil Eng.", year: "4th Year", avatar: "VJ" },
];

const Connections = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filtered = allConnections.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || c.role.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="mb-6 font-display text-2xl font-bold">Your Connections</h1>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search connections..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["all", "student", "alumni"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((user, i) => (
          <Card key={i} className="shadow-card transition-shadow hover:shadow-card-hover">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display font-bold text-primary">
                {user.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.dept} · {user.company || user.year}
                </p>
                <Badge variant={user.role === "Alumni" ? "default" : "secondary"} className="mt-1 text-xs">
                  {user.role}
                </Badge>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                  <UserMinus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">No connections found.</p>
      )}
    </div>
  );
};

export default Connections;
