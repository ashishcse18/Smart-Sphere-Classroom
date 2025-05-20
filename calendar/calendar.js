document.addEventListener("DOMContentLoaded", fetchSchedules);

function saveSchedule() {
    let date = document.getElementById("schedule-date").value;
    let description = document.getElementById("schedule-description").value;

    if (date === "" || description === "") {
        alert("Please select a date and enter a description.");
        return;
    }

    let scheduleData = { date, desc: description };

    fetch("http://localhost:2000/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheduleData)
    })
    .then(response => response.json())
    .then(data => {
        alert("✅ Schedule saved!");
        fetchSchedules();  // Refresh list
    })
    .catch(error => console.error("❌ Error saving schedule:", error));
}

function fetchSchedules() {
    fetch("http://localhost:2000/events")
    .then(response => response.json())
    .then(data => {
        let taskList = document.getElementById("task-list");
        taskList.innerHTML = "";  // Clear old data

        data.forEach(event => {
            let eventDate = new Date(event.date);
            let formattedDate = eventDate.getUTCDate().toString().padStart(2, '0') + '/' +
                                (eventDate.getUTCMonth() + 1).toString().padStart(2, '0') + '/' +
                                eventDate.getUTCFullYear();

            let li = document.createElement("li");
            li.innerHTML = `<strong>${formattedDate}:</strong> ${event.desc} 
                            <button class="delete-btn" onclick="deleteTask('${event._id}')">Delete</button>`;
            taskList.appendChild(li);
        });
    })
    .catch(error => console.log("❌ Error fetching schedules:", error));
}

function deleteTask(id) {
    fetch(`http://localhost:2000/delete/${id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => {
        alert("🗑 Task deleted!");
        fetchSchedules();
    })
    .catch(error => console.log("❌ Error deleting task:", error));
}

function goBack() {
    window.history.back();
}
