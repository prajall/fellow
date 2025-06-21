const nameElement = document.getElementById("name");
const emailElement = document.getElementById("email");
const messageElement = document.getElementById("message");
const phoneElement = document.getElementById("phone");

nameElement.value = localStorage.getItem("name") || "";
emailElement.value = localStorage.getItem("email") || "";
messageElement.value = localStorage.getItem("message") || "";
phoneElement.value = localStorage.getItem("phone") || "";

phoneElement.onchange = () => {
  localStorage.setItem("phone", phoneElement.value);
};
nameElement.onchange = () => {
  localStorage.setItem("name", nameElement.value);
};
emailElement.onchange = () => {
  localStorage.setItem("email", emailElement.value);
};
messageElement.onchange = () => {
  localStorage.setItem("message", messageElement.value);
};
