
function selectAction (clickedLocationId) {    
    var selectedLocation = document.getElementById(clickedLocationId);    
    clearCheckerPropeties();

    if (selectedLocation.onPath){   
        var checkerLocation = document.getElementById(selectedLocation.onPath);    
        var color = checkerLocation.occupant.color;       
        if (checkerLocation.occupant.moveCheckerReturnIfConsecutive(clickedLocationId)){ 
          //  selectedLocation.occupant.iconImage.setAttribute(`class`, `piece picked`);   
        } else { 
            turnIsOverFor(color);
            isGameOver(color); } 
    }
    else if (selectedLocation.occupant) {
        if (selectedLocation.occupant.isEatingNow) {
            selectedLocation.occupant.isEatingNow = !selectedLocation.occupant.isEatingNow;
            clearPaths();
            turnIsOverFor(selectedLocation.occupant.color);             
        } else {
        //selectedLocation.occupant.iconImage.setAttribute(`class`, `piece picked`);
        selectedLocation.occupant.showPaths();
        console.log('hiiii')         ;
        }
    } else {
        clearPaths();
    } 
}
function updateDrawMovesCount (checkerId, didEat) {

    var checkerBoard = document.getElementById(`checkers_board`);
    var checker = checkerBoard.locations[checkerId];

    if (didEat || checker.rank === PAWN) { 
        checkerBoard.drawMovesCount = 0;
    } else {
        checkerBoard.drawMovesCount ++;      
    }
}
function turnIsOverFor (color) {

    for (let i=0; i < 64; i++)
    {   
        var location = document.getElementById(i);
        var checker = location.occupant;
        location.style.pointerEvents = `auto`;
        if (checker && (checker.color === color)) {
            location.style.pointerEvents = `none`;            
        }
    }
    setMustEat (-color);
}
function isGameOver (color) {

    var gameOn = false;
    var checkerBoard = document.getElementById(`checkers_board`);

    if (checkerBoard.drawMovesCount == 15) {
        alert(`It's a draw`);
    }
    for (let i = 0; i < 64; i++) {
        let checker = checkerBoard.locations[i].occupant;
        if (checker && checker.color === -color) {  
            if (checker.showPaths(false, false, false))  //false onlyKillMoves, false mark path, false eatsNow       
                gameOn = true;
            }           
        }
    if (!gameOn) { alert ((color === WHITE ?`WHITE`:`BLACK`) + ` PLAYER WON`);}
    return gameOn;
}
