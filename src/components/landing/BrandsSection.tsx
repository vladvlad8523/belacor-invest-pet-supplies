const brandLogos = [
  { src: "/brands/kurgama.jpg", alt: "Kurgama" },
  { src: "/brands/mangusta.jpg", alt: "Mangusta" },
  { src: "/brands/siaures-centras.jpg", alt: "Šiaurės Centras" },
  { src: "/brands/client-4.png", alt: "Partner 4" },
  { src: "/brands/client-2.png", alt: "Partner 2" },
  { src: "/brands/client-6.png", alt: "Partner 6" },
];

const BrandsSection = ({ t, isMobile }: { t: any; isMobile: boolean }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: isMobile ? "40px 16px" : "60px 60px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "50px",
            alignItems: "center",
          }}
        >
          {/* Left: Brands */}
          <div>
            <h2
              style={{
                color: "#1e3a8a",
                fontSize: isMobile ? "22px" : "28px",
                fontWeight: 900,
                margin: "0 0 16px",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {t.brandsTitle || "Mūsų prekės ženklai"}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                border: "2px solid #d4af37",
                borderRadius: "12px",
                padding: "20px",
                backgroundColor: "#fefce8",
              }}
            >
              {brandLogos.map((logo) => (
                <div
                  key={logo.alt}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px",
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    style={{
                      height: isMobile ? "36px" : "50px",
                      maxWidth: isMobile ? "70px" : "100px",
                      objectFit: "contain",
                      opacity: 0.85,
                    }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <p
              style={{
                color: "#64748b",
                fontSize: "13px",
                marginTop: "12px",
                lineHeight: 1.5,
              }}
            >
              Tiekiame pirmaujančius augintinių prekių ženklus, žinomus dėl
              kokybės ir inovacijų.
            </p>
          </div>

          {/* Right: Warehouse photo */}
          <div>
            <img
              src="/warehouse/warehouse-3.png"
              alt="Belacor sandėlis"
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsSection;
