var getUrl = window.location;
var baseUrl =
	getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[1];
var save_method;
var table;

$(document).ready(function () {
	$(".loading").hide();

	loadPegawaiOptionList();

	table = $("#tableCapaianKinerja").DataTable({
		processing: true, //Feature control the processing indicator.
		serverSide: true, //Feature control DataTables' server-side processing mode.
		searching: true,
		paging: true,
		lengthChange: true,
		pageLength: 10,

		// Load data for the table's content from an Ajax source
		ajax: {
			url: baseUrl + "/CapaianKinerja/loadCapaianKinerjaListDatatables",
			type: "POST",
			data: function (data) {
				data.periode = $("#inputPeriode").val();
			},
		},

		//Set column definition initialisation properties.
		columnDefs: [
			{
				targets: [0],
				orderable: false, // set not orderable
			},
		],
	});

	$("#inputPeriode").on("change", function (e) {
		reload_table();
	});

	$("#btnSave").click(function (e) {
		checkEmptyInput("#inputPegawai");
		checkEmptyInput("#inputPresentaseProduktivitas");


		if (
			checkEmptyInput("#inputPegawai") &&
			checkEmptyInput("#inputPresentaseProduktivitas")
		) {
			$.ajax({
				url: baseUrl + "/CapaianKinerja/Add",
				type: "POST",
				data: {
					id_pegawai: $("#inputPegawai").val(),
					presentase_produktivitas: $("#inputPresentaseProduktivitas").val(),
					periode: $("#inputPeriode").val(),
				},
				dataType: "JSON",
				success: function (response) {
					$("#capianKinerjaForm")[0].reset();
					if (response.status == "success") {
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
						text: "Gagal melakukan proses simpan Capaian Kinerja",
					});
				}
			});
		}
	});

	$("#btnUpdate").click(function (e) {
		checkEmptyInput("#inputPegawai");
		checkEmptyInput("#inputPresentaseProduktivitas");

		if (
			checkEmptyInput("#inputPegawai") &&
			checkEmptyInput("#inputPresentaseProduktivitas")
		) {
			$.ajax({
				url: baseUrl + "/CapaianKinerja/Update",
				type: "POST",
				data: {
					periode	: $("#inputPeriode").val(),
					presentase_produktivitas : $("#inputPresentaseProduktivitas").val(),
					id_pegawai	: $("#inputPegawai").val()
				},
				dataType: "JSON",
				success: function (response) {
					$("#capianKinerjaForm")[0].reset();
					$("#btnUpdate").attr("hidden", "hidden");
					$("#btnSave").removeAttr("hidden");

					$("#inputPegawai").removeAttr("disabled");
					$("#inputPeriode").removeAttr("disabled");

					if (response.status == "success") {
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
						text: "Gagal melakukan proses Update Capaian Kinerja",
					});
				},
			});
		}
	});

	$("#btnCancel").click(function (e) {
		$("#jabatanForm")[0].reset();

		$("#btnSave").removeAttr("hidden");
		$("#btnUpdate").attr("hidden", "hidden");

		reload_table();
	});

	$(".custom-file-input").change(function () {
		var $el = $(this);
		var files = $el[0].files;
		if (files[0] == null) {
			label = "Choose Softcopy File";
		} else {
			label = files[0].name;
		}

		if (files.length > 1) {
			label = label + " and " + String(files.length - 1) + " more files";
		}
		$el.next(".custom-file-label").html(label);
	});
});

function loadPegawaiOptionList() {
	$.ajax({
		url: baseUrl + "/Pegawai/loadPegawaiListOption",
		type: "POST",
		success: function (response) {
			$("#inputPegawai").empty();

			$("#inputPegawai").append(response);
		},
	});
}

function reload_table() {
	table.ajax.reload(null, false); //reload datatable ajax
}

function editNilai(id) {
	$("#capianKinerjaForm")[0].reset();


	$.ajax({
		url: baseUrl + "/CapaianKinerja/edit",
		type: "POST",
		dataType: "JSON",
		data: {
			id_capaian_kinerja: id,
		},
		success: function (response) {
			if (response.status == "success") {
				var data = response.data;
				$("#inputPeriode").val(data.periode);
				$("#inputPegawai").val(data.id_pegawai);
				$("#inputPresentaseProduktivitas").val(data.nilai_produktivitas_kerja);

				$("#inputPegawai").attr("disabled", "disabled");
				$("#inputPeriode").attr("disabled", "disabled");

				$("#inputPresentaseProduktivitas").focus();

				$("#btnSave").attr("hidden", "hidden");
				$("#btnUpdate").removeAttr("hidden");
			} else {
				Swal.fire({
					icon: "error",
					title: "Gagal!",
					text: "Gagal mendapatkan Data Jabatan!",
				});
			}
		},
		error: function (response) {
			Swal.fire({
				icon: "error",
				title: "Gagal!",
				text: "Gagal memproses Data Pegawai!",
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
				url: baseUrl + "/CapaianKinerja/delete",
				type: "POST",
				data: {
					id_capaian_kinerja: id,
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
						var message = "Gagal menghapus Data Capaian Kinerja";

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
						text: "Gagal memproses Hapus Data Capaian Kinerja!",
					});
				},
			});
		}
	});
}
