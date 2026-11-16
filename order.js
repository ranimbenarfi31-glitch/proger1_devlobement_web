// Sélection des éléments
let form = document.getElementById("orderForm");
let foodSelect = document.getElementById("foodSelect");
let quantity = document.getElementById("quantity");
let drink = document.getElementById("drink");
let totalPrice = document.getElementById("totalPrice");
let deliveryBox = document.getElementById("deliveryBox");
let address = document.getElementById("address");
let city = document.getElementById("city");
let message = document.getElementById("message");
let orderList = document.getElementById("orderList");

const prices = {
  Pizza: 12,
  Tacos: 10,
  Cake: 8,
  Hamburger: 9,
  "Fried Chicken": 11,
  "Hot Dog": 7,
};
const DRINK_PRICE = 2;

// Calculer le total
function calculateTotal() {
  let qty = Number(quantity.value);
  let price = prices[foodSelect.value];
  if (!price || !Number.isInteger(qty) || qty < 1) {
    return 0;
  }
  let unit = price + (drink.checked ? DRINK_PRICE : 0);
  return unit * qty;
}

function updateTotal() {
  totalPrice.textContent = "Total: $" + calculateTotal().toFixed(2);
}

// Livraison ou retrait : afficher / masquer l'adresse
function updateMode() {
  let mode = document.querySelector('input[name="mode"]:checked').value;
  let isDelivery = mode === "delivery";
  deliveryBox.classList.toggle("hidden", !isDelivery);
  address.required = isDelivery;
  city.required = isDelivery;
}

// Afficher un message Bootstrap (alert)
function showMessage(text, type) {
  message.innerHTML = "";
  let box = document.createElement("div");
  box.className = "alert alert-" + type;
  box.textContent = text;
  message.appendChild(box);
}

// Ajouter une commande dans la liste (createElement, appendChild, remove)
function addOrder(text) {
  let li = document.createElement("li");
  let span = document.createElement("span");
  span.textContent = text;
  let btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn btn-sm btn-danger";
  btn.textContent = "Delete";
  btn.addEventListener("click", function () {
    li.remove();
    saveOrders();
  });
  li.appendChild(span);
  li.appendChild(btn);
  orderList.appendChild(li);
}

// Sauvegarde dans localStorage (visible dans DevTools > Application)
function saveOrders() {
  let items = [];
  orderList.querySelectorAll("span").forEach(function (s) {
    items.push(s.textContent);
  });
  localStorage.setItem("orders", JSON.stringify(items));
}

function loadOrders() {
  let saved = localStorage.getItem("orders");
  if (saved !== null) {
    JSON.parse(saved).forEach(addOrder);
  }
}

// Pré-sélection depuis menu.html?food=...
let params = new URLSearchParams(window.location.search);
let selectedFood = params.get("food");
if (selectedFood && prices[selectedFood]) {
  foodSelect.value = selectedFood;
}

// Événements
foodSelect.addEventListener("change", updateTotal);
quantity.addEventListener("input", updateTotal);
drink.addEventListener("change", updateTotal);
document.querySelectorAll('input[name="mode"]').forEach(function (radio) {
  radio.addEventListener("change", updateMode);
});
form.addEventListener("reset", function () {
  setTimeout(function () {
    updateTotal();
    updateMode();
    message.innerHTML = "";
  }, 0);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Validation HTML puis JavaScript
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let qty = Number(quantity.value);

  if (firstName === "" || lastName === "") {
    showMessage("First name and last name are required.", "danger");
    return;
  }
  if (!Number.isInteger(qty) || qty < 1 || qty > 20) {
    showMessage("Quantity must be an integer between 1 and 20.", "danger");
    return;
  }

  let total = calculateTotal();
  let answer = confirm(
    "Are you sure you want to confirm your order?\nTotal: $" + total.toFixed(2)
  );

  if (answer) {
    showMessage("Thank you " + firstName + "! Your order has been confirmed.", "success");
    addOrder(qty + " x " + foodSelect.value + " - $" + total.toFixed(2));
    saveOrders();
    form.reset();
  } else {
    showMessage("Your order has been cancelled.", "warning");
  }
});

// Initialisation
loadOrders();
updateMode();
updateTotal();
