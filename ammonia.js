document.addEventListener("DOMContentLoaded", () => {

  const navButtons = document.querySelectorAll(".nav-button");
  const sections = document.querySelectorAll(".page-section");


  function showSection(sectionId) {

    sections.forEach((section) => {
      section.classList.remove("active");
    });


    navButtons.forEach((button) => {
      button.classList.remove("active");
    });


    const targetSection = document.getElementById(sectionId);
    const targetButton = document.querySelector(
      `.nav-button[data-section="${sectionId}"]`
    );


    if (targetSection) {
      targetSection.classList.add("active");
    }


    if (targetButton) {
      targetButton.classList.add("active");
    }


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  navButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const sectionId = button.dataset.section;

      if (!sectionId) {
        return;
      }

      showSection(sectionId);

    });

  });


  /*
   * Allow direct navigation with:
   *
   * ammonia.html#about
   * ammonia.html#personal
   * ammonia.html#social
   * ammonia.html#romance
   * ammonia.html#nsfw
   * ammonia.html#creator
   * ammonia.html#gallery
   * ammonia.html#interview
   */

  function loadHashSection() {

    const hash = window.location.hash.replace("#", "");

    if (!hash) {
      showSection("about");
      return;
    }


    const sectionExists = document.getElementById(hash);

    if (sectionExists && sectionExists.classList.contains("page-section")) {
      showSection(hash);
    } else {
      showSection("about");
    }

  }


  window.addEventListener("hashchange", loadHashSection);


  /*
   * Keep the URL synchronized with the selected section.
   */

  navButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const sectionId = button.dataset.section;

      if (sectionId) {
        history.replaceState(
          null,
          "",
          `#${sectionId}`
        );
      }

    });

  });


  loadHashSection();

});
