import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, MapPin, Building, Briefcase, GraduationCap } from "lucide-react";

const skills = ["React", "TypeScript", "Machine Learning", "Python", "System Design", "Public Speaking"];

const Profile = () => {
  return (
    <div className="container max-w-4xl py-8">
      {/* Cover & Avatar */}
      <Card className="overflow-hidden shadow-card">
        <div className="h-32 bg-hero-gradient md:h-44" />
        <CardContent className="relative px-6 pb-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-card bg-primary/10 font-display text-3xl font-bold text-primary">
              JS
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold">John Smith</h1>
              <p className="text-sm text-muted-foreground">Computer Science · Class of 2024</p>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Mumbai, India</span>
                <span className="flex items-center gap-1"><Building className="h-3 w-3" /> IIT Bombay</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="h-3.5 w-3.5" /> Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {/* Bio & Skills */}
        <div className="space-y-6 md:col-span-2">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <h2 className="mb-3 font-display text-lg font-semibold">About</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Passionate computer science student with a strong interest in full-stack development and 
                machine learning. Currently working on projects involving natural language processing. 
                Looking to connect with alumni in the tech industry for mentorship and guidance.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <h2 className="mb-3 font-display text-lg font-semibold">Skills & Interests</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <h2 className="mb-3 font-display text-lg font-semibold">Career Journey</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">SDE Intern · Microsoft</p>
                    <p className="text-xs text-muted-foreground">Summer 2023 · Hyderabad</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">B.Tech Computer Science · IIT Bombay</p>
                    <p className="text-xs text-muted-foreground">2020 - 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats sidebar */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <p className="font-display text-3xl font-bold text-primary">128</p>
              <p className="text-sm text-muted-foreground">Connections</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <p className="font-display text-3xl font-bold text-primary">45</p>
              <p className="text-sm text-muted-foreground">Profile Views</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

