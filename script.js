// ── Particle Canvas ──
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const NUM = 90;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function Particle() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.vx = (Math.random() - 0.5) * 0.4;
  this.vy = (Math.random() - 0.5) * 0.4;
  this.r = Math.random() * 2 + 0.5;
  this.alpha = Math.random() * 0.6 + 0.2;
}

for (let i = 0; i < NUM; i++) particles.push(new Particle());

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(34,211,238,${0.12 * (1 - dist / 140)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(34,211,238,${p.alpha})`;
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });
  requestAnimationFrame(draw);
}
draw();


// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () =>
  navbar.classList.toggle('scrolled', window.scrollY > 50)
);


// ── Hamburger menu toggle ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () =>
  navLinks.classList.toggle('open')
);


// ── Scroll-in animations ──
const obs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.08 }
);
document.querySelectorAll('.strength-card, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  obs.observe(el);
});


// ── Sticky Avatar — show after scrolling past hero ──
const stickyAvatar = document.getElementById('stickyAvatar');
const heroSection = document.getElementById('hero');
window.addEventListener('scroll', () => {
  if (window.scrollY > heroSection.offsetHeight - 100) {
    stickyAvatar.classList.add('visible');
  } else {
    stickyAvatar.classList.remove('visible');
  }
});


// ── Mouse Trail — blue-white particles following cursor ──
(function () {
  const tc = document.getElementById('mouseTrailCanvas');
  const tctx = tc.getContext('2d');
  let trail = [];
  const MAX_TRAIL = 35;

  function resizeTrail() {
    tc.width = window.innerWidth;
    tc.height = window.innerHeight;
  }
  resizeTrail();
  window.addEventListener('resize', resizeTrail);

  document.addEventListener('mousemove', e => {
    trail.push({
      x: e.clientX,
      y: e.clientY,
      life: 1.0,
      size: Math.random() * 4 + 2,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5
    });
    if (trail.length > MAX_TRAIL) trail.shift();
  });

  function drawTrail() {
    tctx.clearRect(0, 0, tc.width, tc.height);
    for (let i = trail.length - 1; i >= 0; i--) {
      const t = trail[i];
      t.life -= 0.025;
      t.x += t.vx;
      t.y += t.vy;
      t.size *= 0.97;
      if (t.life <= 0) {
        trail.splice(i, 1);
        continue;
      }
      const ratio = i / trail.length;
      const r = Math.round(34 + (255 - 34) * (1 - ratio));
      const g = Math.round(211 + (255 - 211) * (1 - ratio));
      const b = Math.round(238 + (255 - 238) * (1 - ratio));
      // particle
      tctx.beginPath();
      tctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
      tctx.fillStyle = `rgba(${r},${g},${b},${t.life * 0.6})`;
      tctx.fill();
      // glow
      tctx.beginPath();
      tctx.arc(t.x, t.y, t.size * 2.5, 0, Math.PI * 2);
      tctx.fillStyle = `rgba(${r},${g},${b},${t.life * 0.12})`;
      tctx.fill();
    }
    requestAnimationFrame(drawTrail);
  }
  drawTrail();
})();
