// ========================================
// QUIZQUEST - ADVANCED QUIZ APP
// Complete JavaScript
// ========================================

const questions = [
    {
        question: "Which language is used to structure a web page?",
        options: ["CSS", "HTML", "Python", "SQL"],
        answer: 1,
        category: "Web Development",
        explanation: "HTML provides the structure and content of a web page."
    },
    {
        question: "Which language is used to style a web page?",
        options: ["HTML", "Java", "CSS", "C"],
        answer: 2,
        category: "Web Development",
        explanation: "CSS controls the colours, layout, fonts and appearance of web pages."
    },
    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing User"
        ],
        answer: 0,
        category: "Computer Science",
        explanation: "The CPU executes instructions and processes data."
    },
    {
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Tree", "Queue", "Graph"],
        answer: 2,
        category: "Data Structures",
        explanation: "FIFO means First In, First Out. A queue follows this principle."
    },
    {
        question: "Which data structure follows LIFO?",
        options: ["Queue", "Stack", "Array", "Graph"],
        answer: 1,
        category: "Data Structures",
        explanation: "LIFO means Last In, First Out. A stack follows this principle."
    },
    {
        question: "What is the full form of RAM?",
        options: [
            "Read Access Memory",
            "Random Access Memory",
            "Run Active Memory",
            "Remote Access Machine"
        ],
        answer: 1,
        category: "Computer Science",
        explanation: "RAM temporarily stores data and programs currently being used."
    },
    {
        question: "Which SQL command retrieves data from a table?",
        options: ["INSERT", "UPDATE", "DELETE", "SELECT"],
        answer: 3,
        category: "Database",
        explanation: "SELECT retrieves records from a database table."
    },
    {
        question: "Which protocol is commonly used to browse websites securely?",
        options: ["FTP", "HTTPS", "SMTP", "POP3"],
        answer: 1,
        category: "Networking",
        explanation: "HTTPS encrypts communication between a browser and a website."
    },
    {
        question: "Which number system uses only 0 and 1?",
        options: ["Decimal", "Octal", "Binary", "Hexadecimal"],
        answer: 2,
        category: "Computer Science",
        explanation: "The binary number system uses the digits 0 and 1."
    },
    {
        question: "Which of these is a JavaScript data type?",
        options: ["Boolean", "Website", "Keyboard", "Browser"],
        answer: 0,
        category: "Programming",
        explanation: "Boolean is a data type that represents true or false."
    },
    {
    question: "Which company developed the Java programming language?",
    options: ["Microsoft", "Sun Microsystems", "Google", "IBM"],
    answer: 1,
    category: "Programming",
    explanation: "Sun Microsystems originally developed Java."
},
{
    question: "What does HTML stand for?",
    options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Machine Language",
        "Home Tool Markup Language"
    ],
    answer: 0,
    category: "Web Development",
    explanation: "HTML stands for Hyper Text Markup Language."
},
{
    question: "Which data structure uses LIFO?",
    options: ["Queue", "Array", "Stack", "Tree"],
    answer: 2,
    category: "Data Structures",
    explanation: "LIFO means Last In, First Out. A stack follows this rule."
},
{
    question: "Which SQL command is used to remove a table?",
    options: ["SELECT", "UPDATE", "DROP", "INSERT"],
    answer: 2,
    category: "Database",
    explanation: "DROP removes a table and its structure from a database."
},
{
    question: "Which protocol is used to send emails?",
    options: ["HTTP", "SMTP", "FTP", "DNS"],
    answer: 1,
    category: "Networking",
    explanation: "SMTP is commonly used to send emails."
},
{
    question: "Which language is mainly used to add interactivity to web pages?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    answer: 2,
    category: "Web Development",
    explanation: "JavaScript makes web pages interactive."
},
{
    question: "Which of these is an operating system?",
    options: ["Python", "Linux", "HTML", "MySQL"],
    answer: 1,
    category: "Computer Science",
    explanation: "Linux is an operating system."
},
{
    question: "Which algorithm is commonly used to find the shortest path in a graph with non-negative edge weights?",
    options: [
        "Bubble Sort",
        "Binary Search",
        "Dijkstra's Algorithm",
        "Insertion Sort"
    ],
    answer: 2,
    category: "Algorithms",
    explanation: "Dijkstra's algorithm finds shortest paths when edge weights are non-negative."
}
];

// ========================================
// APP VARIABLES
// ========================================

let activeQuestions = [];
let currentIndex = 0;
let score = 0;
let selectedAnswer = null;
let secondsLeft = 20;
let timer = null;
let quizMode = "normal";
let answerHistory = [];

let homeSection;
let quizCard;
let statusMessage;

// ========================================
// INITIALISE THE APP
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    createQuizArea();
    connectButtons();
});

// ========================================
// CREATE QUIZ AREA AUTOMATICALLY
// This also fixes the missing quizCard error
// ========================================

function createQuizArea() {
    const startButton = findButton("Start Quiz");

    if (!startButton) {
        console.error(
            "QuizQuest: Start Quiz button was not found. Check index.html."
        );
        return;
    }

    homeSection =
        document.querySelector(".welcome-card") ||
        document.querySelector(".welcome-section") ||
        document.querySelector("main");

    if (!homeSection) {
        homeSection = startButton.parentElement;
    }

    statusMessage = document.querySelector(".status-message");

    // Reuse an existing quiz area if one exists.
    quizCard = document.getElementById("quizCard");

    // Otherwise create the missing quiz area.
    if (!quizCard) {
        quizCard = document.createElement("section");
        quizCard.id = "quizCard";
        quizCard.className = "welcome-card";
        quizCard.style.display = "none";
        quizCard.style.maxWidth = "1000px";
        quizCard.style.margin = "30px auto";

        homeSection.insertAdjacentElement("afterend", quizCard);
    }

    console.log("QuizQuest is ready.");
}

// ========================================
// FIND BUTTONS BY THEIR VISIBLE TEXT
// ========================================

function findButton(text) {
    const buttons = Array.from(
        document.querySelectorAll("button, a")
    );

    return buttons.find(function (button) {
        return button.textContent
            .trim()
            .toLowerCase()
            .includes(text.toLowerCase());
    });
}

// ========================================
// CONNECT BUTTONS
// ========================================

function connectButtons() {
    const startButton =
     findButton("Start Quiz");
    const dailyButton = findButton("Daily Challenge");

    if (startButton) {
        startButton.addEventListener("click", function (event) {
            event.preventDefault();
            startQuiz("normal");
        });
    }

    if (dailyButton) {
        dailyButton.addEventListener("click", function (event) {
            event.preventDefault();
            startQuiz("daily");
        });
    
}

    // Connect the JSON import button if available.
    const importButton = findButton("Import JSON Questions");
    const fileInput = document.querySelector(
        'input[type="file"]'
    );

    if (importButton && fileInput) {
        importButton.addEventListener("click", function (event) {
            event.preventDefault();
            fileInput.click();
        });

        fileInput.addEventListener("change", importQuestions);
    }
}

// ========================================
// START QUIZ
// ========================================

function startQuiz(mode) {
    if (!quizCard) {
        alert("Quiz area is not ready. Please refresh the page.");
        return;
    }

    clearInterval(timer);

    quizMode = mode;
    currentIndex = 0;
    score = 0;
    answerHistory = [];

    if (mode === "daily") {
        const dayNumber = Math.floor(
            Date.now() / 86400000
        );

        const shuffled = shuffleArray(questions);

        // Select a repeatable daily set based on today's date.
        const offset = dayNumber % questions.length;

        activeQuestions = [
            ...questions.slice(offset),
            ...questions.slice(0, offset)
        ].slice(0, 5);

        // Shuffle the options separately for each question
        // is intentionally avoided to keep answer indexes correct.
        if (shuffled.length === 0) {
            activeQuestions = questions.slice(0, 5);
        }
    } else {
        activeQuestions = shuffleArray(questions).slice(0, 10);
    }

    if (homeSection) {
        homeSection.style.display = "none";
    }

    quizCard.style.display = "block";

    renderQuestion();
    quizCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// ========================================
// SHUFFLE QUESTIONS
// ========================================

function shuffleArray(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

// ========================================
// DISPLAY A QUESTION
// ========================================

function renderQuestion() {
    clearInterval(timer);

    if (currentIndex >= activeQuestions.length) {
        showResults();
        return;
    }

    selectedAnswer = null;
    secondsLeft = 20;

    const question = activeQuestions[currentIndex];
    const progress =
        ((currentIndex + 1) / activeQuestions.length) * 100;

    quizCard.innerHTML = `
        <div class="quiz-topbar">
            <span class="quiz-tag">
                ${quizMode === "daily" ? "📅 Daily Challenge" : "🧠 QuizQuest"}
            </span>

            <span class="question-count">
                Question ${currentIndex + 1} of ${activeQuestions.length}
            </span>
        </div>

        <div class="progress-track">
            <div class="progress-fill"
                 style="width: ${progress}%"></div>
        </div>

        <div class="quiz-meta">
            <span>${escapeHTML(question.category)}</span>
            <span>Medium</span>
        </div>

        <div class="timer-row">
            <span>⏱️ Time remaining</span>
            <strong id="timer">${secondsLeft}s</strong>
        </div>

        <h2 class="question-title">
            ${escapeHTML(question.question)}
        </h2>

        <div class="answer-list">
            ${question.options.map(function (option, index) {
                return `
                    <button class="answer-btn" data-answer="${index}">
                        <span class="answer-letter">
                            ${String.fromCharCode(65 + index)}
                        </span>
                        <span>${escapeHTML(option)}</span>
                    </button>
                `;
            }).join("")}
        </div>

        <div id="feedback" aria-live="polite"></div>

        <button id="nextButton" class="primary-btn" disabled>
            ${currentIndex === activeQuestions.length - 1
                ? "See Results →"
                : "Next Question →"}
        </button>

        <p class="quiz-note">
            Choose your answer before the timer reaches zero.
        </p>
    `;

    const answerButtons = quizCard.querySelectorAll(".answer-btn");

    answerButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const answer = Number(button.dataset.answer);
            chooseAnswer(answer);
        });
    });

    document.getElementById("nextButton").addEventListener(
        "click",
        nextQuestion
    );

    startTimer();
}

// ========================================
// ANSWER A QUESTION
// ========================================

function chooseAnswer(answer) {
    if (selectedAnswer !== null) {
        return;
    }

    selectedAnswer = answer;
    clearInterval(timer);

    const question = activeQuestions[currentIndex];
    const correct = answer === question.answer;

    if (correct) {
        score++;
    }

    answerHistory.push({
        question: question.question,
        options: [...question.options],
        correctAnswer: question.answer,
        selectedAnswer: answer,
        correct: correct,
        explanation: question.explanation
    });

    const buttons = quizCard.querySelectorAll(".answer-btn");

    buttons.forEach(function (button) {
        button.disabled = true;

        const buttonAnswer = Number(button.dataset.answer);

        if (buttonAnswer === question.answer) {
            button.classList.add("correct-answer");
        } else if (buttonAnswer === answer) {
            button.classList.add("wrong-answer");
        }
    });

    const feedback = document.getElementById("feedback");

    feedback.innerHTML = `
        <div class="feedback-box">
            <strong>
                ${correct ? "✅ Correct answer!" : "❌ Not quite!"}
            </strong>
            <p>
                Correct answer:
                ${escapeHTML(question.options[question.answer])}
            </p>
            <p>${escapeHTML(question.explanation)}</p>
        </div>
    `;

    document.getElementById("nextButton").disabled = false;
}

// ========================================
// TIMER
// ========================================

function startTimer() {
    const timerElement = document.getElementById("timer");

    timer = setInterval(function () {
        secondsLeft--;

        if (timerElement) {
            timerElement.textContent = secondsLeft + "s";
        }

        if (secondsLeft <= 0) {
            clearInterval(timer);

            if (selectedAnswer === null) {
                chooseAnswer(-1);
            }
        }
    }, 1000);
}

// ========================================
// MOVE TO NEXT QUESTION
// ========================================

function nextQuestion() {
    if (selectedAnswer === null) {
        return;
    }

    currentIndex++;
    renderQuestion();
}

// ========================================
// SHOW FINAL RESULTS
// ========================================

function showResults() {
    clearInterval(timer);

    const total = activeQuestions.length;
    const percentage = total > 0
        ? Math.round((score / total) * 100)
        : 0;

    let message = "Keep practising! Every question helps you learn.";

    if (percentage >= 80) {
        message = "Excellent work! You really know your stuff!";
    } else if (percentage >= 60) {
        message = "Good job! Keep learning and improving.";
    }

    // Save the highest score safely.
    try {
        const previousBest = Number(
            localStorage.getItem("quizQuestBest") || 0
        );

        if (score > previousBest) {
            localStorage.setItem("quizQuestBest", String(score));
        }
    } catch (error) {
        console.warn("Score could not be saved in this browser.");
    }

    quizCard.innerHTML = `
        <div class="results-screen">
            <div class="results-icon">🏆</div>

            <h2>Quiz Completed!</h2>

            <p>${message}</p>

            <div class="score-circle">
                <strong>${percentage}%</strong>
                <span>Your Score</span>
            </div>

            <div class="result-stat">
                <span>Correct answers</span>
                <strong>${score} / ${total}</strong>
            </div>

            <div class="result-stat">
                <span>Incorrect or unanswered</span>
                <strong>${total - score}</strong>
            </div>

            <div class="result-stat">
                <span>Best score</span>
                <strong>${getBestScore()}</strong>
            </div>

            <div class="result-actions">
                <button id="restartButton" class="primary-btn">
                    🔄 Try Again
                </button>

                <button id="reviewButton" class="secondary-btn">
                    📖 Review Answers
                </button>

                <button id="homeButton" class="secondary-btn">
                    🏠 Home
                </button>
            </div>

            <div id="reviewArea"></div>
        </div>
    `;

    document.getElementById("restartButton").addEventListener(
        "click",
        function () {
            startQuiz(quizMode);
        }
    );

    document.getElementById("reviewButton").addEventListener(
        "click",
        showReview
    );

    document.getElementById("homeButton").addEventListener(
        "click",
        goHome
    );

    quizCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// ========================================
// GET BEST SCORE
// ========================================

function getBestScore() {
    try {
        return localStorage.getItem("quizQuestBest") || "0";
    } catch (error) {
        return "0";
    }
}

// ========================================
// REVIEW ANSWERS
// ========================================

function showReview() {
    const reviewArea = document.getElementById("reviewArea");

    if (!reviewArea) {
        return;
    }

    reviewArea.innerHTML = `
        <h3>Answer Review</h3>

        ${answerHistory.map(function (item, index) {
            return `
                <div class="review-item">
                    <h4>
                        ${index + 1}. ${escapeHTML(item.question)}
                    </h4>

                    <p>
                        Your answer:
                        ${item.selectedAnswer === -1
                            ? "Time expired"
                            : escapeHTML(item.options[item.selectedAnswer])}
                    </p>

                    <p>
                        Correct answer:
                        ${escapeHTML(item.options[item.correctAnswer])}
                    </p>

                    <p>${escapeHTML(item.explanation)}</p>

                    <strong>
                        ${item.correct ? "✅ Correct" : "❌ Incorrect"}
                    </strong>
                </div>
            `;
        }).join("")}
    `;

    reviewArea.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// ========================================
// RETURN HOME
// ========================================
function goHome() {
    clearInterval(timer);

    // Hide the quiz and results screens
    if (quizCard) {
        quizCard.style.display = "none";
    }

    const resultsCard = document.getElementById("resultsCard");
    if (resultsCard) {
        resultsCard.style.display = "none";
    }

    // Show the original home screen
    const home = document.getElementById("homeSection");
    if (home) {
        home.style.display = "";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ========================================
// IMPORT CUSTOM QUESTIONS FROM JSON
// ========================================

function importQuestions(event) {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        try {
            const imported = JSON.parse(reader.result);

            if (!Array.isArray(imported) || imported.length === 0) {
                throw new Error("The JSON file must contain a question array.");
            }

            const validQuestions = imported.every(function (question) {
                return (
                    typeof question.question === "string" &&
                    Array.isArray(question.options) &&
                    question.options.length === 4 &&
                    Number.isInteger(question.answer) &&
                    question.answer >= 0 &&
                    question.answer < 4
                );
            });

            if (!validQuestions) {
                throw new Error(
                    "Each question needs question, four options, and an answer number from 0 to 3."
                );
            }

            questions.splice(0, questions.length);

            imported.forEach(function (question) {
                questions.push({
                    question: question.question,
                    options: question.options,
                    answer: question.answer,
                    category: question.category || "Custom Questions",
                    explanation: question.explanation || "Review the correct answer."
                });
            });

            alert(
                imported.length +
                " custom questions imported successfully!"
            );

        } catch (error) {
            alert("Could not import questions: " + error.message);
        }

        event.target.value = "";
    };

    reader.onerror = function () {
        alert("The file could not be read. Please try another JSON file.");
    };

    reader.readAsText(file);
}

// ========================================
// SAFELY DISPLAY TEXT
// ========================================

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return replacements[character];
    });
}