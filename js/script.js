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

// ========================

// ========================
// Demo Personalisierung
// ========================
(function () {
  // Params aus URL lesen → sessionStorage speichern
  var p = new URLSearchParams(window.location.search);
  ['firma','name','stadt','telefon'].forEach(function(k) {
    if (p.get(k)) sessionStorage.setItem('ws_'+k, p.get(k));
  });

  var firma   = sessionStorage.getItem('ws_firma');
  var name    = sessionStorage.getItem('ws_name');
  var stadt   = sessionStorage.getItem('ws_stadt');
  var telefon = sessionStorage.getItem('ws_telefon');

  // Telefon-Fallback per Stadt (wenn kein Lead-Telefon vorhanden)
  if (!telefon) {
    var CITY_PHONES = {
      'Stuttgart-Mitte':'0711 48 27 93','Stuttgart-Nord':'0711 38 16 74',
      'Stuttgart-Süd':'0711 62 93 41','Stuttgart-Ost':'0711 57 84 20',
      'Stuttgart-West':'0711 29 54 86','Bad Cannstatt':'0711 56 83 12',
      'Vaihingen':'0711 74 29 61','Zuffenhausen':'0711 83 47 25',
      'Feuerbach':'0711 94 61 38','Degerloch':'0711 46 82 57',
      'Möhringen':'0711 73 19 84','Stammheim':'0711 85 34 67',
      'Mühlhausen':'0711 91 46 23','Böblingen':'07031 6 48 27',
      'Sindelfingen':'07031 8 37 45','Esslingen':'0711 39 72 56',
      'Ostfildern':'0711 48 65 31','Leinfelden-Echterdingen':'0711 97 28 43',
      'Ludwigsburg':'07141 8 36 29','Kornwestheim':'07141 5 74 83',
      'Bietigheim-Bissingen':'07142 4 82 67','Waiblingen':'07151 6 93 48',
      'Fellbach':'0711 58 37 94','Schorndorf':'07181 4 72 85',
      'Winnenden':'07195 9 38 62','Göppingen':'07161 7 48 23',
      'Kirchheim unter Teck':'07021 8 53 46','Nürtingen':'07022 6 47 91',
      'Leonberg':'07152 5 83 27','Ditzingen':'07156 4 69 38',
      'Gerlingen':'07156 9 24 71','Korntal-Münchingen':'07150 3 84 56',
      'Remshalden':'07151 8 37 24','Plochingen':'07153 6 48 92',
      'Wendlingen':'07024 5 73 81'
    };
    telefon = (stadt && CITY_PHONES[stadt]) || '0711 48 27 93';
    sessionStorage.setItem('ws_telefon', telefon);
  }

  function replaceInText(node, oldStr, newStr) {
    if (!oldStr || oldStr === newStr) return;
    if (node.nodeType === 3) {
      if (node.textContent.indexOf(oldStr) !== -1)
        node.textContent = node.textContent.split(oldStr).join(newStr);
    } else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
      for (var i = 0; i < node.childNodes.length; i++)
        replaceInText(node.childNodes[i], oldStr, newStr);
    }
  }

  function replaceTelLinks(newTel) {
    var clean = newTel.replace(/\s/g, '');
    document.querySelectorAll('a[href^="tel:"]').forEach(function(a) {
      a.setAttribute('href', 'tel:' + clean);
      if (/^[0-9\s\-\/\+\(\)]+$/.test(a.textContent.trim()))
        a.textContent = newTel;
    });
  }

  function run() {
    if (firma) {
      var demoNames = ['Fischer Dachtechnik Stuttgart', 'Fischer Dachtechnik'];
      demoNames.forEach(function(n) { replaceInText(document.body, n, firma); });
      document.title = demoNames.reduce(function(t,n){ return t.split(n).join(firma); }, document.title);
    }
    if (stadt) {
      var demoCities = ['Stuttgart'];
      demoCities.forEach(function(c) { replaceInText(document.body, c, stadt); });
      document.title = demoCities.reduce(function(t,c){ return t.split(c).join(stadt); }, document.title);
    }
    // Logo direkt ersetzen – Text ist auf mehrere Nodes aufgeteilt
    if (firma) {
      var logoEl = document.querySelector('a.logo, a.navbar__logo, a.navbar-brand');
      if (logoEl) {
        var iconEl = logoEl.querySelector('i, .logo-icon, .navbar__logo-icon');
        var iconHTML = iconEl ? iconEl.outerHTML : '';
        logoEl.innerHTML = iconHTML + (iconHTML ? ' ' : '') + firma;
      }
    }
    if (telefon) {
      var demoPhones = ['0711 987654', '0711987654'];
      demoPhones.forEach(function(ph) { replaceInText(document.body, ph, telefon); });
      replaceTelLinks(telefon);
    }
    if (name) {
      var banner = document.getElementById('personalized-banner');
      var nameEl = document.getElementById('banner-name');
      if (banner && nameEl) {
        nameEl.textContent = name;
        banner.style.display = 'block';
        // Zu <html> verschieben – body overflow-x:hidden bricht sonst position:fixed
        if (banner.parentNode !== document.documentElement) {
          document.documentElement.appendChild(banner);
        }
        document.body.style.paddingTop = '50px';
      }
    }
  }

  // Script steht am Ende von <body> – DOM ist bereit
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
