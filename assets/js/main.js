function carouselMove(id, dir) {
  const carousel = document.getElementById(id);
  if (!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const slides = track.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  let current = Array.from(slides).findIndex(s => s.classList.contains('active'));
  if (current === -1) current = 0;
  slides[current].classList.remove('active');
  if (dots[current]) dots[current].classList.remove('active');
  current = (current + dir + slides.length) % slides.length;
  slides[current].classList.add('active');
  if (dots[current]) dots[current].classList.add('active');
}

function carouselGoto(id, index) {
  const carousel = document.getElementById(id);
  if (!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const slides = track.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}
