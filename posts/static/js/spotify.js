const search_query = document.querySelector("#search_query");
const result_box = document.querySelector(".result_box");
const musicChoice = document.querySelector(".music_choice");
const postForm = document.querySelector(".post-form");

// 토큰 설정 함수
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
// 토큰 설정
const csrftoken = getCookie("csrftoken");

// 검색 요청
const sendSearchRequest = (e) => {
  result_box.innerHTML = "";
  const searchWord = e.target.value;
  // 검색창에 내용이 있을 때는 검색 실행
  if (searchWord) {
    fetch("search_query/", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ "search-word": searchWord }),
    })
      .then((Response) => {
        return Response.json();
      })
      .then((data) => {
        const results = data.tracks.items;
        // 각 곡 별로 필요한 정보 추출 후 HTML 요소 생성
        showResult(results);
        let result_entries = document.querySelectorAll(".result_entry");
        for (const entry of result_entries) {
          entry.addEventListener("click", (e) => addToForm(e), { once: true });
        }
      });
  } else {
    // 검색창에 아무 내용도 없으면 결과창 지움
    result_box.innerHTML = "";
  }
};

const showResult = (results) => {
  results.map((song) => {
    const img_url = song.album.images[0].url;
    const artists_list = song.artists.map((x) => x.name);
    const title_src = song.name;
    const preview_url = song.preview_url;
    const result_entry = document.createElement("div");
    result_entry.classList.add("result_entry");

    const cover_container = document.createElement("div");
    cover_container.classList.add("cover-img-container");
    const cover = document.createElement("img");
    cover.src = img_url;
    cover.alt = title_src;
    cover_container.appendChild(cover);
    result_entry.appendChild(cover_container);

    const info = document.createElement("div");
    info.classList.add("info");
    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = `${title_src}`;
    info.appendChild(title);

    const artists = document.createElement("p");
    artists_list.map((artist) => {
      artists.textContent += `${artist} `;
    });
    artists.textContent.trim();
    artists.classList.add("artists");
    info.appendChild(artists);

    const preview_src = document.createElement("p");
    preview_src.classList.add("dn");
    preview_src.classList.add("preview-src");
    preview_src.textContent = preview_url;
    result_entry.appendChild(preview_src);

    result_entry.appendChild(info);
    result_box.appendChild(result_entry);
  });
};

const addToForm = (e) => {
  e.preventDefault();
  musicChoice.classList.remove("dn");
  musicChoice.classList.add("flex");
  const music = e.target;
  const cover_url = music.querySelector("img").src;
  const title = music.querySelector(".title").textContent;
  const artist = music.querySelector(".artists").textContent.trim();
  const preview_url = music.querySelector(".preview-src").textContent;
  const selection_cover = musicChoice.querySelector(".cover");
  selection_cover.src = cover_url;
  selection_cover.alt = title;

  const selection_title = musicChoice.querySelector(".title");
  selection_title.textContent = title;

  const selection_artist = musicChoice.querySelector(".artist");
  selection_artist.textContent = artist;

  const selection_preview = musicChoice.querySelector(".preview");
  if (preview_url) {
    selection_preview.src = preview_url;
  } else {
    const messageContainer = document.querySelector(".controls");
    const message = "<p class='f6'>재생가능한 미리듣기 음원이 없습니다</p>";
    messageContainer.innerHTML = message;
  }

  // hidden input으로 만들기
  const cover_input = document.querySelector("input[name=track_album_cover]");
  cover_input.value = cover_url;

  const title_input = document.querySelector("input[name=track_title]");
  title_input.value = title;

  const artist_input = document.querySelector("input[name=track_artist]");
  artist_input.value = artist;

  const audio_input = document.querySelector("input[name=track_audio]");
  audio_input.value = preview_url;

  search_query.value = "";
  result_box.innerHTML = "";
};

// 검색창에 변화가 있을 때마다 요청 보냄
search_query.addEventListener("input", (e) => sendSearchRequest(e));
