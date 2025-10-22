// Lista delle foto (usa 5 per test, poi cambia a 200)
let photos = [];
for (let i = 1; i <= 5; i++) {
    photos.push(`images/foto${i}.jpg`);
}

// Variabili torneo
let currentWinnerIndex = 0; 
let nextIndex = 1;          

// Conta quante volte ogni foto è stata scelta
let selectionCounts = Array(photos.length).fill(0);

// Mostrare le foto
function showPhotos() {
    if (nextIndex >= photos.length) {
        endTournament();
        return;
    }
    document.getElementById("photo-left").src = photos[currentWinnerIndex];
    document.getElementById("photo-right").src = photos[nextIndex];
}

// Scegli sinistra
function chooseLeft() {
    selectionCounts[currentWinnerIndex]++;
    nextIndex++;
    showPhotos();
}

// Scegli destra
function chooseRight() {
    selectionCounts[nextIndex]++;
    currentWinnerIndex = nextIndex;
    nextIndex++;
    showPhotos();
}

// Fine torneo: mostra vincitore e classifica con miniature
function endTournament() {
    document.getElementById("photo-container").style.display = "none";
    document.getElementById("buttons").style.display = "none";

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h2>Foto vincitrice:</h2>";
    resultDiv.innerHTML += `<img src="${photos[currentWinnerIndex]}" style="width:300px; border:2px solid green;"><br><br>`;

    // Classifica completa ordinata
    let ranked = photos.map((photo, i) => ({photo: photo, count: selectionCounts[i]}))
                       .sort((a,b) => b.count - a.count);

    resultDiv.innerHTML += "<h3>Classifica:</h3>";

    // Mostra la classifica dalla seconda in poi
    for (let i = 1; i < ranked.length; i++) {
        resultDiv.innerHTML += `
            <div style="display:flex; align-items:center; margin-bottom:10px;">
                <img src="${ranked[i].photo}" style="width:60px; height:auto; margin-right:10px; border:1px solid black;">
                <span>${i+1}. ${ranked[i].photo} - scelte: ${ranked[i].count}</span>
            </div>
        `;
    }
}

// Collegare pulsanti
document.getElementById("choose-left").addEventListener("click", chooseLeft);
document.getElementById("choose-right").addEventListener("click", chooseRight);

// Mostrare prima coppia
showPhotos();
