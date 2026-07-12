/* ===================================
   AI Study Assistant
   script.js (Part 3.1)
=================================== */

// ---------- Local Storage ----------

function getData(key, defaultValue) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// ---------- App Data ----------

let tasks = getData("tasks", []);
let flashcards = getData("flashcards", []);
let quizQuestions = [];

setTimeout(() => {
    if (window.questionBank) {
        quizQuestions = [...window.questionBank];
        renderQuiz();
    }
}, 100);
let notes = localStorage.getItem("notes") || "";

let currentCard = 0;
let showAnswer = false;

// ---------- Tab Navigation ----------

const tabs = document.querySelectorAll(".tab");
const pages = document.querySelectorAll(".page");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        pages.forEach(p => p.classList.remove("active"));

        tab.classList.add("active");

        const page = document.getElementById(
            tab.dataset.tab
        );

        if (page) {
            page.classList.add("active");
        }

    });

});

// ---------- Theme ----------

const themeBtn = document.getElementById("themeBtn");

function loadTheme() {

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {

        document.body.classList.add("dark");
        themeBtn.textContent = "☀️ Light Mode";

    }

}

function toggleTheme() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️ Light Mode";

    } else {

        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙 Dark Mode";

    }

}

themeBtn.addEventListener("click", toggleTheme);

loadTheme();

// ---------- Notes ----------

const notesArea = document.getElementById("notesArea");

if (notesArea) {

    notesArea.value = notes;

}
/* ===================================
   AI Study Assistant
   script.js (Part 3.2)
=================================== */

// ---------- Dashboard Elements ----------

const totalTasksEl = document.getElementById("totalTasks");
const completedTasksEl = document.getElementById("completedTasks");
const cardCountEl = document.getElementById("cardCount");
const quizCountEl = document.getElementById("quizCount");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

// ---------- Dashboard ----------

function updateDashboard() {

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const percent =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    if (totalTasksEl)
        totalTasksEl.textContent = total;

    if (completedTasksEl)
        completedTasksEl.textContent = completed;

    if (cardCountEl)
        cardCountEl.textContent = flashcards.length;

    if (quizCountEl)
        quizCountEl.textContent = quizQuestions.length;

    if (progressFill)
        progressFill.style.width = percent + "%";

    if (progressText)
        progressText.textContent =
            percent + "% Completed";

}

// ---------- Save Helpers ----------

function saveTasks() {
    saveData("tasks", tasks);
    updateDashboard();
}

function saveFlashcards() {
    saveData("flashcards", flashcards);
    updateDashboard();
}

function saveQuizQuestions() {
    saveData("quizQuestions", quizQuestions);
    updateDashboard();
}

// ---------- Notes ----------

const saveNotesBtn =
    document.getElementById("saveNotes");

if (saveNotesBtn) {

    saveNotesBtn.addEventListener("click", () => {

        localStorage.setItem(
            "notes",
            notesArea.value
        );

        alert("Notes saved successfully!");

    });

}

// ---------- Initial Dashboard ----------

updateDashboard();
/* ===================================
   AI Study Assistant
   script.js (Part 3.3)
   Study Planner - Add & Display
=================================== */

// ---------- Planner Elements ----------

const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// ---------- Render Tasks ----------

function renderTasks() {

    if (!taskList) return;

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="card center">
                <h3>No study tasks yet 📚</h3>
                <p>Add your first task above.</p>
            </div>
        `;

        updateDashboard();
        return;
    }

    tasks.forEach((task, index) => {

        const div = document.createElement("div");

        div.className =
            "task fade" +
            (task.completed ? " completed" : "");

        div.innerHTML = `

            <div class="taskInfo">

                <h3>${task.title}</h3>

                <p>
                    📅 ${task.date || "No Date"}
                </p>

            </div>

            <div class="taskButtons">

                <button
                    class="completeBtn"
                    onclick="toggleTask(${index})">

                    ${task.completed ? "Undo" : "Done"}

                </button>

                <button
                    class="editBtn"
                    onclick="editTask(${index})">

                    Edit

                </button>

                <button
                    class="deleteBtn"
                    onclick="deleteTask(${index})">

                    Delete

                </button>

            </div>

        `;

        taskList.appendChild(div);

    });

    updateDashboard();

}

// ---------- Add Task ----------

if (addTaskBtn) {

    addTaskBtn.addEventListener("click", () => {

        const title = taskInput.value.trim();
        const date = taskDate.value;

        if (title === "") {

            alert("Please enter a study task.");
            return;

        }

        tasks.push({

            title: title,
            date: date,
            completed: false

        });

        saveTasks();

        taskInput.value = "";
        taskDate.value = "";

        renderTasks();

    });

}

// ---------- First Load ----------

renderTasks();
/* ===================================
   AI Study Assistant
   script.js (Part 3.4)
   Study Planner - Edit/Delete/Complete
=================================== */

// ---------- Toggle Complete ----------

function toggleTask(index) {

    if (index < 0 || index >= tasks.length) return;

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();

}

// ---------- Edit Task ----------

function editTask(index) {

    if (index < 0 || index >= tasks.length) return;

    const newTitle = prompt(
        "Edit study task:",
        tasks[index].title
    );

    if (newTitle === null) return;

    const title = newTitle.trim();

    if (title === "") {

        alert("Task title cannot be empty.");
        return;

    }

    const newDate = prompt(
        "Edit date (YYYY-MM-DD):",
        tasks[index].date || ""
    );

    if (newDate !== null) {
        tasks[index].date = newDate.trim();
    }

    tasks[index].title = title;

    saveTasks();
    renderTasks();

}

// ---------- Delete Task ----------

function deleteTask(index) {

    if (index < 0 || index >= tasks.length) return;

    const confirmDelete = confirm(
        "Delete this study task?"
    );

    if (!confirmDelete) return;

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();

}

// ---------- Keyboard Shortcut ----------

if (taskInput) {

    taskInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            event.preventDefault();
            addTaskBtn.click();
        }

    });

}
/* ===================================
   AI Study Assistant
   script.js (Part 3.5)
   Pomodoro Timer
=================================== */

// ---------- Timer Elements ----------

const timerDisplay = document.getElementById("timerDisplay");
const startTimerBtn = document.getElementById("startTimer");
const pauseTimerBtn = document.getElementById("pauseTimer");
const resetTimerBtn = document.getElementById("resetTimer");
const presetButtons = document.querySelectorAll(".preset");

// ---------- Timer Variables ----------

let selectedMinutes = 25;
let timeLeft = selectedMinutes * 60;
let timerInterval = null;
let timerRunning = false;

// ---------- Display Timer ----------

function updateTimerDisplay() {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

}

// ---------- Presets ----------

presetButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedMinutes = Number(button.dataset.time);
        timeLeft = selectedMinutes * 60;

        clearInterval(timerInterval);
        timerRunning = false;

        updateTimerDisplay();

    });

});

// ---------- Start ----------

startTimerBtn.addEventListener("click", () => {

    if (timerRunning) return;

    timerRunning = true;

    timerInterval = setInterval(() => {

        if (timeLeft > 0) {

            timeLeft--;
            updateTimerDisplay();

        } else {

            clearInterval(timerInterval);
            timerRunning = false;

            alert("🎉 Pomodoro session completed!");

        }

    }, 1000);

});

// ---------- Pause ----------

pauseTimerBtn.addEventListener("click", () => {

    clearInterval(timerInterval);
    timerRunning = false;

});

// ---------- Reset ----------

resetTimerBtn.addEventListener("click", () => {

    clearInterval(timerInterval);

    timerRunning = false;
    timeLeft = selectedMinutes * 60;

    updateTimerDisplay();

});

// ---------- Initial Timer ----------

updateTimerDisplay();
/* ===================================
   AI Study Assistant
   script.js (Part 3.6)
   Notes
=================================== */

// ---------- Notes Elements ----------

const notesStatus = document.createElement("p");
notesStatus.id = "notesStatus";
notesStatus.style.marginTop = "10px";
notesStatus.style.fontWeight = "600";
notesStatus.style.color = "var(--primary)";

// Add status message below the Save button
if (saveNotesBtn && saveNotesBtn.parentElement) {
    saveNotesBtn.insertAdjacentElement("afterend", notesStatus);
}

// ---------- Load Notes ----------

function loadNotes() {

    const savedNotes = localStorage.getItem("notes");

    if (savedNotes !== null) {
        notesArea.value = savedNotes;
    }

}

loadNotes();

// ---------- Save Notes ----------

function saveNotes() {

    localStorage.setItem("notes", notesArea.value);

    notesStatus.textContent = "✅ Notes saved";

    setTimeout(() => {
        notesStatus.textContent = "";
    }, 2000);

}

// Save button
if (saveNotesBtn) {
    saveNotesBtn.addEventListener("click", saveNotes);
}

// ---------- Auto Save ----------

let notesTimeout;

if (notesArea) {

    notesArea.addEventListener("input", () => {

        clearTimeout(notesTimeout);

        notesTimeout = setTimeout(() => {

            localStorage.setItem("notes", notesArea.value);

            notesStatus.textContent = "💾 Auto-saved";

            setTimeout(() => {
                notesStatus.textContent = "";
            }, 1500);

        }, 800);

    });

}
/* ===================================
   AI Study Assistant
   script.js (Part 3.7)
   Flashcards
=================================== */

// ---------- Flashcard Elements ----------

const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");
const addCardBtn = document.getElementById("addCard");

const flashcard = document.getElementById("flashcard");
const prevCardBtn = document.getElementById("prevCard");
const nextCardBtn = document.getElementById("nextCard");
const flipCardBtn = document.getElementById("flipCard");
const deleteCardBtn = document.getElementById("deleteCard");

// ---------- Render Flashcard ----------

function renderFlashcard() {

    if (flashcards.length === 0) {

        flashcard.textContent = "No Flashcards";
        currentCard = 0;
        showAnswer = false;

        updateDashboard();
        return;

    }

    if (currentCard >= flashcards.length)
        currentCard = flashcards.length - 1;

    if (currentCard < 0)
        currentCard = 0;

    flashcard.textContent = showAnswer
        ? flashcards[currentCard].answer
        : flashcards[currentCard].question;

    updateDashboard();

}

// ---------- Add Card ----------

addCardBtn.addEventListener("click", () => {

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (question === "" || answer === "") {

        alert("Please enter both question and answer.");
        return;

    }

    flashcards.push({
        question,
        answer
    });

    saveFlashcards();

    questionInput.value = "";
    answerInput.value = "";

    currentCard = flashcards.length - 1;
    showAnswer = false;

    renderFlashcard();

});

// ---------- Flip ----------

flipCardBtn.addEventListener("click", () => {

    if (flashcards.length === 0) return;

    showAnswer = !showAnswer;

    renderFlashcard();

});

// ---------- Next ----------

nextCardBtn.addEventListener("click", () => {

    if (flashcards.length === 0) return;

    currentCard++;

    if (currentCard >= flashcards.length)
        currentCard = 0;

    showAnswer = false;

    renderFlashcard();

});

// ---------- Previous ----------

prevCardBtn.addEventListener("click", () => {

    if (flashcards.length === 0) return;

    currentCard--;

    if (currentCard < 0)
        currentCard = flashcards.length - 1;

    showAnswer = false;

    renderFlashcard();

});

// ---------- Delete ----------

deleteCardBtn.addEventListener("click", () => {

    if (flashcards.length === 0) return;

    if (!confirm("Delete this flashcard?"))
        return;

    flashcards.splice(currentCard, 1);

    if (currentCard >= flashcards.length)
        currentCard = flashcards.length - 1;

    if (currentCard < 0)
        currentCard = 0;

    showAnswer = false;

    saveFlashcards();

    renderFlashcard();

});

// ---------- Click Card to Flip ----------

flashcard.addEventListener("click", () => {

    if (flashcards.length === 0) return;

    showAnswer = !showAnswer;

    renderFlashcard();

});

// ---------- Initial Load ----------

renderFlashcard();
/* ===================================
   AI Study Assistant
   script.js (Part 3.8)
   Quiz Generator
=================================== */

// ---------- Quiz Elements ----------

const quizQuestion = document.getElementById("quizQuestion");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const correctOption = document.getElementById("correctOption");

const addQuizBtn = document.getElementById("addQuiz");
const submitQuizBtn = document.getElementById("submitQuiz");

const quizContainer = document.getElementById("quizContainer");
const quizScore = document.getElementById("quizScore");

// ---------- Render Quiz ----------

function renderQuiz() {

    quizContainer.innerHTML = "";

    if (quizQuestions.length === 0) {

        quizContainer.innerHTML = `
            <div class="card center">
                <h3>No quiz questions yet.</h3>
            </div>
        `;

        updateDashboard();
        return;
    }

    quizQuestions.forEach((quiz, index) => {

        const card = document.createElement("div");
        card.className = "quizCard fade";

        card.innerHTML = `
            <h3>${index + 1}. ${quiz.question}</h3>

            <label>
                <input type="radio"
                name="quiz${index}"
                value="1">
                ${quiz.options[0]}
            </label>

            <label>
                <input type="radio"
                name="quiz${index}"
                value="2">
                ${quiz.options[1]}
            </label>

            <label>
                <input type="radio"
                name="quiz${index}"
                value="3">
                ${quiz.options[2]}
            </label>

            <label>
                <input type="radio"
                name="quiz${index}"
                value="4">
                ${quiz.options[3]}
            </label>
        `;

        quizContainer.appendChild(card);

    });

    updateDashboard();

}

// ---------- Add Question ----------

addQuizBtn.addEventListener("click", () => {

    const question = quizQuestion.value.trim();

    const options = [
        option1.value.trim(),
        option2.value.trim(),
        option3.value.trim(),
        option4.value.trim()
    ];

    const answer = Number(correctOption.value);

    if (
        question === "" ||
        options.some(item => item === "") ||
        answer < 1 ||
        answer > 4
    ) {

        alert("Please complete all fields correctly.");
        return;

    }

    quizQuestions.push({

        question,
        options,
        answer

    });

    saveQuizQuestions();

    quizQuestion.value = "";
    option1.value = "";
    option2.value = "";
    option3.value = "";
    option4.value = "";
    correctOption.value = "";

    renderQuiz();

});

// ---------- Submit Quiz ----------

submitQuizBtn.addEventListener("click", () => {

    if (quizQuestions.length === 0) {

        alert("No quiz available.");
        return;

    }

    let score = 0;

    quizQuestions.forEach((quiz, index) => {

        const selected = document.querySelector(
            `input[name="quiz${index}"]:checked`
        );

        if (
            selected &&
            Number(selected.value) === quiz.answer
        ) {

            score++;

        }

    });

    quizScore.textContent =
        `Score: ${score} / ${quizQuestions.length}`;

});

// ---------- Initial Load ----------

renderQuiz();
/* ===================================
   AI Study Assistant
   script.js (Part 3.9)
   Progress Dashboard
=================================== */

// ---------- Progress Elements ----------

const progressMessage = document.createElement("p");
progressMessage.id = "progressMessage";

const dashboardSection = document.getElementById("dashboard");

if (dashboardSection) {
    dashboardSection.appendChild(progressMessage);
}

// ---------- Dashboard Refresh ----------

function refreshDashboard() {

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const flashcardTotal = flashcards.length;

    const quizTotal = quizQuestions.length;

    // Statistics

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    cardCountEl.textContent = flashcardTotal;
    quizCountEl.textContent = quizTotal;

    // Progress

    let percent = 0;

    if (total > 0) {
        percent = Math.round((completed / total) * 100);
    }

    progressFill.style.width = percent + "%";
    progressText.textContent = percent + "% Completed";

    // Motivation

    if (percent === 100 && total > 0) {

        progressMessage.textContent =
            "🏆 Excellent! All study tasks completed.";

    } else if (percent >= 75) {

        progressMessage.textContent =
            "🔥 Great progress! Keep going.";

    } else if (percent >= 50) {

        progressMessage.textContent =
            "📚 Halfway there! Stay focused.";

    } else if (percent > 0) {

        progressMessage.textContent =
            "💪 Good start! Keep studying.";

    } else {

        progressMessage.textContent =
            "🚀 Add and complete study tasks to track progress.";

    }

}

// ---------- Auto Refresh ----------

const originalSaveTasks = saveTasks;

saveTasks = function () {

    originalSaveTasks();

    refreshDashboard();

};

const originalSaveFlashcards = saveFlashcards;

saveFlashcards = function () {

    originalSaveFlashcards();

    refreshDashboard();

};

const originalSaveQuizQuestions = saveQuizQuestions;

saveQuizQuestions = function () {

    originalSaveQuizQuestions();

    refreshDashboard();

};

// ---------- First Dashboard Load ----------

refreshDashboard();
/* ===================================
   AI Study Assistant
   script.js (Part 3.10)
   Final Initialization
=================================== */

// ---------- Initialize App ----------

function initializeApp() {

    // Load saved notes
    if (notesArea) {
        notesArea.value = localStorage.getItem("notes") || "";
    }

    // Refresh all UI
    renderTasks();
    renderFlashcard();
    renderQuiz();
    refreshDashboard();
    updateTimerDisplay();

}

// ---------- Save Before Leaving ----------

window.addEventListener("beforeunload", () => {

    saveData("tasks", tasks);
    saveData("flashcards", flashcards);
    saveData("quizQuestions", quizQuestions);

    if (notesArea) {
        localStorage.setItem("notes", notesArea.value);
    }

});

// ---------- Keyboard Shortcuts ----------

document.addEventListener("keydown", (event) => {

    // Ctrl + S = Save Notes
    if (event.ctrlKey && event.key.toLowerCase() === "s") {

        event.preventDefault();

        if (notesArea) {
            localStorage.setItem("notes", notesArea.value);
        }

        if (typeof notesStatus !== "undefined") {
            notesStatus.textContent = "💾 Notes Saved";
            setTimeout(() => {
                notesStatus.textContent = "";
            }, 1500);
        }
    }

    // Escape = Pause Timer
    if (event.key === "Escape" && timerRunning) {
        pauseTimerBtn.click();
    }

});

// ---------- Start Application ----------

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

initializeApp();