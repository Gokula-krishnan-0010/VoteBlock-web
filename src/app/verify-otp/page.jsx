'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, ArrowRight, Loader } from 'lucide-react';

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const email = searchParams.get('email');

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input on mount
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert('Please enter the OTP');
      return;
    }

    if (!userId) {
      alert('Invalid session. Please login again.');
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await res.json();

      if (data.success) {
        // alert('OTP verified! Redirecting...');
        router.push('/voter/profile');
      } else {
        alert("Invalid OTP"); // Simple feedback for now
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Try again.');
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
        <div className="border border-white/10 bg-[#12122a]/80 backdrop-blur-xl shadow-2xl shadow-violet-500/5 rounded-2xl text-center" style={{ marginTop: "10px", padding: "15px" }}>

          <div style={{ marginTop: "10px" }}>
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500/20 to-violet-600/20 rounded-full flex items-center justify-center mx-auto border border-violet-500/30 shadow-lg shadow-violet-500/20">
              <ShieldCheck className="w-8 h-8 text-violet-400" />
            </div>
          </div>

          <div className="space-y-2" style={{ marginTop: "10px" }}>
            <h2 className="text-2xl font-bold text-white">Verify Authentication</h2>
            <p className="text-slate-400 text-sm" style={{ marginTop: "5px" }}>
              Enter the 6-digit code sent to
            </p>
            <p className="text-sm" style={{ marginTop: "5px" }}>
              <span className="text-blue-300 font-mono bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/30">
                {email}
              </span>
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="px-6 md:px-8" style={{ marginTop: "10px" }}>
            <div>
              <input
                ref={inputRef}
                type="text"
                placeholder="• • • • • •"
                maxLength={6}
                value={otp}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setOtp(val);
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl h-14 text-center text-2xl tracking-[0.55em] text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 focus:ring-1 focus:ring-violet-500/20 transition-all font-mono"
              />
            </div>

            <button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ marginTop: "10px", paddingTop: "10px", paddingBottom: "10px" }}
            >
              {loading ? (
                <span className="flex items-center gap-2"><Loader className="w-4 h-4 animate-spin" /> Verifying...</span>
              ) : (
                <>
                  <span>Verify Identity</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: "10px", marginBottom: "5px" }}>
            <button
              onClick={() => router.push('/login')}
              className="text-xs text-slate-500 hover:text-violet-400 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
