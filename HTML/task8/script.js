const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

window.onresize = () => {
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
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

// intersection observer

const intersectionElements = document.querySelectorAll(
  ".intersection-observer"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

intersectionElements.forEach((element) => {
  observer.observe(element);
});

//animate-fade
const elements = document.querySelectorAll(".animate-fade");

elements.forEach((element) => {
  element.classList.add("animate");
});

// Form submission
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!navigator.geolocation) {
    alert("Geolocation is not supported ");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log("User location:", latitude, longitude);

      alert("Form submitted with location");
    },
    (error) => {
      console.error("Geolocation error:", error.message);
      alert("Unable to get your location.");
    }
  );
});

//worker
const timeDisplay = document.getElementById("time");
const worker = new Worker("worker.js");

worker.onmessage = (e) => {
  let hours = e.data.hours;
  let minutes = e.data.minutes;
  let seconds = e.data.seconds;

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  timeDisplay.textContent = hours + ":" + minutes + ":" + seconds;
};

//dark mode
const darkModeButton = document.querySelector(".dark-toggle");
darkModeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    darkModeButton.innerHTML = "Light";
  } else {
    darkModeButton.innerHTML = "Dark";
  }
});

//skills color change
document.querySelectorAll(".card").forEach((card) => {
  const color = card.dataset.color;

  card.addEventListener("mouseenter", () => {
    card.style.setProperty("--hover-color", color);
  });

  card.addEventListener("mouseleave", () => {
    card.style.removeProperty("--hover-color");
  });
});
