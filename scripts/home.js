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

const toggleCheck = document.getElementById('s5-toggle-check');
toggleCheck.addEventListener('click', (e) => {
  const industryContent = document.querySelector(
    `[data-s5-content="industry"]`
  );
  const usecaseContent = document.querySelector(`[data-s5-content="usecase"]`);
  const timeline = gsap.timeline();

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
        duration: 0.1,
      }
    );
  };

  const fadeOutAnimation = (item) => {
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
        duration: 0.1,
      }
    );
  };

  if (!toggleCheck.checked) {
    fadeOutAnimation(industryContent);
    industryContent.classList.remove('active');

    fadeInAnimation(usecaseContent);
    usecaseContent.classList.add('active');
  } else {
    fadeOutAnimation(usecaseContent);
    usecaseContent.classList.remove('active');

    fadeInAnimation(industryContent);
    industryContent.classList.add('active');
  }
});

const slider = document.querySelector('#homepage-s6-slider');
new Slider(slider);

const counters = document.querySelectorAll('#homepage-s3 .count-data');

const countersAnimation = gsap.from(counters, {
  textContent: 0,
  duration: 2,
  ease: 'power1.in',
  snap: { textContent: 1 },
});

ScrollTrigger.create({
  trigger: '#homepage-s3',
  start: 'top 80%',
  animation: countersAnimation,
});
