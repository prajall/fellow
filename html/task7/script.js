const forms = document.querySelectorAll("form");
const backButtons = document.querySelectorAll(".back");
console.log("Back buttons", backButtons);

let activeForm = localStorage.getItem("activeForm")
  ? parseInt(localStorage.getItem("activeForm"))
  : 0;
forms[activeForm].style.display = "block";

// for indicator
const updateIndicator = () => {
  const partitions = forms.length;

  const indicatorElement = document.querySelector(".indicator");
  const indicatorWidth = ((activeForm + 1) / partitions) * 100;

  console.log("IndicatorWidth", indicatorWidth);
  indicatorElement.style.width = indicatorWidth + "%";
};
updateIndicator();

const updateForm = () => {
  if (activeForm > forms.length - 1) return;
  console.log("ActiveForm", activeForm);
  forms.forEach((form) => {
    form.style.display = "none";
  });
  forms[activeForm].style.display = "block";
  localStorage.setItem("activeForm", activeForm);
  updateIndicator();
};
updateForm();

forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    activeForm++;
    updateForm();
  });
});

backButtons.forEach((backButton) => {
  backButton.addEventListener("click", (e) => {
    e.preventDefault();
    activeForm--;
    updateForm();
  });
});

const lastForm = document.getElementById("step3");

lastForm.addEventListener("submit", (e) => {
  alert("Form submitted");
  activeForm = 0;
  updateForm();
  forms.forEach((form) => form.reset());
  localStorage.removeItem("activeForm");
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("address");
  localStorage.removeItem("city");
  localStorage.removeItem("postal");
  localStorage.removeItem("payment");
});

// for local storage persistence:
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const addressField = document.getElementById("address");
const cityField = document.getElementById("city");
const postalField = document.getElementById("postal");
const paymentCardField = document.getElementById("payment-card");
const paymentEsewaField = document.getElementById("payment-esewa");

nameField.addEventListener("input", (e) => {
  localStorage.setItem("name", e.target.value);
});
emailField.addEventListener("input", (e) => {
  localStorage.setItem("email", e.target.value);
});
addressField.addEventListener("input", (e) => {
  localStorage.setItem("address", e.target.value);
});
cityField.addEventListener("input", (e) => {
  localStorage.setItem("city", e.target.value);
});
postalField.addEventListener("input", (e) => {
  localStorage.setItem("postal", e.target.value);
});
paymentCardField.addEventListener("input", (e) => {
  console.log("Payment Card Input", e);
  localStorage.setItem("payment", e.target.checked ? "card" : "");
});
paymentEsewaField.addEventListener("input", (e) => {
  localStorage.setItem("payment", e.target.checked ? "esewa" : "");
});

const loadFromLocalStorage = () => {
  nameField.value = localStorage.getItem("name") || "";
  emailField.value = localStorage.getItem("email") || "";
  addressField.value = localStorage.getItem("address") || "";
  cityField.value = localStorage.getItem("city") || "";
  postalField.value = localStorage.getItem("postal") || "";
  paymentCardField.checked = localStorage.getItem("payment") === "card";
  paymentEsewaField.checked = localStorage.getItem("payment") === "esewa";
};
loadFromLocalStorage();
