function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* PROJECT GLOW */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 0 20px #00f5d4';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = 'none';
  });
});

/* CERT MODAL */
const certificates = {
  cert1: {
    img: "images/cloud-computing.jpg",
    text: "NPTEL Cloud Computing – IIT Kharagpur"
  },
  cert2: {
    img: "images/ethical-hacking.jpg",
    text: "NPTEL Ethical Hacking – IIT Kharagpur"
  }
};

function openModal(id) {
  document.getElementById("certModal").style.display = "flex";
  document.getElementById("modalImg").src = certificates[id].img;
  document.getElementById("modalText").innerText = certificates[id].text;
}

function closeModal() {
  document.getElementById("certModal").style.display = "none";
}

/* CURSOR */
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

/* =========================
   DESKTOP (MOUSE)
========================= */
document.addEventListener("mousemove", e => {
  cursor.style.opacity = "1";
  follower.style.opacity = "1";

  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  follower.style.left = e.clientX - 10 + "px";
  follower.style.top = e.clientY - 10 + "px";
});

/* =========================
   MOBILE (TOUCH)
========================= */
document.addEventListener("touchstart", e => {
  const touch = e.touches[0];

  cursor.classList.add("touch-active");
  follower.classList.add("touch-active");

  cursor.style.left = touch.clientX + "px";
  cursor.style.top = touch.clientY + "px";

  follower.style.left = touch.clientX - 10 + "px";
  follower.style.top = touch.clientY - 10 + "px";
});

document.addEventListener("touchmove", e => {
  const touch = e.touches[0];

  cursor.style.left = touch.clientX + "px";
  cursor.style.top = touch.clientY + "px";

  follower.style.left = touch.clientX - 10 + "px";
  follower.style.top = touch.clientY - 10 + "px";
});

document.addEventListener("touchend", () => {
  cursor.classList.remove("touch-active");
  follower.classList.remove("touch-active");

  cursor.style.opacity = "0";
  follower.style.opacity = "0";
});


/* THEME TOGGLE */
function toggleTheme() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
  document.getElementById("toggleIcon").innerText =
    document.body.classList.contains("dark") ? "🌙" : "☀️";
}

document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});

// Disable custom cursor on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  document.querySelector('.cursor').style.display = 'none';
  document.querySelector('.cursor-follower').style.display = 'none';
}


document.getElementById("exploreBtn").addEventListener("click", () => {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});
