window.onload = function () {
  const dobField = document.getElementById("dob");
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dobField.max = `${yyyy}-${mm}-${dd}`;
  dobField.min = `${yyyy - 120}-${mm}-${dd}`;

  updateMedCount();
};

function updateMedCount() {
  const medSlider = document.getElementById("medications");
  const display = document.getElementById("medicationsDisplay");
  if (medSlider && display) {
    display.textContent = medSlider.value;
  }
}

function reviewData() {
  const form = document.forms["regForm"];
  const output = document.getElementById("reviewOutput");

  const errors = [];
  const first = form["firstName"].value.trim();
  const middle = form["middleInitial"].value.trim();
  const last = form["lastName"].value.trim();
  const dob = form["dob"].value;
  const ssn = form["ssn"].value;
  const email = form["email"].value;
  const address1 = form["address1"].value;
  const address2 = form["address2"].value;
  const city = form["city"].value;
  const state = form["state"].value;
  const zip = form["zip"].value.split("-")[0];
  const symptoms = form["symptoms"].value;
  const userid = form["userid"].value.trim().toLowerCase();
  form["userid"].value = userid;
  const password = form["password"].value;
  const repassword = form["repassword"].value;
  const medCount = form["medications"].value;

  const fullNameLower = (first + middle + last + userid).toLowerCase();

  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s\"])[^"]{8,30}$/;

  if (!passRegex.test(password)) {
    errors.push("Password must be 8-30 characters and include uppercase, lowercase, number, and special character (no quotes).");
  }

  if (password !== repassword) {
    errors.push("Passwords do not match.");
  }

  if (fullNameLower.includes(password.toLowerCase())) {
    errors.push("Password cannot contain your name or user ID.");
  }

  const selectedHistory = Array.from(form["history"])
    .filter(cb => cb.checked)
    .map(cb => cb.value)
    .join(", ") || "None selected";

  const vaccinated = getRadioVal(form, "vaccinated");
  const home = getRadioVal(form, "home");

  let html = `<h3>PLEASE REVIEW THIS INFORMATION</h3><ul>`;
  html += `<li><strong>Name:</strong> ${first} ${middle} ${last}</li>`;
  html += `<li><strong>Date of Birth:</strong> ${dob}</li>`;
  html += `<li><strong>Email:</strong> ${email}</li>`;
  html += `<li><strongID:</strong> ${ssn}</li>`;
  html += `<li><strong>Address:</strong> ${address1}<br>${address2}<br>${city}, ${state} ${zip}</li>`;
  html += `<li><strong>Vaccinated:</strong> ${vaccinated}</li>`;
  html += `<li><strong>Home Status:</strong> ${home}</li>`;
  html += `<li><strong>Medications Currently Being Taken:</strong> ${medCount}</li>`;
  html += `<li><strong>Health History:</strong> ${selectedHistory}</li>`;
  html += `<li><strong>Described Symptoms:</strong> ${symptoms || "N/A"}</li>`;
  html += `<li><strong>User ID:</strong> ${userid}</li>`;
  html += `<li><strong>Password:</strong> ${"*".repeat(password.length)}</li>`;
  html += `</ul>`;

  if (errors.length > 0) {
    html += `<div style="color:red;"><strong>ERRORS:</strong><ul>`;
    errors.forEach(err => html += `<li>${err}</li>`);
    html += `</ul></div>`;
  } else {
    html += `<div style="color:green;"><strong>All entries look good.</strong></div>`;
  }

  output.innerHTML = html;
}

function getRadioVal(form, name) {
  const selected = form.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : "Not selected";
}
