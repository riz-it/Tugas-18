function closeModal(modal) {
  $("#" + modal).modal("hide");
}

function hapus(button) {
  var row = button.parentNode.parentNode;
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
}

var nomorUrut = 1;

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
  dataTableBahan = $("#tabel-bahan").DataTable({
    columnDefs: [
      {
        targets: 0,
        width: "10%",
      },
    ],
  });

  $('#to-cart').on('click', function() {
    if($("#form-kode-bahan").val() == "" || $("#form-nama-bahan").val() == "" || $("#form-stock-bahan").val() == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pilih bahan terlebih dahulu!",
      });
      return;
    }
    
    if (validateCart($("#form-kode-bahan").val()))  {
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
    cell4.innerHTML = '<input class="form-control" onkeyup="validateStock(this)" type="number" data-stock="'+$("#form-stock-bahan").val()+'" value="1" id="qty-'+nomorUrut+'">';
    cell5.innerHTML = "<button class='btn btn-danger btn-sm' onclick='hapus(this)'>Hapus</button>";
    
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

  $('#cetak-transaksi').on('click', function() {
    if($("#form-kode-produk").val() == "" || $("#form-nama-produk").val() == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pilih produk terlebih dahulu!",
      });
      return;
    }

    if($("#tabel-list-bahan tr").length == 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tambahkan bahan terlebih dahulu!",
      });
      return;
    }

    var table = document.getElementById("tabel-list-bahan");
    var listBahan = [];
    for (var i = 1; i < table.rows.length; i++) {
      var bahan = {
        kode: table.rows[i].cells[1].innerHTML,
        nama: table.rows[i].cells[2].innerHTML,
        qty: table.rows[i].cells[3].children[0].value
      }
      listBahan.push(bahan);
    }

    var data = {
      kode: $("#form-kode-produk").val(),
      nama: $("#form-nama-produk").val(),
      bahan: listBahan
    }

    $('#bd-example-modal-xl').modal('show');

   
  });
});
