
const UP_RIGHT = -7, UP_LEFT = -9, DOWN_RIGHT = 9, DOWN_LEFT = 7;
const WHITE=10, BLACK=-10, PAWN = 1, QUEEN = 2;

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
   
    if (localStorage.getItem("drawMovesCount") == "15") {
        alert("It's a draw");
    }
    for (let i = 0; i < 64; i++) {
        let checker = document.getElementById(i).occupant;
        if (checker && checker.color === -color) {  
            if (checker.showPaths(false, false, false))         
                gameOn = true;
            }           
        }
    if (!gameOn) { alert ((color === WHITE ?"WHITE":"BLACK") + " PLAYER WON");}
    return gameOn;
}
