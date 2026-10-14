const app = document.getElementById('app');
const navLinks = document.querySelectorAll('nav a, .mobile-nav a');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

// Page templates
const pages = {
  music: () => `
    <div class="page-music">
      <div class="album-announce">
        <h2>"Computer Jazz"</h2>
        <p>Out Now</p>
      </div>
      <div class="video-wrapper" style="background-image: url(images/album-loop-poster.webp)">
        <iframe data-src="https://framerate.tv/embed/89eabea9-faa7-41c1-8bbd-153068d1f8d3?autoplay=1&muted=1&loop=1&show_controls=0&initial_play_btn=0&theme=minimal" title="Computer Jazz album art loop" allow="autoplay; fullscreen" allowfullscreen></iframe>
      </div>
      <div class="spotify-player">
        <iframe src="https://open.spotify.com/embed/album/4aHYmpZP3G7wdXb3X3G58R?utm_source=generator&theme=0" width="100%" height="552" title="Computer Jazz on Spotify" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
      <div class="buttons">
        <a href="https://computerjazz.bandcamp.com/" target="_blank" rel="noopener">Bandcamp</a>
        <a href="https://open.spotify.com/album/4aHYmpZP3G7wdXb3X3G58R" target="_blank" rel="noopener">Spotify</a>
        <a href="https://music.apple.com/us/album/computer-jazz/1697882351" target="_blank" rel="noopener">Apple Music</a>
      </div>
    </div>
  `,

  photos: () => `
    <div class="page-photos">
      <div class="photo-grid">
        <div class="photo-row full">
          <div class="photo-item">
            <img src="images/gallery_01_desert_portrait.webp" width="1600" height="1993" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row full">
          <div class="photo-item">
            <img src="images/gallery_02_bw_landscape.webp" width="1600" height="1030" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row">
          <div class="photo-item">
            <img src="images/gallery_03_synth_closeup.webp" width="1600" height="900" alt="" loading="lazy">
          </div>
          <div class="photo-item">
            <img src="images/gallery_04_live_setup.webp" width="1600" height="900" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row">
          <div class="photo-item">
            <img src="images/gallery_05_synth_patch.webp" width="1600" height="900" alt="" loading="lazy">
          </div>
          <div class="photo-item">
            <img src="images/gallery_06_studio_back.webp" width="1600" height="902" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row full">
          <div class="photo-item">
            <img src="images/gallery_07_desert_wide.webp" width="1290" height="2000" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row full">
          <div class="photo-item">
            <img src="images/gallery_08_dog.webp" width="1600" height="964" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row">
          <div class="photo-item">
            <img src="images/gallery_09_basement_01.webp" width="889" height="1160" alt="" loading="lazy">
          </div>
          <div class="photo-item">
            <img src="images/gallery_10_basement_02.webp" width="890" height="1160" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row">
          <div class="photo-item">
            <img src="images/gallery_11_desert_chair.webp" width="1600" height="1033" alt="" loading="lazy">
          </div>
          <div class="photo-item">
            <img src="images/gallery_12_desert_landscape.webp" width="1600" height="1049" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row full">
          <div class="photo-item">
            <img src="images/gallery_13_studio_portrait.webp" width="1600" height="900" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row full">
          <div class="photo-item">
            <img src="images/gallery_14_desert_final.webp" width="1600" height="1279" alt="" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  `,

  bio: () => `
    <div class="page-bio">
      <p>Computer Jazz is the electronic music project of Portland-based artist and musician Justin Lawes.</p>
      <p>Lawes's experimental use of synthesizers pushes them beyond the realm of standard electronica, creating music with deep authenticity of sound that bends and shifts in unexpected ways. The finished music is both delicate and deliberate\u2014both full of space, and full of life. His vibrant, modern tones have a rhythm that ebbs and flows, shifting between bright and soft, like the varying moments of a full day. Recorded partly in the Southern California desert, Computer Jazz's debut album, Computer Jazz, was released in 2023.</p>
      <p>Lawes's past musical projects include the intricate sounds of Friendship Park, where he and his bandmates combined whimsical, plucky, chopped guitar parts with synths to make bright and imaginative songs.</p>
    </div>
  `,

  tour: () => `
    <div class="page-tour">
      <div class="tour-list">
        <p class="tour-empty">No upcoming dates.</p>
      </div>
    </div>
  `,

  contact: () => `
    <div class="page-contact">
      <h2>Say hello!</h2>
      <a href="mailto:computerjazz01@gmail.com" class="email">computerjazz01@gmail.com</a>
    </div>
  `
};

// Router
function getPage() {
  const hash = window.location.hash || '#/';
  const path = hash.replace('#/', '').replace('/', '') || 'music';
  // Map routes
  const routeMap = {
    '': 'music',
    'music': 'music',
    'photos': 'photos',
    'gallery': 'photos',
    'tour': 'tour',
    'bio': 'bio',
    'contact': 'contact'
  };
  return routeMap[path] || 'music';
}

function render() {
  const page = getPage();
  app.innerHTML = pages[page]();
  window.scrollTo(0, 0);

  // Load embeds only after the rest of the page has finished loading.
  const deferred = app.querySelectorAll('iframe[data-src]');
  const loadDeferred = () => deferred.forEach(f => { f.src = f.dataset.src; });
  if (document.readyState === 'complete') loadDeferred();
  else window.addEventListener('load', loadDeferred, { once: true });

  // Update active nav
  navLinks.forEach(link => {
    const linkPage = link.dataset.page;
    link.classList.toggle('active', linkPage === page);
  });

  // Close mobile nav
  mobileNav.classList.remove('open');

  // Close the lightbox when the route changes
  lightbox.classList.remove('open');

  // Attach lightbox to photo items
  if (page === 'photos') {
    const imgs = app.querySelectorAll('.photo-item img');
    lightboxImages = Array.from(imgs).map(img => img.src);
    imgs.forEach((img, i) => {
      img.addEventListener('click', () => {
        lightboxIndex = i;
        lightboxImg.src = lightboxImages[i];
        lightbox.classList.add('open');
      });
    });
  }
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
let lightboxImages = [];
let lightboxIndex = 0;

function lightboxShow(index) {
  lightboxIndex = (index + lightboxImages.length) % lightboxImages.length;
  lightboxImg.src = lightboxImages[lightboxIndex];
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
    lightbox.classList.remove('open');
  }
});
lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); lightboxShow(lightboxIndex - 1); });
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); lightboxShow(lightboxIndex + 1); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') lightbox.classList.remove('open');
  if (e.key === 'ArrowLeft') lightboxShow(lightboxIndex - 1);
  if (e.key === 'ArrowRight') lightboxShow(lightboxIndex + 1);
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

// Close mobile nav on link click
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });
});

// Listen for hash changes
window.addEventListener('hashchange', render);

// Initial render
render();
