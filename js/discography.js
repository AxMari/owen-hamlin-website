/* Dynamic Window Ajax Content */
"use strict";

document.querySelectorAll(".open-disc").forEach(function(el) {
  el.addEventListener("click", function() {
    openDisc(this.id);
  });
});

function openDisc(url) {
  fetch(url)
    .then(function(response) { return response.text(); })
    .then(function(data) {
      var projectContent = document.querySelector('.project-content');
      var projectWindow = document.querySelector('.project-window');
      var projectShow = document.getElementById('project-show');

      projectContent.innerHTML = data;
      projectContent.style.display = 'none';
      projectWindow.style.display = 'none';

      // Scroll to project area
      var targetTop = projectShow.offsetTop - 200;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });

      // Show window with animation
      setTimeout(function() {
        projectWindow.style.display = 'block';
        projectWindow.style.height = '0';
        projectWindow.style.transition = 'height 0.5s ease';

        requestAnimationFrame(function() {
          projectWindow.style.height = '550px';
        });

        setTimeout(function() {
          projectContent.style.display = 'block';
          projectContent.style.opacity = '0';
          projectContent.style.transition = 'opacity 0.5s ease';
          requestAnimationFrame(function() {
            projectContent.style.opacity = '1';
          });
        }, 500);
      }, 300);

      // Setup close button
      setupCloseButton();
    });
}

function setupCloseButton() {
  var closeBtn = document.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", function() {
      var projectWindow = document.querySelector('.project-window');
      var projectContent = document.querySelector('.project-content');
      var anchor = document.getElementById('anchor02');

      projectContent.style.opacity = '0';
      projectWindow.style.height = '0';

      setTimeout(function() {
        projectWindow.style.display = 'none';
        projectContent.style.display = 'none';
      }, 500);

      window.scrollTo({ top: anchor.offsetTop - 50, behavior: 'smooth' });
    });
  }
}
