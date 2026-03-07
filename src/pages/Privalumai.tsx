import SiteLayout from "@/components/SiteLayout";

const Privalumai = () => (
  <SiteLayout>
    {({ lang, t }) => (
      <>
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "white" }}>
          <tbody>
            <tr>
              <td style={{ padding: "50px 30px", textAlign: "center" }}>
                <h1 style={{ color: "#1e3a8a", fontSize: "32px", marginBottom: "10px" }}>{t.advTitle}</h1>
                <p style={{ color: "#64748b", marginBottom: "40px" }}>{t.advSub}</p>
              </td>
            </tr>
            <tr>
              <td>
                <table width="80%" cellPadding={20} cellSpacing={0} style={{ margin: "0 auto" }}>
                  <tbody>
                    <tr>
                      {t.advantages.map((a) => (
                        <td key={a.title} width="25%" style={{ textAlign: "center", verticalAlign: "top" }}>
                          <p style={{ fontSize: "40px", margin: "0 0 12px" }}>{a.icon}</p>
                          <h3 style={{ color: "#1e3a8a", fontSize: "16px", margin: "0 0 8px" }}>{a.title}</h3>
                          <p style={{ color: "#64748b", fontSize: "13px", margin: 0, lineHeight: 1.5 }}>{a.desc}</p>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr><td style={{ height: "40px" }}></td></tr>
          </tbody>
        </table>

        {/* Klientai */}
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f8fafc" }}>
          <tbody>
            <tr>
              <td style={{ padding: "40px 30px", textAlign: "center" }}>
                <h2 style={{ color: "#1e3a8a", fontSize: "28px", marginBottom: "10px" }}>{t.clientsTitle}</h2>
                <p style={{ color: "#64748b", marginBottom: "30px" }}>{t.clientsSub}</p>
              </td>
            </tr>
            <tr>
              <td>
                <table width="70%" cellPadding={15} cellSpacing={0} style={{ margin: "0 auto" }}>
                  <tbody>
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

export default Privalumai;
