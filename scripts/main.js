const header = document.querySelector('header');
const headerOverlay = document.querySelector('.header-overlay');

const headerOverlayAnimation = gsap.fromTo(
  headerOverlay,
  {
    display: 'none',
    opacity: 0,
  },
  {
    paused: true,
    display: 'block',
    opacity: 1,
    duration: 0.1,
  }
);

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
});

const navigationItems = document.querySelectorAll('.header-navigation-item');

for (let index = 0; index < navigationItems.length; index++) {
  const item = navigationItems[index];
  const subMenu = item.querySelector('.submenu');

  const navigationItemHoverAnim = gsap.fromTo(
    subMenu,
    {
      display: 'none',
      opacity: 0,
    },
    {
      paused: true,
      display: 'flex',
      opacity: 1,
      ease: 'ease',
      duration: 0.3,
    }
  );
  item.addEventListener('mouseenter', () => {
    navigationItemHoverAnim.play();
    headerOverlayAnimation.play();
  });
  item.addEventListener('mouseleave', () => {
    navigationItemHoverAnim.reverse();
    headerOverlayAnimation.reverse();
  });
}
