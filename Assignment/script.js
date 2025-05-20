async function uploadAssignment() {
    let subjectTitle = document.getElementById('subjectTitle').value.trim();
    let subjectCode = document.getElementById('subjectCode').value.trim();
    let title = document.getElementById('title').value.trim();
    let description = document.getElementById('description').value.trim();
    let fileInput = document.getElementById('facultyFileInput');
    let file = fileInput.files.length > 0 ? fileInput.files[0] : null;

    if (!subjectTitle || !subjectCode || !title) {
        alert("Subject Title, Subject Code, and Assignment Title are required!");
        return;
    }

    let assignmentData = { subjectTitle, subjectCode, title, description };

    if (file) {
        let reader = new FileReader();
        reader.onload = async function (e) {
            assignmentData.file = e.target.result;

            let response = await fetch("http://localhost:5000/assignments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(assignmentData)
            });

            let result = await response.json();
            alert(result.message);
            displayAssignments();
        };
        reader.readAsDataURL(file);
    } else {
        let response = await fetch("http://localhost:5000/assignments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(assignmentData)
        });

        let result = await response.json();
        alert(result.message);
        displayAssignments();
    }
}


async function displayAssignments() {
    let assignmentsList = document.getElementById('assignmentsList');
    let subjectInfo = document.getElementById('subjectInfo');
    
    assignmentsList.innerHTML = '';
    subjectInfo.innerHTML = '';

    let response = await fetch("http://localhost:5000/assignments");
    let assignments = await response.json();

    assignments.forEach(assignment => {
        subjectInfo.innerHTML = `<h3>Subject: ${assignment.subjectTitle} (${assignment.subjectCode})</h3>`;

        assignmentsList.innerHTML += `
            <div class="assignment">
                <h3>${assignment.title}</h3>
                <p>${assignment.description || "No description provided"}</p>
                ${assignment.file ? `<a href="${assignment.file}" download="assignment.pdf">Download PDF</a>` : "<p>No PDF uploaded</p>"}
            </div>
        `;
    });
}

// Load assignments when the page loads
document.addEventListener("DOMContentLoaded", () => {
    displayAssignments();
});

//faculty - page
// Fetch and Display Assignments in Faculty Page
async function fetchAssignments() {
    let table = document.getElementById('assignmentsTable');
    let button = document.querySelector(".viewbtn");

    // Toggle visibility
    if (table.style.display === "none" || table.style.display === "") {
        table.style.display = "table"; // Show table
        button.innerText = "Hide Assignments"; // Change button text

        let response = await fetch("http://localhost:5000/assignments");
        let assignments = await response.json();

        let tableBody = document.getElementById('assignmentsBody');
        tableBody.innerHTML = '';

        assignments.forEach((assignment) => {
            let row = `<tr>
                <td>${assignment.subjectTitle}</td>
                <td>${assignment.subjectCode}</td>
                <td>${assignment.title}</td>
                <td>${assignment.description || "No description"}</td>
                <td>${assignment.file ? `<a href="${assignment.file}" download>Download</a>` : "No File"}</td>
                <td><button class="delete-btn" onclick="deleteAssignment('${assignment._id}')">Delete</button></td>
            </tr>`;
            tableBody.innerHTML += row;
        });

    } else {
        table.style.display = "none"; // Hide table
        button.innerText = "View Assignments"; // Change button text
    }
}

// Ensure the table starts hidden
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('assignmentsTable').style.display = "none";
});


// Delete an Assignment
async function deleteAssignment(assignmentId) {
    if (!confirm("Are you sure you want to delete this assignment?")) return;

    try {
        let response = await fetch(`http://localhost:5000/assignments/${assignmentId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            let errorMessage = await response.text(); // Read response text
            throw new Error(`Error: ${response.status} - ${errorMessage}`);
        }

        let result = await response.json();
        alert(result.message);
        fetchAssignments();  // Refresh the list
    } catch (err) {
        console.error("Delete Request Failed:", err);
        alert("Failed to delete assignment. Check the console.");
    }
}

function goBack() {
    window.history.back();
}

// Load assignments when the faculty page opens
document.addEventListener("DOMContentLoaded", fetchAssignments);
