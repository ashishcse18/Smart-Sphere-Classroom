document.addEventListener("DOMContentLoaded", function() {
    const sidebarItems = document.querySelectorAll(".sidebar ul li a");
    sidebarItems.forEach(item => {
        item.addEventListener("click", function() {
            document.querySelector(".content h1").innerText = item.innerText;
        });
    });
});

// Acc Options
function toggleDropdown() {
    let dropdown = document.getElementById("dropdown-menu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Hide dropdown when clicking outside
document.addEventListener("click", function(event) {
    let dropdown = document.getElementById("dropdown-menu");
    let userIcon = document.querySelector(".user-icon");

    if (!userIcon.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = "none";
    }
});

// Logout function
function logout() {
    alert("Logging out...");
    // Redirect to login page
    window.location.href = "login page/login.html";
}
