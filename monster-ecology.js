document.addEventListener("DOMContentLoaded", () => {

    const districts = document.querySelectorAll(".district");

    districts.forEach((district, index) => {
        district.style.opacity = "0";
        district.style.transform = "translateY(35px)";
        district.style.transition =
            "opacity 700ms ease, transform 700ms ease";

        district.dataset.ecologyIndex = index;
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12
        }
    );

    districts.forEach(district => observer.observe(district));


    const monsterTags = document.querySelectorAll(".monster-list span");

    monsterTags.forEach(tag => {
        tag.addEventListener("mouseenter", () => {
            tag.style.transform = "translate(-2px, -2px)";
        });

        tag.addEventListener("mouseleave", () => {
            tag.style.transform = "translate(0, 0)";
        });
    });


    const header = document.querySelector(".ecology-header");

    window.addEventListener("scroll", () => {
        if (!header) return;

        const scrollPosition = window.scrollY;
        const movement = Math.min(scrollPosition * 0.08, 35);

        header.style.backgroundPosition =
            `${movement}px ${movement}px`;
    });

});
