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

  document.querySelectorAll('img[data-fallback="image"]').forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-error");
      image.alt = "IMAGE RECORD PENDING";
    });
  });

  document.querySelectorAll('.main-nav a[href^="#"]').forEach((link) => {
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

  const revealItems = document.querySelectorAll(
    ".answer-card, .personality-card, .fact, .social-placeholder div, .history-note, .archive-file, .pending-wall"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("seen");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08
    }
  );

  revealItems.forEach((item) => {
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    item.style.opacity = "0";
    item.style.transform += " translateY(12px)";
    observer.observe(item);
  });

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("mousemove", (event) => {
      const rect = image.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      image.style.transform =
        `scale(1.025) translate(${x * 5}px, ${y * 5}px)`;
    });

    image.addEventListener("mouseleave", () => {
      image.style.transform = "";
    });
  });

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

  console.log(
    "%cSAINT JUDE'S LANDING // MOLD",
    "color:#ff3cab;font-weight:bold;font-size:16px;"
  );

  console.log(
    "%cIf you're reading this, somebody fucked up.",
    "color:#50f5e8;"
  );
})();
