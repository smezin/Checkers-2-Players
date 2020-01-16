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
Checker.prototype.coronation = function() {

    var thisLocation = document.getElementById(this.checkerId);
    thisLocation.occupant = null;
    thisLocation.removeChild(thisLocation.firstChild);
    thisLocation.occupant=new Checker (this.checkerId, this.color, QUEEN);
}