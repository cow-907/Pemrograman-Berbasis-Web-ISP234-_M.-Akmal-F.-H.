console.log("=== JavaScript Fundamental ===");

let namaMahasiswa = "Akmal";
let nilaiUts = 82;
let nilaiUas = 90;

const bobotUts = 0.4;
const bobotUas = 0.6;

let nilaiAkhir = nilaiUts * bobotUts + nilaiUas * bobotUas;
console.log("Nama:", namaMahasiswa);
console.log("Nilai akhir:", nilaiAkhir);

if (nilaiAkhir >= 85) {
  console.log("Predikat: Sangat Baik");
} else if (nilaiAkhir >= 70) {
  console.log("Predikat: Baik");
} else {
  console.log("Predikat: Perlu Remedial");
}

const daftarNilai = [80, 75, 90, 88];
let total = 0;

for (let i = 0; i < daftarNilai.length; i++) {
  total += daftarNilai[i];
}

console.log("Rata-rata:", total / daftarNilai.length);

function hitungLuasPersegiPanjang(panjang, lebar) {
  return panjang * lebar;
}

console.log("Luas:", hitungLuasPersegiPanjang(10, 5));

const mahasiswa = {
  nim: "F1E125073",
  nama: "M. Akmal Faizhin H.",
  prodi: "Sistem Informasi",
  aktif: true,
};

console.log("Data mahasiswa:", mahasiswa);
