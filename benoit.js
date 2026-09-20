document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     LOCAL CLOCK
  ========================================================== */

  const clock = document.getElementById("local-clock");

  function updateClock() {

    if (!clock) {
      return;
    }

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
     CHARACTER NAVIGATION
  ========================================================== */

  const navButtons = document.querySelectorAll(
    ".nav-button"
  );

  const sections = document.querySelectorAll(
    ".page-section[id]"
  );


  navButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const targetId =
        button.getAttribute("data-section");

      if (!targetId) {
        return;
      }


      sections.forEach((section) => {

        section.classList.toggle(
          "active",
          section.id === targetId
        );

      });


      navButtons.forEach((navButton) => {

        navButton.classList.toggle(
          "active",
          navButton === button
        );

      });


      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  });


  /* =========================================================
     BROWSER HASH SUPPORT
  ========================================================== */

  function openHashSection() {

    const hash =
      window.location.hash.replace("#", "");

    if (!hash) {
      return;
    }

    const targetButton =
      document.querySelector(
        `.nav-button[data-section="${hash}"]`
      );

    const targetSection =
      document.getElementById(hash);

    if (!targetButton || !targetSection) {
      return;
    }

    sections.forEach((section) => {

      section.classList.toggle(
        "active",
        section === targetSection
      );

    });

    navButtons.forEach((button) => {

      button.classList.toggle(
        "active",
        button === targetButton
      );

    });

  }

  openHashSection();


  window.addEventListener(
    "hashchange",
    openHashSection
  );


  /* =========================================================
     MISSING IMAGE HANDLING
  ========================================================== */

  document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("error", () => {

      image.classList.add("image-missing");

      const wrapper =
        image.parentElement;

      if (
        wrapper &&
        !wrapper.querySelector(".missing-image")
      ) {

        const notice =
          document.createElement("div");

        notice.className =
          "missing-image";

        notice.textContent =
          "GIMME A SEC. THIS IMAGE ISN'T HERE YET.";

        wrapper.appendChild(notice);

      }

    });

  });


  /* =========================================================
     HEAVY IMAGE MOVEMENT
     BENOIT DOES NOT FLOAT.
  ========================================================== */

  const movingImages =
    document.querySelectorAll(
      ".hero-image img, .gallery-card img"
    );

  let ticking = false;


  function updateImageMovement() {

    if (window.innerWidth <= 700) {

      ticking = false;

      return;

    }


    const viewportHeight =
      window.innerHeight;


    movingImages.forEach((image) => {

      if (image.classList.contains("image-missing")) {
        return;
      }


      const rect =
        image.getBoundingClientRect();


      if (
        rect.bottom < 0 ||
        rect.top > viewportHeight
      ) {

        return;

      }


      const progress =
        (
          viewportHeight - rect.top
        ) /
        (
          viewportHeight + rect.height
        );


      const movement =
        (progress - 0.5) * 4;


      image.style.transform =
        `translate3d(0, ${movement}px, 0)`;

    });


    ticking = false;

  }


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(
          updateImageMovement
        );

        ticking = true;

      }

    },
    {
      passive: true
    }
  );


  updateImageMovement();


  /* =========================================================
     SECTION REVEAL
  ========================================================== */

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "record-visible"
          );

          observer.unobserve(
            entry.target
          );

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
     THERMAL EYE DETAIL
  ========================================================== */

  const eyeImage =
    document.querySelector(
      'img[src="images/detail-benoit-eye.PNG"]'
    );


  if (eyeImage) {

    eyeImage.addEventListener(
      "mouseenter",
      () => {

        eyeImage.style.filter =
          "saturate(1.2) contrast(1.08)";

      }
    );


    eyeImage.addEventListener(
      "mouseleave",
      () => {

        eyeImage.style.filter = "";

      }
    );

  }


  /* =========================================================
     GALLERY FOCUS
  ========================================================== */

  document.querySelectorAll(
    ".gallery-card"
  ).forEach((card) => {

    const image =
      card.querySelector("img");

    if (!image) {
      return;
    }


    card.addEventListener(
      "mouseenter",
      () => {

        image.style.transform =
          "scale(1.025)";

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        image.style.transform = "";

      }
    );

  });


  /* =========================================================
     NINE MACHINE MARK
     SMALL, OCCASIONAL MOTION.
  ========================================================== */

  const machineBars =
    document.querySelectorAll(
      ".header-machine-mark span"
    );


  if (machineBars.length) {

    setInterval(() => {

      machineBars.forEach((bar) => {

        const height =
          15 +
          Math.random() * 45;

        bar.style.height =
          `${height}px`;

      });

    }, 2400);

  }


  /* =========================================================
     CONSOLE RECORD
  ========================================================== */

  console.log(
    "%cBENOIT",
    "font-weight:bold;font-size:18px;color:#c4a75b;"
  );

  console.log(
    "%cNINE / OUTLIER / ACTIVE RECORD",
    "color:#596447;"
  );

  console.log(
    "%ccher.",
    "color:#873c27;font-weight:bold;"
  );

});