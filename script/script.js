
let gamedata = {
    "startPositions": {
        "1": ["left", "left", "left", "left", "left", "left", "left"],
        "2": ["left", "left", "left", "left", "left", "left", "left"],
        "3": ["left", "left", "left", "left", "left", "left", "left"],
        "4": ["left", "left", "left", "left", "left", "left", "left"],
        "5": ["left", "left", "left", "left", "left", "left", "left"],
        "6": ["left", "left", "left", "left", "left", "left", "left"],
        "7": ["left", "left", "left", "left", "left", "left", "left"],
        "8": ["left", "left", "left", "left", "left", "left", "left"],
        "9": ["left", "left", "left", "left", "left", "left", "left"],
        "10": ["left", "left", "left", "left", "left", "left", "left"],
        "11": ["left", "left", "left", "left", "left", "left", "left"],
        "12": ["left", "left", "left", "left", "left", "left", "left"]
    },
    "playgroundOccupancy":{
        "1": ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",],
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
}   


function renderBoard() {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = ''; // Reset

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "500");
    svg.setAttribute("height", "600");

    let rowIndex = 0;
    
    // 12 Zeilen mit jeweils 12 Platzhalter-Perlen
    for (let row = 1; row <= 12; row++) {
        const y = 40 + rowIndex * 45;

        // Nummerierung der Reihe
        const label = document.createElementNS(svgNS, "text");
        label.setAttribute("x", "10");
        label.setAttribute("y", y + 5);
        label.textContent = row;
        label.setAttribute("font-size", "14");
        label.setAttribute("font-weight", "bold");
        svg.appendChild(label);

        // Linie für die Reihe
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", "30");
        line.setAttribute("y1", y);
        line.setAttribute("x2", "470");
        line.setAttribute("y2", y);
        line.setAttribute("class", "line");
        svg.appendChild(line);

        // 12 Platzhalter-Perlen für jede Reihe
        for (let beadIndex = 0; beadIndex < 12; beadIndex++) {
            const x = 50 + beadIndex * 30;  // Position der Perlen auf der X-Achse

            const bead = document.createElementNS(svgNS, "circle");
            bead.setAttribute("cx", x);
            bead.setAttribute("cy", y);
            bead.setAttribute("r", "15");
            bead.setAttribute("class", "bead placeholder");  // Klasse für Platzhalter-Perlen
            bead.dataset.row = row;
            bead.dataset.index = beadIndex;

            svg.appendChild(bead);
        }

        rowIndex++;
    }

    contentDiv.appendChild(svg);
}



