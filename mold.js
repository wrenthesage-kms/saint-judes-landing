(() => {
  "use strict";

  const clock = document.getElementById("clock");

  function updateClock() {
    if (!clock) return;

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    clock.textContent = `${hours}:${minutes}:${seconds}`;
  }

  updateClock();
  setInterval(updateClock, 1000);


  /*
    MISSING IMAGE HANDLING

    Future Mold images can stay missing without leaving
    broken browser-image behavior all over the page.
  */

  document
    .querySelectorAll('img[data-fallback="image"]')
    .forEach((image) => {

      image.addEventListener("error", () => {

        image.classList.add("image-error");

        image.alt = "GIMME A SEC. THIS IMAGE ISN'T HERE YET.";

      });

    });


  /*
    LOCAL NAVIGATION
  */

  document
    .querySelectorAll('.main-nav a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });


  /*
    SMALL REVEAL EFFECT

    Enough movement to keep the page alive without
    making every section feel like a presentation.
  */

  const revealItems = document.querySelectorAll(
    ".answer-card, .personality-card, .fact, .social-placeholder div, .history-note, .pending-wall"
  );

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("seen");

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.08
    }
  );

  revealItems.forEach((item) => {

    item.style.transition =
      "opacity 0.5s ease, transform 0.5s ease";

    item.style.opacity = "0";

    item.style.transform += " translateY(12px)";

    observer.observe(item);

  });


  /*
    LITTLE IMAGE MOVEMENT

    Mold is not standing still for the fucking website.
  */

  document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("mousemove", (event) => {

      const rect = image.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      image.style.transform =
        `scale(1.025) translate(${x * 5}px, ${y * 5}px)`;

    });

    image.addEventListener("mouseleave", () => {
      image.style.transform = "";
    });

  });


  /*
    TINY MOLD GLITCH
  */

  const title = document.querySelector(".hero-heading h1");

  if (title) {

    const originalTitle = title.textContent;

    setInterval(() => {

      if (Math.random() > 0.88) {

        title.textContent = "M0LD";

        setTimeout(() => {
          title.textContent = originalTitle;
        }, 90);

      }

    }, 1800);

  }


  /*
    CONSOLE EASTER EGG
  */

  console.log(
    "%cSAINT JUDE'S LANDING // MOLD",
    "color:#ff3cab;font-weight:bold;font-size:16px;"
  );

  console.log(
    "%cIf you found this, somebody fucked up.",
    "color:#50f5e8;"
  );

})();
