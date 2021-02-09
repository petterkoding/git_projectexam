const form = document.querySelector("form");

const fName = document.querySelector("#name");
const nameError = document.querySelector("#nameError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");

const comments = document.querySelector("#comments")
const commentsError = document.querySelector("#commentsError")

const button = document.querySelector("#submit-btn");
const submitMessage = document.querySelector("#submitMessage");

function checkIfButtonIsDisabled() {
  if (
    checkLength(fName.value, 2) &&
    checkLength(subject.value, 7) &&
    checkLength(email.value, 4) &&
    validateEmail(email.value) &&
    checkLength(comments.value,5)
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
  submitMessage.innerHTML = `<div class="submitMessageSuccess">
                              <h4>Thanks ${fName.value}!</h4>
                              <p>Form was successfully submitted!</p>
                              <p>We'll get back to you within 48 hours.</p>
                            </div>`;
  form.reset();
}

form.addEventListener("submit", submitForm);


// validate each input to display error message or hide it

function validateInput() {

  let validStyle = "2px solid green";
  let invalidStyle = "2px solid red";

  // name
  if (checkLength(fName.value, 2)) {
    nameError.style.display = "none";
    fName.style.borderBottom = validStyle;
  } else {
    nameError.style.display = "block";
    fName.style.borderBottom = invalidStyle;
  }
  // subject
  if (checkLength(subject.value, 7)) {
    subjectError.style.display = "none";
    subject.style.borderBottom = validStyle;
  } else {
    subjectError.style.display = "block";
    subject.style.borderBottom = invalidStyle;
  }
  // email
  if (checkLength(email.value, 4)) {
    emailError.style.display = "none";
    email.style.borderBottom = validStyle;
  } else {
    emailError.style.display = "block";
    email.style.borderBottom = invalidStyle;
  }
  if (validateEmail(email.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
  if (checkLength(comments.value, 5)) {
    commentsError.style.display = "none";
  } else {
    commentsError.style.display = "block";
  }
}

form.addEventListener("keyup", validateInput);


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
