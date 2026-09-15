let getRandomInt = (max) => Math.floor(Math.random() * max);

function computerChoice() {
    let choice = getRandomInt(3);
    
    switch (choice) {
        case 0:
            return "Rock";
            break;
        case 1:
            return "Paper";
            break;
        case 2:
        return "Scissors";
        break;
    }
}

function compareChoices(player, computer) {
    let p1 = player;
    let p2 = computer;

    if (p1 === p2) return 0;

    if (p1 === "Rock" && p2 === "Scissors" ||
        p1 === "Paper" && p2 === "Rock" ||
        p1 === "Scissors" && p2 === "Paper" ) {
            return 1;
    } else { return 2}
}

let p1Score = 0;
let p2Score = 0;

let p1Overall = 0;
let p2Overall = 0;

const buttons = document.querySelectorAll(".card");

const counter = document.querySelector(".rounds");

const p1card = document.querySelector(".p1Card");
const p2card = document.querySelector(".p2Card");

const text = document.querySelector(".roundResult > label");

const p1Text = document.querySelector(".p1Score");
const p2Text = document.querySelector(".p2Score");

p1Text.textContent = `Player's Score is: ${p1Score} / 5`;
p2Text.textContent = `Opponent's Score is: ${p2Score} / 5`;

counter.textContent = `${p1Overall} - ${p2Overall}`;

text.textContent = "What will you choose?";

p1card.classList.add("cardStylePreset")
p2card.classList.add("cardStylePreset")

buttons.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const val = event.currentTarget.dataset.value;
        const p2 = computerChoice();    
        let result = compareChoices(val, p2);

        p1card.textContent = val;
        p2card.textContent = p2;

        if (result === 0) {
            text.textContent = "a Draawww~~!!!!";
            text.style.color = "#333333";
            p1card.style.border = "2px solid #333333";
            p2card.style.border = "2px solid #333333";
            p1card.style.backgroundColor = "#333333";
            p2card.style.backgroundColor = "#333333";
            p1card.style.color = "#C3C3C3";
            p2card.style.color = "#C3C3C3";
            
        } else if (result === 1) {
            text.textContent = "Player Won!";
            p1card.style.border = "2px solid lightgreen";
            p2card.style.border = "2px solid lightcoral";
            p1card.style.color = "#C3C3C3";
            p2card.style.color = "#C3C3C3";
            p1Score += 1;
            p1Text.textContent = `Player's Score is: ${p1Score} / 5`;
        } else if (result === 2) {
            text.textContent = "Opponent Won!";
            p1card.style.border = "2px solid lightcoral";
            p2card.style.border = "2px solid lightgreen";
            p1card.style.color = "#C3C3C3";
            p2card.style.color = "#C3C3C3";
            p2Score += 1;
            p2Text.textContent = `Opponent's Score is: ${p2Score} / 5`;
        }

        if (p1Score > 4) {
             text.textContent = `Player..!\nYou Won That Match!`;
             p1Overall += 1;
             counter.textContent = `${p1Overall} - ${p2Overall}`;
             p1Score = 0;
             p2Score = 0;
             p1Text.textContent = `Player's Score is: ${p1Score} / 5`;
             p2Text.textContent = `Opponent's Score is: ${p2Score} / 5`;
             p1card.style.backgroundColor = "#333333";
            p2card.style.backgroundColor = "#333333";
        } else if (p2Score > 4) {
             text.textContent = `Opponent..!\nYou Won That Match!`;
             p2Overall += 1;
             counter.textContent = `${p1Overall} - ${p2Overall}`;
             p1Score = 0;
             p2Score = 0;
             p1Text.textContent = `Player's Score is: ${p1Score} / 5`;
             p2Text.textContent = `Opponent's Score is: ${p2Score} / 5`;
             p1card.style.backgroundColor = "#333333";
            p2card.style.backgroundColor = "#333333";
        }
    });
});

