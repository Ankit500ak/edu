"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (loginError) {
      setError(loginError.message);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Log In to SkillSphere</h2>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow" type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </Button>
          {error && <div className="text-red-600 text-sm text-center mt-2">{error}</div>}
        </form>
        <div className="text-center mt-4 text-sm text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-600 font-semibold hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  );
}
