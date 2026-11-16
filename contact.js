let form = document.getElementById("contactForm");
let message = document.getElementById("message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let nom = document.getElementById("nom").value.trim();
  let msg = document.getElementById("msg").value.trim();

  message.innerHTML = "";
  let box = document.createElement("div");

  if (nom === "" || msg === "") {
    box.className = "alert alert-danger";
    box.textContent = "Name and message are required.";
  } else {
    box.className = "alert alert-success";
    box.textContent = "Thank you " + nom + ", your message has been sent.";
    form.reset();
  }
  message.appendChild(box);
});
