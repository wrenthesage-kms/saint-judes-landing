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
     MISSING IMAGE HANDLING
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
        notice.textContent =
          "GIMME A SEC. THIS IMAGE ISN'T HERE YET.";

        wrapper.appendChild(notice);
      }

    });

  });


  /* =========================================================
     SMOOTH INTERNAL NAVIGATION
  ========================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =========================================================
     ACTIVE LOCAL NAV
  ========================================================== */

  const navLinks = document.querySelectorAll(".record-nav a");
  const sections = document.querySelectorAll(".page-section[id]");

  const sectionObserver = new IntersectionObserver(
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
    sectionObserver.observe(section);
  });


  /* =========================================================
     IMAGE MOVEMENT
  ========================================================== */

  const movingImages = document.querySelectorAll(
    ".hero-image img, .large-image img, .personal-objects img, .objects-layout img, .nine-images img"
  );

  let ticking = false;

  function updateImageMovement() {

    if (window.innerWidth <= 700) {
      ticking = false;
      return;
    }

    const viewportHeight = window.innerHeight;

    movingImages.forEach((image) => {

      const rect = image.getBoundingClientRect();

      if (
        rect.bottom < 0 ||
        rect.top > viewportHeight
      ) {
        return;
      }

      const progress =
        (viewportHeight - rect.top) /
        (viewportHeight + rect.height);

      const movement = (progress - 0.5) * 10;

      image.style.transform =
        `translate3d(0, ${movement}px, 0)`;

    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {

    if (!ticking) {
      window.requestAnimationFrame(updateImageMovement);
      ticking = true;
    }

  }, {
    passive: true
  });

  updateImageMovement();


  /* =========================================================
     SECTION REVEAL
  ========================================================== */

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("record-visible");
        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.08
    }
  );

  sections.forEach((section) => {
    revealObserver.observe(section);
  });


  /* =========================================================
     TINY BENOIT GLITCH
  ========================================================== */

  const heroTitle = document.querySelector(".hero h1");

  if (heroTitle) {

    setInterval(() => {

      if (Math.random() > 0.86) {

        heroTitle.style.transform =
          `translate(${Math.random() * 3 - 1.5}px, ${Math.random() * 2 - 1}px)`;

        heroTitle.style.textShadow =
          `${Math.random() * 5 - 2.5}px 0 rgba(196,167,91,.45),
           ${Math.random() * -5 + 2.5}px 0 rgba(135,60,39,.4)`;

        setTimeout(() => {

          heroTitle.style.transform = "";
          heroTitle.style.textShadow = "";

        }, 100);

      }

    }, 3000);

  }


  /* =========================================================
     SMALL IMAGE HOVER
  ========================================================== */

  const eyeImage = document.querySelector(
    '.personal-objects img[src="detail-benoit-eye.PNG"]'
  );

  if (eyeImage) {

    eyeImage.addEventListener("mouseenter", () => {

      eyeImage.style.filter =
        "saturate(1.25) contrast(1.08)";

    });

    eyeImage.addEventListener("mouseleave", () => {

      eyeImage.style.filter = "";

    });

  }


  /* =========================================================
     CONSOLE EASTER EGG
  ========================================================== */

  console.log(
    "%cBENOIT",
    "font-weight:bold;font-size:18px;color:#c4a75b;"
  );

  console.log(
    "%cNine-born. Outlier. The Anchor.",
    "color:#596447;"
  );

  console.log(
    "%cIf the crew is piled on him again, leave him alone.",
    "color:#873c27;"
  );

  console.log(
    "%cHe is probably watching the door.",
    "color:#a9a18b;"
  );

});
