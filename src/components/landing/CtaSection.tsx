const CtaSection = ({ t, isMobile }: { t: any; isMobile: boolean }) => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
        padding: isMobile ? "40px 20px" : "60px 60px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          color: "white",
          fontSize: isMobile ? "22px" : "32px",
          fontWeight: 900,
          margin: "0 0 12px",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Auginkite savo verslą su{" "}
        <span style={{ color: "#d4af37" }}>Belacor Invest</span>
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.8)",
          fontSize: isMobile ? "14px" : "16px",
          marginBottom: "24px",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Tapkite Baltijos regiono pirmaujančio B2B didmenininko partneriu.
        Sėkmę kurkime kartu!
      </p>
      <button
        onClick={scrollToForm}
        style={{
          backgroundColor: "#d4af37",
          color: "#0f172a",
          border: "2px solid #d4af37",
          padding: isMobile ? "14px 28px" : "16px 40px",
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
  );
};

export default CtaSection;
