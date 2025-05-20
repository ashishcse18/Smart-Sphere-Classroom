document.addEventListener("DOMContentLoaded", () => {
    let currentQuestionIndex = 0;
    let score = 0;
    let totalQuestions = 0;
    let selectedQuestions = [];
    let userAnswers = {};

    const questionSets = {
        logical: {
            "Number Series": [
                { "question": "1. Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?", "options": ["(1/3)", "(1/8)", "(2/8)", "(1/16)"], "correct": 1 },
                { "question": "2. Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?", "options": ["7", "10", "12", "13"], "correct": 1 },
                { "question": "3. Look at this series: 36, 34, 30, 28, 24, ... What number should come next?", "options": ["20", "22", "23", "26"], "correct": 1 },
                { "question": "4. Look at this series: 22, 21, 23, 22, 24, 23, ... What number should come next?", "options": ["22", "24", "25", "26"], "correct": 2 },
                { "question": "5. Look at this series: 53, 53, 40, 40, 27, 27, ... What number should come next?", "options": ["12", "14", "27", "53"], "correct": 1 },
                { "question": "6. Look at this series: 21, 9, 21, 11, 21, 13, 21, ... What number should come next?", "options": ["14", "15", "21", "23"], "correct": 1 },
                { "question": "7. Look at this series: 58, 52, 46, 40, 34, ... What number should come next?", "options": ["26", "28", "30", "32"], "correct": 1 },
                { "question": "8. Look at this series: 3, 4, 7, 8, 11, 12, ... What number should come next?", "options": ["7", "10", "14", "15"], "correct": 3 },
                { "question": "9. Look at this series: 8, 22, 8, 28, 8, ... What number should come next?", "options": ["9", "29", "32", "34"], "correct": 3 },
                { "question": "10. Look at this series: 31, 29, 24, 22, 17, ... What number should come next?", "options": ["15", "14", "13", "12"], "correct": 0 },
                { "question": "11. Look at this series: 1.5, 2.3, 3.1, 3.9, ... What number should come next?", "options": ["4.2", "4.4", "4.7", "5.1"], "correct": 2 },
                { "question": "12. Look at this series: 14, 28, 20, 40, 32, 64, ... What number should come next?", "options": ["52", "56", "96", "128"], "correct": 1 },
                { "question": "13. Look at this series: 2, 4, 6, 8, 10, ... What number should come next?", "options": ["11", "12", "13", "14"], "correct": 1 },
                { "question": "14. Look at this series: 201, 202, 204, 207, ... What number should come next?", "options": ["205", "208", "210", "211"], "correct": 3 },
                { "question": "15. Look at this series: 544, 509, 474, 439, ... What number should come next?", "options": ["404", "414", "420", "445"], "correct": 0 },
                { "question": "16. Look at this series: 80, 10, 70, 15, 60, ... What number should come next?", "options": ["20", "25", "30", "50"], "correct": 0 },
                { "question": "17. Look at this series: 2, 6, 18, 54, ... What number should come next?", "options": ["108", "148", "162", "216"], "correct": 2 },
                { "question": "18. Look at this series: 5.2, 4.8, 4.4, 4, ... What number should come next?", "options": ["3", "3.3", "3.5", "3.6"], "correct": 3 },
                { "question": "19. Look at this series: 8, 6, 9, 23, 87, ... What number should come next?", "options": ["128", "226", "324", "429"], "correct": 3 }
            ], "Blood Relationship": [
                { "question": "1. Pointing to a man, a woman said, 'He is the only son of my mother’s father.' How is the man related to the woman?", "options": ["Uncle", "Brother", "Father", "Cousin"], "correct": 1 },
                { "question": "2. If A is the brother of B, B is the sister of C, and C is the son of D, how is D related to A?", "options": ["Father", "Mother", "Uncle", "Aunt"], "correct": 0 },
                { "question": "3. If X is the father of Y and Y is the mother of Z, how is X related to Z?", "options": ["Grandfather", "Father", "Uncle", "Brother"], "correct": 0 },
                { "question": "4. Pointing to a photograph, a man said, 'I have no brothers and sisters but that man's father is my father's son.' Who is in the photograph?", "options": ["His son", "His father", "His uncle", "His cousin"], "correct": 0 },
                { "question": "5. If A is the mother of B, B is the sister of C, and C is the father of D, how is A related to D?", "options": ["Mother", "Grandmother", "Sister", "Aunt"], "correct": 1 },
                { "question": "6. Pointing to a man, a woman said, 'He is the son of my grandfather’s only son.' How is the man related to the woman?", "options": ["Brother", "Uncle", "Father", "Cousin"], "correct": 0 },
                { "question": "7. If A’s father is B’s son, then how is A related to B?", "options": ["Grandson", "Son", "Uncle", "Brother"], "correct": 0 },
                { "question": "8. If P is the brother of Q, Q is the mother of R, and R is the daughter of S, how is P related to S?", "options": ["Father", "Uncle", "Brother", "Grandfather"], "correct": 1 },
                { "question": "9. If A is the sister of B, and B is the son of C, how is C related to A?", "options": ["Father", "Mother", "Aunt", "Brother"], "correct": 0 },
                { "question": "10. If M is the father of N and N is the sister of O, how is O related to M?", "options": ["Son", "Daughter", "Brother", "Cousin"], "correct": 0 },
                { "question": "11. Pointing to a lady, a man said, 'She is the daughter of the only son of my grandfather.' How is the lady related to the man?", "options": ["Sister", "Mother", "Cousin", "Aunt"], "correct": 0 },
                { "question": "12. A is the father of B, but B is not the son of A. Who is B?", "options": ["Daughter", "Brother", "Uncle", "Aunt"], "correct": 0 },
                { "question": "13. A’s father is B’s brother, and B’s son is C’s brother. How is A related to C?", "options": ["Cousin", "Uncle", "Father", "Brother"], "correct": 0 },
                { "question": "14. A is B’s mother. B is C’s son. How is C related to A?", "options": ["Brother", "Father", "Husband", "Son"], "correct": 1 },
                { "question": "15. If X is the son of Y and Y is the father of Z, how is Z related to X?", "options": ["Sister", "Brother", "Uncle", "Cousin"], "correct": 1 },
                { "question": "16. Pointing to a picture, a boy says, 'She is the mother of my grandfather’s only grandson.' Who is in the picture?", "options": ["Mother", "Sister", "Grandmother", "Aunt"], "correct": 0 },
                { "question": "17. If A is B’s father’s nephew, and C is B’s cousin, how is A related to C?", "options": ["Uncle", "Brother", "Cousin", "Nephew"], "correct": 2 },
                { "question": "18. X is the mother of Y, and Y is the sister of Z. How is Z related to X?", "options": ["Daughter", "Son", "Father", "Uncle"], "correct": 1 },
                { "question": "19. Pointing to a man, a woman said, 'He is my mother’s brother’s son.' How is the man related to the woman?", "options": ["Cousin", "Uncle", "Nephew", "Brother"], "correct": 0 },
                { "question": "20. A’s father is B’s son, and B’s father is C. How is A related to C?", "options": ["Grandson", "Nephew", "Brother", "Uncle"], "correct": 0 },
            ], "Letters and Symbols Series": [
                { "question": "1. What comes next in the series: A, C, E, G, ?", "options": ["H", "I", "J", "K"], "correct": 1 },
                { "question": "2. Find the missing letter: B, D, G, K, ?", "options": ["M", "N", "O", "P"], "correct": 2 },
                { "question": "3. Which letter comes next in the pattern: X, V, T, R, ?", "options": ["O", "P", "Q", "S"], "correct": 2 },
                { "question": "4. What comes next: 2A, 4B, 6C, 8D, ?", "options": ["10E", "12E", "10F", "12F"], "correct": 0 },
                { "question": "5. Find the missing symbol: @, #, $, %, ?", "options": ["^", "&", "*", "!"], "correct": 1 },
                { "question": "6. Identify the next in series: P, Q, S, T, ?", "options": ["U", "V", "W", "X"], "correct": 0 },
                { "question": "7. Choose the correct continuation: 3Z, 6X, 9V, 12T, ?", "options": ["15R", "18R", "15S", "18S"], "correct": 0 },
                { "question": "8. What comes after 5A, 10B, 15C, 20D?", "options": ["25E", "30E", "25F", "30F"], "correct": 0 },
                { "question": "9. Complete the series: A, C, F, J, ?", "options": ["M", "N", "O", "P"], "correct": 2 },
                { "question": "10. Find the missing letter: J, L, O, S, ?", "options": ["T", "U", "V", "W"], "correct": 2 },
                { "question": "11. Identify the next symbol: *, @, #, $, ?", "options": ["%", "&", "!", "^"], "correct": 0 },
                { "question": "12. Find the missing letter: C, F, J, O, ?", "options": ["S", "T", "U", "V"], "correct": 0 },
                { "question": "13. Which letter follows: Z, X, U, Q, ?", "options": ["M", "N", "O", "P"], "correct": 2 },
                { "question": "14. Complete the pattern: 1A, 3C, 5E, 7G, ?", "options": ["9I", "11J", "9J", "11I"], "correct": 0 },
                { "question": "15. Find the missing symbol: &, %, $, ?, ?", "options": ["@", "!", "#", "*"], "correct": 3 },
                { "question": "16. Next in series: B, E, H, K, ?", "options": ["M", "N", "O", "P"], "correct": 2 },
                { "question": "17. Choose the correct letter: Y, W, T, P, ?", "options": ["L", "M", "N", "O"], "correct": 0 },
                { "question": "18. What comes after: 4X, 8V, 12T, 16R, ?", "options": ["20P", "22P", "20Q", "22Q"], "correct": 0 },
                { "question": "19. Find the missing letter: G, J, N, S, ?", "options": ["T", "U", "V", "W"], "correct": 3 },
                { "question": "20. What comes next in: K, L, N, Q, ?", "options": ["T", "U", "V", "W"], "correct": 1 },
                { "question": "21. Identify the next letter: F, H, K, O, ?", "options": ["P", "Q", "R", "S"], "correct": 3 },
                { "question": "22. Find the missing symbol: !, @, #, ?, %", "options": ["$", "&", "^", "*"], "correct": 0 },
                { "question": "23. What comes after: 2B, 4D, 6F, 8H, ?", "options": ["10J", "12K", "10K", "12J"], "correct": 0 },
                { "question": "24. Find the missing letter: M, P, T, Y, ?", "options": ["C", "D", "E", "F"], "correct": 2 },
                { "question": "25. What comes next: C, F, I, L, ?", "options": ["N", "O", "P", "Q"], "correct": 2 },
            ]
        },
        quantitative: {
            "Percentage": [
                { "question": "1. What is 20% of 250?", "options": ["45", "50", "55", "60"], "correct": 1 },
                { "question": "2. If 30% of a number is 90, what is the number?", "options": ["200", "250", "300", "350"], "correct": 2 },
                { "question": "3. What is 50% of 1,200?", "options": ["500", "600", "700", "800"], "correct": 1 },
                { "question": "4. A product costs $80. If there is a 25% discount, what is the discounted price?", "options": ["$50", "$55", "$60", "$65"], "correct": 2 },
                { "question": "5. 75% of a number is 450. What is the number?", "options": ["500", "550", "600", "650"], "correct": 2 },
                { "question": "6. 10% of 900 is?", "options": ["90", "80", "70", "60"], "correct": 0 },
                { "question": "7. If a price increases by 20% from $200, what is the new price?", "options": ["$220", "$230", "$240", "$250"], "correct": 2 },
                { "question": "8. 35% of 400 is?", "options": ["120", "130", "140", "150"], "correct": 2 },
                { "question": "9. What is 5% of 1,500?", "options": ["50", "75", "100", "125"], "correct": 1 },
                { "question": "10. A shirt originally priced at $60 is on sale for 30% off. What is the sale price?", "options": ["$40", "$42", "$45", "$48"], "correct": 1 },
                { "question": "11. What is 15% of 320?", "options": ["40", "45", "48", "50"], "correct": 2 },
                { "question": "12. A population increased by 25% from 800. What is the new population?", "options": ["900", "950", "1,000", "1,050"], "correct": 2 },
                { "question": "13. 80% of 75 is?", "options": ["55", "58", "60", "65"], "correct": 2 },
                { "question": "14. A number is decreased by 40% to become 240. What was the original number?", "options": ["350", "380", "400", "420"], "correct": 2 },
                { "question": "15. What is 90% of 150?", "options": ["120", "130", "135", "140"], "correct": 2 },
                { "question": "16. 25% of 640 is?", "options": ["140", "150", "160", "170"], "correct": 2 },
                { "question": "17. What is 12% of 250?", "options": ["25", "28", "30", "32"], "correct": 2 },
                { "question": "18. A watch costs $500. If there is a 10% discount, what is the new price?", "options": ["$450", "$460", "$470", "$480"], "correct": 3 },
                { "question": "19. A car price increases by 15% from $40,000. What is the new price?", "options": ["$44,000", "$45,000", "$46,000", "$47,000"], "correct": 1 },
                { "question": "20. 55% of 220 is?", "options": ["115", "120", "121", "125"], "correct": 2 },
                { "question": "21. A discount of 30% on $90 gives a sale price of?", "options": ["$60", "$63", "$65", "$67"], "correct": 1 },
                { "question": "22. 65% of 500 is?", "options": ["300", "320", "325", "350"], "correct": 2 },
                { "question": "23. What is 40% of 700?", "options": ["250", "270", "280", "300"], "correct": 2 },
                { "question": "24. 18% of 450 is?", "options": ["75", "78", "80", "82"], "correct": 1 },
                { "question": "25. If 50% of a number is 240, what is the number?", "options": ["460", "480", "500", "520"], "correct": 1 },
                { "question": "26. 33% of 900 is?", "options": ["270", "280", "290", "300"], "correct": 0 },
                { "question": "27. A person spends 20% of $400. How much is left?", "options": ["$280", "$300", "$320", "$340"], "correct": 2 },
                { "question": "28. 75% of 960 is?", "options": ["690", "700", "720", "750"], "correct": 2 },
                { "question": "29. What is 25% of 880?", "options": ["210", "220", "230", "240"], "correct": 3 },
                { "question": "30. A salary increased by 8% from $2,500. What is the new salary?", "options": ["$2,600", "$2,650", "$2,700", "$2,750"], "correct": 2 },
                { "question": "31. 12% of 1,200 is?", "options": ["130", "140", "144", "150"], "correct": 2 },
                { "question": "32. What is 65% of 480?", "options": ["300", "310", "312", "320"], "correct": 2 },
                { "question": "33. 48% of 625 is?", "options": ["290", "292", "300", "310"], "correct": 2 },
                { "question": "34. 30% of 560 is?", "options": ["160", "168", "170", "175"], "correct": 1 },
                { "question": "35. A bike costs $1,200 after a 20% discount. What was the original price?", "options": ["$1,400", "$1,500", "$1,600", "$1,700"], "correct": 1 },
                { "question": "36. 85% of 320 is?", "options": ["260", "270", "275", "280"], "correct": 3 },
                { "question": "37. A store offers 15% off on a $500 product. What is the discounted price?", "options": ["$400", "$425", "$450", "$475"], "correct": 3 },
                { "question": "38. 22% of 900 is?", "options": ["180", "195", "198", "200"], "correct": 2 },
                { "question": "39. A loan increases by 9% from $5,000. What is the new amount?", "options": ["$5,350", "$5,400", "$5,450", "$5,500"], "correct": 2 },
                { "question": "40. What is 17% of 700?", "options": ["115", "118", "120", "125"], "correct": 1 },
                { "question": "41. 66% of 450 is?", "options": ["280", "290", "295", "300"], "correct": 2 },
                { "question": "42. 11% of 1,100 is?", "options": ["110", "120", "121", "130"], "correct": 2 },
                { "question": "43. A 42% discount on $800 gives what price?", "options": ["$450", "$460", "$470", "$480"], "correct": 3 },
                { "question": "44. 78% of 540 is?", "options": ["410", "415", "420", "425"], "correct": 2 },
                { "question": "45. 88% of 700 is?", "options": ["600", "610", "616", "620"], "correct": 2 }
            ],
            "Train Problems": [
                { "question": "1. A train 200m long is running at a speed of 60 km/hr. How long will it take to pass a pole?", "options": ["10 sec", "12 sec", "14 sec", "15 sec"], "correct": 1 },
                { "question": "2. Two trains, 120m and 130m long, are moving in opposite directions at speeds of 40 km/hr and 50 km/hr. How long will they take to cross each other?", "options": ["8 sec", "9 sec", "10 sec", "12 sec"], "correct": 2 },
                { "question": "3. A train 150m long is running at 90 km/hr. How much time will it take to pass a person running at 10 km/hr in the same direction?", "options": ["4 sec", "5 sec", "6 sec", "7 sec"], "correct": 1 },
                { "question": "4. A train crosses a bridge of length 250m in 20 seconds while running at a speed of 72 km/hr. Find the length of the train.", "options": ["150m", "200m", "250m", "300m"], "correct": 1 },
                { "question": "5. Two trains 110m and 140m long are running in the same direction at 50 km/hr and 60 km/hr. How long will the faster train take to pass the slower one?", "options": ["14 sec", "16 sec", "18 sec", "20 sec"], "correct": 2 },
                { "question": "6. A train 180m long is running at a speed of 54 km/hr. How long will it take to pass a man running at 6 km/hr in the same direction?", "options": ["10 sec", "12 sec", "15 sec", "18 sec"], "correct": 2 },
                { "question": "7. A train moving at 72 km/hr crosses a platform of 150m in 25 seconds. Find the length of the train.", "options": ["250m", "270m", "290m", "310m"], "correct": 1 },
                { "question": "8. Two trains, each 120m long, are running in opposite directions at 45 km/hr and 55 km/hr. How long will they take to cross each other?", "options": ["8 sec", "9 sec", "10 sec", "12 sec"], "correct": 1 },
                { "question": "9. A train 90m long is running at 36 km/hr. How long will it take to pass a platform of length 60m?", "options": ["10 sec", "12 sec", "15 sec", "18 sec"], "correct": 1 },
                { "question": "10. Two trains 150m and 100m long are running on parallel tracks at 40 km/hr and 50 km/hr. How long will the faster train take to pass the slower one?", "options": ["14 sec", "16 sec", "18 sec", "20 sec"], "correct": 2 },
                { "question": "11. A train 240m long takes 24 seconds to cross a tunnel. If the speed of the train is 60 km/hr, find the length of the tunnel.", "options": ["180m", "200m", "220m", "240m"], "correct": 1 },
                { "question": "12. A train 320m long is running at a speed of 80 km/hr. How long will it take to pass a person walking at 5 km/hr in the same direction?", "options": ["12 sec", "14 sec", "16 sec", "18 sec"], "correct": 2 },
                { "question": "13. A train crosses a 180m long bridge in 20 seconds at a speed of 72 km/hr. Find the length of the train.", "options": ["200m", "220m", "240m", "260m"], "correct": 2 },
                { "question": "14. Two trains of equal lengths are running at 45 km/hr and 55 km/hr in opposite directions. If they cross each other in 12 seconds, find the length of each train.", "options": ["150m", "160m", "170m", "180m"], "correct": 1 },
            ]

        }
    };
    function showCategories(type) {
        document.getElementById("main-menu").classList.add("hidden");
        document.getElementById("subcategory-menu").classList.remove("hidden");
        let subcategoryButtons = document.getElementById("subcategory-buttons");
        subcategoryButtons.innerHTML = "";

        Object.keys(questionSets[type]).forEach(subcategory => {
            let button = document.createElement("button");
            button.textContent = subcategory;
            button.onclick = () => askQuestionCount(type, subcategory);
            subcategoryButtons.appendChild(button);
        });
    }

    function askQuestionCount(type, subcategory) {
        document.getElementById("subcategory-menu").classList.add("hidden");
        document.getElementById("question-count").classList.remove("hidden");
        document.getElementById("question-count").dataset.type = type;
        document.getElementById("question-count").dataset.subcategory = subcategory;
    }

    function startQuiz() {
        let numQuestions = parseInt(document.getElementById("num-questions").value);
        let type = document.getElementById("question-count").dataset.type;
        let subcategory = document.getElementById("question-count").dataset.subcategory;

        totalQuestions = numQuestions;
        selectedQuestions = questionSets[type][subcategory].slice(0, numQuestions);

        document.getElementById("question-count").classList.add("hidden");
        document.getElementById("quiz-container").classList.remove("hidden");

        displayQuestion();
    }

    function displayQuestion() {
        let questionData = selectedQuestions[currentQuestionIndex];
        document.getElementById("question-text").textContent = questionData.question;
        let answerButtons = document.getElementById("answer-buttons");
        answerButtons.innerHTML = "";

        questionData.options.forEach((option, index) => {
            let button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => selectAnswer(index, button);

            if (userAnswers[currentQuestionIndex] !== undefined) {
                if (index === userAnswers[currentQuestionIndex]) {
                    button.classList.add(index === questionData.correct ? "correct" : "wrong");
                }
            }

            answerButtons.appendChild(button);
        });

        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        document.getElementById("prev-button").classList.toggle("hidden", currentQuestionIndex === 0);
        document.getElementById("next-button").classList.toggle("hidden", currentQuestionIndex >= totalQuestions - 1);
        document.getElementById("submit-button").classList.toggle("hidden", currentQuestionIndex < totalQuestions - 1);
    }
    var scoredQuestions = new Set();

    function selectAnswer(selectedIndex, button) {
        if (userAnswers[currentQuestionIndex] !== undefined) return;

        let correctIndex = selectedQuestions[currentQuestionIndex].correct;
        userAnswers[currentQuestionIndex] = selectedIndex;

        let answerButtons = document.querySelectorAll("#answer-buttons button");
        answerButtons.forEach((btn, index) => {
            btn.classList.remove("correct", "wrong");
            btn.disabled = true;
            if (index === correctIndex) btn.classList.add("correct");
            if (index === selectedIndex && index !== correctIndex) btn.classList.add("wrong");
        });

        if (selectedIndex === correctIndex && !scoredQuestions.has(currentQuestionIndex)) {
            score++;
            scoredQuestions.add(currentQuestionIndex);
        }
        document.getElementById("score-counter").textContent = `Score: ${score}`;
    }


    function nextQuestion() {
        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            displayQuestion();
        }
    }

    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    }

    function submitQuiz() {
        document.getElementById("quiz-container").classList.add("hidden");
        document.getElementById("final-score-container").classList.remove("hidden");
        document.getElementById("final-score").textContent = `Your final score is: ${score}/${totalQuestions}`;
    }


    window.showCategories = showCategories;
    window.startQuiz = startQuiz;
    window.nextQuestion = nextQuestion;
    window.prevQuestion = prevQuestion;
    window.submitQuiz = submitQuiz;


});
function goBacktopage() {
    if (!document.getElementById("quiz-container").classList.contains("hidden")) {
        document.getElementById("quiz-container").classList.add("hidden");
        document.getElementById("question-count").classList.remove("hidden");
    } else if (!document.getElementById("question-count").classList.contains("hidden")) {
        document.getElementById("question-count").classList.add("hidden");
        document.getElementById("subcategory-menu").classList.remove("hidden");
    } else if (!document.getElementById("subcategory-menu").classList.contains("hidden")) {
        document.getElementById("subcategory-menu").classList.add("hidden");
        document.getElementById("main-menu").classList.remove("hidden");
    }
}
function goBack() {
    window.history.back();
}