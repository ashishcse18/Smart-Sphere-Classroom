// Function to handle sign-up
document.getElementById("signupForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    
    let username = document.getElementById("signupUsername").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;
    let confirmPassword = document.getElementById("signupConfirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Store user data in local storage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Sign-up successful! Redirecting to login page.");
    window.location.href = "login.html";
});

// Function to handle login
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let storedUsername = localStorage.getItem("username");
    let storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        alert("Login successful! Redirecting to homepage.");
        window.location.href = "../index.html#";
    } else {
        alert("Invalid username or password!");
    }
});

// Function for Back Button
function goBack() {
    window.history.back();
}
