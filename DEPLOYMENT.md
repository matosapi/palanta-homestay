# Panduan Deployment ke GitHub & Vercel

Berikut adalah langkah-langkah untuk mengupload project ini ke GitHub dan men-deploy-nya ke Vercel agar bisa diakses online.

## Prasyarat
1.  Sudah menginstall **Git** di komputer.
2.  Punya akun **GitHub** (github.com).
3.  Punya akun **Vercel** (vercel.com) yang terhubung dengan GitHub.

## Langkah 1: Upload ke GitHub

1.  **Inisialisasi Git** (jika belum):
    Buka terminal di folder project (`C:\Users\Axioo Pongo\Downloads\Compressed\PalantaHomestay`) dan jalankan:
    ```bash
    git init
    ```

2.  **Buat file `.gitignore`**:
    Pastikan file `.gitignore` ada dan berisi:
    ```
    node_modules
    dist
    .DS_Store
    ```

3.  **Commit Perubahan**:
    ```bash
    git add .
    git commit -m "Initial commit: Palanta Homestay Website"
    ```

4.  **Buat Repository di GitHub**:
    - Buka [GitHub.com](https://github.com) dan buat repository baru (tombol "+").
    - Beri nama (misal: `palanta-homestay`).
    - Jangan centang "Initialize with README".

5.  **Hubungkan dan Push**:
    Salin perintah yang muncul di GitHub (bagian "...or push an existing repository from the command line") dan jalankan di terminal:
    ```bash
    git remote add origin https://github.com/USERNAME_ANDA/palanta-homestay.git
    git branch -M main
    git push -u origin main
    ```

## Langkah 2: Deploy ke Vercel

1.  Buka [Vercel Dashboard](https://vercel.com/dashboard).
2.  Klik **"Add New..."** > **"Project"**.
3.  Pilih repository `palanta-homestay` yang baru saja di-upload, klik **"Import"**.
4.  **Konfigurasi Project**:
    - **Framework Preset**: Vite (biasanya otomatis terdeteksi).
    - **Root Directory**: `./` (biarkan default).
    - **Build Command**: `npm run build` (atau `vite build`).
    - **Output Directory**: `dist`.
5.  Klik **"Deploy"**.

## Selesai!
Vercel akan memproses build dan memberikan link website Anda (misal: `palanta-homestay.vercel.app`).

## Langkah 3: Cara Update Website (Jika ada perubahan)

Setiap kali Anda mengubah kode atau menambah fitur baru, lakukan langkah ini untuk mengupdate website:

1.  **Simpan Perubahan**:
    Buka terminal di folder project dan ketik:
    ```bash
    git add .
    git commit -m "Update fitur baru: nama fitur"
    ```
    *(Ganti "nama fitur" dengan deskripsi perubahan Anda)*

2.  **Upload ke GitHub**:
    ```bash
    git push
    ```

3.  **Otomatis Deploy**:
    Vercel akan mendeteksi perubahan di GitHub dan otomatis melakukan deploy ulang. Tunggu 1-2 menit, dan website Anda akan terupdate sendiri.

## Troubleshooting

### Error: "Please tell me who you are"
Jika saat commit muncul error ini, artinya Anda belum mengatur email dan nama di Git. Jalankan perintah ini:

```bash
git config --global user.email "email@anda.com"
git config --global user.name "Nama Anda"
```
Ganti dengan email dan nama asli Anda.
