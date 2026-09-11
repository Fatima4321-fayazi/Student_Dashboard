const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const togglePassword = document.getElementById("togglePassword");
const forgotPassword = document.getElementById("forgotPassword");
const signUpButton = document.getElementById("signUpButton");
const rememberMe = document.getElementById("rememberMe");

togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePassword.textContent = isHidden ? "Hide" : "Show";
});

emailInput.addEventListener("input", () => clearError(emailInput, emailError));
passwordInput.addEventListener("input", () => clearError(passwordInput, passwordError));

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailOrPhone = emailInput.value.trim();
  const password = passwordInput.value.trim();
  let isValid = true;

  clearError(emailInput, emailError);
  clearError(passwordInput, passwordError);

  if (!emailOrPhone) {
    showError(emailInput, emailError, "Please enter your email or phone number.");
    isValid = false;
  }

  if (!password) {
    showError(passwordInput, passwordError, "Please enter your password.");
    isValid = false;
  }

  if (!isValid) return;

  // Demo-only: store the identifier needed by the dashboard.
  // Never store a real password in localStorage.
  const user = {
    emailOrPhone,
    loginDate: new Date().toISOString(),
    rememberMe: rememberMe.checked
  };

  localStorage.setItem("myPatientHubUser", JSON.stringify(user));
  localStorage.setItem("isLoggedIn", "true");

  window.location.href = "student-dashboard/index.html";
});

forgotPassword.addEventListener("click", () => {
  alert("Password recovery will be connected to your backend later.");
});

signUpButton.addEventListener("click", () => {
  alert("The registration page will be connected here.");
});

function showError(input, errorElement, message) {
  input.classList.add("input-error");
  errorElement.textContent = message;
}

function clearError(input, errorElement) {
  input.classList.remove("input-error");
  errorElement.textContent = "";
}
