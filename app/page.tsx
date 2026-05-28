export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-widest text-white">ORBITEK</h1>
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#services" className="hover:text-white transition">Services</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#" className="hover:text-white transition">Login</a>
        </div>
        <a href="#" className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-gray-200 transition">
          Get Started
        </a>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <span className="text-xs uppercase tracking-widest text-gray-500 mb-4">Digital Services Platform</span>
        <h2 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Grow Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Social Media</span><br />Presence
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mb-10">
          Buy Instagram followers, TikTok views, Google Voice numbers, and more — instantly delivered, affordable prices.
        </p>
        <div className="flex gap-4">
          <a href="#services" className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition">
            Browse Services
          </a>
          <a href="#" className="border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white/10 transition">
            How it works
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-8 py-20 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Instagram Followers", desc: "Real-looking followers delivered fast. Boost your credibility instantly.", icon: "📸" },
            { title: "TikTok Views", desc: "Increase your video reach and go viral with thousands of views.", icon: "🎵" },
            { title: "Google Voice Numbers", desc: "US-based Google Voice numbers for verification and business use.", icon: "📞" },
            { title: "YouTube Subscribers", desc: "Grow your channel with genuine-looking subscribers.", icon: "▶️" },
            { title: "Instagram Likes", desc: "Get likes on any post quickly and affordably.", icon: "❤️" },
            { title: "Facebook Page Likes", desc: "Build social proof for your Facebook business page.", icon: "👍" },
          ].map((service, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
              <p className="text-gray-400 text-sm">{service.desc}</p>
              <a href="#" className="mt-4 inline-block text-sm text-purple-400 hover:text-purple-300 transition">
                Order now →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-8 py-8 text-center text-gray-500 text-sm">
        © 2026 Orbitek. All rights reserved.
      </footer>
    </main>
  )
}