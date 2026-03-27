const menuLinks = Array.from(document.querySelectorAll('.menu__link'));

menuLinks.forEach(link => {
  link.onclick = function () {
    const subMenu = link.parentElement.querySelector('.menu_sub');

    if (subMenu) {
      const currentMenu = link.closest('.menu');
      const activeSubMenus = currentMenu.querySelectorAll('.menu_sub.menu_active');

      activeSubMenus.forEach(menu => {
        if (menu !== subMenu) {
          menu.classList.remove('menu_active');
        }
      });

      subMenu.classList.toggle('menu_active');
      return false;
    }
  };
});