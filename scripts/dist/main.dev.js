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