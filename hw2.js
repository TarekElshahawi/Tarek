window.onload = function () {
  const dobField = document.getElementById("dob");
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');

  dobField.max = `${yyyy}-${mm}-${dd}`;
  dobField.min = `${yyyy - 120}-${mm}-${dd}`;
}
