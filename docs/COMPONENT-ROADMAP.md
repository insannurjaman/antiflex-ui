# antiflex /ui — Roadmap kelengkapan komponen

Status: rencana pengembangan berdasarkan permintaan pengguna pada 17 Oktober 2026. **Gelombang 1–3 diterapkan pada source lokal; gelombang 4 kini mencakup Select, Combobox, Command, Calendar dan Date Picker. Sisa katalog masih rencana.** Inventaris lokal kini 50 keluarga; lihat [audit 66 entri](../design/research/shadcn-component-audit.md).

Tujuan: membawa antiflex dari foundation kecil menuju katalog React yang luas untuk produk SaaS. Katalog shadcn/ui menjadi benchmark keluasan, sementara identitas, styling, source, dan perilaku antiflex tetap milik sendiri. Delapan komponen foundation adalah milestone awal, bukan batas katalog selanjutnya.

## Aturan produk

- Pertahankan React, TypeScript, token light/dark, native semantics, API composable, dan source installer.
- Tetap tanpa shadcn components, Radix, Base UI, React Aria, atau library perilaku komponen lain. Jangan menyalin implementasi referensi. Framework, styling, icon, dan testing tools tetap diperbolehkan sesuai batas proyek.
- Core umum tetap MIT. Penambahan komponen inti tidak dipindahkan ke Pro. Pro menyediakan aset, blocks, dan template yang dilisensikan terpisah.
- Pertahankan TextField dan AppShell yang sudah dipakai. Komponen baru tidak memaksa migrasi API diam-diam.
- Table tetap elemen tabel semantik yang dapat dikomposisi. Perilaku data disediakan lewat recipe/contoh aplikasi yang jelas, bukan dipaksakan ke primitive Table.
- Jangan menaikkan hitungan komponen untuk setiap varian warna, ekspor bagian, atau pola yang belum siap didistribusikan.

## Persiapan sebelum memperluas katalog

1. Buat inventaris komponen bersama agar jumlah, navigasi docs, metadata halaman, installer, dan coverage stories tidak bergantung pada angka 8 yang tersebar. Inventaris hanya mendaftarkan komponen yang benar-benar tersedia.
2. Pecah source library secara bertahap menjadi modul per keluarga dengan barrel export stabil. Generator registry saat ini membaca satu file dan inventaris hardcoded; sesuaikan pembacaan source/dependency graph sebelum menambah komponen gabungan yang kompleks.
3. Bangun pola internal field association, controlled/uncontrolled state, ID SSR, event/ref composition, dan pengelolaan overlay yang diperlukan. Gunakan semantik HTML asli saat memenuhi kebutuhan; helper internal tidak dihitung sebagai komponen pemasaran.
4. Tetapkan keyboard contract dan test cases sebelum komponen interaktif kompleks dibuat. Uji dir=ltr/rtl sejak awal meskipun dokumentasi produk berbahasa Inggris.
5. Perbarui release notes dan tambahkan label status internal: planned, implementing, verified. Planned tidak tampil sebagai komponen siap pakai di katalog publik.

## Gelombang 1 — Form primitives (10 entri pekerjaan)

Diterapkan pada source lokal: public exports, token ukuran, docs interaktif, stories, registry installer, serta 119 varian native di Figma. Contoh komposisi tersedia di /docs/forms. Dokumentasi dan Storybook publik diperbarui pada 2026-10-17; npm dan rilis GitHub masih mengikuti alpha sebelumnya. Hasil pemeriksaan implementasi dicatat pada design/research/forms-verification.json; verifikasi hosting dicatat terpisah pada design/research/public-preview-verification.json.

Input, Label, Field, Textarea, Native Select, Checkbox, Radio Group, Switch, Button Group, Input Group.

Mulai dari Input, Label, dan Field; susun TextField lama di atas fondasi yang sama tanpa memutus API. Field harus menghubungkan label, description, error, dan grup kontrol. Setelah itu buat kontrol input native dengan variasi ukuran konsisten, state invalid/disabled/read-only yang relevan, serta atribut/ref native. Switch tetap memiliki nama dan state yang jelas; Radio Group bekerja sebagai satu pilihan dan Checkbox mendukung indeterminate.

Hasil yang dituju: formulir profil, preferensi, dan pengaturan dapat dibangun hanya dengan komponen antiflex. Sediakan satu contoh form dengan validasi, error summary, reset, dan submit state. Tidak perlu menambah library form agar contoh dasar berfungsi; integrasi library form bisa berupa panduan tambahan kemudian.

## Gelombang 2 — Feedback, navigasi dasar, dan disclosure (15 entri pekerjaan)

Diterapkan pada 18 Oktober 2026: public exports, docs interaktif di `/docs/feedback`, stories, registry installer, dan 99 varian native Figma. Pengujian mencakup keyboard, controlled state, RTL, reduced motion, serta custom-wrapper collection. Lihat `design/research/feedback-verification.json` untuk bukti lokal. npm dan tagged GitHub release tetap pada alpha delapan keluarga sampai proses rilis berikutnya.

Alert, Avatar, Breadcrumb, Empty, Kbd, Pagination, Progress, Spinner, Tabs, Accordion, Collapsible, Toggle, Toggle Group, Typography, Aspect Ratio.

Ekstrak pagination, empty state, dan spinner yang sekarang tertanam di aplikasi menjadi API umum. Pagination mendukung link dan state halaman; Progress mendukung nilai pasti dan loading tak tentu; Avatar mempunyai fallback yang stabil. Tabs, Accordion, Toggle Group, dan disclosure memerlukan perilaku keyboard dan relasi elemen yang eksplisit. Typography bisa berupa utility/recipe terverifikasi, bukan kewajiban membuat wrapper untuk setiap tag HTML.

Hasil yang dituju: halaman daftar, detail, pengaturan, dan onboarding mempunyai navigasi dan feedback yang konsisten. Kasus tanpa data, tidak ada hasil pencarian, izin terbatas, dan error memiliki pesan serta aksi pemulihan yang berbeda.

## Gelombang 3 — Overlay dan menu (12 entri pekerjaan)

Batch fondasi modal diterapkan pada 18 Oktober 2026: **Dialog dan Alert Dialog**. Keduanya menggunakan native HTML dialog, state terkontrol/tidak terkontrol, Tab loop, Escape untuk modal teratas, fokus balik, scroll lock bertumpuk, dan contoh `/docs/modals`. Figma menambahkan dua keluarga dengan 12 varian. Batch berikutnya menambahkan **Popover dan Tooltip** dengan posisi adaptif, RTL, Escape bertingkat, dan contoh `/docs/floating`; Figma menambahkan 12 varian dan enam token komponen. Setelah batch panel di bawah, Hover Card, Menubar dan Navigation Menu kini melengkapi gelombang ini; native modal bukan klaim bahwa seluruh fondasi positioning/menu sudah dibangun.

Dialog, Alert Dialog, Sheet, Drawer, Popover, Tooltip, Hover Card, Dropdown Menu, Context Menu, Menubar, Navigation Menu, Toast.

Urutan internal: fondasi overlay → Dialog/Alert Dialog → Popover/Tooltip → Sheet/Drawer → menu dan Toast. Dialog perlu fokus awal, pembatasan fokus modal, Escape, pengembalian fokus, nama/deskripsi, penutupan terkontrol, dan overlay bertumpuk. Popover dan menu perlu posisi yang tetap terlihat saat scroll/resize serta interaksi di luar panel. Tooltip tersedia melalui fokus, bukan hover saja. Hover Card bukan satu-satunya akses ke informasi penting. Toast perlu pengumuman yang tepat, dismiss, durasi/pause, dan action tanpa mencuri fokus.

Sheet dan Drawer berbagi fondasi overlay, tetapi tetap dijelaskan sebagai pola berbeda bila keduanya dipublikasikan. Drawer dengan swipe memerlukan fallback tombol dan keyboard. Jangan menghitung variasi posisi panel sebagai implementasi gesture yang lengkap.

Hasil yang dituju: konfirmasi penghapusan, menu aksi baris, edit dalam panel, pemilih ringkas, dan notifikasi asinkron.

Batch panel 19 Oktober 2026 menambahkan **Sheet dan Drawer**, sehingga gelombang ini telah menyelesaikan enam keluarga. Katalog kini 39 keluarga dan Storybook 196 specimens. Sheet menyediakan empat sisi fisik; Drawer merupakan bottom task tanpa swipe/snap points. Keduanya memakai fondasi modal yang sama, body scroll independen, dan aksi tetap terlihat. Figma menambahkan 34 varian termasuk konstruksi mobile, serta sembilan token ukuran. Sisa gelombang 3: Dropdown Menu, Context Menu, Menubar, Navigation Menu, Hover Card, dan Toast.

Batch menu 20 Oktober 2026 menambahkan **Dropdown Menu dan Context Menu**, membawa katalog ke 41 keluarga dan 224 stories. Submenu, checkbox/radio, typeahead, disabled-item discovery, RTL, dan keluar lewat Tab dibangun sendiri. Sisa setelah batch menu: Menubar, Navigation Menu, Hover Card, dan Toast. Tidak termasuk hover-open submenu atau long-press kustom.

Batch notifikasi menambahkan **Toast**: antrean terbatas, pembaruan ID, aksi async, timer yang berhenti saat hover/fokus/tab tidak aktif, dan pengumuman terpisah tanpa mengambil fokus. Katalog source kini 42 keluarga / 240 stories. Sisa gelombang 3: Menubar, Navigation Menu, dan Hover Card.

Batch workspace tools diterapkan pada 23 Oktober 2026: **Hover Card, Menubar dan Navigation Menu** melengkapi gelombang 3. Contoh `/docs/workspace-tools` membedakan navigasi link biasa, menu perintah aplikasi dan informasi tambahan. Semua perilaku dan styling tetap original.

## Gelombang 4 — Pilihan kompleks, tanggal, dan layout (11 entri pekerjaan)

Diterapkan pada 23 Oktober 2026: **Select, Combobox, Command, Calendar dan Date Picker**. Pilihan form memakai nilai terkomit terpisah dari query, validasi/reset native, dan scrolling popup yang tidak menggeser halaman. Date tools mendukung satu tanggal Gregorian dengan locale, awal minggu, min/max dan tanggal tidak tersedia. Input OTP, Slider, Resizable, Scroll Area, Sidebar dan Direction masih backlog.

Select, Combobox, Command, Calendar, Date Picker, Input OTP, Slider, Resizable, Scroll Area, Sidebar, Direction.

Custom Select dibedakan dari Native Select. Combobox perlu pencarian, pilihan aktif, state kosong/loading, dan keyboard; Command menggunakan item/action yang jelas. Calendar dan Date Picker perlu navigasi tanggal, locale, batas tanggal, tanggal nonaktif, serta opsi rentang bila dijanjikan. Input date native tidak dihitung sebagai Calendar kustom. OTP perlu paste dan autofill. Slider dan Resizable memerlukan keyboard serta batas nilai. Direction mendokumentasikan dukungan RTL lintas komponen. Scroll Area tetap memakai scrolling browser saat memadai. Sidebar dibangun di atas atau bersama AppShell dengan kontrak collapse, active item, grup, serta mobile yang teruji.

Hasil yang dituju: filter tanggal, pemilihan anggota, command palette, tata letak aplikasi yang dapat dipakai ulang, dan form lanjutan.

## Gelombang 5 — Data, konten, dan komunikasi (12 entri pekerjaan)

Data Table, Chart, Code Block, Carousel, Item, Attachment, Bubble, Marker, Message, Message Scroller, Questionnaire, Trace.

Pisahkan primitive dari recipe. Data Table menjadi recipe yang mendokumentasikan selection, visibility, row actions, filter, sort, pagination, loading, empty, dan strategi data besar/server tanpa mengubah kontrak Table. Jangan menjanjikan virtualisasi atau performa data besar sebelum ada implementasi dan bukti. Chart dimulai dari tipe yang berguna untuk SaaS, termasuk ringkasan/tabel alternatif, label, legend, serta interaksi keyboard yang relevan. Code Block mengekstrak kode docs menjadi komponen/recipe umum; syntax highlighting dan streaming ditambahkan hanya bila diimplementasikan. Carousel mempunyai kontrol eksplisit dan reduced-motion.

Pola komunikasi tidak bergantung pada provider AI. Attachment membedakan state file lokal, unggah, gagal, dan tersedia sesuai API yang benar-benar ada; jangan menyiratkan backend upload disediakan oleh UI. Message Scroller harus menghormati posisi baca saat konten bertambah. Questionnaire dan Trace ditangani setelah form dan disclosure stabil.

## Perluasan setelah katalog utama

[AI Elements resmi](https://ui.shadcn.com/docs/ai-elements) merupakan lapisan pola tersendiri. Evaluasi pola chat, prompt composer, sumber/citation, tool activity, dan status task setelah primitive utamanya matang. Gunakan status aksi dan ringkasan yang memang boleh ditampilkan; komponen tidak memerlukan akses ke penalaran privat model.

Untuk kebutuhan SaaS di luar benchmark, kandidat berikutnya adalah File Upload/Dropzone, Password Field, Search Field, Multi-select, Tree View, Timeline, Stepper, Definition List, Page Header, dan Notification Center. Ini backlog tambahan yang perlu spesifikasi terpisah, bukan klaim bahwa semua sudah dibangun atau fitur tersebut berasal dari katalog shadcn.

## Syarat sebuah keluarga dianggap selesai

- Source original dan public export bertipe; atribut native/ref serta controlled/uncontrolled state didukung jika relevan.
- Token semantic/component light dan dark dipakai konsisten; ukuran dan variant mengikuti kosakata antiflex.
- State normal, hover, focus, disabled, invalid, loading, empty, selected/open, dan reduced-motion diuji sesuai sifat komponen. Komponen statis tidak dipaksa memiliki state yang tidak masuk akal.
- Docs menjelaskan anatomy, API, contoh pemakaian/komposisi, keyboard, aksesibilitas, dan batas implementasi. Contoh benar-benar berjalan.
- Storybook mencakup varian, edge cases, serta pengujian aksesibilitas. Interaksi keyboard/focus/state diuji lewat browser; axe saja tidak membuktikan perilaku benar.
- Figma menyediakan padanan visual yang relevan, variant/property, auto-layout, serta binding token. Utility tanpa wujud mandiri cukup diberi contoh/aturan yang sesuai. Semua ditandai belum sinkron sampai diverifikasi.
- Registry installer dapat menyalin source dan dependensinya ke aplikasi React baru; consumer build lolos tanpa dependensi perilaku yang dilarang.
- Layout diperiksa pada mobile, tablet, desktop, light/dark, konten panjang, dan RTL yang relevan. Tes regresi komponen yang terpengaruh lolos.
- Changelog, readiness, dan inventaris diperbarui sesuai hasil nyata; publikasi eksternal tetap proses rilis tersendiri.

Untuk pola keyboard dan semantik, gunakan [W3C APG](https://www.w3.org/WAI/ARIA/apg/patterns/). Untuk pemeriksaan stories, gunakan [panduan aksesibilitas Storybook](https://storybook.js.org/docs/writing-tests/accessibility-testing). Status implementasi setiap gelombang dicatat di atas; backlog tidak dihitung sebagai komponen tersedia.
