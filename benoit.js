document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     LOCAL CLOCK
  ========================================================== */

  const clock = document.getElementById("local-clock");

  function updateClock() {
    if (!clock) return;

    const now = new Date();

    clock.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
  }

  updateClock();
  setInterval(updateClock, 1000);


  /* =========================================================
     BROKEN IMAGE HANDLER
  ========================================================== */

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-missing");

      const wrapper = image.parentElement;

      if (
        wrapper &&
        !wrapper.querySelector(".missing-image")
      ) {
        const notice = document.createElement("div");

        notice.className = "missing-image";
        notice.textContent = "IMAGE RECORD PENDING";

        wrapper.appendChild(notice);
      }
    });
  });


  /* =========================================================
     SMOOTH INTERNAL NAV
  ========================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });


  /* =========================================================
     IMAGE MOVEMENT
  ========================================================== */

  const images = document.querySelectorAll(
    ".hero-image img, .large-image img, .archivist-image-row img, .objects-layout img"
  );

  window.addEventListener("scroll", () => {
    const viewportHeight = window.innerHeight;

    images.forEach((image) => {
      const rect = image.getBoundingClientRect();

      if (
        rect.bottom > 0 &&
        rect.top < viewportHeight
      ) {
        const progress =
          (viewportHeight - rect.top) /
          (viewportHeight + rect.height);

        const movement = (progress - 0.5) * 10;

        image.style.transform = `translateY(${movement}px)`;
      }
    });
  });


  /* =========================================================
     SECTION REVEAL
  ========================================================== */

  const sections = document.querySelectorAll(".record-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("record-visible");
        }
      });
    },
    {
      threshold: 0.08
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });


  /* =========================================================
     BENOIT'S FILE — TINY ARCHIVE EASTER EGG
  ========================================================== */

  console.log(
    "%cSJL MUNICIPAL ARCHIVE",
    "font-weight:bold;font-size:16px;"
  );

  console.log(
    "%cSUBJECT: BENOIT",
    "font-weight:bold;"
  );

  console.log(
    "%cDo not provoke the crocodilian.",
    "color:#c4a75b;"
  );

  console.log(
    "%cHe is probably already watching the door.",
    "color:#873c27;"
  );

});
