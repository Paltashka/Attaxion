window.onload = () => {
  document.body.className = '';
};

const tabMenu = document.querySelector('.tab-menu');
const contentBlock = document.getElementById('s2-content-block');

tabMenu.addEventListener('click', (e) => {
  if (e.target.className === 'tab-menu') {
    return;
  }

  for (const tab of tabMenu.children) {
    tab.classList.remove('active');
  }
  e.target.classList.add('active');

  const selectedTabName = e.target.dataset.s2TabName;

  for (const item of contentBlock.children) {
    item.classList.remove('active');
  }

  const contentToBeDisplayed = document.querySelector(
    `[data-s2-tab-content="${selectedTabName}"]`
  );
  contentToBeDisplayed.classList.add('active');
});

const toggleMenu = document.getElementById('s5-toggle-menu');
toggleMenu.addEventListener('click', (e) => {
  const industryContent = document.querySelector(
    `[data-s5-content="industry"]`
  );
  const usecaseContent = document.querySelector(`[data-s5-content="usecase"]`);

  if (toggleMenu.className.includes('active')) {
    toggleMenu.classList.remove('active');
    industryContent.classList.remove('active');

    usecaseContent.classList.add('active');
  } else {
    toggleMenu.classList.add('active');
    usecaseContent.classList.remove('active');

    industryContent.classList.add('active');
  }
});

const sliderContent = document.querySelectorAll('.slider-content-item');

document.getElementById('s6-slider-preview').addEventListener('click', () => {
  let currentActiveIndex = 0;
  sliderContent.forEach((item, index) => {
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

document.getElementById('s6-slider-next').addEventListener('click', (e) => {
  let currentActiveIndex = 0;
  sliderContent.forEach((item, index) => {
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
