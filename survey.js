const questions = {
    "loveLanguage": {
        text: "What's your love language? (Pick at least one)",
        choices: ["Physical Touch", "Quality Time", "Receiving Gifts", "Words of Affirmation", "Acts of Service"],
        followUp: {
            "Physical Touch": { text: "What type of physical affection do you prefer?", choices: ["Kiss", "Hug", "Holding Hands", "Cuddle"] },
            "Quality Time": { text: "What should we do together?", choices: ["Daylight stroll", "Late Night Walk"] },
            "Receiving Gifts": { text: "What would you like to receive?", choices: ["Flowers", "Chocolates", "Something else"] },
            "Words of Affirmation": { text: "Would you like to hear a?", choices: ["Pickup line", "Deep talk"] },
            "Acts of Service": { text: "How can I show my love through acts of service?", choices: ["Let me take care of you", "I'll always be there for you"] }
        }
    },
    "kissFollowUp": { text: "If kiss, where?", choices: ["Lips", "Cheeks", "Forehead"] },
    "pickupFollowUp": { text: "Ketchup kaba?", choices: ["Why", "Bakit", "Por que", "Hindi"] },
    "finalQuestion": { text: "Where should we go for our date?", choices: ["Coffee Date", "Picnic Date", "Sunset Date", "Museum Date", "Cinema Date"] }
};

const responses = {
    "Hug": "I'd love a warm hug from you! 💖",
    "Holding Hands": "Your hands in mine? Perfect pookie. 🤝",
    "Cuddle": "Cuddling up close sounds like a dream. ☁️💞",
    "Deep Talk": "Love starts as a feeling but continues as a choice. I find myself choosing you every day. 💕",
    "Late Night Walk": "The world asleep, just us and the stars and our ruined sleep schedule so suwit ugh 🌙✨",
    "Daylight stroll": "Syarog dili hangakon love xD 🌞💛",
    "Flowers": "Flowers for you, my love, always. 🌸💐",
    "Chocolates": "Sweet chocolates for my sweetest one. 🍫💕",
    "Something else": "Oh? I love surprises (starts with S). 🎁😉",
    "Let me take care of you": "You're my priority, always. ❤️",
    "I'll always be there for you": "Through ups and downs, I'll stand by you. 💪💕",
    "Lips": "A kiss on the lips? wow kissable yarn 😏",
    "Cheeks": "Cheek kisses are sweet, just like you. 😊",
    "Forehead": "Forehead kisses show real love and care. 💖",
    "Why": "Kasi bagay ka sa hotdog ko 😉",
    "Bakit": "Kasi bagay ka sa hotdog ko 😉",
    "Por que": "Kasi bagay ka sa hotdog ko 😉",
    "Hindi": "Sige lang, gwapa man japun, iloveu 😘",
    "Coffee Date": "Sipping warm coffee, lost in your eyes—sounds like a perfect date to me. ☕💖",
    "Picnic Date": "A cozy blanket, good food, and you—nothing could be better. 🧺💞",
    "Sunset Date": "Watching the sun set as we hold hands? Peak romance. 🌅💕",
    "Museum Date": "Walking through history and art with you? A masterpiece of a date. 🎨💑",
    "Cinema Date": "Sharing popcorn, whispering jokes, and a good movie—just us. 🎬🍿💖"
};

const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices-container");

function typeText(text, callback) {
    let i = 0;
    questionText.innerHTML = "";
    function type() {
        if (i < text.length) {
            questionText.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            setTimeout(callback, 500);
        }
    }
    type();
}

function showChoices(choices) {
    choicesContainer.innerHTML = "";
    choicesContainer.style.visibility = "visible";
    choices.forEach(choice => {
        let btn = document.createElement("button");
        btn.classList.add("choice-btn");
        btn.textContent = choice;
        btn.onclick = () => handleChoice(choice);
        choicesContainer.appendChild(btn);
    });
}

function handleChoice(choice) {
    choicesContainer.style.visibility = "hidden";
    if (responses[choice]) {
        typeText(responses[choice], () => {
            setTimeout(() => window.location.href = "valentine_gifs.html", 2000);
        });
    } else if (questions.kissFollowUp.choices.includes(choice)) {
        askQuestion("kissFollowUp");
    } else if (questions.pickupFollowUp.choices.includes(choice)) {
        askQuestion("pickupFollowUp");
    } else {
        askQuestion("finalQuestion");
    }
}

function askQuestion(key) {
    typeText(questions[key].text, () => showChoices(questions[key].choices));
}

document.addEventListener("DOMContentLoaded", () => askQuestion("loveLanguage"));
