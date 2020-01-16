//Initializing game board, setting checkers
function setGame() {

    var Locations = [];
    for (let row = 0; row < 8; row++) {
        createRowOfSquares(row, Locations);
    }
    setBlackCheckersOnTop(Locations);
    setWhiteCheckersOnBottom(Locations);    
}
function setBlackCheckersOnTop(Locations) {

    for (let i = 1; i < 24; i += 2) {
        Locations[i].occupant = new Checker(i, BLACK, PAWN);
        if (i === 7) { i--; }
        if (i === 14) { i++; }
    }
}
function setWhiteCheckersOnBottom(Locations) {

    for (let i = 62; i > 39; i -= 2) {
        Locations[i].occupant = new Checker(i, WHITE, PAWN);
        if (i === 56) { i++; }
        if (i === 49) { i--; }
    }
}
function createRowOfSquares(row, Locations) {

    for (let i = 0; i < 8; i++) {
        if (i % 2 !== row % 2) {
            var locationDiv = createLocation((row * 8 + i), "peru");
            Locations[(row * 8 + i)] = locationDiv;
        } else {
            var locationDiv = createLocation((row * 8 + i), "beige");
            Locations[(row * 8 + i)] = locationDiv;
        }
        
        document.getElementById("checkers_board").appendChild(locationDiv);
    }
}
function createLocation(id, squareColor) {
    
    var locationDiv = document.createElement("div");
    locationDiv.setAttribute("class", "locationClass");
    locationDiv.style.background = squareColor;
    locationDiv.id = id; 
    locationDiv.occupant = null;
    locationDiv.onPath = false;
    locationDiv.onclick=function()    {actionSelector(id);    }  

    return locationDiv;
}
