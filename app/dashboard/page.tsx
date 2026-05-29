"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  PlusCircle, List, RefreshCw, DollarSign,
  Ticket, Grid, LogOut, Menu, X,
  Camera, Music, Play, ThumbsUp,
  Twitter, Phone, Send, Wifi
} from "lucide-react";

const services = [
  { name: "Instagram", icon: Camera, color: "#E1306C" },
  { name: "TikTok", icon: Music, color: "#00F2EA" },
  { name: "YouTube", icon: Play, color: "#FF0000" },
  { name: "Facebook", icon: ThumbsUp, color: "#1877F2" },
  { name: "Twitter / X", icon: Twitter, color: "#1DA1F2" },
  { name: "Telegram", icon: Send, color: "#2AABEE" },
  { name: "Google Voice", icon: Phone, color: "#00FF88" },
  { name: "Spotify", icon: Music, color: "#1DB954" },
];

const navItems = [
  { label: "New Order", icon: PlusCircle },
  { label: "My Orders", icon: List },
  { label: "Refill", icon: RefreshCw },
  { label: "Add Funds", icon: DollarSign },
  { label: "Tickets", icon: Ticket },
  { label: "Services", icon: Grid },
];

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("New Order");

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
      <div className="text-cyan-400 text-xs tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>LOADING...</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#010108] text-white flex" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800&family=Rajdhani:wght@300;400;500;600&display=swap');`}</style>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} md:w-64 md:relative`}
        style={{ background: '#05050F', borderRight: '1px solid rgba(0,255,255,0.08)' }}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: '1px solid rgba(0,255,255,0.08)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ border: '1px solid rgba(0,255,255,0.5)', boxShadow: '0 0 15px rgba(0,255,255,0.2)' }}>
            <Wifi size={14} className="text-cyan-400" />
          </div>
          <span className={`text-sm font-black tracking-widest text-white ${sidebarOpen ? 'block' : 'hidden'} md:block`} style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.2em' }}>ORBITEK</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.label;
            return (
              <button key={item.label} onClick={() => { setActive(item.label); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(0,255,255,0.05)' : 'transparent',
                  borderLeft: isActive ? '2px solid rgba(0,255,255,0.6)' : '2px solid transparent',
                  color: isActive ? '#00ffff' : 'rgba(255,255,255,0.4)'
                }}>
                <Icon size={18} className="shrink-0" />
                <span className={`text-sm font-medium tracking-wider ${sidebarOpen ? 'block' : 'hidden'} md:block`}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-4 transition-colors hover:text-red-400"
          style={{ borderTop: '1px solid rgba(0,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}>
          <LogOut size={18} className="shrink-0" />
          <span className={`text-sm tracking-wider ${sidebarOpen ? 'block' : 'hidden'} md:block`}>Logout</span>
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(0,255,255,0.08)', background: '#05050F' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-400 hover:text-cyan-400">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-6 text-xs tracking-widest">
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>WELCOME: <span className="text-cyan-400">{user.user_metadata?.username || user.email}</span></span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>ORDERS: <span className="text-white">0</span></span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>BALANCE: <span className="text-white">$0.00</span></span>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6">

          {active === "New Order" && (
            <div>
              <div className="mb-8">
                <div className="text-xs tracking-widest mb-2" style={{ color: 'rgba(0,255,255,0.6)' }}>◈ PLACE AN ORDER ◈</div>
                <h2 className="text-2xl font-black tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>CHOOSE A NETWORK</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: 'rgba(0,255,255,0.08)' }}>
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <button key={service.name}
                      className="flex flex-col items-center justify-center py-8 gap-3 transition-all duration-300 hover:scale-105 group"
                      style={{ background: '#010108' }}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{ border: `1px solid ${service.color}30`, background: `${service.color}10` }}>
                        <Icon size={22} style={{ color: service.color }} />
                      </div>
                      <span className="text-xs tracking-widest font-semibold" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>{service.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {active === "My Orders" && (
            <div>
              <div className="mb-8">
                <div className="text-xs tracking-widest mb-2" style={{ color: 'rgba(0,255,255,0.6)' }}>◈ ORDER HISTORY ◈</div>
                <h2 className="text-2xl font-black tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>MY ORDERS</h2>
              </div>
              <div className="text-center py-20" style={{ border: '1px solid rgba(0,255,255,0.08)', color: 'rgba(255,255,255,0.2)' }}>
                <List size={40} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm tracking-widest">NO ORDERS YET</p>
              </div>
            </div>
          )}

          {active === "Add Funds" && (
            <div>
              <div className="mb-8">
                <div className="text-xs tracking-widest mb-2" style={{ color: 'rgba(0,255,255,0.6)' }}>◈ TOP UP BALANCE ◈</div>
                <h2 className="text-2xl font-black tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>ADD FUNDS</h2>
              </div>
              <div className="max-w-md p-8" style={{ border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                <p className="text-sm tracking-wider mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Payment via Mobile Money coming soon.</p>
                <div className="py-4 px-6 text-center text-xs tracking-widest" style={{ border: '1px solid rgba(0,255,255,0.2)', color: 'rgba(0,255,255,0.6)' }}>
                  MTN MOBILE MONEY — COMING SOON
                </div>
              </div>
            </div>
          )}

          {(active === "Refill" || active === "Tickets" || active === "Services") && (
            <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.2)' }}>
              <div className="text-xs tracking-widest mb-4" style={{ color: 'rgba(0,255,255,0.4)' }}>◈ COMING SOON ◈</div>
              <p className="text-sm tracking-widest">{active.toUpperCase()} — UNDER CONSTRUCTION</p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}