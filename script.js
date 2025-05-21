<script>
    const params = new URLSearchParams(window.location.search);

    const audioUrl = params.get("audio");
    const chapterTitle = params.get("title") || "Chapter";
    const bookTitle = params.get("book") || "Audiobook";
    const chapterId = params.get("id") || "chapter";
    const prevSlug = params.get("prev");
    const nextSlug = params.get("next");
    const baseWixUrl = params.get("base") || "https://eliasothitis.wixsite.com/my-site-24/chapters/";

    const audio = document.getElementById("audioPlayer");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    document.getElementById("chapterTitle").textContent = chapterTitle;
    document.getElementById("bookTitle").textContent = bookTitle;

    if (audioUrl) {
      audio.src = audioUrl;

      // Restore playback position
      const savedTime = localStorage.getItem("audio-position-" + chapterId);
      if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
      }

      // Save playback position
      audio.addEventListener("timeupdate", () => {
        localStorage.setItem("audio-position-" + chapterId, audio.currentTime);
      });
    } else {
      document.getElementById("chapterTitle").textContent = "No audio file found.";
    }

    // Setup navigation
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
  </script>
