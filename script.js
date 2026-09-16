/* =========================================================
   SAINT JUDE'S LANDING
   navigation + archive machinery
   ========================================================= */


/* =========================================================
   NAVIGATION
   ========================================================= */

const navButtons = document.querySelectorAll(
    ".nav-btn[data-target]"
);

const sections = document.querySelectorAll(
    ".page-section"
);


function showSection(targetId) {

    sections.forEach(section => {

        section.classList.toggle(
            "active",
            section.id === targetId
        );

    });


    navButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.target === targetId
        );

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   NAV BUTTON EVENTS
   ========================================================= */

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const target = button.dataset.target;

        showSection(target);

        history.replaceState(
            null,
            "",
            "#" + target
        );

    });

});


/* =========================================================
   OPEN SECTION FROM URL HASH
   ========================================================= */

const initialHash =
    window.location.hash.replace("#", "");


if (
    initialHash &&
    document.getElementById(initialHash)
) {

    showSection(initialHash);

}


/* =========================================================
   BROWSER BACK / FORWARD
   ========================================================= */

window.addEventListener(
    "hashchange",
    () => {

        const target =
            window.location.hash.replace("#", "");

        if (
            target &&
            document.getElementById(target)
        ) {
            showSection(target);
        }

    }
);


/* =========================================================
   RANDOM SAINT JUDE FACTS
   ========================================================= */

const facts = [

    "Saint Jude may have been a fisherman, a soldier, or a drunk who stole a boat. The surviving records are not especially helpful.",

    "The city has been rebuilt so many times that archaeological layers are part of ordinary construction.",

    "Some buildings contain structures that are centuries or even millennia older than the building currently wrapped around them.",

    "Mothball is inside Velvet. It is an enclave and market, not a sixth district.",

    "Some businesses in Saint Jude's Landing do not accept official municipal currency.",

    "Some residents have not paid municipal taxes in decades.",

    "There are streets in Saint Jude's that answer to nobody.",

    "Some behemoth remains are too large to move, so the city simply built around them.",

    "The first major behemoth carcass was larger than the settlement that discovered it.",

    "Behemoth material became building material, industrial material, fuel, chemicals, tools, commercial goods, and recreational substances.",

    "There is no complete map of Saint Jude's Landing.",

    "There is no single ground level anymore. There are only levels that somebody currently considers ground.",

    "The city did not replace its past. It built over it.",

    "The Neon Gut and Nine are connected by labor, transport, industrial supply, and illegal commerce.",

    "Mothball's economy depends on things arriving from almost everywhere else in the city.",

    "The city is still changing because people are still adding things to it.",

    "Nobody designed Saint Jude's Landing. People just kept adding shit to it.",

    "The practical solution adopted by outside governments was eventually to leave the city alone.",

    "The Outliers began the same way many small structures in Saint Jude's begin: somebody had nowhere to sleep, somebody else said come on, and that was apparently enough.",

    "Some things beneath Saint Jude's have no surviving explanation."

];


const factPopup =
    document.getElementById("fact-popup");

const factText =
    document.getElementById("fact-text");

const randomFactButton =
    document.getElementById("random-fact");

const closeFactButton =
    document.getElementById("close-fact");


function randomFact() {

    if (!factPopup || !factText) {
        return;
    }


    const fact =
        facts[
            Math.floor(
                Math.random() * facts.length
            )
        ];


    factText.textContent = fact;

    factPopup.classList.add("show");

}


if (randomFactButton) {

    randomFactButton.addEventListener(
        "click",
        randomFact
    );

}


if (closeFactButton) {

    closeFactButton.addEventListener(
        "click",
        () => {

            factPopup.classList.remove(
                "show"
            );

        }
    );

}


/* =========================================================
   ESC CLOSES POPUP
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            factPopup &&
            factPopup.classList.contains("show")
        ) {

            factPopup.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   RANDOM FACT SHORTCUT
   R = random fact
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const activeElement =
            document.activeElement
                ? document.activeElement.tagName
                : "";


        if (
            event.key.toLowerCase() === "r" &&
            activeElement !== "INPUT" &&
            activeElement !== "TEXTAREA" &&
            activeElement !== "BUTTON"
        ) {

            randomFact();

        }

    }
);


/* =========================================================
   STATUS LIGHT
   ========================================================= */

const statusDot =
    document.querySelector(".status-dot");


setInterval(() => {

    if (!statusDot) {
        return;
    }


    statusDot.style.opacity =
        Math.random() > 0.08
            ? "1"
            : "0.2";

}, 900);


/* =========================================================
   IMAGE LOAD HANDLING
   ========================================================= */

const images =
    document.querySelectorAll("img");


images.forEach(image => {

    image.addEventListener(
        "error",
        () => {

            image.classList.add(
                "image-missing"
            );

        }
    );

});


/* =========================================================
   SMALL "ARCHIVE" INTERACTION
   ========================================================= */

const imageFigures =
    document.querySelectorAll(
        "figure"
    );


imageFigures.forEach(figure => {

    figure.addEventListener(
        "mouseenter",
        () => {

            figure.dataset.hovered = "true";

        }
    );


    figure.addEventListener(
        "mouseleave",
        () => {

            delete figure.dataset.hovered;

        }
    );

});


/* =========================================================
   TOUCH DEVICES
   Avoid hover-dependent weirdness.
   ========================================================= */

if (
    window.matchMedia &&
    window.matchMedia("(hover: none)").matches
) {

    document.body.classList.add(
        "touch-device"
    );

}
