// Parse URL parameters
const params = new URLSearchParams(window.location.search);
const audioUrl = params.get("audio");
const chapterName = params.get("title") || "Unknown Chapter";
const bookName = params.get("book") || "Unknown Book";

// Get DOM elements
const audioPlayer = document.getElementById("audioPlayer");
const chapterTitle = document.getElementById("chapterTitle");
const bookTitle = document.getElementById("bookTitle");
const playPauseBtn = document.getElementById("playPauseBtn");
const rewindBtn = document.getElementById("rewindBtn");
const forwardBtn = document.getElementById("forwardBtn");
const speedButtons = document.querySelectorAll("#speedControls button");

// Point to your actual Wix site
const baseWixUrl = params.get("base") || "https://eliasothitis.wixsite.com/my-site-24/chapters/";
if (nextSlug) {
  nextBtn.style.display = "inline-block";
  nextBtn.onclick = () => {
    window.location.href = baseWixUrl + nextSlug;
  };
}

if (prevSlug) {
  prevBtn.style.display = "inline-block";
  prevBtn.onclick = () => {
    window.location.href = baseWixUrl + prevSlug;
  };
}

// Set titles
chapterTitle.textContent = chapterName;
bookTitle.textContent = bookName;

// Set up audio
if (!audioUrl) {
  chapterTitle.textContent = "Error: No audio URL provided.";
} else {
  audioPlayer.src = audioUrl;

  const chapterId = params.get("id");
  const posKey = "pos_" + chapterId;
  const savedPos = localStorage.getItem(posKey);
  if (savedPos) {
    audioPlayer.currentTime = parseFloat(savedPos);
  }

  audioPlayer.ontimeupdate = () => {
    localStorage.setItem(posKey, audioPlayer.currentTime);
  };
}

// Play/Pause
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

// Skip Controls
rewindBtn.onclick = () => {
  audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
};
forwardBtn.onclick = () => {
  audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
};

// Playback Speed
speedButtons.forEach(btn => {
  btn.onclick = () => {
    const speed = parseFloat(btn.dataset.speed);
    audioPlayer.playbackRate = speed;
    speedButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  };
});
