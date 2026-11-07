let foodSelect = document.getElementById("foodSelect");
let quantity = document.getElementById("quantity");
let totalPrice = document.getElementById("totalPrice");

let prices = {
  Pizza: 12,
  Tacos: 10,
  Cake: 8,
  Hamburger: 9,
  "Fried Chicken": 11,
  "Hot Dog": 7,
};
let params = new URLSearchParams(window.location.search);

let selectedFood = params.get("food");

if (selectedFood) {
  foodSelect.value = selectedFood;
}
let sub = document.querySelector("form");

sub.addEventListener("submit", function (event) {
  event.preventDefault();

  let food = foodSelect.value;
  let qty = Number(quantity.value);

  if (prices[food] && qty >= 1) {
    let total = prices[food] * qty;

    totalPrice.textContent = "Total: $" + total.toFixed(2);

    let answer = confirm(
      "Are you sure you want to confirm your order ?" +
        "Total: $" +
        total.toFixed(2)
    );

    if (answer == true) {
      alert("Your order has been confirmed! Thank you.");
    } else {
      alert("Your order has been cancelled.");
    }
  } else {
    alert("Please choose your food and quantity.");
  }
});
