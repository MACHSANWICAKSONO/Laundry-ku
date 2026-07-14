// ==============================
// LaundryKu - Main JavaScript
// ==============================
// ==============================
// Local Storage
// ==============================

let pelanggan = JSON.parse(localStorage.getItem("pelanggan")) || [];
let laundry = JSON.parse(localStorage.getItem("laundry")) || [];
let pembayaran = JSON.parse(localStorage.getItem("pembayaran")) || [];

// Salam berdasarkan waktu
const jam = new Date().getHours();
let salam = "";

if (jam < 11) {
    salam = "Selamat Pagi";
} else if (jam < 15) {
    salam = "Selamat Siang";
} else if (jam < 18) {
    salam = "Selamat Sore";
} else {
    salam = "Selamat Malam";
}

console.log(salam + ", Selamat datang di LaundryKu!");

// Konfirmasi tombol hapus
const tombolHapus = document.querySelectorAll(".btn-danger");

tombolHapus.forEach(function(btn){
    btn.addEventListener("click", function(e){
        e.preventDefault();

        if(confirm("Yakin ingin menghapus data ini?")){
            alert("Data berhasil dihapus (simulasi).");
        }
    });
});

// Tombol simpan
const tombolPrimary = document.querySelectorAll(".btn-primary");

tombolPrimary.forEach(function(btn){
    btn.addEventListener("click", function(){

        if(btn.innerText.includes("Tambah")){
            alert("Data berhasil ditambahkan.");
        }

        if(btn.innerText.includes("Simpan")){
            alert("Data berhasil disimpan.");
        }

    });
});

// Menampilkan tanggal hari ini
const hari = new Date();

console.log(
    "Tanggal : " +
    hari.toLocaleDateString("id-ID")
);

// ==============================
// Tambah Data Pelanggan
// ==============================

function tambahPelanggan() {

    let nama = document.getElementById("nama").value;
    let hp = document.getElementById("hp").value;
    let alamat = document.getElementById("alamat").value;

    if (nama == "" || hp == "" || alamat == "") {
        alert("Semua data harus diisi!");
        return;
    }

    let tabel = document.getElementById("tabelPelanggan");

    let nomor = tabel.rows.length + 1;
    pelanggan.push({
    nama: nama,
    hp: hp,
    alamat: alamat
});

localStorage.setItem("pelanggan", JSON.stringify(pelanggan));
location.reload();

    

    document.getElementById("nama").value = "";
    document.getElementById("hp").value = "";
    document.getElementById("alamat").value = "";

    bootstrap.Modal.getInstance(document.getElementById("modalPelanggan")).hide();
}
// ==============================
// Tambah Data Laundry
// ==============================

function tambahLaundry() {

    let nama = document.getElementById("namaPelanggan").value;
    let jenis = document.getElementById("jenisLaundry").value;
    let berat = document.getElementById("beratLaundry").value;
    let status = document.getElementById("statusLaundry").value;
    let tanggal = document.getElementById("tanggalMasuk").value;

    if (nama === "" || berat === "" || tanggal === "") {
        alert("Lengkapi semua data!");
        return;
    }
    laundry.push({
    nama: nama,
    jenis: jenis,
    berat: berat,
    status: status,
    tanggal: tanggal
});

localStorage.setItem("laundry", JSON.stringify(laundry));

    let tabel = document.getElementById("tabelLaundry");
    let nomor = tabel.rows.length + 1;

    let badge = "bg-warning text-dark";

    if (status === "Dicuci") {
        badge = "bg-info";
    } else if (status === "Selesai") {
        badge = "bg-success";
    }

    let baris = `
        <tr>
            <td>${nomor}</td>
            <td>${nama}</td>
            <td>${jenis}</td>
            <td>${berat} Kg</td>
            <td><span class="badge ${badge}">${status}</span></td>
            <td>
                <button class="btn btn-warning btn-sm">
                    <i class="bi bi-pencil"></i>
                </button>

                <button class="btn btn-danger btn-sm">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `;

    tabel.innerHTML += baris;

    document.getElementById("namaPelanggan").value = "";
    document.getElementById("jenisLaundry").selectedIndex = 0;
    document.getElementById("beratLaundry").value = "";
    document.getElementById("statusLaundry").selectedIndex = 0;
    document.getElementById("tanggalMasuk").value = "";

    alert("Data laundry berhasil ditambahkan.");
}
// ==============================
// Grafik Dashboard
// ==============================

const canvas = document.getElementById("pelangganChart");

if (canvas) {
    new Chart(canvas, {
        type: "bar",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
            datasets: [{
                label: "Jumlah Pelanggan",
                data: [10, 15, 8, 20, 18, 25],
                backgroundColor: "#0d6efd"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// ==============================
// Tambah Data Pembayaran
// ==============================

function tambahPembayaran() {

    let nama = document.getElementById("namaBayar").value;
    let total = document.getElementById("totalBayar").value;
    let metode = document.getElementById("metodeBayar").value;
    let status = document.getElementById("statusBayar").value;

    if (nama === "" || total === "") {
        alert("Lengkapi data terlebih dahulu!");
        return;
    }
    pembayaran.push({
    nama: nama,
    total: total,
    metode: metode,
    status: status
});

localStorage.setItem("pembayaran", JSON.stringify(pembayaran));

    let tabel = document.getElementById("tabelPembayaran");
    let nomor = tabel.rows.length + 1;

    let badge = status === "Lunas"
        ? '<span class="badge bg-success">Lunas</span>'
        : '<span class="badge bg-danger">Belum Lunas</span>';

    tabel.innerHTML += `
        <tr>
            <td>${nomor}</td>
            <td>${nama}</td>
            <td>Rp${Number(total).toLocaleString("id-ID")}</td>
            <td>${metode}</td>
            <td>${badge}</td>
        </tr>
    `;

    document.getElementById("namaBayar").value = "";
    document.getElementById("totalBayar").value = "";
    document.getElementById("metodeBayar").selectedIndex = 0;
    document.getElementById("statusBayar").selectedIndex = 0;

    alert("Pembayaran berhasil ditambahkan.");
}
// ==============================
// Tampilkan Data Pelanggan
// ==============================

window.addEventListener("DOMContentLoaded", function () {

    let tabel = document.getElementById("tabelPelanggan");

    if (!tabel) return;

    tabel.innerHTML = "";

    let pelanggan = JSON.parse(localStorage.getItem("pelanggan")) || [];

    pelanggan.forEach(function(item, index){

        tabel.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.hp}</td>
            <td>${item.alamat}</td>
            <td>
                

<button class="btn btn-warning btn-sm" onclick="editPelanggan(${index})">
    <i class="bi bi-pencil-square"></i>
</button>

<button class="btn btn-danger btn-sm" onclick="hapusPelanggan(${index})">
    <i class="bi bi-trash-fill"></i>
</button>
            </td>
        </tr>
        `;

    });

});

// ==============================
// Tampilkan Data Laundry
// ==============================

window.addEventListener("DOMContentLoaded", function () {

    let tabel = document.getElementById("tabelLaundry");

    if (!tabel) return;

    tabel.innerHTML = "";

    let laundry = JSON.parse(localStorage.getItem("laundry")) || [];

    laundry.forEach(function(item, index){

        let badge = "bg-warning text-dark";

        if(item.status === "Dicuci"){
            badge = "bg-info";
        }else if(item.status === "Selesai"){
            badge = "bg-success";
        }

        tabel.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${item.nama}</td>
            <td>${item.jenis}</td>
            <td>${item.berat} Kg</td>
            <td><span class="badge ${badge}">${item.status}</span></td>
            <td>
    <button class="btn btn-warning btn-sm" onclick="editLaundry(${index})">
        <i class="bi bi-pencil"></i>
    </button>

    <button class="btn btn-danger btn-sm" onclick="hapusLaundry(${index})">
        <i class="bi bi-trash"></i>
    </button>
</td>
        </tr>
        `;
    });

});

// ==============================
// Tampilkan Data Pembayaran
// ==============================

window.addEventListener("DOMContentLoaded", function () {

    let tabel = document.getElementById("tabelPembayaran");

    if (!tabel) return;

    tabel.innerHTML = "";

    let pembayaran = JSON.parse(localStorage.getItem("pembayaran")) || [];

    pembayaran.forEach(function(item, index){

        let badge = item.status === "Lunas"
            ? '<span class="badge bg-success">Lunas</span>'
            : '<span class="badge bg-danger">Belum Lunas</span>';

        tabel.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>Rp${Number(item.total).toLocaleString("id-ID")}</td>
            <td>${item.metode}</td>
            <td>${badge}</td>
            <td>
    <button class="btn btn-warning btn-sm" onclick="editPembayaran(${index})">
        <i class="bi bi-pencil"></i>
    </button>

    <button class="btn btn-danger btn-sm" onclick="hapusPembayaran(${index})">
        <i class="bi bi-trash"></i>
    </button>
</td>
        </tr>
        `;

    });

});

// ==============================
// Dashboard Data Terbaru
// ==============================

window.addEventListener("DOMContentLoaded", function () {

    let tabel = document.getElementById("dashboardTable");

    if (!tabel) return;

    tabel.innerHTML = "";

    let data = JSON.parse(localStorage.getItem("laundry")) || [];

    data.slice(-5).reverse().forEach(function(item, index){

        let badge = "bg-warning text-dark";

        if(item.status === "Dicuci"){
            badge = "bg-info";
        }else if(item.status === "Selesai"){
            badge = "bg-success";
        }

        tabel.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${item.nama}</td>
            <td>${item.jenis}</td>
            <td>${item.berat} Kg</td>
            <td><span class="badge ${badge}">${item.status}</span></td>
        </tr>
        `;
    });

});


function hapusPelanggan(index) {

    if (!confirm("Yakin ingin menghapus pelanggan ini?")) return;

    let pelanggan = JSON.parse(localStorage.getItem("pelanggan")) || [];

    pelanggan.splice(index, 1);

    localStorage.setItem("pelanggan", JSON.stringify(pelanggan));

    location.reload();
}

function editPelanggan(index) {

    let pelanggan = JSON.parse(localStorage.getItem("pelanggan")) || [];

    let nama = prompt("Nama:", pelanggan[index].nama);
    if (nama === null) return;

    let hp = prompt("Nomor HP:", pelanggan[index].hp);
    if (hp === null) return;

    let alamat = prompt("Alamat:", pelanggan[index].alamat);
    if (alamat === null) return;

    pelanggan[index].nama = nama;
    pelanggan[index].hp = hp;
    pelanggan[index].alamat = alamat;

    localStorage.setItem("pelanggan", JSON.stringify(pelanggan));

    location.reload();
}
function hapusLaundry(index) {

    if (!confirm("Yakin ingin menghapus data laundry ini?")) return;

    let laundry = JSON.parse(localStorage.getItem("laundry")) || [];

    laundry.splice(index,1);

    localStorage.setItem("laundry", JSON.stringify(laundry));

    location.reload();
}

function editLaundry(index){

    let laundry = JSON.parse(localStorage.getItem("laundry")) || [];

    let nama = prompt("Nama", laundry[index].nama);
    if(nama===null) return;

    let jenis = prompt("Jenis Laundry", laundry[index].jenis);
    if(jenis===null) return;

    let berat = prompt("Berat", laundry[index].berat);
    if(berat===null) return;

    let status = prompt("Status", laundry[index].status);
    if(status===null) return;

    laundry[index].nama = nama;
    laundry[index].jenis = jenis;
    laundry[index].berat = berat;
    laundry[index].status = status;

    localStorage.setItem("laundry", JSON.stringify(laundry));

    location.reload();
}
function hapusPembayaran(index){

    if(!confirm("Yakin ingin menghapus pembayaran ini?")) return;

    let pembayaran = JSON.parse(localStorage.getItem("pembayaran")) || [];

    pembayaran.splice(index,1);

    localStorage.setItem("pembayaran", JSON.stringify(pembayaran));

    location.reload();
}

function editPembayaran(index){

    let pembayaran = JSON.parse(localStorage.getItem("pembayaran")) || [];

    let nama = prompt("Nama", pembayaran[index].nama);
    if(nama===null) return;

    let total = prompt("Total", pembayaran[index].total);
    if(total===null) return;

    let metode = prompt("Metode", pembayaran[index].metode);
    if(metode===null) return;

    let status = prompt("Status", pembayaran[index].status);
    if(status===null) return;

    pembayaran[index].nama = nama;
    pembayaran[index].total = total;
    pembayaran[index].metode = metode;
    pembayaran[index].status = status;

    localStorage.setItem("pembayaran", JSON.stringify(pembayaran));

    location.reload();
}