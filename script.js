/* ========== DATA DEFAULT ========== */
const PENGUMUMAN = [
  {
    tag: "Penting",
    tanggal: "2 Sep 2026",
    judul: "Jadwal Kerja Bakti Bulanan",
    ringkas: "Kerja bakti Minggu, 7 September 2026 pukul 07.00 WIB. Mohon kehadiran seluruh warga.",
    isi: "Kerja bakti lingkungan RT 002 RW 05 akan dilaksanakan hari Minggu, 7 September 2026 pukul 07.00 WIB. Titik kumpul di balai RT. Mohon membawa sapu, cangkul, atau karung sesuai kemampuan. Kehadiran seluruh warga sangat diharapkan.",
  },
  {
    tag: "Iuran",
    tanggal: "1 Sep 2026",
    judul: "Pengingat Iuran Bulanan",
    ringkas: "Warga yang belum menyetor iuran Agustus dimohon menghubungi bendahara Ibu Suparmi.",
    isi: "Bagi warga yang belum menyetor iuran bulan Agustus, dimohon segera menghubungi bendahara RT Ibu Suparmi. Pembayaran bisa tunai atau transfer. Bukti setoran akan dicatat di buku kas RT.",
  },
  {
    tag: "Rapat",
    tanggal: "28 Agu 2026",
    judul: "Rapat Koordinasi RT",
    ringkas: "Rapat koordinasi pengurus dan perwakilan warga. Agenda: evaluasi dan rencana bulan depan.",
    isi: "Rapat koordinasi pengurus dan perwakilan warga membahas evaluasi kegiatan, laporan keuangan singkat, dan usulan program bulan depan. Tempat: balai RT 002 RW 05.",
  },
];

const KEGIATAN_DEFAULT = [
  {
    id: "k1",
    tanggal: "7 September 2026",
    jam: "07.00 WIB",
    judul: "Kerja Bakti Lingkungan",
    isi: "Membersihkan saluran air, taman, dan area umum RT 002 RW 05. Bawa alat masing-masing.",
    kategori: "Lingkungan",
  },
  {
    id: "k2",
    tanggal: "14 September 2026",
    jam: "19.30 WIB",
    judul: "Rapat Warga Bulanan",
    isi: "Pembahasan program kerja, keuangan, dan usulan warga di balai RT.",
    kategori: "Rapat",
  },
  {
    id: "k3",
    tanggal: "21 September 2026",
    jam: "16.00 WIB",
    judul: "Posyandu dan Pemeriksaan Kesehatan",
    isi: "Kegiatan posyandu untuk balita dan lansia. Datang tepat waktu.",
    kategori: "Kesehatan",
  },
];

const LAPORAN_PENGURUS_DEFAULT = [
  {
    id: "lp1",
    tanggal: "25 Agu 2026",
    judul: "Laporan Kerja Bakti Agustus",
    oleh: "Sumarsono (Ketua RT)",
    isi: "Kerja bakti diikuti 42 warga. Saluran air dibersihkan, 8 karung sampah diangkut. Terima kasih atas partisipasi warga RT 002 RW 05.",
  },
  {
    id: "lp2",
    tanggal: "20 Agu 2026",
    judul: "Laporan Keuangan Singkat",
    oleh: "Suparmi (Bendahara)",
    isi: "Penerimaan iuran Agustus: Rp 2.150.000. Pengeluaran: kebersihan Rp 450.000, ATL Rp 200.000. Saldo kas sementara aman.",
  },
];

const LAPORAN_WARGA_DEFAULT = [
  {
    id: "lw1",
    tanggal: "22 Agu 2026",
    judul: "Usulan Penerangan Jalan",
    oleh: "Bapak Rudi (warga)",
    isi: "Mohon pertimbangan penambahan lampu jalan di gang sebelah selatan. Area gelap saat malam hari.",
  },
];

/* ========== STORAGE ========== */
const STORAGE_KEGIATAN = "rt002_kegiatan";
const STORAGE_LAPORAN_P = "rt002_laporan_pengurus";
const STORAGE_LAPORAN_W = "rt002_laporan_warga";

function loadKegiatan() {
  try {
    const raw = localStorage.getItem(STORAGE_KEGIATAN);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return structuredClone(KEGIATAN_DEFAULT);
}

function saveKegiatan(list) {
  localStorage.setItem(STORAGE_KEGIATAN, JSON.stringify(list));
}

function loadLaporan(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return structuredClone(fallback);
}

function saveLaporan(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

let KEGIATAN = loadKegiatan();
let LAPORAN_PENGURUS = loadLaporan(STORAGE_LAPORAN_P, LAPORAN_PENGURUS_DEFAULT);
let LAPORAN_WARGA = loadLaporan(STORAGE_LAPORAN_W, LAPORAN_WARGA_DEFAULT);

/* ========== UI REFS ========== */
const html = document.documentElement;
const header = document.getElementById("header");
const menuBtn = document.getElementById("menu-btn");
const mobileNav = document.getElementById("mobile-nav");
const themeBtn = document.getElementById("theme-btn");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalMeta = document.getElementById("modal-meta");
const modalBody = document.getElementById("modal-body");
const listEl = document.getElementById("pengumuman-list");
const filterEl = document.getElementById("filters");
const kegiatanEl = document.getElementById("kegiatan-list");

/* ========== THEME ========== */
const stored = localStorage.getItem("rt-theme");
const preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (stored === "dark" || (!stored && preferDark)) html.classList.add("dark");

themeBtn.addEventListener("click", () => {
  html.classList.toggle("dark");
  localStorage.setItem("rt-theme", html.classList.contains("dark") ? "dark" : "light");
});

/* ========== NAV ========== */
menuBtn.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("is-open");
  header.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
});

mobileNav.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileNav.classList.remove("is-open");
    header.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}, { passive: true });

/* ========== PENGUMUMAN ========== */
PENGUMUMAN.forEach((item, i) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "card";
  btn.innerHTML = `
    <div class="meta"><span class="chip">${item.tag}</span><span class="muted">${item.tanggal}</span></div>
    <h3>${item.judul}</h3>
    <p>${item.ringkas}</p>
    <span class="more">Baca selengkapnya</span>`;
  btn.addEventListener("click", () => openModal(i));
  listEl.appendChild(btn);
});

function openModal(i) {
  const item = PENGUMUMAN[i];
  modalMeta.textContent = `${item.tag} · ${item.tanggal}`;
  modalTitle.textContent = item.judul;
  modalBody.textContent = item.isi;
  modal.classList.add("is-open");
}

function closeModal() {
  modal.classList.remove("is-open");
}

document.getElementById("modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ========== KEGIATAN ========== */
const FILTERS = ["Semua", "Lingkungan", "Rapat", "Kesehatan", "Sosial", "Lainnya"];
let current = "Semua";

function renderFilters() {
  filterEl.innerHTML = "";
  FILTERS.forEach((f) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "filter" + (f === current ? " is-on" : "");
    b.textContent = f;
    b.addEventListener("click", () => {
      current = f;
      renderFilters();
      renderKegiatan();
    });
    filterEl.appendChild(b);
  });
}

function renderKegiatan() {
  const items = current === "Semua" ? KEGIATAN : KEGIATAN.filter((k) => k.kategori === current);
  if (!items.length) {
    kegiatanEl.innerHTML = `<p class="muted" style="text-align:center">Belum ada kegiatan untuk filter ini.</p>`;
    return;
  }
  kegiatanEl.innerHTML = items.map((k) => `
      <article class="event" data-id="${k.id}">
        <div class="meta">
          <strong>${k.tanggal}</strong>
          <span class="chip">${k.jam}</span>
          <span class="muted">${k.kategori}</span>
        </div>
        <h3>${k.judul}</h3>
        <p>${k.isi}</p>
        <div class="event-actions">
          <button type="button" class="btn btn-ghost" data-edit="${k.id}" style="min-height:32px;font-size:12px;padding:0 12px">Edit</button>
          <button type="button" class="btn btn-danger" data-del="${k.id}">Hapus</button>
        </div>
      </article>`).join("");

  kegiatanEl.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", () => startEdit(btn.dataset.edit));
  });
  kegiatanEl.querySelectorAll("[data-del]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (confirm("Hapus kegiatan ini?")) {
        KEGIATAN = KEGIATAN.filter((k) => k.id !== btn.dataset.del);
        saveKegiatan(KEGIATAN);
        renderKegiatan();
      }
    });
  });
}

const form = document.getElementById("kegiatan-form");
const editId = document.getElementById("edit-id");
const btnCancel = document.getElementById("btn-cancel");
const btnReset = document.getElementById("btn-reset-default");

function startEdit(id) {
  const item = KEGIATAN.find((k) => k.id === id);
  if (!item) return;
  editId.value = id;
  document.getElementById("f-tanggal").value = item.tanggal;
  document.getElementById("f-jam").value = item.jam;
  document.getElementById("f-judul").value = item.judul;
  document.getElementById("f-kategori").value = item.kategori;
  document.getElementById("f-isi").value = item.isi;
  document.getElementById("btn-save").textContent = "Update kegiatan";
  btnCancel.hidden = false;
  form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetForm() {
  editId.value = "";
  form.reset();
  document.getElementById("btn-save").textContent = "Simpan kegiatan";
  btnCancel.hidden = true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    id: editId.value || "k" + Date.now(),
    tanggal: document.getElementById("f-tanggal").value.trim(),
    jam: document.getElementById("f-jam").value.trim(),
    judul: document.getElementById("f-judul").value.trim(),
    kategori: document.getElementById("f-kategori").value,
    isi: document.getElementById("f-isi").value.trim(),
  };
  if (editId.value) {
    const idx = KEGIATAN.findIndex((k) => k.id === editId.value);
    if (idx >= 0) KEGIATAN[idx] = data;
  } else {
    KEGIATAN.push(data);
  }
  saveKegiatan(KEGIATAN);
  resetForm();
  renderFilters();
  renderKegiatan();
});

btnCancel.addEventListener("click", resetForm);

btnReset.addEventListener("click", () => {
  if (confirm("Kembalikan data kegiatan ke default awal?")) {
    KEGIATAN = structuredClone(KEGIATAN_DEFAULT);
    saveKegiatan(KEGIATAN);
    resetForm();
    renderFilters();
    renderKegiatan();
  }
});

renderFilters();
renderKegiatan();

/* ========== LAPORAN ========== */
function renderLaporan(list, elId) {
  const el = document.getElementById(elId);
  if (!list.length) {
    el.innerHTML = `<p class="muted" style="text-align:center">Belum ada laporan.</p>`;
    return;
  }
  el.innerHTML = list.map((item) => `
    <article class="laporan-card">
      <div class="meta">
        <span class="chip">${item.tanggal}</span>
      </div>
      <h3>${item.judul}</h3>
      <p>${item.isi}</p>
      <p class="oleh">Oleh: ${item.oleh}</p>
      <div class="event-actions">
        <button type="button" class="btn btn-danger" data-del-lap="${item.id}" data-jenis="${elId.includes("pengurus") ? "pengurus" : "warga"}">Hapus</button>
      </div>
    </article>`).join("");

  el.querySelectorAll("[data-del-lap]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!confirm("Hapus laporan ini?")) return;
      const jenis = btn.dataset.jenis;
      if (jenis === "pengurus") {
        LAPORAN_PENGURUS = LAPORAN_PENGURUS.filter((x) => x.id !== btn.dataset.delLap);
        saveLaporan(STORAGE_LAPORAN_P, LAPORAN_PENGURUS);
        renderLaporan(LAPORAN_PENGURUS, "laporan-pengurus-list");
      } else {
        LAPORAN_WARGA = LAPORAN_WARGA.filter((x) => x.id !== btn.dataset.delLap);
        saveLaporan(STORAGE_LAPORAN_W, LAPORAN_WARGA);
        renderLaporan(LAPORAN_WARGA, "laporan-warga-list");
      }
    });
  });
}

renderLaporan(LAPORAN_PENGURUS, "laporan-pengurus-list");
renderLaporan(LAPORAN_WARGA, "laporan-warga-list");

document.querySelectorAll(".laporan-tabs .tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".laporan-tabs .tab").forEach((t) => t.classList.remove("is-on"));
    document.querySelectorAll(".laporan-panel").forEach((p) => p.classList.remove("is-on"));
    tab.classList.add("is-on");
    document.getElementById("tab-" + tab.dataset.tab).classList.add("is-on");
  });
});

document.getElementById("laporan-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const jenis = document.getElementById("l-jenis").value;
  const item = {
    id: "l" + Date.now(),
    tanggal: document.getElementById("l-tanggal").value.trim(),
    judul: document.getElementById("l-judul").value.trim(),
    oleh: document.getElementById("l-oleh").value.trim(),
    isi: document.getElementById("l-isi").value.trim(),
  };
  if (jenis === "pengurus") {
    LAPORAN_PENGURUS.unshift(item);
    saveLaporan(STORAGE_LAPORAN_P, LAPORAN_PENGURUS);
    renderLaporan(LAPORAN_PENGURUS, "laporan-pengurus-list");
  } else {
    LAPORAN_WARGA.unshift(item);
    saveLaporan(STORAGE_LAPORAN_W, LAPORAN_WARGA);
    renderLaporan(LAPORAN_WARGA, "laporan-warga-list");
  }
  e.target.reset();
  document.querySelector(`.laporan-tabs .tab[data-tab="${jenis}"]`).click();
});
