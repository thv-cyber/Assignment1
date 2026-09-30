const form = document.getElementById("complaintForm");


function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "Error");

    if (message) {
        field.classList.add("invalid");
        error.textContent = message;

        return false;
    }

    field.classList.remove("invalid");
    error.textContent = "";

    return true;
}


function validateFullName() {
    const fullName = document.getElementById("fullName").value.trim();

    if (fullName === "") {
        return showError("fullName", "Full name is required.");
    }

    return showError("fullName", "");
}


function validateEmail() {
    const email = document.getElementById("email").value.trim();

    if (email === "" || !email.includes("@")) {
        return showError("email", "Enter a valid email address.");
    }

    return showError("email", "");
}


function validatePhone() {
    const phone = document.getElementById("phone").value.trim();

    if (phone === "") {
        return showError("phone", "Phone number is required.");
    }

    return showError("phone", "");
}


function validateVehicleMake() {
    const vehicleMake = document.getElementById("vehicleMake").value.trim();

    if (vehicleMake === "") {
        return showError("vehicleMake", "Vehicle make is required.");
    }

    return showError("vehicleMake", "");
}


function validateVehicleModel() {
    const vehicleModel = document.getElementById("vehicleModel").value.trim();

    if (vehicleModel === "") {
        return showError("vehicleModel", "Vehicle model is required.");
    }

    return showError("vehicleModel", "");
}


function validateVin() {
    const vin = document.getElementById("vin").value.trim();

    if (vin.length !== 17) {
        return showError("vin", "VIN must be 17 characters.");
    }

    return showError("vin", "");
}


function validateSubject() {
    const subject = document.getElementById("subject").value.trim();

    if (subject === "") {
        return showError("subject", "Subject is required.");
    }

    return showError("subject", "");
}


function validateDescription() {
    const description = document.getElementById("description").value.trim();

    if (description === "") {
        return showError("description", "Description is required.");
    }

    return showError("description", "");
}


form.addEventListener("submit", function(event) {
    let valid = true;

    if (!validateFullName()) {
        valid = false;
    }

    if (!validateEmail()) {
        valid = false;
    }

    if (!validatePhone()) {
        valid = false;
    }

    if (!validateVehicleMake()) {
        valid = false;
    }

    if (!validateVehicleModel()) {
        valid = false;
    }

    if (!validateVin()) {
        valid = false;
    }

    if (!validateSubject()) {
        valid = false;
    }

    if (!validateDescription()) {
        valid = false;
    }

    if (!valid) {
        event.preventDefault();
    }
});