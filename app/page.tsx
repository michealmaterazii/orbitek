"use client";
import { useState } from "react";
import { Wifi, Phone, Heart, ThumbsUp, Play, Music, ArrowRight, CheckCircle, Zap, Shield, Clock, Menu, X } from "lucide-react";

const services = [
  { title: "Instagram", desc: "Followers, likes, views, story views and more.", icon: Heart, color: "#E1306C" },
  { title: "TikTok", desc: "Views, followers, likes and live stream services.", icon: Music, color: "#00F2EA" },
  { title: "YouTube", desc: "Subscribers, views, watch hours and comments.", icon: Play, color: "#FF0000" },
  { title: "Facebook", desc: "Page likes, post likes, video views and more.", icon: ThumbsUp, color: "#1877F2" },
  { title: "Twitter / X", desc: "Followers, likes, retweets and impressions.", icon: Zap, color: "#1DA1F2" },
  { title: "Google Voice", desc: "US & UK virtual numbers for verification.", icon: Phone, color: "#00FF88" },
];

const steps = [
  { step: "01", title: "Create Account", desc: "Sign up for free in seconds." },
  { step: "02", title: "Add Funds", desc: "Top up via MTN or Orange Money." },
  { step: "03", title: "Place Order", desc: "Choose service and enter your link." },
  { step: "04", title: "Get Results", desc: "Delivered instantly and automatically." },
];

const stats = [
  { value: "500+", label: "Services" },
  { value: "24/7", label: "Support" },
  { value: "Instant", label: "Delivery" },
  { value: "100%", label: "Secure" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden" style={{ fontFamily: "'Orbitron', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Rajdhani:wght@300;400;500;600&display=swap');`}</style>

      {/* Background */}
      <div className="fixed inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full z-0" style={{ background: 'radial-gradient(circle, rgba(139,0,255,0.15) 0%, transparent 70%)' }} />
      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full z-0" style={{ background: 'radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)' }} />

      <div className="relative z-10">

        {/* Navbar */}
        <nav className="flex items-center justify-between px-5 md:px-8 py-4" style={{ borderBottom: '1px solid rgba(0,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(0,255,255,0.5)', boxShadow: '0 0 15px rgba(0,255,255,0.3)' }}>
              <Wifi size={12} className="text-cyan-400" />
            </div>
            <h1 className="text-base font-black tracking-widest" style={{ letterSpacing: '0.25em' }}>ORBITEK</h1>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-8 text-xs" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            {['Services', 'How It Works'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-cyan-400 transition-colors">{item}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="/login" className="text-xs px-4 py-2 text-gray-400 hover:text-white transition-colors" style={{ fontFamily: "'Rajdhani', sans-serif" }}>LOGIN</a>
            <a href="/signup" className="text-xs font-bold px-5 py-2 transition-all" style={{ border: '1px solid rgba(0,255,255,0.5)', color: '#00ffff', fontFamily: "'Orbitron', sans-serif", fontSize: '10px', letterSpacing: '0.15em' }}>GET STARTED</a>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-400 hover:text-cyan-400">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-5 py-4 space-y-3" style={{ background: 'rgba(2,2,15,0.98)', borderBottom: '1px solid rgba(0,255,255,0.08)' }}>
            <a href="#services" onClick={() => setMenuOpen(false)} className="block text-xs tracking-widest py-2 text-gray-400 hover:text-cyan-400" style={{ fontFamily: "'Rajdhani', sans-serif" }}>SERVICES</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="block text-xs tracking-widest py-2 text-gray-400 hover:text-cyan-400" style={{ fontFamily: "'Rajdhani', sans-serif" }}>HOW IT WORKS</a>
            <a href="/login" className="block text-xs tracking-widest py-2 text-gray-400 hover:text-cyan-400" style={{ fontFamily: "'Rajdhani', sans-serif" }}>LOGIN</a>
            <a href="/signup" className="block text-xs font-bold tracking-widest py-3 text-center transition-all" style={{ background: 'linear-gradient(135deg, rgba(139,0,255,0.8), rgba(0,255,255,0.8))', fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.15em' }}>GET STARTED</a>
          </div>
        )}

        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center px-5 md:px-6 py-16 md:py-32">
          <div className="text-xs tracking-[0.4em] mb-5" style={{ color: 'rgba(0,255,255,0.6)', fontFamily: "'Rajdhani', sans-serif" }}>
            ◈ #1 SMM PANEL IN CAMEROON ◈
          </div>
          <h2 className="font-black leading-none mb-6" style={{ fontSize: 'clamp(2.2rem, 10vw, 7rem)', letterSpacing: '-0.02em' }}>
            <span className="block text-white">GROW YOUR</span>
            <span className="block" style={{ WebkitTextStroke: '1px rgba(0,255,255,0.8)', color: 'transparent' }}>SOCIAL MEDIA</span>
            <span className="block text-white">PRESENCE</span>
          </h2>
          <p className="max-w-lg mb-8 leading-relaxed px-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.5)', fontSize: '15px', letterSpacing: '0.05em' }}>
            Buy Instagram followers, TikTok views, YouTube subscribers and more — instantly delivered at the cheapest prices.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 md:gap-8 mb-10 w-full max-w-sm md:max-w-lg">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-black text-cyan-400" style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', letterSpacing: '0.05em' }}>{stat.value}</p>
                <p className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)', fontSize: '10px', letterSpacing: '0.1em' }}>{stat.label.toUpperCase()}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none justify-center">
            <a href="/signup" className="font-bold text-xs tracking-widest px-8 py-4 transition-all flex items-center justify-center gap-2" style={{
              background: 'linear-gradient(135deg, rgba(139,0,255,0.8), rgba(0,255,255,0.8))',
              boxShadow: '0 0 30px rgba(0,255,255,0.3)',
              letterSpacing: '0.15em',
              fontFamily: "'Orbitron', sans-serif",
            }}>
              START NOW <ArrowRight size={14} />
            </a>
            <a href="#how-it-works" className="font-bold text-xs tracking-widest px-8 py-4 transition-all text-center text-gray-400 hover:text-white" style={{
              border: '1px solid rgba(255,255,255,0.1)',
              letterSpacing: '0.15em',
              fontFamily: "'Orbitron', sans-serif",
            }}>
              HOW IT WORKS
            </a>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="px-5 md:px-8 py-16 md:py-20 max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <div className="text-xs tracking-[0.4em] mb-3" style={{ color: 'rgba(0,255,255,0.6)', fontFamily: "'Rajdhani', sans-serif" }}>◈ WHAT WE OFFER ◈</div>
            <h3 className="text-2xl md:text-3xl font-black tracking-widest">OUR SERVICES</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px" style={{ background: 'rgba(0,255,255,0.08)' }}>
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="p-6 md:p-8 transition-all duration-500" style={{ background: '#010108' }}>
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-5" style={{
                    border: `1px solid ${service.color}40`,
                    boxShadow: `0 0 20px ${service.color}20`,
                    background: `${service.color}10`
                  }}>
                    <Icon size={18} style={{ color: service.color }} />
                  </div>
                  <h4 className="font-bold text-xs tracking-widest mb-2" style={{ letterSpacing: '0.15em' }}>{service.title.toUpperCase()}</h4>
                  <p className="text-sm leading-relaxed mb-5" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)' }}>{service.desc}</p>
                  <a href="/signup" className="text-xs tracking-widest flex items-center gap-2 hover:text-cyan-400 transition-colors" style={{ color: 'rgba(0,255,255,0.5)', fontFamily: "'Orbitron', sans-serif", fontSize: '10px', letterSpacing: '0.15em' }}>
                    ORDER NOW <ArrowRight size={11} />
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="px-5 md:px-8 py-16 md:py-20 max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <div className="text-xs tracking-[0.4em] mb-3" style={{ color: 'rgba(0,255,255,0.6)', fontFamily: "'Rajdhani', sans-serif" }}>◈ SIMPLE PROCESS ◈</div>
            <h3 className="text-2xl md:text-3xl font-black tracking-widest">HOW IT WORKS</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {steps.map((step, i) => (
              <div key={i} className="p-5 md:p-6" style={{ border: '1px solid rgba(0,255,255,0.08)', background: 'rgba(0,255,255,0.02)' }}>
                <div className="font-black mb-3" style={{ fontSize: '2rem', color: 'rgba(0,255,255,0.1)' }}>{step.step}</div>
                <h4 className="font-bold text-xs tracking-widest mb-2" style={{ letterSpacing: '0.1em', fontSize: '10px' }}>{step.title.toUpperCase()}</h4>
                <p className="text-xs leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why choose us */}
        <section className="px-5 md:px-8 py-16 md:py-20 max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <div className="text-xs tracking-[0.4em] mb-3" style={{ color: 'rgba(0,255,255,0.6)', fontFamily: "'Rajdhani', sans-serif" }}>◈ WHY ORBITEK ◈</div>
            <h3 className="text-2xl md:text-3xl font-black tracking-widest">WHY CHOOSE US</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: Zap, title: "Instant Delivery", desc: "Orders processed automatically within minutes." },
              { icon: Shield, title: "100% Secure", desc: "Your account and payments are always safe." },
              { icon: Clock, title: "24/7 Support", desc: "Our team is available around the clock." },
              { icon: CheckCircle, title: "Best Prices", desc: "Most competitive prices in Cameroon." },
              { icon: Phone, title: "Mobile Money", desc: "Pay with MTN or Orange Mobile Money." },
              { icon: Wifi, title: "Auto Fulfillment", desc: "Orders fulfilled automatically, no delays." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-5 flex gap-3" style={{ border: '1px solid rgba(0,255,255,0.06)', background: 'rgba(0,255,255,0.01)' }}>
                  <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.05)' }}>
                    <Icon size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-bold tracking-widest mb-1" style={{ letterSpacing: '0.1em', fontSize: '10px' }}>{item.title.toUpperCase()}</h4>
                    <p className="text-xs leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)' }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 md:px-8 py-16 md:py-24 text-center">
          <div className="max-w-2xl mx-auto p-8 md:p-12" style={{ border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,255,255,0.02)' }}>
            <div className="text-xs tracking-[0.4em] mb-5" style={{ color: 'rgba(0,255,255,0.6)', fontFamily: "'Rajdhani', sans-serif" }}>◈ GET STARTED TODAY ◈</div>
            <h3 className="font-black mb-4" style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)', letterSpacing: '0.05em' }}>READY TO GROW?</h3>
            <p className="mb-8 leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>
              Join thousands of creators and businesses growing their social media with Orbitek.
            </p>
            <a href="/signup" className="inline-flex items-center gap-2 font-bold text-xs tracking-widest px-8 md:px-12 py-4 transition-all hover:opacity-90" style={{
              background: 'linear-gradient(135deg, rgba(139,0,255,0.8), rgba(0,255,255,0.8))',
              boxShadow: '0 0 40px rgba(0,255,255,0.3)',
              letterSpacing: '0.15em',
              fontFamily: "'Orbitron', sans-serif",
            }}>
              CREATE FREE ACCOUNT <ArrowRight size={14} />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-5 md:px-8 py-6 text-center text-xs" style={{ borderTop: '1px solid rgba(0,255,255,0.08)', color: 'rgba(255,255,255,0.2)', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.2em' }}>
          <p className="mb-2">© 2026 ORBITEK. ALL RIGHTS RESERVED.</p>
          <div className="flex justify-center gap-6">
            <a href="/login" className="hover:text-cyan-400 transition-colors">LOGIN</a>
            <a href="/signup" className="hover:text-cyan-400 transition-colors">SIGN UP</a>
          </div>
        </footer>

      </div>
    </main>
  );
}