/**
 * Minimal lightbox for images and YouTube videos
 * Replaces FancyBox with ~60 lines of vanilla JS
 */
(function() {
  'use strict';

  // Create lightbox elements
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <div class="lightbox-content"></div>
  `;
  document.body.appendChild(overlay);

  const content = overlay.querySelector('.lightbox-content');
  const closeBtn = overlay.querySelector('.lightbox-close');

  function openLightbox(html) {
    content.innerHTML = html;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    // Clear content after animation
    setTimeout(() => { content.innerHTML = ''; }, 300);
  }

  // Close handlers
  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Image lightbox
  document.querySelectorAll('.fancybox, .img-lightbox').forEach(link => {
    if (link.classList.contains('fancybox-media')) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const src = link.href;
      openLightbox(`<img src="${src}" alt="">`);
    });
  });

  // YouTube lightbox
  document.querySelectorAll('.fancybox-media').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = new URL(link.href);
      let videoId = url.searchParams.get('v');
      if (!videoId && url.pathname.includes('youtu.be')) {
        videoId = url.pathname.split('/').pop();
      }
      if (videoId) {
        // Pause all audio when opening video
        document.querySelectorAll('audio').forEach(a => a.pause());

        // Pause embedded YouTube player
        try {
          if (window.ytPlayer && window.ytPlayer.getPlayerState && window.ytPlayer.getPlayerState() === 1) {
            window.ytPlayer.pauseVideo();
          }
        } catch(e) {}

        openLightbox(`
          <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1"
                  frameborder="0" allowfullscreen
                  allow="autoplay; encrypted-media"></iframe>
        `);
      }
    });
  });
})();
