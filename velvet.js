document.addEventListener("DOMContentLoaded", () => {

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
    IMAGE RECORD HANDLING

    Missing planned PNGs are intentionally left as visible archive placeholders.
    This lets the page exist before the image set is finished.
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
        `Image record pending: ${img.getAttribute("src") || "unknown file"}`
      );

      img.replaceWith(replacement);
    });

  });


  /*
    LOCAL NAVIGATION

    Keeps Velvet feeling like an archive page rather than a single
    uninterrupted wall of text.
  */

  const navLinks = document.querySelectorAll(".district-nav a");

  navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetID = link.getAttribute("href");

      if (!targetID || !targetID.startsWith("#")) return;

      const target = document.querySelector(targetID);

      if (!target) return;

      event.preventDefault();

      const navHeight = document.querySelector(".district-nav")?.offsetHeight || 0;

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
    SUBTLE VELVET TITLE DISTORTION

    Not glitch-cyberpunk. Just enough visual instability to imply
    something about the district isn't sitting correctly.
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

    Very restrained. Velvet should feel old and heavy, not like a
    cyberpunk website screaming at the user.
  */

  const parallaxImages = document.querySelectorAll(
    ".hero-image img, .garden-image img, .wrong-image img, .full-image img"
  );

  window.addEventListener("scroll", () => {

    const viewportCenter = window.innerHeight / 2;

    parallaxImages.forEach((img) => {

      const rect = img.getBoundingClientRect();

      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const distance = rect.top + rect.height / 2 - viewportCenter;
      const movement = distance * -0.018;

      img.style.transform = `translateY(${movement}px)`;

    });

  }, { passive: true });


  /*
    ARCHIVE VISIBILITY

    Small fade/shift when records enter view.
  */

  const archiveObjects = document.querySelectorAll(".archive-object");

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("record-visible");
          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.15
    }
  );

  archiveObjects.forEach((object) => observer.observe(object));


  /*
    CONSOLE EASTER EGG
  */

  console.log(
    "%cVELVET",
    "font-family: Georgia, serif; font-size: 28px; color: #a8834e;"
  );

  console.log(
    "%cRECORD NOTE: Mothball is an enclave inside Velvet. It is not a district.",
    "font-family: monospace; color: #8d1e2f;"
  );

  console.log(
    "%cIf you found another staircase, don't worry about it.",
    "font-family: monospace; color: #bcae9a;"
  );

});
