// ===============================
// AI Study Assistant - Part 1
// Navigation + Study Planner
// ===============================

// Change page
function showPage(pageId) {
    document.querySelectorAll("main section").forEach(section => {
        section.hidden = true;
    });

    document.getElementById(pageId).hidden = false;
}

// ---------- Study Planner ----------

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");

    if (!input || input.value.trim() === "") {
        alert("Enter a study task.");
        return;
    }

    tasks.push({
        text: input.value.trim(),
        done: false
    });

    input.value = "";

    saveTasks();
    loadTasks();
}

function loadTasks() {

    const list = document.getElementById("taskList");

    if (!list) return;

    list.innerHTML = "";

    tasks.forEach((task, index) => {

        list.innerHTML += `
        <div class="task ${task.done ? "done" : ""}">
            <span>${task.text}</span>

            <div>
                <button onclick="toggleTask(${index})">✓</button>
                <button onclick="deleteTask(${index})">🗑️</button>
            </div>
        </div>
        `;

    });

}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;

    saveTasks();
    loadTasks();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    loadTasks();
}

// ---------- Start App ----------

window.onload = function () {
    showPage("planner");
    loadTasks();
};

// ===============================
// AI Study Assistant - Part 2
// Pomodoro Timer
// ===============================

let totalTime = 25 * 60; // 25 minutes
let timeLeft = totalTime;
let timer = null;
let isRunning = false;

// Update timer display
function updateTimer() {
    const display = document.getElementById("timerDisplay");
    if (!display) return;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    display.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Start timer
function startTimer() {
    if (isRunning) return;

    isRunning = true;

    timer = setInterval(() => {
        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;

            alert("🎉 Study session completed!");

            timeLeft = totalTime;
            updateTimer();
        }

    }, 1000);
}

// Pause timer
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

// Reset timer
function resetTimer() {
    clearInterval(timer);
    isRunning = false;

    timeLeft = totalTime;
    updateTimer();
}

// Optional presets
function setPomodoro(minutes) {
    clearInterval(timer);
    isRunning = false;

    totalTime = minutes * 60;
    timeLeft = totalTime;

    updateTimer();
}

// Initialize timer when page loads
updateTimer();

// ===============================
// AI Study Assistant - Part 3
// Notes (localStorage)
// ===============================

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Save Notes
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Load Notes
function loadNotes() {
    const list = document.getElementById("notesList");

    if (!list) return;

    list.innerHTML = "";

    notes.forEach((note, index) => {
        list.innerHTML += `
        <div class="note">
            <p>${note}</p>

            <button onclick="editNote(${index})">✏️ Edit</button>
            <button onclick="deleteNote(${index})">🗑️ Delete</button>
        </div>
        `;
    });
}

// Add Note
function addNote() {
    const input = document.getElementById("noteInput");

    if (!input || input.value.trim() === "") {
        alert("Please write a note.");
        return;
    }

    notes.push(input.value.trim());

    input.value = "";

    saveNotes();
    loadNotes();
}

// Edit Note
function editNote(index) {

    const updated = prompt("Edit your note:", notes[index]);

    if (updated === null) return;

    if (updated.trim() === "") return;

    notes[index] = updated.trim();

    saveNotes();
    loadNotes();
}

// Delete Note
function deleteNote(index) {

    if (!confirm("Delete this note?")) return;

    notes.splice(index, 1);

    saveNotes();
    loadNotes();
}

// Load notes on startup
loadNotes();

// ===============================
// AI Study Assistant - Part 4
// Flashcards (localStorage)
// ===============================

let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
let currentCard = 0;
let showingAnswer = false;

// Save Flashcards
function saveFlashcards() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

// Add Flashcard
function addFlashcard() {

    const question = document.getElementById("questionInput");
    const answer = document.getElementById("answerInput");

    if (!question || !answer) return;

    if (question.value.trim() === "" || answer.value.trim() === "") {
        alert("Enter both question and answer.");
        return;
    }

    flashcards.push({
        question: question.value.trim(),
        answer: answer.value.trim()
    });

    question.value = "";
    answer.value = "";

    saveFlashcards();

    currentCard = flashcards.length - 1;
    showingAnswer = false;

    showFlashcard();
}

// Show Current Card
function showFlashcard() {

    const card = document.getElementById("flashcard");

    if (!card) return;

    if (flashcards.length === 0) {
        card.innerHTML = "<h3>No Flashcards</h3>";
        return;
    }

    card.innerHTML = showingAnswer
        ? `<h3>${flashcards[currentCard].answer}</h3>`
        : `<h3>${flashcards[currentCard].question}</h3>`;
}

// Flip Card
function flipFlashcard() {

    if (flashcards.length === 0) return;

    showingAnswer = !showingAnswer;
    showFlashcard();
}

// Next Card
function nextFlashcard() {

    if (flashcards.length === 0) return;

    currentCard++;

    if (currentCard >= flashcards.length) {
        currentCard = 0;
    }

    showingAnswer = false;
    showFlashcard();
}

// Previous Card
function previousFlashcard() {

    if (flashcards.length === 0) return;

    currentCard--;

    if (currentCard < 0) {
        currentCard = flashcards.length - 1;
    }

    showingAnswer = false;
    showFlashcard();
}

// Delete Current Card
function deleteFlashcard() {

    if (flashcards.length === 0) return;

    if (!confirm("Delete this flashcard?")) return;

    flashcards.splice(currentCard, 1);

    if (currentCard >= flashcards.length) {
        currentCard = flashcards.length - 1;
    }

    if (currentCard < 0) {
        currentCard = 0;
    }

    saveFlashcards();

    showingAnswer = false;
    showFlashcard();
}

// Load Flashcards
showFlashcard();

// ===============================
// AI Study Assistant - Part 5
// Quiz Generator
// ===============================

const quizQuestions = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        answer: "Delhi"
    },
    {
        question: "2 + 2 = ?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "HTML stands for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Home Tool Markup Language",
            "Hyper Transfer Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "CSS is used for?",
        options: [
            "Styling webpages",
            "Database",
            "Programming OS",
            "Networking"
        ],
        answer: "Styling webpages"
    },
    {
        question: "JavaScript is mainly used for?",
        options: [
            "Adding interactivity",
            "Photo editing",
            "Video editing",
            "Operating system"
        ],
        answer: "Adding interactivity"
    }
];

let currentQuestion = 0;
let score = 0;

// Show Question
function loadQuiz() {

    const question = document.getElementById("quizQuestion");
    const options = document.getElementById("quizOptions");

    if (!question || !options) return;

    if (currentQuestion >= quizQuestions.length) {
        question.innerHTML = "🎉 Quiz Finished!";
        options.innerHTML = `
            <h3>Your Score: ${score}/${quizQuestions.length}</h3>
            <button onclick="restartQuiz()">Restart Quiz</button>
        `;
        return;
    }

    const q = quizQuestions[currentQuestion];

    question.innerHTML = q.question;
    options.innerHTML = "";

    q.options.forEach(option => {
        options.innerHTML += `
            <button class="option"
                onclick="checkAnswer('${option}')">
                ${option}
            </button>
        `;
    });
}

// Check Answer
function checkAnswer(selected) {

    if (selected === quizQuestions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;
    loadQuiz();
}

// Restart Quiz
function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    loadQuiz();
}

// Start Quiz
loadQuiz();

// ===============================
// AI Study Assistant - Part 6
// Progress Dashboard
// ===============================

// Load Progress
function loadDashboard() {

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.done).length;

    const progress =
        totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

    const fill = document.getElementById("progressFill");
    const text = document.getElementById("progressText");
    const quizScore = document.getElementById("dashboardQuiz");

    if (fill)
        fill.style.width = progress + "%";

    if (text)
        text.innerHTML =
            progress + "% Study Tasks Completed";

    if (quizScore)
        quizScore.innerHTML =
            "Latest Quiz Score: " +
            score +
            "/" +
            quizQuestions.length;
}

// Save Dashboard
function updateDashboard() {
    localStorage.setItem("studyProgress", JSON.stringify({
        completed: tasks.filter(t => t.done).length,
        total: tasks.length,
        score: score
    }));

    loadDashboard();
}

// ---------- Update Planner ----------

const oldToggleTask = toggleTask;

toggleTask = function(index) {
    oldToggleTask(index);
    updateDashboard();
};

// ---------- Update Quiz ----------

const oldCheckAnswer = checkAnswer;

checkAnswer = function(answer) {

    oldCheckAnswer(answer);

    updateDashboard();
};

// ---------- Load Saved Progress ----------

window.addEventListener("load", () => {

    loadTasks();
    loadNotes();
    showFlashcard();
    updateTimer();
    loadQuiz();
    loadDashboard();

});