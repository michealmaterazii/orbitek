"use client";
import { Wifi, Phone, Heart, ThumbsUp, Play, Music, ArrowRight, CheckCircle, Zap, Shield, Clock } from "lucide-react";

const services = [
  { title: "Instagram", desc: "Followers, likes, views, story views and more.", icon: Heart, color: "#E1306C" },
  { title: "TikTok", desc: "Views, followers, likes and live stream services.", icon: Music, color: "#00F2EA" },
  { title: "YouTube", desc: "Subscribers, views, watch hours and comments.", icon: Play, color: "#FF0000" },
  { title: "Facebook", desc: "Page likes, post likes, video views and more.", icon: ThumbsUp, color: "#1877F2" },
  { title: "Twitter / X", desc: "Followers, likes, retweets and impressions.", icon: Zap, color: "#1DA1F2" },
  { title: "Google Voice", desc: "US & UK virtual numbers for verification.", icon: Phone, color: "#00FF88" },
];

const steps = [
  { step: "01", title: "Create Account", desc: "Sign up for free in seconds. No credit card required." },
  { step: "02", title: "Add Funds", desc: "Top up your balance via MTN or Orange Mobile Money." },
  { step: "03", title: "Place Order", desc: "Choose your service, enter your link and quantity." },
  { step: "04", title: "Get Results", desc: "Your order is processed instantly and automatically." },
];

const stats = [
  { value: "500+", label: "Services" },
  { value: "24/7", label: "Support" },
  { value: "instant", label: "Delivery" },
  { value: "100%", label: "Secure" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden" style={{ fontFamily: "'Orbitron', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Rajdhani:wght@300;400;500;600&display=swap');`}</style>

      <div className="fixed inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full z-0" style={{ background: 'radial-gradient(circle, rgba(139,0,255,0.15) 0%, transparent 70%)' }} />
      <div className="fixed bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full z-0" style={{ background: 'radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)' }} />

      <div className="relative z-10">

        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid rgba(0,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(0,255,255,0.5)', boxShadow: '0 0 15px rgba(0,255,255,0.3)' }}>
              <Wifi size={14} className="text-cyan-400" />
            </div>
            <h1 className="text-xl font-black tracking-widest" style={{ letterSpacing: '0.3em' }}>ORBITEK</h1>
          </div>
          <div className="hidden md:flex gap-8 text-xs tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '13px' }}>
            {['Services', 'Pricing', 'How It Works'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="/login" className="text-xs tracking-widest px-5 py-2.5 transition-all duration-300 text-gray-400 hover:text-white hidden md:block" style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.2em' }}>
              LOGIN
            </a>
            <a href="/signup" className="text-xs font-bold tracking-widest px-6 py-2.5 transition-all duration-300" style={{
              border: '1px solid rgba(0,255,255,0.5)',
              color: '#00ffff',
              boxShadow: '0 0 20px rgba(0,255,255,0.2)',
              letterSpacing: '0.2em',
              fontFamily: "'Orbitron', sans-serif",
            }}>
              GET STARTED
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-32">
          <div className="text-xs tracking-[0.5em] mb-6" style={{ color: 'rgba(0,255,255,0.6)', fontFamily: "'Rajdhani', sans-serif" }}>
            ◈ #1 SMM PANEL IN CAMEROON ◈
          </div>
          <h2 className="font-black leading-none mb-8" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.02em' }}>
            <span className="block text-white">GROW YOUR</span>
            <span className="block" style={{ WebkitTextStroke: '1px rgba(0,255,255,0.8)', color: 'transparent' }}>SOCIAL MEDIA</span>
            <span className="block text-white">PRESENCE</span>
          </h2>
          <p className="max-w-lg mb-8 leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.5)', fontSize: '16px', letterSpacing: '0.05em' }}>
            Buy Instagram followers, TikTok views, YouTube subscribers, Google Voice numbers and more — instantly delivered at the cheapest prices.
          </p>

          <div className="flex items-center gap-8 mb-12 flex-wrap justify-center">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-black text-cyan-400" style={{ fontSize: '1.5rem', letterSpacing: '0.1em' }}>{stat.value}</p>
                <p className="text-xs tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>{stat.label.toUpperCase()}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap justify-center">
            <a href="/signup" className="font-bold text-xs tracking-widest px-10 py-4 transition-all duration-300 flex items-center gap-2" style={{
              background: 'linear-gradient(135deg, rgba(139,0,255,0.8), rgba(0,255,255,0.8))',
              boxShadow: '0 0 40px rgba(0,255,255,0.3)',
              letterSpacing: '0.2em',
              fontFamily: "'Orbitron', sans-serif",
            }}>
              START NOW <ArrowRight size={14} />
            </a>
            <a href="#how-it-works" className="font-bold text-xs tracking-widest px-10 py-4 transition-all duration-300 text-gray-400 hover:text-white" style={{
              border: '1px solid rgba(255,255,255,0.1)',
              letterSpacing: '0.2em',
              fontFamily: "'Orbitron', sans-serif",
            }}>
              HOW IT WORKS
            </a>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="px-8 py-20 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.5em] mb-4" style={{ color: 'rgba(0,255,255,0.6)', fontFamily: "'Rajdhani', sans-serif" }}>◈ WHAT WE OFFER ◈</div>
            <h3 className="text-3xl font-black tracking-widest">OUR SERVICES</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(0,255,255,0.08)' }}>
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="p-8 group cursor-pointer transition-all duration-500" style={{ background: '#010108' }}>
                  <div className="w-12 h-12 flex items-center justify-center mb-6" style={{
                    border: `1px solid ${service.color}40`,
                    boxShadow: `0 0 20px ${service.color}20`,
                    background: `${service.color}10`
                  }}>
                    <Icon size={20} style={{ color: service.color }} />
                  </div>
                  <h4 className="font-bold text-sm tracking-widest mb-3" style={{ letterSpacing: '0.15em' }}>{service.title.toUpperCase()}</h4>
                  <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>{service.desc}</p>
                  <a href="/signup" className="text-xs tracking-widest flex items-center gap-2 transition-colors duration-300 hover:text-cyan-400" style={{ color: 'rgba(0,255,255,0.5)', letterSpacing: '0.2em', fontFamily: "'Orbitron', sans-serif" }}>
                    ORDER NOW <ArrowRight size={12} />
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="px-8 py-20 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.5em] mb-4" style={{ color: 'rgba(0,255,255,0.6)', fontFamily: "'Rajdhani', sans-serif" }}>◈ SIMPLE PROCESS ◈</div>
            <h3 className="text-3xl font-black tracking-widest">HOW IT WORKS</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative p-6" style={{ border: '1px solid rgba(0,255,255,0.08)', background: 'rgba(0,255,255,0.02)' }}>
                <div className="font-black mb-4" style={{ fontSize: '2.5rem', color: 'rgba(0,255,255,0.1)', letterSpacing: '-0.02em' }}>{step.step}</div>
                <h4 className="font-bold text-sm tracking-widest mb-3" style={{ letterSpacing: '0.1em' }}>{step.title.toUpperCase()}</h4>
                <p className="text-xs leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight size={16} style={{ color: 'rgba(0,255,255,0.3)' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Why choose us */}
        <section className="px-8 py-20 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.5em] mb-4" style={{ color: 'rgba(0,255,255,0.6)', fontFamily: "'Rajdhani', sans-serif" }}>◈ WHY ORBITEK ◈</div>
            <h3 className="text-3xl font-black tracking-widest">WHY CHOOSE US</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Instant Delivery", desc: "Orders are processed automatically within minutes of payment." },
              { icon: Shield, title: "100% Secure", desc: "Your account and payment details are always safe with us." },
              { icon: Clock, title: "24/7 Support", desc: "Our team is available around the clock to help you." },
              { icon: CheckCircle, title: "Best Prices", desc: "We offer the most competitive prices in Cameroon." },
              { icon: Phone, title: "Mobile Money", desc: "Pay easily with MTN or Orange Mobile Money." },
              { icon: Wifi, title: "Auto Fulfillment", desc: "Orders are fulfilled automatically — no manual processing." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-6 flex gap-4" style={{ border: '1px solid rgba(0,255,255,0.06)', background: 'rgba(0,255,255,0.01)' }}>
                  <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.05)' }}>
                    <Icon size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs tracking-widest mb-2" style={{ letterSpacing: '0.1em' }}>{item.title.toUpperCase()}</h4>
                    <p className="text-xs leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)' }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 py-24 text-center">
          <div className="max-w-2xl mx-auto p-12" style={{ border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,255,255,0.02)' }}>
            <div className="text-xs tracking-[0.5em] mb-6" style={{ color: 'rgba(0,255,255,0.6)', fontFamily: "'Rajdhani', sans-serif" }}>◈ GET STARTED TODAY ◈</div>
            <h3 className="font-black mb-4" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', letterSpacing: '0.05em' }}>READY TO GROW?</h3>
            <p className="mb-8 leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>
              Join thousands of creators and businesses growing their social media with Orbitek.
            </p>
            <a href="/signup" className="inline-flex items-center gap-2 font-bold text-xs tracking-widest px-12 py-4 transition-all duration-300 hover:opacity-90" style={{
              background: 'linear-gradient(135deg, rgba(139,0,255,0.8), rgba(0,255,255,0.8))',
              boxShadow: '0 0 40px rgba(0,255,255,0.3)',
              letterSpacing: '0.2em',
              fontFamily: "'Orbitron', sans-serif",
            }}>
              CREATE FREE ACCOUNT <ArrowRight size={14} />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-8 text-center text-xs tracking-widest" style={{ borderTop: '1px solid rgba(0,255,255,0.08)', color: 'rgba(255,255,255,0.2)', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.3em' }}>
          © 2026 ORBITEK. ALL RIGHTS RESERVED. · <a href="/login" className="hover:text-cyan-400 transition-colors">LOGIN</a> · <a href="/signup" className="hover:text-cyan-400 transition-colors">SIGN UP</a>
        </footer>

      </div>
    </main>
  );
}