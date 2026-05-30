"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  PlusCircle, List, RefreshCw, DollarSign,
  Ticket, LayoutGrid, LogOut, Menu, X,
  Camera, Music, Play, ThumbsUp,
  AtSign, Phone, Send, Wifi, ChevronRight, Loader
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
  { label: "Tickets", icon: Ticket },
  { label: "Services", icon: LayoutGrid },
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
          <span className="text-xs tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.3em' }}>LOADING ORDERS...</span>
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
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '9px',
                  border: `1px solid ${order.status === 'completed' ? 'rgba(0,255,100,0.4)' : order.status === 'pending' ? 'rgba(255,200,0,0.4)' : 'rgba(255,100,0,0.4)'}`,
                  color: order.status === 'completed' ? 'rgba(0,255,100,0.8)' : order.status === 'pending' ? 'rgba(255,200,0,0.8)' : 'rgba(255,100,0,0.8)',
                  background: order.status === 'completed' ? 'rgba(0,255,100,0.05)' : order.status === 'pending' ? 'rgba(255,200,0,0.05)' : 'rgba(255,100,0,0.05)',
                }}>
                  {order.status?.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)' }}>
                <span>QTY: <span className="text-white">{order.quantity?.toLocaleString()}</span></span>
                <span>PRICE: <span className="text-cyan-400 font-bold">${order.price}</span></span>
              </div>
              <p className="text-xs mt-2 truncate" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.25)' }}>{order.link}</p>
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
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.4em' }}>◈ TOP UP BALANCE ◈</p>
        <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em' }}>ADD FUNDS</h2>
      </div>

      {success ? (
        <div className="max-w-sm p-8 text-center" style={{ border: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.03)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ border: '1px solid rgba(0,255,255,0.3)', boxShadow: '0 0 30px rgba(0,255,255,0.2)' }}>
            <span style={{ color: '#00ffff', fontSize: '24px' }}>✓</span>
          </div>
          <p className="font-black mb-2" style={{ fontFamily: "'Orbitron', sans-serif", color: '#00ffff', fontSize: '14px', letterSpacing: '0.2em' }}>PAYMENT INITIATED</p>
          <p className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>Check your phone and approve the Mobile Money request. Your balance will update shortly.</p>
        </div>
      ) : (
        <div className="max-w-sm space-y-4">
          <div className="p-5" style={{ border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,255,255,0.02)' }}>
            <p className="text-xs tracking-wider" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)' }}>
              Enter your MTN or Orange Money number and the amount you want to add. A payment request will be sent to your phone.
            </p>
          </div>

          {error && (
            <div className="px-4 py-3 text-xs" style={{ border: '1px solid rgba(255,0,0,0.2)', background: 'rgba(255,0,0,0.05)', fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,100,100,0.8)', letterSpacing: '0.1em' }}>
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>PHONE NUMBER</label>
            <div className="flex items-center" style={{ border: '1px solid rgba(0,255,255,0.2)' }}>
              <span className="px-3 py-3 text-sm" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.6)', borderRight: '1px solid rgba(0,255,255,0.2)', background: 'rgba(0,255,255,0.05)' }}>+237</span>
              <input type="tel" placeholder="6XXXXXXXX" value={phone} onChange={e => setPhone(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none text-white placeholder-gray-700 px-4 py-3"
                style={{ fontFamily: "'Rajdhani', sans-serif" }} />
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>AMOUNT (XAF)</label>
            <input type="number" min={100} value={amount} onChange={e => setAmount(Number(e.target.value))}
              className="w-full bg-transparent text-sm outline-none text-white px-4 py-3"
              style={{ border: '1px solid rgba(0,255,255,0.2)', fontFamily: "'Rajdhani', sans-serif" }} />
            <div className="flex gap-2 mt-2">
              {[500, 1000, 2000, 5000].map(a => (
                <button key={a} onClick={() => setAmount(a)}
                  className="flex-1 py-2 text-xs tracking-widest transition-all"
                  style={{ border: `1px solid ${amount === a ? 'rgba(0,255,255,0.4)' : 'rgba(255,255,255,0.08)'}`, background: amount === a ? 'rgba(0,255,255,0.08)' : 'transparent', fontFamily: "'Rajdhani', sans-serif", color: amount === a ? '#00ffff' : 'rgba(255,255,255,0.3)' }}>
                  {a.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handlePayment} disabled={loading}
            className="w-full py-4 font-black text-xs tracking-widest transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-3"
            style={{ fontFamily: "'Orbitron', sans-serif", background: 'linear-gradient(135deg, rgba(139,0,255,0.8), rgba(0,255,255,0.8))', boxShadow: '0 0 30px rgba(0,255,255,0.15)', letterSpacing: '0.2em' }}>
            {loading ? "PROCESSING..." : "PAY WITH MOBILE MONEY"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("New Order");
  const [networks, setNetworks] = useState<any[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [orderLink, setOrderLink] = useState("");
  const [orderQty, setOrderQty] = useState(100);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [servicesLoading, setServicesLoading] = useState(true);

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
              japRate: s.rate,
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
    if (!orderLink || orderQty < selectedService.min) return;
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
          network: selectedNetwork.name,
          userId: user.id,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setOrderError(data.error);
      } else {
        setOrderPlaced(true);
      }
    } catch {
      setOrderError("Something went wrong. Please try again.");
    }
    setOrderLoading(false);
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

      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        <header className="flex items-center justify-between px-4 md:px-6 py-4 sticky top-0 z-40"
  style={{ background: 'rgba(1,1,8,0.9)', borderBottom: '1px solid rgba(0,255,255,0.06)', backdropFilter: 'blur(20px)' }}>
  <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-500 hover:text-cyan-400 transition-colors">
    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
  </button>
  <div className="flex items-center gap-3 md:gap-6" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
    <div className="text-xs tracking-widest">
      <span style={{ color: 'rgba(255,255,255,0.25)' }}>HI </span>
      <span style={{ color: '#00ffff' }}>{user.user_metadata?.username || user.email?.split('@')[0]}</span>
    </div>
    <div className="flex items-center gap-2 md:gap-4 text-xs tracking-widest">
      <div className="px-2 md:px-3 py-1" style={{ border: '1px solid rgba(0,255,255,0.1)', background: 'rgba(0,255,255,0.03)' }}>
        <span style={{ color: 'rgba(255,255,255,0.25)' }}>BAL </span>
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

          {active === "New Order" && (
            <div>
              {!selectedNetwork ? (
                <div>
                  <div className="mb-10">
                    <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.4em' }}>◈ SELECT PLATFORM ◈</p>
                    <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em' }}>NEW ORDER</h2>
                  </div>
                  {servicesLoading ? (
                    <div className="flex items-center gap-3 py-20 justify-center">
                      <Loader size={20} className="text-cyan-400 animate-spin" />
                      <span className="text-xs tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.3em' }}>LOADING SERVICES...</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {networks.map((network) => {
                        const Icon = network.icon;
                        return (
                          <button key={network.name} onClick={() => setSelectedNetwork(network)}
                            className="flex flex-col items-center justify-center py-10 gap-4 transition-all duration-300 relative group"
                            style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.border = `1px solid ${network.color}40`; (e.currentTarget as HTMLElement).style.background = `${network.color}08`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}>
                            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ border: `1px solid ${network.color}40`, background: `${network.color}10`, boxShadow: `0 0 20px ${network.glow}` }}>
                              <Icon size={24} style={{ color: network.color }} />
                            </div>
                            <p className="text-xs font-bold tracking-widest text-center px-2" style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,255,255,0.7)', fontSize: '9px' }}>{network.name.toUpperCase()}</p>
                            <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${network.color}, transparent)` }} />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : !selectedService ? (
                <div>
                  <div className="mb-10">
                    <button onClick={() => setSelectedNetwork(null)} className="text-xs mb-4 flex items-center gap-2 hover:text-cyan-400 transition-colors"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>← BACK</button>
                    <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(0,255,255,0.5)', letterSpacing: '0.4em' }}>◈ SELECT SERVICE ◈</p>
                    <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em' }}>{selectedNetwork.name.toUpperCase()}</h2>
                  </div>
                  <div className="space-y-2 max-w-3xl">
                    {selectedNetwork.items.map((item: any) => (
                      <button key={item.id} onClick={() => { setSelectedService(item); setOrderQty(item.min); setOrderPlaced(false); setOrderError(""); }}
                        className="w-full flex items-center justify-between px-6 py-5 transition-all duration-300 text-left"
                        style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.border = `1px solid ${selectedNetwork.color}40`; (e.currentTarget as HTMLElement).style.background = `${selectedNetwork.color}05`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}>
                        <div>
                          <p className="text-xs font-bold tracking-wider mb-1" style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,255,255,0.8)', fontSize: '10px' }}>{item.name.toUpperCase()}</p>
                          <p className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>MIN {item.min} — MAX {item.max.toLocaleString()}</p>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <p className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", color: selectedNetwork.color, fontSize: '13px' }}>${item.price}</p>
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
                          <span className="font-black text-white" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '14px' }}>${((orderQty / 1000) * parseFloat(selectedService.price)).toFixed(2)}</span>
                        </div>
                      </div>

                      {orderError && (
                        <div className="px-4 py-3 text-xs" style={{ border: '1px solid rgba(255,0,0,0.2)', background: 'rgba(255,0,0,0.05)', fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,100,100,0.8)', letterSpacing: '0.1em' }}>
                          {orderError}
                        </div>
                      )}

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

                      <button onClick={handlePlaceOrder} disabled={orderLoading}
                        className="w-full py-4 font-black text-xs tracking-widest transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-3"
                        style={{ fontFamily: "'Orbitron', sans-serif", background: 'linear-gradient(135deg, rgba(139,0,255,0.8), rgba(0,255,255,0.8))', boxShadow: '0 0 30px rgba(0,255,255,0.15)', letterSpacing: '0.2em' }}>
                        {orderLoading ? <><Loader size={14} className="animate-spin" /> PROCESSING...</> : "PLACE ORDER"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {active === "My Orders" && <MyOrders userId={user.id} />}
          {active === "Add Funds" && <AddFunds />}

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