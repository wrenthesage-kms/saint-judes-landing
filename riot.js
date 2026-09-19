document.addEventListener("DOMContentLoaded", () => {

  /* LOCAL CLOCK */

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


  /* BROKEN IMAGE HANDLING */

  document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("error", () => {

      if (image.dataset.failed === "true") return;

      image.dataset.failed = "true";

      const wrapper = image.parentElement;

      image.style.display = "none";

      if (!wrapper) return;

      wrapper.classList.add("image-missing");

      const notice = document.createElement("div");

      notice.className = "missing-image";

      notice.innerHTML = `
        <span>RIOT'S PAGE</span>
        <strong>GIMME A SEC. THIS IMAGE ISN'T HERE YET.</strong>
        <small>${image.getAttribute("src") || "UNKNOWN FILE"}</small>
      `;

      wrapper.appendChild(notice);

    });

  });


  /* SMOOTH INTERNAL NAVIGATION */

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


  /* SECTION REVEAL */

  const sections = document.querySelectorAll(".page-section");

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("record-visible");

        observerInstance.unobserve(entry.target);

      });

    },
    {
      threshold: 0.08
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });


  /* RIOT-APPROPRIATE IMAGE MOVEMENT */

  const movingImages = document.querySelectorAll(
    ".hero-image img, .large-image img, .behavior-image img, .personal-objects img, .objects-layout figure img, .nine-images img"
  );

  let ticking = false;

  function updateImageMovement() {

    if (window.innerWidth <= 700) {
      ticking = false;
      return;
    }

    const scrollY = window.scrollY;

    movingImages.forEach((image, index) => {

      const rect = image.getBoundingClientRect();

      if (
        rect.bottom < 0 ||
        rect.top > window.innerHeight
      ) {
        return;
      }

      const movement =
        Math.sin((scrollY + index * 400) * 0.002) * 3;

      image.style.transform =
        `translateY(${movement}px)`;

    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {

    if (!ticking) {

      window.requestAnimationFrame(
        updateImageMovement
      );

      ticking = true;

    }

  }, {
    passive: true
  });

  updateImageMovement();


  /* TINY RIOT GLITCH */

  const heroTitle = document.querySelector(".hero h1");

  if (heroTitle) {

    setInterval(() => {

      if (Math.random() > 0.88) {

        heroTitle.style.transform =
          `translate(
            ${Math.random() * 4 - 2}px,
            ${Math.random() * 2 - 1}px
          )`;

        heroTitle.style.textShadow =
          `${Math.random() * 5 - 2}px 0 rgba(255,39,125,.65),
           ${Math.random() * -5 + 2}px 0 rgba(37,230,255,.55)`;

        setTimeout(() => {

          heroTitle.style.transform = "";
          heroTitle.style.textShadow = "";

        }, 70);

      }

    }, 1300);

  }


  /* SMALL LABEL GLITCH */

  const labels = document.querySelectorAll(
    ".section-label, .field-label, .eyebrow"
  );

  labels.forEach((label) => {

    label.addEventListener("mouseenter", () => {

      if (Math.random() > 0.55) {

        label.style.transform =
          `translateX(${Math.random() * 3 - 1.5}px)`;

        setTimeout(() => {
          label.style.transform = "";
        }, 100);

      }

    });

  });


  /* CONSOLE EASTER EGG */

  console.log(
    "%c RIOT ",
    "background:#ff277d;color:#080709;font-weight:900;padding:5px 9px;"
  );

  console.log(
    "%cNeon Gut / Human / Outlier",
    "color:#25e6ff;font-family:monospace;"
  );

  console.log(
    "%cIf you touched his tech, that's between you and Riot.",
    "color:#ff277d;font-family:monospace;"
  );

});
