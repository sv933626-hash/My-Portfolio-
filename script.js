alert("JavaScript is working!");
"use strict";

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
});

// Close the menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    });
});

// Automatically update the footer year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Reveal sections when they enter the screen
document.documentElement.classList.add("js-ready");

const revealElements = document.querySelectorAll(
    ".section-heading, .about-grid, .timeline-item, " +
    ".skill-card, .project-card, .contact-grid"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

// Contact form: prepare an email using the visitor's email app
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// IMPORTANT: Replace this with your real email address.
const ownerEmail = "your.email@example.com";

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    if (ownerEmail === "your.email@example.com") {
        formStatus.textContent =
            "Please add your real email address in index.html and script.js first.";
        return;
    }

    const name = document.getElementById("visitorName").value.trim();
    const email = document.getElementById("visitorEmail").value.trim();
    const message = document.getElementById("visitorMessage").value.trim();

    const subject = encodeURIComponent(
        "Portfolio message from " + name
    );

    const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    formStatus.textContent =
        "Your email app should open with the message prepared.";

    window.location.href =
        "mailto:" + ownerEmail +
        "?subject=" + subject +
        "&body=" + body;
});
