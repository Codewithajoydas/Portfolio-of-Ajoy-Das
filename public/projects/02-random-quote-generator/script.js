const quoteDiv = document.getElementById("quote");

function getQuote() {
  quoteDiv.innerHTML = "कृपया प्रतीक्षा करें...";
  fetch("https://hindi-quotes.vercel.app/random")
    .then((res) => res.json())
    .then((data) => {
      quoteDiv.innerHTML = `<p>"${data.quote}"</p><p><strong>- ${data.type}</strong></p>`;
    })
    .catch((err) => {
      quoteDiv.innerHTML = "उद्धरण लोड नहीं हो सका। कृपया पुनः प्रयास करें।";
      console.error(err);
    });
}

getQuote();
