"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  PlusCircle, List, RefreshCw, DollarSign,
  Ticket, LayoutGrid, LogOut, Menu, X,
  Camera, Music, Play, ThumbsUp,
  AtSign, Phone, Send, Wifi, ChevronRight
} from "lucide-react";

const services = [
  {
    name: "Instagram", icon: Camera, color: "#E1306C", glow: "rgba(225,48,108,0.3)",
    items: [
      { id: 1, name: "Instagram Followers", min: 100, max: 10000, price: 0.99 },
      { id: 2, name: "Instagram Likes", min: 50, max: 5000, price: 0.49 },
      { id: 3, name: "Instagram Views", min: 100, max: 50000, price: 0.29 },
      { id: 4, name: "Instagram Story Views", min: 100, max: 10000, price: 0.39 },
    ]
  },
  {
    name: "TikTok", icon: Music, color: "#00F2EA", glow: "rgba(0,242,234,0.3)",
    items: [
      { id: 5, name: "TikTok Followers", min: 100, max: 10000, price: 1.29 },
      { id: 6, name: "TikTok Views", min: 500, max: 100000, price: 0.19 },
      { id: 7, name: "TikTok Likes", min: 100, max: 10000, price: 0.59 },
    ]
  },
  {
    name: "YouTube", icon: Play, color: "#FF0000", glow: "rgba(255,0,0,0.3)",
    items: [
      { id: 8, name: "YouTube Subscribers", min: 100, max: 5000, price: 1.99 },
      { id: 9, name: "YouTube Views", min: 500, max: 100000, price: 0.39 },
      { id: 10, name: "YouTube Likes", min: 100, max: 5000, price: 0.69 },
      { id: 11, name: "YouTube Watch Hours", min: 10, max: 500, price: 4.99 },
    ]
  },
  {
    name: "Facebook", icon: ThumbsUp, color: "#1877F2", glow: "rgba(24,119,242,0.3)",
    items: [
      { id: 12, name: "Facebook Page Likes", min: 100, max: 10000, price: 0.89 },
      { id: 13, name: "Facebook Post Likes", min: 50, max: 5000, price: 0.49 },
      { id: 14, name: "Facebook Video Views", min: 500, max: 50000, price: 0.29 },
    ]
  },
  {
    name: "Twitter / X", icon: AtSign, color: "#1DA1F2", glow: "rgba(29,161,242,0.3)",
    items: [
      { id: 15, name: "Twitter Followers", min: 100, max: 10000, price: 1.09 },
      { id: 16, name: "Twitter Likes", min: 50, max: 5000, price: 0.49 },
      { id: 17, name: "Twitter Retweets", min: 50, max: 2000, price: 0.79 },
    ]
  },
  {
    name: "Telegram", icon: Send, color: "#2AABEE", glow: "rgba(42,171,238,0.3)",
    items: [
      { id: 18, name: "Telegram Members", min: 100, max: 10000, price: 0.99 },
      { id: 19, name: "Telegram Views", min: 500, max: 50000, price: 0.19 },
    ]
  },
  {
    name: "Google Voice", icon: Phone, color: "#00FF88", glow: "rgba(0,255,136,0.3)",
    items: [
      { id: 20, name: "Google Voice Number (US)", min: 1, max: 10, price: 2.99 },
      { id: 21, name: "Google Voice Number (UK)", min: 1, max: 10, price: 3.99 },
    ]
  },
  {
    name: "Spotify", icon: Music, color: "#1DB954", glow: "rgba(29,185,84,0.3)",
    items: [
      { id: 22, name: "Spotify Followers", min: 100, max: 5000, price: 1.49 },
      { id: 23, name: "Spotify Plays", min: 1000, max: 100000, price: 0.19 },
      { id: 24, name: "Spotify Monthly Listeners", min: 100, max: 5000, price: 1.99 },
    ]
  },
];

const navItems = [
  { label: "New Order", icon: PlusCircle },
  { label: "My Orders", icon: List },
  { label: "Refill", icon: RefreshCw },
  { label: "Add Funds", icon: DollarSign },
  { label: "Tickets", icon: Ticket },
  { label: "Services", icon: LayoutGrid },
];

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("New Order");
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [orderLink, setOrderLink] = useState("");
  const [orderQty, setOrderQty] = useState(100);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = "/login";
      else setUser(data.user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (!user) return (
    <div className="min-h-screen bg-[#010108] flex items-center justify-center">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Rajdhani:wght@300;400;500;600&display=swap');`}</style>
      <div style={{ fontFamily: "'Orbitron', sans-serif", color: '#00ffff', fontSize: '12px', letterSpacing: '0.3em' }}>INITIALIZING...</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#010108] text-white flex">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Rajdhani:wght@300;400;500;600&display=swap');`}</style>

      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(0,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} md:w-64 md:relative`}
        style={{ background: 'rgba(2,2,15,0.95)', borderRight: '1px solid rgba(0,255,255,0.08)', backdropFilter: 'blur(20px)' }}>

        <div className="flex items-center gap-3 px-4 py-6" style={{ borderBottom: '1px solid rgba(0,255,255,0.08)' }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ border: '1px solid rgba(0,255,255,0.5)', boxShadow: '0 0 20px rgba(0,255,255,0.2)' }}>
            <Wifi size={15} className="text-cyan-400" />
          </div>
          <span className={`font-black tracking-widest ${sidebarOpen ? 'block' : 'hidden'} md:block`} style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '13px', letterSpacing: '0.25em' }}>ORBITEK</span>
        </div>

        <nav className="flex-1 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.label;
            return (
              <button key={item.label} onClick={() => { setActive(item.label); setSidebarOpen(false); setSelectedNetwork(null); setSelectedService(null); }}
                className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 relative"
                style={{
                  background: isActive ? 'linear-gradient(90deg, rgba(0,255,255,0.08), transparent)' : 'transparent',
                  borderLeft: isActive ? '2px solid #00ffff' : '2px solid transparent',
                }}>
                <Icon size={17} className="shrink-0" style={{ color: isActive ? '#00ffff' : 'rgba(255,255,255,0.3)' }} />
                <span className={`text-xs font-semibold tracking-widest ${sidebarOpen ? 'block' : 'hidden'} md:block`}
                  style={{ fontFamily: "'Orbitron', sans-serif", color: isActive ? '#00ffff' : 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>
                  {item.label.toUpperCase()}
                </span>
                {isActive && <ChevronRight size={12} className="ml-auto hidden md:block" style={{ color: '#00ffff' }} />}
              </button>
            );
          })}
        </nav>

        <button onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-5 transition-all duration-300 hover:bg-red-500/5 group"
          style={{ borderTop: '1px solid rgba(0,255,255,0.06)' }}>
          <LogOut size={17} className="shrink-0 text-red-500/40 group-hover:text-red-400 transition-colors" />
          <span className={`text-xs tracking-widest font-semibold ${sidebarOpen ? 'block' : 'hidden'} md:block text-red-500/40 group-hover:text-red-400 transition-colors`}
            style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.15em' }}>LOGOUT</span>
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        <header className="flex items-center justify-between px-6 py-4 sticky top-0 z-40"
          style={{ background: 'rgba(1,1,8,0.9)', borderBottom: '1px solid rgba(0,255,255,0.06)', backdropFilter: 'blur(20px)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-500 hover:text-cyan-400 transition-colors">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-6" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            <div className="text-xs tracking-widest">
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>OPERATOR </span>
              <span style={{ color: '#00ffff' }}>{user.user_metadata?.username || user.email?.split('@')[0]}</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-xs tracking-widest">
              <div className="px-3 py-1" style={{ border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,255,255,0.03)' }}>
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>ORDERS </span>
                <span className="text-white font-bold">0</span>
              </div>
              <div className="px-3 py-1" style={{ border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,255,255,0.03)' }}>
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>BALANCE </span>
                <span className="text-white font-bold">$0.00</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs hidden md:block" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.2em' }}>ONLINE</span>
          </div>
        </header>

        <div className="flex-1 p-6">

          {/* NEW ORDER FLOW */}
          {active === "New Order" && (
            <div>
              {!selectedNetwork ? (
                <div>
                  <div className="mb-10">
                    <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.4em' }}>◈ SELECT PLATFORM ◈</p>
                    <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em' }}>NEW ORDER</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {services.map((service) => {
                      const Icon = service.icon;
                      return (
                        <button key={service.name} onClick={() => setSelectedNetwork(service)}
                          className="flex flex-col items-center justify-center py-10 gap-4 transition-all duration-300 relative group"
                          style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.border = `1px solid ${service.color}40`; (e.currentTarget as HTMLElement).style.background = `${service.color}08`; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}>
                          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ border: `1px solid ${service.color}40`, background: `${service.color}10`, boxShadow: `0 0 20px ${service.glow}` }}>
                            <Icon size={24} style={{ color: service.color }} />
                          </div>
                          <p className="text-xs font-bold tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,255,255,0.7)', fontSize: '10px' }}>{service.name.toUpperCase()}</p>
                          <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : !selectedService ? (
                <div>
                  <div className="mb-10">
                    <button onClick={() => setSelectedNetwork(null)} className="text-xs mb-4 flex items-center gap-2 hover:text-cyan-400 transition-colors"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>← BACK</button>
                    <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.4em' }}>◈ SELECT SERVICE ◈</p>
                    <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em' }}>{selectedNetwork.name.toUpperCase()}</h2>
                  </div>
                  <div className="space-y-2 max-w-2xl">
                    {selectedNetwork.items.map((item: any) => (
                      <button key={item.id} onClick={() => { setSelectedService(item); setOrderQty(item.min); setOrderPlaced(false); }}
                        className="w-full flex items-center justify-between px-6 py-5 transition-all duration-300"
                        style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.border = `1px solid ${selectedNetwork.color}40`; (e.currentTarget as HTMLElement).style.background = `${selectedNetwork.color}05`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}>
                        <div className="text-left">
                          <p className="text-xs font-bold tracking-wider mb-1" style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,255,255,0.8)' }}>{item.name.toUpperCase()}</p>
                          <p className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>MIN {item.min} — MAX {item.max.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", color: selectedNetwork.color, fontSize: '14px' }}>${item.price}</p>
                          <p className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.2)' }}>PER 1000</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-10">
                    <button onClick={() => setSelectedService(null)} className="text-xs mb-4 flex items-center gap-2 hover:text-cyan-400 transition-colors"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>← BACK</button>
                    <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.4em' }}>◈ PLACE ORDER ◈</p>
                    <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1rem, 2vw, 1.5rem)', letterSpacing: '0.1em' }}>{selectedService.name.toUpperCase()}</h2>
                  </div>

                  {orderPlaced ? (
                    <div className="max-w-md p-8 text-center" style={{ border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.03)' }}>
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ border: '1px solid rgba(0,255,255,0.3)', boxShadow: '0 0 30px rgba(0,255,255,0.2)' }}>
                        <span style={{ color: '#00ffff', fontSize: '24px' }}>✓</span>
                      </div>
                      <p className="font-black mb-2" style={{ fontFamily: "'Orbitron', sans-serif", color: '#00ffff', fontSize: '14px', letterSpacing: '0.2em' }}>ORDER PLACED</p>
                      <p className="text-xs mb-6" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>Your order is being processed.</p>
                      <button onClick={() => { setSelectedNetwork(null); setSelectedService(null); setActive("My Orders"); }}
                        className="px-8 py-3 text-xs font-black tracking-widest transition-all hover:opacity-80"
                        style={{ fontFamily: "'Orbitron', sans-serif", background: 'linear-gradient(135deg, rgba(139,0,255,0.8), rgba(0,255,255,0.8))', letterSpacing: '0.2em' }}>
                        VIEW ORDERS
                      </button>
                    </div>
                  ) : (
                    <div className="max-w-md space-y-4">
                      <div className="p-5" style={{ border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,255,255,0.02)' }}>
                        <div className="flex justify-between mb-3">
                          <span className="text-xs tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)' }}>PRICE PER 1000</span>
                          <span className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", color: selectedNetwork.color, fontSize: '14px' }}>${selectedService.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)' }}>TOTAL COST</span>
                          <span className="font-black text-white" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '14px' }}>${((orderQty / 1000) * selectedService.price).toFixed(2)}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>LINK / USERNAME</label>
                        <input type="text" placeholder="https://..." value={orderLink} onChange={e => setOrderLink(e.target.value)}
                          className="w-full bg-transparent text-sm outline-none text-white placeholder-gray-700 px-4 py-3"
                          style={{ border: '1px solid rgba(0,255,255,0.2)', fontFamily: "'Rajdhani', sans-serif" }} />
                      </div>

                      <div>
                        <label className="block text-xs tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>
                          QUANTITY (MIN: {selectedService.min} — MAX: {selectedService.max.toLocaleString()})
                        </label>
                        <input type="number" min={selectedService.min} max={selectedService.max} value={orderQty} onChange={e => setOrderQty(Number(e.target.value))}
                          className="w-full bg-transparent text-sm outline-none text-white px-4 py-3"
                          style={{ border: '1px solid rgba(0,255,255,0.2)', fontFamily: "'Rajdhani', sans-serif" }} />
                      </div>

                      <button onClick={() => { if (orderLink && orderQty >= selectedService.min) setOrderPlaced(true); }}
                        className="w-full py-4 font-black text-xs tracking-widest transition-all hover:opacity-90"
                        style={{ fontFamily: "'Orbitron', sans-serif", background: 'linear-gradient(135deg, rgba(139,0,255,0.8), rgba(0,255,255,0.8))', boxShadow: '0 0 30px rgba(0,255,255,0.15)', letterSpacing: '0.2em' }}>
                        PLACE ORDER
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {active === "My Orders" && (
            <div>
              <div className="mb-10">
                <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.4em' }}>◈ TRANSACTION LOG ◈</p>
                <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em' }}>MY ORDERS</h2>
              </div>
              <div className="flex flex-col items-center justify-center py-24" style={{ border: '1px solid rgba(0,255,255,0.06)', background: 'rgba(0,255,255,0.01)' }}>
                <List size={48} style={{ color: 'rgba(0,255,255,0.15)', marginBottom: '16px' }} />
                <p className="text-xs tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,255,255,0.15)', letterSpacing: '0.3em' }}>NO ORDERS FOUND</p>
              </div>
            </div>
          )}

          {active === "Add Funds" && (
            <div>
              <div className="mb-10">
                <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.4em' }}>◈ TOP UP BALANCE ◈</p>
                <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em' }}>ADD FUNDS</h2>
              </div>
              <div className="max-w-sm p-8" style={{ border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,255,255,0.02)' }}>
                <p className="text-sm mb-6 leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
                  Fund your account via MTN Mobile Money or Orange Money.
                </p>
                <div className="space-y-3">
                  <div className="py-4 px-5 text-xs tracking-widest flex items-center justify-between" style={{ border: '1px solid rgba(255,200,0,0.3)', background: 'rgba(255,200,0,0.03)', fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,200,0,0.7)' }}>
                    <span>MTN MOBILE MONEY</span>
                    <span style={{ color: 'rgba(255,200,0,0.4)' }}>SOON</span>
                  </div>
                  <div className="py-4 px-5 text-xs tracking-widest flex items-center justify-between" style={{ border: '1px solid rgba(255,100,0,0.3)', background: 'rgba(255,100,0,0.03)', fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,100,0,0.7)' }}>
                    <span>ORANGE MONEY</span>
                    <span style={{ color: 'rgba(255,100,0,0.4)' }}>SOON</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(active === "Refill" || active === "Tickets" || active === "Services") && (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="text-xs tracking-widest mb-4" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.3)', letterSpacing: '0.4em' }}>◈ UNDER CONSTRUCTION ◈</div>
              <h2 className="font-black mb-2" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.5rem', color: 'rgba(255,255,255,0.1)', letterSpacing: '0.2em' }}>{active.toUpperCase()}</h2>
              <p className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.15)', letterSpacing: '0.2em' }}>COMING SOON</p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}