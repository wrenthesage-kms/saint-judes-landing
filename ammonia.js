document.addEventListener("DOMContentLoaded", () => {

  /*
   * AMMONIA — SJL CHARACTER RECORD
   * Local page behavior only.
   * No external dependencies.
   */


  /* =========================
     LOCAL CLOCK
  ========================= */

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


  /* =========================
     MISSING IMAGE HANDLING
  ========================= */

  const images = document.querySelectorAll("img");

  images.forEach((img) => {

    img.addEventListener("error", () => {
      img.classList.add("image-missing");

      const originalAlt = img.getAttribute("alt");

      if (originalAlt) {
        img.setAttribute(
          "alt",
          `${originalAlt} — image currently unavailable`
        );
      }
    });

  });


  /* =========================
     SMOOTH RECORD NAVIGATION
  ========================= */

  const navLinks = document.querySelectorAll(".record-nav a");

  navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerOffset = 125;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =========================
     ACTIVE NAV ITEM
  ========================= */

  const sections = document.querySelectorAll(
    ".record-section[id]"
  );

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        const id = entry.target.getAttribute("id");

        navLinks.forEach((link) => {

          const href = link.getAttribute("href");

          if (href === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }

        });

      });

    },
    {
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });


  /* =========================
     IMAGE PARALLAX
  ========================= */

  const parallaxImages = document.querySelectorAll(
    ".hero-image, .art-hero img, .final-image img"
  );

  let ticking = false;

  function updateParallax() {

    if (window.innerWidth <= 700) {
      ticking = false;
      return;
    }

    const scrollY = window.scrollY;

    parallaxImages.forEach((image) => {

      const rect = image.getBoundingClientRect();

      if (
        rect.bottom < 0 ||
        rect.top > window.innerHeight
      ) {
        return;
      }

      const offset =
        (window.innerHeight / 2 - (rect.top + rect.height / 2)) *
        0.035;

      image.style.transform =
        `translate3d(0, ${offset}px, 0)`;
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {

    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }

  });

  updateParallax();


  /* =========================
     TINY RECORD GLITCH
  ========================= */

  const heroTitle = document.querySelector(".hero h1");

  if (heroTitle) {

    setInterval(() => {

      if (Math.random() > 0.84) {

        heroTitle.style.transform =
          `translate(${Math.random() * 3 - 1.5}px, ${Math.random() * 2 - 1}px)`;

        heroTitle.style.textShadow =
          `${Math.random() * 7 - 3}px 0 rgba(255,43,166,.65),
           ${Math.random() * -7 + 3}px 0 rgba(29,231,255,.55)`;

        setTimeout(() => {

          heroTitle.style.transform = "";
          heroTitle.style.textShadow = "";

        }, 90);

      }

    }, 2800);

  }


  /* =========================
     ARCHIVE CONSOLE EASTER EGG
  ========================= */

  console.log(
    "%cSJL MUNICIPAL ARCHIVE",
    "color:#ff2ba6;font-weight:bold;font-size:16px;"
  );

  console.log(
    "%cAMMONIA / OUTLIER RECORD",
    "color:#1de7ff;font-weight:bold;"
  );

  console.log(
    "%cACCESS: UNAUTHORIZED",
    "color:#b8ff35;"
  );

  console.log(
    "%cIf you found this, you were probably not supposed to.",
    "color:#8f8790;"
  );


  /* =========================
     RANDOM MICRO-GLITCH ON
     ARCHIVE LABELS
  ========================= */

  const labels = document.querySelectorAll(
    ".section-kicker, .section-number, .classified-bar"
  );

  labels.forEach((label) => {

    label.addEventListener("mouseenter", () => {

      if (Math.random() > 0.45) {

        label.style.transform =
          `translateX(${Math.random() * 3 - 1.5}px)`;

        setTimeout(() => {
          label.style.transform = "";
        }, 100);

      }

    });

  });


  /* =========================
     SUBJECT IMAGE HOVER
  ========================= */

  const subjectPhoto = document.querySelector(".subject-photo img");

  if (subjectPhoto) {

    subjectPhoto.addEventListener("mouseenter", () => {
      subjectPhoto.style.filter =
        "saturate(1.3) contrast(1.08)";
    });

    subjectPhoto.addEventListener("mouseleave", () => {
      subjectPhoto.style.filter = "";
    });

  }


});
