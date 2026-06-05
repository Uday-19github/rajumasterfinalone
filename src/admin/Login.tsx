import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      localStorage.setItem("adminAuth", "true");
      // Keep legacy key for ProtectedRoute backward-compat
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/dashboard");
    } else {
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-8 pb-8">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 shadow-md">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <h1 className="font-display text-2xl tracking-tight text-slate-900">RAJUMASTER'S</h1>
              <p className="text-primary font-bold tracking-[0.2em] -mt-1 text-sm">RISE & SHINE</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base">Username</Label>
              <Input
                id="username"
                placeholder="admin"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                className="h-11 text-base"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className="h-11 text-base"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full h-11 text-base text-white"
              style={{ backgroundColor: "#7C3AED" }}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
