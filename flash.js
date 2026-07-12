// =========================
// FLASHCARD ENGINE - PART 1
// =========================

let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

let currentCard = 0;
let showingAnswer = false;

const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");

const flashcard = document.getElementById("flashcard");

const addBtn = document.getElementById("addCard");
const prevBtn = document.getElementById("prevCard");
const nextBtn = document.getElementById("nextCard");
const flipBtn = document.getElementById("flipCard");
const deleteBtn = document.getElementById("deleteCard");

function saveCards() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

function updateCardCount() {
    const count = document.getElementById("cardCount");
    if (count) count.textContent = flashcards.length;
}

function showCard() {

    if (flashcards.length === 0) {
        flashcard.innerHTML = "<h3>No Flashcards</h3>";
        updateCardCount();
        return;
    }

    if (currentCard < 0) currentCard = flashcards.length - 1;
    if (currentCard >= flashcards.length) currentCard = 0;

    showingAnswer = false;

    flashcard.innerHTML = `
        <h3>${flashcards[currentCard].question}</h3>
        <p>Card ${currentCard + 1} / ${flashcards.length}</p>
    `;

    updateCardCount();
}

function flipCard() {

    if (flashcards.length === 0) return;

    if (!showingAnswer) {

        flashcard.innerHTML = `
            <h3>${flashcards[currentCard].answer}</h3>
            <p>Answer</p>
        `;

    } else {

        flashcard.innerHTML = `
            <h3>${flashcards[currentCard].question}</h3>
            <p>Card ${currentCard + 1} / ${flashcards.length}</p>
        `;

    }

    showingAnswer = !showingAnswer;
}

addBtn.onclick = function () {

    const q = questionInput.value.trim();
    const a = answerInput.value.trim();

    if (q === "" || a === "") return;

    flashcards.push({
        question: q,
        answer: a
    });

    saveCards();

    questionInput.value = "";
    answerInput.value = "";

    currentCard = flashcards.length - 1;

    showCard();
};

nextBtn.onclick = function () {
    if (flashcards.length === 0) return;
    currentCard++;
    showCard();
};

prevBtn.onclick = function () {
    if (flashcards.length === 0) return;
    currentCard--;
    showCard();
};

flipBtn.onclick = flipCard;

deleteBtn.onclick = function () {

    if (flashcards.length === 0) return;

    flashcards.splice(currentCard, 1);

    if (currentCard >= flashcards.length) {
        currentCard = flashcards.length - 1;
    }

    saveCards();
    showCard();
};

showCard();

let defaultCards = [
{
question:"What are the three broad groups within Kingdom Monera?",
answer:"Archaebacteria, Eubacteria (True Bacteria) and Cyanobacteria."
},
{
question:"Why are Archaebacteria called ancient bacteria?",
answer:"They survive in extreme habitats like hot springs, salty areas and marshes due to their unique cell wall."
},
{
question:"Where are methanogens found?",
answer:"In the gut of ruminants like cows and buffaloes. They produce methane used in gobar gas."
},
{
question:"What is unique about Mycoplasma?",
answer:"It has no cell wall and is the smallest living cell."
},
{
question:"What is a heterocyst?",
answer:"A thick-walled nitrogen-fixing cell found in Nostoc and Anabaena."
},
{
question:"Name the nutrition types in Monera.",
answer:"Photosynthetic autotrophic, chemosynthetic autotrophic and heterotrophic."
},
{
question:"Why is Protista called a link kingdom?",
answer:"Because it shows characteristics of plants, animals and fungi."
},
{
question:"What is diatomaceous earth?",
answer:"Deposits of silica cell walls of diatoms used in filtration and polishing."
},
{
question:"What causes red tides?",
answer:"Rapid multiplication of dinoflagellates like Gonyaulax."
},
{
question:"How many flagella do dinoflagellates possess?",
answer:"Two flagella—one longitudinal and one transverse."
},
{
question:"What is the pellicle?",
answer:"A protein-rich covering of Euglena instead of a cell wall."
},
{
question:"What is mixotrophic nutrition?",
answer:"Nutrition where an organism is both autotrophic and heterotrophic."
},
{
question:"What is plasmodium in slime moulds?",
answer:"A multinucleate mass that feeds on decaying matter; it is different from the malaria parasite."
},
{
question:"Name the four protozoan groups.",
answer:"Amoeboids, Flagellates, Ciliates and Sporozoans."
},
{
question:"What is the fungal cell wall made of?",
answer:"Chitin."
},
{
question:"Name three nutrition modes of fungi.",
answer:"Saprophytic, Parasitic and Symbiotic."
},
{
question:"What are the three stages of sexual reproduction in fungi?",
answer:"Plasmogamy, Karyogamy and Meiosis."
},
{
question:"Why are Deuteromycetes called imperfect fungi?",
answer:"Because only their asexual stage is known."
},
{
question:"How does plasmogamy occur in Basidiomycetes?",
answer:"By fusion of vegetative cells."
},
{
question:"Give two examples of Phycomycetes.",
answer:"Mucor and Rhizopus."
},
{
question:"Why are viruses not included in the Five Kingdom classification?",
answer:"Because they are acellular."
},
{
question:"Can a virus contain both DNA and RNA?",
answer:"No. A virus contains either DNA or RNA."
},
{
question:"Who discovered Tobacco Mosaic Virus?",
answer:"D. Iwanowsky."
},
{
question:"What is a viroid?",
answer:"A free RNA particle without a protein coat."
},
{
question:"Why are lichens bioindicators?",
answer:"Because they cannot grow in polluted air."
}
];

let flashcards =
JSON.parse(localStorage.getItem("flashcards")) || defaultCards;

saveCards();