"use strict";

var Slider = function () {
  var showPreviousSlide = function showPreviousSlide(sliderContent, sliderDotsContent) {
    var currentContentActiveIndex = 0;
    var currnetDotIndex = 0;

    for (var index = 0; index < sliderContent.length; index++) {
      var item = sliderContent[index];

      if (item.className.includes('active')) {
        currentContentActiveIndex = index;
      }
    }

    for (var _index = 0; _index < sliderDotsContent.length; _index++) {
      var _item = sliderDotsContent[_index];

      if (_item.className.includes('active')) {
        currnetDotIndex = _index;
      }
    }

    if (currentContentActiveIndex === 0) {
      return true;
    }

    sliderDotsContent[currnetDotIndex].classList.remove('active');
    sliderDotsContent[currnetDotIndex - 1].classList.add('active');
    sliderContent[currentContentActiveIndex].classList.remove('active');
    sliderContent[currentContentActiveIndex - 1].classList.add('active');
  };

  var showNextSlide = function showNextSlide(sliderContent, sliderDotsContent) {
    var currentContentActiveIndex = 0;
    var currnetDotIndex = 0;

    for (var index = 0; index < sliderContent.length; index++) {
      var item = sliderContent[index];

      if (item.className.includes('active')) {
        currentContentActiveIndex = index;
      }
    }

    for (var _index2 = 0; _index2 < sliderDotsContent.length; _index2++) {
      var _item2 = sliderDotsContent[_index2];

      if (_item2.className.includes('active')) {
        currnetDotIndex = _index2;
      }
    }

    if (currentContentActiveIndex === sliderContent.length - 1) {
      return true;
    }

    sliderDotsContent[currnetDotIndex].classList.remove('active');
    sliderDotsContent[currnetDotIndex + 1].classList.add('active');
    sliderContent[currentContentActiveIndex].classList.remove('active');
    sliderContent[currentContentActiveIndex + 1].classList.add('active');
  };

  var setSliderStartValues = function setSliderStartValues(sliderContent, sliderDotsContent) {
    for (var index = 0; index < sliderContent.length; index++) {
      var item = sliderContent[index];
      item.classList.remove('active');
    }

    for (var _index3 = 0; _index3 < sliderDotsContent.length; _index3++) {
      var _item3 = sliderDotsContent[_index3];

      _item3.classList.remove('active');
    }

    sliderDotsContent[0].classList.add('active');
    sliderContent[0].classList.add('active');
  };

  return function (slider) {
    var _this = this;

    this.slider = slider;
    this.sliderContent = slider.getElementsByClassName('slider-content-item');
    this.sliderDotsContent = null;
    this.previousButton = slider.getElementsByClassName('slider-previous-button')[0];
    this.nextButton = slider.getElementsByClassName('slider-next-button')[0];

    var renderDots = // Render dots
    function (slider) {
      var sliderDots = slider.getElementsByClassName('left')[0].getElementsByClassName('dots')[0];
      console.log(sliderDots, 'sldd');

      for (var index = 0; index < _this.sliderContent.length; index++) {
        if (index === 0) {
          sliderDots.innerHTML += '<div class="slider-dots active"></div>';
          continue;
        }

        sliderDots.innerHTML += '<div class="slider-dots"></div>';
      }
    }(this.slider);

    this.sliderDotsContent = slider.getElementsByClassName('slider-dots');
    var slideShow = setInterval(function () {
      var isEnd = showNextSlide(_this.sliderContent, _this.sliderDotsContent);

      if (isEnd) {
        setSliderStartValues(_this.sliderContent, _this.sliderDotsContent);
      }
    }, 3000);
    this.previousButton.addEventListener('click', function () {
      clearInterval(slideShow);
      showPreviousSlide(_this.sliderContent, _this.sliderDotsContent);
    });
    this.nextButton.addEventListener('click', function () {
      clearInterval(slideShow);
      showNextSlide(_this.sliderContent, _this.sliderDotsContent);
    });
  };
}();