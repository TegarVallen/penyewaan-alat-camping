<?php
// ============================================================
// WEEK 5 - TASK 03: BUILD DYNAMIC SERVER-SIDE CONTENT
// Katalog alat dihasilkan oleh PHP (loop), bukan ditulis HTML satu per satu.
// File ini di-include oleh index.php dan memakai variabel dari proses.php.
// Alur: PHP DATA -> PROCESS (loop, conditional) -> GENERATED HTML -> PAGE
// ============================================================
?>
<div class="toolbar-outer">
  <form class="toolbar" method="get" action="index.php">
    <input type="search" name="q" value="<?php echo e($kataCari); ?>" placeholder="Cari alat, misalnya tenda" aria-label="Cari alat">
    <select name="kategori" aria-label="Filter kategori">
      <option value="">Semua kategori</option>
      <?php foreach ($daftarKategori as $kategori) { ?>
        <option value="<?php echo e($kategori); ?>" <?php echo $kategori === $kategoriDipilih ? "selected" : ""; ?>>
          <?php echo e($kategori); ?>
        </option>
      <?php } ?>
    </select>
    <label class="check">
      <input type="checkbox" name="tersedia" value="1" <?php echo $hanyaTersedia ? "checked" : ""; ?>> Hanya yang tersedia
    </label>
    <button type="submit">Terapkan</button>
    <a class="btn ghost" href="index.php">Reset</a>
  </form>
</div>

<main class="wrap">
  <?php if ($hasilCek !== null) { ?>
    <div class="status <?php echo $hasilCek["ok"] ? "" : "error"; ?>" role="status">
      <?php echo e($hasilCek["pesan"]); ?>
    </div>
    <br>
  <?php } ?>

  <p class="count"><?php echo count($hasil); ?> alat ditemukan</p>

  <?php if (count($hasil) === 0) { ?>
    <div class="status">Tidak ada alat yang cocok. Ubah kata kunci atau filter.</div>
  <?php } else { ?>
    <section class="grid">
      <?php foreach ($hasil as $alat) { ?>
        <article class="card <?php echo $alat["stok"] > 0 ? "" : "habis"; ?>">
          <div class="icon" aria-hidden="true"><?php echo $alat["ikon"]; ?></div>
          <h3><?php echo e($alat["nama"]); ?></h3>
          <span class="kategori"><?php echo e($alat["kategori"]); ?></span>
          <p><?php echo e($alat["deskripsi"]); ?></p>
          <div class="row">
            <span class="harga"><?php echo formatRupiah($alat["harga_per_hari"]); ?> <small>/ hari</small></span>
            <span class="badge <?php echo kelasBadge($alat["stok"]); ?>">
              <?php echo statusStok($alat["stok"]); ?><?php echo $alat["stok"] > 0 ? " (" . $alat["stok"] . ")" : ""; ?>
            </span>
          </div>

          <?php if ($alat["stok"] > 0) { ?>
            <form method="get" action="index.php" class="cek-form">
              <input type="hidden" name="cek" value="<?php echo $alat["id"]; ?>">
              <?php if ($kataCari !== "") { ?><input type="hidden" name="q" value="<?php echo e($kataCari); ?>"><?php } ?>
              <?php if ($kategoriDipilih !== "") { ?><input type="hidden" name="kategori" value="<?php echo e($kategoriDipilih); ?>"><?php } ?>
              <?php if ($hanyaTersedia) { ?><input type="hidden" name="tersedia" value="1"><?php } ?>
              <div class="row">
                <input class="field-input" type="number" name="hari" min="1" value="1" aria-label="Lama sewa (hari)" title="Hari">
                <input class="field-input" type="number" name="jumlah" min="1" value="1" aria-label="Jumlah unit" title="Unit">
              </div>
              <button type="submit" style="width:100%;margin-top:.5rem">Cek &amp; hitung sewa</button>
            </form>
          <?php } else { ?>
            <button type="button" disabled>Tidak tersedia</button>
          <?php } ?>
        </article>
      <?php } ?>
    </section>
  <?php } ?>
</main>
