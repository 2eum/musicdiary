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
