import { useState, useEffect } from "react";
import SiteLayout from "@/components/SiteLayout";
import { faqData, inputStyle, type Lang } from "@/data/translations";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import AboutSection from "@/components/landing/AboutSection";
import BrandsSection from "@/components/landing/BrandsSection";
import GallerySection from "@/components/landing/GallerySection";
import CtaSection from "@/components/landing/CtaSection";
import ContactFormSection from "@/components/landing/ContactFormSection";

const Index = () => {
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
          <HeroSection t={t} isMobile={isMobile} />
          <StatsSection t={t} isMobile={isMobile} />
          <AboutSection lang={lang} t={t} isMobile={isMobile} />
          <BrandsSection t={t} isMobile={isMobile} />
          <GallerySection isMobile={isMobile} />
          <CtaSection t={t} isMobile={isMobile} />
          <ContactFormSection t={t} isMobile={isMobile} />
        </>
      )}
    </SiteLayout>
  );
};

export default Index;
