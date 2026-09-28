let hh = document.getElementById("hh");
let mm = document.getElementById("mm");
let ss = document.getElementById("ss");

setInterval(() => {
  const d = new Date();
  let hr = d.getHours().toString().padStart(2, "0");
  let min = d.getMinutes().toString().padStart(2, "0");
  let sec = d.getSeconds().toString().padStart(2, "0");
  const ampm = d.getHours() >= 12 ? "PM" : "AM";

  hh.innerText = hr;
  mm.innerText = min;
  ss.innerText = sec;

  console.log(`${hr}:${min}:${sec} ${ampm}`);
}, 1000);
