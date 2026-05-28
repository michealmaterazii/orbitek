import { Wifi, Phone, Heart, ThumbsUp, Youtube, Music } from "lucide-react";

const services = [
  { title: "Instagram Followers", desc: "Real-looking followers delivered instantly. Boost your credibility.", icon: Heart },
  { title: "TikTok Views", desc: "Explode your reach and go viral with thousands of views.", icon: Music },
  { title: "Google Voice Numbers", desc: "US-based numbers for verification and business use.", icon: Phone },
  { title: "YouTube Subscribers", desc: "Grow your channel with genuine-looking subscribers.", icon: Youtube },
  { title: "Instagram Likes", desc: "Get likes on any post quickly and affordably.", icon: Heart },
  { title: "Facebook Page Likes", desc: "Build social proof for your Facebook business page.", icon: ThumbsUp },
];

export default function Home() {
  return (
    <main style={{ fontFamily: "'Orbitron', sans-serif" }} className="min-h-screen bg-[#010108] text-white overflow-hidden">

      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Rajdhani:wght@300;400;500&display=swap');`}</style>

      {/* Grid background */}
      <div className="fixed inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Glow orbs */}
      <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full z-0" style={{ background: 'radial-gradient(circle, rgba(139,0,255,0.15) 0%, transparent 70%)' }} />
      <div className="fixed bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full z-0" style={{ background: 'radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)' }} />

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid rgba(0,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(0,255,255,0.5)', boxShadow: '0 0 15px rgba(0,255,255,0.3)' }}>
              <Wifi size={14} className="text-cyan-400" />
            </div>
            <h1 className="text-xl font-black tracking-widest" style={{ color: '#fff', letterSpacing: '0.3em' }}>ORBITEK</h1>
          </div>
          <div className="flex gap-8 text-xs tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '13px' }}>
            {['Services', 'Pricing', 'Login'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">{item}</a>
            ))}
          </div>
          <a href="#" className="text-xs font-bold tracking-widest px-6 py-2.5 transition-all duration-300" style={{
            border: '1px solid rgba(0,255,255,0.5)',
            color: '#00ffff',
            boxShadow: '0 0 20px rgba(0,255,255,0.2), inset 0 0 20px rgba(0,255,255,0.05)',
            letterSpacing: '0.2em'
          }}>
            GET STARTED
          </a>
        </nav>

        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-36">
          <div className="text-xs tracking-[0.5em] mb-6" style={{ color: 'rgba(0,255,255,0.6)', fontFamily: "'Rajdhani', sans-serif" }}>
            ◈ DIGITAL SERVICES PLATFORM ◈
          </div>
          <h2 className="font-black leading-none mb-8" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.02em' }}>
            <span className="block text-white">GROW YOUR</span>
            <span className="block" style={{ WebkitTextStroke: '1px rgba(0,255,255,0.8)', color: 'transparent' }}>SOCIAL MEDIA</span>
            <span className="block text-white">PRESENCE</span>
          </h2>
          <p className="max-w-lg mb-12 leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.5)', fontSize: '16px', letterSpacing: '0.05em' }}>
            Buy Instagram followers, TikTok views, Google Voice numbers, and more — instantly delivered at affordable prices.
          </p>
          <div className="flex gap-4">
            <a href="#services" className="font-bold text-xs tracking-widest px-10 py-4 transition-all duration-300" style={{
              background: 'linear-gradient(135deg, rgba(139,0,255,0.8), rgba(0,255,255,0.8))',
              boxShadow: '0 0 40px rgba(0,255,255,0.3)',
              letterSpacing: '0.2em'
            }}>
              BROWSE SERVICES
            </a>
            <a href="#" className="font-bold text-xs tracking-widest px-10 py-4 transition-all duration-300 text-gray-400 hover:text-white" style={{
              border: '1px solid rgba(255,255,255,0.1)',
              letterSpacing: '0.2em'
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(0,255,255,0.1)' }}>
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="p-8 group cursor-pointer transition-all duration-500" style={{ background: '#010108' }}>
                  <div className="w-12 h-12 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{
                    border: '1px solid rgba(0,255,255,0.3)',
                    boxShadow: '0 0 20px rgba(0,255,255,0.1)'
                  }}>
                    <Icon size={20} className="text-cyan-400" />
                  </div>
                  <h4 className="font-bold text-sm tracking-widest mb-3" style={{ letterSpacing: '0.15em' }}>{service.title.toUpperCase()}</h4>
                  <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>{service.desc}</p>
                  <a href="#" className="text-xs tracking-widest transition-colors duration-300" style={{ color: 'rgba(0,255,255,0.6)', letterSpacing: '0.2em' }}>
                    ORDER NOW →
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-8 text-center text-xs tracking-widest" style={{ borderTop: '1px solid rgba(0,255,255,0.1)', color: 'rgba(255,255,255,0.2)', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.3em' }}>
          © 2026 ORBITEK. ALL RIGHTS RESERVED.
        </footer>
      </div>
    </main>
  );
}