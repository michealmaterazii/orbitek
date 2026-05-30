"use client";
import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Wifi } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    });
    if (error) setError(error.message);
    else setMessage("Account created! Check your email to confirm.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#010108] text-white flex items-center justify-center px-4 py-8">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Rajdhani:wght@300;400;500&display=swap');`}</style>

      <div className="fixed inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full z-0" style={{ background: 'radial-gradient(circle, rgba(139,0,255,0.15) 0%, transparent 70%)' }} />
      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full z-0" style={{ background: 'radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(0,255,255,0.5)', boxShadow: '0 0 15px rgba(0,255,255,0.3)' }}>
              <Wifi size={14} className="text-cyan-400" />
            </div>
            <span className="text-lg font-black tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.3em' }}>ORBITEK</span>
          </a>
          <p className="mt-3 text-xs tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.6)' }}>◈ CREATE YOUR ACCOUNT ◈</p>
        </div>

        <div className="p-6 md:p-8" style={{ border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)' }}>
          <div className="space-y-4">

            {error && (
              <div className="px-4 py-3 text-xs text-red-400 tracking-wider" style={{ border: '1px solid rgba(255,0,0,0.2)', background: 'rgba(255,0,0,0.05)', fontFamily: "'Rajdhani', sans-serif" }}>
                {error}
              </div>
            )}
            {message && (
              <div className="px-4 py-3 text-xs text-cyan-400 tracking-wider" style={{ border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.05)', fontFamily: "'Rajdhani', sans-serif" }}>
                {message}
              </div>
            )}

            <div>
              <label className="block text-xs tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>USERNAME</label>
              <div className="flex items-center gap-3 px-4 py-3" style={{ border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.02)' }}>
                <User size={14} className="text-cyan-400 shrink-0" />
                <input type="text" placeholder="your_username" value={username} onChange={e => setUsername(e.target.value)}
                  className="bg-transparent w-full text-sm outline-none text-white placeholder-gray-600"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }} />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>EMAIL</label>
              <div className="flex items-center gap-3 px-4 py-3" style={{ border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.02)' }}>
                <Mail size={14} className="text-cyan-400 shrink-0" />
                <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
                  className="bg-transparent w-full text-sm outline-none text-white placeholder-gray-600"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }} />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>PASSWORD</label>
              <div className="flex items-center gap-3 px-4 py-3" style={{ border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.02)' }}>
                <Lock size={14} className="text-cyan-400 shrink-0" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                  className="bg-transparent w-full text-sm outline-none text-white placeholder-gray-600"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }} />
                <button onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-cyan-400 transition-colors shrink-0">
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button onClick={handleSignup} disabled={loading}
              className="w-full py-4 font-black text-xs tracking-widest transition-all hover:opacity-90 disabled:opacity-50 mt-2"
              style={{ fontFamily: "'Orbitron', sans-serif", background: 'linear-gradient(135deg, rgba(139,0,255,0.8), rgba(0,255,255,0.8))', boxShadow: '0 0 30px rgba(0,255,255,0.2)', letterSpacing: '0.2em' }}>
              {loading ? "CREATING..." : "CREATE ACCOUNT"}
            </button>

            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
              <span className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>ALREADY HAVE AN ACCOUNT?</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
            </div>

            <a href="/login" className="block w-full py-4 text-center font-black text-xs tracking-widest transition-all hover:border-cyan-400 hover:text-cyan-400"
              style={{ fontFamily: "'Orbitron', sans-serif", border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>
              LOGIN
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}