const form = document.querySelector("form");

const fName = document.querySelector("#name");
const nameError = document.querySelector("#nameError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");


const button = document.querySelector("#submit-btn");
const submitMessage = document.querySelector("#submitMessage");

function checkIfButtonIsDisabled() {
  if (
    checkLength(fName.value, 2) &&
    checkLength(subject.value, 7) &&
    checkLength(email.value, 4) &&
    validateEmail(email.value)
  ) {
    button.disabled = false;
  } else {
    submitMessage.innerHTML = "";
    button.disabled = true;
  }
}
form.addEventListener("keyup", checkIfButtonIsDisabled);

function submitForm(event) {
  event.preventDefault();
  console.log("You've submitted the form");
  submitMessage.innerHTML = `<div class="submitMessageSuccess">
                              <h4>Thanks ${fName.value}!</h4>
                              <p>Form was successfully submitted!</p>
                              <p>A notification has been sent to <b>${email.value}</b>.</p>
                            </div>`;
  form.reset();
}

form.addEventListener("submit", submitForm);

// reusable function
function checkLength(value, len) {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}

// validating email
function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

// validate each input to display error message or hide it

function validateInput() {
  // name
  if (checkLength(fName.value, 2)) {
    nameError.style.display = "none";
    fName.classList.add("valid")
  } else {
    nameError.style.display = "block";
    fName.classList.add("invalid")
  }
  // subject
  if (checkLength(subject.value, 7)) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }
  // email
  if (checkLength(email.value, 4)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
  if (validateEmail(email.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
}

form.addEventListener("keyup", validateInput);
