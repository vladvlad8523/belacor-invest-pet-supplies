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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [hasPromo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
  const fbUrl = "https://www.facebook.com/people/Uab-Belacor/pfbid035pkyQwd2UoPrMSgSDSdBrr5B6iWM47dHkKfWrFX6QmUzHtTCapqEQyPBEGVyHaESl/";

  return (
    <>
      {/* ===== PROMO BANNER / SHOP CTA ===== */}
      {showPromoBanner && (
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: hasPromo ? "linear-gradient(90deg, #b91c1c 0%, #dc2626 50%, #b91c1c 100%)" : "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)" }}>
          <tbody>
            <tr>
              <td style={{ padding: isMobile ? "8px 12px" : "10px 40px", textAlign: "center", position: "relative" }}>
                {hasPromo ? (
                  <p style={{ color: "white", fontSize: isMobile ? "12px" : "14px", fontWeight: 700, margin: 0, letterSpacing: "0.5px" }}>
                    {t.promoBanner}
                  </p>
                ) : (
                  <p style={{ color: "white", fontSize: isMobile ? "12px" : "14px", fontWeight: 700, margin: 0, letterSpacing: "0.5px" }}>
                    {t.shopCta}{" "}
                    <a href="https://kraikai.lt/shop/" target="_blank" rel="noopener noreferrer" style={{ color: "#d4af37", textDecoration: "underline", marginLeft: "8px" }}>
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
            <td style={{ padding: isMobile ? "10px 12px" : "12px 20px" }}>
              <table width="100%" cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td width={isMobile ? "70%" : "40%"} style={{ verticalAlign: "middle" }}>
                      <table cellPadding={0} cellSpacing={0}>
                        <tbody>
                          <tr>
                            <td style={{ verticalAlign: "middle", cursor: "pointer" }} onClick={() => navigate("/")}>
                              <img src={belacorLogo} alt="Belacor invest logo" style={{ height: isMobile ? "35px" : "45px", display: "block" }} />
                            </td>
                            {!isMobile && (
                              <td style={{ paddingLeft: "16px", verticalAlign: "middle" }}>
                                <table cellPadding={0} cellSpacing={0} style={{ borderRadius: "6px", overflow: "hidden", border: "1px solid #cbd5e1" }}>
                                  <tbody>
                                    <tr>
                                      {langLabels.map((l) => (
                                        <td
                                          key={l}
                                          onClick={() => setLang(l)}
                                          style={{
                                            padding: "5px 7px",
                                            cursor: "pointer",
                                            backgroundColor: lang === l ? "#1e3a8a" : "transparent",
                                            color: lang === l ? "white" : "#1e3a8a",
                                            fontSize: "11px",
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
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td width={isMobile ? "30%" : "60%"} style={{ textAlign: "right", verticalAlign: "middle" }}>
                      {isMobile ? (
                        <a
                          href="#"
                          onClick={(e) => { e.preventDefault(); setShowMobileMenu(!showMobileMenu); }}
                          style={{ fontSize: "28px", textDecoration: "none", color: "#1e3a8a" }}
                        >
                          ☰
                        </a>
                      ) : (
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
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          {/* Mobile menu */}
          {isMobile && showMobileMenu && (
            <tr>
              <td style={{ padding: "0 12px 12px", backgroundColor: "white" }}>
                <table width="100%" cellPadding={0} cellSpacing={4}>
                  <tbody>
                    {/* Language selector row */}
                    <tr>
                      <td>
                        <table cellPadding={0} cellSpacing={0} style={{ borderRadius: "6px", overflow: "hidden", border: "1px solid #cbd5e1", margin: "0 auto 8px" }}>
                          <tbody>
                            <tr>
                              {langLabels.map((l) => (
                                <td
                                  key={l}
                                  onClick={() => setLang(l)}
                                  style={{
                                    padding: "6px 10px",
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
                    {t.nav.map((item, i) => (
                      <tr key={item}>
                        <td>
                          <a
                            href={navRoutes[i]}
                            onClick={(e) => { e.preventDefault(); navigate(navRoutes[i]); setShowMobileMenu(false); }}
                            style={{
                              display: "block",
                              padding: "10px 16px",
                              color: location.pathname === navRoutes[i] ? "#1e3a8a" : "#475569",
                              backgroundColor: location.pathname === navRoutes[i] ? "#f0f4ff" : "#f8fafc",
                              borderRadius: "6px",
                              textDecoration: "none",
                              fontWeight: 600,
                              fontSize: "14px",
                              textAlign: "center",
                            }}
                          >
                            {item}
                          </a>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td>
                        <a
                          href="#"
                          onClick={(e) => { e.preventDefault(); setShowLoginModal(true); setShowMobileMenu(false); }}
                          style={{
                            display: "block",
                            padding: "10px 16px",
                            color: "white",
                            backgroundColor: "#1e3a8a",
                            borderRadius: "6px",
                            textDecoration: "none",
                            fontWeight: 700,
                            fontSize: "14px",
                            textAlign: "center",
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
          )}
        </tbody>
      </table>

      {/* ===== PAGE CONTENT ===== */}
      {children({ lang, t })}

      {/* ===== FOOTER ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#1e3a8a" }}>
        <tbody>
          <tr>
            <td style={{ padding: isMobile ? "30px 16px 16px" : "40px 40px 20px" }}>
              {isMobile ? (
                // Mobile footer - stacked
                <table width="100%" cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr>
                      <td style={{ color: "white", paddingBottom: "20px" }}>
                        <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0, marginBottom: "12px" }}>🕐 {t.workHoursTitle}</h3>
                        <p style={{ fontSize: "13px", opacity: 0.85, lineHeight: 1.8, margin: 0 }}>
                          {t.workHours1}<br />{t.workHours2}<br />{t.workHours3}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "white", paddingBottom: "20px" }}>
                        <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0, marginBottom: "12px" }}>📋 {t.reqTitle}</h3>
                        <p style={{ fontSize: "13px", opacity: 0.85, lineHeight: 1.8, margin: 0 }}>
                          {t.reqCompany}<br />
                          {t.reqAddress.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}
                          {t.reqCode}<br />{t.reqVat}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "white", paddingBottom: "20px" }}>
                        <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0, marginBottom: "12px" }}>📞 {t.contactTitle}</h3>
                        <p style={{ fontSize: "13px", opacity: 0.85, lineHeight: 1.8, margin: 0 }}>
                          {t.contactOrders}<br />
                          <a href="tel:+37068853541" style={{ color: "#d4af37", textDecoration: "none" }}>+370 688 53541</a><br />
                          {t.contactEmail}<br />
                          <a href="mailto:info@belacor.lt" style={{ color: "#d4af37", textDecoration: "none" }}>info@belacor.lt</a>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "white", paddingBottom: "10px" }}>
                        <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0, marginBottom: "12px" }}>{t.footerSocial}</h3>
                        <p style={{ fontSize: "20px", margin: 0 }}>
                          <a href={fbUrl} target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none", marginRight: "12px" }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" style={{ width: "24px", height: "24px", verticalAlign: "middle" }} />
                          </a>
                          <a href="mailto:info@belacor.lt" style={{ color: "white", textDecoration: "none", marginRight: "12px" }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" style={{ width: "24px", height: "24px", verticalAlign: "middle" }} />
                          </a>
                          <a href="tel:+37068853541" style={{ color: "white", textDecoration: "none" }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" alt="Phone" style={{ width: "24px", height: "24px", verticalAlign: "middle" }} />
                          </a>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                // Desktop footer
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
                          <a href={fbUrl} target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none", marginRight: "12px" }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" style={{ width: "28px", height: "28px", verticalAlign: "middle" }} />
                          </a>
                          <a href="mailto:info@belacor.lt" style={{ color: "white", textDecoration: "none", marginRight: "12px" }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" style={{ width: "28px", height: "28px", verticalAlign: "middle" }} />
                          </a>
                          <a href="tel:+37068853541" style={{ color: "white", textDecoration: "none" }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" alt="Phone" style={{ width: "28px", height: "28px", verticalAlign: "middle" }} />
                          </a>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </td>
          </tr>
          <tr>
            <td style={{ borderTop: "1px solid rgba(255,255,255,0.15)", padding: "16px 40px", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: 0 }}>{t.footerCopy}</p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== LOGIN MODAL ===== */}
      {showLoginModal && (
        <>
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 9998, backgroundColor: "rgba(0,0,0,0.5)" }}>
            <tbody><tr><td onClick={() => setShowLoginModal(false)}></td></tr></tbody>
          </table>
          <table cellPadding={0} cellSpacing={0} style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 9999, backgroundColor: "white", borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", width: isMobile ? "95%" : "400px", maxWidth: "95%" }}>
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
          <table cellPadding={0} cellSpacing={0} style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 9999, backgroundColor: "white", borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", width: isMobile ? "95%" : "440px", maxWidth: "95%" }}>
            <tbody>
              <tr>
                <td style={{ padding: "32px 28px 20px", textAlign: "center", position: "relative" }}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setShowCookieModal(false); }} style={{ position: "absolute", top: "12px", right: "16px", color: "#94a3b8", fontSize: "22px", textDecoration: "none", fontWeight: 700, lineHeight: 1 }}>✕</a>
                  <p style={{ fontSize: "36px", margin: "0 0 12px" }}>🍪</p>
                  <h3 style={{ color: "#1e3a8a", fontSize: "20px", margin: "0 0 12px" }}>{t.cookieTitle}</h3>
                  <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.6, margin: "0 0 20px" }}>{t.cookieText}</p>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0 28px 28px" }}>
                  <table width="100%" cellPadding={0} cellSpacing={8}>
                    <tbody>
                      <tr>
                        <td width="50%">
                          <a href="#" onClick={(e) => { e.preventDefault(); handleCookieAccept(); }} style={{ display: "block", textAlign: "center", backgroundColor: "#1e3a8a", color: "white", padding: "12px 0", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "14px" }}>
                            {t.cookieAccept}
                          </a>
                        </td>
                        <td width="50%">
                          <a href="#" onClick={(e) => { e.preventDefault(); handleCookieReject(); }} style={{ display: "block", textAlign: "center", backgroundColor: "transparent", color: "#1e3a8a", padding: "12px 0", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "14px", border: "2px solid #1e3a8a" }}>
                            {t.cookieReject}
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
