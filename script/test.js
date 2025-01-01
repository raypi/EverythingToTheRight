// Funktion: Initialisierung beim Laden der Seite
function init() {
    getDiceRound();
}

// Funktion: Erzeugt sechs Würfel und gibt jedem eine zufällige Zahl zwischen 1 und 6
function getDiceRound() {
    const diceContainer = document.getElementById('diceContainer');
    diceContainer.innerHTML = ''; // Leere den Container für neue Würfel

    const diceResults = []; // Array zur Speicherung der Würfelergebnisse

    // Erstelle 6 Würfel und füge sie in den Container ein
    for (let i = 1; i <= 6; i++) {
        const dice = document.createElement('div');
        dice.classList.add('dice');
        dice.id = `dice-${i}`;
        
        // Generiere eine zufällige Zahl zwischen 1 und 6
        const diceValue = Math.floor(Math.random() * 6) + 1;
        dice.textContent = diceValue; // Setze die Zahl auf den Würfel

        diceResults.push(diceValue); // Speichere das Ergebnis im Array
        diceContainer.appendChild(dice); // Füge den Würfel in den Container ein
    }

    // Ausgabe des Würfelwurfs in der Konsole
    console.log(`1. Würfeln: ${diceResults.join(", ")}`);
    useResults();
}

function useResults() {
    const diceValues = []; // Array zur Speicherung der Würfelwerte

    // Hole die Werte der Würfel aus dem DOM
    for (let i = 1; i <= 6; i++) {
        const dice = document.getElementById(`dice-${i}`);
        if (dice) {
            diceValues.push(parseInt(dice.textContent, 10)); // Werte auslesen und als Zahl speichern
        }
    }

    console.log(`Würfelergebnisse: ${diceValues.join(", ")}`);

    const possibleResults = {}; // Objekt zur Speicherung der möglichen Kombinationen

    // Suche nach direkten Treffern für die Zahlen 1 bis 6
    for (let i = 1; i <= 6; i++) {
        possibleResults[i] = diceValues.filter(value => value === i);
    }

    // Suche nach Kombinationen für die Zahlen 7 bis 12
    for (let target = 7; target <= 12; target++) {
        possibleResults[target] = []; // Initialisiere mit leerem Array

        // Überprüfe alle Paare von Würfeln
        for (let i = 0; i < diceValues.length; i++) {
            for (let j = i + 1; j < diceValues.length; j++) {
                if (diceValues[i] + diceValues[j] === target) {
                    possibleResults[target].push([diceValues[i], diceValues[j]]);
                }
            }
        }
    }

    // Ausgabe der möglichen Ergebnisse
    console.log("Mögliche Werte:");
    for (let value = 1; value <= 12; value++) {
        if (value <= 6) {
            console.log(`${value}: ${possibleResults[value].length > 0 ? possibleResults[value].join(", ") : "Keine"}`);
        } else {
            const combinations = possibleResults[value]
                .map(pair => pair.join("+"))
                .join(", ");
            console.log(`${value}: ${combinations || "Keine"}`);
        }
    }

    console.log("Wähle deine Ziffer:");
    console.log("Mögliche Werte: 1 bis 12");
}

