"use strict";

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

document.addEventListener('DOMContentLoaded', function() {

    /* Main Menu Section Selector (onePageNav replacement) */
    var menuItems = document.querySelectorAll('.main-menu ul li a');
    var sections = [];
    var scrollOffset = 70;

    menuItems.forEach(function(item) {
        var href = item.getAttribute('href');
        if (href && href.startsWith('#')) {
            var section = document.querySelector(href);
            if (section) {
                sections.push({ el: section, link: item.parentElement });
            }
        }
    });

    function updateActiveMenu() {
        var scrollPos = window.scrollY + scrollOffset + 100;

        sections.forEach(function(section) {
            var top = section.el.offsetTop;
            var bottom = top + section.el.offsetHeight;

            if (scrollPos >= top && scrollPos < bottom) {
                menuItems.forEach(function(item) {
                    item.parentElement.classList.remove('current');
                });
                section.link.classList.add('current');
            }
        });
    }

    window.addEventListener('scroll', updateActiveMenu);
    updateActiveMenu();

    /* Audio Player */
    var audioPlayer = document.querySelector('.audio-player');
    if (audioPlayer && typeof audiojs !== 'undefined') {
        var a = audiojs.createAll({
            trackEnded: function() {
                var playing = document.querySelector('ol li.playing');
                var next = playing ? playing.nextElementSibling : null;
                if (!next) next = document.querySelector('ol li');
                if (next) {
                    playing.classList.remove('playing');
                    next.classList.add('playing');
                    var src = next.querySelector('a').getAttribute('data-src');
                    audio.load(src);
                    audio.play();
                }
            }
        });

        var audio = a[0];
        var firstLink = document.querySelector('ol a');
        var firstItem = document.querySelector('ol li');

        if (firstLink && firstItem) {
            var firstSrc = firstLink.getAttribute('data-src');
            var firstTrack = firstLink.getAttribute('data-track');
            firstItem.classList.add('playing');
            var artistEl = document.querySelector('.artist');
            if (artistEl) artistEl.textContent = firstTrack;
            audio.load(firstSrc);
        }

        // Load track on click
        document.querySelectorAll('ol li').forEach(function(li) {
            li.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('ol li').forEach(function(el) {
                    el.classList.remove('playing');
                });
                this.classList.add('playing');
                var src = this.querySelector('a').getAttribute('data-src');
                audio.load(src);
                audio.play();
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            var playing = document.querySelector('li.playing');
            if (!playing) return;

            if (e.keyCode === 39) { // right arrow
                var next = playing.nextElementSibling;
                if (!next) next = document.querySelector('ol li');
                if (next) next.click();
            } else if (e.keyCode === 37) { // left arrow
                var prev = playing.previousElementSibling;
                if (!prev) prev = document.querySelector('ol li:last-child');
                if (prev) prev.click();
            } else if (e.keyCode === 16) { // shift
                audio.playPause();
            }
        });

        // Prev/Next buttons
        var prevBtn = document.querySelector('.prev-track');
        var nextBtn = document.querySelector('.next-track');

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                var playing = document.querySelector('li.playing');
                if (!playing) return;
                var prev = playing.previousElementSibling;
                if (!prev) prev = document.querySelector('ol li:last-child');
                if (prev) {
                    prev.click();
                    var track = prev.querySelector('a').getAttribute('data-track');
                    var artistEl = document.querySelector('.artist');
                    if (artistEl) artistEl.textContent = track;
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                var playing = document.querySelector('li.playing');
                if (!playing) return;
                var next = playing.nextElementSibling;
                if (!next) next = document.querySelector('ol li');
                if (next) {
                    next.click();
                    var track = next.querySelector('a').getAttribute('data-track');
                    var artistEl = document.querySelector('.artist');
                    if (artistEl) artistEl.textContent = track;
                }
            });
        }
    }

});
