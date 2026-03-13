import { useState } from "react";
import { faqData, type Lang } from "@/data/translations";

const AboutSection = ({
  lang,
  t,
  isMobile,
}: {
  lang: Lang;
  t: any;
  isMobile: boolean;
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faq = faqData[lang];

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        padding: isMobile ? "40px 16px" : "60px 60px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "30px" : "50px",
            alignItems: "start",
          }}
        >
          {/* Left: Text */}
          <div>
            <p
              style={{
                color: "#d4af37",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              {t.faqSub}
            </p>
            <h2
              style={{
                color: "#1e3a8a",
                fontSize: isMobile ? "24px" : "32px",
                fontWeight: 900,
                margin: "0 0 20px",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {t.faqTitle}
            </h2>
            <img
              src="/warehouse/warehouse-1.png"
              alt="Belacor logistikos sandėliai"
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              }}
              loading="lazy"
            />
          </div>

          {/* Right: FAQ accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {faq.map((item, i) => (
              <div
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow:
                    openFaq === i
                      ? "0 4px 16px rgba(30,58,138,0.12)"
                      : "0 1px 6px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  border:
                    openFaq === i
                      ? "1px solid #1e3a8a"
                      : "1px solid transparent",
                  padding: "16px 20px",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      color: "#1e3a8a",
                      fontSize: "14px",
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    {item.q}
                  </p>
                  <span
                    style={{
                      color: "#d4af37",
                      fontSize: "20px",
                      fontWeight: 700,
                      flexShrink: 0,
                      marginLeft: "12px",
                    }}
                  >
                    {openFaq === i ? "−" : "+"}
                  </span>
                </div>
                {openFaq === i && (
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "13px",
                      lineHeight: 1.7,
                      marginTop: "10px",
                      marginBottom: 0,
                    }}
                  >
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
