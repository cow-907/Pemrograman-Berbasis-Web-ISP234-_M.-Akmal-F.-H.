const formBarang = document.getElementById("formBarang");
const daftarBarang = document.getElementById("daftarBarang");
const hasil = document.getElementById("hasil");
const pesan = document.getElementById("pesan");
const btnHitung = document.getElementById("btnHitung");
const btnReset = document.getElementById("btnReset");

// array of object: keranjang belanja (diisi dari form)
const keranjang = [];

// batas dan persentase diskon
const batasDiskonBesar = 500000;
const batasDiskonKecil = 200000;
const persenDiskonBesar = 15;
const persenDiskonKecil = 10;

// format angka menjadi Rupiah
function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

// validasi input barang
function validasiBarang(nama, harga, jumlah) {
  if (nama.trim() === "") return false;
  if (Number.isNaN(harga) || harga <= 0) return false;
  if (Number.isNaN(jumlah) || jumlah < 1 || !Number.isInteger(jumlah))
    return false;
  return true;
}

// PROSES: hitung total belanja dengan loop
function hitungTotal(dataKeranjang) {
  let total = 0;

  for (let i = 0; i < dataKeranjang.length; i++) {
    const subtotal = dataKeranjang[i].harga * dataKeranjang[i].jumlah;
    console.log("Subtotal " + dataKeranjang[i].nama + ":", subtotal);
    total += subtotal;
  }

  return total;
}

// KEPUTUSAN: tentukan persentase diskon (diperiksa dari batas tertinggi)
function hitungDiskon(total) {
  if (total >= batasDiskonBesar) {
    return persenDiskonBesar;
  } else if (total > batasDiskonKecil) {
    return persenDiskonKecil;
  }
  return 0;
}

// OUTPUT: tampilkan isi keranjang ke tabel
function tampilkanKeranjang() {
  if (keranjang.length === 0) {
    daftarBarang.innerHTML = `<tr><td colspan="4" class="kosong">Keranjang masih kosong</td></tr>`;
    return;
  }

  let baris = "";

  for (let i = 0; i < keranjang.length; i++) {
    const item = keranjang[i];
    baris += `
      <tr>
        <td>${item.nama}</td>
        <td>${formatRupiah(item.harga)}</td>
        <td>${item.jumlah}</td>
        <td>${formatRupiah(item.harga * item.jumlah)}</td>
      </tr>`;
  }

  daftarBarang.innerHTML = baris;
}

// event: tambah barang dari form
formBarang.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value;
  const harga = Number(document.getElementById("harga").value);
  const jumlah = Number(document.getElementById("jumlah").value);

  if (!validasiBarang(nama, harga, jumlah)) {
    pesan.textContent =
      "Nama wajib diisi, harga > 0, dan jumlah berupa bilangan bulat ≥ 1.";
    console.log("Validasi gagal:", { nama, harga, jumlah });
    return;
  }

  pesan.textContent = "";
  keranjang.push({ nama: nama.trim(), harga: harga, jumlah: jumlah });
  console.log("Barang ditambahkan:", keranjang[keranjang.length - 1]);

  hasil.innerHTML = "";
  tampilkanKeranjang();
  formBarang.reset();
  document.getElementById("jumlah").value = 1;
  document.getElementById("nama").focus();
});

// event: hitung total dan diskon
btnHitung.addEventListener("click", function () {
  const total = hitungTotal(keranjang);
  const persenDiskon = hitungDiskon(total);
  const besarDiskon = (total * persenDiskon) / 100;
  const totalBayar = total - besarDiskon;

  // debugging melalui Console
  console.log("Total belanja:", total);
  console.log("Persentase diskon:", persenDiskon + "%");
  console.log("Diskon:", besarDiskon, "| Total bayar:", totalBayar);

  hasil.innerHTML = `
    <p><span>Total belanja</span><span>${formatRupiah(total)}</span></p>
    <p><span>Diskon (${persenDiskon}%)</span><span>${formatRupiah(besarDiskon)}</span></p>
    <p class="total-bayar"><span>Total bayar</span><span>${formatRupiah(totalBayar)}</span></p>
  `;
});

// event: kosongkan keranjang
btnReset.addEventListener("click", function () {
  keranjang.length = 0;
  hasil.innerHTML = "";
  pesan.textContent = "";
  tampilkanKeranjang();
  console.log("Keranjang dikosongkan");
});

tampilkanKeranjang();
