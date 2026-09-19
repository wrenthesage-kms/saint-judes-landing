/*
  SAINT JUDE'S LANDING
  Site controller.

  This is not a municipal archive.
  There is no fucking database pretending to know everything.

  IMAGE RULE:
  All canonical SJL image assets live in /images/
  and use exact uppercase .PNG filenames.

  If the image directory ever changes, change ONLY this variable.
*/

const IMAGE_DIRECTORY = "images/";


/* =========================================================
   IMAGE HANDLING
========================================================= */

function markMissingImages() {

  const images = document.querySelectorAll("img");

  images.forEach((image) => {

    image.addEventListener("error", () => {

      image.classList.add("image-missing");

      image.setAttribute(
        "alt",
        `${image.alt || "Image"} — it's fucking coming`
      );

      image.dataset.missing = "true";

    });

  });

}


/* =========================================================
   INTERNAL NAVIGATION
========================================================= */

function activateHashTarget() {

  const hash = window.location.hash;

  if (!hash) {
    return;
  }

  const target = document.querySelector(hash);

  if (!target) {
    return;
  }

  window.requestAnimationFrame(() => {

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

}


/* =========================================================
   ACTIVE SECTION
========================================================= */

function updateActiveNavigation() {

  const sections = document.querySelectorAll(".page-section");
  const navigationLinks = document.querySelectorAll(".main-nav a");

  if (!sections.length || !navigationLinks.length) {
    return;
  }

  const scrollPosition = window.scrollY + 180;

  let currentSection = "";

  sections.forEach((section) => {

    if (scrollPosition >= section.offsetTop) {
      currentSection = section.id;
    }

  });

  navigationLinks.forEach((link) => {

    const linkTarget = link
      .getAttribute("href")
      .replace("#", "");

    if (linkTarget === currentSection) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }

  });

}


/* =========================================================
   IMAGE DIRECTORY
========================================================= */

function exposeImageDirectory() {

  window.SJL = window.SJL || {};

  window.SJL.imageDirectory = IMAGE_DIRECTORY;

  window.SJL.image = function(filename) {
    return `${IMAGE_DIRECTORY}${filename}`;
  };

}


/* =========================================================
   SMALL INTERACTION SHIT
========================================================= */

function addImageInteractions() {

  const images = document.querySelectorAll("img");

  images.forEach((image) => {

    image.addEventListener("mouseenter", () => {
      image.closest("figure")?.classList.add("image-hovered");
    });

    image.addEventListener("mouseleave", () => {
      image.closest("figure")?.classList.remove("image-hovered");
    });

  });

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  exposeImageDirectory();

  markMissingImages();

  addImageInteractions();

  activateHashTarget();

  updateActiveNavigation();

  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );

  window.addEventListener(
    "hashchange",
    activateHashTarget
  );

});
