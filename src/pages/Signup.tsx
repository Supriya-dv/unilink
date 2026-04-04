import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

const Signup = () => {

  const navigate = useNavigate();   // ⭐ added

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    department: "",
    interests: "",
    bio: "",
    email: "",
    password: "",
    role: "",
    photo: null,
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handlePhoto = (e: any) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = () => {
    console.log("User Profile:", formData);

    alert("Account Created Successfully!");

    // ⭐ redirect to start matching page
    navigate("/start-match");
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-hero-gradient">
                <span className="font-display text-xl font-bold text-primary-foreground">
                  U
                </span>
              </div>
              <span className="font-display text-2xl font-bold text-foreground">
                UniLink
              </span>
            </Link>
          </div>

          <Card className="shadow-card border border-border bg-card/80 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="font-display text-2xl">
                Create your account
              </CardTitle>
              <CardDescription>
                Join UniLink and start connecting
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Course / Department</Label>
                <Input id="department" onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Input id="interests" onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Input id="bio" onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Profile Photo</Label>
                <Input type="file" onChange={handlePhoto} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Select onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="alumni">Alumni</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="hero"
                className="w-full"
                size="lg"
                onClick={handleSubmit}
              >
                Create Account
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  Log in
                </Link>
              </p>

            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;