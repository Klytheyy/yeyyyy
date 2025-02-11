let surveyQuestions = [
    { 
        text: "Which love language do you prefer?", 
        options: ["Physical Touch", "Words of Affirmation", "Quality Time", "Receiving Gifts", "Acts of Service"], 
        multipleChoice: true, 
        minSelection: 1 
    },
    { text: "Preferred Physical Affection:", options: ["Hugs", "Holding Hands", "Cuddle", "Kiss"], condition: "Physical Touch" },
    { text: "If Kiss, Where?", options: ["Lips", "Cheeks", "Forehead"], condition: "Kiss" },
    { text: "Would you like to hear a", options: ["Deep Talk", "Pick-Up Line"], condition: "Words of Affirmation" },
    { text: "Where do we go after?", options: ["Late Night Walk", "Daylight Stroll"], condition: "Quality Time" },
    { text: "Do you prefer Flowers, Chocolates, or Something Else?", options: ["Flowers", "Chocolates", "Something Else"], condition: "Receiving Gifts" },
    { text: "How can I show my love through acts of service?", options: ["Let me take care of you", "I'll always be there for you"], condition: "Acts of Service" },
    { text: "Where should we go for our date?", options: ["Coffee Date", "Picnic Date", "Sunset Date", "Museum Date", "Cinema Date"] }
];

let answers = {};
let selectedLoveLanguages = [];
let typingSpeed = 50;

function typeText(element, text, callback) {
    element.textContent = "";
    let index = 0;

    function typeNextLetter() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(typeNextLetter, typingSpeed);
        } else if (callback) {
            callback();
        }
    }

    typeNextLetter();
}

function showNextQuestion(index) {
    if (index >= surveyQuestions.length) {
        document.getElementById('surveyScreens').style.display = 'none';
        document.getElementById('gifContainer').classList.remove('hidden');
        return;
    }

    let questionObj = surveyQuestions[index];

    if (index === 0) {
        showMultipleChoiceQuestion(questionObj, index);
        return;
    }

    if (questionObj.condition && !selectedLoveLanguages.includes(questionObj.condition)) {
        showNextQuestion(index + 1);
        return;
    }

    displayQuestionWithResponse(questionObj, index);
}

function showMultipleChoiceQuestion(questionObj, index) {
    let questionText = document.getElementById('questionText');
    let answerButtons = document.getElementById('answerButtons');
    answerButtons.innerHTML = "";

    typeText(questionText, questionObj.text, () => {
        questionObj.options.forEach(option => {
            let button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => toggleSelection(button, option);
            button.classList.add("multi-select");
            answerButtons.appendChild(button);
        });

        let submitButton = document.createElement("button");
        submitButton.textContent = "Proceed";
        submitButton.disabled = true;
        submitButton.onclick = () => {
            if (selectedLoveLanguages.length < questionObj.minSelection) {
                alert("Please select at least one.");
                return;
            }
            showNextQuestion(index + 1);
        };
        submitButton.id = "submitButton";
        answerButtons.appendChild(submitButton);
    });
}

function toggleSelection(button, option) {
    let index = selectedLoveLanguages.indexOf(option);
    if (index === -1) {
        selectedLoveLanguages.push(option);
        button.classList.add("selected");
    } else {
        selectedLoveLanguages.splice(index, 1);
        button.classList.remove("selected");
    }
    document.getElementById("submitButton").disabled = selectedLoveLanguages.length < 1;
}

function displayQuestionWithResponse(questionObj, index) {
    let questionText = document.getElementById('questionText');
    let answerButtons = document.getElementById('answerButtons');
    answerButtons.innerHTML = "";

    typeText(questionText, questionObj.text, () => {
        questionObj.options.forEach(option => {
            let button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => {
                answers[index] = option;
                
                if (option === "Pick-Up Line") {
                    showPickupLine();
                } else if (option === "Deep Talk") {
                    showDeepTalk();
                } else {
                    showResponseText(option, () => showNextQuestion(index + 1));
                }
            };
            answerButtons.appendChild(button);
        });
    });
}

function showResponseText(option, callback) {
    let responseText = document.getElementById('responseText');
    let responseMessages = {
        "Hugs": "I'd love a warm hug from you!",
        "Holding Hands": "I'd love to hold hands with you too.",
        "Cuddle": "Cuddling with you sounds perfect.",
        "Kiss": "A kiss? That’s sweet.",
        "Lips": "A kiss on the lips, huh? Interesting choice!",
        "Cheeks": "Cheek kisses are adorable!",
        "Forehead": "Forehead kisses are full of love.",
        "Deep Talk": "Wow, to start. Love starts as a feeling, but to continue is a choice, and I find myself choosing you more and more every day.",
        "Late Night Walk": "Late night walks are so peaceful and romantic.",
        "Daylight Stroll": "A sunny stroll sounds perfect!",
        "Flowers": "Flowers, classic and beautiful!",
        "Chocolates": "Sweet choice, just like you.",
        "Something Else": "Oh? What could it be?",
        "Let me take care of you": "I'd love to take care of you and make your life easier.",
        "I'll always be there for you": "No matter what happens, I'll always have your back."
    };

    responseText.textContent = "";
    typeText(responseText, responseMessages[option] || "Great choice!", () => {
        setTimeout(callback, 1000);
    });
}

function showPickupLine() {
    let questionText = document.getElementById('questionText');
    let answerButtons = document.getElementById('answerButtons');
    answerButtons.innerHTML = "";

    let pickupLine = "Ketchup ka ba?";
    typeText(questionText, pickupLine, () => {
        let hindiBtn = createButton("Hindi", () => finalPickupLine("Sige lang gwapa man japun, iloveu"));
        let bakitBtn = createButton("Bakit?", () => finalPickupLine("Kasi bagay ka sa hotdog ko😉"));
        let whyBtn = createButton("Why?", () => finalPickupLine("Kasi bagay ka sa hotdog ko😉"));
        let porQueBtn = createButton("Por qué?", () => finalPickupLine("Kasi bagay ka sa hotdog ko😉"));

        answerButtons.appendChild(hindiBtn);
        answerButtons.appendChild(bakitBtn);
        answerButtons.appendChild(whyBtn);
        answerButtons.appendChild(porQueBtn);
    });
}

function showDeepTalk() {
    let questionText = document.getElementById('questionText');
    let answerButtons = document.getElementById('answerButtons');
    answerButtons.innerHTML = "";

    let deepTalkMessage = "Wow, to start. Love starts as a feeling, but to continue is a choice, and I find myself choosing you more and more every day.";
    typeText(questionText, deepTalkMessage, () => {
        setTimeout(() => showNextQuestion(surveyQuestions.length - 1), 2000);
    });
}

function finalPickupLine(message) {
    let questionText = document.getElementById('questionText');
    let answerButtons = document.getElementById('answerButtons');

    questionText.innerHTML = "";
    answerButtons.innerHTML = "";

    typeText(questionText, message, () => {
        let proceedBtn = createButton("Proceed", () => {
            window.location.href = "valentine_gifs.html";
        });
        answerButtons.appendChild(proceedBtn);
    });
}

function createButton(text, onClick) {
    let button = document.createElement("button");
    button.textContent = text;
    button.onclick = onClick;
    return button;
}

showNextQuestion(0);
