async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const messageText = userInput.value.trim();
    if (messageText === "") return;

    // Display user message
    appendMessage("user", messageText);

    // Show typing animation
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("message", "bot-message", "typing");
    typingIndicator.innerHTML = "<span></span><span></span><span></span>";
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send message to backend
    try {
        const response = await fetch("http://localhost:3001/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: messageText }),
        });

        const data = await response.json();
        
        // Remove typing animation and display bot response
        chatBox.removeChild(typingIndicator);
        appendMessage("bot", data.response);
    } catch (error) {
        chatBox.removeChild(typingIndicator);
        appendMessage("bot", "Error: Unable to reach the chatbot server.");
    }

    userInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to display messages in chat box
function appendMessage(sender, text) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
}

// Handle Enter Key to Send Message
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

//go back
function goBack() {
    window.history.back();
}
