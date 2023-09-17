// ------------ cacheing DOM elemets ------------------------
const menuHamburgerButton = document.querySelector(".menu-bars");
const menuContainer = document.querySelector(".menu-overlay");
const menuButtons = menuContainer.querySelectorAll("a");

// ------------------ functions -----------------------------
function animateMenuButtons(from, to) {
  menuButtons.forEach((button, index) => {
    button.classList.replace(`button-slide-${from}-${index + 1}`, `button-slide-${to}-${index + 1}`);
  });
}

function toggleDisplay() {
  menuContainer.classList.toggle("active");

  if (menuContainer.classList.contains("active")) {
    menuContainer.classList.replace("overlay-slide-left", "overlay-slide-right");
    animateMenuButtons("left", "right");
  } else {
    menuContainer.classList.replace("overlay-slide-right", "overlay-slide-left");
    animateMenuButtons("right", "left");
  }
}

function menuHamburgerButtonPress() {
  // animate the hamburger button
  menuHamburgerButton.classList.toggle("change");

  // toggle the menu
  toggleDisplay();
}

// ------------------- events -------------------------------
menuHamburgerButton.addEventListener("click", menuHamburgerButtonPress);
menuButtons.forEach((item) => item.addEventListener("click", menuHamburgerButtonPress));
