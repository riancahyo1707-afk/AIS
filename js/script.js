// MUSIC
function startMusic() {
  const music = document.getElementById("music");
  if (music) music.play().catch(() => {});

  document.getElementById("opening").style.display = "none";
  document.getElementById("content").style.display = "flex";
}

// KEMBALI LANGSUNG KE CONTENT
function goToContent() {
  localStorage.setItem("skipOpening", "true");
}

// SAVE MUSIC
setInterval(() => {
  const music = document.getElementById("music");
  if (music) {
    localStorage.setItem("musicTime", music.currentTime);
  }
}, 1000);

// LOAD
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("music");

  // SKIP OPENING
  const skip = localStorage.getItem("skipOpening");
  if (skip === "true") {
    const opening = document.getElementById("opening");
    const content = document.getElementById("content");

    if (opening && content) {
      opening.style.display = "none";
      content.style.display = "flex";
    }
    localStorage.removeItem("skipOpening");
  }

  // MUSIC
  if (music) {
    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) music.currentTime = savedTime;

    music.volume = 0.4;
    music.play().catch(() => {});
  }

  initGallery();
});

// CURSOR LOVE
const cursor = document.createElement("div");
cursor.className = "cursor-love";
cursor.innerHTML = "💖";
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// HEART CLICK
document.addEventListener("click", (e) => {
  createHeart(e.clientX, e.clientY);
});

function createHeart(x, y, delayFloat = 0) {
  const heart = document.createElement("div");
  heart.innerHTML = "💖";
  heart.className = "heart";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.style.animation = "none";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.style.animation = "floatUp 2s linear";
  }, delayFloat);

  setTimeout(() => heart.remove(), 3000);
}

// LOVE BURST
function loveBurst() {
  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;

  for (let t = 0; t < Math.PI * 2; t += 0.2) {
    let x = 16 * Math.pow(Math.sin(t), 3);
    let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t)
            - 2 * Math.cos(3*t) - Math.cos(4*t));

    setTimeout(() => {
      createHeart(cx + x * 10, cy + y * 10, 800);
    }, t * 120);
  }
}

// GALLERY
function initGallery() {
  const images = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (!images.length || !lightbox) return;

  images.forEach(img => {
    img.addEventListener("click", (e) => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;

      for (let i = 0; i < 5; i++) {
        createHeart(e.clientX, e.clientY);
      }
    });
  });
}


// FLOATING HEART
setInterval(() => {
  const heart = document.createElement("div");
  heart.innerHTML = "💗";

  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";
  heart.style.fontSize = (14 + Math.random() * 10) + "px";
  heart.style.opacity = 0.4;
  heart.style.animation = "floatUp 6s linear";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 500);

// SPARKLE
setInterval(() => {
  const s = document.createElement("div");
  s.className = "sparkle";

  s.style.left = Math.random() * 100 + "vw";
  s.style.top = Math.random() * 100 + "vh";

  document.body.appendChild(s);
  setTimeout(() => s.remove(), 2000);
}, 200);

// ===== FLIP + AUTO HEIGHT =====
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const img = card.querySelector("img");
    const back = card.querySelector(".card-back");

    // samakan tinggi belakang dengan gambar
    img.onload = () => {
      back.style.height = img.clientHeight + "px";
    };

    // flip
    card.addEventListener("click", () => {
      card.classList.toggle("active");
    });
  });
});