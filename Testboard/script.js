// Open the popup when the "plus" button is clicked
document.getElementById('plusBtn').addEventListener('click', () => {
  const testPopup = document.getElementById('testPopup');
  testPopup.style.display = 'flex'; // Show the popup
});

// Add a new question container when the "Add Question" button is clicked
document.getElementById('addQuestionBtn').addEventListener('click', () => {
  const questionContainer = document.createElement('div');
  questionContainer.classList.add('question-container');

  questionContainer.innerHTML = `
      <div class="form-group">
          <label for="question">Question:</label>
          <input type="text" name="question" class="question" required>
      </div>
      <div class="form-group">
          <label for="option1">Option 1:</label>
          <input type="text" name="option1" class="option" required>
      </div>
      <div class="form-group">
          <label for="option2">Option 2:</label>
          <input type="text" name="option2" class="option" required>
      </div>
      <div class="form-group">
          <label for="option3">Option 3:</label>
          <input type="text" name="option3" class="option" required>
      </div>
      <div class="form-group">
          <label for="option4">Option 4:</label>
          <input type="text" name="option4" class="option" required>
      </div>
      <div class="form-group">
          <label for="correctOption">Correct Option:</label>
          <select name="correctOption" class="correct-option" required>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
          </select>
      </div>
  `;

  document.getElementById('questionsContainer').appendChild(questionContainer);
});

// Handle form submission
document.getElementById('testForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(document.getElementById('testForm'));
  const testData = {
      subjectTitle: formData.get('subjectTitle'),
      subjectCode: formData.get('subjectCode'),
      duration: formData.get('duration'),
      questions: []
  };

  // Collect all question data from the UI
  // Collect all question data from the UI
const questions = document.querySelectorAll('.question-container');
questions.forEach((questionContainer) => {
    const question = questionContainer.querySelector('.question')?.value.trim();
    const options = [];

    // Capture options correctly
    const optionInputs = questionContainer.querySelectorAll('.option');
    optionInputs.forEach(input => {
        options.push(input.value.trim());
    });

    const correctOption = questionContainer.querySelector('.correct-option')?.value.trim() || '';

    if (question && options.every(opt => opt !== '') && correctOption) {
        testData.questions.push({
            question,
            options,
            correctOption
        });
    }
});


  // Log the testData to console for debugging purposes
  console.log('Prepared Test Data:', testData);

  // Send the data to the server
  fetch('http://localhost:3000/createTest', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
  })
  .then(response => response.json())
  .then(data => {
      alert('Test Created Successfully!');
      document.getElementById('testPopup').style.display = 'none';  // Close the popup
  })
  .catch(error => {
      console.error('Error creating test:', error);
      alert('Error creating test');
  });
});

document.getElementById("CancelBtn").addEventListener("click",function(){
    window.location.href="TestDashboard.html";
});