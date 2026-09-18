/*
    SAINT JUDE'S LANDING
    CITY RECORD // CLIENT SCRIPT

    This is intentionally small.

    The site is meant to feel like a collection of records,
    not an application pretending to be a city.
*/


document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll(".nav-link");
    const views = document.querySelectorAll(".view");
    const toast = document.getElementById("toast");

    let toastTimer = null;


    /*
        ---------------------------------------------------------
        VIEW SWITCHING
        ---------------------------------------------------------
    */

    function showView(viewId, updateHash = true) {

        const target = document.getElementById(viewId);

        if (!target) {
            return;
        }


        views.forEach(view => {
            view.classList.toggle(
                "active",
                view.id === viewId
            );
        });


        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.dataset.view === viewId
            );
        });


        if (updateHash) {
            history.replaceState(
                null,
                "",
                `#${viewId}`
            );
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            showView(
                link.dataset.view
            );

        });

    });


    /*
        ---------------------------------------------------------
        HASH NAVIGATION
        ---------------------------------------------------------
    */

    function loadFromHash() {

        const hash = window.location.hash.replace("#", "");

        if (
            hash &&
            document.getElementById(hash)
        ) {
            showView(hash, false);
        }

    }


    loadFromHash();


    window.addEventListener("hashchange", loadFromHash);


    /*
        ---------------------------------------------------------
        PLACE PLACEHOLDERS
        ---------------------------------------------------------
    */

    const placeholderLinks = document.querySelectorAll(
        "[data-placeholder]"
    );


    placeholderLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            showToast(
                link.dataset.placeholder
            );

        });

    });


    /*
        ---------------------------------------------------------
        TOAST
        ---------------------------------------------------------
    */

    function showToast(message) {

        if (!toast) {
            return;
        }


        clearTimeout(toastTimer);


        toast.textContent = message;

        toast.classList.add("show");


        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2800);

    }


    /*
        ---------------------------------------------------------
        KEYBOARD NAVIGATION
        ---------------------------------------------------------
    */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            toast.classList.contains("show")
        ) {
            toast.classList.remove("show");
        }

    });


    /*
        ---------------------------------------------------------
        IMAGE FAILURE HANDLING
        ---------------------------------------------------------

        Keeps a broken asset from making the entire record
        look broken. It does not substitute fake imagery.
    */

    const images = document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("asset-missing");

            image.alt =
                "IMAGE ASSET UNAVAILABLE — RECORD INCOMPLETE";

        });

    });


    /*
        ---------------------------------------------------------
        SMALL RANDOM FIELD NOTE
        ---------------------------------------------------------

        These are intentionally not new lore.

        They are existing SJL statements used as rotating
        interface flavor.
    */

    const fieldNotes = [

        "The map is wrong.",

        "Nobody designed this place.",

        "There is no single ground floor anymore.",

        "Everything has a reason. Most of those reasons have been forgotten.",

        "The city is not a setting.",

        "Not everything is explained.",

        "People are the city.",

        "SJL functions despite everything because people keep making it function."

    ];


    const footerBottom = document.querySelector(".footer-bottom");


    if (footerBottom) {

        footerBottom.addEventListener(
            "dblclick",
            () => {

                const note =
                    fieldNotes[
                        Math.floor(
                            Math.random() * fieldNotes.length
                        )
                    ];

                showToast(note);

            }
        );

    }

});
