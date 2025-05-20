const params = new URLSearchParams(window.location.search);
const audioUrl = params.get("audio");
const chapterId = params.get("id");
const chapterName = params.get("title") || "Unknown Chapter";
const bookName = params.get("book") || "Unknown Book";
const prevSlug = params.get("prev");
const nextSlug = params.get("next");

const audioPlayer = document.getElementById("audioPlayer");
const chapterTitle = document.getElementById("chapterTitle");
const bookTitle = document.getElementById("bookTitle");
const playPauseBtn = document.getElementById("playPauseBtn");
const rewindBtn = document.getElementById("rewindBtn");
const forwardBtn = document.getElementById("forwardBtn");
const speedButtons = document.querySelectorAll("#speedControls button");
const darkModeToggle = document.getElementById("darkModeToggle");
const playerContainer = document.getElementById("playerContainer");
const prevLink = document.getElementById("prevChapterLink");
const nextLink = document.getElementById("nextChapterLink");

chapterTitle.textContent = chapterName;
bookTitle.textContent = bookName;

if (prevSlug) prevLink.href = `/chapters/${prevSlug}`;
else prevLink.style.display = "none";

if (nextSlug) nextLink.href = `/chapters/${nextSlug}`;
else nextLink.style.display = "none";

if (!audioUrl) {
  chapterTitle.textContent = "Error: No audio URL provided.";
} else {
  audioPlayer.src = audioUrl;
  const posKey = "pos_" + chapterId;
  const savedPos = localStorage.getItem(posKey);
  if (savedPos) {
    audioPlayer.currentTime = parseFloat(savedPos);
  }
  audioPlayer.ontimeupdate = () => {
    localStorage.setItem(posKey, audioPlayer.currentTime);
  };
}

playPauseBtn.onclick = () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "Play";
  }
};

audioPlayer.onplay = () => playPauseBtn.textContent = "Pause";
audioPlayer.onpause = () => playPauseBtn.textContent = "Play";
audioPlayer.onended = () => playPauseBtn.textContent = "Play";

rewindBtn.onclick = () => {
  audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
};

forwardBtn.onclick = () => {
  audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
};

speedButtons.forEach(btn => {
  btn.onclick = () => {
    const speed = parseFloat(btn.dataset.speed);
    audioPlayer.playbackRate = speed;
    speedButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  };
});

const darkModePref = localStorage.getItem("darkMode") || "light";
setDarkMode(darkModePref);
darkModeToggle.onclick = () => {
  const newMode = playerContainer.classList.contains("dark") ? "light" : "dark";
  setDarkMode(newMode);
};

function setDarkMode(mode) {
  if (mode === "dark") {
    playerContainer.classList.add("dark");
    darkModeToggle.textContent = "Light Mode";
  } else {
    playerContainer.classList.remove("dark");
    darkModeToggle.textContent = "Dark Mode";
  }
  localStorage.setItem("darkMode", mode);
}