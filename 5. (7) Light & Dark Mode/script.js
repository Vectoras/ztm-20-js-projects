const changeThemeButton = document.getElementById("color-switch-checkbox");
const themeModeDisplayArea = document.getElementById("color-mode");
const svgColor = document.getElementsByClassName("svg-main-color");

// functions
let updateColorOnSvg = (color) => {
  for (let i = 0; i < svgColor.length; i++) {
    console.log(svgColor[i]);
    svgColor[i].setAttribute("fill", color);
  }
};

let changeTheme = (theme) => {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-color-mode", "dark");
    themeModeDisplayArea.textContent = "Dark Mode";
    console.log(svgColor);
    updateColorOnSvg("#009c99");
  } else {
    document.documentElement.removeAttribute("data-color-mode");
    themeModeDisplayArea.textContent = "Light Mode";
    updateColorOnSvg("#ff6366");
  }
};

// events
changeThemeButton.addEventListener("change", () => {
  if (changeThemeButton.checked === true) {
    changeTheme("dark");
  } else {
    changeTheme("light");
  }
});
