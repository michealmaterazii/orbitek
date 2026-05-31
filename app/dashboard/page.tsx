"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  PlusCircle, List, RefreshCw, DollarSign,
  Ticket, LayoutGrid, LogOut, Menu, X,
  Camera, Music, Play, ThumbsUp,
  AtSign, Phone, Send, Wifi, ChevronRight, Loader, Search
} from "lucide-react";

const MARKUP = 2.5;

const networkConfig: any = {
  "Instagram": { icon: Camera, color: "#E1306C", glow: "rgba(225,48,108,0.3)" },
  "TikTok": { icon: Music, color: "#00F2EA", glow: "rgba(0,242,234,0.3)" },
  "YouTube": { icon: Play, color: "#FF0000", glow: "rgba(255,0,0,0.3)" },
  "Facebook": { icon: ThumbsUp, color: "#1877F2", glow: "rgba(24,119,242,0.3)" },
  "Twitter": { icon: AtSign, color: "#1DA1F2", glow: "rgba(29,161,242,0.3)" },
  "Telegram": { icon: Send, color: "#2AABEE", glow: "rgba(42,171,238,0.3)" },
  "Google": { icon: Phone, color: "#00FF88", glow: "rgba(0,255,136,0.3)" },
  "Spotify": { icon: Music, color: "#1DB954", glow: "rgba(29,185,84,0.3)" },
  "Default": { icon: LayoutGrid, color: "#00ffff", glow: "rgba(0,255,255,0.3)" },
};

function getNetworkConfig(category: string) {
  const key = Object.keys(networkConfig).find(k => category.toLowerCase().includes(k.toLowerCase()));
  return key ? networkConfig[key] : networkConfig["Default"];
}

const navItems = [
  { label: "New Order", icon: PlusCircle },
  { label: "My Orders", icon: List },
  { label: "Refill", icon: RefreshCw },
  { label: "Add Funds", icon: DollarSign },
  { label: "Services", icon: LayoutGrid },
  { label: "Tickets", icon: Ticket },
];

function MyOrders({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      setOrders(data || []);
      setLoading(false);
    };
    fetchOrders();
  }, [userId]);

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.4em' }}>◈ TRANSACTION LOG ◈</p>
        <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em' }}>MY ORDERS</h2>
      </div>
      {loading ? (
        <div className="flex items-center gap-3 py-20 justify-center">
          <Loader size={20} className="text-cyan-400 animate-spin" />
          <span className="text-xs tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.3em' }}>LOADING...</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24" style={{ border: '1px solid rgba(0,255,255,0.06)', background: 'rgba(0,255,255,0.01)' }}>
          <List size={48} style={{ color: 'rgba(0,255,255,0.15)', marginBottom: '16px' }} />
          <p className="text-xs tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,255,255,0.15)', letterSpacing: '0.3em' }}>NO ORDERS FOUND</p>
        </div>
      ) : (
        <div className="space-y-3 max-w-4xl">
          {orders.map((order) => (
            <div key={order.id} className="p-4 md:p-5" style={{ border: '1px solid rgba(0,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-bold mb-1" style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,255,255,0.8)', fontSize: '10px', letterSpacing: '0.1em' }}>{order.network?.toUpperCase()}</p>
                  <p className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.5)' }}>{order.service_name}</p>
                </div>
                <span className="text-xs px-2 py-1 tracking-widest shrink-0" style={{
                  fontFamily: "'Orbitron', sans-serif", fontSize: '9px',
                  border: `1px solid ${order.status === 'completed' ? 'rgba(0,255,100,0.4)' : 'rgba(255,200,0,0.4)'}`,
                  color: order.status === 'completed' ? 'rgba(0,255,100,0.8)' : 'rgba(255,200,0,0.8)',
                  background: order.status === 'completed' ? 'rgba(0,255,100,0.05)' : 'rgba(255,200,0,0.05)',
                }}>{order.status?.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-4 text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)' }}>
                <span>QTY: <span className="text-white">{order.quantity?.toLocaleString()}</span></span>
                <span>PRICE: <span className="text-cyan-400 font-bold">${order.price}</span></span>
              </div>
              <p className="text-xs truncate" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.25)' }}>{order.link}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddFunds() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(500);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    if (!phone || amount < 100) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, phone: `237${phone}`, currency: "XAF" }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setSuccess(true);
    } catch { setError("Something went wrong."); }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.4em' }}>◈ TOP UP BALANCE ◈</p>
        <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em' }}>ADD FUNDS</h2>
      </div>
      {success ? (
        <div className="max-w-sm p-8 text-center" style={{ border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.03)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ border: '1px solid rgba(0,255,255,0.3)', boxShadow: '0 0 30px rgba(0,255,255,0.2)' }}>
            <span style={{ color: '#00ffff', fontSize: '24px' }}>✓</span>
          </div>
          <p className="font-black mb-2" style={{ fontFamily: "'Orbitron', sans-serif", color: '#00ffff', fontSize: '14px', letterSpacing: '0.2em' }}>PAYMENT INITIATED</p>
          <p className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)' }}>Check your phone and approve the Mobile Money request.</p>
        </div>
      ) : (
        <div className="max-w-sm space-y-4">
          {error && <div className="px-4 py-3 text-xs" style={{ border: '1px solid rgba(255,0,0,0.2)', background: 'rgba(255,0,0,0.05)', fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,100,100,0.8)' }}>{error}</div>}
          <div>
            <label className="block text-xs tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>PHONE NUMBER</label>
            <div className="flex items-center" style={{ border: '1px solid rgba(0,255,255,0.2)' }}>
              <span className="px-3 py-3 text-sm shrink-0" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.6)', borderRight: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.05)' }}>+237</span>
              <input type="tel" placeholder="6XXXXXXXX" value={phone} onChange={e => setPhone(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none text-white placeholder-gray-700 px-4 py-3 min-w-0"
                style={{ fontFamily: "'Rajdhani', sans-serif" }} />
            </div>
          </div>
          <div>
            <label className="block text-xs tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>AMOUNT (XAF)</label>
            <input type="number" min={100} value={amount} onChange={e => setAmount(Number(e.target.value))}
              className="w-full bg-transparent text-sm outline-none text-white px-4 py-3"
              style={{ border: '1px solid rgba(0,255,255,0.2)', fontFamily: "'Rajdhani', sans-serif" }} />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[500, 1000, 2000, 5000].map(a => (
                <button key={a} onClick={() => setAmount(a)}
                  className="py-2 text-xs tracking-widest transition-all"
                  style={{ border: `1px solid ${amount === a ? 'rgba(0,255,255,0.4)' : 'rgba(255,255,255,0.08)'}`, background: amount === a ? 'rgba(0,255,255,0.08)' : 'transparent', fontFamily: "'Rajdhani', sans-serif", color: amount === a ? '#00ffff' : 'rgba(255,255,255,0.3)', fontSize: '11px' }}>
                  {a.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handlePayment} disabled={loading}
            className="w-full py-4 font-black text-xs tracking-widest transition-all hover:opacity-90 disabled:opacity-50"
            style={{ fontFamily: "'Orbitron', sans-serif", background: 'linear-gradient(135deg, rgba(139,0,255,0.8), rgba(0,255,255,0.8))', letterSpacing: '0.2em' }}>
            {loading ? "PROCESSING..." : "PAY WITH MOBILE MONEY"}
          </button>
        </div>
      )}
    </div>
  );
}

function ServicesCatalog({ networks }: { networks: any[] }) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const filtered = networks.filter(n =>
    n.name.toLowerCase().includes(search.toLowerCase()) ||
    n.items.some((i: any) => i.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.4em' }}>◈ ALL SERVICES ◈</p>
        <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em' }}>SERVICES</h2>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 px-4 py-3 mb-6 max-w-md" style={{ border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.02)' }}>
        <Search size={14} className="text-cyan-400 shrink-0" />
        <input type="text" placeholder="Search services..." value={search} onChange={e => setSearch(e.target.value)}
          className="bg-transparent w-full text-sm outline-none text-white placeholder-gray-600"
          style={{ fontFamily: "'Rajdhani', sans-serif" }} />
      </div>

      <div className="space-y-3 max-w-4xl">
        {filtered.map((network) => {
          const Icon = network.icon;
          const isOpen = selectedCat === network.name;
          const matchingItems = search
            ? network.items.filter((i: any) => i.name.toLowerCase().includes(search.toLowerCase()))
            : network.items;

          if (search && matchingItems.length === 0) return null;

          return (
            <div key={network.name} style={{ border: '1px solid rgba(0,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
              <button onClick={() => setSelectedCat(isOpen ? null : network.name)}
                className="w-full flex items-center justify-between px-4 py-4 transition-all"
                style={{ background: isOpen ? `${network.color}08` : 'transparent' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ border: `1px solid ${network.color}40`, background: `${network.color}10` }}>
                    <Icon size={14} style={{ color: network.color }} />
                  </div>
                  <span className="font-bold text-xs tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,255,255,0.8)', fontSize: '10px' }}>{network.name.toUpperCase()}</span>
                  <span className="text-xs px-2 py-0.5" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>{network.items.length}</span>
                </div>
                <ChevronRight size={14} className="transition-transform" style={{ color: 'rgba(255,255,255,0.3)', transform: isOpen ? 'rotate(90deg)' : 'none' }} />
              </button>

              {(isOpen || search) && matchingItems.length > 0 && (
                <div style={{ borderTop: `1px solid ${network.color}15` }}>
                  {/* Table header - hidden on mobile */}
                  <div className="hidden md:grid grid-cols-4 px-4 py-2 text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', letterSpacing: '0.1em' }}>
                    <span className="col-span-2">SERVICE</span>
                    <span className="text-center">MIN / MAX</span>
                    <span className="text-right">PRICE / 1000</span>
                  </div>
                  {matchingItems.map((item: any) => (
                    <div key={item.id} className="px-4 py-3 flex flex-col md:grid md:grid-cols-4 gap-1 md:gap-0 md:items-center" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                      <div className="md:col-span-2">
                        <p className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.7)' }}>{item.name}</p>
                        <p className="text-xs md:hidden" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)' }}>Min: {item.min} — Max: {item.max.toLocaleString()}</p>
                      </div>
                      <p className="hidden md:block text-xs text-center" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)' }}>{item.min} — {item.max.toLocaleString()}</p>
                      <p className="text-xs font-bold md:text-right" style={{ fontFamily: "'Orbitron', sans-serif", color: network.color, fontSize: '11px' }}>${item.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("New Order");
  const [networks, setNetworks] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);
  const [orderLink, setOrderLink] = useState("");
  const [orderQty, setOrderQty] = useState(100);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [servicesLoading, setServicesLoading] = useState(true);
  const [searchService, setSearchService] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = "/login";
      else setUser(data.user);
    });
  }, []);

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const grouped: any = {};
          data.forEach((service: any) => {
            const cat = service.category || "Other";
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(service);
          });
          const networkList = Object.keys(grouped).map(cat => ({
            name: cat,
            ...getNetworkConfig(cat),
            items: grouped[cat].map((s: any) => ({
              id: s.service,
              name: s.name,
              min: parseInt(s.min),
              max: parseInt(s.max),
              price: (parseFloat(s.rate) * MARKUP).toFixed(3),
            }))
          }));
          setNetworks(networkList);
        }
        setServicesLoading(false);
      })
      .catch(() => setServicesLoading(false));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handlePlaceOrder = async () => {
    if (!orderLink || !selectedService || orderQty < selectedService.min) return;
    setOrderLoading(true);
    setOrderError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: selectedService.id,
          link: orderLink,
          quantity: orderQty,
          price: ((orderQty / 1000) * parseFloat(selectedService.price)).toFixed(2),
          serviceName: selectedService.name,
          network: selectedNetwork?.name || "",
          userId: user.id,
        }),
      });
      const data = await res.json();
      if (data.error) setOrderError(data.error);
      else setOrderPlaced(true);
    } catch { setOrderError("Something went wrong."); }
    setOrderLoading(false);
  };

  // Flat list of all services for search
  const allServices = networks.flatMap(n => n.items.map((i: any) => ({ ...i, networkName: n.name, networkColor: n.color })));
  const filteredServices = allServices.filter(s =>
    s.name.toLowerCase().includes(searchService.toLowerCase()) ||
    s.networkName.toLowerCase().includes(searchService.toLowerCase())
  );

  if (!user) return (
    <div className="min-h-screen bg-[#010108] flex items-center justify-center">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Rajdhani:wght@300;400;500;600&display=swap');`}</style>
      <div style={{ fontFamily: "'Orbitron', sans-serif", color: '#00ffff', fontSize: '12px', letterSpacing: '0.3em' }}>INITIALIZING...</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#010108] text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Rajdhani:wght@300;400;500;600&display=swap');`}</style>

      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(0,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Mobile overlay */}
{sidebarOpen && (
  <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} style={{ pointerEvents: 'auto' }} />
)}

      <div className="flex h-screen overflow-hidden relative z-10">

        {/* Sidebar */}
         <aside className={`fixed md:relative top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 w-64 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`} onClick={e => e.stopPropagation()}
          style={{ background: 'rgba(2,2,15,0.98)', borderRight: '1px solid rgba(0,255,255,0.08)', backdropFilter: 'blur(20px)', minWidth: '240px', maxWidth: '240px' }}>

          <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: '1px solid rgba(0,255,255,0.08)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ border: '1px solid rgba(0,255,255,0.5)', boxShadow: '0 0 15px rgba(0,255,255,0.2)' }}>
              <Wifi size={14} className="text-cyan-400" />
            </div>
            <span className="font-black tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '13px', letterSpacing: '0.25em' }}>ORBITEK</span>
            <button onClick={() => setSidebarOpen(false)} className="ml-auto md:hidden text-gray-500 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 py-4 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.label;
              return (
                <button key={item.label} onClick={() => { setActive(item.label); setSidebarOpen(false); setSelectedService(null); setOrderPlaced(false); setOrderError(""); }}
                  className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-200"
                  style={{
                    background: isActive ? 'linear-gradient(90deg, rgba(0,255,255,0.08), transparent)' : 'transparent',
                    borderLeft: isActive ? '2px solid #00ffff' : '2px solid transparent',
                  }}>
                  <Icon size={17} className="shrink-0" style={{ color: isActive ? '#00ffff' : 'rgba(255,255,255,0.3)' }} />
                  <span className="text-xs font-semibold tracking-widest"
                    style={{ fontFamily: "'Orbitron', sans-serif", color: isActive ? '#00ffff' : 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>
                    {item.label.toUpperCase()}
                  </span>
                  {isActive && <ChevronRight size={12} className="ml-auto" style={{ color: '#00ffff' }} />}
                </button>
              );
            })}
          </nav>

          <button onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-4 transition-all hover:bg-red-500/5 group"
            style={{ borderTop: '1px solid rgba(0,255,255,0.06)' }}>
            <LogOut size={17} className="shrink-0 text-red-500/40 group-hover:text-red-400 transition-colors" />
            <span className="text-xs tracking-widest font-semibold text-red-500/40 group-hover:text-red-400 transition-colors"
              style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.15em' }}>LOGOUT</span>
          </button>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Header */}
          <header className="flex items-center justify-between px-4 md:px-6 py-4 shrink-0"
            style={{ background: 'rgba(1,1,8,0.95)', borderBottom: '1px solid rgba(0,255,255,0.06)', backdropFilter: 'blur(20px)' }}>
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500 hover:text-cyan-400 transition-colors mr-3">
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-3 md:gap-6 min-w-0 flex-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              <div className="text-xs tracking-widest truncate">
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>HI </span>
                <span style={{ color: '#00ffff' }}>{user.user_metadata?.username || user.email?.split('@')[0]}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="px-2 py-1 text-xs" style={{ border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,255,255,0.03)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.25)' }}>BAL </span>
                  <span className="text-white font-bold">$0.00</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs hidden md:block" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.2em' }}>ONLINE</span>
            </div>
          </header>

          {/* Page content - scrollable */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">

            {/* NEW ORDER */}
            {active === "New Order" && (
              <div className="max-w-2xl">
                <div className="mb-8">
                  <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.4em' }}>◈ PLACE AN ORDER ◈</p>
                  <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em' }}>NEW ORDER</h2>
                </div>

                {orderPlaced ? (
                  <div className="p-8 text-center" style={{ border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.03)' }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ border: '1px solid rgba(0,255,255,0.3)', boxShadow: '0 0 30px rgba(0,255,255,0.2)' }}>
                      <span style={{ color: '#00ffff', fontSize: '24px' }}>✓</span>
                    </div>
                    <p className="font-black mb-2" style={{ fontFamily: "'Orbitron', sans-serif", color: '#00ffff', fontSize: '14px', letterSpacing: '0.2em' }}>ORDER PLACED</p>
                    <p className="text-xs mb-6" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)' }}>Your order is being processed.</p>
                    <button onClick={() => { setOrderPlaced(false); setSelectedService(null); setOrderLink(""); setOrderQty(100); setActive("My Orders"); }}
                      className="px-8 py-3 text-xs font-black tracking-widest hover:opacity-80"
                      style={{ fontFamily: "'Orbitron', sans-serif", background: 'linear-gradient(135deg, rgba(139,0,255,0.8), rgba(0,255,255,0.8))', letterSpacing: '0.2em' }}>
                      VIEW ORDERS
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">

                    {/* Service search */}
                    <div>
                      <label className="block text-xs tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>SEARCH & SELECT SERVICE</label>
                      <div className="flex items-center gap-3 px-4 py-3 mb-2" style={{ border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.02)' }}>
                        <Search size={14} className="text-cyan-400 shrink-0" />
                        <input type="text" placeholder="e.g. Instagram Followers..." value={searchService} onChange={e => { setSearchService(e.target.value); setSelectedService(null); }}
                          className="bg-transparent w-full text-sm outline-none text-white placeholder-gray-600"
                          style={{ fontFamily: "'Rajdhani', sans-serif" }} />
                      </div>

                      {/* Selected service display */}
                      {selectedService && (
                        <div className="px-4 py-3 flex items-center justify-between" style={{ border: '1px solid rgba(0,255,255,0.3)', background: 'rgba(0,255,255,0.05)' }}>
                          <div>
                            <p className="text-xs font-bold" style={{ fontFamily: "'Orbitron', sans-serif", color: '#00ffff', fontSize: '10px' }}>{selectedService.name}</p>
                            <p className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)' }}>Min: {selectedService.min} — Max: {selectedService.max.toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", color: '#00ffff', fontSize: '13px' }}>${selectedService.price}</p>
                            <p className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)' }}>per 1000</p>
                          </div>
                        </div>
                      )}

                      {/* Dropdown results */}
                      {searchService && !selectedService && (
                        <div className="max-h-48 overflow-y-auto" style={{ border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(2,2,15,0.98)' }}>
                          {servicesLoading ? (
                            <div className="px-4 py-3 text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)' }}>Loading services...</div>
                          ) : filteredServices.length === 0 ? (
                            <div className="px-4 py-3 text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)' }}>No services found</div>
                          ) : filteredServices.slice(0, 20).map((s: any) => (
                            <button key={s.id} onClick={() => { setSelectedService(s); setSelectedNetwork({ name: s.networkName, color: s.networkColor }); setSearchService(s.name); setOrderQty(s.min); }}
                              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
                              style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                              <div>
                                <p className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.7)' }}>{s.name}</p>
                                <p className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}>{s.networkName}</p>
                              </div>
                              <p className="text-xs font-bold shrink-0 ml-4" style={{ fontFamily: "'Orbitron', sans-serif", color: s.networkColor, fontSize: '11px' }}>${s.price}</p>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Link input */}
                    <div>
                      <label className="block text-xs tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>LINK / USERNAME</label>
                      <input type="text" placeholder="https://instagram.com/username" value={orderLink} onChange={e => setOrderLink(e.target.value)}
                        className="w-full bg-transparent text-sm outline-none text-white placeholder-gray-700 px-4 py-3"
                        style={{ border: '1px solid rgba(0,255,255,0.2)', fontFamily: "'Rajdhani', sans-serif" }} />
                    </div>

                    {/* Quantity */}
                    {selectedService && (
                      <div>
                        <label className="block text-xs tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>
                          QUANTITY (MIN: {selectedService.min} — MAX: {selectedService.max.toLocaleString()})
                        </label>
                        <input type="number" min={selectedService.min} max={selectedService.max} value={orderQty} onChange={e => setOrderQty(Number(e.target.value))}
                          className="w-full bg-transparent text-sm outline-none text-white px-4 py-3"
                          style={{ border: '1px solid rgba(0,255,255,0.2)', fontFamily: "'Rajdhani', sans-serif" }} />
                      </div>
                    )}

                    {/* Price summary */}
                    {selectedService && (
                      <div className="p-4" style={{ border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,255,255,0.02)' }}>
                        <div className="flex justify-between mb-2">
                          <span className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)' }}>PRICE PER 1000</span>
                          <span className="font-black text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '13px' }}>${selectedService.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)' }}>TOTAL</span>
                          <span className="font-black text-white" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '13px' }}>${((orderQty / 1000) * parseFloat(selectedService.price)).toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    {orderError && (
                      <div className="px-4 py-3 text-xs" style={{ border: '1px solid rgba(255,0,0,0.2)', background: 'rgba(255,0,0,0.05)', fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,100,100,0.8)' }}>
                        {orderError}
                      </div>
                    )}

                    <button onClick={handlePlaceOrder} disabled={orderLoading || !selectedService || !orderLink}
                      className="w-full py-4 font-black text-xs tracking-widest transition-all hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2"
                      style={{ fontFamily: "'Orbitron', sans-serif", background: 'linear-gradient(135deg, rgba(139,0,255,0.8), rgba(0,255,255,0.8))', letterSpacing: '0.2em' }}>
                      {orderLoading ? <><Loader size={14} className="animate-spin" /> PROCESSING...</> : "PLACE ORDER"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {active === "My Orders" && <MyOrders userId={user.id} />}
            {active === "Add Funds" && <AddFunds />}
            {active === "Services" && <ServicesCatalog networks={networks} />}

            {(active === "Refill" || active === "Tickets") && (
              <div className="flex flex-col items-center justify-center py-32">
                <div className="text-xs tracking-widest mb-4" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.3)', letterSpacing: '0.4em' }}>◈ COMING SOON ◈</div>
                <h2 className="font-black mb-2" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.5rem', color: 'rgba(255,255,255,0.1)', letterSpacing: '0.2em' }}>{active.toUpperCase()}</h2>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}