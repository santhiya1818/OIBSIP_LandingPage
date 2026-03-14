/* =============================================
   LUMARA LANDING PAGE — script.js
   ============================================= */

/* --- NAVBAR: Add shadow on scroll --- */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});


/* --- SCROLL REVEAL ANIMATION --- */
const revealElements = document.querySelectorAll(
  '.service-card, .work-card, .testimonial-card, .stat-item, .about-text, .about-image'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// Apply revealed state
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.revealed').forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
});

// Override revealed class in JS (since we set inline styles)
const style = document.createElement('style');
style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);


/* --- CONTACT FORM: Basic validation & feedback --- */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate async submission
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#4caf84';
      btn.style.borderColor = '#4caf84';

      contactForm.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 3000);
    }, 1400);
  });
}


/* --- SMOOTH ACTIVE LINK HIGHLIGHT in Navbar --- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--ink)';
      link.style.fontWeight = '500';
    } else {
      link.style.fontWeight = '400';
    }
  });
});


/* --- STAGGER SERVICE CARDS on reveal --- */
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});

document.querySelectorAll('.work-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});
