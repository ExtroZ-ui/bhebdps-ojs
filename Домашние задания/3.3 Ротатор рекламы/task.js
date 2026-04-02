const rotators = Array.from(document.querySelectorAll('.rotator'));

rotators.forEach((rotator) => {
  const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
  let currentIndex = cases.findIndex((item) =>
    item.classList.contains('rotator__case_active')
  );

  if (currentIndex === -1) {
    currentIndex = 0;
    cases[0].classList.add('rotator__case_active');
  }

  function rotate() {
    cases[currentIndex].classList.remove('rotator__case_active');

    currentIndex += 1;
    if (currentIndex >= cases.length) {
      currentIndex = 0;
    }

    const activeCase = cases[currentIndex];
    activeCase.classList.add('rotator__case_active');

    if (activeCase.dataset.color) {
      activeCase.style.color = activeCase.dataset.color;
    } else {
      activeCase.style.color = '';
    }

    const speed = Number(activeCase.dataset.speed) || 1000;
    setTimeout(rotate, speed);
  }

  const initialCase = cases[currentIndex];

  if (initialCase.dataset.color) {
    initialCase.style.color = initialCase.dataset.color;
  }

  const initialSpeed = Number(initialCase.dataset.speed) || 1000;
  setTimeout(rotate, initialSpeed);
});