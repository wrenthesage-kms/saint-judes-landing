/* =========================================================
   SAINT JUDE'S LANDING — MONSTERS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");

    if (menuToggle && siteNav) {
        menuToggle.addEventListener("click", () => {
            siteNav.classList.toggle("open");
        });
    }


    /*
     * The creature tags get a tiny bit of movement when hovered.
     * Nothing important depends on this. It just makes the page
     * feel slightly less dead.
     */

    const creatureTags = document.querySelectorAll(".creature-list span");

    creatureTags.forEach((tag) => {

        tag.addEventListener("mouseenter", () => {

            const rotation = (Math.random() * 2 - 1).toFixed(2);

            tag.style.transform = `rotate(${rotation}deg)`;
        });

        tag.addEventListener("mouseleave", () => {
            tag.style.transform = "";
        });
    });


    /*
     * The warning box occasionally lies.
     * Obviously.
     */

    const warning = document.querySelector(".hero-warning p");

    if (warning) {

        const warnings = [
            "If something looks almost human from far enough away, that does not mean you should walk closer.",
            "If you hear your own voice from somewhere you are not standing, go home.",
            "Do not assume the thing watching you has eyes.",
            "If it knows your name and you do not know its name, leave.",
            "Some things in SJL are perfectly harmless. Unfortunately, you usually find that out afterward."
        ];

        let warningIndex = 0;

        setInterval(() => {

            warningIndex = (warningIndex + 1) % warnings.length;

            warning.style.opacity = "0";

            setTimeout(() => {
                warning.textContent = warnings[warningIndex];
                warning.style.opacity = "1";
            }, 250);

        }, 12000);
    }

});
