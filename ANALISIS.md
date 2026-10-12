# Analisis Singkat – Portofolio Muhammad Ridhwan Abulkhair

## 1. Keputusan desain

**HTML semantik.** Tiap elemen dipilih menurut fungsinya, bukan tampilannya:
- Kerangka: `<header>` + `<nav aria-label>`, `<main>`, `<section aria-labelledby>`, `<footer>`.
- Judul berurutan: satu `h1`, lalu `h2`, `h3`, `h4` (tidak ada lompatan level).
- Konten: `<figure>/<figcaption>` untuk foto dan gambar proyek, `<article>` untuk tiap kartu, `<ul>/<li>` untuk daftar, `<aside>` + `<ol>` untuk pendidikan terakhir, `<address>` untuk kontak.
- Formulir: `<fieldset>`, `<label for>`, `type="email"`, `autocomplete`, `required`, `minlength`.
- Popup: `<dialog>` bawaan browser dengan `<form method="dialog">` untuk tombol Tutup, sehingga fokus keyboard dan tombol Esc ditangani browser.
- Atribut pendukung: `lang="id"`, meta `description`, `alt`, `width`/`height`, `loading="lazy"`, `aria-pressed`, `aria-expanded`, `aria-live`, `rel="noopener noreferrer"`.

**Layout.** CSS Grid untuk bagian dua kolom (hero, tentang, kontak) dan galeri kartu `repeat(auto-fill, minmax(300px, 1fr))` yang menyesuaikan jumlah kolom tanpa media query. Flexbox untuk menu, tombol filter, dan isi kartu. Header dibuat selebar layar (jarak 32 px dari tepi), sedangkan isi halaman dibatasi 1120 px agar teks tetap nyaman dibaca.

**Palet.** Hitam, putih, dan abu-abu tua untuk teks pendukung. Semua warna ada sebagai variabel CSS di `:root`, jadi ganti satu nilai berlaku di seluruh halaman. Warna penuh hanya datang dari gambar (sertifikat dan logo) agar gambar menjadi pusat perhatian. Mode gelap sengaja tidak dibuat.

**Tipografi.** Bricolage Grotesque untuk judul dan Figtree untuk isi, dengan skala ukuran tetap (`--fs-sm` sampai `--fs-hero`). Judul memakai `clamp()` sehingga mengecil otomatis di layar sempit.

**Interaksi JavaScript (4 buah, minimal diminta 2).**
1. Menu hamburger di ponsel.
2. Filter kartu per kategori.
3. Popup gambar penuh.
4. Validasi formulir dengan pesan error per kolom.

Semuanya bisa dipakai dengan keyboard, dan animasi dimatikan bila pengguna memilih `prefers-reduced-motion`.

## 2. Kendala yang saya hadapi dan solusinya

1. **Halaman error "Vite manifest not found".** Saat pertama menjalankan versi Laravel, halaman langsung error. Ternyata berkas Blade memanggil `@vite`, padahal build Vite belum dijalankan. Saya ganti dengan `asset('css/portfolio.css')` sehingga CSS dibaca langsung dari folder `public`.
2. **Perubahan kode tidak muncul di browser.** CSS yang lama masih tersimpan di cache. Saya muat ulang dengan `Ctrl+F5`, dan di Laravel menjalankan `php artisan view:clear`.
3. **Gambar tidak tampil ("Not Found").** Beberapa nama file memakai spasi dan ada yang belum berada di folder `public/images`. Saya ganti namanya tanpa spasi dan pindahkan ke folder yang benar.
4. **Error "Undefined array key gambar".** View meminta data `gambar`, tetapi belum semua proyek di `config/portfolio.php` memilikinya. Saya lengkapi datanya dan menambah nilai cadangan dengan `??`.
5. **Kartu proyek tampil terlalu tinggi.** Atribut `height` pada `<img>` mengalahkan `aspect-ratio` di CSS. Saya tambahkan `height: auto`.
6. **Tulisan copyright tidak di tengah.** Paragrafnya dibatasi `max-width: 62ch`, sehingga kotaknya menempel di kiri walau teksnya sudah `text-align: center`. Saya beri `max-width: none` pada paragraf footer.
7. **Menu di header tidak mepet kanan.** Header ikut lebar konten 1120 px, dan ada elemen kosong untuk tombol menu ponsel yang menambah celah 16 px. Saya lebarkan header dan sembunyikan elemen kosong itu di desktop.
8. **Formulir kontak tidak bisa mengirim data.** Versi HTML tidak punya server. Setelah validasi lolos, pesan saya kirim lewat `mailto:`.

## 3. Cara debugging

1. **Baca pesan error dulu.** Pesan seperti `Undefined array key "gambar"` sudah menyebut nama berkas dan nomor baris. Saya langsung membuka baris itu.
2. **Gunakan DevTools (`F12`).**
   - *Console* menampilkan galat JavaScript.
   - *Network* menampilkan file yang tidak ditemukan (404), misalnya gambar atau CSS.
   - *Elements* menunjukkan aturan CSS yang berlaku dan yang tertimpa. Panel *Computed* menunjukkan ukuran dan jarak sebenarnya.
3. **Persempit penyebab.** Saya tentukan dulu masalahnya ada di HTML, CSS, atau JavaScript, lalu mematikan satu aturan CSS (centang di panel *Styles*) untuk melihat pengaruhnya.
4. **Bersihkan cache.** Kalau perubahan tidak muncul, saya `Ctrl+F5` dan, di Laravel, `php artisan view:clear` dan `config:clear`.
5. **Uji ukuran layar dan keyboard.** Mode perangkat (`Ctrl+Shift+M`) untuk tampilan ponsel, serta `Tab`, `Enter`, dan `Esc` untuk memastikan semua fitur bisa dipakai tanpa mouse.
6. **Validasi.** Validator W3C untuk HTML dan Lighthouse untuk aksesibilitas dan performa.
