const dataSiswaTable = document.getElementById("dataSiswaTable");
const notif = document.getElementById("notif");

function tampilkanDataSiswa() {
  const dataSiswa = JSON.parse(localStorage.getItem("dataSiswa")) || [];
  dataSiswaTable.innerHTML = "";

  let jumlahLaki = 0;
  let jumlahPerempuan = 0;

  dataSiswa.forEach((siswa, index) => {
    // Hitung jumlah laki-laki dan perempuan (case insensitive)
    const jk = siswa.jk.toLowerCase();
    if (jk === "laki-laki" || jk === "laki") jumlahLaki++;
    else if (jk === "perempuan") jumlahPerempuan++;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${siswa.nama}</td>
      <td>${siswa.ttl}</td>
      <td>${siswa.jk}</td>
      <td>${siswa.ayah}</td>
      <td>${siswa.ibu}</td>
      <td><a href="${siswa.kk}" target="_blank">Lihat</a></td>
      <td><a href="${siswa.akta}" target="_blank">Lihat</a></td>
      <td><a href="${siswa.raport}" target="_blank">Lihat</a></td>
      <td>
        <i class="bi bi-pencil-square icon-btn text-primary" title="Edit" onclick="editData(${index})"></i>
        <i class="bi bi-trash-fill icon-btn text-danger" title="Hapus" onclick="hapusData(${index})"></i>
      </td>
    `;
    dataSiswaTable.appendChild(row);
  });

  // Tampilkan jumlah siswa
  document.getElementById("totalSiswa").textContent = dataSiswa.length;
  document.getElementById("totalLaki").textContent = jumlahLaki;
  document.getElementById("totalPerempuan").textContent = jumlahPerempuan;

  if (dataSiswa.length > 0) {
    notif.classList.remove("d-none");
  }
}

function hapusData(index) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    const dataSiswa = JSON.parse(localStorage.getItem("dataSiswa")) || [];
    dataSiswa.splice(index, 1);
    localStorage.setItem("dataSiswa", JSON.stringify(dataSiswa));
    tampilkanDataSiswa();
  }
}

function editData(index) {
  const dataSiswa = JSON.parse(localStorage.getItem("dataSiswa")) || [];
  const siswa = dataSiswa[index];

  localStorage.setItem("editIndex", index);
  localStorage.setItem("dataEditSiswa", JSON.stringify(siswa));

  window.location.href = "pedaftaran.html";
}

window.onload = tampilkanDataSiswa;
