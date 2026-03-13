import { useState } from "react";
import { inputStyle } from "@/data/translations";

const ContactFormSection = ({ t, isMobile }: { t: any; isMobile: boolean }) => {
  const [formData, setFormData] = useState({
    company: "", contact: "", phone: "", email: "", quantity: "", type: "Medis", message: "",
  });
  const [unit, setUnit] = useState<"t" | "kg">("t");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "quantity") {
      if (value === "" || /^\d*[.,]?\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingOrders = JSON.parse(localStorage.getItem("belacor_orders") || "[]");
    let finalQty = parseFloat(formData.quantity) || 0;
    let finalUnit = unit;
    if (unit === "kg" && finalQty >= 1000) {
      finalQty = finalQty / 1000;
      finalUnit = "t";
    }
    const newOrder = {
      id: existingOrders.length > 0 ? Math.max(...existingOrders.map((o: any) => o.id)) + 1 : 1,
      date: new Date().toISOString().slice(0, 10),
      company: formData.company,
      contact: formData.contact || "",
      phone: formData.phone || "",
      email: formData.email || "",
      product: formData.type || "Nenurodyta",
      qty: finalQty,
      unit: finalUnit,
      status: "laukiama" as const,
      message: formData.message || "",
    };
    localStorage.setItem("belacor_orders", JSON.stringify([...existingOrders, newOrder]));
    setSubmitted(true);
  };

  const fieldStyle: React.CSSProperties = {
    ...inputStyle,
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    padding: "12px 14px",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div
      id="contact-form"
      style={{
        backgroundColor: "#f0fdf4",
        padding: isMobile ? "40px 16px" : "60px 60px",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2
            style={{
              color: "#1e3a8a",
              fontSize: isMobile ? "24px" : "32px",
              fontWeight: 900,
              margin: "0 0 8px",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {t.heroTitle1}
            <span style={{ color: "#d4af37" }}>{t.heroTitle2}</span>
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>{t.heroSubtitle}</p>
        </div>

        {submitted ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <p style={{ color: "#16a34a", fontWeight: 700, fontSize: "20px" }}>{t.success}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              padding: isMobile ? "24px 16px" : "32px 36px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <label style={labelStyle}>{t.formCompany}</label>
                <input name="company" required value={formData.company} onChange={handleChange} placeholder={t.phCompany} style={fieldStyle} />
              </div>
              <div>
                <label style={labelStyle}>{t.formContact}</label>
                <input name="contact" required value={formData.contact} onChange={handleChange} placeholder={t.phContact} style={fieldStyle} />
              </div>
              <div>
                <label style={labelStyle}>{t.formPhone}</label>
                <input name="phone" required value={formData.phone} onChange={handleChange} placeholder={t.phPhone} style={fieldStyle} />
              </div>
              <div>
                <label style={labelStyle}>{t.formEmail}</label>
                <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder={t.phEmail} style={fieldStyle} />
              </div>
              <div>
                <label style={labelStyle}>{t.formQty}</label>
                <div style={{ display: "flex", gap: "16px", marginBottom: "8px" }}>
                  <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px", color: "#1e3a8a" }}>
                    <input type="radio" name="unit" checked={unit === "t"} onChange={() => setUnit("t")} style={{ marginRight: "6px", accentColor: "#1e3a8a" }} />
                    Tonos (t)
                  </label>
                  <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px", color: "#1e3a8a" }}>
                    <input type="radio" name="unit" checked={unit === "kg"} onChange={() => setUnit("kg")} style={{ marginRight: "6px", accentColor: "#1e3a8a" }} />
                    Kilogramai (kg)
                  </label>
                </div>
                <input name="quantity" required value={formData.quantity} onChange={handleChange} placeholder={unit === "t" ? "pvz. 10" : "pvz. 500"} style={fieldStyle} />
              </div>
              <div>
                <label style={labelStyle}>{t.formType}</label>
                <select name="type" value={formData.type} onChange={handleChange} style={fieldStyle}>
                  {t.typeOptions.map((opt: string) => <option key={opt}>{opt}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: isMobile ? undefined : "1 / -1" }}>
                <label style={labelStyle}>{t.formMsg}</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder={t.phMsg} style={{ ...fieldStyle, resize: "vertical" as const }} />
              </div>
              <div style={{ gridColumn: isMobile ? undefined : "1 / -1" }}>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#1e3a8a",
                    color: "white",
                    border: "none",
                    padding: "14px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.5px",
                  }}
                >
                  {t.formBtn}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  display: "block",
  margin: "0 0 4px",
  fontWeight: 600,
  fontSize: "13px",
  color: "#1e3a8a",
};

export default ContactFormSection;
