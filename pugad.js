document.addEventListener("DOMContentLoaded", () => {

    /* LOCAL CLOCK */

    const clock = document.getElementById("local-clock");

    function updateClock() {

        if (!clock) return;

        const now = new Date();

        clock.textContent = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });

    }

    updateClock();
    setInterval(updateClock, 1000);


    /* IMAGE RECORD HANDLING */

    document.querySelectorAll("img").forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add("image-missing");

            const figure = image.closest("figure");
            const caption = figure?.querySelector("figcaption");

            if (caption) {
                caption.textContent = "IMAGE RECORD PENDING";
            }

        });

    });


    /* LOCAL NAV */

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

        });

    });


    /* SMALL AMOUNT OF IMAGE MOVEMENT */

    const movingImages = document.querySelectorAll(
        ".hero-image img, .land-image img, .road-image img, .night-image img, .final-road-image img"
    );

    function updateImageMovement() {

        movingImages.forEach((image) => {

            const rect = image.getBoundingClientRect();

            if (rect.bottom < 0 || rect.top > window.innerHeight) {
                return;
            }

            const distance =
                (window.innerHeight / 2 - rect.top) * 0.012;

            image.style.transform =
                `translate3d(0, ${distance}px, 0) scale(1.025)`;

        });

    }

    window.addEventListener("scroll", updateImageMovement, {
        passive: true
    });


    /* QUIET FADE-IN FOR RECORD ELEMENTS */

    const revealElements = document.querySelectorAll(
        ".daily-note, .culture-list > div, .infrastructure-copy, .kids-copy, .city-copy, .cheche-copy, .final-road-copy"
    );

    revealElements.forEach((element) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition =
            "opacity 1.1s ease, transform 1.1s ease";

    });


    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observerInstance.unobserve(entry.target);

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach((element) => {
        observer.observe(element);
    });


    /* ROAD DISTANCE EFFECT */

    const roadSection = document.querySelector(".road-section");

    if (roadSection) {

        const roadObserver = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    roadSection.classList.add("road-seen");

                    observerInstance.unobserve(entry.target);

                });

            },
            {
                threshold: 0.35
            }
        );

        roadObserver.observe(roadSection);

    }


    /* ARCHIVE CONSOLE EASTER EGG */

    console.log(
        "%cPUGAD",
        "font-family: monospace; font-size: 18px; color: #d8cfb3;"
    );

    console.log(
        "%cNOT A DISTRICT.",
        "font-family: monospace; color: #8f8975;"
    );

    console.log(
        "%cThe city is still there.",
        "font-family: monospace; color: #746f5d;"
    );

});
