const nextBtns = document.querySelectorAll(".next");
const prevBtns = document.querySelectorAll(".prev");
const entries = document.querySelectorAll(".entry");

const nextArticle = () => {
  // Get current class
  const current = document.querySelector(".current");
  // Remove current class
  current.classList.remove("current");
  // Check for next Article
  if (current.nextElementSibling) {
    // Add current to next sibling
    current.nextElementSibling.classList.add("current");
  } else {
    // Add current to start
    entries[0].classList.add("current");
  }
};

const prevArticle = () => {
  // Get current class
  const current = document.querySelector(".current");
  // Remove current class
  current.classList.remove("current");
  // Check for prev Article
  if (current.previousElementSibling) {
    // Add current to prev sibling
    current.previousElementSibling.classList.add("current");
  } else {
    // Add current to last
    entries[entries.length - 1].classList.add("current");
  }
};

// Button events
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

for (const player of players) {
  player.ontimeupdate = (e) => {
    const nowPlaying = document.querySelector(".current .now-playing");
    const playerBar = document.querySelector(".current .stream-now");
    const { currentTime, duration } = e.srcElement;
    playerBar.style.width = `${(currentTime / duration) * 100}%`;
    seconds = Math.floor(currentTime);
    if (seconds < 10) seconds = "0" + seconds;
    nowPlaying.innerHTML = "0:" + seconds;
  };
}

const customBtns = document.querySelectorAll(".action-btn");
for (const customBtn of customBtns) {
  customBtn.addEventListener("click", (e) => {
    btnClass = e.target.classList;
    const index = [...btnClass].find((e) => e.startsWith("btn-")).split("-")[1];
    if (btnClass.contains("fa-play")) {
      btnClass.remove("fa-play");
      btnClass.add("fa-pause");
      const srcPlayer = document.querySelector(`.src-${index}`);
      srcPlayer.play();
    } else {
      btnClass.remove("fa-pause");
      btnClass.add("fa-play");
      const srcPlayer = document.querySelector(`.src-${index}`);
      srcPlayer.pause();
    }
  });
}
