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
      <div class="video-wrapper">
        <iframe src="https://player.vimeo.com/video/848569961?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1" allow="autoplay; fullscreen" allowfullscreen></iframe>
      </div>
      <div class="spotify-player">
        <iframe src="https://open.spotify.com/embed/album/4aHYmpZP3G7wdXb3X3G58R?utm_source=generator&theme=0" width="100%" height="552" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
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
            <img src="images/gallery_01_desert_portrait.jpg" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row full">
          <div class="photo-item">
            <img src="images/gallery_02_bw_landscape.jpg" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row">
          <div class="photo-item">
            <img src="images/gallery_03_synth_closeup.jpg" alt="" loading="lazy">
          </div>
          <div class="photo-item">
            <img src="images/gallery_04_live_setup.jpg" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row">
          <div class="photo-item">
            <img src="images/gallery_05_synth_patch.jpg" alt="" loading="lazy">
          </div>
          <div class="photo-item">
            <img src="images/gallery_06_studio_back.jpg" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row full">
          <div class="photo-item">
            <img src="images/gallery_07_desert_wide.jpg" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row full">
          <div class="photo-item">
            <img src="images/gallery_08_dog.jpg" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row">
          <div class="photo-item">
            <img src="images/gallery_09_basement_01.jpg" alt="" loading="lazy">
          </div>
          <div class="photo-item">
            <img src="images/gallery_10_basement_02.jpg" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row">
          <div class="photo-item">
            <img src="images/gallery_11_desert_chair.jpg" alt="" loading="lazy">
          </div>
          <div class="photo-item">
            <img src="images/gallery_12_desert_landscape.jpg" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row full">
          <div class="photo-item">
            <img src="images/gallery_13_studio_portrait.jpg" alt="" loading="lazy">
          </div>
        </div>
        <div class="photo-row full">
          <div class="photo-item">
            <img src="images/gallery_14_desert_final.jpg" alt="" loading="lazy">
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
        <div class="tour-item">
          <div class="tour-date">
            <span class="tour-month">MAR</span>
            <span class="tour-day">28</span>
          </div>
          <div class="tour-info">
            <span class="tour-venue">Building 5</span>
            <span class="tour-city">Portland, OR</span>
          </div>
          <a href="https://www.instagram.com/555_exhibition/" target="_blank" rel="noopener" class="tour-tickets">Info</a>
        </div>
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

  // Update active nav
  navLinks.forEach(link => {
    const linkPage = link.dataset.page;
    link.classList.toggle('active', linkPage === page);
  });

  // Close mobile nav
  mobileNav.classList.remove('open');

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
