import { useState } from "react";
import heroBedding from "@/assets/hero-bedding.jpg";
import bentonite from "@/assets/bentonite.jpg";
import flaxBedding from "@/assets/flax-bedding.jpg";
import sawdustBriquettes from "@/assets/sawdust-briquettes.jpg";


const Index = () => {
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    phone: "",
    email: "",
    quantity: "",
    type: "Medis",
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
                    <td width="30%" style={{ verticalAlign: "middle" }}>
                      <h2 style={{ color: "#d4af37", margin: 0, fontSize: "28px", fontFamily: "'Playfair Display', serif", letterSpacing: "1px" }}>
                        ✦ Belacor invest
                      </h2>
                    </td>
                    <td width="70%" style={{ textAlign: "right", verticalAlign: "middle" }}>
                      <table cellPadding={0} cellSpacing={0} style={{ display: "inline-table" }}>
                        <tbody>
                          <tr>
                            {["Privalumai", "Produktai", "Kontaktai", "Užsisakyti"].map((item) => (
                              <td key={item} style={{ padding: "0 6px" }}>
                                <a
                                  href={`#${item.toLowerCase()}`}
                                  style={{
                                    color: item === "Užsisakyti" ? "#1e3a8a" : "white",
                                    backgroundColor: item === "Užsisakyti" ? "#d4af37" : "transparent",
                                    border: item === "Užsisakyti" ? "none" : "1px solid rgba(255,255,255,0.4)",
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
                Susisiekite Dėl <b style={{ color: "#d4af37" }}>Pasiūlymo</b>
              </h1>
              <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>
                Užpildykite formą ir mes susisieksime su jumis per 24 valandas
              </p>

              {submitted ? (
                <p style={{ color: "#16a34a", fontWeight: 700, fontSize: "18px" }}>✓ Užklausa išsiųsta sėkmingai!</p>
              ) : (
                <form onSubmit={handleSubmit} id="užsisakyti">
                  <table width="100%" cellPadding={0} cellSpacing={8}>
                    <tbody>
                      <tr>
                        <td colSpan={2}>
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>Įmonės pavadinimas *</p>
                          <input name="company" required value={formData.company} onChange={handleChange} placeholder="UAB Jūsų įmonė" style={inputStyle} />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>Kontakto asmuo *</p>
                          <input name="contact" required value={formData.contact} onChange={handleChange} placeholder="Vardas Pavardė" style={inputStyle} />
                        </td>
                      </tr>
                      <tr>
                        <td width="50%">
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>Telefonas *</p>
                          <input name="phone" required value={formData.phone} onChange={handleChange} placeholder="+370..." style={inputStyle} />
                        </td>
                        <td width="50%">
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>El. paštas *</p>
                          <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="jusu@email.lt" style={inputStyle} />
                        </td>
                      </tr>
                      <tr>
                        <td width="50%">
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>Kiekis (tonos/mėn) *</p>
                          <input name="quantity" required value={formData.quantity} onChange={handleChange} placeholder="pvz. 5" style={inputStyle} />
                        </td>
                        <td width="50%">
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>Kraiko tipas</p>
                          <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                            <option>Medis</option>
                            <option>Bentonitas</option>
                            <option>Linai</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>Žinutė</p>
                          <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Koks kiekis jus domina? Kokiam tikslui naudosite?" style={{ ...inputStyle, resize: "vertical" }} />
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
                            ✈ Siųsti Užklausą
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
              <h2 style={{ color: "#d4af37", fontSize: "26px", margin: "0 0 8px" }}>
                Belacor invest — Premium kraikas gyvūnams B2B
              </h2>
              <p style={{ color: "white", fontSize: "16px", margin: 0, opacity: 0.9 }}>
                Didžiausi kiekiai · Geriausios kainos verslui · Švarus, ilgaamžis, ekologiškas kraikas
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== PRODUCTS ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} id="produktai" style={{ backgroundColor: "#fafafa" }}>
        <tbody>
          <tr>
            <td style={{ padding: "50px 30px", textAlign: "center" }}>
              <h2 style={{ color: "#1e3a8a", fontSize: "32px", marginBottom: "10px" }}>Mūsų Produktai</h2>
              <p style={{ color: "#64748b", marginBottom: "40px" }}>Aukščiausios kokybės kraikas kiekvienam poreikiui</p>
            </td>
          </tr>
          <tr>
            <td>
              <table width="90%" cellPadding={15} cellSpacing={0} style={{ margin: "0 auto" }}>
                <tbody>
                  <tr>
                    {[
                      { img: heroBedding, title: "Medžio granulės", desc: "Pušies ir ąžuolo granulės – natūralus, gerai absorbuojantis kraikas." },
                      { img: bentonite, title: "Bentonito kraikas", desc: "Klumpės tipo bentonitas – idealus kačių tualetams." },
                      { img: flaxBedding, title: "Linų sėmenų kraikas", desc: "Ekologiškas linų kraikas – hipoalerginis ir biologiškai skaidus." },
                      { img: sawdustBriquettes, title: "Pjuvenų briketai", desc: "Suspausti pjuvenų briketai – puikiai tinka arkliams." },
                    ].map((p) => (
                      <td key={p.title} width="25%" style={{ verticalAlign: "top", textAlign: "center" }}>
                        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                          <tbody>
                            <tr>
                              <td>
                                <img src={p.img} alt={p.title} width="100%" style={{ height: "180px", objectFit: "cover", display: "block" }} />
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
              <h2 style={{ color: "#1e3a8a", fontSize: "32px", marginBottom: "10px" }}>Privalumai B2B Partneriams</h2>
              <p style={{ color: "#64748b", marginBottom: "40px" }}>Kodėl verta rinktis Belacor invest?</p>
            </td>
          </tr>
          <tr>
            <td>
              <table width="80%" cellPadding={20} cellSpacing={0} style={{ margin: "0 auto" }}>
                <tbody>
                  <tr>
                    {[
                      { icon: "💰", title: "Mažiausia kaina už toną", desc: "Konkurencingos didmeninės kainos dideliems užsakymams" },
                      { icon: "🚚", title: "Pristatymas visoje Lietuvoje", desc: "Greitas ir patikimas pristatymas iki jūsų sandėlio" },
                      { icon: "📋", title: "Lizingo galimybės", desc: "Lanksčios mokėjimo sąlygos dideliems kiekiams" },
                      { icon: "🏷️", title: "Private Label", desc: "Galimybė gaminti produkciją su jūsų prekės ženklu" },
                    ].map((a) => (
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
              <h2 style={{ color: "#1e3a8a", fontSize: "28px", marginBottom: "10px" }}>Mūsų Klientai</h2>
              <p style={{ color: "#64748b", marginBottom: "30px" }}>Dirbame su verslu visoje Lietuvoje</p>
            </td>
          </tr>
          <tr>
            <td>
              <table width="70%" cellPadding={15} cellSpacing={0} style={{ margin: "0 auto" }}>
                <tbody>
                  <tr>
                    {["🐾 Zoobutikai", "🏥 Veterinarijos klinikos", "🐄 Fermos", "🐴 Arklių žirgynai"].map((c) => (
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
                      <p style={{ fontSize: "13px", opacity: 0.8, lineHeight: 1.7 }}>
                        Premium kraikas gyvūnams B2B.<br />
                        Didmeninė prekyba visoje Lietuvoje.
                      </p>
                    </td>
                    <td width="33%" style={{ verticalAlign: "top", color: "white", textAlign: "center" }}>
                      <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0 }}>Kontaktai</h3>
                      <p style={{ fontSize: "13px", opacity: 0.8, lineHeight: 1.8 }}>
                        📞 +370 600 00000<br />
                        ✉ info@belacorinvest.lt<br />
                        📍 Vilnius, Lietuva
                      </p>
                    </td>
                    <td width="33%" style={{ verticalAlign: "top", color: "white", textAlign: "right" }}>
                      <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0 }}>Socialiniai tinklai</h3>
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
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: 0 }}>
                © 2025 visos teisės saugomos. BELACOR INVEST | Privatumo politika
              </p>
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
