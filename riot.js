document.addEventListener("DOMContentLoaded", () => {

  const clock = document.getElementById("local-clock");

  function updateClock() {
    if (!clock) return;

    const now = new Date();

    clock.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  updateClock();
  setInterval(updateClock, 1000);


  /*
   * BROKEN IMAGE HANDLING
   * Missing future assets become archive placeholders instead of
   * leaving ugly browser-broken-image icons everywhere.
   */

  document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("error", () => {

      if (image.dataset.failed === "true") return;

      image.dataset.failed = "true";

      const wrapper = image.parentElement;

      image.style.display = "none";

      if (wrapper) {
        wrapper.classList.add("image-missing");

        const notice = document.createElement("div");
        notice.className = "missing-image";
        notice.innerHTML = `
          <span>IMAGE RECORD</span>
          <strong>RECORD PENDING</strong>
          <small>${image.getAttribute("src") || "UNKNOWN FILE"}</small>
        `;

        wrapper.appendChild(notice);
      }
    });

  });


  /*
   * SMOOTH INTERNAL NAVIGATION
   */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const offset = 125;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /*
   * ARCHIVE SECTION REVEAL
   */

  const sections = document.querySelectorAll(".section");

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


  /*
   * VERY SMALL RIOT-APPROPRIATE IMAGE MOVEMENT.
   * Nothing dramatic. Just enough to make the archive feel alive.
   */

  const movingImages = document.querySelectorAll(
    ".hero-image img, .feature-image img, .crew-image img, .room-image img"
  );

  window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    movingImages.forEach((image, index) => {

      const rect = image.getBoundingClientRect();

      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const movement = Math.sin((scrollY + index * 400) * 0.002) * 3;

      image.style.transform = `translateY(${movement}px)`;

    });

  });


  /*
   * TINY ARCHIVE GLITCH.
   */

  const heroTitle = document.querySelector(".hero h1");

  if (heroTitle) {

    setInterval(() => {

      if (Math.random() > 0.88) {

        heroTitle.style.transform =
          `translate(${Math.random() * 4 - 2}px, ${Math.random() * 2 - 1}px)`;

        setTimeout(() => {
          heroTitle.style.transform = "";
        }, 70);

      }

    }, 1300);

  }


  /*
   * CONSOLE EASTER EGG
   */

  console.log(
    "%c RIOT / SJL OUTLIER RECORD ",
    "background:#ff277d;color:#080709;font-weight:900;padding:5px 9px;"
  );

  console.log(
    "%cIf you touched his tech, that's between you and Riot.",
    "color:#25e6ff;font-family:monospace;"
  );

});
