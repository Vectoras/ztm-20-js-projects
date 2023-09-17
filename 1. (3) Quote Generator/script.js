// preparing the global array for quotes
let apiQuotes = [];

// cashing DOM elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const buttonTwitter = document.getElementById('twitter');
const buttonNewQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// loader on / off function
const loading = () => {
  quoteContainer.hidden = true;
  loader.hidden = false;
}
const loaded = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// generating a random integer smaller than a received maximum
function random (n) {
  return Math.floor(Math.random() * n);
}

// returning a new qoute randomly selected from the array of quotes
function newQuote () {
  return apiQuotes[random(apiQuotes.length)];
}

// updates the quote and autor on the page
function updateQuote() {
  loading();

  let quote = newQuote();
  
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  quoteText.textContent = quote.text;
  authorText.textContent = quote?.author ?? "Unknown";

  loaded();
}

// make twitter post
function tweetQuote () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// function to requst quotes from the server
async function getQuotes() {
  loading();
  try {
    const response = await fetch ('https://type.fit/api/quotes');
    apiQuotes = await response.json();
    updateQuote();
  } catch (error) {
    console.log("ERROR: ")
    console.log(error);
  }
}

// requesting the quotes
getQuotes();

// event listeners 
buttonNewQuote.addEventListener('click', updateQuote);
buttonTwitter.addEventListener('click', tweetQuote);