// ### ### ### A U F G A B E N ### ### ####
// Würfel Ergebnis auswählbar machen
// es wird nur mit den Würfeln weiter gewürfelt die nicht ausgewählt sind
// max 3 Würfelrunden je Spielzug
// wurden alle Perlen einer Zahl nach rechts verschoben beginnt eine neue runde mit 3 Würfeln

let gamedata = {
    "Positions": {
        "1": ["left", "left", "left", "left", "left", "left", "left", "empty", "empty", "empty", "empty", "empty"],
        "2": ["left", "left", "left", "left", "left", "left", "left", "empty", "empty", "empty", "empty", "empty"],
        "3": ["left", "left", "left", "left", "left", "left", "left", "empty", "empty", "empty", "empty", "empty"],
        "4": ["left", "left", "left", "left", "left", "left", "left", "empty", "empty", "empty", "empty", "empty"],
        "5": ["left", "left", "left", "left", "left", "left", "left", "empty", "empty", "empty", "empty", "empty"],
        "6": ["left", "left", "left", "left", "left", "left", "left", "empty", "empty", "empty", "empty", "empty"],
        "7": ["left", "left", "left", "left", "left", "left", "left", "empty", "empty", "empty", "empty", "empty"],
        "8": ["left", "left", "left", "left", "left", "left", "left", "empty", "empty", "empty", "empty", "empty"],
        "9": ["left", "left", "left", "left", "left", "left", "left", "empty", "empty", "empty", "empty", "empty"],
        "10": ["left", "left", "left", "left", "left", "left", "left", "empty", "empty", "empty", "empty", "empty"],
        "11": ["left", "left", "left", "left", "left", "left", "left", "empty", "empty", "empty", "empty", "empty"],
        "12": ["left", "left", "left", "left", "left", "left", "left", "empty", "empty", "empty", "empty", "empty"]
    },
    "playgroundOccupancy":{
        "1": ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        "2": ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        "3": ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        "4": ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        "5": ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        "6": ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        "7": ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        "8": ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        "9": ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        "10": ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        "11": ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",],
        "12": ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",],
    }
}
   
    
function init(){
    renderBoard();
    createDice();
}   


function renderBoard() {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = ''; // Reset

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");

    const squareSize = 30;  // Größe jedes Quadrats
    const spacing = 2;  // Abstand zwischen den Quadraten
    const columns = 12;  // 12 Spalten pro Reihe
    const rows = 12;     // 12 Reihen
    const svgWidth = columns * (squareSize + spacing) - spacing + 40; // Gesamtbreite des SVG (mit Platz für die Zahlen)
    const svgHeight = rows * (squareSize + spacing) - spacing;  // Gesamthöhe des SVG

    svg.setAttribute("width", svgWidth);  // Breite des Spielfelds
    svg.setAttribute("height", svgHeight); // Höhe des Spielfelds

    let rowIndex = 0;

    // Durch die Startpositionen aus gamedata iterieren
    for (const [rowNumber, beads] of Object.entries(gamedata.Positions)) {
        const y = rowIndex * (squareSize + spacing); // Y-Position für die Reihe

        // Zeilennummer hinzufügen
        const rowLabel = document.createElementNS(svgNS, "text");
        rowLabel.setAttribute("x", 10);  // X-Position für die Zeilenummer (Platz vor den Quadraten)
        rowLabel.setAttribute("y", y + squareSize / 2);  // Y-Position (mittig zur Reihe)
        rowLabel.setAttribute("font-size", "14");
        rowLabel.setAttribute("fill", "black");
        rowLabel.textContent = rowNumber; // Zeilenummer setzen
        svg.appendChild(rowLabel);

        // Perlen für diese Reihe rendern
        beads.forEach((position, beadIndex) => {
            const x = 40 + beadIndex * (squareSize + spacing); // X-Position der Perlen (nach der Nummer)

            // Perle (grün oder grau) basierend auf dem Wert in Positions setzen
            const bead = document.createElementNS(svgNS, "circle");
            bead.setAttribute("cx", x + squareSize / 2); // Mitte des Quadrats
            bead.setAttribute("cy", y + squareSize / 2); // Mitte des Quadrats
            bead.setAttribute("r", squareSize / 4);  // Radius der Perle (ein Viertel des Quadrats)

            // Überprüfen, ob der Wert "left" ist, und dann eine grüne Perle setzen
            if (position === "left") {
                bead.setAttribute("fill", "lightblue"); // Blaue Perle für "left"
            } else {
                bead.setAttribute("fill", "lightgray"); // Graue Platzhalterperle für "empty"
            }

            bead.setAttribute("class", "bead");
            bead.dataset.row = rowNumber;
            bead.dataset.index = beadIndex;

            svg.appendChild(bead);
        });

        rowIndex++;
    }

    contentDiv.appendChild(svg);
}

// Diese Funktion erstellt die sechs Quadrate für die Würfelseiten und einen Button
function createDice() {
    const diceDiv = document.getElementById('dice');
    diceDiv.innerHTML = ''; // Entfernt alle alten Inhalte, bevor neue Würfelseiten erstellt werden

    // Wir erstellen sechs Würfelseiten (Quadrate)
    for (let i = 0; i < 6; i++) {
        const diceSide = document.createElement('div');
        diceSide.classList.add('dice-side');
        diceSide.id = `diceSide-${i + 1}`; // Jede Seite bekommt eine eigene ID

        // Platz für das Ergebnis der Seite
        const numberDisplay = document.createElement('span');
        numberDisplay.id = `numberDisplay-${i + 1}`;
        diceSide.appendChild(numberDisplay);

        diceDiv.appendChild(diceSide);
    }

    // Erstellen eines zusätzlichen Buttons
    const rollButton = document.createElement('button');
    rollButton.textContent = 'Würfeln';
    rollButton.id = 'rollDice';
    rollButton.onclick = rollTheDice; // Der Button ruft die Funktion 'rollTheDice()' auf

    // Fügen Sie den Button unter den Würfelseiten hinzu
    diceDiv.appendChild(rollButton);
}

// Diese Funktion wird durch den Button ausgelöst, um die Würfelseiten zu "würfeln"
function rollTheDice() {
    // Wir iterieren durch jede der sechs Würfelseiten und aktualisieren sie
    for (let i = 0; i < 6; i++) {
        const randomNumber = Math.floor(Math.random() * 6) + 1; // Zufallszahl zwischen 1 und 6
        const numberDisplay = document.getElementById(`numberDisplay-${i + 1}`);
        numberDisplay.textContent = randomNumber; // Setze das Würfelergebnis
    }
}








