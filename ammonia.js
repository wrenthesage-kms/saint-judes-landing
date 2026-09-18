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


  /* =========================================================
     IMAGE FAILURE HANDLING
  ========================================================== */

  document.querySelectorAll("img").forEach((img) => {

    img.addEventListener("error", () => {

      const wrapper = img.parentElement;

      img.style.display = "none";

      if (wrapper) {
        wrapper.classList.add("missing-image");

        if (!wrapper.querySelector(".missing-label")) {
          const label = document.createElement("div");
          label.className = "missing-label";
          label.textContent = "IMAGE FILE MISSING // RECORD PENDING";
          wrapper.appendChild(label);
        }
      }

    });

  });


  /* =========================================================
     SMOOTH INTERNAL NAVIGATION
  ========================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =========================================================
     SECTION REVEAL
  ========================================================== */

  const sections = document.querySelectorAll(".record-section");

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


  /* =========================================================
     TINY ARCHIVE GLITCH
  ========================================================== */

  const title = document.querySelector(".hero h1");

  if (title) {

    setInterval(() => {

      if (Math.random() > 0.88) {

        title.style.transform =
          `translate(${Math.random() * 4 - 2}px, ${Math.random() * 2 - 1}px)`;

        title.style.textShadow =
          `${Math.random() * 10 - 5}px 2px 0 rgba(176,38,255,.5),
           ${Math.random() * 6 - 3}px -1px 0 rgba(0,216,216,.35)`;

        setTimeout(() => {
          title.style.transform = "";
          title.style.textShadow = "";
        }, 90);

      }

    }, 1800);

  }


  /* =========================================================
     CONSOLE RECORD
  ========================================================== */

  console.log(
    "%cSJL ARCHIVE // OUTLIER-001",
    "color:#b026ff;font-weight:bold;"
  );

  console.log(
    "%cSUBJECT: AMMONIA",
    "color:#00d8d8;"
  );

  console.log(
    "%cRecord integrity compromised.",
    "color:#f21b88;"
  );

});
