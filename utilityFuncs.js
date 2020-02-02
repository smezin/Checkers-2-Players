
Checker.prototype.isDifferentColor = function (otherChecker) {    

    if ((this.color===WHITE) && (otherChecker.color===BLACK)) { return true; }    
    if ((this.color===BLACK) && (otherChecker.color===WHITE)) { return true; }
    return false;
}
function clearPaths () { 
    var locations = document.getElementById(`checkers_board`).locations;  
    for (let i = 1; i < 64; i++) {
        let location = locations[i];
        if (location.onPath) {
            location.onPath = false;
            location.setAttribute(`class`, `location dark_square`)
        }
    }
}
function isPathAvialable () {
    var locations = document.getElementById(`checkers_board`).locations;
    for (let i = 0; i < 64; i++) {
        if (locations[i].onPath) { 
            return true;
        }
    }
    return false;
}
function isWrapViolation (locationId, direction, steps=1) {
    var targetRowId = (locationId+direction*steps)%8;    
    if (targetRowId !== (( direction === UP_RIGHT  || direction === DOWN_RIGHT )?0:7)){ 
        return false;       
    }
    return true;    
}
function setMustEat (color) {
    var locations = document.getElementById(`checkers_board`).locations;
    for (let i = 0; i < 64; i++) {
        var checker = locations[i].occupant;
        if (checker && checker.color === color) {
            checker.showPaths(false,false);
            if (checker.mustEat === true) {
                checker.iconImage.setAttribute(`class`, `piece must_eat`);   
            }
        }
    }
}
function clearCheckerPropeties (){
    
    var locations = document.getElementById(`checkers_board`).locations;
    for (let i=0; i < 64; i++) {
        var checker = locations[i].occupant;
        if (checker) {
            checker.iconImage.setAttribute(`class`, `piece`);
            checker.mustEat = false;
        }
    }
}
function isOutOfBoard (id) {
    return (id < 0 || id > 63);
}