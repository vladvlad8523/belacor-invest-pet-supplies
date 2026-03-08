import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import belacorLogo from "@/assets/belacor-logo.jpg";

interface Order {
  id: number;
  date: string;
  company: string;
  contact?: string;
  product: string;
  qty: number;
  unit: "kg" | "t";
  status: "laukiama" | "atlikta";
  message?: string;
}

const PASSWORD_KEY = "belacor_admin_password";
const PASSWORD_CHANGED_KEY = "belacor_password_changed_at";
const PASSWORD_EXPIRY_DAYS = 30;

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
  if (!changedDate) return 0; // force change
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

const Kabinetas = () => {
  const navigate = useNavigate();
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
    // Check password expiry
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

  // Reset page when filters change
  useEffect(() => { setCurrentPage(1); }, [filters]);

  // Filtered orders
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

  const isMobile = window.innerWidth < 768;
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
                      <span style={{ color: "#d4af37", fontWeight: 700, fontSize: "18px", verticalAlign: "middle" }}>Administravimo kabinetas</span>
                    </td>
                    <td style={{ textAlign: "right", verticalAlign: "middle" }}>
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
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "16px" : "32px" }}>
        {/* Actions bar */}
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: "20px" }}>
          <tbody>
            <tr>
              <td>
                <h2 style={{ margin: 0, color: "#1e3a8a", fontSize: "22px" }}>📦 Užsakymai ({filteredOrders.length}/{orders.length})</h2>
              </td>
              <td style={{ textAlign: "right" }}>
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

        {/* Orders table */}
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "white", borderCollapse: "collapse", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <thead>
            <tr style={{ backgroundColor: "#1e3a8a" }}>
              {["Nr.", "Data", "Įmonė", "Kontaktinis asmuo", "Produktas", "Kiekis", "Vnt.", "Būsena", "Žinutė", "Veiksmas"].map(h => (
                <th key={h} style={{ padding: "14px 16px", color: "white", fontSize: "13px", fontWeight: 700, textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
            {/* Filter row */}
            <tr style={{ backgroundColor: "#e2e8f0" }}>
              <td style={{ padding: "8px" }}>
                <input type="text" placeholder="Nr." value={filters.id} onChange={(e) => setFilters({...filters, id: e.target.value})} style={filterInputStyle} />
              </td>
              <td style={{ padding: "8px" }}>
                <input type="date" value={filters.date} onChange={(e) => setFilters({...filters, date: e.target.value})} style={filterInputStyle} />
              </td>
              <td style={{ padding: "8px" }}>
                <input type="text" placeholder="Įmonė" value={filters.company} onChange={(e) => setFilters({...filters, company: e.target.value})} style={filterInputStyle} />
              </td>
              <td style={{ padding: "8px" }}>
                <input type="text" placeholder="Asmuo" value={filters.contact} onChange={(e) => setFilters({...filters, contact: e.target.value})} style={filterInputStyle} />
              </td>
              <td style={{ padding: "8px" }}>
                <input type="text" placeholder="Produktas" value={filters.product} onChange={(e) => setFilters({...filters, product: e.target.value})} style={filterInputStyle} />
              </td>
              <td style={{ padding: "8px" }}>
                <input type="text" placeholder="Kiekis" value={filters.qty} onChange={(e) => setFilters({...filters, qty: e.target.value})} style={filterInputStyle} />
              </td>
              <td style={{ padding: "8px" }}>
                <select value={filters.unit} onChange={(e) => setFilters({...filters, unit: e.target.value})} style={filterInputStyle}>
                  <option value="">Visi</option>
                  <option value="kg">kg</option>
                  <option value="t">Tonos</option>
                </select>
              </td>
              <td style={{ padding: "8px" }}>
                <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} style={filterInputStyle}>
                  <option value="">Visi</option>
                  <option value="laukiama">Laukiama</option>
                  <option value="atlikta">Atlikta</option>
                </select>
              </td>
              <td style={{ padding: "8px" }}>
                <input type="text" placeholder="Žinutė" value={filters.message} onChange={(e) => setFilters({...filters, message: e.target.value})} style={filterInputStyle} />
              </td>
              <td style={{ padding: "8px" }}></td>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ padding: "24px", textAlign: "center", color: "#64748b", fontSize: "14px" }}>
                  Nerasta užsakymų pagal pasirinktus filtrus
                </td>
              </tr>
            ) : (
              filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((o, i) => (
                <tr key={o.id} style={{ backgroundColor: i % 2 === 0 ? "white" : "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 600 }}>{o.id}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px" }}>{o.date}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 500 }}>{o.company}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px" }}>{o.contact || "—"}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px" }}>{o.product}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 600 }}>{o.qty}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: 600,
                      backgroundColor: o.unit === "t" ? "#dbeafe" : "#f0fdf4",
                      color: o.unit === "t" ? "#1e40af" : "#166534",
                    }}>
                      {o.unit === "t" ? "Tonos" : "kg"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      backgroundColor: o.status === "atlikta" ? "#dcfce7" : "#fef9c3",
                      color: o.status === "atlikta" ? "#166534" : "#854d0e",
                    }}>
                      {o.status === "atlikta" ? "✅ Atlikta" : "⏳ Laukiama"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#475569", maxWidth: "200px" }}>
                    {o.message || "—"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <button onClick={() => toggleStatus(o.id)} style={{
                        backgroundColor: o.status === "laukiama" ? "#16a34a" : "#f59e0b",
                        color: "white",
                        border: "none",
                        padding: "6px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "12px",
                      }}>
                        {o.status === "laukiama" ? "Pažymėti atlikta" : "Grąžinti laukiama"}
                      </button>
                      {o.status === "atlikta" ? (
                        <button onClick={() => {
                          if (window.confirm("Ar tikrai norite ištrinti šį užsakymą?")) {
                            setOrders(prev => prev.filter(order => order.id !== o.id));
                          }
                        }} style={{
                          backgroundColor: "#dc2626",
                          color: "white",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: "12px",
                        }}>
                          🗑️
                        </button>
                      ) : (
                        <button disabled style={{
                          backgroundColor: "#e2e8f0",
                          color: "#94a3b8",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "6px",
                          cursor: "not-allowed",
                          fontWeight: 600,
                          fontSize: "12px",
                        }}>
                          🗑️
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

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

        {/* Expiry info card */}
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginTop: "24px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
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
