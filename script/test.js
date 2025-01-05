// ### ### ### A U F G A B E N ### ### ####
// es wird nur mit den Würfeln weiter gewürfelt die nicht ausgewählt sind;
// max 3 Würfelrunden je Spielzug;
// wird mit einem oder 2 Würfeln alle 6 Würfel mit der ausgewählten Zahl belegt darf noch einmal mit allen 
// sechs Würfeln gewürfelt werden;
// wurden alle Perlen einer Zahl nach rechts verschoben [gewürfelt]] beginnt eine neue Runde für den Süieler
//  mit 3 Würfeln;


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
        possibleResults[i] = diceValues.filter(value => value === i).map(value => [value]); // Jeder Treffer wird einzeln gespeichert
    }

    // Suche nach Kombinationen für die Zahlen 7 bis 12
    for (let target = 7; target <= 12; target++) {
        possibleResults[target] = []; // Initialisiere mit leerem Array
        const usedIndices = new Set(); // Set zur Nachverfolgung, welche Würfel bereits verwendet wurden

        for (let i = 0; i < diceValues.length; i++) {
            if (usedIndices.has(i)) continue; // Überspringe bereits verwendete Würfel

            for (let j = i + 1; j < diceValues.length; j++) {
                if (usedIndices.has(j)) continue; // Überspringe bereits verwendete Würfel

                if (diceValues[i] + diceValues[j] === target) {
                    possibleResults[target].push([diceValues[i], diceValues[j]]);
                    usedIndices.add(i); // Markiere die Würfel als verwendet
                    usedIndices.add(j);
                    break; // Beende die Suche für dieses Paar, da die Würfel jetzt verwendet sind
                }
            }
        }
    }

    // Ausgabe der möglichen Ergebnisse
    console.log("Mögliche Werte:");
    for (let value = 1; value <= 12; value++) {
        if (value <= 6) {
            const results = possibleResults[value]
                .map(pair => pair.join(", ")) // Direkt-Treffer als Werte anzeigen
                .join("; ");
            console.log(`${value}: ${results || "Keine"}`);
        } else {
            const combinations = possibleResults[value]
                .map(pair => pair.join("+")) // Kombinationen von Würfeln anzeigen
                .join(", ");
            console.log(`${value}: ${combinations || "Keine"}`);
        }
    }

    return possibleResults; // Rückgabe des Ergebnisses
}



function selectNumber(possibleResults) {
    // Eingabefeld für den Spieler
    const selectedNumber = parseInt(prompt("Wähle deine Zahl (1 bis 12):"), 10);

    // Überprüfen, ob die Eingabe gültig ist
    if (isNaN(selectedNumber) || selectedNumber < 1 || selectedNumber > 12) {
        console.log("Ungültige Zahl. Bitte wähle eine Zahl zwischen 1 und 12.");
        return null;
    }

    // Überprüfen, ob es mögliche Kombinationen für die gewählte Zahl gibt
    if (!possibleResults[selectedNumber] || possibleResults[selectedNumber].length === 0) {
        console.log(`Für die Zahl ${selectedNumber} gibt es keine gültigen Kombinationen.`);
        return null;
    }

    console.log(`Du hast die Zahl ${selectedNumber} gewählt.`);
    console.log(`Mögliche Kombinationen: ${selectedNumber <= 6 ? possibleResults[selectedNumber].join(", ") : possibleResults[selectedNumber].map(pair => pair.join("+")).join(", ")}`);

    return selectedNumber;
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
        possibleResults[i] = diceValues.filter(value => value === i).map(value => [value]); // Jeder Treffer wird einzeln gespeichert
    }

    // Suche nach Kombinationen für die Zahlen 7 bis 12
    for (let target = 7; target <= 12; target++) {
        possibleResults[target] = []; // Initialisiere mit leerem Array
        const usedIndices = new Set(); // Set zur Nachverfolgung, welche Würfel bereits verwendet wurden

        for (let i = 0; i < diceValues.length; i++) {
            if (usedIndices.has(i)) continue; // Überspringe bereits verwendete Würfel

            for (let j = i + 1; j < diceValues.length; j++) {
                if (usedIndices.has(j)) continue; // Überspringe bereits verwendete Würfel

                if (diceValues[i] + diceValues[j] === target) {
                    possibleResults[target].push([diceValues[i], diceValues[j]]);
                    usedIndices.add(i); // Markiere die Würfel als verwendet
                    usedIndices.add(j);
                    break; // Beende die Suche für dieses Paar, da die Würfel jetzt verwendet sind
                }
            }
        }
    }

    // Ausgabe der möglichen Ergebnisse
    console.log("Mögliche Werte:");
    for (let value = 1; value <= 12; value++) {
        if (value <= 6) {
            const results = possibleResults[value]
                .map(pair => pair.join(", ")) // Direkt-Treffer als Werte anzeigen
                .join("; ");
            console.log(`${value}: ${results || "Keine"}`);
        } else {
            const combinations = possibleResults[value]
                .map(pair => pair.join("+")) // Kombinationen von Würfeln anzeigen
                .join(", ");
            console.log(`${value}: ${combinations || "Keine"}`);
        }
    }

    return possibleResults; // Rückgabe des Ergebnisses
}


function selectNumber(possibleResults) {
    // Eingabefeld für den Spieler
    const selectedNumber = parseInt(prompt("Wähle deine Zahl (1 bis 12):"), 10);

    // Überprüfen, ob die Eingabe gültig ist
    if (isNaN(selectedNumber) || selectedNumber < 1 || selectedNumber > 12) {
        console.log("Ungültige Zahl. Bitte wähle eine Zahl zwischen 1 und 12.");
        return null;
    }

    // Überprüfen, ob es mögliche Kombinationen für die gewählte Zahl gibt
    if (!possibleResults[selectedNumber] || possibleResults[selectedNumber].length === 0) {
        console.log(`Für die Zahl ${selectedNumber} gibt es keine gültigen Kombinationen.`);
        return null;
    }

    console.log(`Du hast die Zahl ${selectedNumber} gewählt.`);
    console.log(`Mögliche Kombinationen: ${selectedNumber <= 6 ? possibleResults[selectedNumber].join(", ") : possibleResults[selectedNumber].map(pair => pair.join("+")).join(", ")}`);

    return selectedNumber;
}


function main() {
    const possibleResults = useResults(); // Ruft die möglichen Kombinationen ab
    const selectedNumber = selectNumber(possibleResults);

    if (selectedNumber !== null) {
        console.log(`Spieler hat sich für die Zahl ${selectedNumber} entschieden.`);
        // Weiteres Spiel-Handling hier...
    } else {
        console.log("Keine gültige Zahl gewählt. Der Zug endet.");
    }
}
