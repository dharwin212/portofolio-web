(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- 1. Menu mobile ---------- */
  const menuBtn = $("#menuBtn"), menu = $("#menu");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  }
  menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  /* ---------- 2. Filter proyek ---------- */
  const filters = $$(".filter"), items = $$(".projects > li"), cards = $$(".project");
  filters.forEach(btn => btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    filters.forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
    items.forEach(li => { li.hidden = !(f === "semua" || $(".project", li).dataset.cat === f); });
  }));

  /* ---------- 3. Modal detail proyek (<dialog>) ---------- */
  const dlg = $("#projectDialog");
  let lastTrigger = null;
  cards.forEach(card => $(".btn", card).addEventListener("click", e => {
    lastTrigger = e.currentTarget;
    $("#dlgTitle").textContent = card.dataset.title;
    const img = $("#dlgImg");
    img.src = card.dataset.img;
    img.alt = "Tampilan penuh: " + card.dataset.title;
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  }));
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); }); // klik di luar kotak
  dlg.addEventListener("close", () => lastTrigger && lastTrigger.focus());

  /* ---------- 4. Validasi formulir ---------- */
  const form = $("#contactForm"), msg = $("#formMsg");
  const rules = {
    nama:  v => v.trim().length >= 2 ? "" : "Isi nama minimal 2 karakter.",
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Masukkan email yang valid, misalnya nama@contoh.com.",
    pesan: v => v.trim().length >= 10 ? "" : "Tulis pesan minimal 10 karakter."
  };
  function check(field) {
    const err = rules[field.name](field.value);
    $("#err-" + field.name).textContent = err;
    field.setAttribute("aria-invalid", String(Boolean(err)));
    return !err;
  }
  $$("input, textarea", form).forEach(f => {
    f.addEventListener("blur", () => check(f));
    f.addEventListener("input", () => { if (f.getAttribute("aria-invalid") === "true") check(f); });
  });
  form.addEventListener("submit", e => {
    e.preventDefault();
    msg.className = "form-msg"; msg.textContent = "";
    const fields = $$("input, textarea", form);
    const results = fields.map(check);              // jalankan semua agar semua error tampil
    const firstBad = fields[results.indexOf(false)];
    if (firstBad) { firstBad.focus(); return; }

    // Situs statis tidak punya server, jadi pesan dikirim lewat aplikasi email pengguna.
    const subject = encodeURIComponent("Pesan dari portofolio: " + $("#nama").value.trim());
    const body = encodeURIComponent($("#pesan").value.trim() + "\n\n— " + $("#nama").value.trim() + " (" + $("#email").value.trim() + ")");
    msg.className = "form-msg success";
    msg.textContent = "Data valid. Aplikasi email Anda akan terbuka dengan pesan yang sudah terisi.";
    window.location.href = "mailto:" + form.dataset.mailto + "?subject=" + subject + "&body=" + body;
  });
})();
