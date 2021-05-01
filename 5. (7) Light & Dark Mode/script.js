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
    updateColorOnSvg("#009c99");
    localStorage.setItem("color-mode", "dark");
  } else {
    document.documentElement.removeAttribute("data-color-mode");
    themeModeDisplayArea.textContent = "Light Mode";
    updateColorOnSvg("#ff6366");
    localStorage.setItem("color-mode", "light");
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

// onLoad
if (localStorage.getItem("color-mode") === "dark") {
  changeTheme("dark");
  changeThemeButton.setAttribute("checked", "checked");
}
