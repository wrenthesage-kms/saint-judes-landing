(() => {
    "use strict";

    const clock = document.getElementById("clock");

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
                caption.textContent =
                    "GIMME A SEC. THIS IMAGE ISN'T HERE YET.";
            }

        });

    });


    document.querySelectorAll('.local-nav a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetID = link.getAttribute("href");
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
        ".hero-image img, .pregnancy-image img, .mothball-section figure img, .rooftop-section figure img, .night-section figure img, .outlier-section figure img"
    );

    function updateImageMovement() {

        movingImages.forEach((image) => {

            const rect = image.getBoundingClientRect();

            if (rect.bottom < 0 || rect.top > window.innerHeight) {
                return;
            }

            const distance =
                (window.innerHeight / 2 - rect.top) * 0.01;

            image.style.transform =
                `translate3d(0, ${distance}px, 0) scale(1.025)`;

        });

    }

    window.addEventListener("scroll", updateImageMovement, {
        passive: true
    });

    updateImageMovement();


    const revealElements = document.querySelectorAll(
        ".appearance-copy, .pregnancy-copy, .mothball-copy, .rooftop-copy, .night-copy, .outlier-copy, .wren-note"
    );

    revealElements.forEach((element) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(18px)";
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


    const title = document.querySelector(".hero h1");

    if (title) {

        const originalTitle = title.textContent;

        setInterval(() => {

            if (Math.random() > 0.9) {

                title.textContent = "MIDGE";

                title.style.transform =
                    `translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 3}px)`;

                setTimeout(() => {

                    title.textContent = originalTitle;
                    title.style.transform = "";

                }, 110);

            }

        }, 2300);

    }


    document.querySelectorAll(".detail-strip img").forEach((image) => {

        image.addEventListener("mousemove", (event) => {

            const rect = image.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;

            image.style.transform =
                `scale(1.035) translate(${x * 4}px, ${y * 4}px)`;

        });

        image.addEventListener("mouseleave", () => {
            image.style.transform = "";
        });

    });


    console.log(
        "%cMIDGE",
        "font-family: monospace; font-size: 18px; color: #d98291;"
    );

    console.log(
        "%cMothball.",
        "font-family: monospace; color: #c49a5a;"
    );

    console.log(
        "%cNot a district.",
        "font-family: monospace; color: #87966b;"
    );

})();
