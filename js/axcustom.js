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
