const Slider = (function () {
  const timeline = gsap.timeline();

  const fadeInAnimationSwipe = (item, direction) => {
    timeline.fromTo(
      item,
      {
        display: 'none',
        opacity: 0,
        x: direction === 'left' ? 50 : -50,
      },
      {
        display: 'flex',
        opacity: 1,
        ease: 'ease',
        duration: 0.3,
        x: 0,
      }
    );
  };

  const fadeOutAnimationSwipe = (item, direction) => {
    timeline.fromTo(
      item,
      {
        display: 'flex',
        opacity: 1,
        x: 0,
      },
      {
        display: 'none',
        opacity: 0,
        ease: 'ease',
        duration: 0.3,
        x: direction === 'left' ? -50 : 50,
      }
    );
  };

  const fadeInAnimation = (item) => {
    timeline.fromTo(
      item,
      {
        display: 'none',
        opacity: 0,
      },
      {
        display: 'flex',
        opacity: 1,
        ease: 'ease',
        duration: 0.3,
      }
    );
  };

  const fadeOutAnimation = (item, onCompleteCallback) => {
    timeline.fromTo(
      item,
      {
        display: 'flex',
        opacity: 1,
      },
      {
        display: 'none',
        opacity: 0,
        ease: 'ease',
        duration: 0.3,
        onComplete: onCompleteCallback ? () => onCompleteCallback() : undefined,
      }
    );
  };

  const showPreviousSlide = (
    sliderContent,
    sliderDotsContent,
    swipeDirection
  ) => {
    let currentContentActiveIndex = 0;
    let currentDotIndex = 0;

    for (let index = 0; index < sliderContent.length; index++) {
      const item = sliderContent[index];
      if (item.className.includes('active')) {
        currentContentActiveIndex = index;
      }
    }

    for (let index = 0; index < sliderDotsContent.length; index++) {
      const item = sliderDotsContent[index];
      if (item.className.includes('active')) {
        currentDotIndex = index;
      }
    }

    if (currentContentActiveIndex === 0) {
      return true;
    }

    sliderDotsContent[currentDotIndex].classList.remove('active');
    sliderDotsContent[currentDotIndex - 1].classList.add('active');

    if (!swipeDirection) {
      fadeOutAnimation(sliderContent[currentContentActiveIndex]);
    } else {
      fadeOutAnimationSwipe(
        sliderContent[currentContentActiveIndex],
        swipeDirection
      );
    }

    sliderContent[currentContentActiveIndex].classList.remove('active');

    if (!swipeDirection) {
      fadeInAnimation(sliderContent[currentContentActiveIndex - 1]);
    } else {
      fadeInAnimationSwipe(
        sliderContent[currentContentActiveIndex - 1],
        swipeDirection
      );
    }
    sliderContent[currentContentActiveIndex - 1].classList.add('active');
  };

  const showNextSlide = (sliderContent, sliderDotsContent, swipeDirection) => {
    let currentContentActiveIndex = 0;
    let currentDotIndex = 0;

    for (let index = 0; index < sliderContent.length; index++) {
      const item = sliderContent[index];
      if (item.className.includes('active')) {
        currentContentActiveIndex = index;
      }
    }

    for (let index = 0; index < sliderDotsContent.length; index++) {
      const item = sliderDotsContent[index];
      if (item.className.includes('active')) {
        currentDotIndex = index;
      }
    }

    if (currentContentActiveIndex === sliderContent.length - 1) {
      return true;
    }

    sliderDotsContent[currentDotIndex].classList.remove('active');
    sliderDotsContent[currentDotIndex + 1].classList.add('active');

    if (!swipeDirection) {
      fadeOutAnimation(sliderContent[currentContentActiveIndex]);
    } else {
      fadeOutAnimationSwipe(
        sliderContent[currentContentActiveIndex],
        swipeDirection
      );
    }
    sliderContent[currentContentActiveIndex].classList.remove('active');

    if (!swipeDirection) {
      fadeInAnimation(sliderContent[currentContentActiveIndex + 1]);
    } else {
      fadeInAnimationSwipe(
        sliderContent[currentContentActiveIndex + 1],
        swipeDirection
      );
    }
    sliderContent[currentContentActiveIndex + 1].classList.add('active');
  };

  const setSliderStartValues = (sliderContent, sliderDotsContent) => {
    for (let index = 0; index < sliderContent.length; index++) {
      const item = sliderContent[index];
      item.classList.remove('active');
    }

    for (let index = 0; index < sliderDotsContent.length; index++) {
      const item = sliderDotsContent[index];
      item.classList.remove('active');
    }

    sliderDotsContent[0].classList.add('active');

    fadeInAnimation(sliderContent[0]);
    sliderContent[0].classList.add('active');
  };

  return function (slider) {
    this.slider = slider;
    this.sliderContent = slider.getElementsByClassName('slider-content-item');
    this.sliderDotsContent = null;
    this.startX = 0;
    this.swapDirection = null;

    this.previousButton = slider.getElementsByClassName(
      'slider-previous-button'
    )[0];
    this.nextButton = slider.getElementsByClassName('slider-next-button')[0];

    const renderDots = ((slider) => {
      const sliderDots = slider.getElementsByClassName('dots')[0];
      for (let index = 0; index < this.sliderContent.length; index++) {
        if (index === 0) {
          sliderDots.innerHTML += '<div class="slider-dots active"></div>';
          continue;
        }

        sliderDots.innerHTML += '<div class="slider-dots"></div>';
      }
    })(this.slider);

    this.sliderDotsContent = slider.getElementsByClassName('slider-dots');

    let slideShow = setInterval(async () => {
      const isEnd = showNextSlide(this.sliderContent, this.sliderDotsContent);
      if (isEnd) {
        fadeOutAnimation(
          this.sliderContent[this.sliderContent.length - 1],
          () => setSliderStartValues(this.sliderContent, this.sliderDotsContent)
        );
      }
    }, 3000);

    this.previousButton.addEventListener('click', () => {
      clearInterval(slideShow);
      showPreviousSlide(this.sliderContent, this.sliderDotsContent);
    });

    this.nextButton.addEventListener('click', () => {
      clearInterval(slideShow);
      showNextSlide(this.sliderContent, this.sliderDotsContent);
    });

    this.slider.addEventListener('touchstart', (e) => {
      this.startX = e.touches[0].clientX;
    });

    this.slider.addEventListener('touchmove', (e) => {
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - this.startX;

      if (deltaX > 50) {
        this.swapDirection = 'right';
      } else if (deltaX < -50) {
        this.swapDirection = 'left';
        return false;
      }
    });

    this.slider.addEventListener('touchend', () => {
      this.startX = null;
      clearInterval(slideShow);

      if (this.swapDirection === 'left') {
        showNextSlide(
          this.sliderContent,
          this.sliderDotsContent,
          this.swapDirection
        );
      } else if (this.swapDirection === 'right') {
        showPreviousSlide(
          this.sliderContent,
          this.sliderDotsContent,
          this.swapDirection
        );
      } else {
        return;
      }
      this.swapDirection = null;
    });
  };
})();
