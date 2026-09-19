document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     LOCAL CLOCK
  ========================== */

  const clock = document.getElementById("clock");

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


  /* =========================
     MISSING IMAGES
  ========================== */

  const images = document.querySelectorAll("img");

  images.forEach((img) => {

    img.addEventListener("error", () => {

      img.classList.add("image-missing");

      img.alt = "Image not available yet.";

      if (img.dataset.failed) return;

      img.dataset.failed = "true";

      const label = document.createElement("span");

      label.className = "image-missing-label";
      label.textContent = "this image isn't here yet. gimme a sec.";

      if (img.parentElement) {
        img.parentElement.classList.add("image-record-missing");
        img.parentElement.appendChild(label);
      }

    });

  });


  /* =========================
     LOCAL NAVIGATION
  ========================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetID = link.getAttribute("href");

        if (!targetID || targetID === "#") return;

        const target = document.querySelector(targetID);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });


  /* =========================
     INDUSTRIAL PARALLAX
  ========================== */

  const parallaxImages = document.querySelectorAll(
    ".full-bleed img, .night-image img, .machine-image img"
  );

  function updateParallax() {

    const viewportHeight = window.innerHeight;

    parallaxImages.forEach((img) => {

      const rect = img.getBoundingClientRect();

      if (
        rect.bottom < 0 ||
        rect.top > viewportHeight
      ) {
        return;
      }

      const center = rect.top + rect.height / 2;
      const distance =
        (center - viewportHeight / 2) * 0.025;

      img.style.transform =
        `translateY(${distance}px) scale(1.035)`;

    });

  }

  window.addEventListener(
    "scroll",
    updateParallax,
    { passive: true }
  );

  updateParallax();


  /* =========================
     NINE TITLE GLITCH
  ========================== */

  const title =
    document.querySelector(".header-title h1");

  if (title) {

    setInterval(() => {

      if (Math.random() > 0.94) {

        title.style.transform =
          "scaleX(0.82) translateX(3px)";

        setTimeout(() => {

          title.style.transform =
            "scaleX(0.82)";

        }, 80);

      }

    }, 900);

  }


  /* =========================
     SCROLL REVEALS
  ========================== */

  const revealTargets = document.querySelectorAll(
    ".section-block, " +
    ".workers-section, " +
    ".night-shift, " +
    ".landmark, " +
    ".machine-section, " +
    ".creature-section, " +
    ".benoit-section, " +
    ".archive-section, " +
    ".artifact-section"
  );

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add(
            "record-visible"
          );

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.08
      }
    );

  revealTargets.forEach((target) => {
    observer.observe(target);
  });


  /* =========================
     NINE CONSOLE
  ========================== */

  console.log(
    "%cNINE / SAINT JUDE'S LANDING",
    "font-weight:900;font-size:16px;"
  );

  console.log(
    "%cSomebody has to make all this shit useful.",
    "color:#9a4d2e;"
  );

  console.log(
    "%cIf you hear something moving below you, do not assume it is a pipe.",
    "color:#c5a849;"
  );

});
