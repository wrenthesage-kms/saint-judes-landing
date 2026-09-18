/*
  SAINT JUDE'S LANDING
  Municipal Archive / Site Controller

  IMAGE RULE:
  All canonical SJL image assets live in /images/
  and use exact uppercase .PNG filenames.

  If the image directory ever changes, change ONLY this variable.
*/

const IMAGE_DIRECTORY = "images/";


/* =========================================================
   IMAGE RECORD HANDLING
========================================================= */

function markMissingImages() {
  const images = document.querySelectorAll("img");

  images.forEach((image) => {

    image.addEventListener("error", () => {
      image.classList.add("image-missing");

      image.setAttribute(
        "alt",
        `${image.alt || "Image"} — image record pending`
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

    const linkTarget = link.getAttribute("href").replace("#", "");

    if (linkTarget === currentSection) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }

  });
}


/* =========================================================
   ACTIVE NAVIGATION STYLE
========================================================= */

function addActiveNavigationStyle() {

  const style = document.createElement("style");

  style.textContent = `
    .main-nav a.active {
      color: var(--black);
      background: var(--cyan);
      border-color: var(--cyan);
    }
  `;

  document.head.appendChild(style);
}


/* =========================================================
   IMAGE DIRECTORY REFERENCE
========================================================= */

function exposeImageDirectory() {

  window.SJL = window.SJL || {};

  window.SJL.imageDirectory = IMAGE_DIRECTORY;

  window.SJL.image = function(filename) {
    return `${IMAGE_DIRECTORY}${filename}`;
  };

}


/* =========================================================
   ARCHIVE STATUS
========================================================= */

function updateArchiveStatus() {

  const status = document.querySelector(".header-status");

  if (!status) {
    return;
  }

  const missingImages = document.querySelectorAll(
    "img.image-missing"
  ).length;

  if (missingImages > 0) {

    const existingNotice = status.querySelector(".missing-count");

    if (existingNotice) {
      existingNotice.remove();
    }

    const notice = document.createElement("span");

    notice.className = "missing-count";
    notice.textContent = `${missingImages} IMAGE RECORDS PENDING`;

    notice.style.color = "var(--yellow)";

    status.appendChild(notice);
  }

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  exposeImageDirectory();

  addActiveNavigationStyle();

  markMissingImages();

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

  /*
    Give broken-image handlers time to fire before checking
    the archive status.
  */
  window.setTimeout(
    updateArchiveStatus,
    500
  );

});
