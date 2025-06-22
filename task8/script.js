const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

window.onresize = () => {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

window.onresize();

const stars = Array.from({ length: 50 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,
  visible: Math.random() < 0.5,
}));

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    if (Math.random() < 0.05) star.visible = !star.visible;

    if (star.visible) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, 360);
      ctx.fillStyle = "black";
      ctx.fill();
    }
  });
};

setInterval(draw, 50);
