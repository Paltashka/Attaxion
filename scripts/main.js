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

const mobileMenuTimeline = gsap.timeline();
const mobileMenuFadeInAnimation = () => {
  mobileMenuTimeline.fromTo(
    mobileMenu,
    {
      display: 'none',
      opacity: 0,
      y: 300,
    },
    {
      display: 'block',
      y: 0,
      opacity: 1,
      ease: 'ease',
      duration: 0.3,
    }
  );
  mobileMenuTimeline.fromTo(
    headerNavigationMobileButton,
    {
      display: 'none',
      opacity: 0,
      y: 20,
    },
    {
      display: 'block',
      opacity: 1,
      y: 0,
      ease: 'ease',
      duration: 0.2,
    }
  );
};

const mobileMenuFadeOutAnimation = () => {
  mobileMenuTimeline.fromTo(
    mobileMenu,
    {
      display: 'block',
      opacity: 1,
      y: 0,
    },
    {
      display: 'none',
      y: 200,
      opacity: 0,
      ease: 'ease',
      duration: 0.3,
    }
  );
};

const submenuFadeInAnimation = (item) => {
  gsap.fromTo(
    item,
    {
      display: 'none',
      opacity: 0,
      x: 200,
    },
    {
      display: 'flex',
      x: 0,
      opacity: 1,
      ease: 'ease',
      duration: 0.3,
    }
  );
};

const submenuFadeOutAnimation = (item) => {
  gsap.fromTo(
    item,
    {
      display: 'flex',
      opacity: 1,
      x: 0,
    },
    {
      display: 'none',
      x: '100%',
      opacity: 0,
      ease: 'ease',
      duration: 0.3,
    }
  );
};

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

const headerMobile = document.querySelector('.header-mobile');
const mobileMenu = document.querySelector('.mobile-menu');
const burgerMenu = document.getElementById('menu-toggle-check');
const headerNavigationMobileButton =
  headerMobile.querySelector('.button-block');

burgerMenu.addEventListener('click', (e) => {
  if (burgerMenu.checked) {
    header.classList.add('menu-opened');
    headerNavigationMobileButton.style.display = 'block';
    mobileMenuFadeInAnimation();
  } else {
    header.classList.remove('menu-opened');
    headerNavigationMobileButton.style.display = 'none';
    mobileMenuFadeOutAnimation();
  }
});

const mobileSubmenu = document.querySelector('.mobile-submenu');
const headerNavigationItemMobileList = document.querySelectorAll(
  '.header-navigation-item-mobile'
);

for (let index = 0; index < headerNavigationItemMobileList.length; index++) {
  const item = headerNavigationItemMobileList[index];
  item.addEventListener('click', (e) => {
    const menuItemName = item.dataset.menuItem;
    const submenuToOpen = document.querySelector(
      `[data-submenu-item="${menuItemName}"]`
    );
    if (submenuToOpen) {
      const goBack = submenuToOpen.querySelector('.go-back');
      submenuFadeInAnimation(mobileSubmenu);
      headerNavigationMobileButton.classList.add('submenu-opened');
      submenuToOpen.style.display = 'block';

      goBack.onclick = () => {
        submenuFadeOutAnimation(mobileSubmenu);
        headerNavigationMobileButton.classList.remove('submenu-opened');
        submenuToOpen.style.display = 'none';
      };
    }
  });
}
