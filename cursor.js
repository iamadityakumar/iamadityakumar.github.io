const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

const interactiveElements = document.querySelectorAll('a, button, .clickable');

interactiveElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.querySelector('.cursor-halo').style.transform = 'translate(-50%, -50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.querySelector('.cursor-halo').style.transform = 'translate(-50%, -50%) scale(1)';
  });
});
