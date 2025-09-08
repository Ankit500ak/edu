"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowPopup(false);
    // Sign up user with Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) {
      if (signUpError.message.toLowerCase().includes("user already registered") || signUpError.message.toLowerCase().includes("user already exists") || signUpError.message.toLowerCase().includes("duplicate key value")) {
        setShowPopup(true);
      } else {
        setError(signUpError.message);
      }
      setLoading(false);
      return;
    }
    // Insert into profiles table
    const user = data.user;
    if (user) {
      const { error: profileError } = await supabase.from('profiles').insert([
        { id: user.id, full_name: name, username: email }
      ]);
      if (profileError) {
        if (
          profileError.message.toLowerCase().includes("duplicate key value") ||
          profileError.message.toLowerCase().includes("unique constraint")
        ) {
          setShowPopup(true);
        } else {
          setError(profileError.message);
        }
        setLoading(false);
        return;
      }
    }
  router.push("/login");
  setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-yellow-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">Sign Up for SkillSphere</h2>
        <form className="space-y-5" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>
          <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg shadow" type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white border border-red-400 rounded-lg shadow-lg p-6 max-w-sm w-full">
                <div className="text-red-600 font-semibold mb-2">User already exists</div>
                <div className="text-gray-700 mb-4">An account with this email already exists. Please log in or use a different email.</div>
                <button
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </form>
        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-pink-600 font-semibold hover:underline">Log In</a>
        </div>
      </div>
    </div>
  );
}
