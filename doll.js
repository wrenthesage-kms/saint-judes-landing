"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("section-nav");
  const buttons = nav ? nav.querySelectorAll("button[data-section]") : [];
  const sections = document.querySelectorAll(".character-section");

  function activateSection(id) {
    buttons.forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.section === id
      );
    });
  }

  function scrollToSection(id) {
    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    history.replaceState(null, "", `#${id}`);
    activateSection(id);
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      scrollToSection(button.dataset.section);
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length) {
        activateSection(visible[0].target.id);
      }
    },
    {
      rootMargin: "-25% 0px -60% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75]
    }
  );

  sections.forEach(section => observer.observe(section));

  const initialHash = window.location.hash.replace("#", "");

  if (initialHash && document.getElementById(initialHash)) {
    setTimeout(() => {
      document.getElementById(initialHash).scrollIntoView({
        behavior: "instant",
        block: "start"
      });

      activateSection(initialHash);
    }, 50);
  } else if (buttons.length) {
    activateSection(buttons[0].dataset.section);
  }
});
