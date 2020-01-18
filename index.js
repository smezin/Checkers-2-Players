const UP_RIGHT = -7, UP_LEFT = -9, DOWN_RIGHT = 9, DOWN_LEFT = 7;
const WHITE=10, BLACK=-10, PAWN = 1, QUEEN = 2;

function playCheckers() {

    var checkerBoard = document.getElementById(`checkers_board`);
    var Locations = [];
    checkerBoard.locations = Locations;
    for (let row = 0; row < 8; row++) {
        createRowOfSquares(row, Locations);
    } 
    setWhiteCheckersOnBottom(Locations);    
    setBlackCheckersOnTop(Locations);
    checkerBoard.drawMovesCount = 0;
}
function Checker(locationId, color, rank) {

    var checkerBoard = document.getElementById(`checkers_board`);
    this.checkerId = locationId;
    this.color = color;
    this.rank = rank;
    this.checkerType = color + rank;
    var iconImage = getImageByType(color+rank);  
    this.iconImage = iconImage;  
    this.mustEat = false;
    this.isEatingNow = false;  
    checkerBoard.locations[locationId].appendChild(iconImage);  
}
function getImageByType (checkerType) {

    var  iconImage = document.createElement(`img`);
    switch (checkerType) {
        case WHITE+PAWN:
            iconImage.setAttribute(`src`,`images/white_man.png`); 
            break;
        case WHITE+QUEEN:
            iconImage.setAttribute(`src`,`images/white_queen.png`); 
            break;
        case BLACK+PAWN:
            iconImage.setAttribute(`src`, `images/black_man.png`);      
            break;
        case BLACK+QUEEN:
            iconImage.setAttribute(`src`, `images/black_queen.png`);      
            break;    
        default:
            break;    
        }
    iconImage.setAttribute(`class`, `piece`);
    return iconImage;
}
function setWhiteCheckersOnBottom(Locations) {

    for (let i = 62; i > 39; i -= 2) {
        Locations[i].occupant = new Checker(i, WHITE, PAWN);
        if (i === 56) { i++; }
        if (i === 49) { i--; }
    }
}
function setBlackCheckersOnTop(Locations) {

    for (let i = 1; i < 24; i += 2) {
        Locations[i].occupant = new Checker(i, BLACK, PAWN);
        if (i === 7) { i--; }
        if (i === 14) { i++; }
    }
}
function createRowOfSquares(row, locations) {

    let board = document.getElementById(`checkers_board`);
    for (let i = 0; i < 8; i++) {
        if (i % 2 !== row % 2) {
            var locationDiv = createLocation((row * 8 + i), `dark`);
            locations[(row * 8 + i)] = locationDiv;
        } else {
            var locationDiv = createLocation((row * 8 + i), `light`);
            locations[(row * 8 + i)] = locationDiv;
        }        
        board.appendChild(locationDiv);
    }
}
function createLocation(id, squareColor) {
    
    var locationDiv = document.createElement(`div`);
    locationDiv.setAttribute(`class`, `location ${squareColor}_square`)
    locationDiv.id = id; 
    locationDiv.occupant = null;
    locationDiv.onPath = false;
    locationDiv.onclick=function()    {actionSelector(id);    }  
    
    return locationDiv;
}