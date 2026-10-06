const formNilai = document.getElementById("formNilai");
const hasil = document.getElementById("hasil");

function hitungNilaiAkhir(tugas, uts, uas) {
  return tugas * 0.3 + uts * 0.3 + uas * 0.4;
}

function tentukanGrade(nilaiAkhir) {
  if (nilaiAkhir >= 85) return "A";
  else if (nilaiAkhir >= 75) return "B";
  else if (nilaiAkhir >= 65) return "C";
  else if (nilaiAkhir >= 55) return "D";
  return "E";
}

function tentukanStatus(nilaiAkhir) {
  return nilaiAkhir >= 65 ? "Lulus" : "Tidak Lulus";
}

function validasiNilai(nilai) {
  return !Number.isNaN(nilai) && nilai >= 0 && nilai <= 100;
}

formNilai.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value;

  const tugas = Number(document.getElementById("tugas").value);
  const uts = Number(document.getElementById("uts").value);
  const uas = Number(document.getElementById("uas").value);

  const daftarNilai = [tugas, uts, uas];
  let semuaValid = true;

  for (let i = 0; i < daftarNilai.length; i++) {
    if (!validasiNilai(daftarNilai[i])) {
      semuaValid = false;
    }
  }

  if (!semuaValid) {
    console.log("Validasi gagal:", daftarNilai);
    hasil.innerHTML = `
      <h2>Hasil Perhitungan</h2>
      <p class="error">Nilai harus berupa angka 0–100.</p>
    `;
    return;
  }

  const nilaiAkhir = hitungNilaiAkhir(tugas, uts, uas);
  const grade = tentukanGrade(nilaiAkhir);
  const status = tentukanStatus(nilaiAkhir);
  const statusClass = status === "Lulus" ? "lulus" : "tidak-lulus";

  const mahasiswa = {
    nama: nama,
    tugas: tugas,
    uts: uts,
    uas: uas,
    nilaiAkhir: nilaiAkhir,
    grade: grade,
    status: status,
  };

  console.log("Data hasil perhitungan:", mahasiswa);

  hasil.innerHTML = `
    <h2>Hasil Perhitungan</h2>
    <p>Mahasiswa: <strong>${mahasiswa.nama}</strong></p>
    <p class="score">${mahasiswa.nilaiAkhir.toFixed(1)}</p>
    <p>Status: <span class="${statusClass}">${mahasiswa.status}</span></p>
    <div class="detail">
      <span>Grade: <strong>${mahasiswa.grade}</strong></span>
      <span>Tugas: ${mahasiswa.tugas}</span>
      <span>UTS: ${mahasiswa.uts}</span>
      <span>UAS: ${mahasiswa.uas}</span>
    </div>
  `;
});
