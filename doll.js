document.addEventListener("DOMContentLoaded", () => {

  const clock = document.getElementById("local-clock");

  function updateClock() {

    if (!clock) return;

    const now = new Date();

    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    clock.textContent = `LOCAL TIME / ${time}`;
  }

  updateClock();
  setInterval(updateClock, 1000);


  /*
    MISSING IMAGE HANDLER

    Future Doll images can stay missing without throwing
    ugly broken-image icons across the page.
  */

  document.querySelectorAll("img").forEach((img) => {

    img.addEventListener("error", () => {

      if (img.dataset.failed === "true") return;

      img.dataset.failed = "true";

      const placeholder = document.createElement("div");

      placeholder.className = "missing-image";

      placeholder.innerHTML = `
        <strong>GIMME A SEC. THIS IMAGE ISN'T HERE YET.</strong>
        <span>${img.getAttribute("src") || "UNKNOWN FILE"}</span>
      `;

      img.replaceWith(placeholder);

    });

  });


  /*
    SMOOTH INTERNAL NAVIGATION
  */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

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


  /*
    SECTION REVEAL
  */

  const sections = document.querySelectorAll(".record-section");

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


  /*
    TINY IMAGE MOVEMENT

    Just enough movement to keep the page from feeling
    like a dead stack of cards.
  */

  document.querySelectorAll("figure img").forEach((image) => {

    image.addEventListener("mousemove", (event) => {

      const rect = image.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const x =
        ((event.clientX - rect.left) / rect.width - 0.5) * 3;

      const y =
        ((event.clientY - rect.top) / rect.height - 0.5) * 3;

      image.style.transform =
        `translate(${x}px, ${y}px) scale(1.015)`;

    });

    image.addEventListener("mouseleave", () => {
      image.style.transform = "";
    });

  });


  /*
    DOLL DOES NOT LIKE BEING TREATED LIKE A SPECIMEN.
  */

  const warning = document.querySelector(".header-warning");

  if (warning) {

    const messages = [
      "DO NOT TOUCH HER SHIT.",
      "SOMEONE FUCKED UP.",
      "PUT IT BACK.",
      "THAT IS NOT YOURS.",
      "SHE KNOWS YOU'RE IN HERE."
    ];

    setInterval(() => {

      if (Math.random() > 0.72) {

        warning.textContent =
          messages[Math.floor(Math.random() * messages.length)];

        warning.style.transform =
          `rotate(${Math.random() * 2 - 1}deg)`;

      }

    }, 5200);

  }


  /*
    CONSOLE EASTER EGG
  */

  console.log(
    "%c DOLL / MOTHBALL ",
    "background:#b87883;color:#171313;font-weight:900;padding:5px 9px;"
  );

  console.log(
    "%cPut the handbag back where you found it.",
    "color:#c9949b;font-family:monospace;"
  );

  console.log(
    "%cSeriously.",
    "color:#a64b35;font-weight:bold;font-size:16px;"
  );

});
