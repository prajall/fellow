const hamburger = document.getElementById("hamburger");
const navMenuMobile = document.getElementById("navMenuMobile");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navMenuMobile.classList.toggle("hide");
});
