//Functions to handle paths marking and checkers moves

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
        isPath = (this.showKillPathsOnDirection(directions[i],steps, markPath) || isPath);
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
Checker.prototype.allowOnlyPathsAndThis = function() {

    for (let i=0; i < 64; i++) {
        document.getElementById(i).style.pointerEvents = "none";
        if (document.getElementById(i).onPath) {
            document.getElementById(i).style.pointerEvents = "auto";           
        }
    }
    document.getElementById(this.checkerId).style.pointerEvents = "auto"; 
}
function tryRemoveKilledChecker(origin, target) {

    var stepRetrace = target-origin;
    
    if (stepRetrace<0) {
        if (stepRetrace % UP_RIGHT === 0) { 
            stepRetrace = UP_RIGHT;            
        } else {
            if (stepRetrace % UP_LEFT === 0) {
                stepRetrace = UP_LEFT; 
            }
        }
    } else {
        if (stepRetrace % DOWN_RIGHT === 0 ) {
            stepRetrace = DOWN_RIGHT;
        } else {
            if (stepRetrace % DOWN_LEFT === 0) {
                stepRetrace = DOWN_LEFT;
            }
        }
    }    
    var killLocation = document.getElementById(target-stepRetrace);
    if (killLocation.occupant) {
        killLocation.occupant = null;       
        killLocation.removeChild(killLocation.firstChild); 
        return true;      
    }
    return false;
}
Checker.prototype.moveCheckerReturnIfmoveContinues = function (targetId) {

    var thisLocation = document.getElementById(this.checkerId);
    var targetLocation = document.getElementById(targetId);
    
    thisLocation.occupant = null;
    thisLocation.removeChild(thisLocation.firstChild);    
  
    targetLocation.occupant = this;
    this.checkerId = targetId; 
    targetLocation.appendChild(this.iconImage);
    
    if (this.checkerType === (WHITE+PAWN) && Math.floor(targetId/8) === 0) {this.coronation();}
    if (this.checkerType === (BLACK+PAWN) && Math.floor(targetId/8) === 7) {this.coronation();}
       
    if(tryRemoveKilledChecker(thisLocation.id, targetId)) {
        targetLocation.occupant.showPaths(true,true,true);
        if (isPathAvialable()) {
            this.allowOnlyPathsAndThis();
            this.isEatingNow = true;
            return true;
        }
    }
    clearPaths();
    return false;          
}
Checker.prototype.coronation = function() {

    var thisLocation = document.getElementById(this.checkerId);
    thisLocation.occupant = null;
    thisLocation.removeChild(thisLocation.firstChild);
    thisLocation.occupant=new Checker (this.checkerId, this.color, QUEEN);
}