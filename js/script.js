// ========================
// Mobile Menu Toggle
// ========================
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      icon.classList.replace('fa-xmark', 'fa-bars');
    }
  });
  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
    });
  });
}

// ========================
// Animate on Scroll
// ========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ========================
// FAQ Accordion
// ========================
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function () {
    const item = this.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      const ans = i.querySelector('.faq-answer');
      if (ans) ans.style.display = 'none';
    });
    // Toggle current
    if (!isOpen) {
      item.classList.add('open');
      const ans = item.querySelector('.faq-answer');
      if (ans) ans.style.display = 'block';
    }
  });
});

// ========================
// Cookie Banner
// ========================
const cookie = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('accept-cookies');
const declineBtn = document.getElementById('decline-cookies');
if (cookie) {
  if (!localStorage.getItem('cookieConsent')) {
    cookie.style.display = 'flex';
  }
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookie.style.display = 'none';
    });
  }
  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      cookie.style.display = 'none';
    });
  }
}

// ========================
// Personalized Banner
// ========================
(function () {
  var p = new URLSearchParams(window.location.search);
  var f = p.get('firma');
  var n = p.get('name');
  if (f && n) {
    var b = document.getElementById('personalized-banner');
    var firmaEl = document.getElementById('banner-firma');
    var nameEl = document.getElementById('banner-name');
    if (b && firmaEl && nameEl) {
      firmaEl.textContent = f;
      nameEl.textContent = n;
      b.style.display = 'block';
    }
  }
})();

// ========================
// Sticky Header Shadow
// ========================
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 30) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
    } else {
      header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.3)';
    }
  }
});

// ========================
// Contact Form (basic)
// ========================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Nachricht gesendet!';
    btn.style.background = '#2e7d32';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      this.reset();
    }, 4000);
  });
}
