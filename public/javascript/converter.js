var toPrice = document.getElementById("to-currency-price");
var fromCryptoName = document.getElementById("from-crypto-name");
var coinCard = document.getElementById("coin-card");
var fromCoinMenu = document.getElementById("from-coin-menu");
var toSelect = document.getElementsByClassName("to-money");
var fromSelect = document.getElementsByClassName("from-crypto");

var toDollar = "USD";
var fromCrypto = "BTC";

var retrivedollar = function () {
  var XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function () {
    if (XHR.readyState == 4 && XHR.status == 200) {
      var val = JSON.parse(XHR.responseText)[fromCrypto][toDollar];
      var price = val.toLocaleString("en");
      toPrice.textContent = price + " " + toDollar;
      fromCryptoName.textContent = fromCrypto;
    }
  };

  XHR.open(
    "GET",
    "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" +
      fromCrypto +
      "&tsyms=" +
      toDollar
  );
  XHR.send();
};

for (var i = 0; i < toSelect.length; i++) {
  toSelect[i].addEventListener("click", function () {
    coinCard.classList.remove("expand");
    toDollar = this.textContent;
    retrivedollar();
  });
}

for (var i = 0; i < fromSelect.length; i++) {
  fromSelect[i].addEventListener("click", function () {
    fromCoinMenu.classList.remove("expand");
    fromCrypto = this.textContent;
    retrivedollar();
  });
}

toPrice.addEventListener("click", function () {
  if (coinCard.classList.contains("expand")) {
    coinCard.classList.remove("expand");
  } else {
    coinCard.classList.add("expand");
  }
});

fromCryptoName.addEventListener("click", function () {
  if (fromCoinMenu.classList.contains("expand")) {
    fromCoinMenu.classList.remove("expand");
  } else {
    fromCoinMenu.classList.add("expand");
  }
});

Execute;
setInterval(function () {
  retrivedollar();
}, 10000);

retrivedollar();
