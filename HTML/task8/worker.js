var totalSeconds = 0;

setInterval(function () {
  totalSeconds++;

  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  postMessage({
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  });
}, 1000);
