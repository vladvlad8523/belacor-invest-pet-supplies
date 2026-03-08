import { useState, useEffect } from "react";
import SiteLayout from "@/components/SiteLayout";
import { faqData, inputStyle, type Lang } from "@/data/translations";

const brandLogos = [
  { src: "/brands/kurgama.jpg", alt: "Kurgama" },
  { src: "/brands/mangusta.jpg", alt: "Mangusta" },
  { src: "/brands/siaures-centras.jpg", alt: "Šiaurės Centras" },
  { src: "/brands/client-4.png", alt: "Partner 4" },
  { src: "/brands/client-2.png", alt: "Partner 2" },
  { src: "/brands/client-6.png", alt: "Partner 6" },
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (hoveredFaq !== null) {
      setOpenFaq(hoveredFaq);
    }
  }, [hoveredFaq]);

  const [formData, setFormData] = useState({
    company: "", contact: "", phone: "", email: "", quantity: "", type: "Medis", message: "",
  });
  const [unit, setUnit] = useState<"t" | "kg">("t");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save order to localStorage for Kabinetas
    const existingOrders = JSON.parse(localStorage.getItem("belacor_orders") || "[]");
    
    let finalQty = parseFloat(formData.quantity) || 0;
    let finalUnit = unit;
    
    // Convert kg to tons if >= 1000kg
    if (unit === "kg" && finalQty >= 1000) {
      finalQty = finalQty / 1000;
      finalUnit = "t";
    }
    
    const newOrder = {
      id: existingOrders.length > 0 ? Math.max(...existingOrders.map((o: any) => o.id)) + 1 : 1,
      date: new Date().toISOString().slice(0, 10),
      company: formData.company,
      product: formData.type || "Nenurodyta",
      qty: finalQty,
      unit: finalUnit,
      status: "laukiama" as const,
    };
    localStorage.setItem("belacor_orders", JSON.stringify([...existingOrders, newOrder]));
    
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      {({ lang, t }) => {
        const faq = faqData[lang];

        return (
          <>
            {/* ===== HERO: FAQ left + Form right ===== */}
            <table width="100%" cellPadding={0} cellSpacing={0}>
              <tbody>
                {isMobile ? (
                  <>
                    {/* Mobile: Form first, then FAQ */}
                    <tr>
                      <td style={{ backgroundColor: "#f0fdf4", padding: "30px 16px", verticalAlign: "top" }}>
                        <h2 style={{ color: "#1e3a8a", fontSize: "22px", marginTop: 0, lineHeight: 1.3 }}>
                          {t.heroTitle1}<b style={{ color: "#d4af37" }}>{t.heroTitle2}</b>
                        </h2>
                        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>{t.heroSubtitle}</p>

                        {submitted ? (
                          <p style={{ color: "#16a34a", fontWeight: 700, fontSize: "18px" }}>{t.success}</p>
                        ) : (
                          <form onSubmit={handleSubmit}>
                            <table width="100%" cellPadding={0} cellSpacing={8}>
                              <tbody>
                                <tr><td>
                                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formCompany}</p>
                                  <input name="company" required value={formData.company} onChange={handleChange} placeholder={t.phCompany} style={inputStyle} />
                                </td></tr>
                                <tr><td>
                                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formContact}</p>
                                  <input name="contact" required value={formData.contact} onChange={handleChange} placeholder={t.phContact} style={inputStyle} />
                                </td></tr>
                                <tr><td>
                                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formPhone}</p>
                                  <input name="phone" required value={formData.phone} onChange={handleChange} placeholder={t.phPhone} style={inputStyle} />
                                </td></tr>
                                <tr><td>
                                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formEmail}</p>
                                  <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder={t.phEmail} style={inputStyle} />
                                </td></tr>
                                <tr><td>
                                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formQty}</p>
                                  <table cellPadding={0} cellSpacing={0} style={{ marginBottom: "8px" }}>
                                    <tbody>
                                      <tr>
                                        <td style={{ paddingRight: "16px" }}>
                                          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px", color: "#1e3a8a" }}>
                                            <input type="radio" name="unit_mobile" checked={unit === "t"} onChange={() => setUnit("t")} style={{ marginRight: "6px", accentColor: "#1e3a8a" }} />
                                            Tonos (t)
                                          </label>
                                        </td>
                                        <td>
                                          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px", color: "#1e3a8a" }}>
                                            <input type="radio" name="unit_mobile" checked={unit === "kg"} onChange={() => setUnit("kg")} style={{ marginRight: "6px", accentColor: "#1e3a8a" }} />
                                            Kilogramai (kg)
                                          </label>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <input name="quantity" required value={formData.quantity} onChange={handleChange} placeholder={unit === "t" ? "pvz. 10" : "pvz. 500"} style={inputStyle} />
                                </td></tr>
                                <tr><td>
                                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formType}</p>
                                  <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                                    {t.typeOptions.map((opt) => <option key={opt}>{opt}</option>)}
                                  </select>
                                </td></tr>
                                <tr><td>
                                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formMsg}</p>
                                  <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder={t.phMsg} style={{ ...inputStyle, resize: "vertical" as const }} />
                                </td></tr>
                                <tr><td>
                                  <button type="submit" style={{ width: "100%", backgroundColor: "#1e3a8a", color: "white", border: "none", padding: "14px", borderRadius: "8px", fontSize: "16px", fontWeight: 700, cursor: "pointer" }}>
                                    {t.formBtn}
                                  </button>
                                </td></tr>
                              </tbody>
                            </table>
                          </form>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ backgroundColor: "#f8fafc", padding: "30px 16px", verticalAlign: "top" }}>
                        <h2 style={{ color: "#1e3a8a", fontSize: "22px", marginTop: 0, marginBottom: "8px" }}>{t.faqTitle}</h2>
                        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>{t.faqSub}</p>
                      {renderFaq(faq, openFaq, setOpenFaq, hoveredFaq, setHoveredFaq)}
                      {renderBrands(t, true)}
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    {/* LEFT: FAQ */}
                    <td width="55%" style={{ verticalAlign: "top", backgroundColor: "#f8fafc", padding: "40px 30px" }}>
                      <h1 style={{ color: "#1e3a8a", fontSize: "28px", marginTop: 0, marginBottom: "8px" }}>{t.faqTitle}</h1>
                      <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>{t.faqSub}</p>
                      {renderFaq(faq, openFaq, setOpenFaq, hoveredFaq, setHoveredFaq)}
                      {renderBrands(t, false)}
                    </td>

                    {/* RIGHT: Form */}
                    <td width="45%" style={{ backgroundColor: "#f0fdf4", padding: "40px 30px", verticalAlign: "top" }}>
                      <h2 style={{ color: "#1e3a8a", fontSize: "26px", marginTop: 0, lineHeight: 1.3 }}>
                        {t.heroTitle1}<b style={{ color: "#d4af37" }}>{t.heroTitle2}</b>
                      </h2>
                      <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>{t.heroSubtitle}</p>

                      {submitted ? (
                        <p style={{ color: "#16a34a", fontWeight: 700, fontSize: "18px" }}>{t.success}</p>
                      ) : (
                        <form onSubmit={handleSubmit}>
                          <table width="100%" cellPadding={0} cellSpacing={8}>
                            <tbody>
                              <tr><td colSpan={2}>
                                <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formCompany}</p>
                                <input name="company" required value={formData.company} onChange={handleChange} placeholder={t.phCompany} style={inputStyle} />
                              </td></tr>
                              <tr><td colSpan={2}>
                                <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formContact}</p>
                                <input name="contact" required value={formData.contact} onChange={handleChange} placeholder={t.phContact} style={inputStyle} />
                              </td></tr>
                              <tr>
                                <td width="50%">
                                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formPhone}</p>
                                  <input name="phone" required value={formData.phone} onChange={handleChange} placeholder={t.phPhone} style={inputStyle} />
                                </td>
                                <td width="50%">
                                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formEmail}</p>
                                  <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder={t.phEmail} style={inputStyle} />
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2}>
                                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formQty}</p>
                                  <table cellPadding={0} cellSpacing={0} style={{ marginBottom: "8px" }}>
                                    <tbody>
                                      <tr>
                                        <td style={{ paddingRight: "20px" }}>
                                          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px", color: "#1e3a8a" }}>
                                            <input type="radio" name="unit_desktop" checked={unit === "t"} onChange={() => setUnit("t")} style={{ marginRight: "6px", accentColor: "#1e3a8a" }} />
                                            Tonos (t)
                                          </label>
                                        </td>
                                        <td>
                                          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "13px", color: "#1e3a8a" }}>
                                            <input type="radio" name="unit_desktop" checked={unit === "kg"} onChange={() => setUnit("kg")} style={{ marginRight: "6px", accentColor: "#1e3a8a" }} />
                                            Kilogramai (kg)
                                          </label>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td width="50%">
                                  <input name="quantity" required value={formData.quantity} onChange={handleChange} placeholder={unit === "t" ? "pvz. 10" : "pvz. 500"} style={inputStyle} />
                                </td>
                                <td width="50%">
                                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formType}</p>
                                  <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                                    {t.typeOptions.map((opt) => <option key={opt}>{opt}</option>)}
                                  </select>
                                </td>
                              </tr>
                              <tr><td colSpan={2}>
                                <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formMsg}</p>
                                <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder={t.phMsg} style={{ ...inputStyle, resize: "vertical" as const }} />
                              </td></tr>
                              <tr><td colSpan={2}>
                                <button type="submit" style={{ width: "100%", backgroundColor: "#1e3a8a", color: "white", border: "none", padding: "14px", borderRadius: "8px", fontSize: "16px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.5px" }}>
                                  {t.formBtn}
                                </button>
                              </td></tr>
                            </tbody>
                          </table>
                        </form>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </>
        );
      }}
    </SiteLayout>
  );
};

function renderFaq(
  faq: { q: string; a: string }[],
  openFaq: number | null,
  setOpenFaq: (v: number | null) => void,
  hoveredFaq: number | null,
  setHoveredFaq: (v: number | null) => void,
) {
  return (
    <table width="100%" cellPadding={0} cellSpacing={10}>
      <tbody>
        {faq.map((item, i) => (
          <tr key={i}>
            <td>
              <table
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: openFaq === i ? "0 2px 12px rgba(30,58,138,0.12)" : "0 1px 6px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  border: openFaq === i ? "1px solid #1e3a8a" : "1px solid transparent",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                onMouseEnter={() => setHoveredFaq(i)}
                onMouseLeave={() => setHoveredFaq(null)}
              >
                <tbody>
                  <tr>
                    <td style={{ padding: "16px 20px" }}>
                      <table width="100%" cellPadding={0} cellSpacing={0}>
                        <tbody>
                          <tr>
                            <td style={{ color: "#1e3a8a", fontSize: "15px", fontWeight: 700 }}>
                              {item.q}
                            </td>
                            <td width="30" style={{ textAlign: "right", color: "#d4af37", fontSize: "20px", fontWeight: 700 }}>
                              {openFaq === i ? "−" : "+"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {openFaq === i && (
                        <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.7, marginTop: "10px", marginBottom: 0 }}>
                          {item.a}
                        </p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function renderBrands(t: any, isMobile: boolean) {
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginTop: "24px" }}>
      <tbody>
        <tr>
          <td style={{ textAlign: "center" }}>
            <h2 style={{ color: "#1e3a8a", fontSize: isMobile ? "20px" : "22px", marginTop: 0, marginBottom: "16px" }}>{t.brandsTitle}</h2>
            <table cellPadding={0} cellSpacing={isMobile ? 6 : 12} style={{ margin: "0 auto" }}>
              <tbody>
                {isMobile ? (
                  <>
                    <tr>
                      {brandLogos.slice(0, 3).map((logo) => (
                        <td key={logo.alt} style={{ padding: "4px", verticalAlign: "middle" }}>
                          <img src={logo.src} alt={logo.alt} style={{ height: "36px", maxWidth: "65px", objectFit: "contain", opacity: 0.8 }} />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {brandLogos.slice(3).map((logo) => (
                        <td key={logo.alt} style={{ padding: "4px", verticalAlign: "middle" }}>
                          <img src={logo.src} alt={logo.alt} style={{ height: "36px", maxWidth: "65px", objectFit: "contain", opacity: 0.8 }} />
                        </td>
                      ))}
                    </tr>
                  </>
                ) : (
                  <tr>
                    {brandLogos.map((logo) => (
                      <td key={logo.alt} style={{ padding: "6px", verticalAlign: "middle" }}>
                        <img src={logo.src} alt={logo.alt} style={{ height: "50px", maxWidth: "100px", objectFit: "contain", opacity: 0.8 }} />
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Index;
