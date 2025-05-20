// Function to navigate back
function goBack() {
    window.history.back();
}

// GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
    gsap.to(".animate-title", { duration: 1, opacity: 1, y: 0, ease: "power2.out" });
    gsap.to(".fade-in", { duration: 1, opacity: 1, y: 0, stagger: 0.3, ease: "power2.out" });
    gsap.to(".feature-list", { duration: 1.5, opacity: 1, ease: "power2.out" });
    gsap.to(".team", { duration: 1.5, opacity: 1, ease: "power2.out", delay: 0.5 });
});