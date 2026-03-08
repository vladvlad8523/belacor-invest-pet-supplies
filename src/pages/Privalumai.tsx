import { useState, useEffect } from "react";
import SiteLayout from "@/components/SiteLayout";

const Privalumai = () => {
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
        <>
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "white" }}>
            <tbody>
              <tr>
                <td style={{ padding: isMobile ? "16px 16px 8px" : "24px 30px 12px", textAlign: "center" }}>
                  <h1 style={{ color: "#1e3a8a", fontSize: isMobile ? "22px" : "28px", marginBottom: "6px" }}>{t.advTitle}</h1>
                  <p style={{ color: "#64748b", marginBottom: "16px", fontSize: isMobile ? "13px" : "14px" }}>{t.advSub}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <table width={isMobile ? "100%" : "80%"} cellPadding={isMobile ? 8 : 14} cellSpacing={0} style={{ margin: "0 auto" }}>
                    <tbody>
                      {isMobile ? (
                        t.advantages.map((a) => (
                          <tr key={a.title}>
                            <td style={{ textAlign: "center", verticalAlign: "top", paddingBottom: "10px" }}>
                              <p style={{ fontSize: "32px", margin: "0 0 6px" }}>{a.icon}</p>
                              <h3 style={{ color: "#1e3a8a", fontSize: "15px", margin: "0 0 4px" }}>{a.title}</h3>
                              <p style={{ color: "#64748b", fontSize: "12px", margin: 0, lineHeight: 1.4 }}>{a.desc}</p>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          {t.advantages.map((a) => (
                            <td key={a.title} width="25%" style={{ textAlign: "center", verticalAlign: "top" }}>
                              <p style={{ fontSize: "32px", margin: "0 0 6px" }}>{a.icon}</p>
                              <h3 style={{ color: "#1e3a8a", fontSize: "15px", margin: "0 0 4px" }}>{a.title}</h3>
                              <p style={{ color: "#64748b", fontSize: "12px", margin: 0, lineHeight: 1.4 }}>{a.desc}</p>
                            </td>
                          ))}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr><td style={{ height: "12px" }}></td></tr>
            </tbody>
          </table>

          {/* Klientai */}
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f8fafc" }}>
            <tbody>
              <tr>
                <td style={{ padding: isMobile ? "30px 16px" : "40px 30px", textAlign: "center" }}>
                  <h2 style={{ color: "#1e3a8a", fontSize: isMobile ? "22px" : "28px", marginBottom: "10px" }}>{t.clientsTitle}</h2>
                  <p style={{ color: "#64748b", marginBottom: "30px" }}>{t.clientsSub}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <table width={isMobile ? "100%" : "70%"} cellPadding={isMobile ? 8 : 15} cellSpacing={0} style={{ margin: "0 auto" }}>
                    <tbody>
                      {isMobile ? (
                        t.clients.map((c) => (
                          <tr key={c}>
                            <td style={{ textAlign: "center", paddingBottom: "8px" }}>
                              <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
                                <tbody>
                                  <tr>
                                    <td style={{ padding: "16px 12px" }}>
                                      <p style={{ fontSize: "16px", fontWeight: 700, color: "#1e3a8a", margin: 0 }}>{c}</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          {t.clients.map((c) => (
                            <td key={c} width="25%" style={{ textAlign: "center" }}>
                              <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
                                <tbody>
                                  <tr>
                                    <td style={{ padding: "24px 12px" }}>
                                      <p style={{ fontSize: "16px", fontWeight: 700, color: "#1e3a8a", margin: 0 }}>{c}</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          ))}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr><td style={{ height: "40px" }}></td></tr>
            </tbody>
          </table>
        </>
      )}
    </SiteLayout>
  );
};

export default Privalumai;
