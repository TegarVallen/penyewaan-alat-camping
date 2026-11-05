// ============================================================
// WEEK 4 - TASK 02: DISPLAY API DATA
// Mengolah data JSON dan menampilkannya ke halaman (DOM):
// kartu alat, pencarian, filter, dan cek ketersediaan.
// ============================================================

const daftarAlat = document.querySelector("#daftar-alat");
const inputCari = document.querySelector("#cari");
const pilihKategori = document.querySelector("#kategori");
const cekTersedia = document.querySelector("#hanya-tersedia");

// Dialog cek ketersediaan
const dialog = document.querySelector("#dialog-cek");
const cekJudul = document.querySelector("#cek-judul");
const cekInfo = document.querySelector("#cek-info");
const cekHari = document.querySelector("#cek-hari");
const cekJumlah = document.querySelector("#cek-jumlah");
const cekHasil = document.querySelector("#cek-hasil");

let semuaAlat = [];     // data dari API (diisi oleh state.js)
let alatDipilih = null; // alat yang sedang dicek ketersediaannya

function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

// Mengisi dropdown kategori dari data (kategori unik)
function isiFilterKategori(daftar) {
  const kategori = [...new Set(daftar.map(alat => alat.kategori))];
  pilihKategori.innerHTML = '<option value="">Semua kategori</option>';
  kategori.forEach(nama => {
    const opsi = document.createElement("option");
    opsi.value = nama;
    opsi.textContent = nama;
    pilihKategori.append(opsi);
  });
}

// Pencarian + filter kategori + filter ketersediaan
function ambilAlatTersaring() {
  const kata = inputCari.value.trim().toLowerCase();
  const kategori = pilihKategori.value;
  const hanyaTersedia = cekTersedia.checked;

  return semuaAlat.filter(alat => {
    const cocokNama = alat.nama.toLowerCase().includes(kata);
    const cocokKategori = kategori === "" || alat.kategori === kategori;
    const cocokStok = !hanyaTersedia || alat.stok > 0;
    return cocokNama && cocokKategori && cocokStok;
  });
}

// Render banyak data: array -> forEach -> template literal -> DOM
function tampilkanAlat() {
  const hasil = ambilAlatTersaring();
  daftarAlat.innerHTML = "";

  jumlahBox.hidden = false;
  jumlahBox.textContent = hasil.length + " alat ditemukan";

  if (hasil.length === 0) {
    tampilkanStatus("Tidak ada alat yang cocok. Ubah kata kunci atau filter.", "empty");
    return;
  }
  sembunyikanStatus();

  hasil.forEach(alat => {
    const tersedia = alat.stok > 0;
    const kartu = document.createElement("article");
    kartu.className = "card" + (tersedia ? "" : " habis");
    kartu.innerHTML = `
      <div class="icon" aria-hidden="true">${alat.ikon}</div>
      <h3>${alat.nama}</h3>
      <span class="kategori">${alat.kategori}</span>
      <p>${alat.deskripsi}</p>
      <div class="row">
        <span class="harga">${formatRupiah(alat.harga_per_hari)} <small>/ hari</small></span>
        <span class="badge ${tersedia ? "ok" : "no"}">
          ${tersedia ? "Tersedia " + alat.stok : "Habis"}
        </span>
      </div>
      <button type="button" data-id="${alat.id}" ${tersedia ? "" : "disabled"}>
        Cek ketersediaan
      </button>
    `;
    daftarAlat.append(kartu);
  });
}

// ---------- Cek ketersediaan & hitung sewa ----------
function bukaDialog(id) {
  alatDipilih = semuaAlat.find(alat => alat.id === id);
  cekJudul.textContent = alatDipilih.nama;
  cekInfo.textContent =
    "Stok " + alatDipilih.stok + " unit, " + formatRupiah(alatDipilih.harga_per_hari) + " per hari.";
  cekHari.value = 1;
  cekJumlah.value = 1;
  cekHasil.hidden = true;
  dialog.showModal();
}

function hitungSewa() {
  const hari = Number(cekHari.value);
  const jumlah = Number(cekJumlah.value);
  cekHasil.hidden = false;

  if (!Number.isInteger(hari) || hari < 1 || !Number.isInteger(jumlah) || jumlah < 1) {
    cekHasil.className = "hasil bad";
    cekHasil.textContent = "Isi lama sewa dan jumlah unit dengan angka minimal 1.";
  } else if (jumlah > alatDipilih.stok) {
    cekHasil.className = "hasil bad";
    cekHasil.textContent =
      "Stok tidak cukup. Tersisa " + alatDipilih.stok + " unit untuk " + alatDipilih.nama + ".";
  } else {
    const total = alatDipilih.harga_per_hari * hari * jumlah;
    cekHasil.className = "hasil";
    cekHasil.textContent =
      "Tersedia. Total sewa " + jumlah + " unit selama " + hari + " hari: " + formatRupiah(total) + ".";
  }
}

// Memasang semua event untuk bagian tampilan (dipanggil dari app.js)
function pasangEventTampilan() {
  inputCari.addEventListener("input", tampilkanAlat);
  pilihKategori.addEventListener("change", tampilkanAlat);
  cekTersedia.addEventListener("change", tampilkanAlat);

  daftarAlat.addEventListener("click", event => {
    const tombol = event.target.closest("button[data-id]");
    if (tombol) bukaDialog(Number(tombol.dataset.id));
  });
  document.querySelector("#cek-hitung").addEventListener("click", hitungSewa);
  document.querySelector("#cek-tutup").addEventListener("click", () => dialog.close());
}
