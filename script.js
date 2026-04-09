
/* ================= SELECT ELEMENTS ================= */
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".navbar a");

/* ================= CURRENT PAGE ================= */
let currentPage = "home";

/* ================= MAIN FUNCTION ================= */
function showSection(id){

  // remove active from all
  pages.forEach(page => {
    page.classList.remove("active");
  });

  // add active to selected
  const target = document.getElementById(id);
  if(target){
    target.classList.add("active");
    currentPage = id;
  }

  // navbar highlight
  navLinks.forEach(link=>{
    link.classList.remove("active");

    if(link.innerText.toLowerCase() === id){
      link.classList.add("active");
    }
  });
}

/* ================= SCROLL NAVIGATION ================= */
let scrollLock = false;

window.addEventListener("wheel",(e)=>{

  if(scrollLock) return;

  scrollLock = true;

  const order = ["home","about","journey","skills","memories","contact"];
  let index = order.indexOf(currentPage);

  if(e.deltaY > 0 && index < order.length - 1){
    showSection(order[index + 1]);
  }

  if(e.deltaY < 0 && index > 0){
    showSection(order[index - 1]);
  }

  setTimeout(()=>{
    scrollLock = false;
  },700);

});

/* ================= KEYBOARD NAV ================= */
/* ================= TOUCH / SWIPE NAVIGATION FOR MOBILE ================= */
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

window.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleMobileSwipe();
});

function handleMobileSwipe() {
  if (scrollLock) return;

  // 'memories' ah remove pannitten yenna athu unga HTML la illa
  const order = ["home", "about", "journey", "skills", "contact"];
  let index = order.indexOf(currentPage);
  
  let swipeDistance = touchStartY - touchEndY;

  // Swipe Up (Go to Next Section)
  if (swipeDistance > 50 && index < order.length - 1) {
    scrollLock = true;
    showSection(order[index + 1]);
    setTimeout(() => { scrollLock = false; }, 700);
  }

  // Swipe Down (Go to Previous Section)
  if (swipeDistance < -50 && index > 0) {
    scrollLock = true;
    showSection(order[index - 1]);
    setTimeout(() => { scrollLock = false; }, 700);
  }
}

/* ================= BUTTON SAFETY ================= */
document.querySelectorAll("button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    // just to ensure click works (no error)
  });
});

/* ================= INIT ================= */
showSection("home");


/* ================= CANVAS ================= */
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-5";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ================= PARTICLES ================= */
let particles = [];

for(let i=0;i<150;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    z: Math.random()*1000,
    size: Math.random()*2,
    color: Math.random() > 0.5 ? "#FFD700" : "#00ffff"
  });
}

/* ================= MOUSE ================= */
let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove",(e)=>{
  mouseX = (e.clientX - canvas.width/2) * 0.002;
  mouseY = (e.clientY - canvas.height/2) * 0.002;
});

/* ================= ANIMATION ================= */
function animate(){

  // DARK BASE
  ctx.fillStyle = "#050510";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{

    p.z -= 1.5;

    if(p.z <= 0){
      p.z = 1000;
      p.x = Math.random()*canvas.width;
      p.y = Math.random()*canvas.height;
    }

    let scale = 200 / p.z;

    let x = (p.x - canvas.width/2) * scale + canvas.width/2;
    let y = (p.y - canvas.height/2) * scale + canvas.height/2;

    // PARALLAX
    x += mouseX * p.z * 0.03;
    y += mouseY * p.z * 0.03;

    let size = (1 - p.z/1000) * 4;

    ctx.beginPath();

    // GLOW
    ctx.shadowBlur = 20;
    ctx.shadowColor = p.color;

    ctx.fillStyle = p.color;
    ctx.arc(x,y,size,0,Math.PI*2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

/* ================= RESIZE ================= */
window.addEventListener("resize",()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


/* SWIPE NAVIGATION */
let startY = 0;
let endY = 0;

window.addEventListener("touchstart",(e)=>{
  startY = e.touches[0].clientY;
});

window.addEventListener("touchend",(e)=>{
  endY = e.changedTouches[0].clientY;
  handleSwipe();
});

function handleSwipe(){

  const order = ["home","about","journey","skills","memories","contact"];
  let index = order.indexOf(currentPage);

  if(startY - endY > 50){
    if(index < order.length - 1){
      showSection(order[index + 1]);
    }
  }

  if(endY - startY > 50){
    if(index > 0){
      showSection(order[index - 1]);
    }
  }
}
