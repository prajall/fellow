const sidebar_button = document.getElementById("toggle-sidebar");
const sidebar = document.querySelector("aside");

sidebar_button.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const data = [250, 300, 280, 400, 310, 400];
const getMinMax = () => {
  let min = data[0];
  let max = data[0];
  data.forEach((number) => {
    if (number < min) {
      min = number;
    }
    if (number > max) {
      max = number;
    }
  });

  return { min, max };
};
const maxValue = getMinMax().max;

const width = canvas.clientWidth;
const height = canvas.clientHeight;

const getYCoordinate = (number) => {
  // console.log("getYCoordinate", number);
  const maxValue = getMinMax().max;
  // console.log("YCoorcinage for:", number, "is", (number / maxValue) * height);
  return (number / maxValue) * height;
};

const startLabel = 0;
const endLabel = 200;
const distanceX = width / data.length;
const distanceY = height / data.length;

ctx.beginPath();

ctx.moveTo(0, height);
console.log("Canvas Coordinate");
data.forEach((number, index) => {
  const x = Math.floor(distanceX * index);
  const y = Math.floor(height - getYCoordinate(number));
  console.log(x, y);
  ctx.lineTo(x, y);
});

ctx.stroke();
