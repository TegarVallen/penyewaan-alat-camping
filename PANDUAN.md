# Panduan Kerja Kelompok: Website Penyewaan Alat Camping (Week 4 dan 5)

## 1. Pembagian tugas (tidak ada file yang sama)

| Anggota | Week 4 (JavaScript + API) | Week 5 (PHP) |
|---|---|---|
| **Anggota 1 (Ketua)** | **Task 01 Connect to API**: `week4/api.js`, `week4/data/alat.json`, `week4/index.html`, `week4/style.css` | **Task 01 Create PHP Page**: `week5/index.php`, `week5/style.css` |
| **Anggota 2** | **Task 02 Display API Data**: `week4/render.js` | **Task 02 Process Data with PHP**: `week5/data.php`, `week5/functions.php`, `week5/proses.php` |
| **Anggota 3** | **Task 03 Handle API State**: `week4/state.js`, `week4/app.js` | **Task 03 Build Dynamic Server-Side Content**: `week5/katalog.php` |

Dua file bersama (`README.md`, `PANDUAN.md`) dibuat ketua saja.

Alur data supaya semua paham:
- Week 4: `api.js` (ambil data) -> `state.js` (loading/sukses/error) -> `render.js` (tampil ke DOM).
- Week 5: `index.php` (halaman + info toko) -> `data.php` + `proses.php` (olah data) -> `katalog.php` (tampil HTML).

## 2. Persiapan (semua anggota)

1. Install **VS Code**, **Git** (git-scm.com), dan **PHP** (paling mudah lewat XAMPP, atau PHP CLI).
2. Punya akun **GitHub**. Login GitHub di VS Code: ikon akun di kiri bawah -> *Sign in to GitHub*.
3. Atur identitas Git (sekali saja), di terminal:
   ```
   git config --global user.name "Nama Kamu"
   git config --global user.email "email-github-kamu@mail.com"
   ```
4. Cek terpasang: `git --version` dan `php -v`.

## 3. Ketua membuat repository (Anggota 1)

1. GitHub -> **New repository** -> nama `penyewaan-alat-camping` -> Public -> centang **Add a README** -> Create.
2. Repo -> **Settings -> Collaborators -> Add people**, masukkan username Anggota 2 dan 3. Mereka harus **menerima undangan** lewat email/notifikasi GitHub.
3. Clone di komputer ketua:
   ```
   git clone https://github.com/USERNAME/penyewaan-alat-camping.git
   cd penyewaan-alat-camping
   code .
   ```
   (`code .` membuka folder di VS Code. Di VS Code juga bisa: `Ctrl+Shift+P` -> *Git: Clone*.)
4. Buat folder `week4` dan `week5`, lalu taruh file bagian ketua dari zip.
5. Commit dan push (lihat bagian 5).

Anggota 2 dan 3 baru mulai setelah ketua selesai push struktur awal.

## 4. Anggota 2 dan 3: clone dan buat branch sendiri

```
git clone https://github.com/USERNAME/penyewaan-alat-camping.git
cd penyewaan-alat-camping
git checkout -b anggota2-week4-5      # Anggota 3: anggota3-week4-5
```
Branch sendiri dipakai supaya pekerjaan tidak bertabrakan. Cek branch aktif di pojok kiri bawah VS Code.

## 5. Alur commit dan push (berlaku untuk semua)

Di terminal VS Code (`Ctrl+``):
```
git status                          # lihat file yang berubah
git add week4/render.js             # tambahkan file bagianmu saja (jangan git add .)
git commit -m "Week 4 Task 02: tampilkan data API ke DOM"
git push -u origin NAMA-BRANCH
```
Lewat tampilan VS Code: ikon **Source Control** (kiri) -> klik **+** di file -> tulis pesan -> **Commit** -> **Sync/Publish Branch**.

Disarankan **satu commit per week** supaya riwayat commit jelas milik siapa.

### Pesan commit yang disarankan
- Anggota 1: `Week 4 Task 01: connect to API dengan fetch` / `Week 5 Task 01: halaman PHP info toko`
- Anggota 2: `Week 4 Task 02: display data API` / `Week 5 Task 02: proses data dengan PHP`
- Anggota 3: `Week 4 Task 03: handle loading dan error` / `Week 5 Task 03: konten dinamis server-side`

## 6. Pull Request dan merge

1. Setelah push, buka repo di GitHub -> tombol **Compare & pull request** -> **Create pull request**.
2. Ketua membuka tab **Pull requests** -> **Merge pull request** -> **Confirm**.
3. Semua anggota ambil versi terbaru:
   ```
   git checkout main
   git pull origin main
   ```
4. Urutan merge yang aman: Anggota 1 dulu (index.html + base), lalu Anggota 2, lalu Anggota 3.

Kalau muncul **conflict**: biasanya karena dua orang mengedit file yang sama. Karena file sudah dibagi, ini jarang terjadi. Kalau terjadi, VS Code menampilkan *Accept Current / Incoming / Both*. Pilih yang benar, simpan, lalu `git add` dan `git commit`.

## 7. Menjalankan dan mengetes di VS Code

Buka terminal di folder repo:
```
php -S localhost:8000
```
- Week 4: http://localhost:8000/week4/
- Demo error handling: http://localhost:8000/week4/?error=1
- Week 5: http://localhost:8000/week5/

Alternatif: Week 4 pakai ekstensi **Live Server** (klik kanan `index.html` -> *Open with Live Server*). Week 5 pakai **XAMPP**: taruh folder di `htdocs`, nyalakan Apache, buka `http://localhost/penyewaan-alat-camping/week5/`.

Tekan `Ctrl+C` di terminal untuk menghentikan server.

### Checklist tes sebelum push
Week 4: data tampil, loading terlihat, `?error=1` memunculkan pesan error dan tombol "Coba lagi", pencarian dan filter jalan, cek ketersediaan menolak jumlah melebihi stok.
Week 5: halaman terbuka tanpa error, info toko tampil, filter jalan, cek dan hitung sewa benar, view-source hanya berisi HTML (tidak ada kode PHP).

## 8. Alur video (satu video kelompok)

1. **Layar awal:** terminal, jalankan `git clone` repo GitHub (tampilkan link repo). Buka di VS Code dengan `code .`.
2. Tunjukkan struktur folder `week4` dan `week5`.
3. **Week 4:** jelaskan file per task (`api.js`, `state.js`, `render.js`, `app.js`), jalankan server, tunjukkan loading, data tampil, filter, cek ketersediaan, lalu `?error=1`.
4. **Week 5:** jelaskan `index.php`, `data.php`, `functions.php`, `proses.php`, `katalog.php`. Jalankan dan tunjukkan hasilnya, lalu buka view-source.
5. **Bagian akhir:** tiap anggota menyebut file dan kode yang dikerjakannya (sesuai tabel di atas), dan bisa menunjukkan riwayat commit di GitHub (tab **Commits**).
6. Upload ke YouTube, atur **Public**, sebelum **7 November 2026 pukul 20:00 WIB**.

## 9. Masalah yang sering muncul

| Masalah | Solusi |
|---|---|
| `Permission denied` / `403` saat push | Undangan collaborator belum diterima, atau belum login GitHub di VS Code |
| `rejected ... fetch first` | Jalankan `git pull origin NAMA-BRANCH`, lalu push lagi |
| Week 4 kosong atau error di console | Dibuka dengan double-click. Jalankan lewat `php -S` atau Live Server |
| `php` tidak dikenali | PHP belum masuk PATH. Pakai XAMPP atau tambahkan folder PHP ke PATH |
| Halaman PHP menampilkan kode mentah | Tidak dibuka lewat server. Buka dari `http://localhost...`, bukan `file://` |
