import { useState } from "react";
import heroBedding from "@/assets/hero-bedding.jpg";
import bentonite from "@/assets/bentonite.jpg";
import flaxBedding from "@/assets/flax-bedding.jpg";
import sawdustBriquettes from "@/assets/sawdust-briquettes.jpg";

const translations = {
  lt: {
    nav: ["Privalumai", "Produktai", "Kontaktai", "Užsisakyti"],
    heroTitle1: "Susisiekite Dėl ",
    heroTitle2: "Pasiūlymo",
    heroSubtitle: "Užpildykite formą ir mes susisieksime su jumis per 24 valandas",
    success: "✓ Užklausa išsiųsta sėkmingai!",
    formCompany: "Įmonės pavadinimas *",
    formContact: "Kontakto asmuo *",
    formPhone: "Telefonas *",
    formEmail: "El. paštas *",
    formQty: "Kiekis (tonos/mėn) *",
    formType: "Kraiko tipas",
    formMsg: "Žinutė",
    formBtn: "✈ Siųsti Užklausą",
    phCompany: "UAB Jūsų įmonė",
    phContact: "Vardas Pavardė",
    phPhone: "+370...",
    phEmail: "jusu@email.lt",
    phQty: "pvz. 5",
    phMsg: "Koks kiekis jus domina? Kokiam tikslui naudosite?",
    typeOptions: ["Medis", "Bentonitas", "Linai"],
    barTitle: "Belacor invest — Premium kraikas gyvūnams B2B",
    barSub: "Didžiausi kiekiai · Geriausios kainos verslui · Švarus, ilgaamžis, ekologiškas kraikas",
    prodTitle: "Mūsų Produktai",
    prodSub: "Aukščiausios kokybės kraikas kiekvienam poreikiui",
    products: [
      { title: "Medžio granulės", desc: "Pušies ir ąžuolo granulės – natūralus, gerai absorbuojantis kraikas." },
      { title: "Bentonito kraikas", desc: "Klumpės tipo bentonitas – idealus kačių tualetams." },
      { title: "Linų sėmenų kraikas", desc: "Ekologiškas linų kraikas – hipoalerginis ir biologiškai skaidus." },
      { title: "Pjuvenų briketai", desc: "Suspausti pjuvenų briketai – puikiai tinka arkliams." },
    ],
    advTitle: "Privalumai B2B Partneriams",
    advSub: "Kodėl verta rinktis Belacor invest?",
    advantages: [
      { icon: "💰", title: "Mažiausia kaina už toną", desc: "Konkurencingos didmeninės kainos dideliems užsakymams" },
      { icon: "🚚", title: "Pristatymas visoje Lietuvoje", desc: "Greitas ir patikimas pristatymas iki jūsų sandėlio" },
      { icon: "📋", title: "Lizingo galimybės", desc: "Lanksčios mokėjimo sąlygos dideliems kiekiams" },
      { icon: "🏷️", title: "Private Label", desc: "Galimybė gaminti produkciją su jūsų prekės ženklu" },
    ],
    clientsTitle: "Mūsų Klientai",
    clientsSub: "Dirbame su verslu visoje Lietuvoje",
    clients: ["🐾 Zoobutikai", "🏥 Veterinarijos klinikos", "🐄 Fermos", "🐴 Arklių žirgynai"],
    footerDesc: "Premium kraikas gyvūnams B2B.\nDidmeninė prekyba visoje Lietuvoje.",
    footerContacts: "Kontaktai",
    footerSocial: "Socialiniai tinklai",
    footerCopy: "© 2025 visos teisės saugomos. BELACOR INVEST | Privatumo politika",
  },
  en: {
    nav: ["Advantages", "Products", "Contacts", "Order"],
    heroTitle1: "Contact Us For a ",
    heroTitle2: "Quote",
    heroSubtitle: "Fill in the form and we will contact you within 24 hours",
    success: "✓ Inquiry sent successfully!",
    formCompany: "Company name *",
    formContact: "Contact person *",
    formPhone: "Phone *",
    formEmail: "Email *",
    formQty: "Quantity (tons/month) *",
    formType: "Bedding type",
    formMsg: "Message",
    formBtn: "✈ Send Inquiry",
    phCompany: "Your Company Ltd",
    phContact: "Full Name",
    phPhone: "+370...",
    phEmail: "your@email.com",
    phQty: "e.g. 5",
    phMsg: "What quantity are you interested in? What purpose will it be used for?",
    typeOptions: ["Wood", "Bentonite", "Flax"],
    barTitle: "Belacor invest — Premium Animal Bedding B2B",
    barSub: "Largest volumes · Best prices for business · Clean, long-lasting, eco-friendly bedding",
    prodTitle: "Our Products",
    prodSub: "Top quality bedding for every need",
    products: [
      { title: "Wood pellets", desc: "Pine and oak pellets – natural, highly absorbent bedding." },
      { title: "Bentonite bedding", desc: "Clumping bentonite – ideal for cat litter boxes." },
      { title: "Flax seed bedding", desc: "Eco-friendly flax bedding – hypoallergenic and biodegradable." },
      { title: "Sawdust briquettes", desc: "Compressed sawdust briquettes – perfect for horses." },
    ],
    advTitle: "Advantages for B2B Partners",
    advSub: "Why choose Belacor invest?",
    advantages: [
      { icon: "💰", title: "Lowest price per ton", desc: "Competitive wholesale prices for large orders" },
      { icon: "🚚", title: "Delivery across Lithuania", desc: "Fast and reliable delivery to your warehouse" },
      { icon: "📋", title: "Leasing options", desc: "Flexible payment terms for large quantities" },
      { icon: "🏷️", title: "Private Label", desc: "Option to produce under your own brand" },
    ],
    clientsTitle: "Our Clients",
    clientsSub: "Working with businesses across Lithuania",
    clients: ["🐾 Pet shops", "🏥 Veterinary clinics", "🐄 Farms", "🐴 Horse stables"],
    footerDesc: "Premium animal bedding B2B.\nWholesale across Lithuania.",
    footerContacts: "Contacts",
    footerSocial: "Social media",
    footerCopy: "© 2025 all rights reserved. BELACOR INVEST | Privacy policy",
  },
};

type Lang = "lt" | "en";

const Index = () => {
  const [lang, setLang] = useState<Lang>("lt");
  const t = translations[lang];
  const navAnchors = ["privalumai", "produktai", "kontaktai", "užsisakyti"];

  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    phone: "",
    email: "",
    quantity: "",
    type: t.typeOptions[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const productImages = [heroBedding, bentonite, flaxBedding, sawdustBriquettes];

  return (
    <>
      {/* ===== HEADER ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#1e3a8a" }}>
        <tbody>
          <tr>
            <td style={{ padding: "12px 20px" }}>
              <table width="100%" cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td width="40%" style={{ verticalAlign: "middle" }}>
                      <table cellPadding={0} cellSpacing={0}>
                        <tbody>
                          <tr>
                            <td>
                              <h2 style={{ color: "#d4af37", margin: 0, fontSize: "28px", fontFamily: "'Playfair Display', serif", letterSpacing: "1px" }}>
                                ✦ Belacor invest
                              </h2>
                            </td>
                            <td style={{ paddingLeft: "16px", verticalAlign: "middle" }}>
                              <table cellPadding={0} cellSpacing={0} style={{ borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.3)" }}>
                                <tbody>
                                  <tr>
                                    <td
                                      onClick={() => setLang("lt")}
                                      style={{
                                        padding: "6px 12px",
                                        cursor: "pointer",
                                        backgroundColor: lang === "lt" ? "#d4af37" : "transparent",
                                        color: lang === "lt" ? "#1e3a8a" : "white",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                      }}
                                    >
                                      LT
                                    </td>
                                    <td
                                      onClick={() => setLang("en")}
                                      style={{
                                        padding: "6px 12px",
                                        cursor: "pointer",
                                        backgroundColor: lang === "en" ? "#d4af37" : "transparent",
                                        color: lang === "en" ? "#1e3a8a" : "white",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                      }}
                                    >
                                      EN
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td width="60%" style={{ textAlign: "right", verticalAlign: "middle" }}>
                      <table cellPadding={0} cellSpacing={0} style={{ display: "inline-table" }}>
                        <tbody>
                          <tr>
                            {t.nav.map((item, i) => (
                              <td key={item} style={{ padding: "0 6px" }}>
                                <a
                                  href={`#${navAnchors[i]}`}
                                  style={{
                                    color: i === 3 ? "#1e3a8a" : "white",
                                    backgroundColor: i === 3 ? "#d4af37" : "transparent",
                                    border: i === 3 ? "none" : "1px solid rgba(255,255,255,0.4)",
                                    padding: "10px 22px",
                                    borderRadius: "6px",
                                    textDecoration: "none",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    display: "inline-block",
                                  }}
                                >
                                  {item}
                                </a>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== HERO ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td width="60%" style={{ verticalAlign: "top" }}>
              <img src={heroBedding} alt="Premium kraikas gyvūnams B2B - medžio granulės" width="100%" style={{ display: "block", height: "420px", objectFit: "cover" }} />
            </td>
            <td width="40%" style={{ backgroundColor: "#f0fdf4", padding: "40px 30px", verticalAlign: "top" }}>
              <h1 style={{ color: "#1e3a8a", fontSize: "28px", marginTop: 0, lineHeight: 1.3 }}>
                {t.heroTitle1}<b style={{ color: "#d4af37" }}>{t.heroTitle2}</b>
              </h1>
              <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>{t.heroSubtitle}</p>

              {submitted ? (
                <p style={{ color: "#16a34a", fontWeight: 700, fontSize: "18px" }}>{t.success}</p>
              ) : (
                <form onSubmit={handleSubmit} id="užsisakyti">
                  <table width="100%" cellPadding={0} cellSpacing={8}>
                    <tbody>
                      <tr>
                        <td colSpan={2}>
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formCompany}</p>
                          <input name="company" required value={formData.company} onChange={handleChange} placeholder={t.phCompany} style={inputStyle} />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formContact}</p>
                          <input name="contact" required value={formData.contact} onChange={handleChange} placeholder={t.phContact} style={inputStyle} />
                        </td>
                      </tr>
                      <tr>
                        <td width="50%">
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formPhone}</p>
                          <input name="phone" required value={formData.phone} onChange={handleChange} placeholder={t.phPhone} style={inputStyle} />
                        </td>
                        <td width="50%">
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formEmail}</p>
                          <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder={t.phEmail} style={inputStyle} />
                        </td>
                      </tr>
                      <tr>
                        <td width="50%">
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formQty}</p>
                          <input name="quantity" required value={formData.quantity} onChange={handleChange} placeholder={t.phQty} style={inputStyle} />
                        </td>
                        <td width="50%">
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formType}</p>
                          <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                            {t.typeOptions.map((opt) => (
                              <option key={opt}>{opt}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.formMsg}</p>
                          <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder={t.phMsg} style={{ ...inputStyle, resize: "vertical" }} />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <button type="submit" style={{
                            width: "100%",
                            backgroundColor: "#1e3a8a",
                            color: "white",
                            border: "none",
                            padding: "14px",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: 700,
                            cursor: "pointer",
                            letterSpacing: "0.5px",
                          }}>
                            {t.formBtn}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== HERO TEXT BAR ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#1e3a8a" }}>
        <tbody>
          <tr>
            <td style={{ padding: "30px 40px", textAlign: "center" }}>
              <h2 style={{ color: "#d4af37", fontSize: "26px", margin: "0 0 8px" }}>{t.barTitle}</h2>
              <p style={{ color: "white", fontSize: "16px", margin: 0, opacity: 0.9 }}>{t.barSub}</p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== PRODUCTS ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} id="produktai" style={{ backgroundColor: "#fafafa" }}>
        <tbody>
          <tr>
            <td style={{ padding: "50px 30px", textAlign: "center" }}>
              <h2 style={{ color: "#1e3a8a", fontSize: "32px", marginBottom: "10px" }}>{t.prodTitle}</h2>
              <p style={{ color: "#64748b", marginBottom: "40px" }}>{t.prodSub}</p>
            </td>
          </tr>
          <tr>
            <td>
              <table width="90%" cellPadding={15} cellSpacing={0} style={{ margin: "0 auto" }}>
                <tbody>
                  <tr>
                    {t.products.map((p, i) => (
                      <td key={p.title} width="25%" style={{ verticalAlign: "top", textAlign: "center" }}>
                        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                          <tbody>
                            <tr>
                              <td>
                                <img src={productImages[i]} alt={p.title} width="100%" style={{ height: "180px", objectFit: "cover", display: "block" }} />
                              </td>
                            </tr>
                            <tr>
                              <td style={{ padding: "16px" }}>
                                <h3 style={{ color: "#1e3a8a", fontSize: "17px", margin: "0 0 8px" }}>{p.title}</h3>
                                <p style={{ color: "#64748b", fontSize: "13px", margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
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

      {/* ===== PRIVALUMAI ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} id="privalumai" style={{ backgroundColor: "white" }}>
        <tbody>
          <tr>
            <td style={{ padding: "50px 30px", textAlign: "center" }}>
              <h2 style={{ color: "#1e3a8a", fontSize: "32px", marginBottom: "10px" }}>{t.advTitle}</h2>
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

      {/* ===== KLIENTAI ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f0fdf4" }}>
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

      {/* ===== FOOTER ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} id="kontaktai" style={{ backgroundColor: "#1e3a8a" }}>
        <tbody>
          <tr>
            <td style={{ padding: "30px 40px" }}>
              <table width="100%" cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td width="33%" style={{ verticalAlign: "top", color: "white" }}>
                      <h3 style={{ color: "#d4af37", fontSize: "20px", marginTop: 0 }}>✦ Belacor invest</h3>
                      <p style={{ fontSize: "13px", opacity: 0.8, lineHeight: 1.7, whiteSpace: "pre-line" }}>{t.footerDesc}</p>
                    </td>
                    <td width="33%" style={{ verticalAlign: "top", color: "white", textAlign: "center" }}>
                      <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0 }}>{t.footerContacts}</h3>
                      <p style={{ fontSize: "13px", opacity: 0.8, lineHeight: 1.8 }}>
                        📞 +370 600 00000<br />
                        ✉ info@belacorinvest.lt<br />
                        📍 Vilnius, Lietuva
                      </p>
                    </td>
                    <td width="33%" style={{ verticalAlign: "top", color: "white", textAlign: "right" }}>
                      <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0 }}>{t.footerSocial}</h3>
                      <p style={{ fontSize: "20px" }}>
                        <a href="#" style={{ color: "white", textDecoration: "none", marginRight: "12px" }}>📘</a>
                        <a href="#" style={{ color: "white", textDecoration: "none", marginRight: "12px" }}>📸</a>
                        <a href="#" style={{ color: "white", textDecoration: "none" }}>🔗</a>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={{ borderTop: "1px solid rgba(255,255,255,0.15)", padding: "16px 40px", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: 0 }}>{t.footerCopy}</p>
            </td>
          </tr>
        </tbody>
      </table>
      {/* ===== SCROLL TO TOP ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f0fdf4" }}>
        <tbody>
          <tr>
            <td style={{ textAlign: "center", padding: "16px" }}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{
                  display: "inline-block",
                  backgroundColor: "#1e3a8a",
                  color: "white",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                }}
              >
                ⬆ {lang === "lt" ? "Grįžti į viršų" : "Back to top"}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: "'Open Sans', sans-serif",
  boxSizing: "border-box",
  outline: "none",
};

export default Index;
