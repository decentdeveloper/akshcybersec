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

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  follower.style.left = e.clientX - 10 + "px";
  follower.style.top = e.clientY - 10 + "px";

  document.querySelectorAll(".blob").forEach((blob, i) => {
    blob.style.transform = `translate(${e.clientX * 0.01 * (i+1)}px, ${e.clientY * 0.01 * (i+1)}px)`;
  });
});

/* THEME TOGGLE */
function toggleTheme() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
  document.getElementById("toggleIcon").innerText =
    document.body.classList.contains("dark") ? "🌙" : "☀️";
}
