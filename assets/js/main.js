var nomorUrut = 1;
var listProduk = [
  ["P001", "Pizza"],
  ["B002", "Burger"],
  ["S003", "Sushi"],
  ["N004", "Noodles"],
  ["SP005", "Spaghetti"],
  ["T006", "Taco"],
  ["IC007", "Ice Cream"],
  ["D008", "Donuts"],
  ["SC009", "Salad"],
  ["FC010", "Fried Chicken"],
  ["P011", "Pancakes"],
  ["FF012", "French Fries"],
  ["ST013", "Steak"],
  ["HD014", "Hot Dog"],
  ["S015", "Samosa"],
  ["P016", "Pasta"],
  ["FC017", "Fish and Chips"],
  ["S018", "Shawarma"],
  ["C019", "Curry"],
  ["SR020", "Sushi Roll"],
  ['P021', 'Wilson'],
];
var listBahan = [
  ["P001", "Tepung", 50],
  ["P003", "Keju", 50],
  ["P004", "Tomat", 50],
  ["B002", "Daging", 100],
  ["B004", "Roti", 100],
  ["B005", "Selada", 100],
  ["S003", "Nasi", 30],
  ["S004", "Ikan", 30],
  ["S005", "Rumput Laut", 30],
  ["N004", "Mie", 75],
  ["N005", "Sayuran", 75],
  ["N006", "Saus", 75],
  ["SP005", "Spaghetti", 60],
  ["SP006", "Saus Tomat", 60],
  ["SP007", "Keju", 60],
  ["T006", "Tortilla", 40],
  ["T007", "Daging", 40],
  ["T008", "Selada", 40],
  ["IC007", "Es Krim", 80],
  ["IC008", "Cokelat", 80],
  ["IC009", "Stroberi", 80],
  ["D008", "Adonan Donat", 120],
  ["D009", "Gula", 120],
  ["D010", "Glazur", 120],
  ["SC009", "Sayuran Hijau", 90],
  ["SC008", "Tomat", 90],
  ["SC010", "Dressing", 90],
  ["FC011", "Ayam", 70],
  ["FC012", "Tepung", 70],
  ["FC013", "Bumbu", 70],
  ["P011", "Tepung", 45],
  ["P010", "Telur", 45],
  ["P013", "Sirup", 45],
  ["FF012", "Kentang", 65],
  ["FF015", "Minyak", 65],
  ["FF017", "Garam", 65],
  ["ST013", "Daging Sapi", 55],
  ["ST014", "Garam", 55],
  ["ST016", "Lada", 55],
  ["HD014", "Sosis", 85],
  ["HD015", "Roti", 85],
  ["HD016", "Saus", 85],
  ["S015", "Kentang", 25],
  ["S016", "Kacang Hijau", 25],
  ["S018", "Kari", 25],
  ["P016", "Pasta", 95],
  ["P017", "Saus", 95],
  ["P089", "Lo siento", 30],
  ["P016", "Keju", 95],
  ["FC017", "Ikan", 35],
  ["FC018", "Kentang", 35],
  ["FC019", "Tartar Sauce", 35],
  ["S018", "Daging Kebab", 50],
  ["S019", "Roti", 50],
  ["S020", "Saus", 50],
  ["C019", "Daging", 70],
  ["C020", "Bumbu Curry", 70],
  ["C021", "Nasi", 70],
  ["SR020", "Nori", 40],
  ["SR021", "Nasi", 40],
  ["SR022", "Ikan", 40],
];

var bahan = [];

var dataTableCetak;
var dataTableProduk;
var dataTableBahan;

function closeModal(modal) {
  $("#" + modal).modal("hide");
}

function hapus(button) {
  var row = button.parentNode.parentNode;

  bahan = bahan.filter(function (obj) {
    return obj.kode !== row.cells[1].innerHTML;
  });

  row.parentNode.removeChild(row);
}

function validateStock(input) {
  var stock = parseInt(input.getAttribute("data-stock"));
  var qty = parseInt(input.value);
  if (qty > stock) {
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Stock tidak cukup!",
    });

    input.value = stock;
  } else if (qty < 1) {
    input.value = 1;
  }

  // bahan = bahan.map(function (obj) {
  //   if (obj.kode === input.getAttribute("data-kode")) {
  //     alert("Asd")
  //     // obj.qty = input.value;
  //   }
  //   // return obj;
  // });

  bahan.map(function(item) {
    var kodeProduk = item[0];

    if (kodeProduk == input.getAttribute("data-kode")) {
      item[2] = input.value;
    }

});
}

function validateCart(bahan) {
  var table = document.getElementById("tabel-list-bahan");
  for (var i = 1; i < table.rows.length; i++) {
    var namaBahanTabel = table.rows[i].cells[1].innerHTML;
    if (namaBahanTabel === bahan) {
      return true;
    }
  }
  return false;
}

$(document).ready(function () {
  dataTableProduk = $("#tabel-produk").DataTable({
    columnDefs: [
      {
        targets: 0,
        width: "10%",
      },
    ],
  });

  // dataTableProduk.clear().rows.add(listProduk).draw();

  dataTableBahan = $("#tabel-bahan").DataTable({
    columnDefs: [
      {
        targets: 0,
        width: "10%",
      },
    ],
  });

  let dataProduk = [];
  listProduk.forEach((item) => {
    dataProduk.push([item[0], item[1],
      `<div class="text-center"><button
      type="button"
      class="btn mx-auto checklist btn-outline-primary btn-icon-circle btn-icon-circle-sm"
    >
      <i class="fas fa-check"></i>
    </button></div>`]);
   
  });
  dataTableProduk.clear().rows.add(dataProduk).draw();

  let dataBahan = [];
  listBahan.forEach((item) => {
    dataBahan.push([item[0], item[1], item[2],
      `<div class="text-center"><button
      type="button"
      class="btn checklist btn-outline-primary btn-icon-circle btn-icon-circle-sm"
    >
      <i class="fas fa-check"></i>
    </button></div>`]);
   
  });
  dataTableBahan.clear().rows.add(dataBahan).draw();


  dataTableCetak = $("#tabel-cetak").DataTable({});

  $("#to-cart").on("click", function () {
    if (
      $("#form-kode-bahan").val() == "" ||
      $("#form-nama-bahan").val() == "" ||
      $("#form-stock-bahan").val() == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pilih bahan terlebih dahulu!",
      });
      return;
    }

    if (validateCart($("#form-kode-bahan").val())) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bahan sudah ditambahkan!",
      });
      return;
    }
    var table = document.getElementById("tabel-list-bahan");
    var newRow = table.insertRow(-1);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    cell1.innerHTML = nomorUrut;
    cell2.innerHTML = $("#form-kode-bahan").val();
    cell3.innerHTML = $("#form-nama-bahan").val();
    cell4.innerHTML =
      '<input class="form-control" data-kode="'+$("#form-kode-bahan").val()+'" onkeyup="validateStock(this)" type="number" data-stock="' +
      $("#form-stock-bahan").val() +
      '" value="1" id="qty-' +
      nomorUrut +
      '">';
    cell5.innerHTML =
      "<button class='btn btn-danger btn-sm' onclick='hapus(this)'>Hapus</button>";

    bahan.push([
      $("#form-kode-bahan").val(),
      $("#form-nama-bahan").val(),
      $("#qty-" + nomorUrut).val(),
    ]);

    $("#form-kode-bahan").val("");
    $("#form-nama-bahan").val("");
    $("#form-stock-bahan").val("");

    nomorUrut++;
  });

  $("#pilih-bahan").on("click", function () {
    if ($("#form-kode-produk").val() == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pilih bahan terlebih dahulu!",
      });
    } else {
      $("#modalBahan").modal("show");
    }
  });

  $("#tabel-produk").on("click", ".checklist", function () {
    let row = $(this).closest("tr");
    let kode = row.find("td:eq(0)").text();
    let nama = row.find("td:eq(1)").text();
    $("#form-kode-produk").val(kode);
    $("#form-nama-produk").val(nama);

    closeModal("modalProduk");
  });

  $("#tabel-bahan").on("click", ".checklist", function () {
    let row = $(this).closest("tr");
    let kode = row.find("td:eq(0)").text();
    let stock = row.find("td:eq(2)").text();
    let nama = row.find("td:eq(1)").text();
    $("#form-kode-bahan").val(kode);
    $("#form-nama-bahan").val(nama);
    $("#form-stock-bahan").val(stock);

    closeModal("modalBahan");
  });

  $("#cetak-transaksi").on("click", function () {
    if (
      $("#form-kode-produk").val() == "" ||
      $("#form-nama-produk").val() == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pilih produk terlebih dahulu!",
      });
      return;
    }

    if ($("#tabel-list-bahan tr").length == 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tambahkan bahan terlebih dahulu!",
      });
      return;
    }
    dataTableCetak.clear().rows.add(bahan).draw();

    $('#kode-akhir').val($("#form-kode-produk").val());
    $('#nama-akhir').val($("#form-nama-produk").val());
    $('#qty-akhir').val($("#qty-produks").val());


    $("#bd-example-modal-xl").modal("show");
  });
});
