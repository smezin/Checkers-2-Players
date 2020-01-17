//Utility functions 
Checker.prototype.isDifferentColor = function (otherChecker) {    

    if ((this.color===WHITE) && (otherChecker.color===BLACK)) { return true; }    
    if ((this.color===BLACK) && (otherChecker.color===WHITE)) { return true; }
    return false;
}
function clearPaths () {    
    for (let i = 1; i < 64; i++)
    {
       if (document.getElementById(i).onPath) {
            document.getElementById(i).onPath = false;
            document.getElementById(i).setAttribute("class", "location darkSquare")
        }
    }
}
function isPathAvialable () {
    for (let i = 0; i < 64; i++) {
        if (document.getElementById(i).onPath) { 
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

    for (let i = 0; i < 64; i++) {
        var checker = document.getElementById(i).occupant;
        if (checker && checker.color === color) {
            checker.showPaths(false,false);
            if (checker.mustEat === true) {
                checker.iconImage.setAttribute("class", "must_eat");     
            }
        }
    }
}
function clearCheckerPropeties (){
    
    for (let i=0; i < 64; i++) {
        var checker = document.getElementById(i).occupant;
        if (checker) {
            checker.iconImage.setAttribute("class", "piece_settings");
            checker.mustEat = false;
        }
    }
}
function isOutOfBoard (id) {
    return (id < 0 || id > 63);
}