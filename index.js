// 🧭 Smooth Scroll to Second Section
document.querySelector('.scroll-down').addEventListener('click', () => {
  document.querySelector('.secondsection').scrollIntoView({
    behavior: 'smooth'
  });
});

// 🔒 Initial state
gsap.set(".logo-center", { scale: 0, opacity: 0 });
gsap.set(".navbar", { y: -100, opacity: 0 });

// 📏 Track section positions
let heroTopAbs, secondTopAbs, heroHeight, secondHeight;

function updateSectionPositions() {
  const hero = document.querySelector(".hero");
  const secondSection = document.querySelector(".secondsection");

  heroTopAbs = hero.offsetTop;
  secondTopAbs = secondSection.offsetTop;
  heroHeight = hero.offsetHeight;
  secondHeight = secondSection.offsetHeight;
}

updateSectionPositions();
window.addEventListener("resize", updateSectionPositions);

// ✅ Fast update tweens (no lag after scroll)
const scaleHeroText = gsap.quickTo(".hero-text", "scale", {
  duration: 0.1,
  ease: "none"
});

const scaleLogo = gsap.quickTo(".logo-center", "scale", {
  duration: 0.1,
  ease: "none"
});

const opacityLogo = gsap.quickTo(".logo-center", "opacity", {
  duration: 0.1,
  ease: "none"
});

const moveNavbarY = gsap.quickTo(".navbar", "y", {
  duration: 0.1,
  ease: "none"
});

const fadeNavbar = gsap.quickTo(".navbar", "opacity", {
  duration: 0.1,
  ease: "none"
});

// 🧠 Scroll logic
let ticking = false;

function handleScroll() {
  const scrollY = window.scrollY;

  // Scale hero text
  const scaleVal = Math.max(1 - scrollY / 500, 0.5);
  scaleHeroText(scaleVal);

  // Zoom-in logo between scroll 100 and 300
  const logoStart = 100;
  const logoEnd = 300;
  let logoProgress = (scrollY - logoStart) / (logoEnd - logoStart);
  logoProgress = Math.min(Math.max(logoProgress, 0), 1);
  scaleLogo(logoProgress);
  opacityLogo(logoProgress);

  // Show/hide navbar
  if (scaleVal <= 0.55) {
    moveNavbarY(0);
    fadeNavbar(1);
  } else {
    moveNavbarY(-100);
    fadeNavbar(0);
  }
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});
