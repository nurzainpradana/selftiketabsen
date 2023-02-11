function checkEmptyInput(element_id) {
	if ($(element_id).val() == "" || $(element_id).val() == null) {
		$(element_id).focus();
		$(element_id).parent().find(".form-control-feedback").empty();
		$(element_id)
			.parent()
			.find(".form-control-feedback")
			.append("* Wajib diisi");
		return false;
	} else {
		$(element_id).parent().find(".form-control-feedback").empty();
		return true;
	}
}
function checkLengthInputWithMessage(element_id, length) {
	if ($(element_id).val() == "" || $(element_id).val() == null) {
		$(element_id).parent().find(".form-control-feedback").empty();
		$(element_id).parent().find(".form-control-feedback").append("* Required");
		$(element_id).focus();
		return false;
	} else {
		if ($(element_id).val().length <= length) {
			$(element_id).parent().find(".form-control-feedback").empty();
			return true;
		} else {
			$(element_id).focus();
			$(element_id).parent().find(".form-control-feedback").empty();
			$(element_id)
				.parent()
				.find(".form-control-feedback")
				.append("* Max " + length + " Character");
			return false;
		}
	}
}

function checkEmptyInputWithMessage(element_id) {
	if ($(element_id).val() == "" || $(element_id).val() == null) {
		$(element_id).focus();
		$(element_id).parent().find(".form-control-feedback").empty();
		$(element_id).parent().find(".form-control-feedback").append("* Required");
		return false;
	} else {
		$(element_id).parent().find(".form-control-feedback").empty();
		return true;
	}
}

function checkEmptyInputWithMessageArray(element_id_array) {
	element_id_array.forEach(function (item, index) {
		checkEmptyInputWithMessage(item);
	});

	var result = true;

	element_id_array.forEach(function (item, index) {
		if (!checkEmptyInput(item)) {
			result = false;
			return false;
		}
	});

	if (result) {
		return true;
	} else {
		return false;
	}
}

function checkEqualLengthInputWithMessage(element_id, length) {
	if ($(element_id).val() == "" || $(element_id).val() == null) {
		$(element_id).parent().find(".form-control-feedback").empty();
		$(element_id).parent().find(".form-control-feedback").append("* Required");
		$(element_id).focus();
		return false;
	} else {
		if ($(element_id).val().length == length) {
			$(element_id).parent().find(".form-control-feedback").empty();
			return true;
		} else {
			$(element_id).focus();
			$(element_id).parent().find(".form-control-feedback").empty();
			$(element_id)
				.parent()
				.find(".form-control-feedback")
				.append("*" + length + " Character");
			return false;
		}
	}
}

function swalShow(icon, title, message) {
	Swal.fire({
		icon: icon,
		title: title,
		text: message,
	});
}
