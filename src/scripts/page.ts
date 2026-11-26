// Page behaviour: mobile menu, active nav item, crown marker, day tabs, clubs "show all", mobile call bar.
// Every part is optional: without scripts the content is complete and visible.

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* Mobile menu: opens under the header, closes on Esc, on a link, and when the screen grows. */
function initMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  if (!toggle || !menu) return;
  const setOpen = (open: boolean, returnFocus = false) => {
    toggle.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
    document.documentElement.classList.toggle("menu-open", open);
    if (open) menu.querySelector<HTMLAnchorElement>("a")?.focus();
    else if (returnFocus) toggle.focus();
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setOpen(false, true);
  });
  window.matchMedia("(min-width: 1200px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
}

/* Active section in the header nav. */
function initActiveNav(): void {
  const links = [...document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")];
  if (!links.length || !("IntersectionObserver" in window)) return;
  const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach((a) => a.removeAttribute("aria-current"));
      byId.get(e.target.id)?.setAttribute("aria-current", "true");
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  byId.forEach((_a, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  // First screen: no menu item is active.
  const hero = document.getElementById("hero");
  if (hero) new IntersectionObserver(([e]) => { if (e.isIntersecting) links.forEach((a) => a.removeAttribute("aria-current")); }, { rootMargin: "-45% 0px -50% 0px" }).observe(hero);
}

/* Effect 2: the crown marker moves down the age scale to the stage being read (desktop, motion allowed). */
function initCrown(): void {
  const wrap = document.querySelector<HTMLElement>("[data-stages]");
  const crown = wrap?.querySelector<HTMLElement>("[data-crown]");
  const stages = wrap ? [...wrap.querySelectorAll<HTMLElement>("[data-stage]")] : [];
  if (!wrap || !crown || !stages.length || !("IntersectionObserver" in window)) return;
  const desktop = window.matchMedia("(min-width: 1024px)");
  const root = document.documentElement;
  let current: HTMLElement = stages[0];
  const place = () => {
    const crownTarget = current.querySelector<HTMLElement>(".stage__crown");
    const y = crownTarget ? crownTarget.offsetTop + current.offsetTop - crown.offsetHeight / 2 + crownTarget.offsetHeight / 2 : current.offsetTop;
    wrap.style.setProperty("--crown-y", `${Math.max(0, y)}px`);
  };
  const update = () => {
    const live = desktop.matches && !reduceMotion.matches;
    root.classList.toggle("crown-live", live);
    if (live) place();
  };
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { current = e.target as HTMLElement; place(); }
  }, { rootMargin: "-40% 0px -55% 0px" });
  stages.forEach((s) => io.observe(s));
  desktop.addEventListener("change", update);
  reduceMotion.addEventListener("change", update);
  window.addEventListener("resize", () => { if (root.classList.contains("crown-live")) place(); }, { passive: true });
  update();
}

/* Effect 3: tabs in #day (arrow keys move between tabs, panels cross-fade). */
function initTabs(): void {
  document.querySelectorAll<HTMLElement>("[data-tabs]").forEach((list) => {
    const tabs = [...list.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const select = (tab: HTMLButtonElement, focus = false) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls") || "");
        if (panel) panel.dataset.active = String(on);
      });
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        let next = -1;
        if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = tabs.length - 1;
        if (next >= 0) { e.preventDefault(); select(tabs[next], true); }
      });
    });
  });
}

/* Clubs on phones: the first 8, then "show all". */
function initClubs(): void {
  const box = document.querySelector<HTMLElement>("[data-clubs]");
  const btn = box?.querySelector<HTMLButtonElement>("[data-clubs-more]");
  if (!box || !btn) return;
  btn.addEventListener("click", () => {
    const open = !box.classList.contains("is-open");
    box.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    const label = btn.querySelector("[data-label]");
    if (label) label.textContent = open ? "Згорнути список" : "Показати всі гуртки";
  });
}

/* Effect 5: the phone call bar slides in after the first screen. */
function initCallBar(): void {
  const bar = document.querySelector<HTMLElement>("[data-callbar]");
  const hero = document.getElementById("hero");
  if (!bar || !hero) return;
  if (!("IntersectionObserver" in window)) { bar.classList.add("is-shown"); return; }
  new IntersectionObserver(([e]) => bar.classList.toggle("is-shown", !e.isIntersecting), { threshold: 0 }).observe(hero);
}

initMenu();
initActiveNav();
initCrown();
initTabs();
initClubs();
initCallBar();

export {};
