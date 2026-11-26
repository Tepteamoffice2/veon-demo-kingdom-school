// Facts for the homepage. Source: veon/client.json (company.*, C-001, C-006, C-011). Nothing here is invented.

export const SOON = "Розділ у розробці";

export interface Phone { href: string; label: string; who: string; }

export const PHONE_SCHOOL: Phone = { href: "tel:+380975959549", label: "097 59 59 549", who: "Школа і ліцей" };
export const PHONE_KIDS: Phone = { href: "tel:+380673131600", label: "067 31 31 600", who: "Садочки Kingdom Kids" };

export const INSTAGRAM = "https://www.instagram.com/kingdomschoollviv/";
export const FACEBOOK = "https://www.facebook.com/kingdomschoollviv";
export const HOURS = "Щодня 8:00–18:00";
export const LEGAL_NAME = "ТзОВ «КІНГДОМ ФЕМЕЛІ СКУЛ»";

export const NAV = [
  { href: "#directions", label: "Напрями" },
  { href: "#program", label: "Навчання" },
  { href: "#afterschool", label: "Гуртки й табори" },
  { href: "#admission", label: "Вступ" },
  { href: "#about", label: "Про нас" },
  { href: "#contacts", label: "Контакти" },
] as const;

export interface Location { street: string; place: string; district: string; phone: Phone; }

const map = (street: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Львів, ${street}`)}`;
export const mapUrl = map;

export const LOCATIONS: Location[] = [
  { street: "вул. Перфецького, 14", place: "Kingdom School і Kingdom Lyceum", district: "Франківський район", phone: PHONE_SCHOOL },
  { street: "вул. Чорнобаївська, 43Б", place: "Садочок Kingdom Kids", district: "Залізничний район", phone: PHONE_KIDS },
  { street: "вул. Кульпарківська, 99Б", place: "Садочок Kingdom Kids", district: "Франківський район", phone: PHONE_KIDS },
];

/** Age stages on the scale, in the order a child grows. */
export interface Stage {
  id: string;
  brand: string;
  scaleTitle: string;
  scaleNote: string;
  num: string;
  unit: string;
  lead: string;
  facts: string[];
  places: { street: string; district: string }[];
  phone: Phone;
  callLabel: string;
}

export const STAGES: Stage[] = [
  {
    id: "stage-kids",
    brand: "Kingdom Kids",
    scaleTitle: "Kingdom Kids",
    scaleNote: "від 1 року",
    num: "1",
    unit: "рік",
    lead: "Приватні дитячі садочки, групи від 1 року.",
    facts: ["Два садочки у двох районах Львова"],
    places: [
      { street: "вул. Чорнобаївська, 43Б", district: "Залізничний район" },
      { street: "вул. Кульпарківська, 99Б", district: "Франківський район" },
    ],
    phone: PHONE_KIDS,
    callLabel: "Подзвонити в садочок",
  },
  {
    id: "stage-preschool",
    brand: "Kingdom Preschool",
    scaleTitle: "Preschool",
    scaleNote: "підготовка до школи",
    num: "до 1",
    unit: "класу",
    lead: "Підготовка дитини до школи.",
    facts: ["Програму, розклад і групу підкажуть за телефоном"],
    places: [],
    phone: PHONE_SCHOOL,
    callLabel: "Подзвонити",
  },
  {
    id: "stage-school",
    brand: "Kingdom School",
    scaleTitle: "School",
    scaleNote: "1–4 клас",
    num: "1–4",
    unit: "клас",
    lead: "Ліцензована приватна початкова школа повного дня за програмою НУШ.",
    facts: ["Поглиблена англійська"],
    places: [{ street: "вул. Перфецького, 14", district: "Франківський район" }],
    phone: PHONE_SCHOOL,
    callLabel: "Подзвонити в школу",
  },
  {
    id: "stage-lyceum",
    brand: "Kingdom Lyceum",
    scaleTitle: "Lyceum",
    scaleNote: "1–12 клас",
    num: "1–12",
    unit: "клас",
    lead: "Ліцензований ліцей 1–12 класів, відкритий у 2023 році.",
    facts: ["Профіль: фінансова грамотність, підприємництво, лідерство"],
    places: [{ street: "вул. Перфецького, 14", district: "Франківський район" }],
    phone: PHONE_SCHOOL,
    callLabel: "Подзвонити в ліцей",
  },
];

export const CLUBS = [
  "Айкідо", "Художня школа", "Королівський етикет", "Minecraft", "Lego", "Шахи", "Футбол",
  "Сучасний танець", "Повітряна акробатика", "Черлідинг", "«Крута наука»", "Ментальна арифметика",
  "Вокал", "Кулінарія", "Логопед", "Scratch", "3D-моделювання", "Arduino", "KODU Game Lab", "Roblox",
];

export const CAMPS = [
  { title: "Літній табір", note: "Kingdom Summer Camp 2026: 6 тематичних змін по 10 робочих днів" },
  { title: "Осінній табір", note: "" },
  { title: "Зимовий табір", note: "Для дітей 5–12 років" },
  { title: "Весняний табір", note: "" },
];

export const DEPARTMENTS = [
  { title: "Мовна кафедра", text: "Англійська мова: щодня, у групах за рівнем знань." },
  { title: "IT & Logic", text: "Цифрові навички, програмування, 3D і VR, стартапи." },
  { title: "Українська філологія", text: "Читання, медіаграмотність, дебати." },
  { title: "Nature of Science", text: "Інтегрований природничо-суспільний курс." },
];
