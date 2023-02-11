var getUrl = window.location;
var baseUrl =
	getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[1];
var save_method;
var table;

$(document).ready(function () {
	$(".loading").hide();

	loadJabatanOptionList();

	table = $("#tableBesaranTpp").DataTable({
		processing: true, //Feature control the processing indicator.
		serverSide: true, //Feature control DataTables' server-side processing mode.
		searching: true,
		paging: true,
		lengthChange: true,
		pageLength: 10,

		// Load data for the table's content from an Ajax source
		ajax: {
			url: baseUrl + "/BesaranTpp/loadBesaranTppListDatatables",
			type: "POST",
			data: function (data) {},
		},

		//Set column definition initialisation properties.
		columnDefs: [
			{
				targets: [0],
				orderable: false, // set not orderable
			},
		],
	});

	$("#btnSave").click(function (e) {
		if (
			checkEmptyInputWithMessageArray([
				"#inputKelangkaanProfesi",
				"#inputKondisiKerja",
				"#inputPrestasiKerja",
				"#inputBebanKerja",
				"#inputJabatan",
			])
		) {
			$.ajax({
				url: baseUrl + "/BesaranTpp/Add",
				type: "POST",
				data: $("#besaranTppForm").serialize(),
				dataType: "JSON",
				success: function (response) {
					if (response.status == "success") {
						$("#besaranTppForm")[0].reset();
						Swal.fire({
							icon: "success",
							title: "Berhasil!",
							text: response.message,
						});
					} else {
						Swal.fire({
							icon: "error",
							title: "Gagal!",
							text: response.message,
						});
					}
					reload_table();
				},
				error: function (response) {
					Swal.fire({
						icon: "error",
						title: "Gagal!",
						text: "Gagal melakukan proses simpan Besaran TPP",
					});
				},
			});
		}
	});

	$("#btnUpdate").click(function (e) {
		if (
			checkEmptyInputWithMessageArray([
				"#inputKelangkaanProfesi",
				"#inputKondisiKerja",
				"#inputPrestasiKerja",
				"#inputBebanKerja",
				"#inputJabatan",
			])
		) {
			$.ajax({
				url: baseUrl + "/BesaranTpp/Update",
				type: "POST",
				data: $("#besaranTppForm").serialize(),
				dataType: "JSON",
				success: function (response) {
					if (response.status == "success") {
						// $("#rekapitulasiPresensiForm")[0].reset();
						Swal.fire({
							icon: "success",
							title: "Berhasil!",
							text: response.message,
						});
						$("#btnUpdate").attr("hidden", "hidden");
						$("#btnSave").removeAttr("hidden");
					} else {
						Swal.fire({
							icon: "error",
							title: "Gagal!",
							text: response.message,
						});
					}
					reload_table();
				},
				error: function (response) {
					Swal.fire({
						icon: "error",
						title: "Gagal!",
						text: "Gagal melakukan proses Update Besaran TPP",
					});
				},
			});
		}
	});

	$("#btnCancel").click(function (e) {
		$("#besaranTppForm")[0].reset();

		$("#btnSave").removeAttr("hidden");
		$("#btnUpdate").attr("hidden", "hidden");

		reload_table();
	});
});

function loadJabatanOptionList() {
	$.ajax({
		url: baseUrl + "/Pegawai/loadJabatanListOption",
		type: "POST",
		success: function (response) {
			$("#inputJabatan").empty();

			$("#inputJabatan").append(response);
		},
	});
}

function reload_table() {
	table.ajax.reload(null, false); //reload datatable ajax
}

function editNilai(id) {
	$("#besaranTppForm")[0].reset();

	$.ajax({
		url: baseUrl + "/BesaranTpp/edit",
		type: "POST",
		dataType: "JSON",
		data: {
			id_besaran_tpp: id,
		},
		success: function (response) {
			if (response.status == "success") {
				var data = response.data;

				$("#inputJabatan").val(data.id_jabatan);
				$("#inputJabatan").attr("readonly", "readonly");

				$("#inputBebanKerja").val(data.beban_kerja);
				$("#inputPrestasiKerja").val(data.prestasi_kerja);
				$("#inputKondisiKerja").val(data.kondisi_kerja);
				$("#inputKelangkaanProfesi").val(data.kelangkaan_profesi);

				$("#inputBebanKerja").focus();

				$("#btnSave").attr("hidden", "hidden");
				$("#btnUpdate").removeAttr("hidden");
			} else {
				Swal.fire({
					icon: "error",
					title: "Gagal!",
					text: "Gagal mendapatkan Data Besaran TPP!",
				});
			}
		},
		error: function (response) {
			Swal.fire({
				icon: "error",
				title: "Gagal!",
				text: "Gagal memproses Data Besaran TPP!",
			});
		},
	});
}

function deleteNilai(id) {
	Swal.fire({
		title: "Konfirmasi",
		text: "Apakah anda ingin menghapus data Nilai ini ?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes",
	}).then((result) => {
		if (result.isConfirmed) {
			$(".loading").show();
			$.ajax({
				url: baseUrl + "/BesaranTpp/delete",
				type: "POST",
				data: {
					id_besaran_tpp: id,
				},
				dataType: "JSON",
				success: function (response) {
					$(".loading").hide();

					reload_table();

					if (response.status == "success") {
						reload_table();
						Swal.fire({
							icon: "success",
							title: "Berhasil!",
							text: response.message,
						});
					} else if (response.status == "failed") {
						var message = "Gagal menghapus Besaran TPP";

						if (response.message !== "") {
							message = response.message;
						}

						Swal.fire({
							icon: "error",
							title: "Gagal!",
							text: message,
						});
					}
				},
				error: function (response) {
					$(".loading").hide();
					reload_table();
					Swal.fire({
						icon: "error",
						title: "Gagal!",
						text: "Gagal memproses Hapus Besaran TPP!",
					});
				},
			});
		}
	});
}
