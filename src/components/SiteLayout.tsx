import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import belacorLogo from "@/assets/belacor-logo.jpg";
import { translations, langLabels, inputStyle, type Lang } from "@/data/translations";

interface SiteLayoutProps {
  children: (props: { lang: Lang; t: typeof translations["lt"] }) => React.ReactNode;
}

const SiteLayout = ({ children }: SiteLayoutProps) => {
  const [lang, setLang] = useState<Lang>("lt");
  const t = translations[lang];
  const navigate = useNavigate();
  const location = useLocation();

  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [hasPromo] = useState(false); // set true when there's an active promo

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setShowCookieModal(true);
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowCookieModal(false);
  };
  const handleCookieReject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setShowCookieModal(false);
  };

  const navRoutes = ["/privalumai", "/produktai", "/kontaktai"];

  return (
    <>
      {/* ===== PROMO BANNER / SHOP CTA ===== */}
      {showPromoBanner && (
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: hasPromo ? "linear-gradient(90deg, #b91c1c 0%, #dc2626 50%, #b91c1c 100%)" : "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)" }}>
          <tbody>
            <tr>
              <td style={{ padding: "10px 40px", textAlign: "center", position: "relative" }}>
                {hasPromo ? (
                  <p style={{ color: "white", fontSize: "14px", fontWeight: 700, margin: 0, letterSpacing: "0.5px" }}>
                    {t.promoBanner}
                  </p>
                ) : (
                  <p style={{ color: "white", fontSize: "14px", fontWeight: 700, margin: 0, letterSpacing: "0.5px" }}>
                    {t.shopCta}{" "}
                    <a href="https://www.belacor.lt/" target="_blank" rel="noopener noreferrer" style={{ color: "#d4af37", textDecoration: "underline", marginLeft: "8px" }}>
                      {t.shopCtaBtn}
                    </a>
                  </p>
                )}
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setShowPromoBanner(false); }}
                  style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", color: "white", textDecoration: "none", fontSize: "18px", fontWeight: 700, opacity: 0.8 }}
                >
                  ✕
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* ===== HEADER (WHITE) ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "white", borderBottom: "2px solid #e2e8f0" }}>
        <tbody>
          <tr>
            <td style={{ padding: "12px 20px" }}>
              <table width="100%" cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td width="40%" style={{ verticalAlign: "middle" }}>
                      <table cellPadding={0} cellSpacing={0}>
                        <tbody>
                          <tr>
                            <td style={{ verticalAlign: "middle", cursor: "pointer" }} onClick={() => navigate("/")}>
                              <img src={belacorLogo} alt="Belacor invest logo" style={{ height: "45px", display: "block" }} />
                            </td>
                            <td style={{ paddingLeft: "16px", verticalAlign: "middle" }}>
                              <table cellPadding={0} cellSpacing={0} style={{ borderRadius: "6px", overflow: "hidden", border: "1px solid #cbd5e1" }}>
                                <tbody>
                                  <tr>
                                    {langLabels.map((l) => (
                                      <td
                                        key={l}
                                        onClick={() => setLang(l)}
                                        style={{
                                          padding: "5px 8px",
                                          cursor: "pointer",
                                          backgroundColor: lang === l ? "#1e3a8a" : "transparent",
                                          color: lang === l ? "white" : "#1e3a8a",
                                          fontSize: "12px",
                                          fontWeight: 700,
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        {l}
                                      </td>
                                    ))}
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td width="60%" style={{ textAlign: "right", verticalAlign: "middle" }}>
                      <table cellPadding={0} cellSpacing={0} style={{ display: "inline-table" }}>
                        <tbody>
                          <tr>
                            {t.nav.map((item, i) => (
                              <td key={item} style={{ padding: "0 4px" }}>
                                <a
                                  href={navRoutes[i]}
                                  onClick={(e) => { e.preventDefault(); navigate(navRoutes[i]); }}
                                  style={{
                                    color: location.pathname === navRoutes[i] ? "#1e3a8a" : "#475569",
                                    backgroundColor: location.pathname === navRoutes[i] ? "#f0f4ff" : "transparent",
                                    border: "1px solid " + (location.pathname === navRoutes[i] ? "#1e3a8a" : "#cbd5e1"),
                                    padding: "9px 16px",
                                    borderRadius: "6px",
                                    textDecoration: "none",
                                    fontWeight: 600,
                                    fontSize: "13px",
                                    display: "inline-block",
                                  }}
                                >
                                  {item}
                                </a>
                              </td>
                            ))}
                            <td style={{ padding: "0 4px" }}>
                              <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setShowLoginModal(true); }}
                                style={{
                                  color: "white",
                                  backgroundColor: "#1e3a8a",
                                  border: "none",
                                  padding: "9px 20px",
                                  borderRadius: "6px",
                                  textDecoration: "none",
                                  fontWeight: 700,
                                  fontSize: "13px",
                                  display: "inline-block",
                                }}
                              >
                                🔐 {t.login}
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== PAGE CONTENT ===== */}
      {children({ lang, t })}

      {/* ===== FOOTER ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#1e3a8a" }}>
        <tbody>
          <tr>
            <td style={{ padding: "40px 40px 20px" }}>
              <table width="100%" cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td width="25%" style={{ verticalAlign: "top", color: "white", padding: "0 10px" }}>
                      <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0, marginBottom: "12px" }}>🕐 {t.workHoursTitle}</h3>
                      <p style={{ fontSize: "13px", opacity: 0.85, lineHeight: 1.8, margin: 0 }}>
                        {t.workHours1}<br />{t.workHours2}<br />{t.workHours3}
                      </p>
                    </td>
                    <td width="25%" style={{ verticalAlign: "top", color: "white", padding: "0 10px" }}>
                      <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0, marginBottom: "12px" }}>📋 {t.reqTitle}</h3>
                      <p style={{ fontSize: "13px", opacity: 0.85, lineHeight: 1.8, margin: 0 }}>
                        {t.reqCompany}<br />
                        {t.reqAddress.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}
                        {t.reqCode}<br />{t.reqVat}
                      </p>
                    </td>
                    <td width="25%" style={{ verticalAlign: "top", color: "white", padding: "0 10px" }}>
                      <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0, marginBottom: "12px" }}>📞 {t.contactTitle}</h3>
                      <p style={{ fontSize: "13px", opacity: 0.85, lineHeight: 1.8, margin: 0 }}>
                        {t.contactOrders}<br />
                        <a href="tel:+37068853541" style={{ color: "#d4af37", textDecoration: "none" }}>+370 688 53541</a><br />
                        {t.contactEmail}<br />
                        <a href="mailto:info@belacor.lt" style={{ color: "#d4af37", textDecoration: "none" }}>info@belacor.lt</a>
                      </p>
                    </td>
                    <td width="25%" style={{ verticalAlign: "top", color: "white", padding: "0 10px", textAlign: "right" }}>
                      <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0, marginBottom: "12px" }}>{t.footerSocial}</h3>
                      <p style={{ fontSize: "20px", margin: 0 }}>
                        <a href="#" style={{ color: "white", textDecoration: "none", marginRight: "12px" }}>📘</a>
                        <a href="#" style={{ color: "white", textDecoration: "none", marginRight: "12px" }}>📸</a>
                        <a href="#" style={{ color: "white", textDecoration: "none" }}>🔗</a>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={{ borderTop: "1px solid rgba(255,255,255,0.15)", padding: "16px 40px", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: 0 }}>{t.footerCopy}</p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== SCROLL TO TOP ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f0fdf4" }}>
        <tbody>
          <tr>
            <td style={{ textAlign: "center", padding: "16px" }}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{ display: "inline-block", backgroundColor: "#1e3a8a", color: "white", padding: "12px 28px", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "14px" }}
              >
                ⬆ {t.backToTop}
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== LOGIN MODAL ===== */}
      {showLoginModal && (
        <>
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 9998, backgroundColor: "rgba(0,0,0,0.5)" }}>
            <tbody><tr><td></td></tr></tbody>
          </table>
          <table cellPadding={0} cellSpacing={0} style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 9999, backgroundColor: "white", borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", width: "400px", maxWidth: "90%" }}>
            <tbody>
              <tr>
                <td style={{ padding: "32px 28px 20px", position: "relative" }}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setShowLoginModal(false); }} style={{ position: "absolute", top: "12px", right: "16px", color: "#94a3b8", fontSize: "22px", textDecoration: "none", fontWeight: 700, lineHeight: 1 }}>✕</a>
                  <h3 style={{ color: "#1e3a8a", fontSize: "22px", margin: "0 0 6px", textAlign: "center" }}>🔐 {t.loginTitle}</h3>
                  <p style={{ color: "#64748b", fontSize: "13px", textAlign: "center", marginBottom: "20px" }}>Belacor invest B2B</p>
                  <table width="100%" cellPadding={0} cellSpacing={8}>
                    <tbody>
                      <tr><td>
                        <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.loginEmail}</p>
                        <input type="email" placeholder="info@company.com" style={inputStyle} />
                      </td></tr>
                      <tr><td>
                        <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.loginPass}</p>
                        <input type="password" placeholder="••••••••" style={inputStyle} />
                      </td></tr>
                      <tr><td>
                        <button onClick={() => setShowLoginModal(false)} style={{ width: "100%", backgroundColor: "#1e3a8a", color: "white", border: "none", padding: "12px", borderRadius: "8px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
                          {t.loginBtn}
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

      {/* ===== COOKIE CONSENT ===== */}
      {showCookieModal && (
        <>
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 9998, backgroundColor: "rgba(0,0,0,0.5)" }}>
            <tbody><tr><td></td></tr></tbody>
          </table>
          <table cellPadding={0} cellSpacing={0} style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 9999, backgroundColor: "white", borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", width: "440px", maxWidth: "90%" }}>
            <tbody>
              <tr>
                <td style={{ padding: "32px 28px 20px", textAlign: "center", position: "relative" }}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setShowCookieModal(false); }} style={{ position: "absolute", top: "12px", right: "16px", color: "#94a3b8", fontSize: "22px", textDecoration: "none", fontWeight: 700, lineHeight: 1 }}>✕</a>
                  <p style={{ fontSize: "36px", margin: "0 0 12px" }}>🍪</p>
                  <h3 style={{ color: "#1e3a8a", fontSize: "20px", margin: "0 0 12px" }}>
                    {lang === "lt" ? "Slapukų nustatymai" : lang === "ru" ? "Настройки файлов cookie" : lang === "lv" ? "Sīkdatņu iestatījumi" : lang === "et" ? "Küpsiste seaded" : "Cookie Settings"}
                  </h3>
                  <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.6, margin: "0 0 20px" }}>
                    {lang === "lt" ? "Mes naudojame būtinus slapukus kontaktinės formos veikimui ir Google Analytics slapukus svetainės lankomumo analizei."
                      : lang === "ru" ? "Мы используем необходимые файлы cookie для работы формы и Google Analytics для анализа посещаемости."
                      : lang === "lv" ? "Mēs izmantojam nepieciešamās sīkdatnes kontaktformas darbībai un Google Analytics sīkdatnes apmeklētāju analīzei."
                      : lang === "et" ? "Kasutame vajalikke küpsiseid kontaktivormi toimimiseks ja Google Analytics küpsiseid veebilehe külastatavuse analüüsimiseks."
                      : "We use essential cookies for the contact form and Google Analytics cookies for website traffic analysis."}
                  </p>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0 28px 28px" }}>
                  <table width="100%" cellPadding={0} cellSpacing={8}>
                    <tbody>
                      <tr>
                        <td width="50%">
                          <a href="#" onClick={(e) => { e.preventDefault(); handleCookieAccept(); }} style={{ display: "block", textAlign: "center", backgroundColor: "#1e3a8a", color: "white", padding: "12px 0", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "14px" }}>
                            {lang === "lt" ? "✓ Sutinku su visais" : lang === "ru" ? "✓ Принять все" : lang === "lv" ? "✓ Pieņemt visus" : lang === "et" ? "✓ Nõustu kõigiga" : "✓ Accept All"}
                          </a>
                        </td>
                        <td width="50%">
                          <a href="#" onClick={(e) => { e.preventDefault(); handleCookieReject(); }} style={{ display: "block", textAlign: "center", backgroundColor: "transparent", color: "#1e3a8a", padding: "12px 0", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "14px", border: "2px solid #1e3a8a" }}>
                            {lang === "lt" ? "Tik būtini" : lang === "ru" ? "Только необходимые" : lang === "lv" ? "Tikai nepieciešamie" : lang === "et" ? "Ainult vajalikud" : "Essential Only"}
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default SiteLayout;
