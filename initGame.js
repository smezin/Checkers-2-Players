
function setGame() {

    var Locations = [];
    for (let row = 0; row < 8; row++) {
        createRowOfSquares(row, Locations);
    } 
    setWhiteCheckersOnBottom(Locations);    
    setBlackCheckersOnTop(Locations);
}
function Checker(locationId, color, rank) {

    this.checkerId = locationId;
    this.color = color;
    this.rank = rank;
    this.checkerType = color + rank;
    var iconImage = getImageByType(color+rank);  
    this.iconImage = iconImage;  
    this.mustEat = false;
    this.isEatingNow = false;  
    document.getElementById(locationId).appendChild(iconImage);  
}
function getImageByType (checkerType) {

    var  iconImage = document.createElement("img");
    switch (checkerType) {
        case WHITE+PAWN:
            iconImage.setAttribute("src","images/white_man.png"); 
            break;
        case WHITE+QUEEN:
            iconImage.setAttribute("src","images/white_queen.png"); 
            break;
        case BLACK+PAWN:
            iconImage.setAttribute("src", "images/black_man.png");      
            break;
        case BLACK+QUEEN:
            iconImage.setAttribute("src", "images/black_queen.png");      
            break;    
        default:
            break;    
        }
    iconImage.setAttribute("class", "piece_settings");
    return iconImage;
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