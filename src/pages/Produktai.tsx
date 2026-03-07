import SiteLayout from "@/components/SiteLayout";
import heroBedding from "@/assets/hero-bedding.jpg";
import bentonite from "@/assets/bentonite.jpg";
import flaxBedding from "@/assets/flax-bedding.jpg";
import sawdustBriquettes from "@/assets/sawdust-briquettes.jpg";

const productImages = [heroBedding, bentonite, flaxBedding, sawdustBriquettes];

const Produktai = () => (
  <SiteLayout>
    {({ lang, t }) => (
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fafafa" }}>
        <tbody>
          <tr>
            <td style={{ padding: "50px 30px", textAlign: "center" }}>
              <h1 style={{ color: "#1e3a8a", fontSize: "32px", marginBottom: "10px" }}>{t.prodTitle}</h1>
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
    )}
  </SiteLayout>
);

export default Produktai;
