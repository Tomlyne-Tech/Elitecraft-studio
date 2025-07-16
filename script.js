// Toggle mobile menu
const toggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

toggle.addEventListener('click', () => {
  navbar.classList.toggle('show');
});


// Smooth scroll for hero button
document.querySelector('.hero-btn').addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
});