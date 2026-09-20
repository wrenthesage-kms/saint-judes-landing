document.addEventListener("DOMContentLoaded", () => {

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


    document.querySelectorAll("img").forEach((image) => {
        image.addEventListener("error", () => {
            image.classList.add("image-missing");

            const figure = image.closest("figure");
            const caption = figure?.querySelector("figcaption");

            if (caption) {
                caption.textContent = "GIMME A SEC. THIS IMAGE ISN'T HERE YET.";
            }
        });
    });


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


    const movingImages = document.querySelectorAll(
        ".hero-image img, .look-image img, .skate-hero img, .road-image img, .final-image img"
    );

    function updateImageMovement() {
        movingImages.forEach((image) => {
            const rect = image.getBoundingClientRect();

            if (rect.bottom < 0 || rect.top > window.innerHeight) return;

            const distance =
                (window.innerHeight / 2 - rect.top) * 0.008;

            image.style.transform =
                `translate3d(0, ${distance}px, 0) scale(1.018)`;
        });
    }

    window.addEventListener("scroll", updateImageMovement, {
        passive: true
    });

    updateImageMovement();


    const revealElements = document.querySelectorAll(
        ".intro-copy, .behavior-list article, .speech-board, .food-grid, .pugad-note, .city-copy, .fashion-grid, .social-grid, .tail-grid, .outlier-grid, .road-copy, .wren-note"
    );

    revealElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(22px)";
        element.style.transition =
            "opacity 0.9s ease, transform 0.9s ease";
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
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });


    const tailSection = document.querySelector(".tail-section");

    if (tailSection) {
        const tailObserver = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    tailSection.classList.add("tail-seen");

                    observerInstance.unobserve(entry.target);
                });
            },
            {
                threshold: 0.3
            }
        );

        tailObserver.observe(tailSection);
    }


    const skateSection = document.querySelector(".skate-section");

    if (skateSection) {
        const skateObserver = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    skateSection.classList.add("skate-seen");

                    observerInstance.unobserve(entry.target);
                });
            },
            {
                threshold: 0.25
            }
        );

        skateObserver.observe(skateSection);
    }


    console.log(
        "%cCHECHE",
        "font-family: monospace; font-size: 20px; color: #244cff;"
    );

    console.log(
        "%cPUGAD GIRL.",
        "font-family: monospace; color: #d5b94c;"
    );

    console.log(
        "%cShe knows the city already.",
        "font-family: monospace; color: #f25c24;"
    );

    console.log(
        "%cDo not touch her hair.",
        "font-family: monospace; color: #eee4c9;"
    );
});
