var save_method;
var table;

$(document).ready(function () {
	$(".loading").hide();

	table = $("#tableUnit").DataTable({
		processing: true, //Feature control the processing indicator.
		serverSide: true, //Feature control DataTables' server-side processing mode.
		searching: true,
		paging: true,
		lengthChange: true,
		pageLength: 10,

		// Load data for the table's content from an Ajax source
		ajax: {
			url: baseUrl + "/Unit/loadUnitListDatatables",
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

	$("#btnSave").click(function(e){

		if(checkEmptyInputWithMessageArray(["#inputNamaUnit"]))
		{
			$.ajax({
				url: baseUrl + '/Unit/Add',
				type: "POST",
				data: $("#unitForm").serialize(),
				dataType: "JSON",
				success: function (response) {
					$("#unitForm")[0].reset();
					if(response.status == 'success')
					{
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
						text: "Gagal melakukan proses simpan Unit",
					});
				}
			});
		}
	});

	$("#btnUpdate").click(function(e){

		if(checkEmptyInputWithMessageArray(["#inputIdUnit", "#inputNamaUnit"]))
		{
			$.ajax({
				url: baseUrl + '/Unit/Update',
				type: "POST",
				data: $("#unitForm").serialize(),
				dataType: "JSON",
				success: function (response) {
					$("#unitForm")[0].reset();
					$("#btnUpdate").attr("hidden", "hidden");
					$("#btnSave").removeAttr("hidden");

					if(response.status == 'success')
					{
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
						text: "Gagal melakukan proses Update Unit",
					});
				}
			});
		}
	});

	$("#btnCancel").click(function (e) {
		$("#jabatanForm")[0].reset();

		$("#btnSave").removeAttr("hidden");
		$("#btnUpdate").attr("hidden","hidden");

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


function reload_table() {
	table.ajax.reload(null, false); //reload datatable ajax
}

function editUnit(id)
{
	$("#unitForm")[0].reset();
	$.ajax({
		url: baseUrl + "/Unit/edit",
		type: "POST",
		dataType: "JSON",
		data: {
			id_jabatan		: id
		},
		success: function (response) {
			if(response.status == 'success')
			{
				var data 	= response.data;
				$("#inputNamaUnit").val(data.nama_unit);
				$("#inputIdUnit").val(data.id);

				$("#inputNamaUnit").focus();

				$("#btnSave").attr("hidden", "hidden");
				$("#btnUpdate").removeAttr("hidden");
			} else {
				Swal.fire({
					icon: "error",
					title: "Gagal!",
					text: "Gagal mendapatkan Data Unit!",
				});
			}
		},
		error: function(response)
		{
			Swal.fire({
				icon: "error",
				title: "Gagal!",
				text: "Gagal memproses Data Unit!",
			});
		}
	});
}

function deleteUnit(id)
{
	Swal.fire({
		title: "Konfirmasi",
		text: "Apakah anda ingin menghapus data Unit ini ?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes",
	}).then((result) => {
		if (result.isConfirmed) {
			$(".loading").show();
			$.ajax({
				url: baseUrl + "/Unit/delete",
				type: "POST",
				data: {
					id_unit: id,
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
						var message = "Gagal menghapus Data Unit";

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
						text: "Gagal memproses Hapus Data Unit!",
					});
				},
			});
		}
	});
}
