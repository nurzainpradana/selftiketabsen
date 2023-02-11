
var save_method;
var table;

$(document).ready(function () {
	$(".loading").hide();

	loadPegawaiOptionList();

	table = $("#tableUser").DataTable({
		processing: true, //Feature control the processing indicator.
		serverSide: true, //Feature control DataTables' server-side processing mode.
		searching: true,
		paging: true,
		lengthChange: true,
		pageLength: 10,

		// Load data for the table's content from an Ajax source
		ajax: {
			url: baseUrl + "/User/loadUserListDatatables",
			type: "POST",
			data: function (data) {
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
				"#inputPassword",
				"#inputUsername",
				"#inputLevel",
				"#inputPegawai",
			])
		) {
			$.ajax({
				url: baseUrl + "/User/Add",
				type: "POST",
				data: $("#userForm").serialize(),
				dataType: "JSON",
				success: function (response) {
					$("#userForm")[0].reset();
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
						text: "Gagal melakukan proses Simpan User",
					});
				},
			});
		}
	});

	$("#btnUpdate").click(function (e) {

		if (
			checkEmptyInputWithMessageArray([
				"#inputUsername",
				"#inputLevel",
				"#inputPegawai",
			])
		) {
			$(".loading").show();
			$.ajax({
				url: baseUrl + "/User/Update",
				type: "POST",
				data: $("#userForm").serialize(),
				dataType: "JSON",
				success: function (response) {
					$(".loading").hide();
					$("#userForm")[0].reset();
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
					reset_form();
					reload_table();
				},
				error: function (response) {
					$(".loading").hide();
					Swal.fire({
						icon: "error",
						title: "Gagal!",
						text: "Gagal melakukan proses Simpan User Access",
					});
				},
			});
		}
	});

	$("#btnCancel").click(function (e) {
		reset_form();
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

function reset_form()
{
	$("#userForm")[0].reset();
	
	$("#btnUpdate").attr("hidden", "hidden");
	$("#btnSave").removeAttr("hidden");
}

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

function edit(id) {
	$("#userForm")[0].reset();

	$.ajax({
		url: baseUrl + "/User/edit",
		type: "POST",
		dataType: "JSON",
		data: {
			id_user: id,
		},
		success: function (response) {
			if (response.status == "success") {
				var data = response.data;
				$("#inputPegawai").val(data.id_pegawai);
				$("#inputUsername").val(data.username);
				$("#inputLevel").val(data.level);
				$("#inputIdUser").val(id);

				$("#inputPegawai").focus();

				$("#btnSave").attr("hidden", "hidden");
				$("#btnUpdate").removeAttr("hidden");
			} else {
				Swal.fire({
					icon: "error",
					title: "Gagal!",
					text: "Gagal mendapatkan Data User!",
				});
			}
		},
		error: function (response) {
			Swal.fire({
				icon: "error",
				title: "Gagal!",
				text: "Gagal memproses Data User!",
			});
		},
	});
}

function deleteUser(id) {
	Swal.fire({
		title: "Konfirmasi",
		text: "Apakah anda ingin menghapus data User ini ?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes",
	}).then((result) => {
		if (result.isConfirmed) {
			$(".loading").show();
			$.ajax({
				url: baseUrl + "/User/delete",
				type: "POST",
				data: {
					id_user: id,
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
						var message = "Gagal menghapus Data User";

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
						text: "Gagal memproses Hapus Data User!",
					});
				},
			});
		}
	});
}
