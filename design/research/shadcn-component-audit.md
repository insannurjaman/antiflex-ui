# Audit kelengkapan komponen Chamfer /ui

**Snapshot sebelum pengembangan form.** Per 23 Oktober 2026, implementasi bertahap telah menambah inventaris source menjadi 50 keluarga / 304 stories, termasuk delapan workspace tools. Angka dan temuan di bawah mempertahankan hasil riset awal; gunakan roadmap dan katalog source untuk kondisi terbaru.

Diperiksa pada 17 Oktober 2026. Snapshot katalog dapat berubah; angka ini bukan klaim permanen tentang shadcn/ui.

Chamfer belum setara dalam keluasan katalog. [Katalog utama resmi shadcn/ui](https://ui.shadcn.com/docs/components) yang diperiksa memuat **66 entri**. Inventaris lokal Chamfer memuat **8 keluarga reusable**: Button, TextField, Badge, Card, Separator, Skeleton, Table, dan AppShell. Angka 66 mencampur primitive, utility, dan recipe; angka 8 adalah keluarga library lokal, sehingga membaginya menjadi persentase kesiapan akan menyesatkan.

Pemetaan konservatif: **6 keluarga dasar berpadanan langsung, 14 entri mempunyai sebagian fondasi/implementasi khusus aplikasi, dan 46 belum tersedia**. Status dasar tersedia tidak berarti semua API dan varian reference telah setara. Jumlah subkomponen Table dan varian warna tidak menambah jumlah keluarga.

## Cara audit

Baca source library, registry installer, metadata dokumentasi, stories, dan pemakaian di dashboard/docs. Tidak menghitung markup aplikasi sebagai komponen library. Tidak mengaudit ulang file Figma pada pekerjaan riset ini, sehingga keberadaan varian Figma baru tidak diasumsikan. Tidak menjalankan pengujian perilaku baru karena tidak ada perubahan implementasi.

Sumber lokal: [library](../../packages/ui/src/index.tsx), [registry](../../packages/cli/registry/manifest.json), [metadata docs](../../apps/docs/components/component-data.ts), dan [stories](../../apps/storybook/stories). Snapshot terstruktur: [JSON audit](shadcn-component-audit.json).

## Perbandingan yang perlu dibaca dengan tepat

- Input dasar sudah bisa dipakai melalui TextField. Kekurangannya adalah komposisi Input/Label/Field yang independen dan lebih luas. [Field reference](https://ui.shadcn.com/docs/components/base/field) menyediakan komposisi kontrol, label, bantuan, error, dan grup; itu menjadi acuan kebutuhan, bukan API yang harus disalin.
- [Data Table reference](https://ui.shadcn.com/docs/components/base/data-table) adalah panduan membangun tabel berbasis Table dan TanStack Table. Chamfer juga perlu recipe yang jelas; Table tetap semantic dan composable. Filter, sort, pagination, dan ekspor di demo belum membuat recipe data table lengkap.
- [Sidebar reference](https://ui.shadcn.com/docs/components/base/sidebar) adalah keluarga bagian navigasi yang dapat dikomposisi. AppShell kita menangani frame dan menu mobile, sehingga belum setara dengan seluruh keluarga itu.
- [AI Elements](https://ui.shadcn.com/docs/ai-elements) adalah lapisan pola agentic terpisah. Jangan menambahkan jumlahnya ke 66 atau menganggap pola Message pada dua bagian sebagai dua primitive berbeda. Katalog utama sendiri sudah memiliki beberapa elemen komunikasi.
- Distribusi kode, komposisi API, dan CLI juga bagian produk shadcn/ui menurut [introduction resmi](https://ui.shadcn.com/docs). Kelengkapan Chamfer perlu mencakup pengalaman instalasi dan dokumentasi, bukan hanya nama komponen.

## Matriks lengkap

Gelombang menunjukkan urutan pekerjaan yang direkomendasikan di [roadmap](../../docs/COMPONENT-ROADMAP.md), bukan komponen yang sudah selesai atau jadwal yang dijanjikan.

| Entri katalog referensi | Status Chamfer            | Gelombang | Temuan lokal / pekerjaan                                                                                                          |
| ----------------------- | ------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Accordion               | Belum tersedia            | 2         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Alert                   | Belum tersedia            | 2         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Alert Dialog            | Belum tersedia            | 3         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Aspect Ratio            | Belum tersedia            | 2         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Attachment              | Belum tersedia            | 5         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Avatar                  | Belum tersedia            | 2         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Badge                   | Dasar tersedia            | —         | Keluarga reusable, docs, Storybook, dan registry tersedia. Ini pemetaan dasar; seluruh varian shadcn belum diaudit satu per satu. |
| Breadcrumb              | Belum tersedia            | 2         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Bubble                  | Belum tersedia            | 5         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Button                  | Dasar tersedia            | —         | Keluarga reusable, docs, Storybook, dan registry tersedia. Ini pemetaan dasar; seluruh varian shadcn belum diaudit satu per satu. |
| Button Group            | Belum tersedia            | 1         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Calendar                | Belum tersedia            | 4         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Card                    | Dasar tersedia            | —         | Keluarga reusable, docs, Storybook, dan registry tersedia. Ini pemetaan dasar; seluruh varian shadcn belum diaudit satu per satu. |
| Carousel                | Belum tersedia            | 5         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Chart                   | Parsial / khusus aplikasi | 5         | Grafik SVG khusus dashboard; belum ada API grafik reusable, legend, tooltip, atau variasi grafik.                                 |
| Checkbox                | Belum tersedia            | 1         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Code Block              | Parsial / khusus aplikasi | 5         | Code dengan copy dan region keyboard-scroll ada di aplikasi docs; belum menjadi paket/registry komponen umum.                     |
| Collapsible             | Belum tersedia            | 2         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Combobox                | Belum tersedia            | 4         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Command                 | Belum tersedia            | 4         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Context Menu            | Belum tersedia            | 3         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Data Table              | Parsial / khusus aplikasi | 5         | Contoh punya filter, sort, pagination, CSV; belum punya recipe reusable, pemilihan baris, dan pengaturan kolom.                   |
| Date Picker             | Belum tersedia            | 4         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Dialog                  | Belum tersedia            | 3         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Direction               | Belum tersedia            | 4         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Drawer                  | Belum tersedia            | 3         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Dropdown Menu           | Belum tersedia            | 3         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Empty                   | Parsial / khusus aplikasi | 2         | Empty state khusus orders ada; belum ada komponen reusable dengan slot judul, deskripsi, dan aksi.                                |
| Field                   | Parsial / khusus aplikasi | 1         | TextField punya label, bantuan, dan error; belum ada komposisi field umum untuk kontrol lain atau grup field.                     |
| Hover Card              | Belum tersedia            | 3         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Input                   | Parsial / khusus aplikasi | 1         | TextField membungkus native input dan meneruskan atribut/ref; belum ada Input terpisah untuk komposisi.                           |
| Input Group             | Parsial / khusus aplikasi | 1         | TextField mendukung leading content; addon teks/aksi dan komposisi grup belum tersedia.                                           |
| Input OTP               | Belum tersedia            | 4         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Item                    | Belum tersedia            | 5         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Kbd                     | Belum tersedia            | 2         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Label                   | Parsial / khusus aplikasi | 1         | Label tersambung di dalam TextField; belum diekspor sebagai primitive terpisah.                                                   |
| Marker                  | Belum tersedia            | 5         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Menubar                 | Belum tersedia            | 3         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Message                 | Belum tersedia            | 5         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Message Scroller        | Belum tersedia            | 5         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Native Select           | Parsial / khusus aplikasi | 1         | Native select ada sebagai kontrol aplikasi; belum diekspor, didokumentasikan, dan didistribusikan sebagai komponen.               |
| Navigation Menu         | Belum tersedia            | 3         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Pagination              | Parsial / khusus aplikasi | 2         | Tombol dan status halaman khusus orders ada; belum ada pagination reusable dengan link/ellipsis.                                  |
| Popover                 | Belum tersedia            | 3         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Progress                | Belum tersedia            | 2         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Questionnaire           | Belum tersedia            | 5         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Radio Group             | Belum tersedia            | 1         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Resizable               | Belum tersedia            | 4         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Scroll Area             | Parsial / khusus aplikasi | 4         | Overflow region dan keyboard scrolling dipakai pada tabel/kode; belum ada surface scroll reusable yang didokumentasikan.          |
| Select                  | Belum tersedia            | 4         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Separator               | Dasar tersedia            | —         | Keluarga reusable, docs, Storybook, dan registry tersedia. Ini pemetaan dasar; seluruh varian shadcn belum diaudit satu per satu. |
| Sheet                   | Belum tersedia            | 3         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Sidebar                 | Parsial / khusus aplikasi | 4         | AppShell menyediakan area navigasi responsif; belum ada keluarga sidebar modular/collapsed rail.                                  |
| Skeleton                | Dasar tersedia            | —         | Keluarga reusable, docs, Storybook, dan registry tersedia. Ini pemetaan dasar; seluruh varian shadcn belum diaudit satu per satu. |
| Slider                  | Belum tersedia            | 4         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Spinner                 | Parsial / khusus aplikasi | 2         | Spinner internal Button tersedia; belum ada Spinner publik mandiri.                                                               |
| Switch                  | Belum tersedia            | 1         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Table                   | Dasar tersedia            | —         | Keluarga reusable, docs, Storybook, dan registry tersedia. Ini pemetaan dasar; seluruh varian shadcn belum diaudit satu per satu. |
| Tabs                    | Belum tersedia            | 2         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Textarea                | Belum tersedia            | 1         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Toast                   | Belum tersedia            | 3         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Toggle                  | Belum tersedia            | 2         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Toggle Group            | Belum tersedia            | 2         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Tooltip                 | Belum tersedia            | 3         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Trace                   | Belum tersedia            | 5         | Belum ada keluarga komponen publik yang terverifikasi di library, docs, stories, atau registry.                                   |
| Typography              | Parsial / khusus aplikasi | 2         | Token tipografi dan gaya docs ada; belum ada kontrak utility/recipe tipografi publik yang lengkap.                                |

## Batas kesimpulan

Ini audit keluasan dan struktur dari source, bukan sertifikasi kesetaraan perilaku, aksesibilitas, atau visual terhadap setiap varian. Menampilkan komponen pada halaman docs saja tidak memenuhi status selesai. Semua penambahan mengikuti standar penyelesaian dalam roadmap dan prinsip keyboard/semantik dari [W3C APG](https://www.w3.org/WAI/ARIA/apg/patterns/).
