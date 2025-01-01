// Initialisiere die Erfolge für jede Zahl von 1 bis 12 mit 0
let successes = {};
for (let i = 1; i <= 12; i++) {
    successes[i] = 0;
}

// Initialisiere die Anzahl der Kugeln pro Zahl
const totalBallsPerNumber = 7;
let targetNumber = null; // Zielzahl, die der Spieler auswählt

// Funktion zum Erstellen der Würfel im HTML
function createDice() {
    const diceContainer = document.getElementById('diceContainer');
    diceContainer.innerHTML = ''; // Leere den Container

    for (let i = 1; i <= 6; i++) {
        const dice = document.createElement('div');
        dice.classList.add('dice');
        dice.id = `dice-${i}`;
        dice.textContent = '-';
        diceContainer.appendChild(dice);
    }
}

// Funktion zum Aktualisieren der Erfolgsanzeige
function updateSuccesses() {
    const successList = document.getElementById('successList');
    successList.innerHTML = ''; // Leere die Liste vor dem Aktualisieren

    for (let i = 1; i <= 12; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = `Zahl ${i}: ${successes[i]} von ${totalBallsPerNumber} Kugeln gewürfelt.`;
        successList.appendChild(listItem);
    }
}

// Funktion zum Würfeln
function rollDice() {
    let results = [];
    for (let i = 0; i < 6; i++) {
        results.push(Math.floor(Math.random() * 12) + 1); // Zahlen von 1 bis 12
    }
    return results;
}

// Hauptspielrunde
function diceRound() {
    let remainingRolls = 3; // Spieler darf 3-mal würfeln
    let currentSuccesses = 0; // Erfolge für diese Runde
    let remainingDice = 6; // Anfangs sind alle Würfel verfügbar

    // Erster Wurf
    let dice = rollDice();
    console.log(`Erster Wurf: ${dice.join(", ")}`);
    updateDiceDisplay(dice);

    // Spieler wählt Zielzahl
    targetNumber = parseInt(prompt(`Bitte wähle eine Zahl aus deinem Wurf (${dice.join(", ")}):`), 10);

    if (!targetNumber || !dice.includes(targetNumber)) {
        console.log("Ungültige Auswahl oder Zahl nicht im Wurf enthalten. Der Zug endet.");
        return;
    }

    console.log(`Du hast die Zahl ${targetNumber} gewählt.`);

    // Filter Erfolge aus dem ersten Wurf
    currentSuccesses += dice.filter(num => num === targetNumber).length;
    remainingDice -= currentSuccesses;

    updateSuccesses();

    // Weitere Würfe
    for (let i = 1; i <= 2; i++) {
        if (remainingDice <= 0 || currentSuccesses >= totalBallsPerNumber) {
            break; // Kein Bedarf für weitere Würfe
        }

        dice = rollDice().slice(0, remainingDice);
        console.log(`Wurf ${i + 1}: ${dice.join(", ")}`);
        updateDiceDisplay(dice);

        currentSuccesses += dice.filter(num => num === targetNumber).length;
        remainingDice -= dice.filter(num => num === targetNumber).length;

        updateSuccesses();

        if (currentSuccesses >= totalBallsPerNumber) {
            console.log(`Ziel erreicht! Du hast alle ${totalBallsPerNumber} ${targetNumber}.`);
            break;
        }
    }

    // Aktualisiere die Gesamtanzahl der Erfolge
    successes[targetNumber] += currentSuccesses;
    if (successes[targetNumber] > totalBallsPerNumber) {
        successes[targetNumber] = totalBallsPerNumber;
    }

    console.log(`Runde beendet. Aktuelle Erfolge für ${targetNumber}: ${successes[targetNumber]} von ${totalBallsPerNumber}.`);
    updateSuccesses();
}

// Aktualisiere die Anzeige der Würfel im HTML
function updateDiceDisplay(dice) {
    for (let i = 1; i <= 6; i++) {
        const diceDiv = document.getElementById(`dice-${i}`);
        if (i <= dice.length) {
            diceDiv.textContent = dice[i - 1];
        } else {
            diceDiv.textContent = '-';
        }
    }
}

// Initialisiere das Spiel beim Laden der Seite
window.onload = function () {
    createDice();
    updateSuccesses();
    document.getElementById('rollButton').addEventListener('click', diceRound);
};
