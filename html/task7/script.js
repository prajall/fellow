const forms = document.querySelectorAll("form");
const backButtons = document.querySelectorAll(".back");
console.log("Back buttons", backButtons);

let activeForm = 0;
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
});
