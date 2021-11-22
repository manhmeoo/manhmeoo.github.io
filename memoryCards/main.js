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
let overlays = Array.from(document.getElementsByClassName("overlay-text"));
let lockClick = false;
let realTime;
let flipedNum = document.getElementById("flipedCardsNum");
console.log(flipedNum);

function shuffle() {
  let item = document.querySelector(".game-container");
  for (var i = item.children.length; i >= 0; i--) {
    item.appendChild(item.children[(Math.random() * i) | 0]);
  }
}

function disAbleCards() {
  firstCard.removeEventListener("click", flipCard);
  SecondCard.removeEventListener("click", flipCard);
  if (flipedNum.innerHTML < 0) {
    flipedNum.innerHTML++;
  } else {
    stopMp3(bgMusic);
    flipedNum.innerHTML = "done";
    overlays[2].classList.add("visible");
    playMp3(victoryMucsic);
    restartGame();
    overlays[2].addEventListener("click", () => {
      overlays[2].classList.remove("visible");
    });
  }
  setTimeout(() => {
    firstCard.classList.add("invisible");
    SecondCard.classList.add("invisible");
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

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

function countTime(timeleft, flipedNum) {
  let realTime = document.getElementById("time-remaining");
  let downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      realTime.innerHTML = "Finished";
      stopMp3(bgMusic);
      playMp3(defeatMucsic);
      overlays[1].classList.add("visible");
    } else if (flipedNum.innerHTML == "done") {
      timeleft == 0;
    } else {
      realTime.innerHTML = timeleft;
    }
    timeleft -= 1;
  }, 1000);
}

function restartGame() {}

function startGame() {
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      playMp3(welcomeMusic);
      playMp3(bgMusic);
      countTime(300);
    });
  });
}

shuffle();
startGame();
