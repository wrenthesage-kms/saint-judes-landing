document.addEventListener("DOMContentLoaded", () => {

  /* LOCAL CLOCK */

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


  /* IMAGE FAILURE HANDLING */

  const images = document.querySelectorAll("img");

  images.forEach((img) => {

    img.addEventListener("error", () => {

      if (img.dataset.failed === "true") return;

      img.dataset.failed = "true";

      const replacement = document.createElement("div");

      replacement.className = "missing-image";

      replacement.setAttribute(
        "role",
        "img"
      );

      replacement.setAttribute(
        "aria-label",
        `Image record pending: ${img.getAttribute("src") || "unknown file"}`
      );

      img.replaceWith(replacement);

    });

  });


  /* LOCAL NAVIGATION */

  const navLinks = document.querySelectorAll(".local-nav a");

  navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetID = link.getAttribute("href");

      if (!targetID || !targetID.startsWith("#")) return;

      const target = document.querySelector(targetID);

      if (!target) return;

      event.preventDefault();

      const navHeight =
        document.querySelector(".local-nav")?.offsetHeight || 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navHeight -
        12;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* SLOW IMAGE MOVEMENT */

  const movingImages = document.querySelectorAll(
    ".hero-photo img, .street-image img, .alley-image img, .night-image img"
  );

  window.addEventListener(
    "scroll",
    () => {

      const center = window.innerHeight / 2;

      movingImages.forEach((img) => {

        const rect = img.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          return;
        }

        const distance =
          rect.top +
          rect.height / 2 -
          center;

        const movement = distance * -0.012;

        img.style.transform = `translateY(${movement}px)`;

      });

    },
    { passive: true }
  );


  /* ARCHIVE RECORDS */

  const records = document.querySelectorAll(".archive-grid figure");

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("record-visible");
        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12
    }
  );

  records.forEach((record) => observer.observe(record));


  /* TINY SIGN GLITCH */

  const sticker = document.querySelector(".sticker");

  if (sticker) {

    setInterval(() => {

      if (Math.random() > 0.9) {

        sticker.style.transform =
          `rotate(${Math.random() * 6 - 3}deg) translateX(${Math.random() * 2 - 1}px)`;

        setTimeout(() => {
          sticker.style.transform = "rotate(-3deg)";
        }, 120);

      }

    }, 1800);

  }


  /* CONSOLE EASTER EGGS */

  console.log(
    "%cMOTHBALL",
    "font-family: monospace; font-size: 24px; color: #b69a54;"
  );

  console.log(
    "%cNOT A DISTRICT.",
    "font-family: monospace; color: #9f2731;"
  );

  console.log(
    "%cIt is inside Velvet.",
    "font-family: monospace; color: #9e917d;"
  );

  console.log(
    "%cIf you bought the object, it is technically your problem now.",
    "font-family: monospace; color: #d8cdb9;"
  );

});
