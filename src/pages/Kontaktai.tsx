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
                        {/* Mobile: stacked */}
                        <tr>
                          <td style={{ verticalAlign: "top", paddingBottom: "30px" }}>
                            <h1 style={{ color: "#1e3a8a", fontSize: "24px", marginTop: 0, marginBottom: "24px" }}>{t.footerContacts}</h1>
                            {renderContactInfo(t)}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ verticalAlign: "top", backgroundColor: "#f0fdf4", padding: "24px 16px", borderRadius: "12px" }}>
                            {renderContactForm(t, inputStyle)}
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
                          {renderContactForm(t, inputStyle)}
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

function renderContactForm(t: any, inputStyle: React.CSSProperties) {
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
            <input placeholder={t.phCompany} style={inputStyle} />
          </td></tr>
          <tr><td>
            <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formContact}</p>
            <input placeholder={t.phContact} style={inputStyle} />
          </td></tr>
          <tr><td>
            <table width="100%" cellPadding={0} cellSpacing={0}>
              <tbody><tr>
                <td width="48%">
                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formPhone}</p>
                  <input placeholder={t.phPhone} style={inputStyle} />
                </td>
                <td width="4%"></td>
                <td width="48%">
                  <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formEmail}</p>
                  <input type="email" placeholder={t.phEmail} style={inputStyle} />
                </td>
              </tr></tbody>
            </table>
          </td></tr>
          <tr><td>
            <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formMsg}</p>
            <textarea rows={3} placeholder={t.phMsg} style={{ ...inputStyle, resize: "vertical" as const }} />
          </td></tr>
          <tr><td>
            <button style={{ width: "100%", backgroundColor: "#1e3a8a", color: "white", border: "none", padding: "14px", borderRadius: "8px", fontSize: "16px", fontWeight: 700, cursor: "pointer" }}>
              {t.formBtn}
            </button>
          </td></tr>
        </tbody>
      </table>
    </>
  );
}

export default Kontaktai;
