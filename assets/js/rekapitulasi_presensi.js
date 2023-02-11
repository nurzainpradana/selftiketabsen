var getUrl = window.location;
var baseUrl =
	getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[1];
var save_method;
var table;

$(document).ready(function () {
	$(".loading").hide();

	loadPegawaiOptionList();

	table = $("#tableRekapitulasiPresensi").DataTable({
		processing: true, //Feature control the processing indicator.
		serverSide: true, //Feature control DataTables' server-side processing mode.
		searching: true,
		paging: true,
		lengthChange: true,
		pageLength: 10,

		// Load data for the table's content from an Ajax source
		ajax: {
			url:
				baseUrl +
				"/RekapitulasiPresensi/loadRekapitulasiPresensiListDatatables",
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
		if (
			checkEmptyInputWithMessageArray([
				"#inputPenguranganTPP",
				"#inputPenambahanTPP",
				"#inputTidakHadirApel",
				"#inputTidakHadirRapat",
				"#inputDlPc",
				"#inputTidakHadir",
				"#inputJumlahHariKerja",
				"#inputPegawai",
			])
		) {
			$.ajax({
				url: baseUrl + "/RekapitulasiPresensi/Add",
				type: "POST",
				data: $("#rekapitulasiPresensiForm").serialize(),
				dataType: "JSON",
				success: function (response) {
					if (response.status == "success") {
						$("#rekapitulasiPresensiForm")[0].reset();
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
						text: "Gagal melakukan proses simpan Rekapitulasi Presensi",
					});
				},
			});
		}
	});

	$("#btnUpdate").click(function (e) {
		if (
			checkEmptyInputWithMessageArray([
				"#inputPenguranganTPP",
				"#inputPenambahanTPP",
				"#inputTidakHadirApel",
				"#inputTidakHadirRapat",
				"#inputDlPc",
				"#inputTidakHadir",
				"#inputJumlahHariKerja",
				"#inputPegawai",
			])
		) {
			$.ajax({
				url: baseUrl + "/RekapitulasiPresensi/Update",
				type: "POST",
				data: $("#rekapitulasiPresensiForm").serialize(),
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
						text: "Gagal melakukan proses Update Rekapitulasi Presensi",
					});
				},
			});
		}
	});

	$("#btnCancel").click(function (e) {
		$("#rekapitulasiPresensiForm")[0].reset();

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
	$("#rekapitulasiPresensiForm")[0].reset();

	$.ajax({
		url: baseUrl + "/RekapitulasiPresensi/edit",
		type: "POST",
		dataType: "JSON",
		data: {
			id_rekapitulasi_presensi: id,
		},
		success: function (response) {
			if (response.status == "success") {
				var data = response.data;
				$("#inputPeriode").val(data.periode);
				$("#inputPegawai").val(data.id_pegawai);
				$("#inputJumlahHariKerja").val(data.jumlah_hari_kerja);
				$("#inputTidakHadir").val(data.jumlah_tidak_hadir);
				$("#inputDlPc").val(data.jumlah_dl_pc);
				$("#inputTidakHadirRapat").val(data.jumlah_tidak_hadir_rapat);
				$("#inputTidakHadirApel").val(data.jumlah_tidak_hadir_apel);
				$("#inputPenguranganTPP").val(data.total_pengurangan_tpp);
				$("#inputPenambahanTPP").val(data.total_penambahan_tpp);

				$("#inputPegawai").attr("readonly", "readonly");
				$("#inputPeriode").attr("readonly", "readonly");

				$("#inputPresentaseDisiplinKerja").focus();

				$("#btnSave").attr("hidden", "hidden");
				$("#btnUpdate").removeAttr("hidden");
			} else {
				Swal.fire({
					icon: "error",
					title: "Gagal!",
					text: "Gagal mendapatkan Data Rekapitulasi Presensi!",
				});
			}
		},
		error: function (response) {
			Swal.fire({
				icon: "error",
				title: "Gagal!",
				text: "Gagal memproses Data Rekapitulasi Presensi!",
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
				url: baseUrl + "/RekapitulasiPresensi/delete",
				type: "POST",
				data: {
					id_rekapitulasi_presensi: id,
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
						var message = "Gagal menghapus Rekapitulasi Presensi";

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
						text: "Gagal memproses Hapus Rekapitulasi Presensi!",
					});
				},
			});
		}
	});
}
