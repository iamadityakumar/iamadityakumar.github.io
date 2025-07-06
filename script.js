window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  preloader.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500);
});

window.onload = function () {
  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    document.getElementById('mobile-warning').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
};


document.addEventListener("DOMContentLoaded", () => {
  const words = ["Code", "Program", "Develop", "Design", "Solve"];
  const gibberish = "@#$%!*&";
  const target = document.getElementById("animated-text");

  let wordIndex = 0;
  let revealLength = 0;
  let deleting = false;

  function randomChar() {
    return gibberish[Math.floor(Math.random() * gibberish.length)];
  }

  function animateWord() {
    const word = words[wordIndex];
    let displayText = "";

    for (let i = 0; i < word.length; i++) {
      if (i < revealLength) {
        displayText += word[i];
      } else {
        displayText += randomChar();
      }
    }

    target.textContent = displayText;

    if (!deleting && revealLength < word.length) {
      revealLength++;
      setTimeout(animateWord, 100);
    } else if (!deleting && revealLength === word.length) {
      // Wait before starting to delete
      setTimeout(() => {
        deleting = true;
        animateWord();
      }, 1200);
    } else if (deleting && revealLength > 0) {
      revealLength--;
      setTimeout(animateWord, 60);
    } else if (deleting && revealLength === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(animateWord, 300);
    }
  }

  animateWord();
});
document.querySelectorAll('.cta-button').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
    btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

const links = document.querySelectorAll('.nav-links a');

links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
});
// Create an observer
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
      
    });
  },
  {
    root: null,
    rootMargin: '0px',
    threshold: 0.6 // Trigger when 60% of section is visible
  }
);

// Observe each section
sections.forEach(section => observer.observe(section));
const fadeElement = document.querySelector('.scroll-fade');
  const revealOnScroll = () => {
    const top = fadeElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 100) {
      fadeElement.classList.add('visible');
    }
  };
  window.addEventListener('scroll', revealOnScroll);


const heading = document.querySelector('.glass-heading');

heading.addEventListener('mousemove', (e) => {
  const rect = heading.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  heading.style.setProperty('--mouse-x', `${x - 125}px`);
  heading.style.setProperty('--mouse-y', `${y - 125}px`);
});

heading.addEventListener('mouseleave', () => {
  heading.style.setProperty('--mouse-x', `-150px`);
  heading.style.setProperty('--mouse-y', `-150px`);
});


const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x - 175}px`);
    card.style.setProperty('--mouse-y', `${y - 175}px`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--mouse-x', `-200px`);
    card.style.setProperty('--mouse-y', `-200px`);
  });
});


const connector = document.querySelector('.connector-line');

const glowObserver = new IntersectionObserver(entries => {
  const isVisible = entries.some(entry => entry.isIntersecting);
  connector.style.background = isVisible
    ? 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.5))'
    : 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.15))';
}, {
  threshold: 0.1
});

cards.forEach(card => glowObserver.observe(card));




  document.querySelectorAll('.project-window').forEach(windowEl => {
    const handle = windowEl.querySelector('.window-bar');
    let isDragging = false, offsetX = 0, offsetY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - windowEl.getBoundingClientRect().left;
      offsetY = e.clientY - windowEl.getBoundingClientRect().top;
      windowEl.style.position = 'absolute';
      windowEl.style.zIndex = 1000;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      windowEl.style.left = `${e.clientX - offsetX}px`;
      windowEl.style.top = `${e.clientY - offsetY}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    handle.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  const windows = document.querySelectorAll('.project-window');
let z = 1000;
windows.forEach(win => {
  win.addEventListener('mousedown', () => {
    win.style.zIndex = ++z;
  });
});

// Fullscreen button (green dot)
  document.querySelectorAll('.dot.green').forEach(button => {
    button.addEventListener('click', (e) => {
      const windowEl = e.target.closest('.project-window');
      windowEl.classList.toggle('fullscreen');
    });
  });


  function updateClock() {
    const clockEl = document.getElementById("clock");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}`;
  }

  setInterval(updateClock, 1000);
  updateClock();


let currentStep = 0;
const outputs = [];

document.addEventListener("DOMContentLoaded", () => {
  outputs.push(...document.querySelectorAll(".output"));
 

  window.addEventListener("scroll", () => {
    const terminal = document.querySelector(".terminal");
    const terminalTop = terminal.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;

    if (terminalTop < viewportHeight / 2) {
      const newStep = Math.min(
        Math.floor((viewportHeight / 2 - terminalTop) / 100),
        outputs.length
      );
      updateSteps(newStep);
    }
  });
});

// skills
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', `-300px`);
      card.style.setProperty('--mouse-y', `-300px`);
    });
  });




  // Experience
 document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
});

const canvas = document.getElementById('stripe-background');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.getElementById('experience').offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class AnimatedLine {
  constructor() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    this.p0 = { x, y };
    this.p1 = { x: x + (Math.random() - 0.5) * 200, y: y + 100 };
    this.p2 = { x: x + (Math.random() - 0.5) * 300, y: y + 200 };
    this.p3 = { x: x + (Math.random() - 0.5) * 300, y: y + 300 };

    this.t_start = 0;
    this.t_end = 0;
    this.draw_speed = 0.001 + Math.random() * 0.002; // slower speed
    this.fade_speed = 0.001; // tail fade speed
    this.opacity = 0.06 + Math.random() * 0.08;
    this.maxWidth = 0.7 + Math.random(); // dynamic max width
    this.glow = 8 + Math.random() * 16;
    this.alive = true;
  }

  getBezierPoint(t) {
    const { p0, p1, p2, p3 } = this;
    const x = Math.pow(1 - t, 3) * p0.x +
              3 * Math.pow(1 - t, 2) * t * p1.x +
              3 * (1 - t) * Math.pow(t, 2) * p2.x +
              Math.pow(t, 3) * p3.x;
    const y = Math.pow(1 - t, 3) * p0.y +
              3 * Math.pow(1 - t, 2) * t * p1.y +
              3 * (1 - t) * Math.pow(t, 2) * p2.y +
              Math.pow(t, 3) * p3.y;
    return { x, y };
  }

  update() {
    this.t_end += this.draw_speed;
    if (this.t_end >= 0.5) {
      this.t_start += this.fade_speed;
    }

    if (this.t_start >= 1) this.alive = false;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();

    const step = 0.01;
    for (let t = this.t_start; t <= this.t_end && t <= 1; t += step) {
      const p = this.getBezierPoint(t);
      if (t === this.t_start) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }

    const midT = (this.t_start + this.t_end) / 2;
    const peak = 1 - 4 * Math.pow(midT - 0.5, 2); // bell curve
    const dynamicWidth = this.maxWidth * peak;

    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.lineWidth = dynamicWidth;
    ctx.shadowBlur = this.glow;
    ctx.shadowColor = 'white';
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();
  }
}

const lines = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.05) { // fewer lines to keep it elegant
    lines.push(new AnimatedLine());
  }

  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    line.update();
    line.draw(ctx);
    if (!line.alive) lines.splice(i, 1);
  }

  requestAnimationFrame(animate);
}

animate();


const container = document.querySelector('.contact-form-container');
container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  container.style.setProperty('--mouse-x', `${x}px`);
  container.style.setProperty('--mouse-y', `${y}px`);
  container.querySelector('::before')?.style.setProperty('top', `${y}px`);
  container.querySelector('::before')?.style.setProperty('left', `${x}px`);
});

const form = document.querySelector('.contact-form');
const thankYou = document.querySelector('.thank-you-message');
const pulse = document.querySelector('.pulse-circle');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Trigger pulse animation
  pulse.classList.remove('pulse-animate');
  void pulse.offsetWidth; // Reset animation
  pulse.classList.add('pulse-animate');

  // Fade out form
  form.classList.add('fade-out');

  // Delay and show thank you message
  setTimeout(() => {
    form.style.display = 'none';
    thankYou.classList.add('visible');
  }, 500);
});


const glow = document.createElement('div');
glow.classList.add('pointer-glow');
container.appendChild(glow);

container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  glow.style.top = `${y}px`;
  glow.style.left = `${x}px`;
});




  