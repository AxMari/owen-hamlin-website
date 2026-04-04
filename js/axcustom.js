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

window.ytPlayer = null;
function onYouTubeIframeAPIReady() {
  window.ytPlayer = new YT.Player("youtube-player", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerStateChange(event) {
  // 1 means playing - pause all audio when YouTube starts
  if (event.data === YT.PlayerState.PLAYING) {
    document.querySelectorAll("audio").forEach((audio) => audio.pause());
    document.body.classList.remove('music-playing');
    // Close any lightbox video that might be playing
    var lightboxOverlay = document.getElementById('lightbox-overlay');
    if (lightboxOverlay && lightboxOverlay.classList.contains('active')) {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(function() {
        lightboxOverlay.querySelector('.lightbox-content').innerHTML = '';
      }, 300);
    }
  }
}

// Navbar audio player
document.addEventListener('DOMContentLoaded', function() {
  const playBtn = document.getElementById('nav-play-btn');
  const audio = document.getElementById('main-audio');
  const playlistData = document.querySelectorAll('#playlist-data span');
  let currentTrack = 0;

  if (!playBtn || !audio) return;

  // Play/pause toggle
  playBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  // Update UI when audio plays
  audio.addEventListener('play', function() {
    document.body.classList.add('music-playing');
    // Pause YouTube videos when navbar audio plays
    try {
      if (window.ytPlayer && window.ytPlayer.getPlayerState && window.ytPlayer.getPlayerState() === 1) {
        window.ytPlayer.pauseVideo();
      }
    } catch(e) {}
    // Close any lightbox video
    var lightboxOverlay = document.getElementById('lightbox-overlay');
    if (lightboxOverlay && lightboxOverlay.classList.contains('active')) {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(function() {
        lightboxOverlay.querySelector('.lightbox-content').innerHTML = '';
      }, 300);
    }
  });

  // Update UI when audio pauses
  audio.addEventListener('pause', function() {
    document.body.classList.remove('music-playing');
  });

  // When track ends, play next
  audio.addEventListener('ended', function() {
    currentTrack = (currentTrack + 1) % playlistData.length;
    audio.src = playlistData[currentTrack].dataset.src;
    audio.play();
  });

  // Autoplay - try immediately, fallback to first user interaction
  let hasAutoPlayed = false;
  function tryAutoplay() {
    if (hasAutoPlayed) return;
    audio.play().then(function() {
      hasAutoPlayed = true;
      removeAutoplayListeners();
    }).catch(function() {
      // Autoplay blocked, will try again on interaction
    });
  }

  function removeAutoplayListeners() {
    document.removeEventListener('click', tryAutoplay);
    document.removeEventListener('scroll', tryAutoplay);
    document.removeEventListener('mousemove', tryAutoplay);
    document.removeEventListener('keydown', tryAutoplay);
    document.removeEventListener('touchstart', tryAutoplay);
  }

  // Try autoplay immediately
  tryAutoplay();

  // Also try on any user interaction
  document.addEventListener('click', tryAutoplay);
  document.addEventListener('scroll', tryAutoplay);
  document.addEventListener('mousemove', tryAutoplay, { once: true });
  document.addEventListener('keydown', tryAutoplay);
  document.addEventListener('touchstart', tryAutoplay);
});

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
