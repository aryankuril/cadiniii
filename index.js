// 🧭 Smooth Scroll to Second Section
document.querySelector('.scroll-down').addEventListener('click', () => {
  document.querySelector('.section2').scrollIntoView({
    behavior: 'smooth'
  });
});

window.addEventListener("scroll", () => {
  const bg = document.getElementById("bg-section");
  const scrollY = window.scrollY;

  if (scrollY < window.innerHeight) {
    bg.style.backgroundImage = "url('img/1 section background.svg')";
  } else if (scrollY < window.innerHeight * 2) {
    bg.style.backgroundImage = "url('img/2 section background.svg')";
  } else {
    bg.style.backgroundImage = "url('img/3 section background.svg')";
  }
});

