import { useState, useEffect } from "react";
import SiteLayout from "@/components/SiteLayout";
import { faqData, inputStyle, type Lang } from "@/data/translations";

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null);

  // Auto-open FAQ on hover
  useEffect(() => {
    if (hoveredFaq !== null) {
      setOpenFaq(hoveredFaq);
    }
  }, [hoveredFaq]);

  const [formData, setFormData] = useState({
    company: "", contact: "", phone: "", email: "", quantity: "", type: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <SiteLayout>
      {({ lang, t }) => {
        const faq = faqData[lang];

        return (
          <>
            {/* ===== HERO: FAQ left + Form right ===== */}
            <table width="100%" cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  {/* LEFT: FAQ */}
                  <td width="55%" style={{ verticalAlign: "top", backgroundColor: "#f8fafc", padding: "40px 30px" }}>
                    <h1 style={{ color: "#1e3a8a", fontSize: "28px", marginTop: 0, marginBottom: "8px" }}>{t.faqTitle}</h1>
                    <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>{t.faqSub}</p>

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
                              <td width="50%">
                                <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formQty}</p>
                                <input name="quantity" required value={formData.quantity} onChange={handleChange} placeholder={t.phQty} style={inputStyle} />
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
              </tbody>
            </table>
          </>
        );
      }}
    </SiteLayout>
  );
};

export default Index;
