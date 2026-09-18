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

    clock.textContent = `LOCAL RECORD TIME / ${time}`;
  }

  updateClock();
  setInterval(updateClock, 1000);


  /*
    BROKEN IMAGE HANDLER
    If a future Doll image has not been generated yet,
    the page keeps its structure instead of exploding.
  */

  document.querySelectorAll("img").forEach((img) => {

    img.addEventListener("error", () => {

      const placeholder = document.createElement("div");

      placeholder.className = "missing-image";

      placeholder.innerHTML = `
        <strong>IMAGE RECORD PENDING</strong>
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

      const target = document.querySelector(link.getAttribute("href"));

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /*
    ARCHIVE REVEAL
  */

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

  sections.forEach((section) => observer.observe(section));


  /*
    SLIGHT IMAGE MOVEMENT
    Keeps the page from feeling like a stack of dead cards.
  */

  document.querySelectorAll("figure img").forEach((image) => {

    image.addEventListener("mousemove", (event) => {

      const rect = image.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 3;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 3;

      image.style.transform = `translate(${x}px, ${y}px) scale(1.015)`;

    });

    image.addEventListener("mouseleave", () => {
      image.style.transform = "";
    });

  });


  /*
    DOLL DOES NOT LIKE THE ARCHIVE.
  */

  const warning = document.querySelector(".header-warning");

  if (warning) {

    setInterval(() => {

      const messages = [
        "THIS RECORD WAS NOT INTENDED FOR PUBLIC ACCESS.",
        "DO NOT TOUCH HER SHIT.",
        "ACCESS WAS NOT AUTHORIZED.",
        "SOMEONE FUCKED UP.",
        "THIS FILE HAS BEEN OPENED TOO MANY TIMES."
      ];

      if (Math.random() > 0.72) {

        warning.textContent =
          messages[Math.floor(Math.random() * messages.length)];

      }

    }, 5200);

  }


  /*
    CONSOLE EASTER EGG
  */

  console.log(
    "%cSJL / DOLL",
    "font-size:22px;font-weight:bold;"
  );

  console.log(
    "%cIf you found this record, put the handbag back where you found it.",
    "font-size:12px;"
  );

  console.log(
    "%cSeriously.",
    "font-size:18px;font-weight:bold;"
  );

});
