let surveyQuestions = [
    { text: "Which language do you prefer:", options: ["Physical Touch", "Words of Affirmation", "Quality Time", "Receiving Gifts", "Acts of Service"] },
    { text: "Preferred Physical Affection:", options: ["Hugs", "Holding Hands", "Cuddle", "Kiss"] },
    { text: "If Kiss, Where?", options: ["Lips", "Cheeks", "Forehead"], condition: "Kiss" },
    { text: "Where should we go?", options: ["Coffee Date", "Picnic Date", "Sunset Date", "Museum Date", "Cinema Date"] },
    { text: "Where do we go after?", options: ["Late Night Walk", "Daylight Stroll"] },
    { text: "Would you like to hear a", options: ["Deep Talk", "Pick-Up Line"] }
];

let answers = {};
let currentQuestionIndex = 0;
let typingSpeed = 110; // 0.10s per letter

function typeText(element, text, callback) {
    element.textContent = ""; 
    let index = 0;
    
    function typeNextLetter() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(typeNextLetter, typingSpeed);
        } else if (callback) {
            callback(); // Proceed after typing is complete
        }
    }
    
    typeNextLetter();
}

function showNextQuestion(index) {
    if (index >= surveyQuestions.length) {
        document.querySelector(".survey-container").style.display = "none";
        document.getElementById('gifContainer').classList.remove('hidden');
        return;
    }

    let questionObj = surveyQuestions[index];

    // Skip conditional question if condition isn't met
    if (questionObj.condition && answers[1] !== questionObj.condition) {
        showNextQuestion(index + 1);
        return;
    }

    let questionText = document.getElementById('questionText');
    let answerButtons = document.getElementById('answerButtons');
    answerButtons.innerHTML = "";

    // Special handling for the last question
    if (index === surveyQuestions.length - 1) {
        typeText(questionText, questionObj.text, () => {
            let deepTalkBtn = document.createElement("button");
            deepTalkBtn.textContent = "Deep Talk";
            deepTalkBtn.onclick = () => showDeepTalk();

            let pickUpLineBtn = document.createElement("button");
            pickUpLineBtn.textContent = "Pick-Up Line";
            pickUpLineBtn.onclick = () => showPickupLine();

            answerButtons.appendChild(deepTalkBtn);
            answerButtons.appendChild(pickUpLineBtn);
        });
    } else {
        typeText(questionText, questionObj.text, () => {
            questionObj.options.forEach(option => {
                let button = document.createElement("button");
                button.textContent = option;
                button.onclick = () => {
                    answers[index] = option;
                    showNextQuestion(index + 1);
                };
                answerButtons.appendChild(button);
            });
        });
    }
}

function showDeepTalk() {
    let questionText = document.getElementById('questionText');
    let answerButtons = document.getElementById('answerButtons');
    answerButtons.innerHTML = ""; // Clear buttons

    let deepTalkMessage = "Wow, to start. Love starts as a feeling, but to continue is a choice, and I find myself choosing you more and more every day.";
    typeText(questionText, deepTalkMessage);
}

function showPickupLine() {
    let questionText = document.getElementById('questionText');
    let answerButtons = document.getElementById('answerButtons');
    answerButtons.innerHTML = ""; 

    let pickupLine = "Ketchup ka ba?";
    typeText(questionText, pickupLine, () => {
        let noBtn = document.createElement("button");
        noBtn.textContent = "Hindi";
        noBtn.onclick = () => finalPickupLine("Sige lang gwapa man japun, iloveu");

        let bakitBtn = document.createElement("button");
        bakitBtn.textContent = "Bakit?";
        bakitBtn.onclick = () => finalPickupLine("Kasi bagay ka sa hotdog ko😉");

        let whyBtn = document.createElement("button");
        whyBtn.textContent = "Why?";
        whyBtn.onclick = () => finalPickupLine("Kasi bagay ka sa hotdog ko😉");

        let porQueBtn = document.createElement("button");
        porQueBtn.textContent = "Por qué?";
        porQueBtn.onclick = () => finalPickupLine("Kasi bagay ka sa hotdog ko😉");

        answerButtons.appendChild(noBtn);
        answerButtons.appendChild(bakitBtn);
        answerButtons.appendChild(whyBtn);
        answerButtons.appendChild(porQueBtn);
    });
}

function finalPickupLine(message) {
    let questionText = document.getElementById('questionText');
    let answerButtons = document.getElementById('answerButtons');
    
    questionText.innerHTML = ""; 
    answerButtons.innerHTML = ""; 

    typeText(questionText, message, () => {
        let proceedBtn = document.createElement("button");
        proceedBtn.textContent = "Proceed";
        proceedBtn.onclick = () => {
            window.location.href = "valentine_gifs.html"; // Redirect to the GIF page
        };
        answerButtons.appendChild(proceedBtn);
    });
}
// Start survey
showNextQuestion(0);
