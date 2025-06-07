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

// ✅ Optimized GSAP quickTo tweens (no lag after scroll)
const quickHeroScale = gsap.quickTo(".hero-text", "scale", {
  duration: 0.3,
  ease: "power2.out"
});

const quickLogoScale = gsap.quickTo(".logo-center", "scale", {
  duration: 0.3,
  ease: "power2.out"
});

const quickLogoOpacity = gsap.quickTo(".logo-center", "opacity", {
  duration: 0.3,
  ease: "power2.out"
});

const quickNavbarY = gsap.quickTo(".navbar", "y", {
  duration: 0.05,
  ease: "power2.out"
});

const quickNavbarOpacity = gsap.quickTo(".navbar", "opacity", {
  duration: 0.05,
  ease: "power2.out"
});

// 🧠 Scroll logic
let ticking = false;

function handleScroll() {
  const scrollY = window.scrollY;

  // Shrink hero text scale from 1 to 0.5 smoothly
  const scaleValue = Math.max(1 - scrollY / 500, 0.5);
  quickHeroScale(scaleValue);

  // Zoom-in logo
  const logoStart = 100;
  const logoEnd = 300;
  let logoProgress = (scrollY - logoStart) / (logoEnd - logoStart);
  logoProgress = Math.min(Math.max(logoProgress, 0), 1);
  quickLogoScale(logoProgress);
  quickLogoOpacity(logoProgress);

  // Show/hide navbar instantly based on scale
  if (scaleValue <= 0.55) {
    quickNavbarY(0);
    quickNavbarOpacity(1);
  } else {
    quickNavbarY(-100);
    quickNavbarOpacity(0);
  }
}

// 🖱️ Optimized scroll listener
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});
