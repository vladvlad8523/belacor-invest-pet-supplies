const galleryImages = [
  { src: "/warehouse/warehouse-2.png", alt: "Komanda prie sandėlio" },
  { src: "/warehouse/warehouse-4.png", alt: "Logistikos sandėlis" },
  { src: "/warehouse/warehouse-5.png", alt: "Sandėlio panorama" },
];

const GallerySection = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: 0,
      }}
    >
      {galleryImages.map((img) => (
        <div
          key={img.alt}
          style={{
            overflow: "hidden",
            height: isMobile ? "200px" : "280px",
          }}
        >
          <img
            src={img.src}
            alt={img.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default GallerySection;
