const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API
const count = 10;
const apiKey = "bDh6wYBqLrUd9a0n1mtN4qbgVvSWNSBqUV3ziHJJ";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function showContent(page) {
  window.scrollTo({ top: 0, behavior: "auto" });
  loader.classList.add("hidden");

  // displaying the correct menu
  if (page === "results") {
    favoritesNav.classList.add("hidden");
    resultsNav.classList.remove("hidden");
  } else {
    favoritesNav.classList.remove("hidden");
    resultsNav.classList.add("hidden");
  }
}

function createDOMNodes(page) {
  imagesContainer.textContent = "";

  cardsArray = page === "results" ? resultsArray : Object.values(favorites);
  cardsArray.forEach((currentResult) => {
    // Card Container
    const card = document.createElement("div");
    card.classList.add("card");
    // Link
    const link = document.createElement("a");
    link.href = currentResult.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";
    // Image
    const image = document.createElement("img");
    image.src = currentResult.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");
    // Card Body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = currentResult.title;
    // Save Text
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    if (page === "results") {
      saveText.textContent = "Add To Favorites";
      saveText.setAttribute("onclick", `saveFavourite('${currentResult.url}')`);
    } else {
      saveText.textContent = "Remove Favorite";
      saveText.setAttribute("onclick", `removeFavourite('${currentResult.url}')`);
    }
    // Card Text
    const cardText = document.createElement("p");
    cardText.textContent = currentResult.explanation;
    // Footer Container
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    // Date
    const date = document.createElement("strong");
    date.textContent = currentResult.date;
    // Copyright
    const copyright = document.createElement("span");
    copyright.textContent = ` ${currentResult?.copyright ?? ""}`;

    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

function updateDOM(page) {
  // Get Favorites from localStorage
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
  }
  createDOMNodes(page);
  showContent(page);
}

// Get 10 Images from NASA API
async function getNasaPictures() {
  // Show loader
  loader.classList.remove("hidden");
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    updateDOM("results");
  } catch (error) {
    // Catch Error Here
    console.log("Error!", error);
  }
}

// Add result to Favorites
function saveFavourite(itemUrl) {
  // Check if the item is not already saved
  if (!favorites[itemUrl]) {
    // Loop through Results Array to select Favorite
    resultsArray.forEach((currentItem) => {
      if (currentItem.url.includes(itemUrl)) {
        favorites[itemUrl] = currentItem;
        // Show Save Confirmation for 2 Seconds
        saveConfirmed.hidden = false;
        setTimeout(() => (saveConfirmed.hidden = true), 2000);
        // saving to localStorage
        localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
      }
    });
  }
}

// Remove Item from Favorites
function removeFavourite(itemUrl) {
  // Check if the item is already saved
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    updateDOM("favorites");
  }
}

// onLoad
getNasaPictures();

// event listeners
