const usernameEl = document.querySelector('#user_name');
const emailEl = document.querySelector('#user_email');
const phoneEl = document.querySelector('#user_phone');
const dobEl = document.querySelector('#user_dob');
const addressEl = document.querySelector('#user_address');
const form = document.querySelector('#signup');
var flag_class = document.getElementsByClassName("iti__flag-container");
var input = document.querySelector("#user_phone");
window.intlTelInput(input, ({}));

Array.from(flag_class).forEach(function (element) {
	element.addEventListener('click', function (event) {
		var flag_class = document.getElementsByClassName('iti__selected-flag');
		Array.from(flag_class).forEach(function (flag_s) {
			var c_code = "+" + flag_s.getAttribute('title').replace(/[^0-9]/g, '');
			document.getElementById("user_phone").setAttribute("data-code", c_code);
			document.getElementById("user_phone").value = c_code;
		});
	});
});
const checkUsername = () => {
	let valid = false;
	const min = 3,
		max = 25;
	const username = usernameEl.value.trim();
	if (!isRequired(username)) {
		showError(usernameEl, `Username must be between ${min} and ${max} characters.`);
	} else {
		showSuccess(usernameEl);
		valid = true;
	}
	return valid;
};
const checkEmail = () => {
	let valid = false;
	const email = emailEl.value.trim();
	if (!isRequired(email)) {
		showError(emailEl, 'Email cannot be blank.');
	} else if (!isEmailValid(email)) {
		showError(emailEl, 'Email is not valid.')
	} else {
		showSuccess(emailEl);
		valid = true;
	}
	return valid;
};

const checkPhone = () => {
	let valid = false;
	const phone_v = phoneEl.value.trim();
	const code_v = phoneEl.getAttribute('data-code').trim();
	if (!isRequired(phone_v)) {
		showError(phoneEl, 'Phone number cannot be blank.');
	} else if (phone_v === code_v) {
		showError(phoneEl, 'Enter a valid phone number');
	} else {
		showSuccess(phoneEl);
		valid = true;
	}
	return valid;
};

const checkDob = () => {
	let valid = false;
	const dob_v = dobEl.value.trim();
	if (!isRequired(dob_v)) {
		showError(dobEl, 'Enter a valid date of birth');
	} else {
		showSuccess(dobEl);
		valid = true;
	}
	return valid;
};

const checkAddress = () => {
	let valid = false;
	const add_v = addressEl.value.trim();
	if (!isRequired(add_v)) {
		showError(addressEl, 'Address cannot be blank.');
	} else {
		showSuccess(addressEl);
		valid = true;
	}
	return valid;
};

const isEmailValid = (email) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const showError = (input, message) => {
	const formField = input.closest('.form-field');
	formField.classList.remove('success');
	formField.classList.add('error');
	const error = formField.querySelector('small');
	error.textContent = message;
};

const showSuccess = (input) => {
	const formField = input.closest('.form-field');
	formField.classList.remove('error');
	formField.classList.add('success');
	const error = formField.querySelector('small');
	error.textContent = '';
}

form.addEventListener('submit', function (e) {
	let isUsernameValid = checkUsername(),
		isEmailValid = checkEmail(),
		isPhoneValid = checkPhone(),
		isDobValid = checkDob(),
		isAddressValid = checkAddress()
	let isFormValid = isUsernameValid &&
		isEmailValid &&
		isPhoneValid && isDobValid && isAddressValid
	if (!isFormValid) {
		e.preventDefault();
	} else {
		var outputHtml = '';
		outputHtml += '<div>Name: ' + usernameEl.value + '</div>'
		outputHtml += '<div>Email: ' + emailEl.value + '</div>';
		outputHtml += '<div>DOB: ' + dobEl.value + '</div>';
		outputHtml += '<div>Address: ' + addressEl.value + '</div>';
		outputHtml += '<div>Phone: ' + phoneEl.value + '</div>';
		localStorage.setItem("registerFormData", outputHtml);
	}
});
document.getElementById('output_data').innerHTML = localStorage.getItem("registerFormData");

//countDown timer
var timeleft = 300;
var downloadTimer = setInterval(function () {
	if (timeleft <= 0) {
		clearInterval(downloadTimer);
		document.getElementById("countdown").innerHTML = "Your session expired reload page and fill again";
		document.getElementById("submit_btn").disabled = true;
		document.getElementById("reset").disabled = true;
		document.getElementById("countdown").style.color = 'red'
		alert("Time over reload page and fill again within 5 minutes")
	} else {
		var minutes = Math.floor(timeleft / 60);
		var seconds = timeleft - minutes * 60;
		document.getElementById("countdown").innerHTML = minutes + ' min ' + seconds + " sec remaining to fill form";
	}
	timeleft -= 1;
}, 1000);