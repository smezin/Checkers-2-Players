const UP_RIGHT = -7, UP_LEFT = -9, DOWN_RIGHT = 9, DOWN_LEFT = 7;
const WHITE=10, BLACK=-10, PAWN = 1, QUEEN = 2;

function playCheckers (){
    setGame();    
}
function Checker(locationId, checkerColor, checkerRank) {

    this.checkerId = locationId;
    this.checkerColor = checkerColor;
    this.checkerRank = checkerRank;
    this.checkerType = checkerColor + checkerRank;
    var iconImage = getImageByType(checkerColor+checkerRank);  
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
        var checkerColor = checkerLocation.occupant.checkerColor;      
        if (checkerLocation.occupant.moveCheckerReturnIfmoveContinues(clickedLocationId)){ 
            selectedLocation.occupant.iconImage.setAttribute("class", "picked_piece_settings");     
        } else { turnIsOverFor(checkerColor); } 
    }
    else if (selectedLocation.occupant) {
        if (selectedLocation.occupant.isEatingNow === true) {
            selectedLocation.occupant.isEatingNow = false;
            clearPaths();
            turnIsOverFor(checkerColor);           
        } else {
        selectedLocation.occupant.iconImage.setAttribute("class", "picked_piece_settings");
        selectedLocation.occupant.showPaths();         
        }
    } else {
        clearPaths();
    }    
}




