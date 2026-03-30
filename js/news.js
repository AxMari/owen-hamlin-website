/* Dynamic Window Ajax Content */
"use strict";

var currentNewsItem = null;

document.querySelectorAll(".last-news").forEach(function(el) {
  el.addEventListener("click", function() {
    openNews(this.id);
    currentNewsItem = this;
  });
});

function openNews(url) {
  fetch(url)
    .then(function(response) { return response.text(); })
    .then(function(data) {
      var newsContent = document.querySelector('.news-content');
      var newsWindow = document.querySelector('.news-window');
      var newsShow = document.getElementById('news-show');

      newsContent.innerHTML = data;
      newsContent.style.display = 'none';
      newsWindow.style.display = 'none';

      setupNewsCloseButton();
      setupNewsNavigation();

      var targetTop = newsShow.offsetTop - 200;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });

      setTimeout(function() {
        newsWindow.style.display = 'block';
        newsWindow.style.height = '0';
        newsWindow.style.transition = 'height 1s ease';

        requestAnimationFrame(function() {
          newsWindow.style.height = '760px';
        });

        setTimeout(function() {
          newsContent.style.display = 'block';
          newsContent.style.opacity = '0';
          newsContent.style.transition = 'opacity 0.5s ease';
          requestAnimationFrame(function() {
            newsContent.style.opacity = '1';
          });
        }, 1000);
      }, 500);
    });
}

function loadNewsItem(url) {
  fetch(url)
    .then(function(response) { return response.text(); })
    .then(function(data) {
      var newsContent = document.querySelector('.news-content');
      var newsWindow = document.querySelector('.news-window');
      var newsShow = document.getElementById('news-show');

      newsContent.innerHTML = data;
      setupNewsCloseButton();
      setupNewsNavigation();

      var targetTop = newsShow.offsetTop - 200;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });

      setTimeout(function() {
        newsWindow.style.display = 'block';
        newsWindow.style.height = '760px';
        newsContent.style.display = 'block';
        newsContent.style.opacity = '1';
      }, 500);
    });
}

function setupNewsCloseButton() {
  var closeBtn = document.querySelector(".close2-btn");
  if (closeBtn) {
    closeBtn.onclick = function() {
      var newsWindow = document.querySelector('.news-window');
      var newsContent = document.querySelector('.news-content');
      var anchor = document.getElementById('anchor01');

      newsContent.style.opacity = '0';
      newsWindow.style.height = '0';

      setTimeout(function() {
        newsWindow.style.display = 'none';
        newsContent.style.display = 'none';
      }, 500);

      window.scrollTo({ top: anchor.offsetTop, behavior: 'smooth' });
    };
  }
}

function getNextNewsItem() {
  if (!currentNewsItem) return null;
  var next = currentNewsItem.nextElementSibling;
  if (next && next.classList.contains('end')) {
    next = document.querySelector('.start').nextElementSibling;
  }
  return next;
}

function getPrevNewsItem() {
  if (!currentNewsItem) return null;
  var prev = currentNewsItem.previousElementSibling;
  if (prev && prev.classList.contains('start')) {
    prev = document.querySelector('.end').previousElementSibling;
  }
  return prev;
}

function setupNewsNavigation() {
  var nextBtn = document.querySelector('.news-next');
  var prevBtn = document.querySelector('.news-prev');

  if (nextBtn) {
    nextBtn.onclick = function() {
      var next = getNextNewsItem();
      if (next && next.id) {
        document.querySelector('.news-content').style.opacity = '0';
        currentNewsItem = next;
        setTimeout(function() {
          loadNewsItem(next.id);
        }, 500);
      }
    };
  }

  if (prevBtn) {
    prevBtn.onclick = function() {
      var prev = getPrevNewsItem();
      if (prev && prev.id) {
        document.querySelector('.news-content').style.opacity = '0';
        currentNewsItem = prev;
        setTimeout(function() {
          loadNewsItem(prev.id);
        }, 500);
      }
    };
  }
}
