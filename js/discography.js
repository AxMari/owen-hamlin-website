/* Dynamic Window Ajax Content */
"use strict";

var currentClickedAlbum = null;

document.querySelectorAll(".open-disc").forEach(function(el) {
  el.addEventListener("click", function() {
    currentClickedAlbum = this.closest('li');
    openDisc(this.id);
  });
});

function isMobileView() {
  return window.innerWidth <= 795;
}

function removeMobileWindow() {
  var existing = document.querySelector('.project-window-mobile');
  if (existing) {
    existing.remove();
  }
}

function openDisc(url) {
  fetch(url)
    .then(function(response) { return response.text(); })
    .then(function(data) {
      var isMobile = isMobileView();

      // Always hide desktop window first
      var desktopWindow = document.querySelector('.project-window');
      var desktopContent = document.querySelector('.project-content');
      desktopWindow.style.display = 'none';
      desktopContent.style.display = 'none';

      // Remove any existing mobile window
      removeMobileWindow();

      if (isMobile && currentClickedAlbum) {
        // Mobile: insert content directly after clicked album
        var mobileWindow = document.createElement('div');
        mobileWindow.className = 'project-window-mobile';
        mobileWindow.innerHTML = '<div class="project-content-mobile">' + data + '</div>';

        currentClickedAlbum.insertAdjacentElement('afterend', mobileWindow);

        // Scroll to the mobile window
        var targetTop = mobileWindow.offsetTop - 100;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });

        // Animate in
        mobileWindow.style.height = '0';
        mobileWindow.style.overflow = 'hidden';
        mobileWindow.style.transition = 'height 0.5s ease';

        requestAnimationFrame(function() {
          mobileWindow.style.height = 'auto';
          var height = mobileWindow.scrollHeight;
          mobileWindow.style.height = '0';
          requestAnimationFrame(function() {
            mobileWindow.style.height = height + 'px';
          });
        });

        setTimeout(function() {
          mobileWindow.style.height = 'auto';
          mobileWindow.style.overflow = 'visible';
        }, 500);

        setupCloseButton(true);
      } else {
        // Desktop: use original behavior
        var projectContent = document.querySelector('.project-content');
        var projectWindow = document.querySelector('.project-window');
        var projectShow = document.getElementById('project-show');

        projectContent.innerHTML = data;

        // Scroll to project area
        var targetTop = projectShow.offsetTop - 200;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });

        // Show window with animation
        setTimeout(function() {
          projectWindow.style.display = 'block';
          projectWindow.style.overflow = 'hidden';
          projectWindow.style.height = '0';
          projectWindow.style.transition = 'height 0.5s ease';

          // Show content first to measure height
          projectContent.style.display = 'block';
          projectContent.style.opacity = '0';

          requestAnimationFrame(function() {
            // Animate to actual content height (min 550px for Spotify embeds)
            var contentHeight = Math.max(projectContent.scrollHeight, 550);
            projectWindow.style.height = contentHeight + 'px';

            setTimeout(function() {
              projectContent.style.transition = 'opacity 0.5s ease';
              projectContent.style.opacity = '1';
              projectWindow.style.overflow = 'visible';
            }, 500);
          });
        }, 300);

        setupCloseButton(false);
      }
    });
}

function setupCloseButton(isMobile) {
  var closeBtn = document.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.onclick = function() {
      var anchor = document.getElementById('anchor02');

      if (isMobile) {
        var mobileWindow = document.querySelector('.project-window-mobile');
        if (mobileWindow) {
          mobileWindow.style.height = mobileWindow.scrollHeight + 'px';
          mobileWindow.style.transition = 'height 0.4s ease, opacity 0.4s ease';
          requestAnimationFrame(function() {
            mobileWindow.style.height = '0';
            mobileWindow.style.opacity = '0';
          });
          setTimeout(function() {
            mobileWindow.remove();
          }, 400);
        }
      } else {
        var projectWindow = document.querySelector('.project-window');
        var projectContent = document.querySelector('.project-content');

        projectContent.style.opacity = '0';
        projectWindow.style.height = '0';

        setTimeout(function() {
          projectWindow.style.display = 'none';
          projectContent.style.display = 'none';
        }, 500);
      }

      window.scrollTo({ top: anchor.offsetTop - 50, behavior: 'smooth' });
    };
  }
}
