document.addEventListener("DOMContentLoaded", () => {

  /*
    LOCAL CLOCK

    Velvet keeps time like everybody else.
    The weird shit can wait.
  */

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


  /*
    MISSING IMAGES

    Planned images are allowed to not exist yet.
    The page stays intact instead of leaving a broken-image icon
    sitting in the middle of somebody's house.
  */

  const images = document.querySelectorAll("img");

  images.forEach((img) => {

    img.addEventListener("error", () => {

      if (img.dataset.failed === "true") return;

      img.dataset.failed = "true";

      const replacement = document.createElement("div");

      replacement.className = "missing-image";
      replacement.setAttribute("role", "img");
      replacement.setAttribute(
        "aria-label",
        "Image not available yet"
      );

      img.replaceWith(replacement);

    });

  });


  /*
    LOCAL NAVIGATION

    Sticky navigation stays useful without turning the page
    into a giant uninterrupted scroll.
  */

  const navLinks = document.querySelectorAll(".district-nav a");

  navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetID = link.getAttribute("href");

      if (!targetID || !targetID.startsWith("#")) return;

      const target = document.querySelector(targetID);

      if (!target) return;

      event.preventDefault();

      const navHeight =
        document.querySelector(".district-nav")?.offsetHeight || 0;

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


  /*
    VELVET TITLE MOVEMENT

    Tiny instability. Nothing flashy.
    The district is old enough that it doesn't need a glitch filter.
  */

  const heroTitle = document.querySelector(".hero h1");

  if (heroTitle) {

    setInterval(() => {

      if (Math.random() > 0.86) {

        const original = heroTitle.style.transform;

        heroTitle.style.transform =
          `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;

        setTimeout(() => {
          heroTitle.style.transform = original;
        }, 90);

      }

    }, 1300);

  }


  /*
    SLOW IMAGE MOVEMENT

    Heavy, restrained movement.
    Velvet is not Neon Gut.
  */

  const parallaxImages = document.querySelectorAll(
    ".hero-image img, .garden-image img, .wrong-image img, .full-image img"
  );

  function updateParallax() {

    const viewportCenter = window.innerHeight / 2;

    parallaxImages.forEach((img) => {

      const rect = img.getBoundingClientRect();

      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const distance =
        rect.top + rect.height / 2 - viewportCenter;

      const movement = distance * -0.018;

      img.style.transform = `translateY(${movement}px)`;

    });

  }

  window.addEventListener(
    "scroll",
    updateParallax,
    { passive: true }
  );

  updateParallax();


  /*
    LITTLE ENTRANCE MOVEMENT

    Things drift into place instead of behaving like database cards.
  */

  const sections = document.querySelectorAll(
    ".split-section, .image-text, .ballroom-section, .garden-section, " +
    ".institutions-section, .detail-strip, .dining-section, " +
    ".ritual-section, .wrong-entity, .geometry-section, .doll-section, " +
    ".threshold-section, .archive-section, .final-section"
  );

  sections.forEach((section) => {
    section.classList.add("velvet-section-ready");
  });

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("velvet-section-visible");

        observer.unobserve(entry.target);

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
    CONSOLE EASTER EGGS

    Just Velvet being Velvet.
  */

  console.log(
    "%cVELVET",
    "font-family: Georgia, serif; font-size: 28px; color: #a8834e;"
  );

  console.log(
    "%cMothball is inside Velvet. It is not a district.",
    "font-family: monospace; color: #8d1e2f;"
  );

  console.log(
    "%cIf the house has another staircase, apparently that's fine.",
    "font-family: monospace; color: #bcae9a;"
  );

});
