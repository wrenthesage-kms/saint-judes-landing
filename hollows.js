document.addEventListener("DOMContentLoaded", () => {

    /*
        THE HOLLOWS

        This page is supposed to feel like a place somebody actually
        fucked around with, not a government website.

        The fog is doing most of the work.
    */


    /* LOCAL CLOCK */

    const clock = document.getElementById("local-clock");

    function updateClock() {
        if (!clock) return;

        const now = new Date();

        clock.textContent = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    }

    updateClock();
    setInterval(updateClock, 30000);


    /* MISSING IMAGE HANDLING */

    document.querySelectorAll("img").forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add("image-missing");

            const figure = image.closest("figure");
            const caption = figure?.querySelector("figcaption");

            if (caption && !caption.dataset.originalText) {
                caption.dataset.originalText = caption.textContent;
                caption.textContent = "gimme a sec. image isn't here yet.";
            }

        });

    });


    /* LOCAL NAVIGATION */

    document.querySelectorAll(".local-nav a").forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetID = link.getAttribute("href");

            if (!targetID || !targetID.startsWith("#")) return;

            const target = document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.replaceState(null, "", targetID);

        });

    });


    /* SOFT PARALLAX */

    const parallaxImages = document.querySelectorAll(
        ".hero-image img, .fog-road img, .night-image img, .closing-image img"
    );

    function updateParallax() {

        const viewportHeight = window.innerHeight;

        parallaxImages.forEach((image) => {

            const rect = image.getBoundingClientRect();

            if (
                rect.bottom < -100 ||
                rect.top > viewportHeight + 100
            ) {
                return;
            }

            const distance =
                viewportHeight / 2 -
                (rect.top + rect.height / 2);

            const offset = distance * 0.018;

            image.style.transform =
                `translate3d(0, ${offset}px, 0) scale(1.025)`;

        });

    }

    window.addEventListener(
        "scroll",
        updateParallax,
        { passive: true }
    );

    updateParallax();


    /* LITTLE APPEARANCES */

    const revealTargets = document.querySelectorAll(
        ".field-note, " +
        ".inside-note, " +
        ".below-note, " +
        ".records-bottom div, " +
        ".watching-note, " +
        ".hero-note"
    );

    revealTargets.forEach((element) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(14px)";
        element.style.transition =
            "opacity 1s ease, transform 1s ease";

    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.15
        }
    );

    revealTargets.forEach((element) => {
        revealObserver.observe(element);
    });


    /* THE WATCHING THING */

    const watchingSection =
        document.querySelector(".watching");

    if (watchingSection) {

        let hasEntered = false;

        const watchingObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            !entry.isIntersecting ||
                            hasEntered
                        ) {
                            return;
                        }

                        hasEntered = true;

                        document.body.classList.add(
                            "someone-is-watching"
                        );

                        setTimeout(() => {

                            document.body.classList.remove(
                                "someone-is-watching"
                            );

                        }, 1600);

                    });

                },
                {
                    threshold: 0.3
                }
            );

        watchingObserver.observe(watchingSection);

    }


    /* FOG DOESN'T NEED TO ANNOUNCE ITSELF */

    const fogSection =
        document.querySelector(".fog-section");

    if (fogSection) {

        fogSection.addEventListener(
            "mouseenter",
            () => {
                document.documentElement.style
                    .setProperty("--fog-intensity", "0.17");
            }
        );

        fogSection.addEventListener(
            "mouseleave",
            () => {
                document.documentElement.style
                    .setProperty("--fog-intensity", "0.12");
            }
        );

    }


    /* NIGHT IMAGE */

    const night =
        document.querySelector(".night");

    if (night) {

        const nightImage =
            night.querySelector(".night-image img");

        const nightObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) return;

                        if (nightImage) {

                            nightImage.style.filter =
                                "saturate(0.23) brightness(0.42)";

                        }

                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.35
                }
            );

        nightObserver.observe(night);

    }


    /*
        CONSOLE

        Not an archive message.
        Just somebody leaving shit in the console.
    */

    console.log(
        "%cTHE HOLLOWS",
        "font-family: monospace; font-size: 18px; color: #aeb5a9;"
    );

    console.log(
        "%cold houses. fog. somebody's dog barking.",
        "font-family: monospace; color: #697268;"
    );

    console.log(
        "%cnot everything is explained.",
        "font-family: monospace; color: #4f574e;"
    );

});
