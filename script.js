/**
 * script.js - Portfolio Interaction Logic
 * Antonio Rezario Solokana
 */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');

  // 1. Mobile Menu Toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
          }
        }
      });
    });
  }

  // 2. Active Link on Scroll & Navbar shadow
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    // Highlight active section
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 3. Fallback for placeholder images if offline
  const setupImageFallbacks = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('error', () => {
        const altText = encodeURIComponent(img.alt || 'Gambar Portofolio');
        img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="100%" height="100%" fill="%231e293b"/><text x="50%" y="50%" fill="%2394a3b8" font-family="sans-serif" font-size="16" text-anchor="middle" dominant-baseline="middle">${altText}</text></svg>`;
      });
    });
  };
  setupImageFallbacks();
});

// 4. Form Submit Handler
function handleFormSubmit() {
  const formAlert = document.getElementById('form-alert');
  const nama = document.getElementById('nama').value;
  const email = document.getElementById('email').value;

  if (formAlert) {
    formAlert.style.display = 'flex';
    formAlert.innerHTML = `<i class="fa-solid fa-circle-check"></i> Terima kasih <strong>${nama}</strong>! Pesan Anda telah terkirim (Simulasi). Kami akan menghubungi melalui ${email}.`;
    
    // Reset formulir
    document.getElementById('contact-form').reset();

    // Sembunyikan alert setelah 6 detik
    setTimeout(() => {
      formAlert.style.display = 'none';
    }, 6000);
  }
}
