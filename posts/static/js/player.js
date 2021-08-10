const player = document.querySelector(".media-player");
const nowPlaying = document.querySelector(".now-playing");
const playerBar = document.querySelector(".stream-now");

player.ontimeupdate = (e) => {
  const { currentTime, duration } = e.srcElement;
  if (playerBar) {
    playerBar.style.width =
      currentTime / duration > 3 / 30
        ? `${(currentTime / duration) * 100}%`
        : `${(2 / 30) * 100}%`;
  }
  seconds = Math.floor(currentTime);
  if (seconds < 10) seconds = "0" + seconds;
  nowPlaying.innerHTML = "0:" + seconds;
};

const customBtn = document.querySelector(".action-btn");

customBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-play")) {
    e.target.classList.remove("fa-play");
    e.target.classList.add("fa-pause");
    player.play();
  } else {
    e.target.classList.remove("fa-pause");
    e.target.classList.add("fa-play");
    player.pause();
  }
});
