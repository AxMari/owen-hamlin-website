// Contact form AJAX handler
document.getElementById("contact").onsubmit = function (e) {
  e.preventDefault();
  const form = this;
  document.getElementById("contactFormSent").style.display = "none";
  document.getElementById("contactFormError").style.display = "none";

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        form.reset();
        document.getElementById("contactFormSent").style.display = "block";
      } else {
        document.getElementById("contactFormError").style.display = "block";
      }
    })
    .catch(() => {
      document.getElementById("contactFormError").style.display = "block";
    });
};

// Dynamic copyright year
const startYear = 2021;
const currentYear = new Date().getFullYear();
document.getElementById("copyright").textContent = `© ${startYear}${
  currentYear > startYear ? "–" + currentYear : ""
} Owen Hamlin. All rights reserved.`;

let ytPlayer;
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player("youtube-player", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerStateChange(event) {
  // 1 means playing
  if (event.data === YT.PlayerState.PLAYING) {
    document.querySelectorAll("audio").forEach((audio) => audio.pause());
  }
}

// Simple image slider
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.slides-container');
  if (!container) return;

  const slides = container.querySelectorAll('img');
  if (slides.length === 0) return;

  let current = 0;
  slides[0].classList.add('active');

  function nextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }

  // Auto-rotate every 5 seconds
  setInterval(nextSlide, 5000);

  // Navigation buttons
  const nextBtn = document.querySelector('.slides-navigation .next');
  const prevBtn = document.querySelector('.slides-navigation .prev');

  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      nextSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      slides[current].classList.remove('active');
      current = (current - 1 + slides.length) % slides.length;
      slides[current].classList.add('active');
    });
  }
});
