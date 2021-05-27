// DOM caching
const { body } = document;

// global variables
let previousBackground;

// change bg function
function changeBackground(number) {
  // Check if current background is already showing
  previousBackground = body.className;

  // reset css class for body
  body.className = "";
  switch (number) {
    case "1":
      body.classList.add(previousBackground === "background-1" ? "no-background" : "background-1");
      break;
    case "2":
      body.classList.add(previousBackground === "background-2" ? "no-background" : "background-2");
      break;
    case "3":
      body.classList.add(previousBackground === "background-3" ? "no-background" : "background-3");
      break;
    default:
      throw "ERROR! Illegal parameter for change Background";
  }
}
