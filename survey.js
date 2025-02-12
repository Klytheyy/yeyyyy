document.addEventListener("DOMContentLoaded", function() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const nextButton = document.getElementById("nextBtn");
    const responseElement = document.getElementById("response");
    let selectedOptions = [];
    
    function typeText(element, text, callback) {
        let i = 0;
        element.textContent = "";
        function type() {
            if (i < text.length) {
                element.textContent += text[i];
                i++;
                setTimeout(type, 50);
            } else {
                setTimeout(callback, 500);
            }
        }
        type();
    }

    typeText(questionElement, "What is your love language?", function() {
        displayCheckboxOptions(["Physical Touch", "Quality Time", "Receiving Gifts", "Words of Affirmation", "Acts of Service"]);
        nextButton.classList.remove("hidden");
    });
    
    nextButton.addEventListener("click", function() {
        selectedOptions = Array.from(optionsElement.querySelectorAll("input:checked"))
            .map(input => input.value);
        
        if (selectedOptions.length === 0) {
            alert("Please select at least one love language.");
            return;
        }
        
        optionsElement.classList.add("hidden");
        nextButton.classList.add("hidden");
        processFollowUp(selectedOptions);
    });
    
    function displayCheckboxOptions(options) {
        optionsElement.innerHTML = "";
        options.forEach(option => {
            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = option;
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(option));
            optionsElement.appendChild(label);
            optionsElement.appendChild(document.createElement("br"));
        });
        optionsElement.classList.remove("hidden");
    }
    
    function processFollowUp(choices) {
        if (choices.includes("Physical Touch")) {
            askQuestion("What type of physical affection do you prefer?", ["Kiss", "Hug", "Holding Hands", "Cuddle"]);
        } else if (choices.includes("Quality Time")) {
            askQuestion("What should we do together?", ["Daylight stroll", "Late Night Walk"]);
        } else if (choices.includes("Receiving Gifts")) {
            askQuestion("What would you like to receive?", ["Flowers", "Chocolates", "Something else"]);
        } else if (choices.includes("Words of Affirmation")) {
            askQuestion("Would you like to hear a?", ["Pickup line", "Deep talk"]);
        } else if (choices.includes("Acts of Service")) {
            askQuestion("How can I show my love through acts of service?", ["Let me take care of you", "I'll always be there for you"]);
        } else {
            finalizeSurvey();
        }
    }
    
    function askQuestion(text, options) {
        typeText(questionElement, text, function() {
            displayOptions(options);
        });
    }
    
    function displayOptions(options) {
        optionsElement.innerHTML = "";
        options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("choice-btn");
            button.onclick = function() {
                handleChoice(option);
            };
            optionsElement.appendChild(button);
        });
        optionsElement.classList.remove("hidden");
    }
    
    function handleChoice(choice) {
        optionsElement.classList.add("hidden");
        let responseText = "";
        
        const responses = {
            "Hug": "I'd love a warm hug from you! 💖",
            "Holding Hands": "Your hands in mine? Perfect pookie. 🤝",
            "Cuddle": "Cuddling up close sounds like a dream. ☁️💞",
            "Deep Talk": "Love starts as a feeling but continues as a choice. I find myself choosing you every day. 💕",
            "Late Night Walk": "The world asleep, just us and the stars and our ruined sleep schedule so suwit ugh 🌙✨",
            "Daylight Stroll": "Syarog dili hangakon love xD 🌞💛",
            "Flowers": "Flowers for you, my love, always. 🌸💐",
            "Chocolates": "Sweet chocolates for my sweetest one. 🍫💕",
            "Something else": "Oh? I love surprises (starts with S). 🎁😉",
            "Let me take care of you": "You're my priority, always. ❤️",
            "I'll always be there for you": "Through ups and downs, I'll stand by you. 💪💕",
        };
        
        if (choice === "Kiss") {
            askQuestion("If kiss, where?", ["Lips", "Cheeks", "Forehead"]);
            return;
        } else if (choice === "Pickup line") {
            askQuestion("Ketchup kaba?", ["Why", "Bakit", "Por que", "Hindi"]);
            return;
        } else if (choice === "Lips") {
            responseText = "A kiss on the lips? wow kissable yarn 😏";
        } else if (choice === "Cheeks") {
            responseText = "Cheek kisses are sweet, just like you. 😊";
        } else if (choice === "Forehead") {
            responseText = "Forehead kisses show real love and care. 💖";
        } else if (["Why", "Bakit", "Por que"].includes(choice)) {
            responseText = "Kasi bagay ka sa hotdog ko 😉";
        } else if (choice === "Hindi") {
            responseText = "Sige lang, gwapa man japun, iloveu 😘";
        } else {
            responseText = responses[choice] || "Great choice!";
        }
        
        typeText(responseElement, responseText, function() {
            setTimeout(finalizeSurvey, 1000);
        });
    }
    
    function finalizeSurvey() {
        askQuestion("Where should we go for our date?", ["Coffee Date", "Picnic Date", "Sunset Date", "Museum Date", "Cinema Date"]);
    }
});
