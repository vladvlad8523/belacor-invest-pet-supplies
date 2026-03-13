const stats = [
  { icon: "📦", value: "5000+", label: "Produktų" },
  { icon: "🏆", value: "10+", label: "Metų patirties" },
  { icon: "⭐", value: "1000+", label: "Premium prekių" },
  { icon: "🏪", value: "1000+", label: "Partnerių parduotuvių" },
];

const StatsSection = ({ t, isMobile }: { t: any; isMobile: boolean }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: isMobile ? "30px 16px" : "0 60px",
        marginTop: isMobile ? "0" : "-40px",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: isMobile ? "12px" : "20px",
          maxWidth: "1000px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
          padding: isMobile ? "20px 16px" : "30px 40px",
          border: "1px solid #e2e8f0",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              textAlign: "center",
              padding: "10px",
            }}
          >
            <p style={{ fontSize: "28px", margin: "0 0 4px" }}>{stat.icon}</p>
            <p
              style={{
                color: "#1e3a8a",
                fontSize: isMobile ? "24px" : "32px",
                fontWeight: 900,
                margin: "0 0 2px",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                color: "#64748b",
                fontSize: isMobile ? "11px" : "13px",
                fontWeight: 600,
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
