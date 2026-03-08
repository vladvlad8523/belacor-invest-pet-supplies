import { useState, useEffect } from "react";
import SiteLayout from "@/components/SiteLayout";
import { inputStyle } from "@/data/translations";

const Kontaktai = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <SiteLayout>
      {({ lang, t }) => (
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "white" }}>
          <tbody>
            <tr>
              <td style={{ padding: isMobile ? "30px 16px" : "50px 30px" }}>
                <table width={isMobile ? "100%" : "90%"} cellPadding={0} cellSpacing={0} style={{ margin: "0 auto" }}>
                  <tbody>
                    {isMobile ? (
                      <>
                        <tr>
                          <td style={{ verticalAlign: "top", paddingBottom: "30px" }}>
                            <h1 style={{ color: "#1e3a8a", fontSize: "24px", marginTop: 0, marginBottom: "24px" }}>{t.footerContacts}</h1>
                            {renderContactInfo(t)}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ verticalAlign: "top", backgroundColor: "#f0fdf4", padding: "24px 16px", borderRadius: "12px" }}>
                            <ContactForm t={t} />
                          </td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td width="50%" style={{ verticalAlign: "top", padding: "0 30px 0 0" }}>
                          <h1 style={{ color: "#1e3a8a", fontSize: "32px", marginTop: 0, marginBottom: "30px" }}>{t.footerContacts}</h1>
                          {renderContactInfo(t)}
                        </td>
                        <td width="50%" style={{ verticalAlign: "top", backgroundColor: "#f0fdf4", padding: "30px", borderRadius: "12px" }}>
                          <ContactForm t={t} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr><td style={{ height: "40px" }}></td></tr>
          </tbody>
        </table>
      )}
    </SiteLayout>
  );
};

function renderContactInfo(t: any) {
  return (
    <>
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: "24px" }}>
        <tbody><tr><td>
          <h3 style={{ color: "#1e3a8a", fontSize: "18px", margin: "0 0 10px" }}>🕐 {t.workHoursTitle}</h3>
          <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.8, margin: 0 }}>
            {t.workHours1}<br />{t.workHours2}<br />{t.workHours3}
          </p>
        </td></tr></tbody>
      </table>
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: "24px" }}>
        <tbody><tr><td>
          <h3 style={{ color: "#1e3a8a", fontSize: "18px", margin: "0 0 10px" }}>📋 {t.reqTitle}</h3>
          <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.8, margin: 0 }}>
            {t.reqCompany}<br />
            {t.reqAddress.split("\n").map((line: string, i: number) => <span key={i}>{line}<br /></span>)}
            {t.reqCode}<br />{t.reqVat}
          </p>
        </td></tr></tbody>
      </table>
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: "24px" }}>
        <tbody><tr><td>
          <h3 style={{ color: "#1e3a8a", fontSize: "18px", margin: "0 0 10px" }}>📞 {t.contactTitle}</h3>
          <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.8, margin: 0 }}>
            {t.contactOrders} <a href="tel:+37068853541" style={{ color: "#1e3a8a", fontWeight: 700 }}>+370 688 53541</a><br />
            {t.contactEmail} <a href="mailto:info@belacor.lt" style={{ color: "#1e3a8a", fontWeight: 700 }}>info@belacor.lt</a>
          </p>
        </td></tr></tbody>
      </table>
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody><tr><td>
          <h3 style={{ color: "#1e3a8a", fontSize: "18px", margin: "0 0 10px" }}>📍 {t.howToGet}</h3>
          <p style={{ color: "#475569", fontSize: "14px", margin: 0 }}>Islandijos pl. 95-57, LT-49176 Kaunas</p>
        </td></tr></tbody>
      </table>
    </>
  );
}

const errorStyle: React.CSSProperties = { color: "#dc2626", fontSize: "12px", margin: "4px 0 0", fontWeight: 600 };

function ContactForm({ t }: { t: any }) {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState<"kg" | "t">("t");
  const [type, setType] = useState("");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!company.trim()) errs.company = "Privalomas laukas";
    if (!contact.trim()) errs.contact = "Privalomas laukas";

    // Phone: must contain digits, optional + at start, min 6 digits
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      errs.phone = "Privalomas laukas";
    } else if (phoneDigits.length < 6 || !/^\+?[\d\s\-()]+$/.test(phone.trim())) {
      errs.phone = "Neteisingas telefono numeris";
    }

    // Email validation
    if (!email.trim()) {
      errs.email = "Privalomas laukas";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Neteisingas el. pašto adresas";
    }

    // Qty: numbers only
    if (!qty.trim()) {
      errs.qty = "Privalomas laukas";
    } else if (!/^\d+([.,]\d+)?$/.test(qty.trim())) {
      errs.qty = "Tik skaičiai";
    }

    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // Save order to localStorage for Kabinetas
      const existingOrders = JSON.parse(localStorage.getItem("belacor_orders") || "[]");
      const newOrder = {
        id: existingOrders.length > 0 ? Math.max(...existingOrders.map((o: any) => o.id)) + 1 : 1,
        date: new Date().toISOString().slice(0, 10),
        company: company,
        product: type || "Nenurodyta",
        qty: parseFloat(qty) || 0,
        unit: unit,
        status: "laukiama" as const,
      };
      localStorage.setItem("belacor_orders", JSON.stringify([...existingOrders, newOrder]));
      
      setSubmitted(true);
      // Reset
      setCompany(""); setContact(""); setPhone(""); setEmail("");
      setQty(""); setType(""); setMsg("");
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <p style={{ fontSize: "48px", margin: "0 0 12px" }}>✅</p>
        <h3 style={{ color: "#166534", fontSize: "20px", margin: "0 0 8px" }}>{t.success || "Užklausa išsiųsta!"}</h3>
        <p style={{ color: "#475569", fontSize: "14px" }}>Susisieksime su jumis artimiausiu metu.</p>
        <button onClick={() => setSubmitted(false)} style={{ marginTop: "16px", backgroundColor: "#1e3a8a", color: "white", border: "none", padding: "10px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: 700 }}>
          Nauja užklausa
        </button>
      </div>
    );
  }

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "auto" as const,
    cursor: "pointer",
  };

  return (
    <>
      <h2 style={{ color: "#1e3a8a", fontSize: "24px", marginTop: 0, marginBottom: "8px" }}>
        {t.heroTitle1}<b style={{ color: "#d4af37" }}>{t.heroTitle2}</b>
      </h2>
      <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>{t.heroSubtitle}</p>
      <table width="100%" cellPadding={0} cellSpacing={8}>
        <tbody>
          <tr><td>
            <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formCompany}</p>
            <input value={company} onChange={e => setCompany(e.target.value)} placeholder={t.phCompany} style={{ ...inputStyle, borderColor: errors.company ? "#dc2626" : undefined }} />
            {errors.company && <p style={errorStyle}>❌ {errors.company}</p>}
          </td></tr>
          <tr><td>
            <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formContact}</p>
            <input value={contact} onChange={e => setContact(e.target.value)} placeholder={t.phContact} style={{ ...inputStyle, borderColor: errors.contact ? "#dc2626" : undefined }} />
            {errors.contact && <p style={errorStyle}>❌ {errors.contact}</p>}
          </td></tr>
          <tr><td>
            <table width="100%" cellPadding={0} cellSpacing={0}>
              <tbody><tr>
                <td width="48%">
                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formPhone}</p>
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.phPhone} type="tel" style={{ ...inputStyle, borderColor: errors.phone ? "#dc2626" : undefined }} />
                  {errors.phone && <p style={errorStyle}>❌ {errors.phone}</p>}
                </td>
                <td width="4%"></td>
                <td width="48%">
                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formEmail}</p>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder={t.phEmail} type="email" style={{ ...inputStyle, borderColor: errors.email ? "#dc2626" : undefined }} />
                  {errors.email && <p style={errorStyle}>❌ {errors.email}</p>}
                </td>
              </tr></tbody>
            </table>
          </td></tr>
          <tr><td>
            <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formQty}</p>
            <div style={{ display: "flex", gap: "16px", marginBottom: "8px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "14px", fontWeight: unit === "t" ? 700 : 400, color: unit === "t" ? "#1e3a8a" : "#475569" }}>
                <input type="radio" name="unit" value="t" checked={unit === "t"} onChange={() => setUnit("t")} style={{ accentColor: "#1e3a8a", width: "16px", height: "16px" }} />
                Tonos (t)
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "14px", fontWeight: unit === "kg" ? 700 : 400, color: unit === "kg" ? "#1e3a8a" : "#475569" }}>
                <input type="radio" name="unit" value="kg" checked={unit === "kg"} onChange={() => setUnit("kg")} style={{ accentColor: "#1e3a8a", width: "16px", height: "16px" }} />
                Kilogramai (kg)
              </label>
            </div>
            <input
              value={qty}
              onChange={e => {
                const val = e.target.value;
                if (val === "" || /^\d*[.,]?\d*$/.test(val)) setQty(val);
              }}
              placeholder={`Įveskite kiekį (${unit})`}
              inputMode="decimal"
              style={{ ...inputStyle, borderColor: errors.qty ? "#dc2626" : undefined }}
            />
            {errors.qty && <p style={errorStyle}>❌ {errors.qty}</p>}
          </td></tr>
          <tr><td>
            <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formType}</p>
            <select value={type} onChange={e => setType(e.target.value)} style={selectStyle}>
              <option value="">-- Pasirinkite --</option>
              {(t.typeOptions || []).map((opt: string) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </td></tr>
          <tr><td>
            <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formMsg}</p>
            <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={3} placeholder={t.phMsg} style={{ ...inputStyle, resize: "vertical" as const }} />
          </td></tr>
          <tr><td>
            <button type="button" onClick={handleSubmit} style={{ width: "100%", backgroundColor: "#1e3a8a", color: "white", border: "none", padding: "14px", borderRadius: "8px", fontSize: "16px", fontWeight: 700, cursor: "pointer" }}>
              {t.formBtn}
            </button>
            {Object.keys(errors).length > 0 && (
              <div style={{ marginTop: "12px", padding: "12px", backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px" }}>
                <p style={{ margin: 0, color: "#dc2626", fontSize: "13px", fontWeight: 600 }}>⚠️ Prašome pataisyti klaidas aukščiau pažymėtuose laukuose</p>
              </div>
            )}
          </td></tr>
        </tbody>
      </table>
    </>
  );
}

export default Kontaktai;
