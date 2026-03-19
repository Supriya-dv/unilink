import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, Zap, Download, Mail, Users, ArrowRight } from "lucide-react";

export default function StartMatch() {
  const navigate = useNavigate();

  // Ensure page opens from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbfbfe] via-[#f8f7ff] to-[#fbfbfe] text-[#1e1b4b]">

      {/* Header */}
      <header className="border-b border-[#e0e7ff] bg-white/80 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between py-5 px-6">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#d946ef] shadow-lg">
              <span className="text-lg font-bold text-white">U</span>
            </div>

            <div className="text-sm font-semibold">
              <div>unilink</div>
              <div className="text-xs text-gray-500">
                connect · grow · thrive
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/login")}
            >
              log in
            </Button>

            <Button
              size="sm"
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
            >
              get started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-16 pb-24">

        <section className="grid gap-10 lg:grid-cols-12 lg:items-center">

          {/* Left Content */}
          <div className="lg:col-span-6">
            <div className="max-w-xl">

              <p className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-purple-700">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                now in beta
              </p>

              <h1 className="mt-6 text-5xl font-bold">
                find your
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  {" "}perfect
                </span>
                <br />
                match
              </h1>

              <p className="mt-4 text-gray-600">
                Connect with students who share your interests, goals,
                and career path.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex gap-4">

                <Button
                  size="lg"
                  onClick={() => navigate("/discover")}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white gap-2"
                >
                  start matching
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/discover")}
                >
                  watch demo
                </Button>

              </div>

              {/* Features */}
              <div className="mt-12 grid gap-4 sm:grid-cols-2">

                <div className="flex gap-3 rounded-xl bg-white p-5 shadow">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                    <Heart className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold">quality matches</p>
                    <p className="text-sm text-gray-500">
                      curated connections
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-xl bg-white p-5 shadow">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold">instant setup</p>
                    <p className="text-sm text-gray-500">
                      get matched quickly
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Side Card */}
          <div className="lg:col-span-6">
            <div className="mx-auto max-w-lg">

              <Card className="p-8 shadow-xl bg-white">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs uppercase text-indigo-500">
                      live matches
                    </p>
                    <p className="text-2xl font-bold">128 online now</p>
                  </div>

                  <div className="flex items-center gap-2 text-purple-600 text-xs">
                    <Zap className="h-4 w-4" />
                    real-time
                  </div>

                </div>

                {/* Match list */}
                <div className="mt-8 space-y-3">

                  {[
                    { name: "Aarya", role: "Product Design", match: "93%" },
                    { name: "Samir", role: "Data Science", match: "89%" },
                    { name: "Riya", role: "Community", match: "95%" },
                  ].map((user) => (

                    <div
                      key={user.name}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >

                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-500">
                          {user.role}
                        </p>
                      </div>

                      <div className="text-sm font-bold">
                        {user.match}
                      </div>

                    </div>

                  ))}

                </div>

                {/* App download */}
                <div className="mt-8 flex items-center justify-between rounded-lg bg-purple-100 p-4">

                  <div>
                    <p className="text-sm font-semibold">
                      get the app
                    </p>
                    <p className="text-xs text-gray-500">
                      match on the go
                    </p>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => navigate("/download")}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    download
                  </Button>

                </div>

              </Card>

            </div>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-gray-500">
        © 2024 unilink — made for students
      </footer>

    </div>
  );
}