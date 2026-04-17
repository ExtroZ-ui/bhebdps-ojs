const sliderItems = Array.from(document.querySelectorAll('.slider__item'));
const prevArrow = document.querySelector('.slider__arrow_prev');
const nextArrow = document.querySelector('.slider__arrow_next');
const sliderDots = Array.from(document.querySelectorAll('.slider__dot'));
let currentSlideIndex = 0;

function updateSlider() {
  sliderItems.forEach(function (slide) {
    slide.classList.remove('slider__item_active');
  });

  sliderDots.forEach(function (dot) {
    dot.classList.remove('slider__dot_active');
  });

  sliderItems[currentSlideIndex].classList.add('slider__item_active');

  if (sliderDots.length > 0) {
    sliderDots[currentSlideIndex].classList.add('slider__dot_active');
  }
}

function showNextSlide() {
  currentSlideIndex += 1;

  if (currentSlideIndex >= sliderItems.length) {
    currentSlideIndex = 0;
  }

  updateSlider();
}

function showPrevSlide() {
  currentSlideIndex -= 1;

  if (currentSlideIndex < 0) {
    currentSlideIndex = sliderItems.length - 1;
  }

  updateSlider();
}

function goToSlide(event) {
  const clickedDot = event.currentTarget;
  currentSlideIndex = sliderDots.indexOf(clickedDot);
  updateSlider();
}

function initArrows() {
  prevArrow.addEventListener('click', showPrevSlide);
  nextArrow.addEventListener('click', showNextSlide);
}

function initDots() {
  sliderDots.forEach(function (dot) {
    dot.addEventListener('click', goToSlide);
  });
}

function initSlider() {
  updateSlider();
  initArrows();
  initDots();
}

initSlider();