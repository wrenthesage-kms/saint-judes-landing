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
                caption.textContent = "GIMME A SEC. THIS IMAGE ISN'T HERE YET.";
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
        ".hero-image img, .wing-image img, .hollows-section figure img, .wreckage-image img, .outlier-section figure img"
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

    updateImageMovement();


    const revealElements = document.querySelectorAll(
        ".appearance-copy, .wing-copy, .hollows-copy, .wreckage-copy, .inspiration-list div, .outlier-copy, .wren-note"
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
                title.textContent = "TANSY";

                title.style.transform =
                    `translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 3}px)`;

                setTimeout(() => {
                    title.textContent = originalTitle;
                    title.style.transform = "";
                }, 110);
            }
        }, 2200);
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
        "%cTANSY",
        "font-family: monospace; font-size: 18px; color: #e89ac0;"
    );

    console.log(
        "%cHollows.",
        "font-family: monospace; color: #8ed8d0;"
    );

    console.log(
        "%cStill here.",
        "font-family: monospace; color: #b9a9ae;"
    );
})();
