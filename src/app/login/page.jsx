'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Vote, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Note: useAuth might be undefined if not wrapped in provider, 
  // but let's assume it works or fail gracefully if not.
  // Ideally this component should be wrapped in AuthProvider
  const auth = useAuth() || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Request OTP
        await fetch('/api/auth/request-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: data.userId, email }),
        });
        router.push(`/verify-otp?userId=${data.userId}&email=${email}`);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a] p-4 relative overflow-hidden">
      {/* Subtle neon gradient orbs in background */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Vote className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">VoteBlock</h1>
          </div>
          <p className="text-slate-400 font-medium tracking-wide" style={{ marginTop: "10px" }}>Decentralized Voting Platform</p>
        </div>

        <Card className="border border-white/10 bg-[#12122a]/80 backdrop-blur-xl shadow-2xl shadow-violet-500/5" style={{ marginTop: "10px", padding: "15px" }}>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-white" style={{ marginTop: "10px" }}>Welcome Back</CardTitle>
            <CardDescription className="text-slate-400" style={{ marginTop: "5px" }}>Sign in to access your voting dashboard</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 font-semibold">Email</Label>
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400/60 pointer-events-none" style={{ justifyContent: "center" }} />
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/10 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2" style={{ marginTop: "10px" }}>
                <Label htmlFor="password" className="text-slate-300 font-semibold">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-violet-400/60 pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-violet-500/50 focus:bg-white/10 focus:ring-violet-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium border border-red-500/20 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-violet-500/40"
                size="lg"
                disabled={loading}
                onClick={handleSubmit}
                style={{ marginTop: "10px" }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
