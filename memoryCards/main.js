function playMp3(mucsicID) {
  mucsicID.play();
}

function stopMp3(mucsicID) {
  mucsicID.pause();
  mucsicID.currentTime = 0;
}

let cards = document.querySelectorAll(".valo-card");
let hasFliped = false;
let firstCard, SecondCard;
let lockClick = false;

function shuffle() {
  let item = document.querySelector(".game-container");
  for (var i = item.children.length; i >= 0; i--) {
    item.appendChild(item.children[(Math.random() * i) | 0]);
  }
}

function startGame() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      playMp3(document.getElementById("welcome-Music"));
      playMp3(document.getElementById("bgMusic"));
    });
  });
}

function flipCard() {
  //chan nguoi dung click khi 2 la bai ko giong nhau chua lat lai
  if (lockClick) return;
  if (this === firstCard) return;

  this.classList.toggle("fliped");
  if (!hasFliped) {
    setTimeout(() => {
      playMp3(flipMusic);
    }, 200);
    stopMp3(flipMusic);
    hasFliped = true;
    firstCard = this;
    return;
  }
  setTimeout(() => {
    playMp3(flipMusic);
  }, 200);
  stopMp3(flipMusic);
  hasFliped = false;
  SecondCard = this;
  checkMatch();
}

function disAbleCards() {
  firstCard.removeEventListener("click", flipCard);
  SecondCard.removeEventListener("click", flipCard);
  setTimeout(() => {
    firstCard.classList.toggle("invisible");
    SecondCard.classList.toggle("invisible");
  }, 1000);
}

function unflipCards() {
  lockClick = true;
  setTimeout(() => {
    firstCard.classList.remove("fliped");
    SecondCard.classList.remove("fliped");
    lockClick = false;
  }, 1000);
}

function checkMatch() {
  if (firstCard.dataset.value === SecondCard.dataset.value) {
    setTimeout(() => {
      playMp3(success);
    }, 200);
    stopMp3(success);
    disAbleCards();
  } else {
    unflipCards();
  }
}

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

shuffle();
startGame();
