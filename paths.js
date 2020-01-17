
Checker.prototype.showPaths = function (showOnlyKillPaths = false, markPath = true, eatsNow = false) {
    clearPaths();
    var isPath = false;
    if (this.rank === PAWN && !eatsNow){
        var moveRight = (this.color === WHITE)?UP_RIGHT:DOWN_RIGHT;
        var moveLeft = (this.color === WHITE)?UP_LEFT:DOWN_LEFT; 
        var directions = [moveRight, moveLeft];
    } else {
        var directions = [UP_RIGHT, UP_LEFT, DOWN_RIGHT, DOWN_LEFT];
    }
    for (let i = 0, steps = 1; i < directions.length; i++, steps = 1) {
        if (!showOnlyKillPaths) {
            isPath = (this.showPathOnDirection(directions[i],steps, markPath) || isPath)
            while (this.showPathOnDirection(directions[i],steps, markPath) && this.rank === QUEEN) {steps++;}
                
        }       
        isPath = (this.showKillPathsOnDirection(directions[i], steps, markPath) || isPath);
    } 
    return isPath;
}
Checker.prototype.showPathOnDirection = function (direction, steps = 1, markThePath = true) {

    var baseLocationId = this.checkerId;
    if (isOutOfBoard(baseLocationId+direction*steps) || isWrapViolation(baseLocationId, direction, steps)) {
        return false;
    }        
    var targetLocaion = document.getElementById(baseLocationId+direction*steps);
    if(!(targetLocaion.occupant)) {
        if (markThePath) {markPath(targetLocaion,this.checkerId);}
        return true;
    } 
    return false;      
}
Checker.prototype.showKillPathsOnDirection = function (direction, steps = 1, markThePath = true) {

    var pathExists = false;
    var baseLocationId = this.checkerId + ((steps-1)*direction);

    if (isOutOfBoard(baseLocationId + 2*direction) || isWrapViolation(baseLocationId, direction) 
    || isWrapViolation(baseLocationId, direction, 2)){
        return false;
    }    
    var opponentLocation = document.getElementById(baseLocationId + direction);
    var targetLocation = document.getElementById(baseLocationId + direction*2); 
    var validOppenent;
    if (opponentLocation.occupant && this.isDifferentColor(opponentLocation.occupant)) {
        validOppenent = true;
    }
    if(validOppenent && targetLocation.occupant === null) {
            if (markThePath) {
                markPath(targetLocation,this.checkerId);
            } else {
                this.mustEat = true;
            }
            pathExists = true;
        }
    return pathExists; 
}
Checker.prototype.allowOnlyPathsAndMe = function() {

    for (let i=0; i < 64; i++) {
        let location = document.getElementById(i);
        location.style.pointerEvents = "none";
        if (location.onPath) {
            location.style.pointerEvents = "auto";           
        }
    }
    document.getElementById(this.checkerId).style.pointerEvents = "auto"; 
}
function markPath (pathLocation,checkerId) {
    pathLocation.setAttribute("class", "location pathSquare");
    pathLocation.onPath=checkerId;
}