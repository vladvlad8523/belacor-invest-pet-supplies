import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import belacorLogo from "@/assets/belacor-logo.jpg";
import { useIsMobile } from "@/hooks/use-mobile";

interface Order {
  id: number;
  date: string;
  company: string;
  contact?: string;
  phone?: string;
  email?: string;
  product: string;
  qty: number;
  unit: "kg" | "t";
  status: "laukiama" | "atlikta";
  message?: string;
}

const PASSWORD_KEY = "belacor_admin_password";
const PASSWORD_CHANGED_KEY = "belacor_password_changed_at";
const PASSWORD_EXPIRY_DAYS = 30;
const INACTIVITY_TIMEOUT = 5 * 60; // 5 minutes in seconds
const SEEN_ORDERS_KEY = "belacor_seen_orders";

const defaultOrders: Order[] = [
  { id: 1, date: "2026-03-01", company: "UAB Kurgama", product: "Bentonitinis kraikas", qty: 500, unit: "kg", status: "laukiama", message: "Pageidaujame pristatymo iki kovo 10 d." },
  { id: 2, date: "2026-03-03", company: "UAB Mangusta", product: "Pjuvenų briketai", qty: 1, unit: "t", status: "atlikta", message: "" },
  { id: 3, date: "2026-03-05", company: "Šiaurės centras", product: "Linų kraikas", qty: 300, unit: "kg", status: "laukiama", message: "Skubiai reikia" },
  { id: 4, date: "2026-03-07", company: "UAB PetShop", product: "TOFU kraikas", qty: 200, unit: "kg", status: "laukiama", message: "" },
];

function getPasswordData() {
  const pwd = localStorage.getItem(PASSWORD_KEY) || "admin";
  const changedAt = localStorage.getItem(PASSWORD_CHANGED_KEY);
  const changedDate = changedAt ? new Date(changedAt) : null;
  return { pwd, changedDate };
}

function getDaysUntilExpiry(): number {
  const { changedDate } = getPasswordData();
  if (!changedDate) return 0;
  const now = new Date();
  const diff = PASSWORD_EXPIRY_DAYS - Math.floor((now.getTime() - changedDate.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

function validatePassword(pwd: string): string[] {
  const errors: string[] = [];
  if (pwd.length < 8) errors.push("Mažiausiai 8 simboliai");
  if (!/[a-z]/.test(pwd)) errors.push("Būtina mažoji raidė");
  if (!/[A-Z]/.test(pwd)) errors.push("Būtina didžioji raidė");
  if (!/[0-9]/.test(pwd)) errors.push("Būtinas skaičius");
  return errors;
}

function getSeenOrderIds(): number[] {
  try {
    const saved = localStorage.getItem(SEEN_ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function markOrdersSeen(ids: number[]) {
  const existing = getSeenOrderIds();
  const merged = Array.from(new Set([...existing, ...ids]));
  localStorage.setItem(SEEN_ORDERS_KEY, JSON.stringify(merged));
}

const Kabinetas = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("belacor_orders");
    return saved ? JSON.parse(saved) : defaultOrders;
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [forcePasswordChange, setForcePasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdErrors, setPwdErrors] = useState<string[]>([]);
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [daysLeft, setDaysLeft] = useState(getDaysUntilExpiry());
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  // Inactivity timer
  const [secondsLeft, setSecondsLeft] = useState(INACTIVITY_TIMEOUT);
  const lastActivityRef = useRef(Date.now());

  // Seen orders tracking
  const [seenIds, setSeenIds] = useState<number[]>(getSeenOrderIds);

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    setSecondsLeft(INACTIVITY_TIMEOUT);
  }, []);

  // Track user activity
  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click"];
    events.forEach(e => window.addEventListener(e, resetTimer));
    return () => events.forEach(e => window.removeEventListener(e, resetTimer));
  }, [resetTimer]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastActivityRef.current) / 1000);
      const remaining = Math.max(0, INACTIVITY_TIMEOUT - elapsed);
      setSecondsLeft(remaining);
      if (remaining === 0) {
        sessionStorage.removeItem("belacor_admin_logged_in");
        navigate("/");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  // Manual mark as seen
  const markAsSeen = (id: number) => {
    markOrdersSeen([id]);
    setSeenIds(prev => [...prev, id]);
  };

  const markAllAsSeen = () => {
    const allIds = orders.map(o => o.id);
    markOrdersSeen(allIds);
    setSeenIds(allIds);
  };

  // Mobile filter panel
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    id: "",
    date: "",
    company: "",
    contact: "",
    product: "",
    qty: "",
    unit: "",
    status: "",
    message: "",
  });

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("belacor_admin_logged_in");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    const days = getDaysUntilExpiry();
    setDaysLeft(days);
    if (days === 0) {
      setForcePasswordChange(true);
      setShowPasswordModal(true);
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("belacor_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => { setCurrentPage(1); }, [filters]);

  const filteredOrders = orders.filter(o => {
    if (filters.id && !o.id.toString().includes(filters.id)) return false;
    if (filters.date && !o.date.includes(filters.date)) return false;
    if (filters.company && !o.company.toLowerCase().includes(filters.company.toLowerCase())) return false;
    if (filters.contact && !(o.contact || "").toLowerCase().includes(filters.contact.toLowerCase())) return false;
    if (filters.product && !o.product.toLowerCase().includes(filters.product.toLowerCase())) return false;
    if (filters.qty && !o.qty.toString().includes(filters.qty)) return false;
    if (filters.unit && o.unit !== filters.unit) return false;
    if (filters.status && o.status !== filters.status) return false;
    if (filters.message && !(o.message || "").toLowerCase().includes(filters.message.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    // New orders first
    const aNew = !seenIds.includes(a.id) ? 1 : 0;
    const bNew = !seenIds.includes(b.id) ? 1 : 0;
    if (bNew !== aNew) return bNew - aNew;
    // Then by date descending
    return b.date.localeCompare(a.date);
  });

  const toggleStatus = (id: number) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: o.status === "laukiama" ? "atlikta" : "laukiama" } : o));
  };

  const exportToExcel = () => {
    const data = filteredOrders.map(o => ({
      "Nr.": o.id,
      "Data": o.date,
      "Įmonė": o.company,
      "Kontaktinis asmuo": o.contact || "",
      "Telefonas": o.phone || "",
      "El. paštas": o.email || "",
      "Produktas": o.product,
      "Kiekis": o.qty,
      "Vnt.": o.unit === "t" ? "Tonos" : "Kilogramai",
      "Būsena": o.status === "atlikta" ? "Atlikta ✅" : "Laukiama ⏳",
      "Žinutė": o.message || "",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Užsakymai");
    XLSX.writeFile(wb, `uzsakymai_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const clearFilters = () => {
    setFilters({ id: "", date: "", company: "", contact: "", product: "", qty: "", unit: "", status: "", message: "" });
  };

  const filterInputStyle: React.CSSProperties = { 
    width: "100%", 
    padding: "6px 8px", 
    borderRadius: "4px", 
    border: "1px solid #cbd5e1", 
    fontSize: "12px", 
    boxSizing: "border-box" as const 
  };

  const handlePasswordChange = () => {
    setPwdSuccess(false);
    const errors = validatePassword(newPassword);
    if (newPassword !== confirmPassword) errors.push("Slaptažodžiai nesutampa");
    setPwdErrors(errors);
    if (errors.length === 0) {
      localStorage.setItem(PASSWORD_KEY, newPassword);
      localStorage.setItem(PASSWORD_CHANGED_KEY, new Date().toISOString());
      setNewPassword("");
      setConfirmPassword("");
      setPwdSuccess(true);
      setForcePasswordChange(false);
      setDaysLeft(PASSWORD_EXPIRY_DAYS);
      setTimeout(() => {
        setShowPasswordModal(false);
        setPwdSuccess(false);
      }, 1500);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("belacor_admin_logged_in");
    navigate("/");
  };

  const isNewOrder = (id: number) => !seenIds.includes(id);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" as const };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      {/* Header */}
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#1e3a8a", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
        <tbody>
          <tr>
            <td style={{ padding: isMobile ? "12px 16px" : "14px 32px" }}>
              <table width="100%" cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "middle" }}>
                      <img src={belacorLogo} alt="Belacor" style={{ height: "36px", verticalAlign: "middle", marginRight: "12px", borderRadius: "4px" }} />
                      {!isMobile && <span style={{ color: "#d4af37", fontWeight: 700, fontSize: "18px", verticalAlign: "middle" }}>Administravimo kabinetas</span>}
                    </td>
                    <td style={{ textAlign: "right", verticalAlign: "middle" }}>
                      {/* Inactivity timer */}
                      <span style={{
                        color: secondsLeft <= 60 ? "#fca5a5" : "rgba(255,255,255,0.7)",
                        fontSize: "12px",
                        fontWeight: 600,
                        marginRight: "12px",
                        verticalAlign: "middle",
                        animation: secondsLeft <= 30 ? "pulse 1s infinite" : undefined,
                      }}>
                        ⏱️ {formatTime(secondsLeft)}
                      </span>
                      <button onClick={handleLogout} style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "8px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontSize: "13px" }}>
                        Atsijungti
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Password expiry warning */}
      {daysLeft > 0 && daysLeft <= 7 && (
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fef3c7", borderBottom: "1px solid #f59e0b" }}>
          <tbody>
            <tr>
              <td style={{ padding: "10px 32px", textAlign: "center", fontSize: "14px", color: "#92400e", fontWeight: 600 }}>
                ⚠️ Iki slaptažodžio keitimo liko {daysLeft} d. 
                <a href="#" onClick={(e) => { e.preventDefault(); setShowPasswordModal(true); }} style={{ color: "#1e3a8a", marginLeft: "8px", textDecoration: "underline" }}>Keisti dabar</a>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Main content */}
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: isMobile ? "12px" : "32px" }}>
        {/* Actions bar */}
        {isMobile ? (
          <div style={{ marginBottom: "16px" }}>
            <h2 style={{ margin: "0 0 12px", color: "#1e3a8a", fontSize: "18px" }}>📦 Užsakymai ({filteredOrders.length}/{orders.length})</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {orders.some(o => !seenIds.includes(o.id)) && (
                <button onClick={markAllAsSeen} style={{ backgroundColor: "#7c3aed", color: "white", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "12px" }}>
                  👁️ Pažymėti visus matytais
                </button>
              )}
              {orders.length > 0 && (
                <button onClick={() => {
                  const completedCount = orders.filter(o => o.status === "atlikta").length;
                  const msg = completedCount > 0 
                    ? `Ar tikrai norite ištrinti atliktus užsakymus (${completedCount} vnt.)?`
                    : `Ar tikrai norite ištrinti VISUS užsakymus (${orders.length} vnt.)?`;
                  if (window.confirm(msg)) {
                    if (completedCount > 0) {
                      setOrders(prev => prev.filter(o => o.status !== "atlikta"));
                    } else {
                      setOrders([]);
                    }
                  }
                }} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "12px" }}>
                  🗑️ Ištrinti {orders.some(o => o.status === "atlikta") ? `atliktus` : `visus`}
                </button>
              )}
              <button onClick={() => setShowMobileFilters(prev => !prev)} style={{ backgroundColor: showMobileFilters ? "#1e3a8a" : "#64748b", color: "white", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "12px" }}>
                🔍 Filtrai {showMobileFilters ? "▲" : "▼"}
              </button>
              <button onClick={exportToExcel} style={{ backgroundColor: "#16a34a", color: "white", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "12px" }}>
                📊 Excel
              </button>
              <button onClick={() => setShowPasswordModal(true)} style={{ backgroundColor: "#1e3a8a", color: "white", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "12px" }}>
                🔑 Slaptažodis
              </button>
            </div>
            {/* Mobile filter panel */}
            {showMobileFilters && (
              <div style={{ marginTop: "12px", backgroundColor: "white", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <strong style={{ color: "#1e3a8a", fontSize: "14px" }}>🔍 Filtravimas</strong>
                  <button onClick={() => { clearFilters(); }} style={{ backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", padding: "4px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>
                    Išvalyti
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 600, color: "#475569" }}>Įmonė</label>
                    <input type="text" placeholder="Ieškoti..." value={filters.company} onChange={e => setFilters({...filters, company: e.target.value})} style={filterInputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 600, color: "#475569" }}>Kontaktas</label>
                    <input type="text" placeholder="Ieškoti..." value={filters.contact} onChange={e => setFilters({...filters, contact: e.target.value})} style={filterInputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 600, color: "#475569" }}>Produktas</label>
                    <input type="text" placeholder="Ieškoti..." value={filters.product} onChange={e => setFilters({...filters, product: e.target.value})} style={filterInputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 600, color: "#475569" }}>Būsena</label>
                    <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})} style={filterInputStyle}>
                      <option value="">Visi</option>
                      <option value="laukiama">Laukiama</option>
                      <option value="atlikta">Atlikta</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 600, color: "#475569" }}>Data</label>
                    <input type="date" value={filters.date} onChange={e => setFilters({...filters, date: e.target.value})} style={filterInputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 600, color: "#475569" }}>Nr.</label>
                    <input type="text" placeholder="Nr." value={filters.id} onChange={e => setFilters({...filters, id: e.target.value})} style={filterInputStyle} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: "20px" }}>
            <tbody>
              <tr>
                <td>
                  <h2 style={{ margin: 0, color: "#1e3a8a", fontSize: "22px" }}>📦 Užsakymai ({filteredOrders.length}/{orders.length})</h2>
                </td>
                <td style={{ textAlign: "right" }}>
                  {orders.some(o => !seenIds.includes(o.id)) && (
                    <button onClick={markAllAsSeen} style={{ backgroundColor: "#7c3aed", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "14px", marginRight: "8px" }}>
                      👁️ Pažymėti visus matytais
                    </button>
                  )}
                  {orders.length > 0 && (
                    <button onClick={() => {
                      const completedCount = orders.filter(o => o.status === "atlikta").length;
                      const msg = completedCount > 0 
                        ? `Ar tikrai norite ištrinti atliktus užsakymus (${completedCount} vnt.)?`
                        : `Ar tikrai norite ištrinti VISUS užsakymus (${orders.length} vnt.)?`;
                      if (window.confirm(msg)) {
                        if (completedCount > 0) {
                          setOrders(prev => prev.filter(o => o.status !== "atlikta"));
                        } else {
                          setOrders([]);
                        }
                      }
                    }} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "14px", marginRight: "8px" }}>
                      🗑️ Ištrinti {orders.some(o => o.status === "atlikta") ? `atliktus (${orders.filter(o => o.status === "atlikta").length})` : `visus (${orders.length})`}
                    </button>
                  )}
                  <button onClick={clearFilters} style={{ backgroundColor: "#64748b", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "14px", marginRight: "8px" }}>
                    🔄 Išvalyti filtrus
                  </button>
                  <button onClick={exportToExcel} style={{ backgroundColor: "#16a34a", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "14px", marginRight: "8px" }}>
                    📊 Eksportuoti Excel
                  </button>
                  <button onClick={() => setShowPasswordModal(true)} style={{ backgroundColor: "#1e3a8a", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "14px" }}>
                    🔑 Keisti slaptažodį
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {/* Mobile: card view */}
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredOrders.length === 0 ? (
              <div style={{ padding: "24px", textAlign: "center", color: "#64748b", fontSize: "14px", backgroundColor: "white", borderRadius: "12px" }}>
                Nerasta užsakymų
              </div>
            ) : (
              filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((o) => {
                const isNew = isNewOrder(o.id);
                return (
                  <div key={o.id} style={{
                    backgroundColor: isNew ? "#eff6ff" : "white",
                    borderRadius: "12px",
                    boxShadow: isNew ? "0 2px 12px rgba(30,58,138,0.15)" : "0 2px 8px rgba(0,0,0,0.08)",
                    padding: "16px",
                    borderLeft: `4px solid ${o.status === "atlikta" ? "#16a34a" : "#f59e0b"}`,
                    position: "relative",
                  }}>
                    {isNew && (
                      <span onClick={() => markAsSeen(o.id)} style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        backgroundColor: "#1e3a8a",
                        color: "white",
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}>
                        NAUJAS ✕
                      </span>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", paddingRight: isNew ? "60px" : 0 }}>
                      <span style={{ fontWeight: 700, color: "#1e3a8a", fontSize: "15px" }}>#{o.id} — {o.company}</span>
                    </div>
                    <div style={{
                      display: "inline-block",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 700,
                      backgroundColor: o.status === "atlikta" ? "#dcfce7" : "#fef9c3",
                      color: o.status === "atlikta" ? "#166534" : "#854d0e",
                      marginBottom: "10px",
                    }}>
                      {o.status === "atlikta" ? "✅ Atlikta" : "⏳ Laukiama"}
                    </div>
                    <div style={{ fontSize: "13px", color: "#475569", lineHeight: "1.8" }}>
                      <div>📅 <strong>Data:</strong> {o.date}</div>
                      {o.contact && <div>👤 <strong>Kontaktas:</strong> {o.contact}</div>}
                      {o.phone && <div>📞 <strong>Telefonas:</strong> <a href={`tel:${o.phone}`} style={{ color: "#1e3a8a", fontWeight: 600 }}>{o.phone}</a></div>}
                      {o.email && <div>📧 <strong>El. paštas:</strong> <a href={`mailto:${o.email}`} style={{ color: "#1e3a8a", fontWeight: 600 }}>{o.email}</a></div>}
                      <div>📦 <strong>Produktas:</strong> {o.product}</div>
                      <div>⚖️ <strong>Kiekis:</strong> {o.qty} {o.unit === "t" ? "tonos" : "kg"}</div>
                      {o.message && (
                        <div style={{ marginTop: "6px", padding: "8px 10px", backgroundColor: "rgba(0,0,0,0.03)", borderRadius: "8px", borderLeft: "3px solid #cbd5e1" }}>
                          💬 <strong>Žinutė:</strong> {o.message}
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                      <button onClick={() => toggleStatus(o.id)} style={{
                        flex: 1,
                        backgroundColor: o.status === "laukiama" ? "#16a34a" : "#f59e0b",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "13px",
                      }}>
                        {o.status === "laukiama" ? "✅ Pažymėti atlikta" : "🔄 Grąžinti laukiama"}
                      </button>
                      <button onClick={() => {
                        if (window.confirm("Ar tikrai norite ištrinti šį užsakymą?")) {
                          setOrders(prev => prev.filter(order => order.id !== o.id));
                        }
                      }} style={{
                        backgroundColor: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "13px",
                      }}>
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* Desktop: table view */
          <div style={{ overflowX: "auto", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "white", borderCollapse: "collapse", overflow: "hidden", tableLayout: "fixed", width: "100%" }}>
            <colgroup>
              <col style={{ width: "4%" }} />
              <col style={{ width: "7%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "9%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "8%" }} />
            </colgroup>
            <thead>
              <tr style={{ backgroundColor: "#1e3a8a" }}>
                {["Nr.", "Data", "Įmonė", "Kontaktinis asmuo", "Telefonas", "El. paštas", "Produktas", "Kiekis", "Vnt.", "Būsena", "Žinutė", "Veiksmas"].map(h => (
                  <th key={h} style={{ padding: "14px 12px", color: "white", fontSize: "12px", fontWeight: 700, textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
              {/* Filter row */}
              <tr style={{ backgroundColor: "#e2e8f0" }}>
                <td style={{ padding: "6px" }}><input type="text" placeholder="Nr." value={filters.id} onChange={(e) => setFilters({...filters, id: e.target.value})} style={filterInputStyle} /></td>
                <td style={{ padding: "6px" }}><input type="date" value={filters.date} onChange={(e) => setFilters({...filters, date: e.target.value})} style={filterInputStyle} /></td>
                <td style={{ padding: "6px" }}><input type="text" placeholder="Įmonė" value={filters.company} onChange={(e) => setFilters({...filters, company: e.target.value})} style={filterInputStyle} /></td>
                <td style={{ padding: "6px" }}><input type="text" placeholder="Asmuo" value={filters.contact} onChange={(e) => setFilters({...filters, contact: e.target.value})} style={filterInputStyle} /></td>
                <td style={{ padding: "6px" }}></td>
                <td style={{ padding: "6px" }}></td>
                <td style={{ padding: "6px" }}><input type="text" placeholder="Produktas" value={filters.product} onChange={(e) => setFilters({...filters, product: e.target.value})} style={filterInputStyle} /></td>
                <td style={{ padding: "6px" }}><input type="text" placeholder="Kiekis" value={filters.qty} onChange={(e) => setFilters({...filters, qty: e.target.value})} style={filterInputStyle} /></td>
                <td style={{ padding: "6px" }}>
                  <select value={filters.unit} onChange={(e) => setFilters({...filters, unit: e.target.value})} style={filterInputStyle}>
                    <option value="">Visi</option>
                    <option value="kg">kg</option>
                    <option value="t">Tonos</option>
                  </select>
                </td>
                <td style={{ padding: "6px" }}>
                  <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} style={filterInputStyle}>
                    <option value="">Visi</option>
                    <option value="laukiama">Laukiama</option>
                    <option value="atlikta">Atlikta</option>
                  </select>
                </td>
                <td style={{ padding: "6px" }}><input type="text" placeholder="Žinutė" value={filters.message} onChange={(e) => setFilters({...filters, message: e.target.value})} style={filterInputStyle} /></td>
                <td style={{ padding: "6px" }}></td>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={12} style={{ padding: "24px", textAlign: "center", color: "#64748b", fontSize: "14px" }}>
                    Nerasta užsakymų pagal pasirinktus filtrus
                  </td>
                </tr>
              ) : (
                filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((o, i) => {
                  const isNew = isNewOrder(o.id);
                  return (
                    <tr key={o.id} style={{
                      backgroundColor: isNew ? "#eff6ff" : (i % 2 === 0 ? "white" : "#f8fafc"),
                      borderBottom: "1px solid #e2e8f0",
                      borderLeft: isNew ? "3px solid #1e3a8a" : undefined,
                    }}>
                      <td style={{ padding: "10px 12px", fontSize: "13px", fontWeight: 600 }}>
                        {o.id}
                        {isNew && (
                          <span onClick={() => markAsSeen(o.id)} style={{ marginLeft: "6px", backgroundColor: "#1e3a8a", color: "white", fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "8px", verticalAlign: "top", cursor: "pointer" }} title="Pažymėti kaip matytą">
                            NEW ✕
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "10px 12px", fontSize: "13px" }}>{o.date}</td>
                      <td style={{ padding: "10px 12px", fontSize: "13px", fontWeight: 500 }}>{o.company}</td>
                      <td style={{ padding: "10px 12px", fontSize: "13px" }}>{o.contact || "—"}</td>
                      <td style={{ padding: "10px 12px", fontSize: "13px" }}>
                        {o.phone ? <a href={`tel:${o.phone}`} style={{ color: "#1e3a8a", fontWeight: 600, textDecoration: "none" }}>{o.phone}</a> : "—"}
                      </td>
                      <td style={{ padding: "10px 12px", fontSize: "12px" }}>
                        {o.email ? <a href={`mailto:${o.email}`} style={{ color: "#1e3a8a", fontWeight: 600, textDecoration: "none" }}>{o.email}</a> : "—"}
                      </td>
                      <td style={{ padding: "10px 12px", fontSize: "13px" }}>{o.product}</td>
                      <td style={{ padding: "10px 12px", fontSize: "13px", fontWeight: 600 }}>{o.qty}</td>
                      <td style={{ padding: "10px 12px", fontSize: "13px" }}>
                        <span style={{
                          display: "inline-block", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 600,
                          backgroundColor: o.unit === "t" ? "#dbeafe" : "#f0fdf4",
                          color: o.unit === "t" ? "#1e40af" : "#166534",
                        }}>
                          {o.unit === "t" ? "Tonos" : "kg"}
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{
                          display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 700,
                          backgroundColor: o.status === "atlikta" ? "#dcfce7" : "#fef9c3",
                          color: o.status === "atlikta" ? "#166534" : "#854d0e",
                        }}>
                          {o.status === "atlikta" ? "✅ Atlikta" : "⏳ Laukiama"}
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px", fontSize: "12px", color: "#475569", maxWidth: "180px" }}>
                        {o.message || "—"}
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <div style={{ display: "flex", gap: "4px", alignItems: "center", whiteSpace: "nowrap" }}>
                          <button onClick={() => toggleStatus(o.id)} style={{
                            backgroundColor: o.status === "laukiama" ? "#16a34a" : "#f59e0b",
                            color: "white", border: "none", padding: "4px 16px", borderRadius: "20px",
                            cursor: "pointer", fontWeight: 600, fontSize: "11px", whiteSpace: "nowrap",
                          }}>
                            {o.status === "laukiama" ? "Atlikta" : "Grąžinti"}
                          </button>
                          <button onClick={() => {
                            if (window.confirm("Ar tikrai norite ištrinti šį užsakymą?")) {
                              setOrders(prev => prev.filter(order => order.id !== o.id));
                            }
                          }} style={{
                            backgroundColor: "#dc2626", color: "white", border: "none",
                            padding: "4px 8px", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontSize: "11px",
                          }}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          </div>
        )}

        {/* Pagination */}
        {filteredOrders.length > ITEMS_PER_PAGE && (
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginTop: "16px" }}>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: currentPage === 1 ? "#f1f5f9" : "white", cursor: currentPage === 1 ? "default" : "pointer", fontWeight: 600, fontSize: "13px", color: currentPage === 1 ? "#94a3b8" : "#1e3a8a" }}
                    >
                      ← Atgal
                    </button>
                    <span style={{ fontSize: "14px", color: "#475569", fontWeight: 600 }}>
                      {currentPage} / {Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)} psl. (iš viso: {filteredOrders.length})
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredOrders.length / ITEMS_PER_PAGE), p + 1))}
                      disabled={currentPage >= Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)}
                      style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: currentPage >= Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) ? "#f1f5f9" : "white", cursor: currentPage >= Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) ? "default" : "pointer", fontWeight: 600, fontSize: "13px", color: currentPage >= Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) ? "#94a3b8" : "#1e3a8a" }}
                    >
                      Pirmyn →
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {/* Inactivity info */}
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginTop: "16px", backgroundColor: secondsLeft <= 60 ? "#fef2f2" : "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", transition: "background-color 0.3s" }}>
          <tbody>
            <tr>
              <td style={{ padding: "14px 24px", fontSize: "13px", color: secondsLeft <= 60 ? "#dc2626" : "#64748b", fontWeight: secondsLeft <= 60 ? 700 : 400 }}>
                ⏱️ Automatinis atsijungimas po neaktyvumo: <strong>{formatTime(secondsLeft)}</strong>
                {secondsLeft <= 60 && " — Judinkite pelę arba spauskite klavišą!"}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Expiry info card */}
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginTop: "12px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <tbody>
            <tr>
              <td style={{ padding: "20px 24px" }}>
                <h3 style={{ margin: "0 0 8px", color: "#1e3a8a", fontSize: "16px" }}>🔒 Slaptažodžio saugumas</h3>
                <p style={{ margin: 0, fontSize: "14px", color: "#475569" }}>
                  Slaptažodį reikia keisti kas {PASSWORD_EXPIRY_DAYS} dienų. 
                  {daysLeft > 0 ? (
                    <span> Iki kito keitimo liko: <strong style={{ color: daysLeft <= 7 ? "#dc2626" : "#16a34a" }}>{daysLeft} d.</strong></span>
                  ) : (
                    <span style={{ color: "#dc2626", fontWeight: 700 }}> Slaptažodis pasibaigęs! Privalote pakeisti.</span>
                  )}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Password change modal */}
      {showPasswordModal && (
        <>
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9998 }} onClick={() => !forcePasswordChange && setShowPasswordModal(false)} />
          <table cellPadding={0} cellSpacing={0} style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 9999, backgroundColor: "white", borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", width: isMobile ? "95%" : "420px" }}>
            <tbody>
              <tr>
                <td style={{ padding: "32px 28px", position: "relative" }}>
                  {!forcePasswordChange && (
                    <a href="#" onClick={(e) => { e.preventDefault(); setShowPasswordModal(false); setPwdErrors([]); setPwdSuccess(false); }} style={{ position: "absolute", top: "12px", right: "16px", color: "#94a3b8", fontSize: "22px", textDecoration: "none", fontWeight: 700 }}>✕</a>
                  )}
                  <h3 style={{ color: "#1e3a8a", fontSize: "20px", margin: "0 0 6px", textAlign: "center" }}>🔑 Keisti slaptažodį</h3>
                  {forcePasswordChange && (
                    <p style={{ color: "#dc2626", fontSize: "13px", textAlign: "center", fontWeight: 600, margin: "0 0 16px" }}>
                      ⚠️ Slaptažodis pasibaigęs. Privalote pakeisti prieš tęsiant.
                    </p>
                  )}
                  <p style={{ color: "#64748b", fontSize: "12px", margin: "0 0 16px", textAlign: "center" }}>
                    Min. 8 simboliai, mažosios ir didžiosios raidės, skaičiai
                  </p>

                  <table width="100%" cellPadding={0} cellSpacing={8}>
                    <tbody>
                      <tr><td>
                        <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>Naujas slaptažodis</p>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Įveskite naują slaptažodį" style={inputStyle} />
                      </td></tr>
                      <tr><td>
                        <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>Pakartokite slaptažodį</p>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Pakartokite slaptažodį" style={inputStyle} />
                      </td></tr>
                      {pwdErrors.length > 0 && (
                        <tr><td>
                          <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", padding: "10px 12px" }}>
                            {pwdErrors.map((e, i) => (
                              <p key={i} style={{ color: "#dc2626", fontSize: "12px", margin: i === 0 ? 0 : "4px 0 0", fontWeight: 600 }}>❌ {e}</p>
                            ))}
                          </div>
                        </td></tr>
                      )}
                      {pwdSuccess && (
                        <tr><td>
                          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px", padding: "10px 12px", textAlign: "center" }}>
                            <p style={{ color: "#166534", fontSize: "13px", margin: 0, fontWeight: 700 }}>✅ Slaptažodis sėkmingai pakeistas!</p>
                          </div>
                        </td></tr>
                      )}
                      <tr><td>
                        <button onClick={handlePasswordChange} style={{ width: "100%", backgroundColor: "#1e3a8a", color: "white", border: "none", padding: "12px", borderRadius: "8px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
                          Pakeisti slaptažodį
                        </button>
                      </td></tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Kabinetas;
