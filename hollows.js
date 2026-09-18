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

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("error", () => {
            image.classList.add("image-missing");

            const caption = image.closest("figure")?.querySelector("figcaption");

            if (caption && !caption.dataset.originalText) {
                caption.dataset.originalText = caption.textContent;
                caption.textContent = "IMAGE RECORD PENDING";
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

        });

    });


    /* SUBTLE IMAGE MOVEMENT */

    const parallaxImages = document.querySelectorAll(
        ".hero-image img, .fog-road img, .night-image img"
    );

    function updateParallax() {

        const scrollY = window.scrollY;

        parallaxImages.forEach((image) => {

            const rect = image.getBoundingClientRect();

            if (rect.bottom < 0 || rect.top > window.innerHeight) return;

            const offset = (window.innerHeight / 2 - rect.top) * 0.015;

            image.style.transform = `translate3d(0, ${offset}px, 0) scale(1.025)`;

        });

    }

    window.addEventListener("scroll", updateParallax, {
        passive: true
    });


    /* RECORD APPEARANCE */

    const records = document.querySelectorAll(
        ".record-text, .inside-note, .below-warning, .records-bottom div, .do-not"
    );

    records.forEach((record) => {
        record.style.transition = "opacity 1.2s ease, transform 1.2s ease";
        record.style.opacity = "0";
        record.style.transform = "translateY(18px)";
    });

    const recordObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.18
        }
    );

    records.forEach((record) => {
        recordObserver.observe(record);
    });


    /* WATCHING SECTION */

    const watchingSection = document.querySelector(".watching");

    if (watchingSection) {

        let hasEntered = false;

        const watchingObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting || hasEntered) return;

                    hasEntered = true;

                    document.body.classList.add("someone-is-watching");

                    setTimeout(() => {
                        document.body.classList.remove("someone-is-watching");
                    }, 1800);

                });

            },
            {
                threshold: 0.3
            }
        );

        watchingObserver.observe(watchingSection);
    }


    /* DON'T MAKE THE FOG TOO OBVIOUS */

    const fogSection = document.querySelector(".fog-section");

    if (fogSection) {

        fogSection.addEventListener("mouseenter", () => {
            document.body.style.setProperty("--fog-intensity", "0.18");
        });

        fogSection.addEventListener("mouseleave", () => {
            document.body.style.setProperty("--fog-intensity", "0.11");
        });

    }


    /* NIGHT SECTION: NO JUMPSCARE.
       Just a tiny delay before the image settles. */

    const night = document.querySelector(".night");

    if (night) {

        const nightImage = night.querySelector(".night-image img");

        const nightObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    if (nightImage) {
                        nightImage.style.transition =
                            "filter 3s ease, opacity 3s ease";

                        nightImage.style.filter =
                            "saturate(0.25) brightness(0.43)";
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


    /* TINY ARCHIVE EASTER EGG */

    console.log(
        "%cTHE HOLLOWS",
        "font-family: monospace; font-size: 18px; color: #aeb5a9;"
    );

    console.log(
        "%cYou are not required to explain what you saw.",
        "font-family: monospace; color: #687167;"
    );

    console.log(
        "%cNOT EVERYTHING IS EXPLAINED.",
        "font-family: monospace; color: #4f574e;"
    );

});
