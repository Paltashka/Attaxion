"use strict";

var header = document.querySelector('header');
var headerOverlay = document.querySelector('.header-overlay');
var headerOverlayAnimation = gsap.fromTo(headerOverlay, {
  display: 'none',
  opacity: 0
}, {
  paused: true,
  display: 'block',
  opacity: 1,
  duration: 0.1
});
var mobileMenuTimeline = gsap.timeline();

var mobileMenuFadeInAnimation = function mobileMenuFadeInAnimation() {
  mobileMenuTimeline.fromTo(mobileMenu, {
    display: 'none',
    opacity: 0,
    y: 300
  }, {
    display: 'block',
    y: 0,
    opacity: 1,
    ease: 'ease',
    duration: 0.3
  });
  mobileMenuTimeline.fromTo(headerNavigationMobileButton, {
    display: 'none',
    opacity: 0,
    y: 20
  }, {
    display: 'block',
    opacity: 1,
    y: 0,
    ease: 'ease',
    duration: 0.2
  });
};

var mobileMenuFadeOutAnimation = function mobileMenuFadeOutAnimation() {
  mobileMenuTimeline.fromTo(mobileMenu, {
    display: 'block',
    opacity: 1,
    y: 0
  }, {
    display: 'none',
    y: 200,
    opacity: 0,
    ease: 'ease',
    duration: 0.3
  });
};

var submenuFadeInAnimation = function submenuFadeInAnimation(item) {
  gsap.fromTo(item, {
    display: 'none',
    opacity: 0,
    x: 200
  }, {
    display: 'flex',
    x: 0,
    opacity: 1,
    ease: 'ease',
    duration: 0.3
  });
};

var submenuFadeOutAnimation = function submenuFadeOutAnimation(item) {
  gsap.fromTo(item, {
    display: 'flex',
    opacity: 1,
    x: 0
  }, {
    display: 'none',
    x: '100%',
    opacity: 0,
    ease: 'ease',
    duration: 0.3
  });
};

window.addEventListener('scroll', function () {
  if (window.scrollY > 20) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
});
var navigationItems = document.querySelectorAll('.header-navigation-item');

var _loop = function _loop(index) {
  var item = navigationItems[index];
  var subMenu = item.querySelector('.submenu');
  var navigationItemHoverAnim = gsap.fromTo(subMenu, {
    display: 'none',
    opacity: 0
  }, {
    paused: true,
    display: 'flex',
    opacity: 1,
    ease: 'ease',
    duration: 0.3
  });
  item.addEventListener('mouseenter', function () {
    navigationItemHoverAnim.play();
    headerOverlayAnimation.play();
  });
  item.addEventListener('mouseleave', function () {
    navigationItemHoverAnim.reverse();
    headerOverlayAnimation.reverse();
  });
};

for (var index = 0; index < navigationItems.length; index++) {
  _loop(index);
}

var headerMobile = document.querySelector('.header-mobile');
var mobileMenu = document.querySelector('.mobile-menu');
var burgerMenu = document.getElementById('menu-toggle-check');
var headerNavigationMobileButton = headerMobile.querySelector('.button-block');
burgerMenu.addEventListener('click', function (e) {
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
var mobileSubmenu = document.querySelector('.mobile-submenu');
var headerNavigationItemMobileList = document.querySelectorAll('.header-navigation-item-mobile');

var _loop2 = function _loop2(_index) {
  var item = headerNavigationItemMobileList[_index];
  item.addEventListener('click', function (e) {
    var menuItemName = item.dataset.menuItem;
    var submenuToOpen = document.querySelector("[data-submenu-item=\"".concat(menuItemName, "\"]"));

    if (submenuToOpen) {
      var goBack = submenuToOpen.querySelector('.go-back');
      submenuFadeInAnimation(mobileSubmenu);
      headerNavigationMobileButton.classList.add('submenu-opened');
      submenuToOpen.style.display = 'block';

      goBack.onclick = function () {
        submenuFadeOutAnimation(mobileSubmenu);
        headerNavigationMobileButton.classList.remove('submenu-opened');
        submenuToOpen.style.display = 'none';
      };
    }
  });
};

for (var _index = 0; _index < headerNavigationItemMobileList.length; _index++) {
  _loop2(_index);
}