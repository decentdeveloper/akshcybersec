/* ============================================================
   AKSHAT AGARWAL PORTFOLIO — SCRIPT.JS
   Features: Loader, Canvas particles, Custom cursor, Terminal,
             Typed text, Scroll reveal, Skill bars, Mag buttons,
             Theme toggle, Mobile nav, Scroll progress
============================================================ */

/* ========================
   LOADER
======================== */
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('hidden');
  startHeroAnimations();
}

// Use DOMContentLoaded — does NOT wait for fonts/images (window load does, and hangs)
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(hideLoader, 1400);
});

// Nuclear fallback — fires no matter what after 2.5s
setTimeout(hideLoader, 2500);

/* ========================
   THEME
======================== */
function toggleTheme() {
  document.body.classList.toggle('light');
  document.getElementById('toggleIcon').textContent =
    document.body.classList.contains('light') ? '🌙' : '☀️';
}

/* ========================
   MOBILE NAV
======================== */
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  nav.classList.toggle('open');
}

/* ========================
   SCROLL PROGRESS
======================== */
window.addEventListener('scroll', () => {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const scrolled = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (scrolled / max) * 100;
  bar.style.width = pct + '%';
});

/* ========================
   NAV SHADOW ON SCROLL
======================== */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) {
    nav.style.background = window.scrollY > 40
      ? 'rgba(0,0,0,0.97)'
      : 'rgba(0,0,0,0.75)';
  }
});

/* ========================
   CUSTOM CURSOR
======================== */
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (!('ontouchstart' in window)) {
  cursor.style.opacity = '1';
  follower.style.opacity = '1';

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth follower
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover states
  document.querySelectorAll('a, button, .cert-card, .project-card, .contact-card, .badge-ring').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
} else {
  cursor.style.display = 'none';
  follower.style.display = 'none';
}

/* ========================
   HERO CANVAS — PARTICLES
======================== */
function startHeroAnimations() {
  try { initCanvas(); } catch(e) { console.warn('Canvas init failed:', e); }
  try { startTyping(); } catch(e) { console.warn('Typing init failed:', e); }
  try { initTerminal(); } catch(e) { console.warn('Terminal init failed:', e); }
}

function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initDrops(); });

  // MATRIX RAIN
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>/\\|[]{}';
  const fontSize = 14;
  let drops = [];

  function initDrops() {
    const cols = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: cols }, () => Math.random() * -canvas.height / fontSize);
  }
  initDrops();

  let mouseX = -9999, mouseY = -9999;
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function draw() {
    // Fade trail
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cols = drops.length;
    for (let i = 0; i < cols; i++) {
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Repulse around mouse
      const dx = x - mouseX, dy = y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        drops[i] -= 0.5;
        continue;
      }

      const char = chars[Math.floor(Math.random() * chars.length)];

      // Head of stream — bright white-green
      if (drops[i] * fontSize > 0 && drops[i] * fontSize < canvas.height) {
        ctx.fillStyle = '#ccffcc';
        ctx.shadowColor = '#00ff41';
        ctx.shadowBlur = 8;
        ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillText(char, x, y);

        // Body — standard green
        ctx.fillStyle = `rgba(0,${Math.floor(Math.random() * 100 + 155)},${Math.floor(Math.random()*40)},${0.3 + Math.random()*0.4})`;
        ctx.shadowBlur = 0;
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        if (drops[i] > 1) ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize);
      }

      ctx.shadowBlur = 0;

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.5;
    }

    requestAnimationFrame(draw);
  }
  draw();
}

/* ========================
   TYPED TEXT EFFECT
======================== */
const phrases = [
  'Building Secure Systems 🔒',
  'Penetration Testing Expert 🧨',
  'SQL DBA & ML Enthusiast 🧠',
  'Turning Vulnerabilities into Strengths 💪'
];

function startTyping() {
  const el = document.getElementById('typedText');
  if (!el) return;

  let pIdx = 0, cIdx = 0, deleting = false;
  el.innerHTML = '<span class="cursor-blink"></span>';

  function type() {
    const phrase = phrases[pIdx];

    if (!deleting && cIdx <= phrase.length) {
      el.innerHTML = phrase.slice(0, cIdx) + '<span class="cursor-blink"></span>';
      cIdx++;
      setTimeout(type, 60);
    } else if (!deleting && cIdx > phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
    } else if (deleting && cIdx > 0) {
      el.innerHTML = phrase.slice(0, cIdx - 1) + '<span class="cursor-blink"></span>';
      cIdx--;
      setTimeout(type, 35);
    } else {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      setTimeout(type, 400);
    }
  }
  type();
}

/* ========================
   TERMINAL ANIMATION
======================== */
function initTerminal() {
  const lines = [
    '$ whoami',
    '> akshat_agarwal',
    '$ cat skills.txt',
    '> SQL | Python | PenTest | ML',
    '$ nmap -sV localhost',
    '> [+] Port 443 open (https)',
    '> [+] Security: A+',
    '$ echo $STATUS',
    '> Available for opportunities ✅',
    '$ _'
  ];

  const el = document.getElementById('terminalOutput');
  if (!el) return;

  let i = 0;
  function nextLine() {
    if (i >= lines.length) return;
    const line = lines[i];
    const span = document.createElement('div');
    span.style.opacity = '0';
    span.style.transform = 'translateX(-8px)';
    span.style.transition = '0.3s ease';

    const isCmd = line.startsWith('$');
    span.style.color = isCmd ? '#ccffcc' : '#00ff41';
    if (line.startsWith('>')) span.style.color = '#39ff14';
    if (line === '$ _') span.style.animation = 'blink 1s step-end infinite';

    span.textContent = line;
    el.appendChild(span);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateX(0)';
      });
    });

    i++;
    setTimeout(nextLine, 280);
  }
  setTimeout(nextLine, 600);
}

/* ========================
   SCROLL REVEAL
======================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('visible'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Staggered cards
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const parent = entry.target.parentElement;
      const cards = parent.querySelectorAll('.reveal-card');
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 100);
      });
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.projects-grid, .cert-grid, .contact-grid').forEach(el => {
  cardObserver.observe(el);
});

/* ========================
   SKILL BAR ANIMATION
======================== */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const w = bar.dataset.width;
        setTimeout(() => { bar.style.width = w + '%'; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

/* ========================
   EXPLORE BUTTON
======================== */
document.getElementById('exploreBtn')?.addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

/* ========================
   CERT CARD MOBILE TAP
======================== */
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.cert-card').forEach(c => {
      if (c !== card) c.classList.remove('active');
    });
    card.classList.toggle('active');
  });
});

/* ========================
   MAGNETIC BUTTONS
======================== */
document.querySelectorAll('.mag-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ========================
   ACTIVE NAV LINK
======================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--c1)' : '';
  });
});
