"use strict";

document.addEventListener('DOMContentLoaded', function() {

  /* Loading */
  window.addEventListener('load', function() {
    var loader = document.querySelector('.loader');
    var mask = document.getElementById('mask');

    setTimeout(function() {
      if (loader) {
        loader.style.transition = 'opacity 0.5s';
        loader.style.opacity = '0';
        setTimeout(function() { loader.style.display = 'none'; }, 500);
      }
    }, 500);

    setTimeout(function() {
      if (mask) {
        mask.style.transition = 'opacity 0.5s';
        mask.style.opacity = '0';
        setTimeout(function() { mask.style.display = 'none'; }, 500);
      }
    }, 1000);
  });

  /* Jump Menu (Mobile Nav) */
  var jumpMenu = document.querySelector('.jump-menu');
  var nav2 = document.getElementById('nav2');

  if (jumpMenu && nav2) {
    jumpMenu.addEventListener('click', function(e) {
      e.preventDefault();
      nav2.classList.toggle('active');
    });

    nav2.querySelectorAll('ul li a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav2.classList.remove('active');
      });
    });
  }

  /* News Carousel */
  var newsContainer = document.querySelector('.last-news-container ul');
  var newsItems = document.querySelectorAll('.last-news-container ul li');

  if (newsContainer && newsItems.length > 0) {
    var itemWidth = 300;
    var totalWidth = newsItems.length * itemWidth;
    newsContainer.style.width = totalWidth + 'px';

    var newsIndex = 0;
    var newsBox = document.querySelector('.news-box');

    var nextBtn = document.querySelector('.last-news-next');
    var prevBtn = document.querySelector('.last-news-prev');

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        if (newsIndex < newsItems.length - 4) {
          newsIndex++;
          newsBox.scrollTo({ left: itemWidth * newsIndex, behavior: 'smooth' });
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        if (newsIndex > 0) {
          newsIndex--;
          newsBox.scrollTo({ left: itemWidth * newsIndex, behavior: 'smooth' });
        }
      });
    }
  }

  /* Smooth Scroll for Anchor Links */
  document.querySelectorAll('a[href*="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var hash = this.getAttribute('href');
      if (hash.startsWith('#') && hash.length > 1) {
        var target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          var targetTop = target.offsetTop - 50;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
      }
    });
  });

  /* Slider AutoChanging Title */
  var titleItems = document.querySelectorAll('.main-title ul li');
  if (titleItems.length > 0) {
    var titleIndex = 0;
    setInterval(function() {
      titleItems[titleIndex].classList.remove('t-current');
      titleIndex = (titleIndex + 1) % titleItems.length;
      titleItems[titleIndex].classList.add('t-current');
    }, 5000);
  }

  /* Dates Carousel */
  var datesWrapper = document.querySelector('.dates-wrapper');
  var dateItems = document.querySelectorAll('.dates-wrapper ul li');

  if (datesWrapper && dateItems.length > 0) {
    var dateItemWidth = 400;
    var datesTotalWidth = dateItems.length * dateItemWidth;
    var datesUl = document.querySelector('.dates-wrapper ul');
    if (datesUl) datesUl.style.width = datesTotalWidth + 'px';

    // Create controller dots
    var controller = document.querySelector('.controller ul');
    if (controller) {
      dateItems.forEach(function(_, i) {
        var li = document.createElement('li');
        if (i === 0) li.classList.add('selected');
        controller.appendChild(li);
      });
    }

    var dateIndex = 0;
    var controllerItems = document.querySelectorAll('.controller ul li');

    controllerItems.forEach(function(item, i) {
      item.addEventListener('click', function() {
        dateIndex = i;
        datesWrapper.scrollTo({ left: dateItemWidth * dateIndex, behavior: 'smooth' });
        controllerItems.forEach(function(el) { el.classList.remove('selected'); });
        this.classList.add('selected');
      });
    });

    var datesNext = document.querySelector('.dates-nav .next');
    var datesPrev = document.querySelector('.dates-nav .prev');

    if (datesNext) {
      datesNext.addEventListener('click', function() {
        if (dateIndex < controllerItems.length - 1) {
          dateIndex++;
          datesWrapper.scrollTo({ left: dateItemWidth * dateIndex, behavior: 'smooth' });
          controllerItems.forEach(function(el) { el.classList.remove('selected'); });
          controllerItems[dateIndex].classList.add('selected');
        }
      });
    }

    if (datesPrev) {
      datesPrev.addEventListener('click', function() {
        if (dateIndex > 0) {
          dateIndex--;
          datesWrapper.scrollTo({ left: dateItemWidth * dateIndex, behavior: 'smooth' });
          controllerItems.forEach(function(el) { el.classList.remove('selected'); });
          controllerItems[dateIndex].classList.add('selected');
        }
      });
    }
  }

  /* Discography player buttons - handle dynamically loaded content */
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-play')) {
      document.querySelectorAll('.btn-play').forEach(function(el) { el.style.display = 'block'; });
      document.querySelectorAll('.btn-pause').forEach(function(el) { el.style.display = 'none'; });
      e.target.style.display = 'none';
      var pause = e.target.parentElement.querySelector('.btn-pause');
      if (pause) pause.style.display = 'block';
    }

    if (e.target.classList.contains('btn-pause')) {
      e.target.style.display = 'none';
      var play = e.target.parentElement.querySelector('.btn-play');
      if (play) play.style.display = 'block';
    }
  });

  /* Pause other audio when one plays */
  document.addEventListener('play', function(e) {
    if (e.target.tagName === 'AUDIO') {
      document.querySelectorAll('audio').forEach(function(audio) {
        if (audio !== e.target) audio.pause();
      });
    }
  }, true);
});
