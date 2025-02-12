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
        optionsElement.classList.remove("hidden");
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
    
    function processFollowUp(choices) {
        if (choices.includes("Physical Touch")) {
            typeText(questionElement, "What type of physical affection do you prefer?", function() {
                displayOptions(["Kiss", "Hug", "Holding Hands", "Cuddle"]);
            });
        } else if (choices.includes("Quality Time")) {
            typeText(questionElement, "What should we do together?", function() {
                displayOptions(["Daylight stroll", "Late Night Walk"]);
            });
        } else if (choices.includes("Receiving Gifts")) {
            typeText(questionElement, "What would you like to receive?", function() {
                displayOptions(["Flowers", "Chocolates", "Something else"]);
            });
        } else if (choices.includes("Words of Affirmation")) {
            typeText(questionElement, "Would you like to hear a?", function() {
                displayOptions(["Pickup line", "Deep talk"]);
            });
        } else if (choices.includes("Acts of Service")) {
            typeText(questionElement, "How can I show my love through acts of service?", function() {
                displayOptions(["Let me take care of you", "I'll always be there for you"]);
            });
        }
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
            "Deep talk": "Love starts as a feeling but continues as a choice. I find myself choosing you every day. 💕",
            "Late Night Walk": "The world asleep, just us and the stars and our ruined sleep schedule so suwit ugh 🌙✨",
            "Daylight stroll": "Syarog dili hangakon love xD 🌞💛",
            "Flowers": "Flowers for you, my love, always. 🌸💐",
            "Chocolates": "Sweet chocolates for my sweetest one. 🍫💕",
            "Something else": "Oh? I love surprises (starts with S). 🎁😉",
            "Let me take care of you": "You're my priority, always. ❤️",
            "I'll always be there for you": "Through ups and downs, I'll stand by you. 💪💕"
        };
        
        if (choice === "Kiss") {
            typeText(questionElement, "If kiss, where?", function() {
                displayOptions(["Lips", "Cheeks", "Forehead"]);
            });
            return;
        }
        
        if (choice === "Pickup line") {
            typeText(questionElement, "Ketchup kaba?", function() {
                displayOptions(["Why", "Bakit", "Por que", "Hindi"]);
            });
            return;
        }
        
        if (["Lips", "Cheeks", "Forehead"].includes(choice)) {
            const kissResponses = {
                "Lips": "A kiss on the lips? wow kissable yarn 😏",
                "Cheeks": "Cheek kisses are sweet, just like you. 😊",
                "Forehead": "Forehead kisses show real love and care. 💖"
            };
            responseText = kissResponses[choice];
        } else if (["Why", "Bakit", "Por que"].includes(choice)) {
            responseText = "Kasi bagay ka sa hotdog ko 😉";
        } else if (choice === "Hindi") {
            responseText = "Sige lang, gwapa man japun, iloveu 😘";
        } else {
            responseText = responses[choice] || "Great choice!";
        }
        
        typeText(responseElement, responseText, function() {
            setTimeout(() => {
                typeText(questionElement, "Where should we go for our date?", function() {
                    displayOptions(["Coffee Date", "Picnic Date", "Sunset Date", "Museum Date", "Cinema Date"]);
                });
            }, 1000);
        });
    }
});
