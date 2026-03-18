// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Gallery filter
document.querySelectorAll('.gallery-tab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.gm-item').forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      item.classList.toggle('gm-hidden', !match);
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
let currentItems = [];
let currentIndex = 0;

function getVisibleItems() {
  return [...document.querySelectorAll('.gm-item:not(.gm-hidden)')];
}

function openLightbox(index) {
  currentItems = getVisibleItems();
  currentIndex = index;
  const item = currentItems[currentIndex];
  lbImg.src = item.querySelector('img').src;
  lbImg.alt = item.querySelector('img').alt;
  lbCaption.textContent = item.dataset.title || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function navigate(dir) {
  currentIndex = (currentIndex + dir + currentItems.length) % currentItems.length;
  lbImg.style.opacity = '0';
  setTimeout(() => {
    const item = currentItems[currentIndex];
    lbImg.src = item.querySelector('img').src;
    lbImg.alt = item.querySelector('img').alt;
    lbCaption.textContent = item.dataset.title || '';
    lbImg.style.opacity = '1';
  }, 200);
}

document.querySelectorAll('.gm-item').forEach((item, i) => {
  item.addEventListener('click', () => {
    const visible = getVisibleItems();
    const visibleIndex = visible.indexOf(item);
    openLightbox(visibleIndex);
  });
});

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => navigate(-1));
document.getElementById('lbNext').addEventListener('click', () => navigate(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});

// Scroll reveal
const reveals = document.querySelectorAll('.service-card, .about-grid, .gm-item, .contact-item, .contact-form-wrap');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

reveals.forEach(el => observer.observe(el));

// Contact form — opens WhatsApp
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = this.querySelector('input[type="text"]').value;
  const service = this.querySelector('select').value;
  const message = this.querySelector('textarea').value;
  const text = `Hi Viola! I'm ${name}. I'm interested in: ${service || 'your services'}. ${message}`;
  window.open(`https://wa.me/2348165528508?text=${encodeURIComponent(text)}`, '_blank');
});
