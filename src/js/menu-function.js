var consulta = window.matchMedia('(max-width: 575px)');
var $menuButton = document.getElementById('menu-button');
var $navbar = document.getElementById('navbar-container');

function toggleMenu() {
  $navbar.classList.toggle('hide');
}

function showMenu() {
  $navbar.classList.add('hide');
}

function hideMenu() {
  $navbar.classList.remove('hide');
}

consulta.addListener(mediaQuery);

function mediaQuery() {
  if (consulta.matches) {
    console.log("se cumplio la condicion");
    $menuButton.addEventListener('touchstart', toggleMenu);
  } else {
    console.log("no se cumplio la condicion");
    $menuButton.removeEventListener('touchstart', toggleMenu);
  }
}

mediaQuery();