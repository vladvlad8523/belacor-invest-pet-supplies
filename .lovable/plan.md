

## Problema

Desktop lentelė turi `minWidth: "1600px"`, bet vartotojo ekranas yra tik 1336px pločio — todėl lentelė netelpa ir reikia horizontaliai slinkti.

## Sprendimas

1. **Pašalinti `minWidth: "1600px"`** iš lentelės ir naudoti `tableLayout: "fixed"` su `width: 100%`, kad lentelė automatiškai tilptų į ekraną.

2. **Optimizuoti stulpelių plotį** — pridėti `colgroup` su procentiniais pločiais kiekvienam stulpeliui, kad svarbiausi stulpeliai (Įmonė, Produktas, Žinutė) gautų daugiau vietos, o siauresniai (Nr., Vnt., Būsena) — mažiau.

3. **Pridėti `word-break: break-word`** ir `overflow: hidden; textOverflow: "ellipsis"` ilgesniems laukams (el. paštas, žinutė), kad tekstas nesuplėštų lentelės.

4. **Sumažinti `padding`** stulpeliuose nuo `10px 12px` iki `8px 6px`, kad sutaupyti vietos.

### Orientacinis stulpelių paskirstymas (12 stulpelių):
- Nr. 4% | Data 7% | Įmonė 12% | Kontaktas 9% | Tel. 8% | El.paštas 10% | Produktas 12% | Kiekis 5% | Vnt. 5% | Būsena 8% | Žinutė 12% | Veiksmas 8%

