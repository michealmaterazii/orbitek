"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Users, ShoppingBag, DollarSign, LogOut, Wifi, Menu, X } from "lucide-react";

const ADMIN_EMAILS = ["michealenow2000@gmail.com"];

export default function AdminPanel() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("Overview");
  const [orders, setOrders] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0 });

  useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (!session) {
      window.location.href = "/login";
      return;
    }

    const email = session.user.email || "";
    setUser(session.user);

    if (!ADMIN_EMAILS.includes(email)) {
      window.location.href = "/dashboard";
      return;
    }

    setIsAdmin(true);

    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data: ordersData }) => {
        const o = ordersData || [];
        setOrders(o);
        setStats({
          totalOrders: o.length,
          pendingOrders: o.filter((x: any) => x.status === "pending").length,
        });
        setLoading(false);
      });
  });
}, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", orderId);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  if (loading) return (
    <div className="min-h-screen bg-[#010108] flex items-center justify-center">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&display=swap');`}</style>
      <div style={{ fontFamily: "'Orbitron', sans-serif", color: '#ff4444', fontSize: '12px', letterSpacing: '0.3em' }}>LOADING...</div>
    </div>
  );

  if (!isAdmin) return (
    <div className="min-h-screen bg-[#010108] flex items-center justify-center">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&display=swap');`}</style>
      <div style={{ fontFamily: "'Orbitron', sans-serif", color: '#ff4444', fontSize: '12px', letterSpacing: '0.3em' }}>ACCESS DENIED</div>
    </div>
  );

  const navItems = [
    { label: "Overview", icon: DollarSign },
    { label: "Orders", icon: ShoppingBag },
    { label: "Users", icon: Users },
  ];

  return (
    <main className="min-h-screen bg-[#010108] text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Rajdhani:wght@300;400;500;600&display=swap');`}</style>

      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.02) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {sidebarOpen && (
        <div className="fixed md:hidden" style={{ top: 0, left: '240px', right: 0, bottom: 0, zIndex: 40, background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex h-screen overflow-hidden relative z-10">

        <aside className={`fixed md:relative top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
          style={{ background: 'rgba(2,2,15,0.98)', borderRight: '1px solid rgba(255,0,0,0.1)', backdropFilter: 'blur(20px)', minWidth: '240px', maxWidth: '240px' }}>

          <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: '1px solid rgba(255,0,0,0.1)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ border: '1px solid rgba(255,0,0,0.5)', boxShadow: '0 0 15px rgba(255,0,0,0.2)' }}>
              <Wifi size={14} style={{ color: '#ff4444' }} />
            </div>
            <div>
              <p className="font-black tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '12px', letterSpacing: '0.2em' }}>ORBITEK</p>
              <p style={{ color: 'rgba(255,0,0,0.6)', fontSize: '9px', letterSpacing: '0.2em', fontFamily: "'Rajdhani', sans-serif" }}>ADMIN PANEL</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="ml-auto md:hidden text-gray-500 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.label;
              return (
                <button key={item.label} onClick={() => { setActive(item.label); setSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-200"
                  style={{
                    background: isActive ? 'rgba(255,0,0,0.08)' : 'transparent',
                    borderLeft: isActive ? '2px solid #ff4444' : '2px solid transparent',
                  }}>
                  <Icon size={17} className="shrink-0" style={{ color: isActive ? '#ff4444' : 'rgba(255,255,255,0.3)' }} />
                  <span className="text-xs font-semibold tracking-widest"
                    style={{ fontFamily: "'Orbitron', sans-serif", color: isActive ? '#ff4444' : 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>
                    {item.label.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="px-4 py-3 mx-4 mb-4" style={{ border: '1px solid rgba(255,0,0,0.15)', background: 'rgba(255,0,0,0.05)' }}>
            <p style={{ color: 'rgba(255,100,100,0.7)', fontFamily: "'Rajdhani', sans-serif", fontSize: '10px', letterSpacing: '0.1em' }}>LOGGED IN AS</p>
            <p className="truncate text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{user?.email}</p>
          </div>

          <button onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-4 transition-all hover:bg-red-500/10 group"
            style={{ borderTop: '1px solid rgba(255,0,0,0.08)' }}>
            <LogOut size={17} className="shrink-0" style={{ color: 'rgba(255,0,0,0.4)' }} />
            <span className="text-xs tracking-widest font-semibold" style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,0,0,0.4)', letterSpacing: '0.15em' }}>LOGOUT</span>
          </button>
        </aside>

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          <header className="flex items-center justify-between px-4 md:px-6 py-4 shrink-0"
            style={{ background: 'rgba(1,1,8,0.95)', borderBottom: '1px solid rgba(255,0,0,0.08)', backdropFilter: 'blur(20px)' }}>
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500 hover:text-white mr-3">
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,100,100,0.6)', letterSpacing: '0.2em' }}>ADMIN MODE</span>
            </div>
            <a href="/dashboard" className="text-xs tracking-widest px-4 py-2 transition-all hover:text-white"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)', letterSpacing: '0.15em' }}>
              ← USER PANEL
            </a>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">

            {active === "Overview" && (
              <div>
                <div className="mb-8">
                  <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,100,100,0.5)', letterSpacing: '0.4em' }}>◈ ADMIN OVERVIEW ◈</p>
                  <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em' }}>DASHBOARD</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "TOTAL ORDERS", value: stats.totalOrders, color: '#00ffff' },
                    { label: "PENDING ORDERS", value: stats.pendingOrders, color: '#ffcc00' },
                    { label: "TOTAL REVENUE", value: `$${orders.reduce((sum, o) => sum + parseFloat(o.price || 0), 0).toFixed(2)}`, color: '#00ff88' },
                  ].map((stat, i) => (
                    <div key={i} className="p-6" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                      <p className="text-xs tracking-widest mb-3" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>{stat.label}</p>
                      <p className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2rem', color: stat.color }}>{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-xs mb-4 tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>RECENT ORDERS</p>
                  <div className="space-y-2">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="p-4 flex items-center justify-between gap-4" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                        <div className="min-w-0">
                          <p className="text-xs font-bold truncate" style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,255,255,0.8)', fontSize: '10px' }}>{order.service_name}</p>
                          <p className="text-xs truncate" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)' }}>{order.link}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-black text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '12px' }}>${order.price}</span>
                          <span className="text-xs px-2 py-1" style={{
                            fontFamily: "'Orbitron', sans-serif", fontSize: '9px',
                            border: `1px solid ${order.status === 'completed' ? 'rgba(0,255,100,0.4)' : 'rgba(255,200,0,0.4)'}`,
                            color: order.status === 'completed' ? 'rgba(0,255,100,0.8)' : 'rgba(255,200,0,0.8)',
                          }}>{order.status?.toUpperCase()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {active === "Orders" && (
              <div>
                <div className="mb-8">
                  <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,100,100,0.5)', letterSpacing: '0.4em' }}>◈ ALL ORDERS ◈</p>
                  <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em' }}>ORDERS — {orders.length}</h2>
                </div>
                <div className="space-y-2">
                  {orders.map((order) => (
                    <div key={order.id} className="p-4" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="min-w-0">
                          <p className="text-xs font-bold mb-1" style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,255,255,0.8)', fontSize: '10px' }}>{order.network} — {order.service_name}</p>
                          <p className="text-xs truncate" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.4)' }}>{order.link}</p>
                          <p className="text-xs mt-1" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)' }}>
                            QTY: {order.quantity?.toLocaleString()} · PRICE: ${order.price} · JAP ID: {order.jap_order_id}
                          </p>
                        </div>
                        <span className="text-xs px-2 py-1 shrink-0" style={{
                          fontFamily: "'Orbitron', sans-serif", fontSize: '9px',
                          border: `1px solid ${order.status === 'completed' ? 'rgba(0,255,100,0.4)' : 'rgba(255,200,0,0.4)'}`,
                          color: order.status === 'completed' ? 'rgba(0,255,100,0.8)' : 'rgba(255,200,0,0.8)',
                        }}>{order.status?.toUpperCase()}</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {['pending', 'processing', 'completed', 'cancelled'].map(status => (
                          <button key={status} onClick={() => updateOrderStatus(order.id, status)}
                            className="text-xs px-3 py-1 tracking-widest transition-all hover:opacity-80"
                            style={{
                              fontFamily: "'Rajdhani', sans-serif",
                              border: `1px solid ${order.status === status ? 'rgba(0,255,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                              background: order.status === status ? 'rgba(0,255,255,0.08)' : 'transparent',
                              color: order.status === status ? '#00ffff' : 'rgba(255,255,255,0.3)',
                              fontSize: '10px', letterSpacing: '0.1em'
                            }}>
                            {status.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === "Users" && (
              <div>
                <div className="mb-8">
                  <p className="text-xs mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,100,100,0.5)', letterSpacing: '0.4em' }}>◈ ALL USERS ◈</p>
                  <h2 className="font-black" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.1em' }}>USERS</h2>
                </div>
                <div className="p-8 text-center" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                  <Users size={48} style={{ color: 'rgba(255,255,255,0.1)', margin: '0 auto 16px' }} />
                  <p className="text-xs tracking-widest mb-2" style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}>USER LIST</p>
                  <p className="text-xs mb-4" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'rgba(255,255,255,0.3)' }}>
                    To view users go to your Supabase dashboard → Authentication → Users
                  </p>
                  <a href="https://supabase.com/dashboard/project/hqotdvjocztcxfdtkgdw/auth/users" target="_blank"
                    className="inline-block text-xs px-6 py-3 tracking-widest transition-all hover:opacity-80"
                    style={{ fontFamily: "'Orbitron', sans-serif", border: '1px solid rgba(0,255,255,0.3)', color: '#00ffff', fontSize: '10px', letterSpacing: '0.15em' }}>
                    VIEW IN SUPABASE →
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}