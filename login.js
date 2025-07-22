function sendOTP() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const phone = document.getElementById("phone").value;

  if (!name || !age || !phone) {
    document.getElementById("error-msg").textContent = "Please fill all fields.";
    return;
  }

  document.getElementById("otp-section").style.display = "block";
  document.getElementById("error-msg").textContent = "OTP sent (use 1234 as dummy).";
}

function verifyOTP() {
  const otp = document.getElementById("otp").value;
  if (otp === "1234") {
    window.location.href = "index.html";
  } else {
    document.getElementById("error-msg").textContent = "Incorrect OTP. Try 1234.";
  }
}
