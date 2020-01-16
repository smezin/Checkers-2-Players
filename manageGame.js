//Game management
const UP_RIGHT = -7, UP_LEFT = -9, DOWN_RIGHT = 9, DOWN_LEFT = 7;
const WHITE=10, BLACK=-10, PAWN = 1, QUEEN = 2;

function playCheckers (){
    setGame();    
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

function actionSelector (clickedLocationId) {    
    var selectedLocation = document.getElementById(clickedLocationId);
    var checkerLocation = document.getElementById(document.getElementById(clickedLocationId).onPath);    
    clearCheckerPropeties();

    if (selectedLocation.onPath){     
        var color = checkerLocation.occupant.color;      
        if (checkerLocation.occupant.moveCheckerReturnIfmoveContinues(clickedLocationId)){ 
            selectedLocation.occupant.iconImage.setAttribute("class", "picked_piece_settings");   
            updateDrawMovesCount (selectedLocation.occupant, true);  
        } else { 
            updateDrawMovesCount (selectedLocation.occupant, false);
            turnIsOverFor(color);
            isGameOver(color); } 
    }
    else if (selectedLocation.occupant) {
        if (selectedLocation.occupant.isEatingNow === true) {
            selectedLocation.occupant.isEatingNow = false;
            clearPaths();
            turnIsOverFor(color);             
        } else {
        selectedLocation.occupant.iconImage.setAttribute("class", "picked_piece_settings");
        selectedLocation.occupant.showPaths();         
        }
    } else {
        clearPaths();
    } 
}
function updateDrawMovesCount (checker, didEat) {
    if (didEat || checker.rank === PAWN) { 
        localStorage.setItem("drawMovesCount", "0");
    } else {
        let counter = parseInt(localStorage.getItem("drawMovesCount"));
        counter++;
        localStorage.setItem("drawMovesCount", counter);
    }
}

function turnIsOverFor (color) {

    for (let i=0; i < 64; i++)
    {
        var checker=document.getElementById(i).occupant;
        document.getElementById(i).style.pointerEvents = "auto";
        if (checker && (checker.color === color)) {
            document.getElementById(i).style.pointerEvents = "none";
        }
    }
    setMustEat (-color);
}

function isGameOver (color) {
    var gameOn = false;
    //no legal moves
    //no checkers
    if (localStorage.getItem("drawMovesCount") == "15") {
        console.log("TIE");
    }
    for (let i = 0; i < 64; i++) {
        let checker = document.getElementById(i).occupant;
        if (checker && checker.color === -color) {  
            if (checker.showPaths(false, false, false))         
                gameOn = true;
            }           
        }
    console.log(color +"WON  " + !gameOn);
    return gameOn;
}
