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
    { text: "What should we do together?", options: ["Late Night Walk", "Daylight Stroll"], condition: "Quality Time" },
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
    let sideText = document.getElementById('sideText');
    answerButtons.innerHTML = "";
    sideText.innerHTML = "";

    typeText(questionText, questionObj.text, () => {
        questionObj.options.forEach(option => {
            let label = document.createElement("label");
            label.classList.add("checkbox-container");

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = option;
            checkbox.onclick = () => toggleSelection(option);
            
            let checkmark = document.createElement("span");
            checkmark.classList.add("checkmark");

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(option));
            label.appendChild(checkmark);
            answerButtons.appendChild(label);
        });

        let submitButton = document.createElement("button");
        submitButton.textContent = "Proceed";
        submitButton.disabled = true;
        submitButton.onclick = () => {
            if (selectedLoveLanguages.length < questionObj.minSelection) {
                alert("Please select at least one.");
                return;
            }

            // Update the side text when love languages are chosen
            let text = `Since you chose ${selectedLoveLanguages.join(", ")}, let's make this special!`;
            sideText.style.transform = "rotate(-30deg)";
            typeText(sideText, text, () => showNextQuestion(index + 1));
        };
        submitButton.id = "submitButton";
        answerButtons.appendChild(submitButton);
    });
}

function toggleSelection(option) {
    let index = selectedLoveLanguages.indexOf(option);
    if (index === -1) {
        selectedLoveLanguages.push(option);
    } else {
        selectedLoveLanguages.splice(index, 1);
    }
    document.getElementById("submitButton").disabled = selectedLoveLanguages.length < 1;
}

function displayQuestionWithResponse(questionObj, index) {
    let questionText = document.getElementById('questionText');
    let answerButtons = document.getElementById('answerButtons');
    let responseText = document.getElementById('responseText');

    answerButtons.innerHTML = "";
    responseText.innerHTML = "";

    typeText(questionText, questionObj.text, () => {
        questionObj.options.forEach(option => {
            let button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => {
                answers[index] = option;
                answerButtons.innerHTML = ""; 
                showResponseText(option, () => showNextQuestion(index + 1));
            };
            answerButtons.appendChild(button);
        });
    });
}

function showResponseText(option, callback) {
    let responseText = document.getElementById('responseText');
    let responseMessages = {
        "Hugs": "I'd love a warm hug from you! 💖",
        "Holding Hands": "Your hands in mine? Perfect pookie. 🤝",
        "Cuddle": "Cuddling up close sounds like a dream. ☁️💞",
        "Kiss": "A kiss? Ayieee 😘",
        "Lips": "A kiss on the lips? wow kissable yarn 😏",
        "Cheeks": "Cheek kisses are sweet, just like you. 😊",
        "Forehead": "Forehead kisses show real love and care. 💖",
        "Deep Talk": "Love starts as a feeling but continues as a choice. I find myself choosing you every day. 💕",
        "Late Night Walk": "The world asleep, just us and the stars and our ruined sleep schedule so suwit ugh 🌙✨",
        "Daylight Stroll": "Syarog dili hangakon love xD 🌞💛",
        "Flowers": "Flowers for you, my love, always. 🌸💐",
        "Chocolates": "Sweet chocolates for my sweetest one. 🍫💕",
        "Something Else": "Oh? I love surprises (starts with S). 🎁😉",
        "Let me take care of you": "You're my priority, always. ❤️",
        "I'll always be there for you": "Through ups and downs, I'll stand by you. 💪💕"
    };

    typeText(responseText, responseMessages[option] || "Great choice!", () => {
        setTimeout(callback, 1500);
    });
}

function showPickupLine() {
    let questionText = document.getElementById('questionText');
    let answerButtons = document.getElementById('answerButtons');
    answerButtons.innerHTML = "";

    let pickupLine = "Ketchup ka ba?";
    typeText(questionText, pickupLine, () => {
        let hindiBtn = createButton("Hindi", () => finalPickupLine("Sige lang, gwapa man japun, iloveu 😘"));
        let bakitBtn = createButton("Bakit?", () => finalPickupLine("Kasi bagay ka sa hotdog ko 😉"));
        let whyBtn = createButton("Why?", () => finalPickupLine("Kasi bagay ka sa hotdog ko 😉"));
        let porQueBtn = createButton("Por qué?", () => finalPickupLine("Kasi bagay ka sa hotdog ko 😉"));

        answerButtons.appendChild(hindiBtn);
        answerButtons.appendChild(bakitBtn);
        answerButtons.appendChild(whyBtn);
        answerButtons.appendChild(porQueBtn);
    });
}

showNextQuestion(0);
