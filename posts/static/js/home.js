const nextBtns = document.querySelectorAll(".next");
const prevBtns = document.querySelectorAll(".prev");
const entries = document.querySelectorAll(".entry");

// stop all audio play
const stopAll = () => {
  const current = document.querySelector(".current");
  const audio = current.querySelector("audio");
  const actionBtn = current.querySelector(".action-btn");
  if (actionBtn) {
    audio.pause();
    actionBtn.classList.remove(".fa-pause");
    actionBtn.classList.add("fa-play");
  }
};

const nextArticle = () => {
  // stop all audio play
  stopAll();

  // Remove current class
  const current = document.querySelector(".current");
  current.classList.remove("current");

  // Find new current and set
  let newCurrent = current.nextElementSibling
    ? current.nextElementSibling
    : entries[0];
  newCurrent.classList.add("current");

  // Reset Audio on new current load
  const newAudio = newCurrent.querySelector("audio");
  newAudio.currentTime = 0;
};

const prevArticle = () => {
  // stop all audio play
  stopAll();
  // Remove current class
  const current = document.querySelector(".current");
  current.classList.remove("current");

  // Find new current and set
  let newCurrent = current.previousElementSibling
    ? current.previousElementSibling
    : entries[entries.length - 1];
  newCurrent.classList.add("current");

  // Reset Audio on new current load
  const newAudio = newCurrent.querySelector("audio");
  newAudio.currentTime = 0;
};

// arrow button events
for (const next of nextBtns) {
  next.addEventListener("click", (e) => {
    nextArticle();
  });
}
for (const prev of prevBtns) {
  prev.addEventListener("click", (e) => {
    prevArticle();
  });
}

// custom player
const players = document.querySelectorAll(".media-player");

// custom player update according to current time
for (const player of players) {
  player.ontimeupdate = (e) => {
    // get base bar and playing bar
    const nowPlaying = document.querySelector(".current .now-playing");
    const playerBar = document.querySelector(".current .stream-now");

    // get audio play info
    const { currentTime, duration } = e.srcElement;

    // set width
    playerBar.style.width =
      currentTime / duration > 3 / 30
        ? `${(currentTime / duration) * 100}%`
        : `${(2 / 30) * 100}%`;

    // set seconds
    seconds = Math.floor(currentTime);
    if (seconds < 10) seconds = "0" + seconds;
    nowPlaying.innerHTML = "0:" + seconds;
  };
}

const customBtns = document.querySelectorAll(".action-btn");

// custom play-pause
for (const customBtn of customBtns) {
  customBtn.addEventListener("click", (e) => {
    btnClass = e.target.classList;

    // get matching src audio
    const srcPlayer = document.querySelector(`.current .media-player`);

    // change btn and play-pause
    if (btnClass.contains("fa-play")) {
      btnClass.remove("fa-play");
      btnClass.add("fa-pause");
      srcPlayer.play();
    } else {
      btnClass.remove("fa-pause");
      btnClass.add("fa-play");
      srcPlayer.pause();
    }
  });
}
