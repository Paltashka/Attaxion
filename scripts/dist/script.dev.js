"use strict";

window.onload = function () {
  document.body.className = '';
};

var tabMenu = document.querySelector('.tab-menu');
var contentBlock = document.getElementById('s2-content-block');
tabMenu.addEventListener('click', function (e) {
  if (e.target.className === 'tab-menu') {
    return;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = tabMenu.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var tab = _step.value;
      tab.classList.remove('active');
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  e.target.classList.add('active');
  var selectedTabName = e.target.dataset.s2TabName;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = contentBlock.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;
      item.classList.remove('active');
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var contentToBeDisplayed = document.querySelector("[data-s2-tab-content=\"".concat(selectedTabName, "\"]"));
  contentToBeDisplayed.classList.add('active');
});
var toggleCheck = document.getElementById('s5-toggle-check');
toggleCheck.addEventListener('click', function (e) {
  var industryContent = document.querySelector("[data-s5-content=\"industry\"]");
  var usecaseContent = document.querySelector("[data-s5-content=\"usecase\"]");

  if (!toggleCheck.checked) {
    industryContent.classList.remove('active');
    usecaseContent.classList.add('active');
  } else {
    usecaseContent.classList.remove('active');
    industryContent.classList.add('active');
  }
});
var sliderContent = document.querySelectorAll('.slider-content-item');
document.getElementById('s6-slider-preview').addEventListener('click', function () {
  var currentActiveIndex = 0;
  sliderContent.forEach(function (item, index) {
    if (item.className.includes('active')) {
      currentActiveIndex = index;
    }
  });

  if (currentActiveIndex === 0) {
    return;
  }

  sliderContent[currentActiveIndex].classList.remove('active');
  sliderContent[currentActiveIndex - 1].classList.add('active');
});
document.getElementById('s6-slider-next').addEventListener('click', function (e) {
  var currentActiveIndex = 0;
  sliderContent.forEach(function (item, index) {
    if (item.className.includes('active')) {
      currentActiveIndex = index;
    }
  });

  if (currentActiveIndex === sliderContent.length - 1) {
    return;
  }

  sliderContent[currentActiveIndex].classList.remove('active');
  sliderContent[currentActiveIndex + 1].classList.add('active');
});
var counters = document.querySelectorAll('#homepage-s3 .count-data');
var countersAnimation = gsap.from(counters, {
  textContent: 0,
  duration: 2,
  ease: 'power1.in',
  snap: {
    textContent: 1
  }
});
ScrollTrigger.create({
  trigger: '#homepage-s3',
  start: 'top 80%',
  animation: countersAnimation
});