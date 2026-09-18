/*
  THE NEON GUT
  District Controller

  This page intentionally has its own behavior and visual identity.
  It does not use the SJL municipal page controller.
*/


/* =========================================================
   CLOCK
========================================================= */

function updateGutClock() {

  const clock = document.getElementById("gut-clock");

  if (!clock) {
    return;
  }

  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;

  if (hours === 0) {
    hours = 12;
  }

  const minuteString = String(minutes).padStart(2, "0");

  clock.textContent =
    `${hours}:${minuteString} ${period}`;
}


/* =========================================================
   IMAGE FAILURE
========================================================= */

function handleMissingImages() {

  document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("error", () => {

      image.classList.add("image-missing");

      image.alt =
        `${image.alt || "Image"} — image record pending`;

    });

  });

}


/* =========================================================
   LOCAL NAVIGATION
========================================================= */

function smoothGutNavigation() {

  document.querySelectorAll(".gut-nav a").forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetID =
        link.getAttribute("href");

      if (!targetID || !targetID.startsWith("#")) {
        return;
      }

      const target =
        document.querySelector(targetID);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      history.replaceState(
        null,
        "",
        targetID
      );

    });

  });

}


/* =========================================================
   SMALL DISTRICT GLITCH
========================================================= */

function occasionalGlitch() {

  const logo = document.querySelector(".gut-logo h1");

  if (!logo) {
    return;
  }

  setInterval(() => {

    if (Math.random() > 0.86) {

      logo.style.transform =
        "translateX(-2px) skewX(-1deg) rotate(-2deg)";

      logo.style.textShadow =
        "3px 0 var(--cyan), -3px 0 var(--pink)";

      setTimeout(() => {

        logo.style.transform =
          "rotate(-2deg)";

        logo.style.textShadow =
          "none";

      }, 100);

    }

  }, 2200);

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  updateGutClock();

  setInterval(
    updateGutClock,
    30000
  );

  handleMissingImages();

  smoothGutNavigation();

  occasionalGlitch();

});
