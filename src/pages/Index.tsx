import { useState, useEffect } from "react";
import heroBedding from "@/assets/hero-bedding.jpg";
import bentonite from "@/assets/bentonite.jpg";
import flaxBedding from "@/assets/flax-bedding.jpg";
import sawdustBriquettes from "@/assets/sawdust-briquettes.jpg";
import belacorLogo from "@/assets/belacor-logo.jpg";

const faqData = {
  lt: [
    {
      q: "Kokie yra kačių kraikų tipai?",
      a: "Populiariausi kačių kraikų tipai: Bentonitinis – pagamintas iš natūralaus molio, gerai sugeria kvapus. Silikoninis – pagamintas iš silikagelio, efektyviausias, puikiai sugeria drėgmę. TOFU augalinis – pagamintas iš 100% natūralios žirnių ląstelienos, ekologiškas ir biologiškai skaidus.",
    },
    {
      q: "Kas yra TOFU kraikas?",
      a: "TOFU – pagamintas iš 100% natūralios žirnių ląstelienos, be sintetinių priedų. Greitai sugeria drėgmę, neutralizuoja kvapus, švelnus katės pėdutėms. Panaudotą galima nuleisti į klozetą.",
    },
    {
      q: "Kuris kačių kraikas yra geriausias?",
      a: "Geriausias kačių kraikas yra tas, kuris labiausiai tinka jūsų katei. Kelioms katėms – silikagelio užpildas. Alergiškiems – natūralus kraikas. Stebėkite savo augintinės elgesį.",
    },
  ],
  en: [
    {
      q: "What types of cat litter are there?",
      a: "Most popular types: Bentonite – made from natural clay, absorbs odors well. Silicone – made from silica gel, most effective, excellent moisture absorption. TOFU plant-based – made from 100% natural pea fiber, eco-friendly and biodegradable.",
    },
    {
      q: "What is TOFU litter?",
      a: "TOFU litter is made from 100% natural pea fiber, no synthetic additives. It absorbs moisture quickly, neutralizes odors, and is gentle on cat paws. Used litter can be flushed down the toilet.",
    },
    {
      q: "Which cat litter is the best?",
      a: "The best cat litter is the one that suits your cat best. For multiple cats – silica gel. For allergies – natural litter. Observe your pet's behavior.",
    },
  ],
  ru: [
    {
      q: "Какие бывают типы наполнителей для кошек?",
      a: "Популярные типы: Бентонитовый – из натуральной глины, хорошо впитывает запахи. Силиконовый – из силикагеля, самый эффективный. ТОФУ растительный – из 100% натурального горохового волокна, экологичный.",
    },
    {
      q: "Что такое наполнитель ТОФУ?",
      a: "ТОФУ – из 100% натурального горохового волокна, без синтетических добавок. Быстро впитывает влагу, нейтрализует запахи. Использованный можно смывать в унитаз.",
    },
    {
      q: "Какой наполнитель для кошек лучший?",
      a: "Лучший наполнитель – тот, который подходит вашей кошке. Для нескольких кошек – силикагель. При аллергии – натуральный наполнитель.",
    },
  ],
  lv: [
    {
      q: "Kādi ir kaķu pakaiši?",
      a: "Populārākie veidi: Bentonīta – no dabīgā māla, labi absorbē smakas. Silikona – no silikagēla, efektīvākais. TOFU augu izcelsmes – no 100% dabīgās zirņu šķiedras, ekoloģisks.",
    },
    {
      q: "Kas ir TOFU pakaiši?",
      a: "TOFU – no 100% dabīgās zirņu šķiedras, bez sintētiskiem piedevām. Ātri absorbē mitrumu, neitralizē smakas. Izlietotos var noskalot tualetē.",
    },
    {
      q: "Kuri kaķu pakaiši ir labākie?",
      a: "Labākie pakaiši ir tie, kas vislabāk der jūsu kaķim. Vairākiem kaķiem – silikagēls. Alerģiķiem – dabīgie pakaiši.",
    },
  ],
  et: [
    {
      q: "Millised on kasside allapanu tüübid?",
      a: "Populaarsemad tüübid: Bentoniit – looduslikust savist, imab hästi lõhnu. Silikoon – silikageelist, kõige tõhusam. TOFU taimne – 100% looduslikust hernekiust, ökoloogiline.",
    },
    {
      q: "Mis on TOFU allapanu?",
      a: "TOFU – 100% looduslikust hernekiust, ilma sünteetiliste lisanditeta. Imab kiiresti niiskust, neutraliseerib lõhnu. Kasutatud saab WC-sse valada.",
    },
    {
      q: "Milline kassi allapanu on parim?",
      a: "Parim allapanu on see, mis sobib teie kassile kõige paremini. Mitmele kassile – silikageel. Allergikutele – looduslik allapanu.",
    },
  ],
};

const translations = {
  lt: {
    nav: ["Privalumai", "Produktai", "DUK", "Kontaktai"],
    login: "Prisijungti",
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
    faqTitle: "Dažniausiai Užduodami Klausimai",
    faqSub: "Atsakymai į populiariausius klausimus apie gyvūnų kraikus",
    shopCta: "🛒 Apsilankykite mūsų parduotuvėje",
    shopCtaDesc: "Peržiūrėkite visą mūsų asortimentą ir užsisakykite tiesiogiai iš mūsų e-parduotuvės",
    shopCtaBtn: "Eiti į parduotuvę →",
    footerDesc: "Premium kraikas gyvūnams B2B.\nDidmeninė prekyba visoje Lietuvoje.",
    footerContacts: "Kontaktai",
    footerSocial: "Socialiniai tinklai",
    footerCopy: "© 2025 visos teisės saugomos. BELACOR INVEST | Privatumo politika",
    workHoursTitle: "Darbo laikas",
    workHours1: "Pirm./Penkt.: 8:00 - 17:00 val.",
    workHours2: "Šeštadienis - nedirbame",
    workHours3: "Sekmadienis - nedirbame",
    reqTitle: "Rekvizitai",
    reqCompany: "UAB \"Belacor\"",
    reqAddress: "Islandijos pl. 95-57, LT-49176\nKaunas, Lietuva",
    reqCode: "Įmonės kodas: 302555498",
    reqVat: "PVM kodas: LT100005726715",
    contactTitle: "Kontaktams",
    contactOrders: "Prekių užsakymai:",
    contactEmail: "E-paštas:",
    howToGet: "Kaip atvykti",
    promoBanner: "🔥 Akcija! Nuolaidos didmeniniams užsakymams – susisiekite dėl individualaus pasiūlymo!",
    loginTitle: "Prisijungimas",
    loginEmail: "El. paštas",
    loginPass: "Slaptažodis",
    loginBtn: "Prisijungti",
    loginClose: "Uždaryti",
    backToTop: "Grįžti į viršų",
  },
  en: {
    nav: ["Advantages", "Products", "FAQ", "Contacts"],
    login: "Login",
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
    faqTitle: "Frequently Asked Questions",
    faqSub: "Answers to the most popular questions about animal bedding",
    shopCta: "🛒 Visit Our Online Shop",
    shopCtaDesc: "Browse our full range and order directly from our e-shop",
    shopCtaBtn: "Go to Shop →",
    footerDesc: "Premium animal bedding B2B.\nWholesale across Lithuania.",
    footerContacts: "Contacts",
    footerSocial: "Social media",
    footerCopy: "© 2025 all rights reserved. BELACOR INVEST | Privacy policy",
    workHoursTitle: "Working Hours",
    workHours1: "Mon/Fri: 8:00 - 17:00",
    workHours2: "Saturday - closed",
    workHours3: "Sunday - closed",
    reqTitle: "Company Details",
    reqCompany: "UAB \"Belacor\"",
    reqAddress: "Islandijos pl. 95-57, LT-49176\nKaunas, Lithuania",
    reqCode: "Company code: 302555498",
    reqVat: "VAT code: LT100005726715",
    contactTitle: "Contact Us",
    contactOrders: "Product orders:",
    contactEmail: "Email:",
    howToGet: "How to reach us",
    promoBanner: "🔥 Sale! Discounts on wholesale orders – contact us for a personalized offer!",
    loginTitle: "Login",
    loginEmail: "Email",
    loginPass: "Password",
    loginBtn: "Login",
    loginClose: "Close",
    backToTop: "Back to top",
  },
  ru: {
    nav: ["Преимущества", "Продукты", "FAQ", "Контакты"],
    login: "Войти",
    heroTitle1: "Свяжитесь с нами для ",
    heroTitle2: "предложения",
    heroSubtitle: "Заполните форму, и мы свяжемся с вами в течение 24 часов",
    success: "✓ Запрос успешно отправлен!",
    formCompany: "Название компании *",
    formContact: "Контактное лицо *",
    formPhone: "Телефон *",
    formEmail: "Эл. почта *",
    formQty: "Количество (тонн/мес) *",
    formType: "Тип наполнителя",
    formMsg: "Сообщение",
    formBtn: "✈ Отправить запрос",
    phCompany: "ООО Ваша компания",
    phContact: "Имя Фамилия",
    phPhone: "+370...",
    phEmail: "your@email.com",
    phQty: "напр. 5",
    phMsg: "Какой объём вас интересует? Для каких целей?",
    typeOptions: ["Дерево", "Бентонит", "Лён"],
    barTitle: "Belacor invest — Премиум наполнитель для животных B2B",
    barSub: "Большие объёмы · Лучшие цены · Чистый, долговечный, экологичный наполнитель",
    prodTitle: "Наша Продукция",
    prodSub: "Высочайшее качество для каждой потребности",
    products: [
      { title: "Древесные гранулы", desc: "Сосновые и дубовые гранулы – натуральный, хорошо впитывающий наполнитель." },
      { title: "Бентонитовый наполнитель", desc: "Комкующийся бентонит – идеален для кошачьих туалетов." },
      { title: "Льняной наполнитель", desc: "Экологичный льняной наполнитель – гипоаллергенный и биоразлагаемый." },
      { title: "Опилочные брикеты", desc: "Спрессованные опилочные брикеты – отлично подходят для лошадей." },
    ],
    advTitle: "Преимущества для B2B Партнёров",
    advSub: "Почему стоит выбрать Belacor invest?",
    advantages: [
      { icon: "💰", title: "Лучшая цена за тонну", desc: "Конкурентные оптовые цены для крупных заказов" },
      { icon: "🚚", title: "Доставка по всей Литве", desc: "Быстрая и надёжная доставка до вашего склада" },
      { icon: "📋", title: "Лизинг", desc: "Гибкие условия оплаты для больших объёмов" },
      { icon: "🏷️", title: "Private Label", desc: "Возможность производства под вашим брендом" },
    ],
    clientsTitle: "Наши Клиенты",
    clientsSub: "Работаем с бизнесом по всей Литве",
    clients: ["🐾 Зоомагазины", "🏥 Ветклиники", "🐄 Фермы", "🐴 Конюшни"],
    faqTitle: "Часто Задаваемые Вопросы",
    faqSub: "Ответы на популярные вопросы о наполнителях для животных",
    shopCta: "🛒 Посетите наш магазин",
    shopCtaDesc: "Ознакомьтесь с ассортиментом и закажите напрямую из нашего интернет-магазина",
    shopCtaBtn: "Перейти в магазин →",
    footerDesc: "Премиум наполнитель для животных B2B.\nОптовая торговля по всей Литве.",
    footerContacts: "Контакты",
    footerSocial: "Соц. сети",
    footerCopy: "© 2025 все права защищены. BELACOR INVEST | Политика конфиденциальности",
    workHoursTitle: "Режим работы",
    workHours1: "Пн/Пт: 8:00 - 17:00",
    workHours2: "Суббота - выходной",
    workHours3: "Воскресенье - выходной",
    reqTitle: "Реквизиты",
    reqCompany: "UAB \"Belacor\"",
    reqAddress: "Islandijos pl. 95-57, LT-49176\nКаунас, Литва",
    reqCode: "Код компании: 302555498",
    reqVat: "НДС код: LT100005726715",
    contactTitle: "Для связи",
    contactOrders: "Заказ товаров:",
    contactEmail: "Эл. почта:",
    howToGet: "Как добраться",
    promoBanner: "🔥 Акция! Скидки на оптовые заказы – свяжитесь для индивидуального предложения!",
    loginTitle: "Вход",
    loginEmail: "Эл. почта",
    loginPass: "Пароль",
    loginBtn: "Войти",
    loginClose: "Закрыть",
    backToTop: "Наверх",
  },
  lv: {
    nav: ["Priekšrocības", "Produkti", "BUJ", "Kontakti"],
    login: "Ielogoties",
    heroTitle1: "Sazinieties ar mums ",
    heroTitle2: "piedāvājumam",
    heroSubtitle: "Aizpildiet formu un mēs sazināsimies ar jums 24 stundu laikā",
    success: "✓ Pieprasījums veiksmīgi nosūtīts!",
    formCompany: "Uzņēmuma nosaukums *",
    formContact: "Kontaktpersona *",
    formPhone: "Tālrunis *",
    formEmail: "E-pasts *",
    formQty: "Daudzums (tonnas/mēn) *",
    formType: "Pakaiša veids",
    formMsg: "Ziņojums",
    formBtn: "✈ Nosūtīt pieprasījumu",
    phCompany: "SIA Jūsu uzņēmums",
    phContact: "Vārds Uzvārds",
    phPhone: "+371...",
    phEmail: "jusu@email.lv",
    phQty: "piem. 5",
    phMsg: "Kāds daudzums jūs interesē? Kādam mērķim?",
    typeOptions: ["Koks", "Bentonīts", "Lini"],
    barTitle: "Belacor invest — Premium dzīvnieku pakaiši B2B",
    barSub: "Lielākie apjomi · Labākās cenas biznesam · Tīri, ilgmūžīgi, ekoloģiski pakaiši",
    prodTitle: "Mūsu Produkti",
    prodSub: "Augstākās kvalitātes pakaiši katrai vajadzībai",
    products: [
      { title: "Koka granulas", desc: "Priedes un ozola granulas – dabīgs, labi absorbējošs pakaiši." },
      { title: "Bentonīta pakaiši", desc: "Komkošanās bentonīts – ideāls kaķu tualetēm." },
      { title: "Linu pakaiši", desc: "Ekoloģiski linu pakaiši – hipoalerģiski un bioloģiski noārdāmi." },
      { title: "Skaidu briketes", desc: "Saspiestas skaidu briketes – lieliski piemērotas zirgiem." },
    ],
    advTitle: "Priekšrocības B2B Partneriem",
    advSub: "Kāpēc izvēlēties Belacor invest?",
    advantages: [
      { icon: "💰", title: "Zemākā cena par tonnu", desc: "Konkurētspējīgas vairumtirdzniecības cenas" },
      { icon: "🚚", title: "Piegāde visā Lietuvā", desc: "Ātra un uzticama piegāde līdz jūsu noliktavai" },
      { icon: "📋", title: "Līzinga iespējas", desc: "Elastīgi maksājuma nosacījumi lieliem apjomiem" },
      { icon: "🏷️", title: "Private Label", desc: "Iespēja ražot ar jūsu zīmolu" },
    ],
    clientsTitle: "Mūsu Klienti",
    clientsSub: "Strādājam ar uzņēmumiem visā Lietuvā",
    clients: ["🐾 Zoobutiki", "🏥 Veterinārklīnikas", "🐄 Fermas", "🐴 Zirgu staļļi"],
    faqTitle: "Biežāk Uzdotie Jautājumi",
    faqSub: "Atbildes uz populārākajiem jautājumiem par dzīvnieku pakaišiem",
    shopCta: "🛒 Apmeklējiet mūsu veikalu",
    shopCtaDesc: "Apskatiet visu mūsu sortimentu un pasūtiet tieši no mūsu e-veikala",
    shopCtaBtn: "Doties uz veikalu →",
    footerDesc: "Premium dzīvnieku pakaiši B2B.\nVairumtirdzniecība visā Lietuvā.",
    footerContacts: "Kontakti",
    footerSocial: "Sociālie tīkli",
    footerCopy: "© 2025 visas tiesības aizsargātas. BELACOR INVEST | Privātuma politika",
    workHoursTitle: "Darba laiks",
    workHours1: "Pirmd./Piekt.: 8:00 - 17:00",
    workHours2: "Sestdiena - nestrādājam",
    workHours3: "Svētdiena - nestrādājam",
    reqTitle: "Rekvizīti",
    reqCompany: "UAB \"Belacor\"",
    reqAddress: "Islandijos pl. 95-57, LT-49176\nKauņa, Lietuva",
    reqCode: "Uzņēmuma kods: 302555498",
    reqVat: "PVN kods: LT100005726715",
    contactTitle: "Kontaktiem",
    contactOrders: "Preču pasūtījumi:",
    contactEmail: "E-pasts:",
    howToGet: "Kā nokļūt",
    promoBanner: "🔥 Akcija! Atlaides vairumtirdzniecības pasūtījumiem – sazinieties par individuālu piedāvājumu!",
    loginTitle: "Ielogoties",
    loginEmail: "E-pasts",
    loginPass: "Parole",
    loginBtn: "Ielogoties",
    loginClose: "Aizvērt",
    backToTop: "Atpakaļ uz augšu",
  },
  et: {
    nav: ["Eelised", "Tooted", "KKK", "Kontaktid"],
    login: "Logi sisse",
    heroTitle1: "Võtke meiega ühendust ",
    heroTitle2: "pakkumise saamiseks",
    heroSubtitle: "Täitke vorm ja me võtame teiega ühendust 24 tunni jooksul",
    success: "✓ Päring edukalt saadetud!",
    formCompany: "Ettevõtte nimi *",
    formContact: "Kontaktisik *",
    formPhone: "Telefon *",
    formEmail: "E-post *",
    formQty: "Kogus (tonni/kuu) *",
    formType: "Allapanu tüüp",
    formMsg: "Sõnum",
    formBtn: "✈ Saada päring",
    phCompany: "OÜ Teie ettevõte",
    phContact: "Eesnimi Perekonnanimi",
    phPhone: "+372...",
    phEmail: "teie@email.ee",
    phQty: "nt. 5",
    phMsg: "Milline kogus teid huvitab? Milleks kasutate?",
    typeOptions: ["Puit", "Bentoniit", "Lina"],
    barTitle: "Belacor invest — Premium loomade allapanu B2B",
    barSub: "Suurimad kogused · Parimad hinnad ettevõtetele · Puhas, vastupidav, ökoloogiline allapanu",
    prodTitle: "Meie Tooted",
    prodSub: "Kõrgeima kvaliteediga allapanu igale vajadusele",
    products: [
      { title: "Puitgraanulid", desc: "Männi- ja tammepuidust graanulid – looduslik, hästi imav allapanu." },
      { title: "Bentoniit allapanu", desc: "Paakuv bentoniit – ideaalne kasside tualettidele." },
      { title: "Linaseemne allapanu", desc: "Ökoloogiline lina allapanu – hüpoallergeenne ja biolagunevalt." },
      { title: "Saepuru briketid", desc: "Pressitud saepuru briketid – suurepärane hobustele." },
    ],
    advTitle: "Eelised B2B Partneritele",
    advSub: "Miks valida Belacor invest?",
    advantages: [
      { icon: "💰", title: "Madalaim hind tonni kohta", desc: "Konkurentsivõimelised hulgimüügihinnad" },
      { icon: "🚚", title: "Tarne üle kogu Leedu", desc: "Kiire ja usaldusväärne tarne teie lattu" },
      { icon: "📋", title: "Liisingu võimalused", desc: "Paindlikud maksetingimused suurtele kogustele" },
      { icon: "🏷️", title: "Private Label", desc: "Võimalus toota teie kaubamärgi all" },
    ],
    clientsTitle: "Meie Kliendid",
    clientsSub: "Töötame ettevõtetega üle kogu Leedu",
    clients: ["🐾 Loomapoed", "🏥 Veterinaarklinikud", "🐄 Farmid", "🐴 Hobustallidd"],
    faqTitle: "Korduma Kippuvad Küsimused",
    faqSub: "Vastused populaarseimatele küsimustele loomade allapanu kohta",
    shopCta: "🛒 Külastage meie poodi",
    shopCtaDesc: "Tutvuge kogu meie sortimendiga ja tellige otse meie e-poest",
    shopCtaBtn: "Mine poodi →",
    footerDesc: "Premium loomade allapanu B2B.\nHulgimüük üle kogu Leedu.",
    footerContacts: "Kontaktid",
    footerSocial: "Sotsiaalmeedia",
    footerCopy: "© 2025 kõik õigused kaitstud. BELACOR INVEST | Privaatsuspoliitika",
    workHoursTitle: "Tööaeg",
    workHours1: "E/R: 8:00 - 17:00",
    workHours2: "Laupäev - suletud",
    workHours3: "Pühapäev - suletud",
    reqTitle: "Rekvisiidid",
    reqCompany: "UAB \"Belacor\"",
    reqAddress: "Islandijos pl. 95-57, LT-49176\nKaunas, Leedu",
    reqCode: "Ettevõtte kood: 302555498",
    reqVat: "KMKR kood: LT100005726715",
    contactTitle: "Kontaktideks",
    contactOrders: "Toodete tellimused:",
    contactEmail: "E-post:",
    howToGet: "Kuidas kohale jõuda",
    promoBanner: "🔥 Kampaania! Soodustused hulgitellimustele – võtke ühendust personaalse pakkumise saamiseks!",
    loginTitle: "Sisselogimine",
    loginEmail: "E-post",
    loginPass: "Parool",
    loginBtn: "Logi sisse",
    loginClose: "Sulge",
    backToTop: "Tagasi üles",
  },
};

type Lang = "lt" | "en" | "ru" | "lv" | "et";
const langLabels: Lang[] = ["lt", "en", "ru", "lv", "et"];

const Index = () => {
  const [lang, setLang] = useState<Lang>("lt");
  const t = translations[lang];
  const faq = faqData[lang];
  const navAnchors = ["privalumai", "produktai", "duk", "kontaktai"];

  const [showCookieModal, setShowCookieModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowCookieModal(true);
    }
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowCookieModal(false);
    if (typeof (window as any).loadGA === "function") {
      (window as any).loadGA();
    }
  };

  const handleCookieReject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setShowCookieModal(false);
  };

  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    phone: "",
    email: "",
    quantity: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, type: t.typeOptions[0] }));
  }, [lang]);

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
      {/* ===== PROMO BANNER ===== */}
      {showPromoBanner && (
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: "linear-gradient(90deg, #b91c1c 0%, #dc2626 50%, #b91c1c 100%)" }}>
          <tbody>
            <tr>
              <td style={{ padding: "10px 40px", textAlign: "center", position: "relative" }}>
                <p style={{ color: "white", fontSize: "14px", fontWeight: 700, margin: 0, letterSpacing: "0.5px" }}>
                  {t.promoBanner}
                </p>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setShowPromoBanner(false); }}
                  style={{
                    position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)",
                    color: "white", textDecoration: "none", fontSize: "18px", fontWeight: 700, opacity: 0.8,
                  }}
                >
                  ✕
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      )}

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
                            <td style={{ verticalAlign: "middle" }}>
                              <img src={belacorLogo} alt="Belacor invest logo" style={{ height: "45px", display: "block" }} />
                            </td>
                            <td style={{ paddingLeft: "16px", verticalAlign: "middle" }}>
                              <table cellPadding={0} cellSpacing={0} style={{ borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.3)" }}>
                                <tbody>
                                  <tr>
                                    {langLabels.map((l) => (
                                      <td
                                        key={l}
                                        onClick={() => setLang(l)}
                                        style={{
                                          padding: "5px 8px",
                                          cursor: "pointer",
                                          backgroundColor: lang === l ? "#d4af37" : "transparent",
                                          color: lang === l ? "#1e3a8a" : "white",
                                          fontSize: "12px",
                                          fontWeight: 700,
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        {l}
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
                    <td width="60%" style={{ textAlign: "right", verticalAlign: "middle" }}>
                      <table cellPadding={0} cellSpacing={0} style={{ display: "inline-table" }}>
                        <tbody>
                          <tr>
                            {t.nav.map((item, i) => (
                              <td key={item} style={{ padding: "0 4px" }}>
                                <a
                                  href={`#${navAnchors[i]}`}
                                  style={{
                                    color: "white",
                                    backgroundColor: "transparent",
                                    border: "1px solid rgba(255,255,255,0.4)",
                                    padding: "9px 16px",
                                    borderRadius: "6px",
                                    textDecoration: "none",
                                    fontWeight: 600,
                                    fontSize: "13px",
                                    display: "inline-block",
                                  }}
                                >
                                  {item}
                                </a>
                              </td>
                            ))}
                            <td style={{ padding: "0 4px" }}>
                              <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setShowLoginModal(true); }}
                                style={{
                                  color: "#1e3a8a",
                                  backgroundColor: "#d4af37",
                                  border: "none",
                                  padding: "9px 20px",
                                  borderRadius: "6px",
                                  textDecoration: "none",
                                  fontWeight: 700,
                                  fontSize: "13px",
                                  display: "inline-block",
                                }}
                              >
                                🔐 {t.login}
                              </a>
                            </td>
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
                <form onSubmit={handleSubmit}>
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

      {/* ===== DUK / FAQ ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} id="duk" style={{ backgroundColor: "#f0fdf4" }}>
        <tbody>
          <tr>
            <td style={{ padding: "50px 30px", textAlign: "center" }}>
              <h2 style={{ color: "#1e3a8a", fontSize: "32px", marginBottom: "10px" }}>{t.faqTitle}</h2>
              <p style={{ color: "#64748b", marginBottom: "40px" }}>{t.faqSub}</p>
            </td>
          </tr>
          <tr>
            <td>
              <table width="70%" cellPadding={0} cellSpacing={12} style={{ margin: "0 auto" }}>
                <tbody>
                  {faq.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <table
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          style={{
                            backgroundColor: "white",
                            borderRadius: "10px",
                            boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                            cursor: "pointer",
                          }}
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        >
                          <tbody>
                            <tr>
                              <td style={{ padding: "18px 24px" }}>
                                <table width="100%" cellPadding={0} cellSpacing={0}>
                                  <tbody>
                                    <tr>
                                      <td style={{ color: "#1e3a8a", fontSize: "16px", fontWeight: 700 }}>
                                        {item.q}
                                      </td>
                                      <td width="30" style={{ textAlign: "right", color: "#d4af37", fontSize: "20px", fontWeight: 700 }}>
                                        {openFaq === i ? "−" : "+"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                {openFaq === i && (
                                  <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.7, marginTop: "12px", marginBottom: 0 }}>
                                    {item.a}
                                  </p>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
          <tr><td style={{ height: "40px" }}></td></tr>
        </tbody>
      </table>

      {/* ===== KLIENTAI ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "white" }}>
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
                        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f8fafc", borderRadius: "10px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
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

      {/* ===== PARDUOTUVĖS CTA ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)" }}>
        <tbody>
          <tr>
            <td style={{ padding: "50px 30px", textAlign: "center" }}>
              <h2 style={{ color: "#d4af37", fontSize: "30px", marginBottom: "12px", letterSpacing: "1px" }}>{t.shopCta}</h2>
              <p style={{ color: "white", fontSize: "16px", opacity: 0.9, maxWidth: "500px", margin: "0 auto 28px auto" }}>{t.shopCtaDesc}</p>
              <a
                href="https://www.belacor.lt/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "14px 40px",
                  backgroundColor: "#d4af37",
                  color: "#1e3a8a",
                  fontWeight: 700,
                  fontSize: "17px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  boxShadow: "0 4px 15px rgba(212,175,55,0.4)",
                }}
              >
                {t.shopCtaBtn}
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== KONTAKTAI / FOOTER ===== */}
      <table width="100%" cellPadding={0} cellSpacing={0} id="kontaktai" style={{ backgroundColor: "#1e3a8a" }}>
        <tbody>
          <tr>
            <td style={{ padding: "40px 40px 20px" }}>
              <table width="100%" cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    {/* Darbo laikas */}
                    <td width="25%" style={{ verticalAlign: "top", color: "white", padding: "0 10px" }}>
                      <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0, marginBottom: "12px" }}>🕐 {t.workHoursTitle}</h3>
                      <p style={{ fontSize: "13px", opacity: 0.85, lineHeight: 1.8, margin: 0 }}>
                        {t.workHours1}<br />
                        {t.workHours2}<br />
                        {t.workHours3}
                      </p>
                    </td>
                    {/* Rekvizitai */}
                    <td width="25%" style={{ verticalAlign: "top", color: "white", padding: "0 10px" }}>
                      <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0, marginBottom: "12px" }}>📋 {t.reqTitle}</h3>
                      <p style={{ fontSize: "13px", opacity: 0.85, lineHeight: 1.8, margin: 0 }}>
                        {t.reqCompany}<br />
                        {t.reqAddress.split("\n").map((line, i) => (
                          <span key={i}>{line}<br /></span>
                        ))}
                        {t.reqCode}<br />
                        {t.reqVat}
                      </p>
                    </td>
                    {/* Kontaktams */}
                    <td width="25%" style={{ verticalAlign: "top", color: "white", padding: "0 10px" }}>
                      <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0, marginBottom: "12px" }}>📞 {t.contactTitle}</h3>
                      <p style={{ fontSize: "13px", opacity: 0.85, lineHeight: 1.8, margin: 0 }}>
                        {t.contactOrders}<br />
                        <a href="tel:+37068853541" style={{ color: "#d4af37", textDecoration: "none" }}>+370 688 53541</a><br />
                        {t.contactEmail}<br />
                        <a href="mailto:info@belacor.lt" style={{ color: "#d4af37", textDecoration: "none" }}>info@belacor.lt</a>
                      </p>
                    </td>
                    {/* Socialiniai tinklai */}
                    <td width="25%" style={{ verticalAlign: "top", color: "white", padding: "0 10px", textAlign: "right" }}>
                      <h3 style={{ color: "#d4af37", fontSize: "16px", marginTop: 0, marginBottom: "12px" }}>{t.footerSocial}</h3>
                      <p style={{ fontSize: "20px", margin: 0 }}>
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
                ⬆ {t.backToTop}
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== LOGIN MODAL ===== */}
      {showLoginModal && (
        <>
          <table width="100%" cellPadding={0} cellSpacing={0} style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 9998,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}>
            <tbody><tr><td></td></tr></tbody>
          </table>
          <table cellPadding={0} cellSpacing={0} style={{
            position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            zIndex: 9999, backgroundColor: "white", borderRadius: "16px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)", width: "400px", maxWidth: "90%",
          }}>
            <tbody>
              <tr>
                <td style={{ padding: "32px 28px 20px", position: "relative" }}>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setShowLoginModal(false); }}
                    style={{
                      position: "absolute", top: "12px", right: "16px",
                      color: "#94a3b8", fontSize: "22px", textDecoration: "none",
                      fontWeight: 700, lineHeight: 1,
                    }}
                  >
                    ✕
                  </a>
                  <h3 style={{ color: "#1e3a8a", fontSize: "22px", margin: "0 0 6px", textAlign: "center" }}>🔐 {t.loginTitle}</h3>
                  <p style={{ color: "#64748b", fontSize: "13px", textAlign: "center", marginBottom: "20px" }}>Belacor invest B2B</p>
                  <table width="100%" cellPadding={0} cellSpacing={8}>
                    <tbody>
                      <tr>
                        <td>
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.loginEmail}</p>
                          <input type="email" placeholder="info@company.com" style={inputStyle} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "13px" }}>{t.loginPass}</p>
                          <input type="password" placeholder="••••••••" style={inputStyle} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button
                            onClick={() => setShowLoginModal(false)}
                            style={{
                              width: "100%", backgroundColor: "#1e3a8a", color: "white",
                              border: "none", padding: "12px", borderRadius: "8px",
                              fontSize: "15px", fontWeight: 700, cursor: "pointer",
                            }}
                          >
                            {t.loginBtn}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      {/* ===== COOKIE CONSENT MODAL ===== */}
      {showCookieModal && (
        <>
          <table width="100%" cellPadding={0} cellSpacing={0} style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 9998,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}>
            <tbody><tr><td></td></tr></tbody>
          </table>
          <table cellPadding={0} cellSpacing={0} style={{
            position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            zIndex: 9999, backgroundColor: "white", borderRadius: "16px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)", width: "440px", maxWidth: "90%",
          }}>
            <tbody>
              <tr>
                <td style={{ padding: "32px 28px 20px", textAlign: "center", position: "relative" }}>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setShowCookieModal(false); }}
                    style={{
                      position: "absolute", top: "12px", right: "16px",
                      color: "#94a3b8", fontSize: "22px", textDecoration: "none",
                      fontWeight: 700, lineHeight: 1,
                    }}
                  >
                    ✕
                  </a>
                  <p style={{ fontSize: "36px", margin: "0 0 12px" }}>🍪</p>
                  <h3 style={{ color: "#1e3a8a", fontSize: "20px", margin: "0 0 12px" }}>
                    {lang === "lt" ? "Slapukų nustatymai" : lang === "ru" ? "Настройки файлов cookie" : lang === "lv" ? "Sīkdatņu iestatījumi" : lang === "et" ? "Küpsiste seaded" : "Cookie Settings"}
                  </h3>
                  <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.6, margin: "0 0 20px" }}>
                    {lang === "lt"
                      ? "Mes naudojame būtinus slapukus kontaktinės formos veikimui ir Google Analytics slapukus svetainės lankomumo analizei."
                      : lang === "ru"
                      ? "Мы используем необходимые файлы cookie для работы формы и Google Analytics для анализа посещаемости."
                      : lang === "lv"
                      ? "Mēs izmantojam nepieciešamās sīkdatnes kontaktformas darbībai un Google Analytics sīkdatnes apmeklētāju analīzei."
                      : lang === "et"
                      ? "Kasutame vajalikke küpsiseid kontaktivormi toimimiseks ja Google Analytics küpsiseid veebilehe külastatavuse analüüsimiseks."
                      : "We use essential cookies for the contact form and Google Analytics cookies for website traffic analysis."}
                  </p>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0 28px 28px" }}>
                  <table width="100%" cellPadding={0} cellSpacing={8}>
                    <tbody>
                      <tr>
                        <td width="50%">
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); handleCookieAccept(); }}
                            style={{
                              display: "block", textAlign: "center", backgroundColor: "#1e3a8a", color: "white",
                              padding: "12px 0", borderRadius: "8px", textDecoration: "none",
                              fontWeight: 700, fontSize: "14px",
                            }}
                          >
                            {lang === "lt" ? "✓ Sutinku su visais" : lang === "ru" ? "✓ Принять все" : lang === "lv" ? "✓ Pieņemt visus" : lang === "et" ? "✓ Nõustu kõigiga" : "✓ Accept All"}
                          </a>
                        </td>
                        <td width="50%">
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); handleCookieReject(); }}
                            style={{
                              display: "block", textAlign: "center", backgroundColor: "transparent",
                              color: "#1e3a8a", padding: "12px 0", borderRadius: "8px",
                              textDecoration: "none", fontWeight: 700, fontSize: "14px",
                              border: "2px solid #1e3a8a",
                            }}
                          >
                            {lang === "lt" ? "Tik būtini" : lang === "ru" ? "Только необходимые" : lang === "lv" ? "Tikai nepieciešamie" : lang === "et" ? "Ainult vajalikud" : "Essential Only"}
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
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
