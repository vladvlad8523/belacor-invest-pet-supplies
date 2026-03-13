const HeroSection = ({ t, isMobile }: { t: any; isMobile: boolean }) => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: isMobile ? "420px" : "560px",
        backgroundImage: "url('/warehouse/warehouse-2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,58,138,0.7) 50%, rgba(15,23,42,0.6) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: isMobile ? "40px 20px" : "60px 60px",
          maxWidth: "720px",
        }}
      >
        <p
          style={{
            color: "#d4af37",
            fontSize: isMobile ? "12px" : "14px",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          BELACOR INVEST · B2B
        </p>
        <h1
          style={{
            color: "white",
            fontSize: isMobile ? "28px" : "46px",
            fontWeight: 900,
            lineHeight: 1.15,
            margin: "0 0 16px",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Baltijos šalių patikimas{" "}
          <span style={{ color: "#d4af37" }}>augintinių prekių</span>{" "}
          didmenininkas
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: isMobile ? "14px" : "17px",
            lineHeight: 1.6,
            marginBottom: "28px",
            maxWidth: "560px",
          }}
        >
          Bendradarbiaujame su zoobutikais, parduotuvių tinklais ir prekybos
          centrais visose Baltijos šalyse
        </p>
        <button
          onClick={scrollToForm}
          style={{
            backgroundColor: "#d4af37",
            color: "#0f172a",
            border: "none",
            padding: isMobile ? "14px 28px" : "16px 36px",
            borderRadius: "6px",
            fontSize: isMobile ? "14px" : "16px",
            fontWeight: 800,
            cursor: "pointer",
            letterSpacing: "0.5px",
          }}
        >
          Tapkite partneriu →
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
